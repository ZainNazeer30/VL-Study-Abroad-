import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Every page except the home page is loaded on demand. A visitor who lands on the home page and
// never leaves it now downloads only the home page's code, instead of all twelve pages plus
// every article. Home itself stays eagerly loaded because it is the page most visitors land on,
// and making it wait for a second request would slow down the one that matters most.
const Country = lazy(() => import('./pages/Country'))
const Universities = lazy(() => import('./pages/Universities'))
const UniversityDetail = lazy(() => import('./pages/UniversityDetail'))
const Level = lazy(() => import('./pages/Level'))
const Scholarships = lazy(() => import('./pages/Scholarships'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Apply = lazy(() => import('./pages/Apply'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

// The route table on its own, without a router around it.
//
// The browser wraps this in BrowserRouter above. The prerender step at build time wraps the same
// table in a StaticRouter instead, so the HTML it writes out comes from these exact routes rather
// than a second copy that could drift out of step with them.
export function AppRoutes() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/italy" element={<L><Country which="italy" /></L>} />
          <Route path="/france" element={<L><Country which="france" /></L>} />
          <Route path="/universities" element={<L><Universities /></L>} />
          {/* Bachelor and Master sit under the universities list rather than at the top level,
              because the address itself should say they are part of it. */}
          <Route path="/universities/:slug" element={<L><UniversityDetail /></L>} />
          <Route path="/universities/bachelors" element={<L><Level which="bachelor" /></L>} />
          <Route path="/universities/masters" element={<L><Level which="master" /></L>} />
          <Route path="/scholarships" element={<L><Scholarships /></L>} />
          <Route path="/blog" element={<L><Blog /></L>} />
          <Route path="/blog/:slug" element={<L><BlogPost /></L>} />
          <Route path="/about" element={<L><About /></L>} />
          <Route path="/contact" element={<L><Contact /></L>} />
          <Route path="/apply" element={<L><Apply /></L>} />
          <Route path="/privacy" element={<L><Legal which="privacy" /></L>} />
          <Route path="/terms" element={<L><Legal which="terms" /></L>} />
          <Route path="*" element={<L><NotFound /></L>} />
        </Route>
      </Routes>
  )
}

// Set by the prerender step only (src/entry-server.jsx), between its warm-up render and its real
// one. The browser never touches it.
//
// Why it exists: React's streaming renderer writes any page behind a Suspense boundary in its
// streaming shape — an empty placeholder inside <main>, the real content in a <div hidden>, and a
// script to swap them once JavaScript runs. It does that even when the lazy import has already
// resolved and nothing actually suspends. In a browser that is invisible. In a prerendered file
// it defeats the point, because a crawler reads <main>, finds a placeholder, and stops.
//
// So the prerender does one throwaway render to resolve the route's import, flips this on, and
// renders again. With no boundary in the tree React writes the page inline where it belongs.
// Safe only because the warm-up guarantees the component is already in hand; left off, a lazy
// component with nothing to catch it would throw.
let ssrInline = false
export function renderSuspenseInlineForSSR() {
  ssrInline = true
}

// Holds the page height steady while the next page's code arrives, so the footer does not jump
// up the screen for a moment. On a fast connection this is never visible.
function L({ children }) {
  if (ssrInline) return children
  return <Suspense fallback={<div className="min-h-[70vh]" />}>{children}</Suspense>
}
