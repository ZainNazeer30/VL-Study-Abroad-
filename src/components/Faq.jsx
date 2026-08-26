import { useState } from 'react'

export default function Faq({ items, defaultOpen = -1, id = 'faq' }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="flex flex-col gap-2">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border border-line rounded-[13px] overflow-hidden">
            {/* aria-expanded tells a screen reader the answer opened; aria-controls says
                which panel it opened. Without them the button announces as a plain button and
                the answer appears silently. The +/- glyph is decorative, so it is hidden. */}
            <button
              type="button"
              id={`faq-q-${id}-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-a-${id}-${i}`}
              className="w-full flex justify-between items-center gap-2.5 px-4 py-4 bg-white cursor-pointer text-left font-display font-medium text-[14px] text-navy focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-royal"
            >
              <span>{it.q}</span>
              <span aria-hidden="true" className="text-royal text-base shrink-0">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div
                id={`faq-a-${id}-${i}`}
                role="region"
                aria-labelledby={`faq-q-${id}-${i}`}
                className="px-4 pb-4 text-[13.5px] leading-relaxed text-ink"
              >
                {it.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
