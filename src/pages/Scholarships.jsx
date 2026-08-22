import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui'
import { useSeo } from '../hooks/useSeo'
import { SCHOLARSHIPS } from '../data/scholarships'

const TABS = ['All', 'Italy', 'France']
const checkerSelect = 'px-3.5 py-3 rounded-[11px] border-none text-[14px] bg-white text-ink outline-none'

function buildResult({ country, level, grade }) {
  if (!country || !level || !grade) {
    return { title: 'Almost there', text: 'Answer all three questions to see what you might qualify for.' }
  }
  const strong = grade === 'Above 80%'
  const italy = country !== 'France'
  const france = country !== 'Italy'
  const fullyFunded = []
  const partial = []
  if (italy) {
    fullyFunded.push('the DSU scholarship, which is based on income and can cover tuition, housing and meals')
    if (strong && level !== 'Bachelor') fullyFunded.push('Invest Your Talent in Italy')
    if (strong) partial.push('university merit awards')
  }
  if (france) {
    if (strong && level !== 'Bachelor') fullyFunded.push('the Eiffel Excellence scholarship')
    partial.push('differentiated fee waivers')
  }
  if (fullyFunded.length) {
    return {
      title: 'Good news, a fully funded route looks realistic',
      text: `Based on your answers, you should be considered for ${fullyFunded.join(' and ')}. ${
        partial.length ? `You may also qualify for ${partial.join(' and ')} on top of that. ` : ''
      }A counsellor can confirm the exact amounts and prepare the documents with you.`,
    }
  }
  return {
    title: 'You have options, though not full funding yet',
    text: `Based on your answers you should be considered for ${partial.join(' and ') || 'a partial fee reduction'}. A counsellor can look at your full profile and check if a fully funded route opens up once we see your grades and documents.`,
  }
}

