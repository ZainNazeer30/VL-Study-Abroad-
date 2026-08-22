import { useEffect } from 'react'

const SITE_NAME = 'VL Study Abroad Consultants'

// Sets the browser tab title and the page's meta description for search engines. This is a
// single page app, so there is no separate HTML file per route, but Google and other search
// engines do run the page's JavaScript before indexing it, and this is what they read at that
// point. Call it once near the top of each page component.
export function useSeo(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
