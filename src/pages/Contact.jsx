import { useMemo, useState } from 'react'
import { CONTACT } from '../data/site'
import { Container } from '../components/ui'
import { Field, Honeypot } from '../components/Field'
import { nextWorkingDays } from '../lib/nextWeekdays'
import { useLeadForm } from '../hooks/useLeadForm'
import { WhatsAppIcon } from '../components/icons'
import { Link } from 'react-router-dom'
import Faq from '../components/Faq'
import { useSeo, faqSchema, graph, absolute } from '../hooks/useSeo'

const SLOTS = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00']
// Questions people ask before booking. They are on the page for readers, and they are handed to
// Google as FAQ structured data as well, which is what can turn a plain search result into an
// expandable one that takes up three times the space.
const CONTACT_FAQS = [
  {
    q: 'Is the first consultation really free?',
    a: 'Yes, and there is no obligation afterwards. It runs about 30 minutes, on WhatsApp or a call. We go through your marks, your budget and your intended intake, and tell you which universities in Italy and France are realistic and whether a fully funded scholarship route is open to you. If we think the timing does not work, we say so on that call rather than after you have paid anything.',
  },
  {
    q: 'What should I have ready before the call?',
    a: 'Your Matric and FSc or Intermediate results, your degree transcript if you have one, your IELTS score or whether your degree was taught in English, and a realistic figure for what your family can fund per year. If you do not have all of it, come anyway. We can work with what you have.',
  },
  {
    q: 'Do you work with students outside Islamabad and Lahore?',
    a: 'Yes. Almost everything is done on WhatsApp, email and calls, so where you live in Pakistan makes no difference to the service. The one part that is location bound is the visa appointment itself, which for most students happens in Islamabad, and we help you plan that trip.',
  },
  {
    q: 'How quickly do you reply?',
    a: 'Within 24 hours on any weekday, and usually much faster on WhatsApp. If you message late at night you will normally have an answer by the next morning.',
  },
  {
    q: 'What does it cost to work with you?',
    a: 'Fees depend on how much of the process you want handled and are agreed with you in writing before any paid work starts. Nothing is ever charged through this website, and we will not ask for card details or a bank transfer through a web form.',
  },
]

const GUIDES = [
  'The full guide to studying in Italy, 2026 to 2027',
  'The full guide to studying in France, 2026 to 2027',
  'Scholarship checklist for DSU and Eiffel',
]

