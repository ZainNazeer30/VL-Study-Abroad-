import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { BRAND, NAV_ITEMS } from '../data/site'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#EEF1F6]">
      <div className="max-w-7xl mx-auto flex items-center gap-2.5 px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" className="flex items-center gap-2 lg:flex-none flex-1" onClick={() => setOpen(false)}>
          <img src={logo} alt="VL" className="w-[40px] h-[40px] object-contain" />
          <span className="flex flex-col leading-none">
            <span className="font-display font-semibold text-[13px] text-navy leading-tight">{BRAND.name}</span>
            <span className="text-[9px] tracking-[0.14em] uppercase text-mist">{BRAND.suffix}</span>
          </span>
        </Link>

        {/* Desktop nav links, hidden below lg so the wider menu never wraps */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-display font-medium text-[13.5px] whitespace-nowrap hover:bg-[#F4F7FC] transition-colors ${
                  isActive ? 'text-royal bg-[#F4F7FC]' : 'text-navy'
                }`
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/apply"
          className="bg-royal text-white font-semibold text-[13px] px-3.5 py-2 rounded-[10px] hover:bg-navy transition-colors whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          Apply Now
        </Link>

        {/* Hamburger, hidden from md up since the full menu is inline */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-10 h-10 border border-[#E4E9F1] rounded-[10px] bg-white flex flex-col gap-1 items-center justify-center cursor-pointer"
        >
          <span className="w-4 h-0.5 bg-navy rounded-full" />
          <span className="w-4 h-0.5 bg-navy rounded-full" />
          <span className="w-2.5 h-0.5 bg-navy rounded-full self-center ml-1.5" />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden bg-white border-t border-[#EEF1F6] px-4 pt-2 pb-4 flex flex-col gap-0.5 animate-fadeup">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-2.5 py-3 rounded-[10px] font-display font-medium text-[15px] hover:bg-[#F4F7FC] ${
                  isActive ? 'text-royal bg-[#F4F7FC]' : 'text-navy'
                }`
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
