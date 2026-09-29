import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { BRAND, NAV_ITEMS } from '../data/site'

function Chevron({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

// A menu item that has pages beneath it.
//
// The parent stays a real link, because /universities is a real page and taking that away to make
// room for a menu would be a downgrade. The chevron beside it is a separate button that opens the
// list, which is what makes this work for a keyboard and on a touch screen — a menu that only
// opens on hover cannot be reached by either.
//
// Hover opens it for a mouse, Escape closes it, and it closes on its own once focus leaves the
// group, so tabbing past it does not leave a panel hanging open over the page.
function NavDropdown({ item, isActive }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const id = `nav-sub-${item.to.replace(/\W+/g, '-')}`

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    // A click anywhere else on the page closes it, the way every other menu behaves.
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open])

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // Fires when focus moves anywhere outside this group, including by tabbing past the last
      // item in the list. relatedTarget is where focus went; null means it left the document.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <div className="flex items-center">
        <NavLink
          to={item.to}
          onFocus={() => setOpen(true)}
          className={`pl-3 pr-1 py-2 rounded-l-lg font-display font-medium text-[13.5px] whitespace-nowrap hover:bg-[#F4F7FC] transition-colors ${
            isActive ? 'text-royal bg-[#F4F7FC]' : 'text-navy'
          }`}
        >
          {item.label}
        </NavLink>
        <button
          type="button"
          aria-label={`${item.label} submenu`}
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className={`pr-2.5 pl-1 py-2.5 rounded-r-lg hover:bg-[#F4F7FC] transition-colors cursor-pointer ${
            isActive ? 'text-royal bg-[#F4F7FC]' : 'text-navy'
          }`}
        >
          <Chevron open={open} />
        </button>
      </div>

      {open && (
        <ul
          id={id}
          className="absolute left-0 top-full pt-1.5 m-0 p-0 list-none min-w-[210px] z-50"
        >
          <div className="bg-white border border-line rounded-[13px] shadow-[0_10px_28px_rgba(10,30,60,0.13)] p-1.5">
            {item.children.map((c) => (
              <li key={c.to}>
                <NavLink
                  to={c.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive: a }) =>
                    `block px-3 py-2.5 rounded-[9px] font-display font-medium text-[13.5px] whitespace-nowrap hover:bg-[#F4F7FC] transition-colors ${
                      a ? 'text-royal bg-[#F4F7FC]' : 'text-navy'
                    }`
                  }
                >
                  {c.label}
                </NavLink>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // A parent is "current" while you are on any page beneath it, so Universities stays lit on the
  // Bachelor and Master pages rather than going dark the moment you follow its own submenu.
  const isUnder = (to) => pathname === to || pathname.startsWith(to + '/')

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
        <nav aria-label="Main" className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown key={item.to} item={item} isActive={isUnder(item.to)} />
            ) : (
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
            )
          )}
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
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-10 h-10 border border-[#E4E9F1] rounded-[10px] bg-white flex flex-col gap-1 items-center justify-center cursor-pointer"
        >
          <span className="w-4 h-0.5 bg-navy rounded-full" />
          <span className="w-4 h-0.5 bg-navy rounded-full" />
          <span className="w-2.5 h-0.5 bg-navy rounded-full self-center ml-1.5" />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="lg:hidden bg-white border-t border-[#EEF1F6] px-4 pt-2 pb-4 flex flex-col gap-0.5 animate-fadeup">
          {NAV_ITEMS.map((item) => (
            <div key={item.to}>
              <NavLink
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

              {/* On a phone the children sit open and indented rather than behind another tap.
                  There are only two of them, and an accordion for two items is a tap that buys
                  the visitor nothing. "All universities" is dropped here because the parent
                  directly above it already goes to exactly that page. */}
              {item.children && (
                <div className="ml-3 pl-3 border-l border-line flex flex-col gap-0.5 mb-1">
                  {item.children
                    .filter((c) => c.to !== item.to)
                    .map((c) => (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        end
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block px-2.5 py-2.5 rounded-[10px] font-display font-medium text-[14px] hover:bg-[#F4F7FC] ${
                            isActive ? 'text-royal bg-[#F4F7FC]' : 'text-slate'
                          }`
                        }
                      >
                        {c.label}
                      </NavLink>
                    ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  )
}
