import { useState } from 'react'
import { Link } from 'react-router-dom'
import Faq from '../components/Faq'
import Img from '../components/Img'
import { PersonAvatar } from '../components/artwork'
import { H2, Container } from '../components/ui'
import { Field, SelectField, Honeypot } from '../components/Field'
import { useLeadForm, PHONE_HINT } from '../hooks/useLeadForm'
import { IMAGES } from '../data/images'
import { CONTACT, STATUS } from '../data/site'
import { POSTS } from '../data/blog'
import { useSeo, faqSchema, graph, absolute } from '../hooks/useSeo'
import {
  TRUST,
  SERVICES,
  STEPS,
  HOME_FILTERS,
  HOME_UNIS,
  HOME_SCHOLARSHIPS,
  WHY_US,
  TESTIMONIALS,
  HOME_FAQS,
} from '../data/home'

const SERVICE_PHOTOS = [
  {
    key: 'selection',
    title: 'Choose the right university',
    text: 'We compare universities, programs, entry requirements and realistic admission routes for your profile.',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=900&h=650&q=82',
  },
  {
    key: 'admissions',
    title: 'Prepare your application',
    text: 'Applications, motivation letters, forms and deadlines are checked before anything is submitted.',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&h=650&q=82',
  },
  {
    key: 'documents',
    title: 'Handle your documents',
    text: 'We guide you through IBCC, HEC and MOFA requirements and keep your paperwork in the right order.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&h=650&q=82',
  },
  {
    key: 'scholarship',
    title: 'Find scholarship routes',
    text: 'We look for scholarships and fee-support options that match your academic and financial profile.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&h=650&q=82',
  },
  {
    key: 'visa',
    title: 'Build your visa file',
    text: 'We review your financial evidence, documents and appointment preparation before submission.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&h=650&q=82',
  },
  {
    key: 'housing',
    title: 'Prepare where you will live',
    text: 'We help you understand university residences, student housing and practical options before you fly.',
    image: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&h=650&q=82',
  },
  {
    key: 'departure',
    title: 'Get ready to leave Pakistan',
    text: 'A practical pre-departure briefing covers travel, documents, arrival and the first days abroad.',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&h=650&q=82',
  },
  {
    key: 'aftercare',
    title: 'Support after you land',
    text: 'Your relationship with us does not end at the airport. We help you understand the next steps after arrival.',
    image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=900&h=650&q=82',
  },
]

function matchesFilter(uni, filter) {
  if (filter === 'All') return true
  if (filter === 'Italy' || filter === 'France') return uni.country === filter
  return uni.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
}

