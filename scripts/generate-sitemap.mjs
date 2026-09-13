// Regenerates public/sitemap.xml from the routes and the blog posts.
//
// Run it with:  npm run sitemap
//
// Doing this from the same file the site reads means the sitemap can never drift out of date:
// add an article to src/data/blog.js, run this, and Google is told about it. A stale sitemap is
// worse than none, because it teaches a crawler that your file is not worth re-reading.
import { writeFileSync, readFileSync } from 'node:fs'

const ORIGIN = 'https://www.vlstudy.online'

// Static pages, with how important each one is relative to the others (1.0 is the home page)
// and roughly how often it changes.
// `updated` is the date you last actually changed that page. Bump it by hand when you edit
// one. It used to be set to the build date for every page, which meant fixing a typo in the
// footer told Google that the privacy policy, the terms and every other page had changed too.
// Google notices when lastmod is always "today" and starts ignoring the field — including on
// the articles, where the dates are real and where it actually helps you.
const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly', updated: '2026-08-26' },
  { path: '/italy', priority: '0.9', changefreq: 'monthly', updated: '2026-08-04' },
  { path: '/france', priority: '0.9', changefreq: 'monthly', updated: '2026-08-04' },
  { path: '/scholarships', priority: '0.9', changefreq: 'monthly', updated: '2026-08-26' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly', updated: '2026-08-04' },
  { path: '/universities', priority: '0.8', changefreq: 'monthly', updated: '2026-08-26' },
  { path: '/apply', priority: '0.7', changefreq: 'yearly', updated: '2026-08-26' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly', updated: '2026-08-26' },
  { path: '/about', priority: '0.6', changefreq: 'yearly', updated: '2026-08-26' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly', updated: '2026-08-26' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly', updated: '2026-08-26' },
]

// Pull the slugs and dates straight out of the blog file without importing JSX.
const blog = readFileSync(new URL('../src/data/blog.js', import.meta.url), 'utf8')
const posts = [...blog.matchAll(/slug:\s*'([^']+)'[\s\S]*?updated:\s*'([\d-]+)'/g)].map((m) => ({
  path: `/blog/${m[1]}`,
  lastmod: m[2],
  priority: '0.8',
  changefreq: 'monthly',
}))

// The downloadable guides in public/guides. Google indexes PDFs like any other document, so a
// guide left out of the sitemap is a page that can rank sitting there unannounced. Each one is
// generated from the article of the same name, so they share its lastmod.
const GUIDE_PDFS = [
  { path: '/guides/italy-student-visa-guide.pdf', from: 'italy-student-visa-from-pakistan' },
  { path: '/guides/france-student-visa-guide.pdf', from: 'france-student-visa-from-pakistan' },
  { path: '/guides/scholarships-italy-france-guide.pdf', from: 'fully-funded-scholarships-for-pakistani-students' },
]
const guides = GUIDE_PDFS.map((g) => ({
  path: g.path,
  lastmod: (posts.find((p) => p.path === `/blog/${g.from}`) || {}).lastmod || PAGES[0].updated,
  priority: '0.6',
  changefreq: 'yearly',
}))

const urls = [...PAGES.map((p) => ({ ...p, lastmod: p.updated })), ...posts, ...guides]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${ORIGIN}${u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml written with ${urls.length} addresses (${posts.length} articles, ${guides.length} guides)`)
