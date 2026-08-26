import { useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { inputClass, Container } from '../components/ui'
import { UNIVERSITIES, SUBJECTS } from '../data/universities'
import { STATUS } from '../data/site'
import { IMAGES } from '../data/images'
import { useSeo, graph, absolute } from '../hooks/useSeo'

const selectClass = 'flex-1 min-w-0 px-3 py-3 rounded-[11px] border border-field text-[13px] bg-white text-ink outline-none focus:border-royal'

const emptyFilters = { query: '', country: '', level: '', subject: '', tuition: '', intake: '' }

function matchTuition(u, tuition) {
  if (!tuition) return true
  if (tuition === 'Under €2,000') return u.t < 2000
  if (tuition === '€2,000 to €4,000') return u.t >= 2000 && u.t <= 4000
  if (tuition === 'Over €4,000') return u.t > 4000
  return true
}

function matchIntake(u, intake) {
  if (!intake) return true
  if (intake === 'September 2026') return u.intake === 'Sep 2026'
  if (intake === 'February 2027') return u.intake === 'Feb 2027'
  return true
}

export default function Universities() {
  useSeo(
    'Universities in Italy and France',
    'Search universities in Italy and France by country, level, subject, tuition and intake, with admission guidance for students applying from Pakistan.',
    {
      path: '/universities',
      image: IMAGES.universitiesHero.src,
      jsonLd: graph(
        {
          '@type': 'CollectionPage',
          name: 'Universities in Italy and France',
          url: absolute('/universities'),
          description:
            'Universities in Italy and France that Pakistani students can apply to, searchable by country, level, subject, tuition and intake.',
        }
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
      matchTuition(u, f.tuition) &&
      matchIntake(u, f.intake)
    )
  })

  return (
    <div>
      {/* A long view of a college: the whole run of the buildings, sky above, lawn below. The
          photograph is cut to 2.9 to 1 before it gets here, so this wide band shows the building
          rather than a slice through the middle of it. */}
      {/* Text on the left, picture on the right, exactly like the two country pages. The picture
          is cut to 16:10 and sits in a 16:10 box, so the whole college is visible at every screen
          size rather than being cropped to fit. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-6 lg:py-14 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:flex-1">
            <h1 className="font-display font-bold text-[27px] sm:text-[34px] lg:text-[40px] leading-[1.2] text-navy m-0 mb-3">
              Find your university
            </h1>
            <p className="text-[15px] sm:text-[16px] leading-relaxed m-0 mb-5 max-w-lg">
              Search the universities we work with in Italy and France by country, degree level, subject, tuition and
              intake. Every one of them takes applications from Pakistan.
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
              users — "Country", "Degree level" and so on. */}
          <Filter id="filter-country" label="Country" value={f.country} onChange={setField('country')}
                  options={['Italy', 'France']} />
          <Filter id="filter-level" label="Degree level" value={f.level} onChange={setField('level')}
                  options={['Bachelor', 'Master']} />
          <Filter id="filter-subject" label="Subject" value={f.subject} onChange={setField('subject')}
                  options={SUBJECTS} />
          <Filter id="filter-tuition" label="Tuition" value={f.tuition} onChange={setField('tuition')}
                  options={['Under €2,000', '€2,000 to €4,000', 'Over €4,000']} />
          <select id="filter-intake" aria-label="Intake" value={f.intake} onChange={setField('intake')} className={selectClass}>
            <option value="">Intake</option>
            <option>September 2026</option>
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
        <Container className="lg:max-w-5xl">
          <div className="text-[12.5px] text-mist mb-3">
            {results.length} {results.length === 1 ? 'university' : 'universities'} found
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {results.map((u) => {
              const open = openId === u.id
              return (
                <div key={u.id} className="border border-line rounded-2xl p-4 shadow-[0_6px_16px_rgba(10,30,60,0.05)]">
                  <div className="flex justify-between items-start gap-2.5 mb-2">
                    <div>
                      <div className="font-display font-semibold text-[15px] text-navy leading-tight">{u.name}</div>
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
                  <div className="flex justify-between items-center border-t border-line-soft pt-3">
                    <div>
                      <div className="font-display font-semibold text-[14px] text-navy">
                        {u.tuitionLabel}
                        <span className="text-[11px] text-mist font-normal"> a year</span>
                      </div>
                      <div className="text-[11.5px] text-mist">
                        {u.levels} · {u.intake}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? -1 : u.id)}
                      className="border-none bg-royal-soft text-royal font-display font-semibold text-[13px] px-3.5 py-2.5 rounded-[10px] cursor-pointer"
                    >
                      {open ? 'Hide details' : 'View details'}
                    </button>
                  </div>
                  {open && (
                    <div className="mt-3 bg-[#F9FBFE] border border-[#ECF0F7] rounded-xl p-3.5 text-[13px] leading-relaxed">
                      {u.detail}
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
        </Container>
      </section>

      {/* Written content below the search. A page that is only a filter and a list gives a
          search engine almost nothing to read, and gives a student nothing to decide with. */}
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
            Grades matter, but not as the single filter students imagine. A 60 to 70 percent average opens a great many
            public universities in both countries. What decides the outcome more often is whether the file arrived
            complete and on time, and whether the motivation letter was written for that specific programme rather than
            copied across eight applications.
          </p>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-5">
            One thing worth knowing before you filter by tuition: in Italy the fee shown is frequently a maximum, and
            the amount you actually pay is often calculated on assessed family income. In France, many public
            universities choose to waive the higher international rate and charge the same as they charge French
            students. Both mean the real number can be a good deal lower than the figure on the card.
          </p>

          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            How to use this list
          </h2>
          <div className="flex flex-col gap-2.5 mb-6">
            {[
              ['Filter by tuition before anything else.', 'Work out what you can afford per year, then look at what fits. It is a shorter and much less painful process than falling for a programme first.'],
              ['Check the language of instruction for every year.', 'A Master listed under an English title is not always taught in English throughout. Check the programme page, not the faculty page.'],
              ['Split your shortlist.', 'Two ambitious, four realistic, two you are confident of. Eight ambitious choices is the most common way a student loses a year.'],
              ['Ask about housing.', 'DSU housing in Italy and CROUS in France can halve your largest monthly cost, and availability differs enormously between universities.'],
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

          <p className="text-[14.5px] leading-[1.75] m-0 mb-5">
            We work with more universities than are listed here, and the list grows every intake. If you cannot find
            your subject, ask us rather than assuming it is not available. There is more on all of this in our guides on{' '}
            <Link to="/blog/choosing-a-university-in-italy-or-france" className="text-royal font-medium">
              choosing a university
            </Link>
            ,{' '}
            <Link to="/blog/cost-of-studying-in-italy-and-france" className="text-royal font-medium">
              what it really costs
            </Link>{' '}
            and{' '}
            <Link to="/blog/hec-ibcc-mofa-attestation-order" className="text-royal font-medium">
              getting your documents attested in the right order
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 mt-4 mb-10 lg:mb-16">
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
