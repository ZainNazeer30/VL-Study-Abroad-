import { useState } from 'react'

export default function Faq({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="flex flex-col gap-2">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border border-line rounded-[13px] overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex justify-between items-center gap-2.5 px-4 py-4 bg-white cursor-pointer text-left font-display font-medium text-[14px] text-navy"
            >
              <span>{it.q}</span>
              <span className="text-royal text-base shrink-0">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="px-4 pb-4 text-[13.5px] leading-relaxed text-ink">{it.a}</div>}
          </div>
        )
      })}
    </div>
  )
}
