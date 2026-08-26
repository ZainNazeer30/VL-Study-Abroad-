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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/italy" element={<L><Country which="italy" /></L>} />
          <Route path="/france" element={<L><Country which="france" /></L>} />
          <Route path="/universities" element={<L><Universities /></L>} />
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
    </BrowserRouter>
  )
}

// Holds the page height steady while the next page's code arrives, so the footer does not jump
// up the screen for a moment. On a fast connection this is never visible.
function L({ children }) {
  return <Suspense fallback={<div className="min-h-[70vh]" />}>{children}</Suspense>
}
