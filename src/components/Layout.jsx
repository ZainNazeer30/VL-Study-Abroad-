import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import BottomBar from './BottomBar'
import ErrorBoundary from './ErrorBoundary'
import CookieNotice from './CookieNotice'
import { usePageviews } from '../hooks/usePageviews'

export default function Layout() {
  const { pathname } = useLocation()

  // Records the visit in Google Analytics. index.html switches off the automatic pageview,
  // which is correct for a single page app, but nothing was firing the manual one — so the
  // tag had never recorded a single visit.
  usePageviews()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="w-full bg-white min-h-screen relative font-sans text-ink">
      {/* Every page starts with the same nine menu links. Without this, a keyboard or screen
          reader user tabs through all of them before reaching the content, on every single
          page. The link is invisible until focused, so nothing changes visually. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-white focus:text-navy focus:font-display focus:font-semibold focus:text-[14px] focus:px-4 focus:py-2.5 focus:rounded-lg focus:shadow-lg focus:outline-2 focus:outline-royal"
      >
        Skip to content
      </a>

      <Nav />
      <main id="main">
        {/* Keying on the path remounts the boundary on navigation, so a crash on one page
            does not trap the visitor on the error screen for the rest of the session. */}
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <BottomBar />
      <CookieNotice />
    </div>
  )
}
