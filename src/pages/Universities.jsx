import { useState } from 'react'
import { Link } from 'react-router-dom'
import { inputClass, Container } from '../components/ui'
import { UNIVERSITIES, SUBJECTS } from '../data/universities'
import { STATUS } from '../data/site'
import { useSeo } from '../hooks/useSeo'

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
    'Universities in Italy and France for Pakistani Students',
    'Search partner universities in Italy and France by country, degree level, subject, tuition and intake, including Bologna, Politecnico di Milano, Sorbonne and Sciences Po. Admission guidance for students applying from Pakistan.'
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
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-4 lg:pt-12 lg:pb-6 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:max-w-3xl">
          <h1 className="font-display font-bold text-[26px] sm:text-[32px] text-navy m-0 mb-2">Find your university</h1>
          <p className="text-[14px] leading-relaxed m-0 mb-4">Search across the universities we work with in Italy and France.</p>
          <input
            value={f.query}
            onChange={setField('query')}
            placeholder="Search by university or city"
            className={`${inputClass} px-4`}
          />
        </Container>
      </section>

      {/* Filters */}
      <div className="px-5 sm:px-8 lg:px-12 pb-1.5">
        <Container className="lg:max-w-3xl flex flex-col gap-2.5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <select value={f.country} onChange={setField('country')} className={selectClass}>
            <option value="">Country</option>
            <option>Italy</option>
            <option>France</option>
          </select>
          <select value={f.level} onChange={setField('level')} className={selectClass}>
            <option value="">Degree level</option>
            <option>Bachelor</option>
            <option>Master</option>
          </select>
          <select value={f.subject} onChange={setField('subject')} className={selectClass}>
            <option value="">Subject</option>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select value={f.tuition} onChange={setField('tuition')} className={selectClass}>
            <option value="">Tuition</option>
            <option>Under €2,000</option>
            <option>€2,000 to €4,000</option>
            <option>Over €4,000</option>
          </select>
          <select value={f.intake} onChange={setField('intake')} className={selectClass}>
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
    </div>
  )
}
