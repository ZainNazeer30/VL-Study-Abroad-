import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import BottomBar from './BottomBar'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="w-full bg-white min-h-screen relative font-sans text-ink">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomBar />
    </div>
  )
}
