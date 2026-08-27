import { useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { inputClass, Container } from '../components/ui'
import { UNIVERSITIES, SUBJECTS, LAST_REVIEWED } from '../data/universities'
import { STATUS } from '../data/site'
import { IMAGES } from '../data/images'
import { useSeo, graph, faqSchema, absolute } from '../hooks/useSeo'

const selectClass = 'flex-1 min-w-0 px-3 py-3 rounded-[11px] border border-field text-[13px] bg-white text-ink outline-none focus:border-royal'

const emptyFilters = { query: '', country: '', level: '', subject: '', english: '', intake: '' }

// The English filter is here rather than a tuition filter because it is the question that
// actually decides whether a Pakistani student can apply this year or has to wait for a test
// date. "Study in Italy without IELTS" is searched far more often than any fee query.
function matchEnglish(u, english) {
  if (!english) return true
  if (english === 'MOI letter accepted') return u.moiAccepted === true
  if (english === 'IELTS or TOEFL required') return u.moiAccepted !== true
  return true
}

function matchIntake(u, intake) {
  if (!intake) return true
  if (intake === 'September 2027') return u.intake === 'Sep 2027'
  if (intake === 'February 2027') return u.intake === 'Feb 2027'
  return true
}

// The questions below are on the page for a visitor to read. They are also handed to Google as
// FAQ structured data, which is only allowed when both are true, so if you edit one, edit both.
const FAQS = [
  {
    q: 'Which universities in Italy and France can I apply to from Pakistan without IELTS?',
    a: 'Several Italian public universities, including Bologna, Sapienza and Padua on many courses, accept a Medium of Instruction letter from your last institution instead of an IELTS or TOEFL score. Filter this page by "MOI letter accepted" to see which ones. French universities are stricter and usually want a test score, because the Campus France file is assessed on documents rather than in conversation.',
  },
  {
    q: 'What CGPA or percentage do I need for a university in Italy or France?',
    a: 'Most public universities in both countries are reachable with 60 percent and above, or roughly a CGPA of 2.5 out of 4. The technical universities and the selective Paris institutions ask for more, generally 70 percent or a CGPA of 3.0. Grades rarely decide an application on their own; a complete, correctly attested file submitted inside the window matters more.',
  },
  {
    q: 'When do applications open for the September 2027 intake?',
    a: 'Most Italian universities open between October and December 2026 and close between February and April 2027. French universities run through Campus France Pakistan, which opens around October 2026 and closes in January for many programmes, earlier than the university deadline itself. The exact window for each university is in the table on this page.',
  },
  {
    q: 'Can I still apply for a February 2027 intake?',
    a: 'Yes, but the window is closing. Politecnico di Torino and Universite Cote d\u2019Azur both run a spring start, and applications for it are in their final weeks as of August 2026. The limiting factor is usually not the university deadline but the visa appointment in Islamabad, which has to be booked and attended before the semester begins.',
  },
  {
    q: 'Do I have to pay tuition fees upfront to a university in Italy or France?',
    a: 'No. Public universities in both countries bill in instalments across the academic year, and the first instalment is normally due after you enrol rather than at application. In Italy the amount is calculated on assessed family income, and in France many public universities waive the higher international rate. Because of that we go through cost using your actual household numbers instead of printing one figure beside a university name.',
  },
  {
    q: 'How many universities should I apply to?',
    a: 'Between six and eight, split across ambition levels: two you would be lucky to get, four that fit your profile, two you are confident of. Applying to eight ambitious choices is the most common way a student loses an entire year, and it costs the same in application fees as a balanced list.',
  },
]

// Column headings for the desktop table. The number column is rendered separately because it
// needs a fixed narrow width.
const COLUMNS = [
  'University',
  'Level',
  'English certificate',
  'Entry requirement',
  'Intake and deadline',
  'Status',
  'Links',
]

export default function Universities() {
  useSeo(
    'Universities in Italy and France for Pakistani Students',
    'Compare universities in Italy and France: entry requirements, the CGPA you need, IELTS and MOI rules, intake dates and application deadlines for students applying from Pakistan.',
    {
      path: '/universities',
      image: IMAGES.universitiesHero.src,
      jsonLd: graph(
        {
          '@type': 'CollectionPage',
          name: 'Universities in Italy and France for Pakistani students',
          url: absolute('/universities'),
          description:
            'Universities in Italy and France that Pakistani students can apply to, with entry requirements, English requirements, intake dates and application deadlines.',
          // Tells Google the page is maintained, which is worth more on a page whose whole value
          // is dates that go stale. Same date the page prints to the visitor, from LAST_REVIEWED.
          dateModified: '2026-08-27',
          inLanguage: 'en',
        },
        // The list itself, named. A CollectionPage on its own tells a search engine that this
        // page collects things; it does not say what. Spelling out the universities is what
        // connects this page to a search for any one of them by name, and it is the difference
        // between a page about "universities" and a page Google knows mentions Politecnico di
        // Milano, Sorbonne and nine others. Built from the same array the page renders, so it
        // can never describe a university that is not actually listed.
        {
          '@type': 'ItemList',
          name: 'Universities in Italy and France for Pakistani students',
          numberOfItems: UNIVERSITIES.length,
          itemListOrder: 'https://schema.org/ItemListUnordered',
          itemListElement: UNIVERSITIES.map((u, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CollegeOrUniversity',
              name: u.name,
              description: u.detail,
              // The university's own site. This is what lets Google tie our entry to the real
              // institution rather than treating it as an unidentified name in a list.
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
        // The questions below the table, offered for the expandable answer boxes in Google.
        faqSchema(FAQS)
      ),
    }
  )
  const [f, setF] = useState(emptyFilters)
  const [openId, setOpenId] = useState(-1)

  const setField = (k) => (e) => {
    setF((s) => ({ ...s, [k]: e.target.value }))
    setOpenId(-1)
  }
  const clearAll = () => {
    setF(emptyFilters)
    setOpenId(-1)
  }

  const results = UNIVERSITIES.map((u, i) => ({ ...u, id: i })).filter((u) => {
    const q = f.query.trim().toLowerCase()
    return (
      (!q || `${u.name} ${u.city}`.toLowerCase().includes(q)) &&
      (!f.country || u.country === f.country) &&
      (!f.level || u.lvl.includes(f.level)) &&
      (!f.subject || u.subjects.includes(f.subject)) &&
      matchEnglish(u, f.english) &&
      matchIntake(u, f.intake)
    )
  })

  return (
    <div>
      {/* Text on the left, picture on the right, exactly like the two country pages. The picture
          is cut to 16:10 and sits in a 16:10 box, so the whole college is visible at every screen
          size rather than being cropped to fit. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-6 lg:py-14 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:flex-1">
            <h1 className="font-display font-bold text-[27px] sm:text-[34px] lg:text-[40px] leading-[1.2] text-navy m-0 mb-3">
              Universities in Italy and France
            </h1>
            <p className="text-[15px] sm:text-[16px] leading-relaxed m-0 mb-5 max-w-lg">
              Entry requirements, the CGPA you need, whether IELTS is compulsory, intake dates and application
              deadlines, laid out side by side. Every university here accepts applications from Pakistan.
            </p>
            <Link
              to="/apply"
              className="block sm:inline-block bg-navy text-white text-center font-display font-semibold text-[15px] py-4 px-8 rounded-xl shadow-[0_8px_20px_rgba(10,30,60,0.22)]"
            >
              Get a shortlist for your profile
            </Link>
          </div>
          <div className="rounded-[18px] overflow-hidden w-full aspect-[16/10] lg:flex-1 mt-5 lg:mt-0">
            <Img image={IMAGES.universitiesHero} loading="eager" fetchPriority="high" className="w-full h-full" />
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 pt-2 pb-4 lg:pb-6">
        <Container className="lg:max-w-3xl">
          {/* A search box needs a name a screen reader can announce. The label is visually
              hidden because the placeholder already says what it is for sighted users. */}
          <label htmlFor="uni-search" className="sr-only">
            Search universities by name or city
          </label>
          <input
            id="uni-search"
            type="search"
            value={f.query}
            onChange={setField('query')}
            placeholder="Search by university or city"
            aria-describedby="uni-count"
            className={`${inputClass} px-4`}
          />
        </Container>
      </section>

      {/* Filters */}
      <div className="px-5 sm:px-8 lg:px-12 pb-1.5">
        <Container className="lg:max-w-3xl flex flex-col gap-2.5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {/* Each filter needs a name a screen reader can announce. The labels are visually
              hidden because the first <option> already reads as the filter name for sighted
              users, "Country", "Degree level" and so on. */}
          <Filter id="filter-country" label="Country" value={f.country} onChange={setField('country')}
                  options={['Italy', 'France']} />
          <Filter id="filter-level" label="Degree level" value={f.level} onChange={setField('level')}
                  options={['Bachelor', 'Master']} />
          <Filter id="filter-subject" label="Subject" value={f.subject} onChange={setField('subject')}
                  options={SUBJECTS} />
          <Filter id="filter-english" label="English requirement" value={f.english} onChange={setField('english')}
                  options={['MOI letter accepted', 'IELTS or TOEFL required']} />
          <select id="filter-intake" aria-label="Intake" value={f.intake} onChange={setField('intake')} className={selectClass}>
            <option value="">Intake</option>
            <option>September 2027</option>
            <option>February 2027</option>
          </select>
          <button
            type="button"
            onClick={clearAll}
            className="px-4 py-3 rounded-[11px] border border-[#E4E9F1] bg-[#F4F7FC] text-ink text-[13px] font-medium cursor-pointer whitespace-nowrap"
          >
            Clear all filters
          </button>
        </Container>
      </div>

      {/* Results */}
      <section className="px-5 sm:px-8 lg:px-12 pt-3.5 pb-9 lg:pb-16">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <div id="uni-count" className="text-[12.5px] text-mist" aria-live="polite">
              {results.length} {results.length === 1 ? 'university' : 'universities'} found
            </div>
            {/* Printed where a visitor can see it, not only in the structured data. On a page
                built entirely out of deadlines, saying when it was last checked is the whole
                difference between useful and untrustworthy. */}
            <div className="text-[12px] text-mist">Requirements and dates last checked {LAST_REVIEWED}</div>
          </div>

          {/* ---------- Phones and small tablets: one card per university ----------
              An eight column table on a 380 pixel screen is unreadable however it is scrolled, so
              below `lg` the same fields become labelled rows in a card. Same data, same order. */}
          <div className="flex flex-col gap-3 lg:hidden">
            {results.map((u, i) => {
              const open = openId === u.id
              return (
                <div key={u.id} className="border border-line rounded-2xl p-4 shadow-[0_6px_16px_rgba(10,30,60,0.05)]">
                  <div className="flex justify-between items-start gap-2.5 mb-2.5">
                    <div className="min-w-0">
                      <div className="font-display font-semibold text-[15px] text-navy leading-tight">
                        <span className="text-mist font-normal mr-1.5">{i + 1}.</span>
                        {u.name}
                      </div>
                      <div className="text-[12.5px] text-mist mt-1">
                        {u.flag} {u.city}, {u.country}
                      </div>
                    </div>
                    <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1.5 rounded-full ${STATUS[u.tone].bg} ${STATUS[u.tone].fg}`}>
                      {u.status}
                    </span>
                  </div>

                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {u.subjects.map((tg, j) => (
                      <span key={j} className="text-[11.5px] bg-[#F4F7FC] text-ink px-2 py-1 rounded-md">
                        {tg}
                      </span>
                    ))}
                  </div>

                  <dl className="border-t border-line-soft pt-2.5 mb-3">
                    <CardRow label="Level" value={u.levels} />
                    <CardRow label="English certificate" value={u.english} />
                    <CardRow label="Entry requirement" value={u.entry} />
                    <CardRow label="Intake" value={u.intake} />
                    <CardRow label="Apply by" value={u.applyBy} />
                  </dl>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? -1 : u.id)}
                      aria-expanded={open}
                      className="flex-1 border-none bg-royal-soft text-royal font-display font-semibold text-[13px] px-3.5 py-2.5 rounded-[10px] cursor-pointer"
                    >
                      {open ? 'Hide details' : 'View details'}
                    </button>
                    <a
                      href={u.official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center border border-[#D6DEEC] text-navy font-display font-semibold text-[13px] px-3.5 py-2.5 rounded-[10px]"
                    >
                      Official page
                    </a>
                  </div>

                  {open && (
                    <div className="mt-3 bg-[#F9FBFE] border border-[#ECF0F7] rounded-xl p-3.5 text-[13px] leading-relaxed">
                      {u.detail}
                      <Link to={`/blog/${u.guide}`} className="block mt-2.5 text-royal font-medium text-[13px]">
                        Read the guide for this application
                      </Link>
                      <Link
                        to="/apply"
                        className="block text-center mt-3 bg-royal text-white font-display font-semibold text-[13.5px] py-3 rounded-[10px]"
                      >
                        Apply with VL
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ---------- Desktop: the details table ---------- */}
          {results.length > 0 && (
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-line shadow-[0_6px_16px_rgba(10,30,60,0.05)]">
              <table className="w-full border-collapse text-left min-w-[1000px]">
                <caption className="sr-only">
                  Universities in Italy and France, with degree level, the English certificate accepted, entry
                  requirement, intake, application deadline and current application status.
                </caption>
                <thead>
                  <tr className="bg-navy">
                    <th scope="col" className="font-display font-semibold text-[12.5px] text-white px-3 py-3.5 w-[44px]">
                      #
                    </th>
                    {COLUMNS.map((c) => (
                      <th key={c} scope="col" className="font-display font-semibold text-[12.5px] text-white px-3 py-3.5 whitespace-nowrap">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((u, i) => {
                    const open = openId === u.id
                    return <Row key={u.id} u={u} i={i} open={open} onToggle={() => setOpenId(open ? -1 : u.id)} />
                  })}
                </tbody>
              </table>
            </div>
          )}

          {results.length === 0 && (
            <div className="text-center px-5 py-8 border border-dashed border-[#D6DEEC] rounded-2xl">
              <div className="font-display font-semibold text-[15px] text-navy mb-1.5">No matches with those filters</div>
              <div className="text-[13px] mb-3.5">Try clearing a filter, or ask us. We work with more universities than we list here.</div>
              <button
                type="button"
                onClick={clearAll}
                className="border-[1.5px] border-[#D6DEEC] bg-white text-navy font-display font-semibold text-[13.5px] px-4.5 py-2.5 rounded-[11px] cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          <p className="text-[12.5px] leading-relaxed text-mist mt-4 max-w-3xl">
            Deadlines and entry requirements change every admissions cycle and differ between programmes at the same
            university. Treat this table as the starting point and confirm on the university&apos;s own page before you
            build your plan around a date, or ask us and we will check it for the exact programme you want.
          </p>
        </Container>
      </section>

      {/* Written content below the table. A page that is only a filter and a list gives a search
          engine almost nothing to read, and gives a student nothing to decide with. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-10 lg:pt-14">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            What Italian and French universities ask a Pakistani student for
          </h2>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-3">
            Entry requirements look intimidating written down and are usually simpler than they read. For a Bachelor,
            both countries want your Matric and FSc or Intermediate results, attested through IBCC and then MOFA. For a
            Master, they want your Bachelor degree and transcript, attested through HEC and then MOFA. On top of that
            comes proof of English, either an IELTS or TOEFL score or a Medium of Instruction letter from your last
            institution, and for most programmes a motivation letter and a CV.
          </p>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-3">
            Grades matter, but not as the single filter students imagine. A 60 to 70 percent average, or a CGPA of
            about 2.5 out of 4, opens a great many public universities in both countries. What decides the outcome more
            often is whether the file arrived complete and on time, and whether the motivation letter was written for
            that specific programme rather than copied across eight applications.
          </p>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-5">
            The English column in the table above is worth reading closely. Several Italian universities accept a
            Medium of Instruction letter from your college or university in place of an IELTS score, which removes the
            test fee and the wait for a slot entirely. French universities almost always want the test, because your
            file is judged on documents through Campus France rather than in conversation. There is a full explanation
            in our guide on{' '}
            <Link to="/blog/study-without-ielts" className="text-royal font-medium">
              applying without IELTS
            </Link>
            .
          </p>

          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            Deadlines are earlier than students expect
          </h2>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-3">
            The date in the table is the university&apos;s deadline. It is not your deadline. Working backwards from a
            September 2027 start, attestation through IBCC or HEC and then MOFA needs six to ten weeks, the Declaration
            of Value from the Italian Embassy in Islamabad adds several more, and Campus France Pakistan closes its own
            window months before the French universities close theirs. A student who begins in January for a March
            deadline is already behind.
          </p>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-5">
            The practical rule: start your documents a full cycle ahead of the application, not alongside it. Our{' '}
            <Link to="/blog/intake-deadlines-italy-france" className="text-royal font-medium">
              month by month deadline guide
            </Link>{' '}
            lays out what should be finished in each month, and the{' '}
            <Link to="/blog/hec-ibcc-mofa-attestation-order" className="text-royal font-medium">
              attestation order guide
            </Link>{' '}
            covers the sequence that trips up the largest number of applicants, because doing MOFA before HEC means
            doing both again.
          </p>

          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            How to use this list
          </h2>
          <div className="flex flex-col gap-2.5 mb-6">
            {[
              ['Filter by English requirement first.', 'If you do not have an IELTS score yet and cannot get a test date in time, that single filter cuts the list down to what you can realistically apply to this cycle.'],
              ['Check the language of instruction for every year.', 'A Master listed under an English title is not always taught in English throughout. Check the programme page, not the faculty page.'],
              ['Split your shortlist.', 'Two ambitious, four realistic, two you are confident of. Eight ambitious choices is the most common way a student loses a year.'],
              ['Work backwards from the visa, not the deadline.', 'The appointment in Islamabad is the real bottleneck in both countries. Fix that date first and every other deadline arranges itself behind it.'],
              ['Ask about housing before you accept.', 'DSU housing in Italy and CROUS in France can halve your largest monthly cost, and availability differs enormously between universities.'],
            ].map(([t, d], i) => (
              <div key={i} className="flex gap-3 items-start py-2.5 border-b border-line-soft">
                <div className="w-[26px] h-[26px] rounded-full bg-green-soft text-green flex items-center justify-center text-[13px] shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="font-display font-medium text-[14.5px] text-navy">{t}</div>
                  <div className="text-[13.5px] leading-relaxed text-slate mt-0.5">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            Why there are no fees in the table
          </h2>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-5">
            Because any single figure would be wrong for most of the people reading it. Italian public universities set
            tuition on assessed family income through the ISEE bands, so two students on the same course can pay
            amounts that differ by thousands. French public universities frequently waive the higher international rate
            down to what a French student pays, and whether a given university does that is rarely on its front page. A
            number printed beside a university name would make the decision look simpler than it is. We would rather go
            through it with your actual household figures, which is free and takes one conversation. The ranges and the
            conditions attached to them are set out in{' '}
            <Link to="/blog/cost-of-studying-in-italy-and-france" className="text-royal font-medium">
              what it really costs to study in Italy or France
            </Link>
            , and the awards that change the number are on our{' '}
            <Link to="/scholarships" className="text-royal font-medium">
              scholarships page
            </Link>
            .
          </p>

          <p className="text-[14.5px] leading-[1.75] m-0 mb-5">
            We work with more universities than are listed here, and the list grows every intake. If you cannot find
            your subject, ask us rather than assuming it is not available. There is more on all of this in our guides on{' '}
            <Link to="/blog/choosing-a-university-in-italy-or-france" className="text-royal font-medium">
              choosing a university
            </Link>
            ,{' '}
            <Link to="/blog/apply-to-italy-and-france-from-pakistan" className="text-royal font-medium">
              how to apply from Pakistan
            </Link>{' '}
            and{' '}
            <Link to="/blog/fully-funded-scholarships-for-pakistani-students" className="text-royal font-medium">
              fully funded scholarships
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* Questions. These are the phrases students actually type into Google, answered in full on
          the page, which is what makes the FAQ structured data above legitimate. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-4 lg:pt-8">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-4">
            Common questions about applying
          </h2>
          <div className="flex flex-col gap-2.5">
            {FAQS.map((item, i) => (
              <details key={i} className="border border-line rounded-[14px] px-4 py-3.5 bg-white">
                <summary className="font-display font-medium text-[14.5px] text-navy leading-snug cursor-pointer marker:text-royal">
                  {item.q}
                </summary>
                <p className="text-[13.5px] leading-[1.7] text-slate m-0 mt-2.5">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 mt-8 mb-10 lg:mb-16">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[20px] bg-gradient-to-br from-navy to-navy-soft p-[28px_22px] lg:p-10 text-center">
            <h2 className="font-display font-semibold text-[21px] lg:text-[26px] text-white m-0 mb-2 leading-tight">
              Not sure which of these you would get into?
            </h2>
            <p className="text-[13.5px] lg:text-[15px] leading-relaxed text-[#AAB8D4] m-0 mb-5 max-w-md mx-auto">
              Send us your marks and your budget. We will come back with a realistic shortlist, not a wish list.
            </p>
            <Link
              to="/apply"
              className="inline-block bg-white text-navy font-display font-semibold text-[15px] py-3.5 px-8 rounded-xl"
            >
              Get a shortlist
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}

// One university as a table row, plus the expanded detail row beneath it when opened. The detail
// lives in a second <tr> spanning every column rather than inside a cell, because a paragraph
// inside one narrow cell would stretch that column and shift the whole table sideways.
function Row({ u, i, open, onToggle }) {
  return (
    <>
      <tr className={`border-t border-line ${i % 2 === 1 ? 'bg-[#FAFCFE]' : 'bg-white'}`}>
        <td className="px-3 py-3.5 text-[13px] text-mist align-top">{i + 1}</td>
        <th scope="row" className="px-3 py-3.5 align-top font-normal">
          <div className="font-display font-semibold text-[14px] text-navy leading-snug">{u.name}</div>
          <div className="text-[12px] text-mist mt-0.5">
            {u.flag} {u.city}, {u.country}
          </div>
          <div className="flex gap-1 flex-wrap mt-1.5">
            {u.subjects.map((tg, j) => (
              <span key={j} className="text-[10.5px] bg-[#F4F7FC] text-ink px-1.5 py-0.5 rounded">
                {tg}
              </span>
            ))}
          </div>
        </th>
        <td className="px-3 py-3.5 text-[12.5px] align-top">{u.levels}</td>
        <td className="px-3 py-3.5 text-[12.5px] align-top max-w-[190px]">{u.english}</td>
        <td className="px-3 py-3.5 text-[12.5px] align-top max-w-[170px]">{u.entry}</td>
        <td className="px-3 py-3.5 text-[12.5px] align-top max-w-[170px]">
          <div className="font-medium text-navy">{u.intake}</div>
          <div className="text-mist mt-0.5">{u.applyBy}</div>
        </td>
        <td className="px-3 py-3.5 align-top">
          <span className={`inline-block text-[11px] font-semibold px-2.5 py-1.5 rounded-full whitespace-nowrap ${STATUS[u.tone].bg} ${STATUS[u.tone].fg}`}>
            {u.status}
          </span>
        </td>
        <td className="px-3 py-3.5 align-top">
          <div className="flex flex-col gap-1.5 items-start">
            <a
              href={u.official}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12.5px] text-royal font-medium whitespace-nowrap"
            >
              Official page
            </a>
            <Link to={`/blog/${u.guide}`} className="text-[12.5px] text-royal font-medium whitespace-nowrap">
              Guide
            </Link>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              className="border-none bg-royal-soft text-royal font-display font-semibold text-[12px] px-2.5 py-1.5 rounded-lg cursor-pointer whitespace-nowrap"
            >
              {open ? 'Hide details' : 'Details'}
            </button>
          </div>
        </td>
      </tr>
      {open && (
        <tr className="border-t border-line-soft bg-[#F9FBFE]">
          <td colSpan={8} className="px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 max-w-4xl">
              <p className="text-[13px] leading-relaxed m-0 flex-1">{u.detail}</p>
              <Link
                to="/apply"
                className="shrink-0 text-center bg-royal text-white font-display font-semibold text-[13px] px-5 py-2.5 rounded-[10px]"
              >
                Apply with VL
              </Link>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// One labelled field inside a phone card. The <dt>/<dd> pairing is what makes a screen reader
// read "English certificate, IELTS 6.0" rather than two unrelated fragments.
function CardRow({ label, value }) {
  return (
    <div className="flex gap-3 py-1.5 border-b border-line-soft last:border-b-0">
      <dt className="text-[12px] text-mist w-[124px] shrink-0">{label}</dt>
      <dd className="text-[12.5px] text-ink m-0 flex-1 leading-snug">{value}</dd>
    </div>
  )
}

// A labelled filter dropdown. The visible prompt doubles as the accessible name.
function Filter({ id, label, value, onChange, options }) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        Filter by {label.toLowerCase()}
      </label>
      <select id={id} value={value} onChange={onChange} className={selectClass}>
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </>
  )
}
