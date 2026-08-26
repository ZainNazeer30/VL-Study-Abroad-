// A check you can run yourself after changing anything.
//
//   npx playwright install chromium     (once, the first time only)
//   node scripts/audit.mjs
//
// It opens every page of the built site in a real browser and reports, for each one: the tab
// title and its length, the search description and its length, how many h1 and h2 headings there
// are, how many images and whether any is missing alt text or failed to load, which structured
// data blocks are present, the word count, and whether the page scrolls sideways at phone,
// tablet or desktop width. Anything wrong is printed after a FAIL line.
//
// Build first, since it reads the dist folder:  npm run build && node scripts/audit.mjs

import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('../dist', import.meta.url))
const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json',
  '.jpg':'image/jpeg', '.webp':'image/webp', '.png':'image/png', '.ico':'image/x-icon',
  '.xml':'application/xml', '.txt':'text/plain', '.svg':'image/svg+xml' }

const server = createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = join(DIST, url)
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(DIST, 'index.html')
  res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' })
  res.end(readFileSync(file))
})
await new Promise((r) => server.listen(4321, r))

const ROUTES = ['/', '/italy', '/france', '/universities', '/scholarships', '/blog', '/about', '/contact',
  '/apply', '/privacy', '/terms', '/this-page-does-not-exist',
  '/blog/apply-to-italy-and-france-from-pakistan', '/blog/hec-ibcc-mofa-attestation-order',
  '/blog/fully-funded-scholarships-for-pakistani-students', '/blog/italy-student-visa-from-pakistan',
  '/blog/france-student-visa-from-pakistan', '/blog/cost-of-studying-in-italy-and-france',
  '/blog/study-without-ielts', '/blog/choosing-a-university-in-italy-or-france',
  '/blog/intake-deadlines-italy-france']

// Find the browser. `npx playwright install chromium` puts it where Playwright looks by
// default, so no path is needed. PW_CHROME is only an override for unusual setups such as CI
// images that ship their own Chromium.
//
// This used to hardcode '/opt/pw-browsers/chromium', which is a path that exists on the machine
// this project was originally built on and nowhere else — so `npm run audit` failed with
// "executable doesn't exist" for anyone else who tried to run it.
async function launchBrowser() {
  try {
    return await chromium.launch(
      process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {}
    )
  } catch (err) {
    console.error('\n  Could not start a browser. Install one once with:\n')
    console.error('    npx playwright install chromium\n')
    console.error('  ' + String(err).split('\n')[0] + '\n')
    process.exit(1)
  }
}

const browser = await launchBrowser()
let fails = 0
const rows = []

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  const errors = []
  const badImages = []
  const EXTERNAL = /fonts\.googleapis|fonts\.gstatic|images\.unsplash|ERR_TUNNEL|ERR_NAME_NOT_RESOLVED|ERR_INTERNET/
  page.on('console', (m) => { if (m.type() === 'error' && !EXTERNAL.test(m.text())) errors.push(m.text()) })
  page.on('pageerror', (e) => { if (!EXTERNAL.test(String(e))) errors.push(String(e)) })
  page.on('response', (r) => {
    if (r.status() >= 400 && !EXTERNAL.test(r.url())) badImages.push(`${r.status()} ${r.url()}`)
  })
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)

  const info = await page.evaluate(() => {
    const q = (s, a = 'content') => document.head.querySelector(s)?.getAttribute(a) || null
    const h1s = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim())
    const imgs = [...document.querySelectorAll('img')]
    const ld = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => { try { return JSON.parse(s.textContent) } catch { return 'PARSE_ERROR' } })
    const types = ld.flatMap((b) => (b === 'PARSE_ERROR' ? ['PARSE_ERROR'] :
      (b['@graph'] || [b]).map((n) => Array.isArray(n['@type']) ? n['@type'].join('+') : n['@type'])))
    return {
      title: document.title,
      titleLen: document.title.length,
      desc: q('meta[name="description"]'),
      descLen: (q('meta[name="description"]') || '').length,
      canonical: q('link[rel="canonical"]', 'href'),
      robots: q('meta[name="robots"]'),
      ogImage: q('meta[property="og:image"]'),
      h1Count: h1s.length,
      h1: h1s[0] || null,
      h2Count: document.querySelectorAll('h2').length,
      imgTotal: imgs.length,
      imgNoAlt: imgs.filter((i) => !i.getAttribute('alt')).length,
      imgBroken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      ldTypes: types,
      bodyWords: document.body.innerText.split(/\s+/).filter(Boolean).length,
      internalLinks: new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'))).size,
      // The identity of each photo, ignoring which size of it was served, so the same picture
      // at 480 and at 1800 pixels counts once.
      photos: [...new Set(imgs
        .map((i) => i.currentSrc || i.src)
        .filter((u) => /\/img\/|unsplash/.test(u))
        .map((u) => u.includes('unsplash')
          ? (u.match(/photo-[\w-]+/) || [u])[0]
          : (u.split('/').pop().replace(/-\d+\.(jpg|webp)$/, ''))))],
    }
  })

  // horizontal overflow check at three widths
  const overflow = []
  for (const w of [390, 820, 1440]) {
    await page.setViewportSize({ width: w, height: 900 })
    await page.waitForTimeout(150)
    const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)
    if (over) overflow.push(w)
  }

  const problems = []
  if (errors.length) problems.push(`console: ${errors[0].slice(0, 80)}`)
  if (badImages.length) problems.push(`http: ${badImages[0]}`)
  if (info.h1Count !== 1) problems.push(`h1 count ${info.h1Count}`)
  if (!info.desc) problems.push('no description')
  if (info.descLen > 165) problems.push(`desc ${info.descLen} chars`)
  if (info.titleLen > 65) problems.push(`title ${info.titleLen} chars`)
  const indexable = !/noindex/.test(info.robots || '')
  if (indexable && info.bodyWords < 300) problems.push(`thin: ${info.bodyWords} words`)
  if (indexable && info.h2Count === 0) problems.push('no h2')
  if (!info.canonical) problems.push('no canonical')
  if (info.imgNoAlt) problems.push(`${info.imgNoAlt} img without alt`)
  if (info.imgBroken) problems.push(`${info.imgBroken} broken img`)
  if (info.ldTypes.includes('PARSE_ERROR')) problems.push('bad JSON-LD')
  if (overflow.length) problems.push(`h-overflow at ${overflow.join(',')}`)
  if (route === '/this-page-does-not-exist' && !/noindex/.test(info.robots || '')) problems.push('404 not noindex')
  if (route !== '/this-page-does-not-exist' && /noindex/.test(info.robots || '')) problems.push('wrongly noindex')

  if (problems.length) fails++
  rows.push({ route, ok: problems.length === 0, problems, info })
  await ctx.close()
}

for (const r of rows) {
  const i = r.info
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.route}`)
  console.log(`      title(${i.titleLen}) ${i.title}`)
  console.log(`      desc(${i.descLen})  h1:${i.h1Count} h2:${i.h2Count}  imgs:${i.imgTotal}(alt-missing ${i.imgNoAlt}, broken ${i.imgBroken})  words:${i.bodyWords}  links:${i.internalLinks}`)
  console.log(`      schema: ${i.ldTypes.join(', ')}`)
  if (!r.ok) console.log(`      >>> ${r.problems.join(' | ')}`)
}
console.log(`\n${rows.length - fails}/${rows.length} routes clean`)
await browser.close()
server.close()
