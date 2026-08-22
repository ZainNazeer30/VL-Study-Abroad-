import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { WhatsAppIcon } from './icons'
import { BRAND, CONTACT, FOOTER_LINKS } from '../data/site'

function Column({ title, links }) {
  return (
    <div>
      <div className="font-display font-semibold text-[12px] tracking-[0.1em] uppercase text-white mb-2.5">{title}</div>
      <div className="flex flex-col gap-2 text-[13px]">
        {links.map((l, i) => (
          <Link key={i} to={l.to} className="text-[#93A3C2] hover:text-white">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-navy-deep px-5 sm:px-8 lg:px-12 pt-10 pb-[120px] md:pb-14 text-[#93A3C2]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-3">
            <img src={logo} alt="VL" className="w-11 h-11 object-contain rounded-full bg-white p-[3px] box-content" />
            <div className="font-display font-semibold text-[15px] text-white">{BRAND.fullName}</div>
          </div>
          <p className="text-[13px] leading-relaxed max-w-sm">{BRAND.blurb}</p>
        </div>

        <Column title="Quick links" links={FOOTER_LINKS.quick} />
        <Column title="Popular guides" links={FOOTER_LINKS.guides} />
        <Column title="Company" links={FOOTER_LINKS.company} />

        <div>
          <div className="font-display font-semibold text-[12px] tracking-[0.1em] uppercase text-white mb-2.5">Get in touch</div>
          <div className="text-[13px] leading-loose">
            <div>
              ✉{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-[#93A3C2] hover:text-white">
                {CONTACT.email}
              </a>
            </div>
            <div>
              🌐{' '}
              <a href={CONTACT.websiteUrl} className="text-[#93A3C2] hover:text-white">
                {CONTACT.website}
              </a>
            </div>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#93A3C2] hover:text-white mt-1"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> {CONTACT.phone}
            </a>
            <div className="mt-1">Available around the clock, every day</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 pt-4 flex flex-col sm:flex-row gap-2 justify-between text-[11.5px]">
        <span>© 2026 {BRAND.fullName}</span>
        <span>
          <Link to="/privacy" className="text-[#93A3C2] hover:text-white">
            Privacy
          </Link>{' '}
          ·{' '}
          <Link to="/terms" className="text-[#93A3C2] hover:text-white">
            Terms
          </Link>
        </span>
      </div>
    </footer>
  )
}
