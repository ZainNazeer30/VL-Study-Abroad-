import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Country from './pages/Country'
import Universities from './pages/Universities'
import Scholarships from './pages/Scholarships'
import About from './pages/About'
import Contact from './pages/Contact'
import Apply from './pages/Apply'

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
