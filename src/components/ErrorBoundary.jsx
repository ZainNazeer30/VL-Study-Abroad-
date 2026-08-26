import { Component } from 'react'
import { CONTACT } from '../data/site'

// Catches a crash in any page so one broken component does not blank the whole site.
//
// This is a single page app: React renders everything. If any component throws — a typo in a
// new article, a missing image key, a data field that turned out to be undefined — React
// unmounts the entire tree. The visitor gets a white page. No menu, no phone number, no way to
// reach you, and no error they can report. For a site whose only job is producing enquiries,
// that is a total loss rather than a degraded experience.
//
// With this in place they see a short apology and a WhatsApp button, which is the outcome you
// actually want: the enquiry still arrives, just through a different door.
//
// Error boundaries have to be class components. React has no hook equivalent.
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    // Visible in the browser console and in your hosting provider's logs.
    console.error('[boundary]', error, info)
    // If you add error reporting later (Sentry has a free tier), this is where it goes.
  }

  // To clear a crash when the visitor navigates, the parent gives this a `key` of the current
  // path. React remounts the boundary on a key change, which resets the state for free — no
  // setState in a lifecycle method, which React discourages because it triggers a second render.

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="w-[52px] h-[52px] rounded-full bg-rust-soft text-rust text-[24px] flex items-center justify-center mb-4">
          !
        </div>
        <h1 className="font-display font-semibold text-[22px] text-navy m-0 mb-2">Something went wrong</h1>
        <p className="text-[14px] leading-relaxed m-0 mb-5 max-w-sm">
          Sorry, this page did not load properly. Reloading usually fixes it. If it does not,
          message us directly and we will help you straight away.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex-1 border-[1.5px] border-[#D6DEEC] bg-white text-navy font-display font-semibold text-[14px] py-3 rounded-xl cursor-pointer"
          >
            Reload
          </button>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-[#25D366] text-white font-display font-semibold text-[14px] py-3 rounded-xl"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    )
  }
}
