// Small inline brand icons, used instead of emoji so links to real services look right
// wherever the site is opened.

export function FacebookIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  )
}

export function InstagramIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  )
}

export function LinkedInIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

// Looked up by the `icon` key on each entry in SOCIAL (src/data/site.js), so adding a profile is
// a one line change there plus an icon here, and the footer needs no editing at all.
export const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
}

// Service icons for the "What we do" grid on the home page.
//
// These replace the Unicode characters that used to sit in src/data/home.js (⌂ ✎ ✓ ✦ ✈ ◎ ⌘ ☏).
// Two things were wrong with those. A character is drawn by whatever font the visitor's device
// happens to have, so the set looked thin and mismatched on Windows, heavier on a Mac, and turned
// into colour emoji on some Android builds — never the same twice. And two of them said the wrong
// thing: ⌘ is the Mac command key, standing in for "finding somewhere to live", and ◎ is a circle
// standing in for "career counselling".
//
// Drawn as SVG, they are identical everywhere and scale cleanly. `stroke="currentColor"` means
// each one still takes its colour from the tone class on the tile, exactly as before.
function Svg({ className, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const SERVICE_ICONS = {
  // A university building, for choosing where to apply.
  university: ({ className }) => (
    <Svg className={className}>
      <path d="M2.5 10.5 12 5l9.5 5.5" />
      <path d="M3.5 21h17" />
      <path d="M6 21V12m4 9V12m4 9V12m4 9V12" />
    </Svg>
  ),
  // A form with a tick, for admissions paperwork.
  admissions: ({ className }) => (
    <Svg className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="m9 14.5 2 2 4-4" />
    </Svg>
  ),
  // A passport, for the visa file.
  visa: ({ className }) => (
    <Svg className={className}>
      <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9.5 17h5" />
    </Svg>
  ),
  // A graduation cap, for scholarships.
  scholarship: ({ className }) => (
    <Svg className={className}>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11.2V16c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.8" />
      <path d="M21.5 9v4.5" />
    </Svg>
  ),
  // An aeroplane, for the pre-departure briefing.
  departure: ({ className }) => (
    <Svg className={className}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-.5.5c-.3.3-.3.8 0 1.1l2 2 2 2c.3.3.8.3 1.1 0L9 20v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
    </Svg>
  ),
  // A briefcase, for career advice.
  career: ({ className }) => (
    <Svg className={className}>
      <rect x="2.5" y="7" width="19" height="13.5" rx="2.5" />
      <path d="M15.5 20.5V5.5a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v15" />
      <path d="M2.5 12.5h19" />
    </Svg>
  ),
  // A house, for finding somewhere to live.
  housing: ({ className }) => (
    <Svg className={className}>
      <path d="M3 10.5 12 3.5l9 7" />
      <path d="M5.2 9.6V20a1 1 0 0 0 1 1h11.6a1 1 0 0 0 1-1V9.6" />
      <path d="M9.7 21v-5.6h4.6V21" />
    </Svg>
  ),
  // A headset, for support once the student has landed.
  aftercare: ({ className }) => (
    <Svg className={className}>
      <path d="M4 14.5v-2.3a8 8 0 0 1 16 0v2.3" />
      <rect x="2" y="13.5" width="4" height="6" rx="1.6" />
      <rect x="18" y="13.5" width="4" height="6" rx="1.6" />
      <path d="M20 19.5v.4a2.6 2.6 0 0 1-2.6 2.6H13" />
    </Svg>
  ),
  // A speech bubble, for honest one-to-one advice (About page).
  advice: ({ className }) => (
    <Svg className={className}>
      <path d="M20.5 12.5a7.5 7.5 0 0 1-7.5 7.5c-1.2 0-2.4-.3-3.4-.8L4.5 21l1.8-4.6A7.5 7.5 0 1 1 20.5 12.5z" />
      <path d="M9.5 12.5h.01M13 12.5h.01M16.5 12.5h.01" />
    </Svg>
  ),
  // A checklist, for a clear process (About page).
  process: ({ className }) => (
    <Svg className={className}>
      <path d="m3 6.5 1.8 1.8L8 5.2" />
      <path d="m3 17.5 1.8 1.8L8 16.2" />
      <path d="M11 7h10M11 18h10M11 12.5h10" />
    </Svg>
  ),
  // A map pin, for knowing two countries well (About page).
  local: ({ className }) => (
    <Svg className={className}>
      <path d="M20 10.5c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10.2" r="2.8" />
    </Svg>
  ),
}

export function WhatsAppIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.786.469 3.517 1.36 5.037L2.05 22l5.096-1.334A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.115a8.09 8.09 0 0 1-4.573-1.25l-.328-.194-3.024.792.808-2.947-.213-.34A8.09 8.09 0 0 1 3.885 12c0-4.474 3.64-8.115 8.115-8.115 4.474 0 8.114 3.641 8.114 8.115 0 4.474-3.64 8.115-8.114 8.115z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  )
}