export default function Home() {
  useSeo(
    'Study Abroad Consultants in Pakistan for Italy and France',
    'Study abroad consultants in Pakistan for Italy and France. Scholarships, admissions, HEC and IBCC attestation and student visa support. Free eligibility assessment.',
    {
      path: '/',
      bare: true,
      image: IMAGES.homeHero.src,
      jsonLd: graph(
        {
          '@type': 'WebPage',
          '@id': absolute('/#webpage'),
          url: absolute('/'),
          name: 'Study Abroad Consultants in Pakistan for Italy and France',
          isPartOf: { '@id': absolute('/#website') },
          about: { '@id': absolute('/#organisation') },
          primaryImageOfPage: absolute(IMAGES.homeHero.src),
          inLanguage: 'en',
        },
        faqSchema(HOME_FAQS)
      ),
    }
  )

  const [filter, setFilter] = useState('All')
  const {
    values: form, setField, submit, sending, error, done: sent,
  } = useLeadForm('Home eligibility check', {
    name: '', email: '', phone: '', qual: '', country: '', intake: '', program: '',
  })
  const shownUnis = HOME_UNIS.filter((u) => matchesFilter(u, filter)).slice(0, 3)

  const onSubmit = async (e) => {
    e.preventDefault()
    await submit({ required: ['name', 'phone'] })
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-[#F5F8FE] px-5 sm:px-8 lg:px-12 pt-8 pb-8 lg:pt-14 lg:pb-14">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#DDE8FF] blur-3xl opacity-60" />
        <Container className="relative lg:grid lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#DCE6F6] text-royal font-semibold text-[11px] tracking-[0.08em] uppercase px-3.5 py-2 rounded-full mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green" />
              Italy & France specialists
            </div>
            <h1 className="font-display font-bold text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.08] text-navy m-0 mb-4 max-w-2xl">
              Study in Europe with a plan you can actually follow.
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed m-0 mb-6 max-w-xl text-ink">
              We help students in Pakistan choose universities, find scholarship routes, prepare applications and build their visa file for Italy or France.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <Link
                to="/apply"
                className="bg-navy text-white text-center font-display font-semibold text-[15px] py-4 px-6 rounded-xl shadow-[0_10px_24px_rgba(10,30,60,0.22)]"
              >
                Check my eligibility
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="border-[1.5px] border-[#CBD7EA] text-navy text-center font-display font-semibold text-[15px] py-4 px-6 rounded-xl bg-white"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {[
                ['20+', 'students placed'],
                ['2', 'countries'],
                ['1', 'dedicated counsellor'],
                ['Free', 'first assessment'],
              ].map(([value, label]) => (
                <div key={label} className="border-l-2 border-gold pl-3">
                  <div className="font-display font-bold text-[18px] text-navy">{value}</div>
                  <div className="text-[11.5px] text-slate">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(10,30,60,0.18)] h-[330px] sm:h-[430px] lg:h-[500px]">
              <Img image={IMAGES.homeHero} loading="eager" fetchPriority="high" className="w-full h-full" />
            </div>
            <div className="absolute left-4 right-4 bottom-4 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-display font-semibold text-[13px] text-navy">From Pakistan to your university</div>
                  <div className="text-[11.5px] text-slate mt-1">Admissions · scholarships · visa · arrival</div>
                </div>
                <div className="text-[22px]">🇵🇰 → 🇮🇹 🇫🇷</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="px-5 sm:px-8 lg:px-12 py-4 border-b border-line bg-white">
        <Container>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-6 lg:overflow-visible">
            {TRUST.map((t) => (
              <div key={t} className="shrink-0 flex items-center gap-2 bg-[#F8FAFD] border border-[#E7EDF6] rounded-xl px-3.5 py-2.5 text-[11.5px] font-medium text-navy">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Destination */}
      <section className="px-5 sm:px-8 lg:px-12 pt-12 lg:pt-20">
        <Container>
          <div className="max-w-2xl mb-7">
            <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-royal mb-2">Choose your destination</div>
            <H2 className="mb-2">Italy or France. Start with the country that fits you.</H2>
            <p className="text-[14px] leading-relaxed m-0">Different universities, costs, scholarship systems and application routes. We help you compare them against your profile instead of guessing.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <DestinationCard
              image={IMAGES.homeItaly}
              flag="🇮🇹"
              label="Italy"
              title="Study in Italy"
              text="Public universities, English-taught programs and regional scholarship routes can make Italy an affordable option for Pakistani students."
              to="/italy"
              cta="Explore Italy"
            />
            <DestinationCard
              image={IMAGES.homeFrance}
              flag="🇫🇷"
              label="France"
              title="Study in France"
              text="Explore public universities, specialist schools, scholarships and career-focused programs across France."
              to="/france"
              cta="Explore France"
            />
          </div>
        </Container>
      </section>

      {/* Every part handled */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-7">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-royal mb-2">From first call to arrival</div>
              <H2 className="mb-2">Every part of the move, handled.</H2>
              <p className="text-[14px] leading-relaxed m-0">You should not have to coordinate a university, scholarship, document attestation, visa file and housing on your own. We keep the journey together.</p>
            </div>
            <Link to="/apply" className="text-royal font-display font-semibold text-[13px] whitespace-nowrap">Start with my profile →</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_PHOTOS.map((s, i) => (
              <article key={s.key} className="group relative overflow-hidden rounded-[18px] min-h-[285px] shadow-[0_12px_28px_rgba(10,30,60,0.10)]">
                <img src={s.image} alt="" loading={i < 4 ? 'eager' : 'lazy'} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06162F] via-[#06162F]/45 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center font-display font-bold text-[13px] text-navy">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="absolute left-4 right-4 bottom-4">
                  <h3 className="font-display font-semibold text-[16px] text-white m-0 mb-1.5">{s.title}</h3>
                  <p className="text-[12.5px] leading-relaxed text-white/80 m-0">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="mt-14 lg:mt-20 px-5 sm:px-8 lg:px-12 py-12 lg:py-20 bg-navy">
        <Container>
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#8FB0FF] mb-2">How it works</div>
              <h2 className="font-display font-semibold text-[30px] lg:text-[38px] leading-tight text-white m-0 mb-3">One clear journey. No guesswork.</h2>
              <p className="text-[14px] leading-relaxed text-[#AAB8D4] m-0 mb-6">We break a complicated study-abroad process into manageable steps and tell you what needs to happen next.</p>
              <Link to="/apply" className="inline-block bg-white text-navy font-display font-semibold text-[14px] py-3.5 px-6 rounded-xl">Get my roadmap</Link>
            </div>
            <div>
              {STEPS.map((st, i) => (
                <div key={i} className="flex gap-4 py-4 border-b border-white/10 first:pt-0 last:border-0">
                  <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-display font-bold text-[12px] ${i === STEPS.length - 1 ? 'bg-gold text-navy' : 'bg-white/10 text-white'}`}>
                    {st.n}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-[15px] text-white mb-1">{st.name}</div>
                    <div className="text-[12.5px] leading-relaxed text-[#AAB8D4]">{st.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Universities */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-royal mb-2">University search</div>
              <H2 className="mb-1">Start with universities that fit your profile.</H2>
              <p className="text-[13.5px] m-0">A few examples from the universities we help students explore.</p>
            </div>
            <Link to="/universities" className="text-royal font-display font-semibold text-[13px]">Browse all →</Link>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {HOME_FILTERS.map((f) => (
              <button key={f} type="button" onClick={() => setFilter(f)} className={`shrink-0 px-4 py-2.5 rounded-full border text-[12.5px] font-medium cursor-pointer ${f === filter ? 'border-royal bg-royal text-white' : 'border-[#E4E9F1] bg-white text-ink'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {shownUnis.map((u) => (
              <div key={u.name} className="border border-line rounded-2xl p-5 shadow-[0_8px_20px_rgba(10,30,60,0.05)] bg-white">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <div className="font-display font-semibold text-[15px] text-navy leading-tight">{u.name}</div>
                    <div className="text-[12px] text-mist mt-1">{u.flag} {u.city}, {u.country}</div>
                  </div>
                  <span className={`shrink-0 text-[10.5px] font-semibold px-2.5 py-1.5 rounded-full ${STATUS[u.tone].bg} ${STATUS[u.tone].fg}`}>{u.status}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {u.tags.map((tg) => <span key={tg} className="text-[11px] bg-[#F4F7FC] text-ink px-2 py-1 rounded-md">{tg}</span>)}
                </div>
                <div className="text-[12px] text-slate mb-4">{u.apply}</div>
                <Link to="/universities" className="font-display font-semibold text-[13px] text-royal">View universities →</Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Scholarships */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container>
          <div className="grid lg:grid-cols-[.75fr_1.25fr] gap-8 lg:gap-12 items-start">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-gold-ink mb-2">Scholarships</div>
              <H2 className="mb-2">Before you pay more, check what you could get.</H2>
              <p className="text-[13.5px] leading-relaxed mb-5">We start by checking scholarship and fee-support routes that match your profile, finances and destination.</p>
              <Link to="/scholarships" className="inline-block bg-navy text-white font-display font-semibold text-[13.5px] py-3.5 px-5 rounded-xl">Explore scholarships</Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {HOME_SCHOLARSHIPS.map((sc) => (
                <div key={sc.name} className="rounded-2xl p-4 bg-[#FBF7EC] border border-[#EFE6CC]">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[.08em] text-gold-ink mb-2">{sc.flag} {sc.country}</div>
                  <div className="font-display font-semibold text-[14px] text-navy mb-1.5">{sc.name}</div>
                  <div className="text-[11.5px] text-rust font-semibold mb-2">Deadline {sc.deadline}</div>
                  <p className="text-[12px] leading-relaxed m-0 text-ink">{sc.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why VL */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-royal mb-2">Why VL Study</div>
              <H2 className="mb-3">A smaller focus, with more attention on your case.</H2>
              <p className="text-[13.5px] leading-relaxed">We focus on Italy and France rather than trying to be everything to everyone. That lets us build a process around the documents, universities and visa routes our students actually use.</p>
              <div className="mt-5 rounded-2xl overflow-hidden h-[260px]">
                <Img image={IMAGES.aboutTeam} className="w-full h-full" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6">
              {WHY_US.slice(0, 6).map((w) => (
                <div key={w.name} className="py-4 border-b border-line-soft">
                  <div className="flex gap-2.5 items-start">
                    <div className="w-6 h-6 rounded-full bg-green-soft text-green flex items-center justify-center text-[12px] shrink-0">✓</div>
                    <div>
                      <div className="font-display font-semibold text-[13.5px] text-navy">{w.name}</div>
                      <div className="text-[12px] leading-relaxed text-slate mt-1">{w.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Stories */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container>
          <div className="relative rounded-[24px] overflow-hidden min-h-[300px] lg:min-h-[360px]">
            <Img image={IMAGES.homeStories} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/65 to-navy/20" />
            <div className="relative p-7 lg:p-12 flex flex-col justify-center min-h-[300px] lg:min-h-[360px] max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#C9D8FF] mb-2">The outcome</div>
              <h2 className="font-display font-semibold text-[28px] lg:text-[38px] leading-tight text-white m-0 mb-3">The goal is not a visa. It is your life after the visa.</h2>
              <p className="text-[13.5px] leading-relaxed text-[#D3DCEE] m-0">That is why our process includes university selection, scholarships, housing, pre-departure preparation and support after you arrive.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-royal mb-2">Student stories</div>
              <H2 className="mb-1">What students say about the process.</H2>
            </div>
            <Link to="/about" className="text-royal font-display font-semibold text-[13px]">About VL →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((s) => (
              <div key={s.name} className="border border-line rounded-2xl p-5 bg-white shadow-[0_8px_20px_rgba(10,30,60,0.05)]">
                <div className="flex gap-3 items-center mb-4">
                  <PersonAvatar person={s.personKey} className="w-11 h-11 rounded-full overflow-hidden shrink-0" />
                  <div>
                    <div className="font-display font-semibold text-[14px] text-navy">{s.name}</div>
                    <div className="text-[11.5px] text-mist">{s.flag} {s.tag}</div>
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed m-0 text-ink">“{s.quote}”</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Eligibility */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container className="lg:max-w-5xl">
          <div className="rounded-[24px] bg-[#F4F8FE] border border-[#E3EBF8] overflow-hidden lg:grid lg:grid-cols-[.85fr_1.15fr]">
            <div className="p-6 lg:p-9 bg-navy text-white">
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#9DB8FF] mb-3">Free assessment</div>
              <h2 className="font-display font-semibold text-[27px] leading-tight m-0 mb-3">Find out what your profile can realistically do.</h2>
              <p className="text-[13px] leading-relaxed text-[#AAB8D4] m-0 mb-5">Tell us your qualification, destination and target intake. We will review your starting point and explain the next steps.</p>
              <div className="space-y-2 text-[12px] text-[#D3DCEE]">
                <div>✓ University and program direction</div>
                <div>✓ Scholarship routes to check</div>
                <div>✓ Document requirements</div>
                <div>✓ Next steps for your application</div>
              </div>
            </div>

            <div className="p-5 lg:p-8">
              {sent ? (
                <div className="bg-green-soft border border-[#CBE5D8] rounded-xl p-6 text-center">
                  <div className="font-display font-semibold text-[16px] text-green mb-1">Thanks, {form.name}.</div>
                  <div className="text-[13px] text-ink">One of our counsellors will contact you within 24 hours.</div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="relative grid sm:grid-cols-2 gap-3.5">
                  <Honeypot value={form.company} onChange={setField('company')} />
                  <div className="sm:col-span-2"><Field id="home-name" label="Full name" value={form.name} onChange={setField('name')} autoComplete="name" required /></div>
                  <Field id="home-email" label="Email address" value={form.email} onChange={setField('email')} type="email" inputMode="email" autoComplete="email" />
                  <Field id="home-phone" label="WhatsApp number" hint={PHONE_HINT} value={form.phone} onChange={setField('phone')} type="tel" inputMode="numeric" autoComplete="tel" maxLength={11} required />
                  <SelectField id="home-qual" label="Current qualification" prompt="Choose one" value={form.qual} onChange={setField('qual')} options={['Matric or O Levels', 'FSc, FA or A Levels', 'Bachelor degree (BS, BSc, BA)', 'Master degree (MS, MSc, MA)']} />
                  <SelectField id="home-country" label="Preferred country" prompt="Choose one" value={form.country} onChange={setField('country')} options={['Italy', 'France', 'Either']} />
                  <SelectField id="home-intake" label="Target intake" prompt="Choose one" value={form.intake} onChange={setField('intake')} options={['Feb 2027', 'Sep 2027', 'Not sure']} />
                  <Field id="home-program" label="Preferred program" hint="e.g. MSc Data Science" value={form.program} onChange={setField('program')} />
                  <div className="sm:col-span-2">
                    <button type="submit" disabled={sending} className="w-full bg-royal text-white font-display font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer shadow-[0_8px_20px_rgba(43,92,230,0.28)] disabled:opacity-60">
                      {sending ? 'Sending…' : 'Check my eligibility'}
                    </button>
                    <div role="alert" aria-live="polite" className="text-[12.5px] text-rust text-center min-h-[1.2em] mt-2">{error}</div>
                    <p className="text-[11px] leading-relaxed text-slate m-0">We use these details only to reply to you. We never sell them or pass them to other agents.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container className="lg:max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-royal mb-2">Questions</div>
          <H2 className="mb-5">Questions students ask before they apply.</H2>
          <Faq id="home" items={HOME_FAQS} defaultOpen={0} />
        </Container>
      </section>

      {/* Guides */}
      <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <Container>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-royal mb-2">Free guides</div>
              <H2 className="mb-1">Read this before you apply.</H2>
              <p className="text-[13px] m-0">Practical guides written for students applying from Pakistan.</p>
            </div>
            <Link to="/blog" className="text-royal font-display font-semibold text-[13px]">All guides →</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="flex flex-col rounded-2xl overflow-hidden border border-line bg-white shadow-[0_8px_20px_rgba(10,30,60,0.05)]">
                <div className="h-[150px]"><Img image={IMAGES[post.image]} className="w-full h-full" /></div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[10.5px] font-semibold tracking-[.08em] uppercase text-royal mb-1.5">{post.category} · {post.read} min</div>
                  <h3 className="font-display font-semibold text-[15px] text-navy m-0 mb-1.5 leading-snug">{post.title}</h3>
                  <p className="text-[12.5px] leading-relaxed text-slate m-0">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="px-5 sm:px-8 lg:px-12 py-14 lg:py-20">
        <Container>
          <div className="rounded-[24px] bg-gradient-to-br from-navy to-navy-soft p-8 lg:p-14 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#AFC3FF] mb-3">Your next step</div>
            <h2 className="font-display font-semibold text-[28px] lg:text-[38px] leading-tight text-white m-0 mb-3">Let’s see what is possible for you.</h2>
            <p className="text-[13.5px] lg:text-[15px] leading-relaxed text-[#AAB8D4] m-0 mb-6 max-w-xl mx-auto">No pressure and no promise before we see your profile. Start with a free conversation about Italy or France.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <Link to="/apply" className="bg-white text-navy font-display font-semibold text-[15px] py-3.5 px-6 rounded-xl">Check my eligibility</Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="bg-white/10 border border-white/25 text-white font-display font-semibold text-[15px] py-3.5 px-6 rounded-xl">Chat on WhatsApp</a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

function DestinationCard({ image, flag, label, title, text, to, cta }) {
  return (
    <Link to={to} className="group rounded-[20px] overflow-hidden border border-line shadow-[0_12px_28px_rgba(10,30,60,0.08)] block">
      <div className="h-[220px] lg:h-[270px] relative overflow-hidden">
        <Img image={image} className="w-full h-full transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent" />
        <span className="absolute top-4 left-4 bg-white/95 rounded-lg px-3 py-1.5 font-display font-semibold text-[12px] text-navy">{flag} {label}</span>
        <div className="absolute left-5 right-5 bottom-5">
          <h3 className="font-display font-semibold text-[22px] text-white m-0 mb-1">{title}</h3>
          <div className="text-[12px] text-white/80">{cta} →</div>
        </div>
      </div>
      <div className="px-5 py-4 bg-white">
        <p className="text-[13px] leading-relaxed m-0 text-ink">{text}</p>
      </div>
    </Link>
  )
}
