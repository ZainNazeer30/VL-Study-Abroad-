// Where the visitor's analytics choice is read, written and applied.
//
// Kept out of the component file so both the banner and the privacy page can use it, and so
// each file exports only one kind of thing.
//
// The choice lives in localStorage rather than in a cookie, so declining does not itself store
// anything a privacy checker would count against you.

const KEY = 'vl-cookie-choice' // 'accepted' | 'declined' | null (not asked yet)

// localStorage throws in some private browsing modes and where third-party storage is blocked.
// In that case we treat it as "not asked", which means analytics stays off — the safe direction.
export function readChoice() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function saveChoice(value) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* the visitor is simply asked again next time */
  }
}

export function clearChoice() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  applyConsent(false)
}

// Tells Google Consent Mode what the visitor decided. index.html starts everything denied, so
// until this runs with `true`, no analytics cookie exists and no visit is recorded.
export function applyConsent(granted) {
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    // Left denied either way. The site runs no advertising and has no reason to turn these on.
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export function hasAccepted() {
  return readChoice() === 'accepted'
}
