import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Container } from '../components/ui'
import { Field, SelectField, Honeypot } from '../components/Field'
import { useLeadForm, PHONE_HINT } from '../hooks/useLeadForm'
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

export default function Apply() {
  useSeo(
    'Apply to Study in Italy or France',
    'Start your application to study in Italy or France from Pakistan. Three minutes to fill in, and a real counsellor reviews it within 24 hours. No fee to apply.',
    { path: '/apply' }
  )
  const [step, setStep] = useState(1)
  const { values: f, setField, submit, sending, error } = useLeadForm('Application form', emptyForm)

  // The form is a real <form> now, so this runs on Enter as well as on the button.
  const goNext = async (e) => {
    e.preventDefault()
    // Steps 1 and 2 only validate; step 3 validates AND sends, and we do not advance to the
    // "Application received" screen unless it actually arrived.
    const required = step === 1 ? ['name', 'phone'] : step === 3 ? ['country'] : []
    const ok = await submit({ required, send: step === 3 })
    if (!ok) return
    setStep(step + 1)
  }
  const goBack = () => setStep(step - 1)

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
          {/* A real form: Enter submits it, and the browser can offer to autofill a saved
              name, email and phone number. */}
          <form onSubmit={goNext} noValidate>
          {step === 1 && (
            <div className="relative flex flex-col gap-3.5 sm:grid sm:grid-cols-2">
              <Honeypot value={f.company} onChange={setField('company')} />
              <Field id="name" label="Full name" hint="As written in your passport" value={f.name}
                     onChange={setField('name')} autoComplete="name" required className="sm:col-span-2" />
              <Field id="email" label="Email address" value={f.email} onChange={setField('email')}
                     type="email" inputMode="email" autoComplete="email" />
              <Field id="phone" label="Phone or WhatsApp number" hint={PHONE_HINT} value={f.phone}
                     onChange={setField('phone')} type="tel" inputMode="numeric" autoComplete="tel"
                     maxLength={11} required />
              <Field id="nation" label="Nationality" hint="For example, Pakistani" value={f.nation}
                     onChange={setField('nation')} autoComplete="country-name" className="sm:col-span-2" />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-3.5 sm:grid sm:grid-cols-2">
              <SelectField id="qual" label="Highest qualification" prompt="Choose one" value={f.qual}
                           onChange={setField('qual')}
                           options={['Matric or O Levels', 'FSc, FA or A Levels', 'Bachelor degree (BS, BSc, BA)', 'Master degree (MS, MSc, MA)']} />
              <Field id="grade" label="Marks or CGPA" hint="For example 78% or 3.2" value={f.grade}
                     onChange={setField('grade')} />
              <SelectField id="english" label="English proficiency" prompt="Choose one" value={f.english}
                           onChange={setField('english')} className="sm:col-span-2"
                           options={['IELTS or TOEFL taken', 'Test booked', 'Not yet, I need advice']} />
              <div className="sm:col-span-2 bg-[#F9FBFE] border border-dashed border-[#C9D5E8] rounded-xl p-4 text-center text-[12.5px] text-slate">
                You can send your transcripts, passport and attestation documents on WhatsApp once a counsellor has reviewed your profile.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-3.5 sm:grid sm:grid-cols-2">
              <SelectField id="country" label="Preferred country" prompt="Choose one" value={f.country}
                           onChange={setField('country')} required
                           options={['Italy', 'France', 'Either, advise me']} />
              <SelectField id="level" label="Degree level" prompt="Choose one" value={f.level}
                           onChange={setField('level')} options={['Bachelor', 'Master', 'PhD']} />
              <Field id="program" label="Preferred program or field" value={f.program} onChange={setField('program')} />
              <SelectField id="intake" label="Target intake" prompt="Choose one" value={f.intake}
                           onChange={setField('intake')}
                           options={['September 2026', 'February 2027', 'September 2027']} />
              <Field as="textarea" rows={3} id="notes" label="Anything else we should know"
                     hint="Budget, scholarships, preferred cities" value={f.notes}
                     onChange={setField('notes')} className="sm:col-span-2" />
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
                {/* disabled while sending, so a slow connection cannot put three copies of the
                    same application in your inbox. */}
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-[2] bg-royal text-white font-display font-semibold text-[14.5px] py-3.5 rounded-xl cursor-pointer shadow-[0_8px_20px_rgba(43,92,230,0.28)] disabled:opacity-60 disabled:cursor-wait"
                >
                  {sending ? 'Sending…' : step === 3 ? 'Submit application' : 'Continue'}
                </button>
              </div>
              {/* role="alert" so the message is spoken, rather than appearing silently below a
                  button the visitor has already looked away from. */}
              <div role="alert" aria-live="polite" className="text-[12.5px] text-rust text-center mt-2.5 min-h-[1.2em]">
                {error}
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate text-center m-0 mt-1">
                A counsellor reads this personally. We never sell your details or pass them to
                other agents. See our{' '}
                <Link to="/privacy" className="text-royal font-medium underline">
                  privacy policy
                </Link>
                .
              </p>
            </>
          )}
          </form>
        </Container>
      </section>

      {/* Below the form. Two jobs: it answers the questions that stop people submitting, and it
          gives the page enough real content to be worth ranking, which a bare form never is. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-10 lg:pt-14">
        <Container className="lg:max-w-2xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            What happens after you send this
          </h2>
          <div className="flex flex-col mb-7">
            {[
              ['A person reads it', 'Not an autoresponder. A counsellor reads what you wrote and looks at whether your marks, budget and intake line up.'],
              ['We reply within 24 hours', 'By WhatsApp or a call, whichever you asked for. If we are going to say the timing is unrealistic, we say it then rather than after you have paid.'],
              ['A free first conversation', 'Around 30 minutes. We go through your options in Italy and France, what a fully funded route would need, and what your documents need doing to them.'],
              ['You decide', 'Fees, what they cover and when they are payable are agreed in writing before any paid work starts. Nothing is charged through this website.'],
            ].map(([t, d], i, arr) => (
              <div key={i} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  <div className="w-[30px] h-[30px] rounded-full bg-royal-soft text-royal flex items-center justify-center font-display font-semibold text-[13px] shrink-0">
                    {i + 1}
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-[#E9EFF8] my-1" />}
                </div>
                <div className="pb-4">
                  <div className="font-display font-semibold text-[15px] text-navy mt-1 mb-0.5">{t}</div>
                  <div className="text-[13.5px] leading-relaxed text-slate">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display font-semibold text-[21px] sm:text-[26px] text-navy m-0 mb-3">
            What to have ready
          </h2>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-3">
            None of this is needed to send the form. It is what makes the first conversation useful, so gather what you
            can before the call:
          </p>
          <ul className="m-0 mb-6 pl-0 list-none flex flex-col gap-2">
            {[
              'Your Matric and FSc or Intermediate results, and your degree transcript if you have one.',
              'Your IELTS or TOEFL score, or whether your degree was taught in English.',
              'A realistic figure for what your family can fund per year, in rupees is fine.',
              'Whether attestation has been started, and which documents are done.',
              'The intake you are aiming for, and whether that date can move.',
            ].map((li, i) => (
              <li key={i} className="flex gap-2.5 text-[14.5px] leading-[1.7] text-ink">
                <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-royal shrink-0" />
                <span>{li}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-[16px] border border-[#EFE6CC] bg-gradient-to-br from-[#FBF7EC] to-[#FDFBF5] p-4 mb-7">
            <p className="text-[13.5px] leading-relaxed m-0">
              We do not guarantee admission, a scholarship or a visa, because universities, awarding bodies and
              embassies make those decisions, not consultants. What we do is make sure nothing in your file is the
              reason you are refused. If anyone promises you a guaranteed visa, walk away.
            </p>
          </div>

          <p className="text-[14.5px] leading-[1.75] m-0">
            If you would rather read first, start with{' '}
            <Link to="/blog/apply-to-italy-and-france-from-pakistan" className="text-royal font-medium">
              how to apply from Pakistan
            </Link>{' '}
            or{' '}
            <Link to="/blog/intake-deadlines-italy-france" className="text-royal font-medium">
              the intake deadlines
            </Link>
            , and see{' '}
            <Link to="/privacy" className="text-royal font-medium">
              what we do with your details
            </Link>
            .
          </p>
        </Container>
      </section>

      <div className="pb-10 lg:pb-16" />
    </div>
  )
}
