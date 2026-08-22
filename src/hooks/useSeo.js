import { useEffect } from 'react'

const SITE_NAME = 'VL Study Abroad Consultants'
// What gets appended to each page title. Deliberately the short brand rather than the full
// legal name: Google shows about 60 characters, and every one spent on your own name is one not
// spent on the words the student actually searched for.
const TITLE_SUFFIX = 'VL Study Abroad'
const ORIGIN = 'https://www.vlstudy.online'
const DEFAULT_IMAGE = `${ORIGIN}/img/hero-students-1600.jpg`

// ---------------------------------------------------------------------------------------------
// Everything a search engine reads about a single page, set in one call.
//
// This is a single page app: there is one index.html and React swaps the content as you move
// around, so there is no separate HTML file per page to put tags in. Google runs the page's
// JavaScript before indexing it, so what this hook writes into the document head is exactly what
// gets indexed. Call it once near the top of each page component.
//
//   useSeo('Page title', 'The sentence that appears under the link in search results', {
//     path: '/blog',                 // used for the canonical address and og:url
//     image: '/img/something.jpg',   // the preview picture when the link is shared
//     type: 'article',               // 'website' for normal pages, 'article' for blog posts
//     jsonLd: graph(...),            // structured data, see below
//   })
//
// WHAT EACH PIECE DOES
//
//   title          The blue link in Google and the browser tab. Keep it under about 60
//                  characters and put the words people actually search for near the front.
//   description    The grey text under the link. Google often rewrites it, but a good one still
//                  raises how many people click. Aim for 150 to 160 characters.
//   canonical      Tells Google "this is the real address of this page". It stops the same page
//                  at /blog and at /blog?utm_source=facebook being treated as two pages
//                  competing with each other.
//   og: and        What Facebook, WhatsApp and LinkedIn show when someone shares the link. Since
//   twitter:       most Pakistani students share pages on WhatsApp, this is worth getting right.
//   jsonLd         Structured data. It does not change your ranking directly, but it is how you
//                  become eligible for the extra bits in a search result: the FAQ dropdowns, the
//                  breadcrumb trail, the article date. Those take up more room and get clicked
//                  more often than a plain blue link.
// ---------------------------------------------------------------------------------------------

function meta(attr, key, content) {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function link(rel, href) {
  if (!href) return
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

export function absolute(url) {
  if (!url) return null
  return url.startsWith('http') ? url : `${ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`
}

export function useSeo(title, description, options = {}) {
  const { path, image, type = 'website', jsonLd, noindex = false, bare = false } = options
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = title ? (bare ? title : `${title} | ${TITLE_SUFFIX}`) : SITE_NAME
    const url = absolute(path || window.location.pathname)
    const preview = absolute(image) || DEFAULT_IMAGE

    document.title = fullTitle
    meta('name', 'description', description)
    link('canonical', url)

    // Set on every page, not only on the ones we want hidden. A single page app never reloads,
    // so if the "not found" page switched this on and nothing switched it back, every page the
    // visitor opened afterwards would quietly tell Google not to index it.
    meta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')

    meta('property', 'og:title', fullTitle)
    meta('property', 'og:description', description)
    meta('property', 'og:url', url)
    meta('property', 'og:type', type)
    meta('property', 'og:image', preview)
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', fullTitle)
    meta('name', 'twitter:description', description)
    meta('name', 'twitter:image', preview)

    // Structured data for this page. Removed again when you navigate away, so two pages can
    // never end up describing themselves at the same time.
    document.querySelectorAll('script[data-seo="page"]').forEach((n) => n.remove())
    if (jsonLdKey) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo', 'page')
      script.textContent = jsonLdKey
      document.head.appendChild(script)
    }

    return () => {
      document.querySelectorAll('script[data-seo="page"]').forEach((n) => n.remove())
    }
  }, [title, description, path, image, type, jsonLdKey, noindex, bare])
}

// ---------------------------------------------------------------------------------------------
// Helpers for the structured data blocks, so pages do not have to remember the exact shape.
// ---------------------------------------------------------------------------------------------

// NOTE: this file used to export a breadcrumbs() helper, and the pages showed a small
// "Home / Universities" trail above each heading. Both were removed on request. The trail was
// there to make a page eligible for the breadcrumb line Google can show in place of a raw web
// address, but the top menu is on every page anyway, so nothing about getting around the site
// depends on it. If you ever want it back, it was a BreadcrumbList block in the structured data
// plus a small <nav> above each page heading.

// Makes a page eligible for the expandable question and answer boxes in Google. Only use it for
// questions that are genuinely on the page, which is both Google's rule and the honest thing.
export function faqSchema(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// Wraps one or more blocks into a single script, which is what Google prefers to read.
export function graph(...blocks) {
  return { '@context': 'https://schema.org', '@graph': blocks.filter(Boolean) }
}

export { ORIGIN, SITE_NAME }
