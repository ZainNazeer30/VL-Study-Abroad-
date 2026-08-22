// Regenerates public/sitemap.xml from the routes and the blog posts.
//
// Run it with:  npm run sitemap
//
// Doing this from the same file the site reads means the sitemap can never drift out of date:
// add an article to src/data/blog.js, run this, and Google is told about it. A stale sitemap is
// worse than none, because it teaches a crawler that your file is not worth re-reading.
import { writeFileSync, readFileSync } from 'node:fs'

const ORIGIN = 'https://www.vlstudy.online'
const today = new Date().toISOString().slice(0, 10)

// Static pages, with how important each one is relative to the others (1.0 is the home page)
// and roughly how often it changes.
const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/italy', priority: '0.9', changefreq: 'monthly' },
  { path: '/france', priority: '0.9', changefreq: 'monthly' },
  { path: '/scholarships', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/universities', priority: '0.8', changefreq: 'monthly' },
  { path: '/apply', priority: '0.7', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
]

// Pull the slugs and dates straight out of the blog file without importing JSX.
const blog = readFileSync(new URL('../src/data/blog.js', import.meta.url), 'utf8')
const posts = [...blog.matchAll(/slug:\s*'([^']+)'[\s\S]*?updated:\s*'([\d-]+)'/g)].map((m) => ({
  path: `/blog/${m[1]}`,
  lastmod: m[2],
  priority: '0.8',
  changefreq: 'monthly',
}))

const urls = [...PAGES.map((p) => ({ ...p, lastmod: today })), ...posts]

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
console.log(`sitemap.xml written with ${urls.length} addresses (${posts.length} articles)`)
