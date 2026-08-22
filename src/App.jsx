import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Country from './pages/Country'
import Universities from './pages/Universities'
import Scholarships from './pages/Scholarships'
import About from './pages/About'
import Contact from './pages/Contact'
import Apply from './pages/Apply'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/italy" element={<Country which="italy" />} />
          <Route path="/france" element={<Country which="france" />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/privacy" element={<Legal which="privacy" />} />
          <Route path="/terms" element={<Legal which="terms" />} />
          {/* Anything else gets a real "not found" page rather than quietly showing the home
              page. Showing the home page at a wrong address makes a search engine think you have
              hundreds of duplicate copies of it, which actively harms ranking. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
