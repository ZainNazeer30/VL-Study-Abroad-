import { useState } from 'react'
import { CONTACT } from '../data/site'
import { inputClass, Container } from '../components/ui'
import { WhatsAppIcon } from '../components/icons'
import { submitForm } from '../lib/submitForm'
import { useSeo } from '../hooks/useSeo'

const DAYS = [
  { dow: 'Mon', num: '24' },
  { dow: 'Tue', num: '25' },
  { dow: 'Wed', num: '26' },
  { dow: 'Thu', num: '27' },
  { dow: 'Fri', num: '28' },
  { dow: 'Sat', num: '29' },
]
const SLOTS = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00']
const GUIDES = [
  'The full guide to studying in Italy, 2026 to 2027',
  'The full guide to studying in France, 2026 to 2027',
  'Scholarship checklist for DSU and Eiffel',
]

export default function Contact() {
  useSeo(
    'Book a Free Consultation',
    'Book a free 30 minute consultation with VL Study Abroad Consultants on WhatsApp or a call, to talk through Italy and France study options, fully funded scholarships and your visa file. Available to students across Pakistan.'
  )
  const [day, setDay] = useState(-1)
  const [slot, setSlot] = useState(-1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [hint, setHint] = useState('')
  const [booked, setBooked] = useState(false)

  const book = () => {
    if (day < 0 || slot < 0) {
      setHint('Please pick a day and a time first.')
      return
    }
    if (!name.trim() || !phone.trim()) {
      setHint('Please add your name and phone number.')
      return
    }
    setBooked(true)
    submitForm('Consultation booking', { name, phone, day: DAYS[day].dow, time: SLOTS[slot] })
  }

  const confirmLine = day >= 0 && slot >= 0 ? `${DAYS[day].dow} ${DAYS[day].num} Aug at ${SLOTS[slot]}` : ''

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
                    onClick={() => {
                      setDay(i)
                      setHint('')
                    }}
                    className={`shrink-0 w-[62px] px-1 py-2.5 rounded-xl border text-center cursor-pointer ${
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
                    onClick={() => {
                      setSlot(i)
                      setHint('')
                    }}
                    className={`px-1 py-2.5 rounded-[10px] border text-[13px] font-medium cursor-pointer ${
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
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={`${inputClass} py-3 sm:flex-1`} />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone or WhatsApp number" className={`${inputClass} py-3 sm:flex-1`} />
              </div>
            )}
            {!booked && (
              <button
                type="button"
                onClick={book}
                className="mt-2.5 w-full bg-navy text-white font-display font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer shadow-[0_8px_20px_rgba(10,30,60,0.22)]"
              >
                Confirm booking
              </button>
            )}
            {hint && <div className="text-[12.5px] text-rust text-center mt-2.5">{hint}</div>}
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
