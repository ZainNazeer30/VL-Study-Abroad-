import { Link } from 'react-router-dom'
import { CONTACT } from '../data/site'
import { WhatsAppIcon } from './icons'

export default function BottomBar() {
  return (
    <>
      {/* WhatsApp button. Stays visible on every screen size, mobile and desktop alike, just
          moving up a little on mobile to sit above the sticky action bar below. */}
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-[86px] md:bottom-6 right-4 sm:right-6 z-[60] w-[54px] h-[54px] rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-[0_8px_22px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      {/* Sticky action bar. Mobile only, since the desktop nav already has an Apply Now button
          and the footer carries the rest of the contact options. */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[61] bg-white/95 backdrop-blur border-t border-[#EEF1F6] px-4 pt-3 pb-[calc(12px_+_env(safe-area-inset-bottom))] flex gap-2.5">
        <Link
          to="/contact"
          className="flex-1 text-center border-[1.5px] border-navy text-navy font-display font-semibold text-[14px] px-2 py-3 rounded-xl hover:bg-navy hover:text-white transition-colors"
        >
          Free Consultation
        </Link>
        <Link
          to="/apply"
          className="flex-1 text-center bg-royal text-white font-display font-semibold text-[14px] px-2 py-3 rounded-xl shadow-[0_6px_16px_rgba(43,92,230,0.3)] hover:bg-navy transition-colors"
        >
          Apply Now
        </Link>
      </div>
    </>
  )
}