export default function Scholarships() {
  useSeo(
    'Fully Funded Scholarships in Italy and France for Pakistani Students',
    'See which Italy and France scholarships are genuinely fully funded, covering tuition and living costs, versus which only cut your fees. Free scholarship check for students applying from Pakistan.'
  )
  const [tab, setTab] = useState('All')
  const [fundedOnly, setFundedOnly] = useState(false)
  const [answers, setAnswers] = useState({ country: '', level: '', grade: '' })
  const [result, setResult] = useState(null)

  const setAnswer = (k) => (e) => {
    setAnswers((a) => ({ ...a, [k]: e.target.value }))
    setResult(null)
  }
  const runCheck = () => setResult(buildResult(answers))
  const list = SCHOLARSHIPS.filter((x) => tab === 'All' || x.country === tab)
    .filter((x) => !fundedOnly || x.fullyFunded)
    .sort((a, b) => (b.fullyFunded ? 1 : 0) - (a.fullyFunded ? 1 : 0))

  return (
    <div>
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-5 lg:pt-12 lg:pb-8 bg-gradient-to-b from-[#FBF7EC] to-white">
        <Container className="lg:max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white border border-[#EFE6CC] text-gold-ink font-semibold text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full mb-3.5">
            ✦ Fully funded scholarships
          </div>
          <h1 className="font-display font-bold text-[26px] sm:text-[32px] text-navy m-0 mb-2 leading-tight">Find a scholarship that actually covers your costs</h1>
          <p className="text-[14px] leading-relaxed m-0">
            Most students who come to us want one thing first: a route that is genuinely fully funded, tuition and
            living costs both, not just a discount. We check that before anything else, and we are upfront below
            about which scholarships really do that and which only reduce your fees.
          </p>
        </Container>
      </section>

      {/* Eligibility checker */}
      <section className="px-5 sm:px-8 lg:px-12 mt-2.5">
        <Container className="lg:max-w-xl">
          <div className="rounded-[20px] bg-navy p-[22px_20px] lg:p-8">
            <h2 className="font-display font-semibold text-[18px] text-white m-0 mb-1">Scholarship checker</h2>
            <p className="text-[13px] text-[#AAB8D4] m-0 mb-4">Three quick questions and you get an instant read, fully funded options first.</p>
            <div className="flex flex-col gap-2.5">
              <select value={answers.country} onChange={setAnswer('country')} className={checkerSelect}>
                <option value="">Where do you want to study?</option>
                <option>Italy</option>
                <option>France</option>
                <option>Either</option>
              </select>
              <select value={answers.level} onChange={setAnswer('level')} className={checkerSelect}>
                <option value="">What will you study?</option>
                <option>Bachelor</option>
                <option>Master</option>
                <option>PhD</option>
              </select>
              <select value={answers.grade} onChange={setAnswer('grade')} className={checkerSelect}>
                <option value="">Your academic average</option>
                <option>Above 80%</option>
                <option>65 to 80%</option>
                <option>Below 65%</option>
              </select>
              <button
                type="button"
                onClick={runCheck}
                className="bg-gold text-navy font-display font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer"
              >
                Check what I qualify for
              </button>
            </div>
            {result && (
              <div className="mt-3.5 bg-white/8 border border-white/15 rounded-[14px] p-4">
                <div className="font-display font-semibold text-[14.5px] text-gold mb-1.5">{result.title}</div>
                <div className="text-[13px] leading-relaxed text-[#DCE4F2]">{result.text}</div>
                <Link
                  to="/contact"
                  className="block text-center mt-3.5 bg-white text-navy font-display font-semibold text-[13.5px] py-3 rounded-[10px]"
                >
                  Get a full check, free
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* List */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-9 lg:pb-16">
        <Container>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <div className="flex gap-2 sm:max-w-md flex-1">
              {TABS.map((t) => {
                const active = t === tab
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2.5 rounded-[11px] border font-display font-semibold text-[13px] cursor-pointer ${
                      active ? 'border-navy bg-navy text-white' : 'border-[#E4E9F1] bg-white text-ink'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={() => setFundedOnly((v) => !v)}
              className={`py-2.5 px-4 rounded-[11px] border font-display font-semibold text-[13px] cursor-pointer whitespace-nowrap ${
                fundedOnly ? 'border-green bg-green text-white' : 'border-[#E4E9F1] bg-white text-ink'
              }`}
            >
              {fundedOnly ? '✓ Fully funded only' : 'Show fully funded only'}
            </button>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {list.map((sc, i) => (
              <div key={i} className="rounded-2xl p-[18px] bg-gradient-to-br from-[#FBF7EC] to-[#FDFBF5] border border-[#EFE6CC]">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gold-ink">
                    {sc.flag} {sc.country}
                  </span>
                  {sc.fullyFunded ? (
                    <span className="text-[10.5px] font-semibold px-2 py-1 rounded-full bg-green-soft text-green whitespace-nowrap">Fully funded</span>
                  ) : (
                    <span className="text-[10.5px] font-semibold px-2 py-1 rounded-full bg-[#F4F7FC] text-mist whitespace-nowrap">Fee reduction</span>
                  )}
                </div>
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <div className="font-display font-semibold text-[15.5px] text-navy">{sc.name}</div>
                  <span className="text-[11.5px] font-semibold text-rust whitespace-nowrap shrink-0">{sc.deadline}</span>
                </div>
                <div className="text-[13px] leading-relaxed mb-1.5">
                  <strong className="text-navy font-semibold">What you get:</strong> {sc.benefit}
                </div>
                <div className="text-[13px] leading-relaxed">
                  <strong className="text-navy font-semibold">Who qualifies:</strong> {sc.eligibility}
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-8 border border-dashed border-[#D6DEEC] rounded-2xl text-[13px] text-slate">
                No fully funded scholarships match that filter yet. Try All instead, or ask us directly, since new ones open through the year.
              </div>
            )}
          </div>

          <div className="mt-5.5 border border-dashed border-[#D6DEEC] rounded-2xl p-[18px] text-center lg:max-w-xl lg:mx-auto">
            <div className="font-display font-semibold text-[14.5px] text-navy mb-1">Not sure which one fits you?</div>
            <div className="text-[13px] leading-normal mb-3">We match every student to all the scholarships they qualify for as part of the free consultation, and we always check the fully funded ones first.</div>
            <Link to="/contact" className="inline-block bg-royal text-white font-display font-semibold text-[13.5px] px-5 py-3 rounded-[11px]">
              Book a free consultation
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}
