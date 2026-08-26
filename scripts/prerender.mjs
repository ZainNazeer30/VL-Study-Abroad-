// Turns the single page app into one real HTML file per address.
//
// WHY THIS EXISTS
//
// Before this ran, every page of the site was served as the same index.html, and React filled
// in the content afterwards. Google copes with that, because it runs the JavaScript before
// indexing. WhatsApp, Facebook and LinkedIn do not. They read the raw HTML and stop.
//
// So when a student shared your Italy visa guide on WhatsApp, the preview said
// "Study Abroad Consultants in Pakistan" and linked to the home page, because that is what
// index.html says. Every article, every country page, every guide, all showing the same
// preview. On the one channel your students actually use.
//
// This script opens each address in a real browser after the build, waits for React to set the
// title, description and preview picture, and saves the finished HTML to dist/<path>/index.html.
// Netlify and Vercel both serve those files directly, so a crawler that runs no JavaScript now
// gets the real thing. Visitors still get the fast app: React takes over the moment it loads.
//
// It uses the same Playwright browser that scripts/audit.mjs already needs, so there is no new
// dependency to install.
//
// Run:  npm run build     (prerender is wired into the build script in package.json)

import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('../dist', import.meta.url))
const PORT = 4322

// Read the article slugs straight out of the blog data, the same way generate-sitemap.mjs does,
// so a new article is prerendered automatically without touching this file.
const blogSource = readFileSync(new URL('../src/data/blog.js', import.meta.url), 'utf8')
const slugs = [...blogSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const ROUTES = [
  '/', '/italy', '/france', '/universities', '/scholarships', '/blog',
  '/about', '/contact', '/apply', '/privacy', '/terms',
  ...slugs.map((s) => `/blog/${s}`),
]

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml',
}

const server = createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = join(DIST, url)
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(DIST, 'index.html')
  res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' })
  res.end(readFileSync(file))
})
await new Promise((r) => server.listen(PORT, r))

// If the browser is not available — most likely on a hosting provider that has not run
// `playwright install chromium` — DO NOT fail the build. Warn and stop. The site still deploys
// and works exactly as it did before; it just loses the per-page link previews until the
// browser is installed. A broken deploy would be far worse than a missing preview.
let browser
try {
  browser = await chromium.launch(
    process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {}
  )
} catch (err) {
  server.close()
  console.warn('\n  ⚠  Prerender skipped: could not start a browser.')
  console.warn('     ' + String(err).split('\n')[0])
  console.warn('     The site is built and will deploy normally, but each page will fall back')
  console.warn('     to the home page preview when shared on WhatsApp or Facebook.')
  console.warn('     To fix, add this before the build command on your host:')
  console.warn('       npx playwright install chromium\n')
  process.exit(0)
}
const page = await browser.newPage()

// Google Fonts and Unsplash are not needed to produce the HTML, and waiting on them makes the
// build slow and flaky on a poor connection. Block them.
await page.route('**/*', (route) => {
  const url = route.request().url()
  const external = /fonts\.googleapis|fonts\.gstatic|images\.unsplash|googletagmanager|google-analytics/
  return external.test(url) ? route.abort() : route.continue()
})

let written = 0
const problems = []

for (const route of ROUTES) {
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' })
  // useSeo writes the tags inside an effect, so give React a moment to run it.
  await page.waitForFunction(() => document.querySelector('link[rel="canonical"]') !== null, { timeout: 5000 })
    .catch(() => problems.push(`${route}: no canonical tag appeared`))

  let html = await page.content()

  // The prerendered HTML contains a snapshot of the DOM React built. When React starts up in
  // the visitor's browser it renders the same thing again and replaces it, which is fine and
  // invisible. What is NOT fine is leaving the preload for the home page hero on every page:
  // the browser would download a photo the page never shows.
  if (route !== '/') {
    html = html.replace(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>\s*/g, '')
  }

  const outPath = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
  written += 1

  // Sanity check the thing this script exists to fix.
  const title = await page.title()
  const ogUrl = await page.getAttribute('meta[property="og:url"]', 'content').catch(() => null)
  if (route !== '/' && ogUrl && ogUrl.replace(/^https?:\/\/[^/]+/, '') !== route) {
    problems.push(`${route}: og:url says ${ogUrl}`)
  }
  if (!title || title.length < 10) problems.push(`${route}: title is "${title}"`)
}

await browser.close()
server.close()

console.log(`prerendered ${written} pages`)
if (problems.length) {
  // Warn loudly, but still exit 0. A page with an odd title is not a reason to take a deploy
  // down; you want to see the warning in the build log and fix it in the next commit.
  console.warn('\n  ⚠  Prerender warnings:')
  for (const p of problems) console.warn('     ' + p)
  console.warn('')
}
