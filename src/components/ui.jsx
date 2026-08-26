// Small shared building blocks used across pages.

export function Eyebrow({ children, className = 'text-royal' }) {
  return (
    <div className={`text-[11px] font-semibold tracking-[0.14em] uppercase mb-1.5 ${className}`}>
      {children}
    </div>
  )
}

export function H2({ children, className = '' }) {
  return (
    <h2 className={`font-display font-semibold text-[22px] sm:text-[26px] lg:text-[30px] text-navy m-0 ${className}`}>
      {children}
    </h2>
  )
}

// Centers and caps the width of page content on tablet and desktop, while leaving mobile
// untouched. Wrap any section's inner content in this instead of repeating max-w classes.
export function Container({ children, className = '' }) {
  return <div className={`w-full max-w-6xl mx-auto ${className}`}>{children}</div>
}

// Initials avatar, used for real testimonials where we don't have a photo on file yet.
const AVATAR_TONES = {
  royal: 'bg-royal-soft text-royal',
  green: 'bg-green-soft text-green',
  gold: 'bg-[#FBF7EC] text-gold-ink',
  rust: 'bg-rust-soft text-rust',
}
export function Avatar({ initials, tone = 'royal', className = '' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full font-display font-semibold shrink-0 ${
        AVATAR_TONES[tone] || AVATAR_TONES.royal
      } ${className}`}
    >
      {initials}
    </div>
  )
}

// Reusable text input style.
// `outline-none` on its own leaves a keyboard user with no way to see where they are: a
// border colour change does not meet the 3:1 contrast a focus indicator needs. focus-visible
// shows a proper ring for keyboard users without boxing every field a mouse user clicks.
export const inputClass =
  'w-full px-3.5 py-3.5 rounded-[11px] border border-field text-[14px] bg-white outline-none ' +
  'focus:border-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal'
