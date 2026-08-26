import { useState } from 'react'
import { Link } from 'react-router-dom'
import Faq from '../components/Faq'
import { Container } from '../components/ui'
import { useSeo, faqSchema, graph, absolute } from '../hooks/useSeo'
import {
  SCHOLARSHIPS,
  SCHOLARSHIPS_REVIEWED,
  SCHOLARSHIP_FAQS,
  COVERAGE_ROWS,
  SCHOLARSHIP_CALENDAR,
} from '../data/scholarships'

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
    'Fully Funded Scholarships in Italy, France',
    'Which Italy and France scholarships are genuinely fully funded, which only cut your fees, and a free check of what you qualify for from Pakistan.',
    {
      path: '/scholarships',
      image: '/img/graduation-caps-throw-1200.jpg',
      jsonLd: graph(
        {
          '@type': 'CollectionPage',
          name: 'Scholarships in Italy and France for Pakistani students',
          url: absolute('/scholarships'),
          description:
            'Fully funded and partial scholarships in Italy and France, with what each one covers and who qualifies.',
        },
        // The schemes themselves, named. "Fully funded scholarship" is the phrase students search
        // before anything else, but they also search the schemes by name, DSU and Eiffel most of
        // all. Listing them is what connects this page to those searches. Generated from the same
        // array the page renders, so it can never name a scheme that is not on the page.
        {
          '@type': 'ItemList',
          name: 'Scholarships in Italy and France for Pakistani students',
          numberOfItems: SCHOLARSHIPS.length,
          itemListElement: SCHOLARSHIPS.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'EducationalOccupationalProgram',
              name: s.name,
              description: s.benefit,
              educationalCredentialAwarded: s.level,
              provider: { '@type': 'Organization', name: s.runBy },
              applicationDeadline: s.deadline,
            },
          })),
        },
        // Every question in here is answered further down this page, which is both Google's rule
        // and the reason the expandable boxes are worth having.
        faqSchema(SCHOLARSHIP_FAQS)
      ),
    }
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
  const fundedCount = SCHOLARSHIPS.filter((x) => x.fullyFunded).length
  const list = SCHOLARSHIPS.filter((x) => tab === 'All' || x.country === tab || x.country === 'Both')
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
              <label htmlFor="check-country" className="sr-only">Where do you want to study?</label>
              <select id="check-country" value={answers.country} onChange={setAnswer('country')} className={checkerSelect}>
                <option value="">Where do you want to study?</option>
                <option>Italy</option>
                <option>France</option>
                <option>Either</option>
              </select>
              <label htmlFor="check-level" className="sr-only">What will you study?</label>
              <select id="check-level" value={answers.level} onChange={setAnswer('level')} className={checkerSelect}>
                <option value="">What will you study?</option>
                <option>Bachelor</option>
                <option>Master</option>
                <option>PhD</option>
              </select>
              <label htmlFor="check-grade" className="sr-only">Your academic average</label>
              <select id="check-grade" value={answers.grade} onChange={setAnswer('grade')} className={checkerSelect}>
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
              <div role="status" aria-live="polite" className="mt-3.5 bg-white/8 border border-white/15 rounded-[14px] p-4">
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
              <div
                key={i}
                className={`rounded-2xl p-[18px] flex flex-col border ${
                  sc.fullyFunded
                    ? 'bg-gradient-to-br from-[#FBF7EC] to-[#FDFBF5] border-[#EFE6CC]'
                    : 'bg-white border-line'
                }`}
              >
                <div className="flex justify-between items-center mb-2 gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gold-ink">
                    {sc.flag} {sc.country === 'Both' ? 'Italy and France' : sc.country}
                  </span>
                  {sc.fullyFunded ? (
                    <span className="text-[10.5px] font-semibold px-2 py-1 rounded-full bg-green-soft text-green whitespace-nowrap">Fully funded</span>
                  ) : (
                    <span className="text-[10.5px] font-semibold px-2 py-1 rounded-full bg-[#F4F7FC] text-mist whitespace-nowrap">Fee reduction</span>
                  )}
                </div>
                <h3 className="font-display font-semibold text-[15.5px] text-navy m-0 mb-1 leading-snug">{sc.name}</h3>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] mb-2.5">
                  <span className="text-mist">{sc.level}</span>
                  <span className="w-1 h-1 rounded-full bg-[#D6DEEC]" />
                  <span className="font-semibold text-rust">{sc.deadline}</span>
                </div>

                {sc.covers?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {sc.covers.map((c) => (
                      <span key={c} className="text-[11px] bg-[#F4F7FC] text-ink px-2 py-1 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-[13px] leading-relaxed m-0 mb-1.5">
                  <strong className="text-navy font-semibold">What you get:</strong> {sc.benefit}
                </p>
                <p className="text-[13px] leading-relaxed m-0 mb-1.5">
                  <strong className="text-navy font-semibold">Who qualifies:</strong> {sc.eligibility}
                </p>
                <p className="text-[13px] leading-relaxed m-0 mb-2.5 flex-1">
                  <strong className="text-navy font-semibold">Watch out:</strong> {sc.watchOut}
                </p>

                <div className="border-t border-line-soft pt-2.5 text-[11.5px] leading-relaxed text-mist">
                  <div>Run by {sc.runBy}.</div>
                  <div>
                    Check the current terms at <span className="text-ink font-medium">{sc.official}</span>.
                  </div>
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-8 border border-dashed border-[#D6DEEC] rounded-2xl text-[13px] text-slate">
                No fully funded scholarships match that filter yet. Try All instead, or ask us directly, since new ones open through the year.
              </div>
            )}
          </div>

          <p className="text-[12.5px] leading-relaxed text-mist mt-4 lg:max-w-2xl">
            Amounts, income thresholds and deadlines above are approximate and were last checked on{' '}
            {SCHOLARSHIPS_REVIEWED}. Every scheme is run by the body named on its card, and every one of them revises
            its terms; confirm the current figures at the source before you make a decision based on them.
          </p>

          <div className="mt-5.5 border border-dashed border-[#D6DEEC] rounded-2xl p-[18px] text-center lg:max-w-xl lg:mx-auto">
            <div className="font-display font-semibold text-[14.5px] text-navy mb-1">Not sure which one fits you?</div>
            <div className="text-[13px] leading-normal mb-3">We match every student to all the scholarships they qualify for as part of the free consultation, and we always check the fully funded ones first.</div>
            <Link to="/contact" className="inline-block bg-royal text-white font-display font-semibold text-[13.5px] px-5 py-3 rounded-[11px]">
              Book a free consultation
            </Link>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------
          Everything below the list. This is the page most applicants land on, so it carries the
          full answer rather than sending them somewhere else for it: what the words actually
          mean, what a scholarship does not pay for, what the paperwork is, when to apply, how to
          tell a real scheme from a scam, and what we can and cannot promise.
          ------------------------------------------------------------------------------------ */}

      <section className="px-5 sm:px-8 lg:px-12 pt-2 lg:pt-6">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            Fully funded, or just cheaper? The difference decides everything
          </h2>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-3">
            Almost every consultancy page says "scholarships available". Very few say which ones pay your rent, and
            that single distinction is what decides whether you can actually go.
          </p>
          <div className="grid sm:grid-cols-2 gap-3.5 mb-5">
            <div className="rounded-[16px] border border-[#EFE6CC] bg-gradient-to-br from-[#FBF7EC] to-[#FDFBF5] p-4">
              <div className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-green mb-1.5">
                Fully funded
              </div>
              <div className="font-display font-semibold text-[15px] text-navy mb-1.5">Covers tuition and your life</div>
              <p className="text-[13.5px] leading-relaxed m-0">
                Tuition is paid and you receive enough each month to live on. You still need money for the flight, the
                visa file and the first month's deposit, but the year itself is funded. {fundedCount} of the schemes
                listed above fall in this group.
              </p>
            </div>
            <div className="rounded-[16px] border border-line bg-white p-4">
              <div className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-mist mb-1.5">
                Fee reduction
              </div>
              <div className="font-display font-semibold text-[15px] text-navy mb-1.5">Lowers the bill, nothing more</div>
              <p className="text-[13.5px] leading-relaxed m-0">
                Genuinely useful, sometimes worth thousands of euros, but your rent, food and transport are still
                yours to fund. Read any "50% scholarship" as a discount on tuition only, unless it says otherwise in
                writing.
              </p>
            </div>
          </div>

          <h3 className="font-display font-semibold text-[16px] text-navy m-0 mb-2.5">What each type actually pays for</h3>
          <div className="-mx-5 sm:mx-0 overflow-x-auto mb-6">
            <div className="px-5 sm:px-0 min-w-full inline-block align-middle">
              <table className="min-w-full border border-line rounded-xl overflow-hidden text-left border-separate border-spacing-0">
                <thead>
                  <tr>
                    {['Cost', 'A fully funded scholarship', 'A fee reduction'].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="bg-[#F4F7FC] text-navy font-display font-semibold text-[12.5px] px-3.5 py-2.5 border-b border-line whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COVERAGE_ROWS.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-3.5 py-2.5 text-[13px] leading-snug align-top ${
                            i < COVERAGE_ROWS.length - 1 ? 'border-b border-line-soft' : ''
                          } ${j === 0 ? 'font-medium text-navy' : 'text-ink'}`}
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
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            What a Pakistani applicant needs to have ready
          </h2>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-3">
            Merit awards need your academic file. The need based routes, which are the largest ones in Italy, need
            something most students have never had to produce: proof of what your family earns and owns, in a form an
            Italian regional authority will accept.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 mb-4">
            {[
              ['Academic documents', 'Matric and FSc through IBCC, a degree and transcript through HEC, then MOFA, then embassy legalisation.'],
              ['Proof of English', 'IELTS or TOEFL, or a Medium of Instruction letter from your last institution.'],
              ['Family income proof', 'Tax records or an income certificate for whoever supports you, translated and legalised.'],
              ['Family property and assets', 'Needed for the ISEE calculation behind DSU and Italian tuition banding.'],
              ['Bank statements', 'Six months, showing funds that have been there rather than a recent deposit.'],
              ['Motivation letter and CV', 'Rewritten for each scheme. The merit competitions are decided largely on these.'],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-3 items-start py-2.5 border-b border-line-soft">
                <div className="w-[24px] h-[24px] rounded-full bg-green-soft text-green flex items-center justify-center text-[12px] shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="font-display font-medium text-[14px] text-navy">{t}</div>
                  <div className="text-[13px] leading-relaxed text-slate mt-0.5">{d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] border border-[#EFE6CC] bg-gradient-to-br from-[#FBF7EC] to-[#FDFBF5] px-4 py-3.5 flex gap-3 mb-6">
            <span className="text-gold-ink text-[15px] leading-none mt-1">◆</span>
            <p className="text-[13.5px] leading-[1.65] text-ink m-0">
              The income and property documents run on the same attestation chain as your degree, and take about as
              long. Start both in the same week. Students who wait until a scholarship deadline is announced have
              already lost, because the paperwork takes longer than the window does.
            </p>
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-2">
            The scholarship year, month by month
          </h2>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-4">
            Deadlines shift each year, so treat this as the shape rather than a set of dates. What does not move is
            that scholarship deadlines sit before or alongside admission deadlines, never after.
          </p>
          <div className="flex flex-col mb-6">
            {SCHOLARSHIP_CALENDAR.map(([when, what], i, arr) => (
              <div key={when} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-royal shrink-0 mt-2" />
                  {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-[#E9EFF8] my-1" />}
                </div>
                <div className="pb-4">
                  <div className="font-display font-semibold text-[14px] text-navy">{when}</div>
                  <div className="text-[13.5px] leading-relaxed text-slate mt-0.5">{what}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            Five things that cost students a scholarship
          </h2>
          <ol className="m-0 mb-6 pl-0 list-none flex flex-col gap-2.5">
            {[
              'Waiting for an admission offer before applying for funding. Most scholarship deadlines have already passed by then.',
              'Not knowing that Eiffel Excellence is nominated by the university, so never asking to be put forward.',
              'Treating the Italian ISEE paperwork as optional. Skip it and you are charged the top tuition band and considered for nothing.',
              'One motivation letter sent to eight schemes. The merit competitions are decided on this document, and a generic one reads as generic.',
              'Applying only to the famous awards. The regional and university level schemes are less contested and often larger.',
            ].map((t, i) => (
              <li key={i} className="flex gap-3 text-[14.5px] leading-[1.7] text-ink">
                <span className="shrink-0 w-6 h-6 rounded-full bg-rust-soft text-rust font-display font-semibold text-[12px] flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* The honest bit. It protects the student from scams and protects you from a claim. */}
      <section className="px-5 sm:px-8 lg:px-12">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[18px] border border-[#E3EBF8] bg-[#F4F8FE] p-5 lg:p-7 mb-6">
            <h2 className="font-display font-semibold text-[19px] lg:text-[21px] text-navy m-0 mb-3">
              What we can promise, and what nobody can
            </h2>
            <p className="text-[14px] leading-[1.7] m-0 mb-3">
              Scholarship decisions are made by governments, universities and awarding bodies. No consultant anywhere
              can influence them, and any agent who guarantees you a scholarship is either mistaken or misleading you.
              What we do is make sure you apply for everything you qualify for, that nothing is missed on a deadline,
              and that your documents arrive in the form the awarding body expects.
            </p>
            <p className="text-[14px] leading-[1.7] m-0 mb-3">
              Scholarship matching is part of the free first consultation. We tell you honestly whether a fully funded
              route is realistic for your profile before you have paid us anything. If you then engage us for the
              application work, the fee and exactly what it covers are agreed with you in writing first, and nothing
              is ever charged through this website.
            </p>
            <p className="text-[14px] leading-[1.7] m-0 mb-3">
              <strong className="text-navy font-semibold">Protect yourself:</strong> none of the schemes on this page
              charges a student a fee to be considered. If anyone asks you to pay to apply for a scholarship, or to
              "release" one that has supposedly already been awarded, stop and check the awarding body's own website
              before paying anything. Real awards are announced by the awarding body, not by a WhatsApp message.
            </p>
            <p className="text-[13px] leading-relaxed text-slate m-0">
              Nothing on this page is legal, financial or immigration advice, and the figures are approximations
              reviewed on {SCHOLARSHIPS_REVIEWED}. See our{' '}
              <Link to="/terms" className="text-royal font-medium">
                terms of use
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-royal font-medium">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3.5">
            Scholarship questions
          </h2>
          <Faq id="scholarships" items={SCHOLARSHIP_FAQS} defaultOpen={0} />
          <p className="text-[14px] leading-[1.75] mt-5 m-0">
            There is more in our longer guide to{' '}
            <Link to="/blog/fully-funded-scholarships-for-pakistani-students" className="text-royal font-medium">
              fully funded scholarships in Italy and France
            </Link>
            , and on{' '}
            <Link to="/blog/cost-of-studying-in-italy-and-france" className="text-royal font-medium">
              what studying there actually costs
            </Link>{' '}
            once a scholarship is counted in.
          </p>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 mt-8 mb-10 lg:mb-16">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[20px] bg-gradient-to-br from-navy to-navy-soft p-[28px_22px] lg:p-10 text-center">
            <h2 className="font-display font-semibold text-[21px] lg:text-[26px] text-white m-0 mb-2 leading-tight">
              Find out which of these you qualify for
            </h2>
            <p className="text-[13.5px] lg:text-[15px] leading-relaxed text-[#AAB8D4] m-0 mb-5 max-w-md mx-auto">
              Send us your marks and your family's income situation. We will tell you which routes are genuinely open
              to you, and which are not, before you spend a rupee.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:justify-center sm:max-w-md mx-auto">
              <Link to="/contact" className="bg-white text-navy font-display font-semibold text-[15px] py-3.5 px-6 rounded-xl sm:flex-1">
                Book a free check
              </Link>
              <Link
                to="/apply"
                className="bg-white/10 border border-white/25 text-white font-display font-semibold text-[15px] py-3.5 px-6 rounded-xl sm:flex-1"
              >
                Start an application
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
