import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { hasAccepted } from '../lib/consent'

// Google Analytics is installed on this site and has never recorded a single visit.
//
// index.html configures it with `send_page_view: false`, which switches off the automatic
// pageview that GA normally fires on load. That setting is correct for a single page app, // the automatic one would only ever record the first page and never the eleven others, but
// it has to be paired with a manual `page_view` on every route change, and nothing in the
// codebase calls gtag again. The result is a tag that loads, costs every visitor a request to
// googletagmanager.com, and reports nothing.
//
// Call this once, inside src/components/Layout.jsx, next to the existing scroll-to-top effect:
//
//   import { usePageviews } from '../hooks/usePageviews'
//   ...
//   usePageviews()
//
// Then check Realtime in Google Analytics while clicking around the site. If it stays empty,
// the measurement ID in index.html is wrong.

export function usePageviews() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    // Consent Mode already stops any cookie being written when the visitor has not agreed, but
    // there is no reason to send the event at all in that case.
    if (!hasAccepted()) return
    window.gtag('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
    // document.title is set by useSeo in the page's own effect. Page effects run before the
    // layout's, so by the time this fires the title is already the new page's.
  }, [pathname, search])
}

// Worth adding once pageviews work, since these are the numbers that tell you whether the
// site is earning its keep. Call from the submit handler in each form:
//
//   export function trackLead(formName) {
//     if (typeof window.gtag === 'function') {
//       window.gtag('event', 'generate_lead', { form_name: formName })
//     }
//   }
