// Turns the single page app into one real HTML file per address.
//
// WHY THIS EXISTS
//
// Without it, every address serves the same index.html and React fills in the content afterwards.
// Google copes, because it runs the JavaScript before indexing. WhatsApp, Facebook and LinkedIn
// do not. They read the raw HTML and stop. So a student sharing the Italy visa guide got a
// preview reading "Study Abroad Consultants in Pakistan" with the home page photo, on the one
// channel Pakistani students actually use.
//
// WHY IT WAS REWRITTEN
//
// The first version opened each page in a real Chromium through Playwright. That needs a browser
// binary downloaded into the build machine, and on Vercel it never started. Worse, it was written
// to warn and exit 0 so a missing browser could not break a deploy, which meant every build
// reported success while shipping no prerendered pages at all. It stayed broken for weeks because
// nothing ever failed.
//
// This version renders the same React components in Node, through src/entry-server.jsx. No
// browser, no binary to install, nothing to go missing. And it exits non-zero if it cannot do its
// job: a build that fails is annoying for ten minutes, a build that silently ships a broken site
// costs months.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('../dist', import.meta.url))
const SERVER_ENTRY = fileURLToPath(new URL('../dist-ssr/entry-server.js', import.meta.url))

if (!existsSync(SERVER_ENTRY)) {
  console.error('\n  x Prerender: server bundle missing at dist-ssr/entry-server.js')
  console.error('    The build must run `vite build --ssr src/entry-server.jsx` first.\n')
  process.exit(1)
}

// Article slugs come straight out of the blog data, the same way generate-sitemap.mjs reads them,
// so a new article is prerendered without touching this file.
const blogSource = readFileSync(new URL('../src/data/blog.js', import.meta.url), 'utf8')
const slugs = [...blogSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const ROUTES = [
  '/', '/italy', '/france', '/universities', '/scholarships', '/blog',
  '/about', '/contact', '/apply', '/privacy', '/terms',
  ...slugs.map((s) => `/blog/${s}`),
]

const { render } = await import(SERVER_ENTRY)
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Head tags for one page, from what useSeo recorded during the render. */
function headTags(h) {
  const t = []
  const m = (attr, key, val) => val && t.push(`<meta ${attr}="${key}" content="${esc(val)}">`)
  t.push(`<title>${esc(h.title)}</title>`)
  m('name', 'description', h.description)
  t.push(`<link rel="canonical" href="${esc(h.url)}">`)
  m('name', 'robots', h.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
  m('property', 'og:title', h.title)
  m('property', 'og:description', h.description)
  m('property', 'og:url', h.url)
  m('property', 'og:type', h.type)
  m('property', 'og:image', h.image)
  m('property', 'og:image:alt', h.imageAlt)
  if (h.type === 'article') {
    m('property', 'article:published_time', h.published)
    m('property', 'article:modified_time', h.modified)
    m('property', 'article:author', h.author)
    m('property', 'article:section', h.section)
  }
  m('name', 'twitter:card', 'summary_large_image')
  m('name', 'twitter:title', h.title)
  m('name', 'twitter:description', h.description)
  m('name', 'twitter:image', h.image)
  if (h.jsonLd) t.push(`<script type="application/ld+json" data-seo="page">${h.jsonLd}</script>`)
  return t.join('\n    ')
}

/** Strips the template's own copies of these tags so a page never has two titles or canonicals. */
function applyHead(html, tags) {
  const out = html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/i, '')
    .replace(/<meta\s+name="robots"[^>]*>\s*/i, '')
    .replace(/<meta\s+property="og:(title|description|url|type|image|image:alt)"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:(card|title|description|image)"[^>]*>\s*/gi, '')
  return out.replace('</head>', `  ${tags}\n  </head>`)
}

let done = 0
const failures = []

for (const route of ROUTES) {
  try {
    const { html, head } = await render(route)
    if (!head) throw new Error('page set no SEO data (is useSeo called on it?)')
    if (!html || html.length < 500) throw new Error(`render produced ${html.length} bytes`)

    let page = applyHead(template, headTags(head))
    page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    if (!page.includes(html.slice(0, 80))) throw new Error('could not inject into #root')

    const dir = route === '/' ? DIST : join(DIST, route)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), page)
    done++
  } catch (err) {
    failures.push(`${route}: ${String(err.message || err).split('\n')[0]}`)
  }
}

if (failures.length) {
  console.error(`\n  x Prerender failed on ${failures.length} of ${ROUTES.length} routes:`)
  for (const f of failures) console.error('    ' + f)
  console.error('')
  process.exit(1)
}

console.log(`  prerendered ${done} pages`)
