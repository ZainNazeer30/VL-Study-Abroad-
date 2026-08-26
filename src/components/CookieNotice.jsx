import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { readChoice, saveChoice, applyConsent } from '../lib/consent'

// The cookie notice.
//
// This is not decoration. index.html now starts Google Analytics with consent DENIED, so no
// analytics cookie is set and no visit is recorded until this banner calls consent update with
// "granted". Press Decline, or ignore it, and the site genuinely measures nothing.
//
// That order matters. A banner that appears after the cookies have already been set is worse
// than no banner, because it tells the visitor something that is not true.
//
// The choice is remembered in localStorage, not in a cookie, so refusing does not itself store
// anything a privacy checker would count.

export default function CookieNotice() {
  const [choice, setChoice] = useState(() => readChoice())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Re-apply the saved answer on every page load, since Consent Mode resets to the denied
    // default each time the page opens.
    if (choice === 'accepted') applyConsent(true)
    // A returning visitor should not see the banner again, so only show it after the first
    // paint, which also keeps it out of the prerendered HTML a crawler reads.
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const decide = (value) => {
    saveChoice(value)
    setChoice(value)
    applyConsent(value === 'accepted')
  }

  if (!ready || choice) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      // Sits above the WhatsApp button and the mobile action bar, and clears the iPhone home
      // indicator. On mobile it stacks above the sticky bar rather than covering it.
      className="fixed z-[70] left-0 right-0 bottom-0 md:left-auto md:right-6 md:bottom-6 md:max-w-sm
                 bg-white border-t md:border border-[#E3EBF8] md:rounded-[16px]
                 shadow-[0_-6px_24px_rgba(10,30,60,0.12)] md:shadow-[0_10px_30px_rgba(10,30,60,0.15)]
                 px-5 pt-4 pb-[calc(96px_+_env(safe-area-inset-bottom))] md:pb-4"
    >
      <h2 id="cookie-title" className="font-display font-semibold text-[15px] text-navy m-0 mb-1.5">
        Can we measure how the site is used?
      </h2>
      <p className="text-[13px] leading-relaxed text-ink m-0 mb-3">
        We would like to use Google Analytics to see which pages help students most. It sets a
        cookie and records the pages you open. Say no and nothing is stored. The site works
        exactly the same either way. Sending a form is separate and always goes to us, as
        explained in our{' '}
        <Link to="/privacy" className="text-royal font-medium underline">
          privacy policy
        </Link>
        .
      </p>
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() => decide('declined')}
          className="flex-1 border-[1.5px] border-[#D6DEEC] bg-white text-navy font-display font-semibold
                     text-[13.5px] py-2.5 rounded-[11px] cursor-pointer
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
        >
          No thanks
        </button>
        <button
          type="button"
          onClick={() => decide('accepted')}
          className="flex-1 bg-royal text-white font-display font-semibold text-[13.5px] py-2.5
                     rounded-[11px] cursor-pointer
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
        >
          Accept
        </button>
      </div>
    </div>
  )
}

