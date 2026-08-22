import { useState } from 'react'
import { inputClass, Container } from '../components/ui'
import { submitForm } from '../lib/submitForm'
import { useSeo } from '../hooks/useSeo'

const STEP_LABELS = ['Step 1 of 3, about you', 'Step 2 of 3, your education', 'Step 3 of 3, your study plans']

const NEXT_STEPS = [
  { mark: '1', label: 'A counsellor reviews your profile within 24 hours' },
  { mark: '2', label: 'A free call where we build your university shortlist' },
  { mark: '3', label: 'A document checklist and scholarship matching' },
  { mark: '4', label: 'Applications submitted and tracked in one place' },
]

const emptyForm = {
  name: '', email: '', phone: '', nation: '',
  qual: '', grade: '', english: '',
  country: '', level: '', program: '', intake: '', notes: '',
}

const selectClass = `${inputClass} text-ink`

export default function Apply() {
  useSeo(
    'Apply Now',
    'Start your application to study in Italy or France from Pakistan. It takes about three minutes, and a real counsellor reviews every application personally within 24 hours.'
  )
  const [step, setStep] = useState(1)
  const [hint, setHint] = useState('')
  const [f, setF] = useState(emptyForm)

  const set = (k) => (e) => {
    setHint('')
    setF((s) => ({ ...s, [k]: e.target.value }))
  }

  const goNext = () => {
    if (step === 1 && (!f.name.trim() || !f.phone.trim())) {
      setHint('Your name and phone number are required.')
      return
    }
    if (step === 3 && !f.country) {
      setHint('Please choose a preferred country.')
      return
    }
    if (step === 3) submitForm('Application form', f)
    setStep(step + 1)
    setHint('')
  }
  const goBack = () => {
    setStep(step - 1)
    setHint('')
  }

  return (
    <div>
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-4.5 lg:pt-12 lg:pb-6 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:max-w-2xl">
          <h1 className="font-display font-bold text-[25px] sm:text-[30px] text-navy m-0 mb-1.5">Start your application</h1>
          <p className="text-[13.5px] leading-relaxed m-0">It takes about three minutes, and a counsellor reads every application personally.</p>
        </Container>
      </section>

      <div className="px-5 sm:px-8 lg:px-12 pb-4.5">
        <Container className="lg:max-w-2xl">
          <div className="flex gap-1.5 mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex-1 h-[5px] rounded-full ${step >= i ? 'bg-royal' : 'bg-[#E4E9F1]'}`} />
            ))}
          </div>
          <div className="text-[12px] font-semibold text-royal">{step <= 3 ? STEP_LABELS[step - 1] : 'Complete'}</div>
        </Container>
      </div>

      <section className="px-5 sm:px-8 lg:px-12 pb-10 lg:pb-16">
        <Container className="lg:max-w-2xl">
          {step === 1 && (
            <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2">
              <input value={f.name} onChange={set('name')} placeholder="Full name, as in your passport" className={`${inputClass} sm:col-span-2`} />
              <input value={f.email} onChange={set('email')} placeholder="Email address" className={inputClass} />
              <input value={f.phone} onChange={set('phone')} placeholder="Phone or WhatsApp number" className={inputClass} />
              <input value={f.nation} onChange={set('nation')} placeholder="Nationality, for example Pakistani" className={`${inputClass} sm:col-span-2`} />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2">
              <select value={f.qual} onChange={set('qual')} className={selectClass}>
                <option value="">Highest qualification</option>
                <option>Matric or O Levels</option>
                <option>FSc, FA or A Levels</option>
                <option>Bachelor degree (BS, BSc, BA)</option>
                <option>Master degree (MS, MSc, MA)</option>
              </select>
              <input value={f.grade} onChange={set('grade')} placeholder="Marks or CGPA, for example 78% or 3.2" className={inputClass} />
              <select value={f.english} onChange={set('english')} className={`${selectClass} sm:col-span-2`}>
                <option value="">English proficiency</option>
                <option>IELTS or TOEFL taken</option>
                <option>Test booked</option>
                <option>Not yet, I need advice</option>
              </select>
              <div className="sm:col-span-2 bg-[#F9FBFE] border border-dashed border-[#C9D5E8] rounded-xl p-4 text-center text-[12.5px] text-slate">
                You can send your transcripts, passport and attestation documents on WhatsApp once a counsellor has reviewed your profile.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2">
              <select value={f.country} onChange={set('country')} className={selectClass}>
                <option value="">Preferred country</option>
                <option>Italy</option>
                <option>France</option>
                <option>Either, advise me</option>
              </select>
              <select value={f.level} onChange={set('level')} className={selectClass}>
                <option value="">Degree level</option>
                <option>Bachelor</option>
                <option>Master</option>
                <option>PhD</option>
              </select>
              <input value={f.program} onChange={set('program')} placeholder="Preferred program or field" className={inputClass} />
              <select value={f.intake} onChange={set('intake')} className={selectClass}>
                <option value="">Target intake</option>
                <option>September 2026</option>
                <option>February 2027</option>
                <option>September 2027</option>
              </select>
              <textarea
                value={f.notes}
                onChange={set('notes')}
                placeholder="Anything else we should know, such as budget, scholarships or preferred cities"
                rows={3}
                className={`${inputClass} resize-y sm:col-span-2`}
              />
            </div>
          )}

          {step === 4 && (
            <div className="bg-green-soft border border-[#CBE5D8] rounded-2xl p-[24px_20px] lg:p-10 text-center">
              <div className="w-[52px] h-[52px] rounded-full bg-green text-white text-[24px] flex items-center justify-center mx-auto mb-3">✓</div>
              <div className="font-display font-semibold text-[17px] text-navy mb-1.5">Application received</div>
              <p className="text-[13.5px] leading-relaxed m-0 mb-4 max-w-sm mx-auto">
                Thank you {f.name}. Your counsellor will review your profile and reach out on WhatsApp within 24 hours with the next steps.
              </p>
              <div className="text-left bg-white rounded-xl px-4 py-3.5 max-w-sm mx-auto">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-mist mb-2.5">What happens next</div>
                {NEXT_STEPS.map((n, i) => (
                  <div key={i} className="flex gap-2.5 py-1.5 text-[13px] text-ink">
                    <span className="text-gold">{n.mark}</span>
                    {n.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step <= 3 && (
            <>
              <div className="flex gap-2.5 mt-4.5">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex-1 border-[1.5px] border-[#D6DEEC] bg-white text-navy font-display font-semibold text-[14.5px] py-3.5 rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-[2] bg-royal text-white font-display font-semibold text-[14.5px] py-3.5 rounded-xl cursor-pointer shadow-[0_8px_20px_rgba(43,92,230,0.28)]"
                >
                  {step === 3 ? 'Submit application' : 'Continue'}
                </button>
              </div>
              {hint && <div className="text-[12.5px] text-rust text-center mt-2.5">{hint}</div>}
            </>
          )}
        </Container>
      </section>
    </div>
  )
}