export default function Contact() {
  useSeo(
    'Book a Free Consultation',
    'Book a free 30 minute call on WhatsApp or by phone to talk through Italy and France options, fully funded scholarships and your visa file. Anywhere in Pakistan.',
    {
      path: '/contact',
      jsonLd: graph(
        { '@type': 'ContactPage', name: 'Contact VL Study Abroad Consultants', url: absolute('/contact') },
        faqSchema(CONTACT_FAQS)
      ),
    }
  )
  // The next six working days, generated fresh. These were typed in by hand before, with the
  // month hardcoded to "Aug", so from the end of that week onwards a student would book a date
  // in the past and get a confirmation for it. useMemo keeps the array stable, or all six day
  // buttons would re-render on every keystroke in the name field.
  const DAYS = useMemo(() => nextWorkingDays(6), [])

  const [day, setDay] = useState(-1)
  const [slot, setSlot] = useState(-1)
  const {
    values, setField, submit, sending, error, done: booked,
  } = useLeadForm('Consultation booking', { name: '', phone: '' })

  const book = async (e) => {
    e.preventDefault()
    if (day < 0 || slot < 0) {
      setSlotHint('Please pick a day and a time first.')
      return
    }
    // The ISO date goes to your inbox, so the booking is never ambiguous.
    await submit({
      required: ['name', 'phone'],
      extra: { day: DAYS[day].iso, time: SLOTS[slot] },
    })
  }
  const [slotHint, setSlotHint] = useState('')

  const confirmLine =
    day >= 0 && slot >= 0 ? `${DAYS[day].dow} ${DAYS[day].num} ${DAYS[day].month} at ${SLOTS[slot]}` : ''

  return (
    <div>
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-5 lg:pt-12 lg:pb-8 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:max-w-3xl">
          <h1 className="font-display font-bold text-[26px] sm:text-[32px] text-navy m-0 mb-2">Book your free consultation</h1>
          <p className="text-[14px] leading-relaxed m-0">Thirty minutes with a counsellor, by call, video or WhatsApp. No cost and no obligation.</p>
        </Container>
      </section>

      {/* Booking */}
      <div className="px-5 sm:px-8 lg:px-12 mt-1.5">
        <Container className="lg:max-w-2xl">
          <div className="border border-line rounded-[18px] p-4.5 lg:p-7 shadow-[0_6px_16px_rgba(10,30,60,0.05)]">
            <div className="font-display font-semibold text-[15px] text-navy mb-3">1. Pick a day</div>
            <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
              {DAYS.map((d, i) => {
                const active = day === i
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={active}
                    aria-label={`${d.dow} ${d.num} ${d.month}`}
                    onClick={() => {
                      setDay(i)
                      setSlotHint('')
                    }}
                    className={`shrink-0 w-[62px] px-1 py-2.5 rounded-xl border text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
                      active ? 'border-royal bg-royal text-white' : 'border-[#E4E9F1] bg-white text-navy'
                    }`}
                  >
                    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.06em] opacity-75">{d.dow}</span>
                    <span className="block font-display font-semibold text-[17px] mt-0.5">{d.num}</span>
                  </button>
                )
              })}
            </div>

            <div className="font-display font-semibold text-[15px] text-navy mt-4 mb-3">2. Pick a time</div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SLOTS.map((t, i) => {
                const active = slot === i
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setSlot(i)
                      setSlotHint('')
                    }}
                    className={`px-1 py-2.5 rounded-[10px] border text-[13px] font-medium cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
                      active ? 'border-royal bg-royal text-white' : 'border-[#E4E9F1] bg-white text-ink'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>

            <div className="font-display font-semibold text-[15px] text-navy mt-4 mb-3">3. Your details</div>
            {booked ? (
              <div className="bg-green-soft border border-[#CBE5D8] rounded-xl p-[18px] text-center">
                <div className="font-display font-semibold text-[15px] text-green mb-1">Booked. {confirmLine}</div>
                <div className="text-[13px]">We will confirm on WhatsApp shortly.</div>
              </div>
            ) : (
              <form onSubmit={book} noValidate>
                <div className="relative flex flex-col sm:flex-row gap-2.5">
                  <Honeypot value={values.company} onChange={setField('company')} />
                  <Field id="booking-name" label="Full name" value={values.name}
                         onChange={setField('name')} autoComplete="name" required className="sm:flex-1" />
                  <Field id="booking-phone" label="Phone or WhatsApp number" value={values.phone}
                         onChange={setField('phone')} type="tel" inputMode="tel" autoComplete="tel"
                         required className="sm:flex-1" />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2.5 w-full bg-navy text-white font-display font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer shadow-[0_8px_20px_rgba(10,30,60,0.22)] disabled:opacity-60 disabled:cursor-wait"
                >
                  {sending ? 'Booking…' : 'Confirm booking'}
                </button>
                <p className="text-[11.5px] leading-relaxed text-slate m-0 mt-2.5">
                  We use your name and number only to confirm this call. See our{' '}
                  <Link to="/privacy" className="text-royal font-medium underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
            <div role="alert" aria-live="polite" className="text-[12.5px] text-rust text-center mt-2.5 min-h-[1.2em]">
              {slotHint || error}
            </div>
          </div>
        </Container>
      </div>

      {/* Direct contact */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-2xl">
          <h2 className="font-display font-semibold text-[19px] sm:text-[22px] text-navy m-0 mb-3.5">Or reach us directly</h2>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2.5">
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="flex gap-3.5 items-center border border-[#D9F2E3] bg-[#F2FBF6] rounded-[14px] px-4 py-3.5">
              <span className="w-[38px] h-[38px] rounded-[11px] bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-display font-semibold text-[14px] text-navy">WhatsApp us</span>
                <span className="block text-[12.5px] text-ink">{CONTACT.phone}, usually a reply within the hour</span>
              </span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex gap-3.5 items-center border border-line rounded-[14px] px-4 py-3.5">
              <span className="w-[38px] h-[38px] rounded-[11px] bg-royal-soft text-royal flex items-center justify-center text-[16px] shrink-0">✉</span>
              <span>
                <span className="block font-display font-semibold text-[14px] text-navy">{CONTACT.email}</span>
                <span className="block text-[12.5px] text-ink">We reply within 24 hours</span>
              </span>
            </a>
            <div className="flex gap-3.5 items-center border border-line rounded-[14px] px-4 py-3.5 sm:col-span-2">
              <span className="w-[38px] h-[38px] rounded-[11px] bg-[#FBF7EC] text-gold-ink flex items-center justify-center text-[16px] shrink-0">⏰</span>
              <span>
                <span className="block font-display font-semibold text-[14px] text-navy">We're online 24 hours a day</span>
                <span className="block text-[12.5px] text-ink">Wherever you are, message us any time and a real counsellor will get back to you.</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Before you book */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14">
        <Container className="lg:max-w-2xl">
          <h2 className="font-display font-semibold text-[19px] sm:text-[22px] text-navy m-0 mb-3">
            What the first conversation covers
          </h2>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-3">
            It is a conversation, not a sales call. In about half an hour we go through where you actually stand: what
            your marks open in Italy and France, what your family budget realistically covers once housing is counted,
            and whether a fully funded route such as the regional DSU scholarships in Italy or the Eiffel Excellence
            scholarship in France is a genuine possibility for your profile.
          </p>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-3">
            We will also tell you where your documents stand. For most Pakistani students the honest answer on the
            first call is that attestation needs to start now, because IBCC or HEC and then MOFA takes weeks, and it
            is the single most common reason a student misses an intake with an offer already in hand.
          </p>
          <p className="text-[14.5px] leading-[1.75] m-0 mb-6">
            If the intake you have in mind is not realistic, we say so on that call. Nobody is well served by paying
            for a rushed application into a closing window, and we would rather have you back for the next intake with
            a file that is ready.
          </p>

          <h2 className="font-display font-semibold text-[19px] sm:text-[22px] text-navy m-0 mb-3.5">
            Before you book
          </h2>
          <Faq id="contact" items={CONTACT_FAQS} defaultOpen={0} />

          <p className="text-[14.5px] leading-[1.75] mt-6 m-0">
            You can also read first. Start with{' '}
            <Link to="/blog/apply-to-italy-and-france-from-pakistan" className="text-royal font-medium">
              how to apply from Pakistan
            </Link>
            , or go straight to the{' '}
            <Link to="/apply" className="text-royal font-medium">
              application form
            </Link>{' '}
            if you already know what you want.
          </p>
        </Container>
      </section>

      {/* Guides */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-9 lg:pb-16">
        <Container className="lg:max-w-2xl">
          <h2 className="font-display font-semibold text-[19px] sm:text-[22px] text-navy m-0 mb-3.5">Free study guides</h2>
          <div className="flex flex-col gap-2">
            {GUIDES.map((g, i) => (
              <a key={i} href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="flex justify-between items-center gap-2.5 bg-[#F9FBFE] border border-[#ECF0F7] rounded-xl px-4 py-3.5">
                <span className="text-[13.5px] font-medium text-navy">{g}</span>
                <span className="text-royal text-[13px] font-semibold whitespace-nowrap">Get PDF</span>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
