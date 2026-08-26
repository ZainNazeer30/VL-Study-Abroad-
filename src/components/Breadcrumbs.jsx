import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { POST_BY_SLUG } from '../data/blog'
import { absolute } from '../hooks/useSeo'

// ---------------------------------------------------------------------------------------------
// THE TRAIL ABOVE EACH PAGE HEADING
//
// Two jobs, and the second one is the reason this exists.
//
// 1. For a reader it says where they are. Modest value, since the menu is on every page anyway,
//    which is why this was taken off the site once before.
//
// 2. For a search result it replaces the raw web address under the blue link with a readable
//    path. On a phone, "vlstudy.online › Guides › Italy student visa" takes the place of a
//    truncated address, and it is the difference between a result that reads as a page about
//    the Italy student visa and one that reads as a string of characters. Google will only show
//    that trail if the page carries BreadcrumbList structured data, and its own guidance is that
//    the markup has to describe a trail the visitor can actually see. So the two halves come as
//    a pair: this component renders both, or neither.
//
// It also feeds internal linking. Every article now links back up to the Guides index in the
// body of the page rather than only from the menu, which is how a crawler works out that /blog
// sits above the nine articles instead of beside them.
//
// TO SWITCH IT OFF AGAIN: delete the <Breadcrumbs /> line in src/components/Layout.jsx. Nothing
// else needs touching, and the structured data goes with it.
//
// The home page is deliberately excluded. A one item trail says nothing and Google ignores it.
// ---------------------------------------------------------------------------------------------

// Each page's heading sits on a soft tinted band that fades to white. The trail sits directly
// above that band, so it has to start on the same colour or there is a visible line across the
// page where one background stops and the other begins. Every page uses the blue tint except
// Scholarships, which is cream. Add a line here if you ever give a new page its own colour.
const TINTS = {
  '/scholarships': 'bg-[#FBF7EC]',
}
const DEFAULT_TINT = 'bg-[#F6F9FE]'

// The label each address should show. Anything not listed here gets no trail.
const LABELS = {
  '/italy': 'Study in Italy',
  '/france': 'Study in France',
  '/universities': 'Universities',
  '/scholarships': 'Scholarships',
  '/blog': 'Guides',
  '/about': 'About Us',
  '/contact': 'Contact',
  '/apply': 'Apply',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Use',
}

function trailFor(pathname) {
  const home = { name: 'Home', path: '/' }

  // An article sits under the Guides index, so its trail is three deep. The last item is the
  // article's own short title, which is what appears in the search result.
  if (pathname.startsWith('/blog/')) {
    const post = POST_BY_SLUG[pathname.slice('/blog/'.length)]
    if (!post) return null
    return [home, { name: 'Guides', path: '/blog' }, { name: post.seoTitle || post.title, path: pathname }]
  }

  const label = LABELS[pathname]
  if (!label) return null
  return [home, { name: label, path: pathname }]
}

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const trail = trailFor(pathname)

  // The structured data half. Written as its own script tag rather than folded into each page's
  // jsonLd, so adding a page never means remembering to add a breadcrumb block to it. Removed on
  // navigation for the same reason useSeo removes its own: in a single page app nothing reloads,
  // so a block left behind would describe the previous page.
  useEffect(() => {
    document.querySelectorAll('script[data-seo="breadcrumb"]').forEach((n) => n.remove())
    if (!trail) return

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo', 'breadcrumb')
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absolute(item.path),
      })),
    })
    document.head.appendChild(script)

    return () => {
      document.querySelectorAll('script[data-seo="breadcrumb"]').forEach((n) => n.remove())
    }
  }, [trail && trail.map((i) => i.path).join('|')]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!trail) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={`px-5 sm:px-8 lg:px-12 pt-3.5 ${TINTS[pathname] || DEFAULT_TINT}`}
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 m-0 p-0 list-none text-[12px] text-mist">
          {trail.map((item, i) => {
            const last = i === trail.length - 1
            return (
              <li key={item.path} className="flex items-center gap-1.5 min-w-0">
                {last ? (
                  // The page you are on is not a link, and aria-current says so out loud.
                  <span aria-current="page" className="truncate max-w-[52vw] sm:max-w-none">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link to={item.path} className="text-royal hover:underline whitespace-nowrap">
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="text-[#C4CEDF]">
                      ›
                    </span>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
