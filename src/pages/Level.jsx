import { Link } from 'react-router-dom'
import Img from '../components/Img'
import Faq from '../components/Faq'
import { Container } from '../components/ui'
import { LEVELS } from '../data/levels'
import { UNIVERSITIES, LAST_REVIEWED } from '../data/universities'
import { STATUS, TILE } from '../data/site'
import { IMAGES } from '../data/images'
import { useSeo, graph, faqSchema, absolute } from '../hooks/useSeo'

// One component, two pages: /universities/bachelors and /universities/masters.
//
// The universities shown are filtered out of the same list that feeds /universities, so a change
// to a university's entry requirement appears on all three pages at once and they can never
// disagree with each other. What differs between the two pages is the guidance around the list,
// which is the reason they are separate pages at all — see the note at the top of
// src/data/levels.js.
export default function Level({ which }) {
  const L = LEVELS[which]
  const path = `/universities/${L.slug}`
  const other = which === 'bachelor' ? LEVELS.master : LEVELS.bachelor
  const list = UNIVERSITIES.filter((u) => u.lvl.includes(L.lvl))
  const italy = list.filter((u) => u.country === 'Italy').length
  const france = list.length - italy

  useSeo(L.seoTitle, L.metaDescription, {
    path,
    image: IMAGES[L.heroImage]?.src,
    jsonLd: graph(
      {
        '@type': 'CollectionPage',
        name: L.h1,
        description: L.metaDescription,
        url: absolute(path),
      },
      {
        '@type': 'ItemList',
        name: L.h1,
        numberOfItems: list.length,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: list.map((u, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CollegeOrUniversity',
            name: u.name,
            url: u.official,
            sameAs: u.official,
            address: {
              '@type': 'PostalAddress',
              addressLocality: u.city,
              addressCountry: u.country === 'Italy' ? 'IT' : 'FR',
            },
          },
        })),
      },
      faqSchema(L.faqs)
    ),
  })

  return (
    <div>
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-6 lg:py-14 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:flex-1">
            <h1 className="font-display font-bold text-[27px] sm:text-[34px] lg:text-[40px] leading-[1.2] text-navy m-0 mb-3">
              {L.h1}
            </h1>
            <p className="text-[15px] sm:text-[16px] leading-relaxed m-0 mb-5 max-w-lg">{L.intro}</p>
            <Link
              to="/apply"
              className="block sm:inline-block bg-navy text-white text-center font-display font-semibold text-[15px] py-4 px-8 rounded-xl shadow-[0_8px_20px_rgba(10,30,60,0.22)]"
            >
              Get a shortlist for your profile
            </Link>
          </div>
          <div className="rounded-[18px] overflow-hidden w-full aspect-[16/10] lg:flex-1 mt-5 lg:mt-0">
            <Img image={IMAGES[L.heroImage]} loading="eager" fetchPriority="high" className="w-full h-full" />
          </div>
        </Container>
      </section>

      {/* The route, in order. This is the part that differs between the two levels and the
          reason a student needs the right page rather than a filter. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-1.5">
            What a {L.label} application needs from Pakistan
          </h2>
          <p className="text-[14px] leading-relaxed m-0 mb-5">
            The {L.label.toLowerCase()} route is not the {other.label.toLowerCase()} route with different marks. These
            are the steps that are specific to it.
          </p>
          <div className="flex flex-col">
            {L.steps.map((s, i) => {
              const notLast = i < L.steps.length - 1
              return (
                <div key={i} className="flex gap-3.5">
                  <div className="flex flex-col items-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-royal-soft text-royal flex items-center justify-center font-display font-semibold text-[13px] shrink-0">
                      {i + 1}
                    </div>
                    {notLast && <div className="w-0.5 flex-1 bg-[#E9EFF8] my-1" />}
                  </div>
                  <div className="pb-5">
                    <div className="font-display font-semibold text-[14.5px] text-navy">{s.t}</div>
                    <div className="text-[13.5px] leading-relaxed text-ink mt-0.5">{s.d}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Things students on this track get wrong. Kept short and blunt on purpose. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-6 lg:pt-10 pb-1.5">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[16px] border border-line bg-[#F9FBFE] p-5">
            <div className="font-display font-semibold text-[15px] text-navy mb-2.5">
              Worth knowing before you shortlist
            </div>
            <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
              {L.notes.map((n, i) => (
                <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink">
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* The universities themselves, deliberately as names and nothing more.

          These cards first carried the English requirement, the entry grades and the application
          window, and that was a mistake: ten of the eleven universities teach at both levels, so
          the Bachelor page and the Master page repeated each other almost word for word. Measured,
          the two pages shared 46 per cent of their text, and two near-identical pages rank worse
          than one. All of that detail already lives on /universities, where it can be compared
          side by side, which is the whole point of that page. Here the useful thing is simply the
          list, and the route to each university's own catalogue. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container>
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-1.5">
            Universities offering {L.label} degrees
          </h2>
          <p className="text-[14px] leading-relaxed m-0 mb-5">
            {list.length} of the universities we work with take {L.label.toLowerCase()} applications from Pakistan,{' '}
            {italy} in Italy and {france} in France. Entry grades, English requirements and application windows are
            on{' '}
            <Link to="/universities" className="font-semibold text-royal underline underline-offset-2">
              the comparison table
            </Link>
            , where you can sort and filter them. Reviewed {LAST_REVIEWED}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {list.map((u) => (
              <article key={u.name} className="border border-line rounded-[16px] bg-white p-4.5 flex flex-col">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-[15px] text-navy leading-snug m-0">{u.name}</h3>
                    <div className="text-[12.5px] text-mist mt-0.5">
                      {u.flag} {u.city}, {u.country}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS[u.tone].bg} ${STATUS[u.tone].fg}`}
                  >
                    {u.status}
                  </span>
                </div>

                <div className="flex gap-1 flex-wrap mt-3">
                  {u.subjects.map((tg, j) => (
                    <span key={j} className={`text-[10.5px] ${TILE.bg} text-ink px-1.5 py-0.5 rounded`}>
                      {tg}
                    </span>
                  ))}
                </div>

                <a
                  href={u.official}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12.5px] font-semibold text-royal mt-3 self-start"
                >
                  Course catalogue on their site
                </a>
              </article>
            ))}
          </div>

          <p className="text-[13.5px] leading-relaxed mt-5 m-0">
            Looking for one specific course rather than a university?{' '}
            <a
              href="https://www.universitaly.it/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-royal underline underline-offset-2"
            >
              Universitaly
            </a>{' '}
            is the Italian ministry&rsquo;s own portal and lets you filter every course in the country by teaching
            language and level. It is more current than any list a consultancy keeps by hand, including ours.
          </p>
        </Container>
      </section>

      {/* Both other pages in this set, so a student who landed on the wrong one can move. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-12 pb-1.5">
        <Container className="lg:max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Link
              to={`/universities/${other.slug}`}
              className="border border-line rounded-[16px] px-4.5 py-4 hover:border-royal-soft transition-colors"
            >
              <div className="font-display font-semibold text-[14.5px] text-navy">{other.label} degrees instead</div>
              <div className="text-[13px] leading-snug text-mist mt-1">
                Different attestation, different entry, different deadlines.
              </div>
            </Link>
            <Link
              to="/universities"
              className="border border-line rounded-[16px] px-4.5 py-4 hover:border-royal-soft transition-colors"
            >
              <div className="font-display font-semibold text-[14.5px] text-navy">The full comparison table</div>
              <div className="text-[13px] leading-snug text-mist mt-1">
                Every university side by side, with filters for IELTS and intake.
              </div>
            </Link>
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-9 lg:pb-16">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3.5">
            {L.label} questions students ask
          </h2>
          <Faq id={L.slug} items={L.faqs} defaultOpen={0} />
        </Container>
      </section>
    </div>
  )
}
