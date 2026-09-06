// Turns the `body` list in src/data/blog.js into the article itself.
//
// Writing articles as a list of small blocks rather than as raw HTML keeps two things true. You
// can add a post without touching any layout code, and every article on the site is laid out
// identically, which matters more than it sounds: a search engine reading your pages sees one
// consistent structure, and a reader who liked one article knows how to read the next.
//
// The headings become real <h2> and <h3> tags in the right order under the page's single <h1>.
// That heading hierarchy is one of the oldest and least glamorous parts of on page SEO, and it
// still works, because it is how a machine works out what the page is actually about.
import { Link } from 'react-router-dom'

export default function PostBody({ blocks }) {
  return (
    <div className="flex flex-col">
      {blocks.map((b, i) => {
        if (b.h2)
          return (
            <h2
              key={i}
              id={slugify(b.h2)}
              className="font-display font-semibold text-[20px] sm:text-[23px] text-navy mt-8 mb-3 scroll-mt-24"
            >
              {b.h2}
            </h2>
          )
        if (b.h3)
          return (
            <h3 key={i} className="font-display font-semibold text-[16px] sm:text-[17px] text-navy mt-5 mb-2">
              {b.h3}
            </h3>
          )
        if (b.p)
          return (
            <p key={i} className="text-[15px] leading-[1.75] text-ink m-0 mb-4">
              {b.p}
            </p>
          )
        if (b.ul)
          return (
            <ul key={i} className="m-0 mb-4 pl-0 list-none flex flex-col gap-2">
              {b.ul.map((li, j) => (
                <li key={j} className="flex gap-2.5 text-[15px] leading-[1.7] text-ink">
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-royal shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          )
        if (b.ol)
          return (
            <ol key={i} className="m-0 mb-4 pl-0 list-none flex flex-col gap-2.5">
              {b.ol.map((li, j) => (
                <li key={j} className="flex gap-3 text-[15px] leading-[1.7] text-ink">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-royal-soft text-royal font-display font-semibold text-[12px] flex items-center justify-center mt-0.5">
                    {j + 1}
                  </span>
                  <span>{li}</span>
                </li>
              ))}
            </ol>
          )
        if (b.note)
          return (
            <div
              key={i}
              className="my-4 rounded-[14px] border border-[#EFE6CC] bg-gradient-to-br from-[#FBF7EC] to-[#FDFBF5] px-4 py-3.5 flex gap-3"
            >
              <span className="text-gold-ink text-[15px] leading-none mt-1">◆</span>
              <p className="text-[14px] leading-[1.65] text-ink m-0">{b.note}</p>
            </div>
          )
        // A link out of the middle of an article to another page on the site.
        //
        //   { cta: { to: '/italy', text: 'Study in Italy from Pakistan', after: 'the rest of it.' } }
        //
        // The "related articles" strip at the foot of a post is generic furniture and a reader
        // has usually stopped by the time they reach it. A link placed where the reader is
        // already thinking about that subject gets used. It also carries meaning the footer
        // links do not: the words inside the link describe the page it points at, which is one
        // of the plainest signals available for saying what that page is about.
        if (b.cta)
          return (
            <p key={i} className="text-[15px] leading-[1.75] text-ink m-0 mb-4">
              <Link to={b.cta.to} className="font-semibold text-royal underline underline-offset-2">
                {b.cta.text}
              </Link>
              {b.cta.after ? ` ${b.cta.after}` : null}
            </p>
          )
        if (b.table)
          return (
            <div key={i} className="my-4 -mx-5 sm:mx-0 overflow-x-auto">
              <div className="px-5 sm:px-0 min-w-full inline-block align-middle">
                <table className="min-w-full border border-line rounded-xl overflow-hidden text-left border-separate border-spacing-0">
                  <thead>
                    <tr>
                      {b.table.head.map((h, j) => (
                        <th
                          key={j}
                          scope="col"
                          className="bg-[#F4F7FC] text-navy font-display font-semibold text-[12.5px] px-3.5 py-2.5 border-b border-line whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.table.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`px-3.5 py-2.5 text-[13.5px] leading-snug align-top ${
                              j < b.table.rows.length - 1 ? 'border-b border-line-soft' : ''
                            } ${k === 0 ? 'font-medium text-navy' : 'text-ink'}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        return null
      })}
    </div>
  )
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
