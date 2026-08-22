import { useState } from 'react'
import Img from '../components/Img'
import Faq from '../components/Faq'
import { inputClass, Container } from '../components/ui'
import { COUNTRIES } from '../data/countries'
import { IMAGES } from '../data/images'
import { submitForm } from '../lib/submitForm'
import { useSeo } from '../hooks/useSeo'
import { Link } from 'react-router-dom'

export default function Country({ which }) {
  const c = COUNTRIES[which]
  useSeo(
    `Study in ${c.name} from Pakistan, Scholarships and Visa Guide`,
    `${c.heroText} We check fully funded scholarship options first, then handle admissions, HEC and IBCC attestation, and the student visa with you.`
  )
  const [form, setForm] = useState({ name: '', phone: '', program: '' })
  const [sent, setSent] = useState(false)
  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = () => {
    if (!form.name.trim()) return
    setSent(true)
    submitForm(`${c.name} consultation request`, form)
  }

  return (
    <div>
      {/* Hero */}
      <section className="px-5 sm:px-8 lg:px-12 pt-7 pb-6 lg:py-16 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:flex-1">
            <div className={`inline-flex items-center gap-1.5 ${c.badge.bg} ${c.badge.fg} font-semibold text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full mb-3.5`}>
              {c.flag} Destination
            </div>
            <h1 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] text-navy m-0 mb-3">{c.heroTitle}</h1>
            <p className="text-[15px] sm:text-[16px] leading-relaxed m-0 mb-4.5 max-w-lg">{c.heroText}</p>
            <Link
              to="/contact"
              className="block sm:inline-block bg-navy text-white text-center font-display font-semibold text-[15px] py-4 px-8 rounded-xl shadow-[0_8px_20px_rgba(10,30,60,0.22)] mb-4.5 lg:mb-0"
            >
              Get a free {c.name} consultation
            </Link>
          </div>
          <div className="rounded-[18px] overflow-hidden h-[190px] lg:h-[340px] lg:flex-1">
            <Img image={IMAGES[c.heroKey]} loading="eager" className="w-full h-full" />
          </div>
        </Container>
      </section>

      {/* Key stats */}
      <div className="px-5 sm:px-8 lg:px-12 pt-2">
        <Container className="grid grid-cols-3 gap-2 lg:gap-4 lg:max-w-3xl">
          {c.stats.map((k, i) => (
            <div key={i} className="bg-[#F6F9FE] border border-[#E9EFF8] rounded-[13px] px-2.5 py-3 lg:py-5 text-center">
              <div className="font-display font-bold text-[17px] lg:text-[20px] text-navy">{k.v}</div>
              <div className="text-[10.5px] leading-tight text-slate mt-0.5">{k.l}</div>
            </div>
          ))}
        </Container>
      </div>

      {/* Reasons */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-4">Why study in {c.name}?</h2>
          <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-8">
            {c.reasons.map((r, i) => (
              <div key={i} className="flex gap-3 py-2.5 border-b border-line-soft">
                <div className="w-[26px] h-[26px] rounded-full bg-green-soft text-green flex items-center justify-center text-[13px] shrink-0">✓</div>
                <div>
                  <div className="font-display font-medium text-[14.5px] text-navy">{r.t}</div>
                  <div className="text-[13px] leading-normal text-slate mt-0.5">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Popular universities */}
      <section className="pt-8 lg:pt-14 pb-1.5">
        <Container className="px-5 sm:px-8 lg:px-12">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3.5">Popular universities</h2>
        </Container>
        <div className="flex gap-3 overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto pt-1 pb-3 no-scrollbar md:gap-4">
          {c.unis.map((u, i) => (
            <div key={i} className="shrink-0 w-[240px] md:w-auto border border-line rounded-[15px] p-4 bg-white shadow-[0_6px_16px_rgba(10,30,60,0.05)]">
              <div className="font-display font-semibold text-[14.5px] text-navy leading-snug">{u.name}</div>
              <div className="text-[12px] text-mist mt-1 mb-2.5">{u.city}</div>
              <div className="text-[12.5px] leading-normal mb-2.5">{u.known}</div>
              <div className="font-display font-semibold text-[13px] text-royal">{u.tuition} a year</div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular courses */}
      <section className="px-5 sm:px-8 lg:px-12 pt-7 lg:pt-12 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3.5">Popular courses</h2>
          <div className="flex flex-wrap gap-2">
            {c.courses.map((co, i) => (
              <span key={i} className="bg-[#F4F7FC] border border-[#E9EFF8] text-navy font-medium text-[13px] px-3.5 py-2.5 rounded-full">
                {co}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Costs */}
      <section className="px-5 sm:px-8 lg:px-12 mt-8 lg:mt-14">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[18px] bg-navy p-[22px_20px] lg:p-8">
            <h2 className="font-display font-semibold text-[19px] sm:text-[22px] text-white m-0 mb-3.5">Tuition and living costs</h2>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2.5">
              {c.costs.map((cost, i) => (
                <div key={i} className="flex justify-between gap-2.5 border-b border-white/10 pb-2.5">
                  <span className="text-[13.5px] text-[#AAB8D4]">{cost.l}</span>
                  <span className="font-display font-semibold text-[13.5px] text-white whitespace-nowrap">{cost.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[12px] text-[#8FA8E8]">{c.costNote}</div>
          </div>
        </Container>
      </section>

      {/* Scholarships */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3.5">Scholarships in {c.name}</h2>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2.5">
            {c.scholarships.map((sc, i) => (
              <div key={i} className="rounded-[15px] p-4 bg-gradient-to-br from-[#FBF7EC] to-[#FDFBF5] border border-[#EFE6CC]">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="font-display font-semibold text-[14.5px] text-navy">{sc.name}</div>
                  {sc.fullyFunded ? (
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-green-soft text-green whitespace-nowrap shrink-0">Fully funded</span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#F4F7FC] text-mist whitespace-nowrap shrink-0">Fee reduction</span>
                  )}
                </div>
                <div className="text-[13px] leading-normal">{sc.d}</div>
              </div>
            ))}
          </div>
          <Link to="/scholarships" className="block text-center mt-3 font-semibold text-[13.5px] text-royal">
            See all scholarships →
          </Link>
        </Container>
      </section>

      {/* Admission requirements */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3.5">What you need to apply</h2>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
            {c.requirements.map((rq, i) => (
              <div key={i} className="flex gap-2.5 items-start bg-[#F9FBFE] border border-[#ECF0F7] rounded-xl px-3.5 py-3">
                <span className="text-gold text-[14px] mt-0.5">◆</span>
                <span className="text-[13.5px] leading-normal text-navy">{rq}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Visa timeline */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-1">Student visa process</h2>
          <p className="text-[13.5px] leading-normal m-0 mb-4.5">{c.visaIntro}</p>
          <div className="flex flex-col">
            {c.timeline.map((tl, i) => {
              const notLast = i < c.timeline.length - 1
              return (
                <div key={i} className="flex gap-3.5">
                  <div className="flex flex-col items-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-royal-soft text-royal flex items-center justify-center font-display font-semibold text-[13px] shrink-0">
                      {tl.n}
                    </div>
                    {notLast && <div className="w-0.5 flex-1 bg-[#E9EFF8] my-1" />}
                  </div>
                  <div className="pb-4.5">
                    <div className="flex gap-2 items-baseline flex-wrap">
                      <span className="font-display font-semibold text-[14.5px] text-navy">{tl.t}</span>
                      <span className="text-[11.5px] font-semibold text-gold">{tl.when}</span>
                    </div>
                    <div className="text-[13px] leading-normal text-slate mt-0.5">{tl.d}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Lifestyle */}
      <section className="px-5 sm:px-8 lg:px-12 pt-7 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl lg:flex lg:items-center lg:gap-8">
          <div className="lg:flex-1">
            <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">Student life</h2>
            <p className="text-[14px] leading-relaxed m-0 mb-3.5 lg:mb-0">{c.lifestyle}</p>
          </div>
          <div className="rounded-2xl overflow-hidden h-[160px] lg:h-[220px] lg:flex-1">
            <Img image={IMAGES[c.lifeKey]} className="w-full h-full" />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3.5">{c.name} questions</h2>
          <Faq items={c.faqs} />
        </Container>
      </section>

      {/* Consultation form */}
      <section className="px-5 sm:px-8 lg:px-12 mt-8 mb-9 lg:mt-14 lg:mb-16">
        <Container className="lg:max-w-xl">
          <div className="rounded-[20px] bg-[#F4F8FE] border border-[#E3EBF8] p-5 lg:p-8">
            <h2 className="font-display font-semibold text-[19px] text-navy m-0 mb-1.5">Talk to a {c.name} specialist</h2>
            <p className="text-[13.5px] leading-normal m-0 mb-4">A free 30 minute call, honest advice, and no pressure to sign up.</p>
            {sent ? (
              <div className="bg-green-soft border border-[#CBE5D8] rounded-xl p-[18px] text-center">
                <div className="font-display font-semibold text-[15px] text-green">Got it. We will be in touch within 24 hours.</div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <input value={form.name} onChange={setField('name')} placeholder="Full name" className={inputClass} />
                <input value={form.phone} onChange={setField('phone')} placeholder="Phone or WhatsApp number" className={inputClass} />
                <input value={form.program} onChange={setField('program')} placeholder="Program you are interested in" className={inputClass} />
                <button
                  type="button"
                  onClick={submit}
                  className="bg-royal text-white font-display font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer shadow-[0_8px_20px_rgba(43,92,230,0.28)]"
                >
                  Book my free call
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  )
}
