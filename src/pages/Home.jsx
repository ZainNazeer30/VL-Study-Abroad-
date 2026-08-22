import { useState } from 'react'
import { Link } from 'react-router-dom'
import Faq from '../components/Faq'
import Img from '../components/Img'
import { PersonAvatar } from '../components/artwork'
import { Eyebrow, H2, Container, inputClass } from '../components/ui'
import { IMAGES } from '../data/images'
import { CONTACT, TONES, STATUS } from '../data/site'
import { submitForm } from '../lib/submitForm'
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

function matchesFilter(uni, filter) {
  if (filter === 'All') return true
  if (filter === 'Italy' || filter === 'France') return uni.country === filter
  return uni.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
}

export default function Home() {
  // The home page carries three pieces of structured data. The organisation block is who you
  // are, and it is what Google reads for the logo and the knowledge panel. The website block
  // ties the whole site to one name. The FAQ block is the one with a visible payoff: it makes
  // the home page eligible for the expandable question boxes in search results, which take up
  // far more space than a plain link and pull in clicks from people searching those exact
  // questions. Every question in it is genuinely answered further down this page, which is both
  // Google's rule and the reason it works.
  useSeo(
    'Study Abroad Consultants in Pakistan for Italy and France',
    'Study abroad consultants in Pakistan for Italy and France. Fully funded scholarships, HEC and IBCC attestation, and full student visa support. Free consultation.',
    {
      path: '/',
      // The home page title already carries the brand, so it is not appended twice.
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', qual: '', country: '', intake: '', program: '' })
  const [sent, setSent] = useState(false)

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const shownUnis = HOME_UNIS.filter((u) => matchesFilter(u, filter)).slice(0, 3)

  const submit = () => {
    if (!form.name.trim()) return
    setSent(true)
    submitForm('Home eligibility check', form)
  }

  return (
    <div>
      {/* Hero */}
      <section className="px-5 sm:px-8 lg:px-12 pt-7 pb-6 lg:py-16 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:flex-1">
            <div className="inline-flex items-center gap-1.5 bg-royal-soft text-royal font-semibold text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green" /> Italy and France specialists, 3+ years running
            </div>
            <h1 className="font-display font-bold text-[29px] sm:text-[38px] lg:text-[46px] leading-[1.2] text-navy m-0 mb-3">
              Get into a university in Italy or France
            </h1>
            <p className="text-[15px] sm:text-[16px] leading-relaxed m-0 mb-5 max-w-lg">
              We help you with admissions, scholarships and student visas, and we stay with you from the first call to
              the day you land.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 mb-5 lg:mb-0 sm:max-w-md lg:max-w-none">
              <Link
                to="/contact"
                className="bg-navy text-white text-center font-display font-semibold text-[15px] py-4 px-6 rounded-xl shadow-[0_8px_20px_rgba(10,30,60,0.22)] sm:flex-1 lg:flex-none"
              >
                Book a free consultation
              </Link>
              <Link
                to="/universities"
                className="border-[1.5px] border-[#D6DEEC] text-navy text-center font-display font-semibold text-[15px] py-3.5 px-6 rounded-xl bg-white sm:flex-1 lg:flex-none"
              >
                See universities
              </Link>
            </div>
          </div>
          <div className="relative rounded-[18px] overflow-hidden h-[210px] lg:h-[360px] lg:flex-1 mt-0">
            <Img image={IMAGES.homeHero} loading="eager" fetchPriority="high" className="w-full h-full" />
            <div className="absolute bottom-3 left-3 bg-white/95 rounded-[10px] px-3 py-2 flex gap-2.5 items-center">
              <span className="font-display font-semibold text-[12px] text-navy">🇮🇹 Italy</span>
              <span className="w-px h-3.5 bg-[#E4E9F1]" />
              <span className="font-display font-semibold text-[12px] text-navy">🇫🇷 France</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust chips */}
      <div className="flex gap-2 overflow-x-auto md:overflow-visible md:flex-wrap px-5 sm:px-8 lg:px-12 md:justify-center pt-1 pb-2 no-scrollbar">
        {TRUST.map((t, i) => (
          <div
            key={i}
            className="shrink-0 flex items-center gap-1.5 bg-[#F6F9FE] border border-[#E9EFF8] rounded-full px-3.5 py-2.5 text-[12px] font-medium text-navy whitespace-nowrap"
          >
            <span className="w-[7px] h-[7px] rounded-full bg-gold" />
            {t}
          </div>
        ))}
      </div>

      {/* Destinations */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-2">
        <Container>
          <Eyebrow>Destinations</Eyebrow>
          <H2 className="mb-4 lg:mb-6">Pick where you want to study</H2>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3.5 md:gap-6">
            <DestinationCard
              image={IMAGES.homeItaly}
              flag="🇮🇹"
              label="Italy"
              title="Study in Italy"
              text="Affordable universities, degrees taught in English, regional scholarships and a great place to live."
              to="/italy"
              cta="Explore Italy"
            />
            <DestinationCard
              image={IMAGES.homeFrance}
              flag="🇫🇷"
              label="France"
              title="Study in France"
              text="Globally ranked universities, career focused degrees, scholarships and the chance to work after you graduate."
              to="/france"
              cta="Explore France"
            />
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="px-5 sm:px-8 lg:px-12 pt-9 lg:pt-14 pb-2">
        <Container>
          <Eyebrow>What we do</Eyebrow>
          <H2 className="mb-4 lg:mb-6">Every part of the move, handled</H2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-[#F9FBFE] border border-[#ECF0F7] rounded-[14px] p-3.5 lg:p-5 flex flex-col gap-2.5">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-[9px] ${TONES[s.tone].bg} ${TONES[s.tone].fg} flex items-center justify-center font-display font-semibold text-[13px]`}>
                  {s.glyph}
                </div>
                <div className="font-display font-medium text-[13px] lg:text-[14px] text-navy leading-snug">{s.name}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="mt-9 lg:mt-14 px-5 sm:px-8 lg:px-12 pt-8 pb-9 lg:py-16 bg-navy">
        <Container className="lg:max-w-3xl">
          <Eyebrow className="text-[#8FA8E8]">How it works</Eyebrow>
          <h2 className="font-display font-semibold text-[22px] sm:text-[26px] text-white m-0 mb-5 lg:mb-8">Five steps to your place in Europe</h2>
          <div className="flex flex-col">
            {STEPS.map((st, i) => {
              const notLast = i < STEPS.length - 1
              const first = i === 0
              const last = i === STEPS.length - 1
              return (
                <div key={i} className="flex gap-3.5">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-[34px] h-[34px] rounded-full flex items-center justify-center font-display font-semibold text-[14px] shrink-0 ${
                        first ? 'bg-royal text-white' : last ? 'bg-gold text-navy' : 'bg-white/10 text-white'
                      }`}
                    >
                      {st.n}
                    </div>
                    {notLast && <div className="w-0.5 flex-1 bg-white/15 my-1" />}
                  </div>
                  <div className="pb-5">
                    <div className="font-display font-semibold text-[15px] text-white mt-1.5 mb-1">{st.name}</div>
                    <div className="text-[13px] leading-relaxed text-[#AAB8D4]">{st.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Featured universities */}
      <section className="px-5 sm:px-8 lg:px-12 pt-9 lg:pt-16 pb-2">
        <Container>
          <Eyebrow>Universities</Eyebrow>
          <H2 className="mb-3.5 lg:mb-6">A few of our universities</H2>
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {HOME_FILTERS.map((f) => {
              const active = f === filter
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`shrink-0 px-3.5 py-2.5 rounded-full border text-[13px] font-medium cursor-pointer whitespace-nowrap ${
                    active ? 'border-royal bg-royal text-white' : 'border-[#E4E9F1] bg-white text-ink'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4">
            {shownUnis.map((u, i) => (
              <div key={i} className="border border-line rounded-2xl p-4 shadow-[0_6px_16px_rgba(10,30,60,0.05)]">
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
                  {u.tags.map((tg, j) => (
                    <span key={j} className="text-[11.5px] bg-[#F4F7FC] text-ink px-2 py-1 rounded-md">
                      {tg}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-display font-semibold text-[14px] text-navy">{u.tuition}</span>
                    <span className="text-[11.5px] text-mist"> a year</span>
                  </div>
                  <Link to="/universities" className="font-semibold text-[13px] text-royal">
                    View details →
                  </Link>
                </div>
              </div>
            ))}
            {shownUnis.length === 0 && (
              <div className="md:col-span-3 text-[13px] text-slate text-center py-6 border border-dashed border-[#D6DEEC] rounded-2xl">
                Nothing matches that filter yet. Ask us, we work with more universities than we list here.
              </div>
            )}
          </div>
          <Link
            to="/universities"
            className="block text-center mt-3.5 sm:inline-block sm:mx-auto border-[1.5px] border-[#D6DEEC] text-navy font-display font-semibold text-[14px] py-3.5 px-8 rounded-xl"
          >
            Browse all universities
          </Link>
        </Container>
      </section>

      {/* Scholarships */}
      <section className="px-5 sm:px-8 lg:px-12 pt-9 lg:pt-16 pb-2">
        <Container>
          <Eyebrow className="text-gold-ink">Fully funded scholarships</Eyebrow>
          <H2 className="mb-2">The scholarships that cover the whole cost</H2>
          <p className="text-[13.5px] leading-relaxed mb-4 lg:mb-6 max-w-2xl">
            These three are fully funded, meaning tuition and living costs, not just a fee cut. We check these first
            for every student before looking at anything smaller.
          </p>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {HOME_SCHOLARSHIPS.map((sc, i) => (
              <div key={i} className="rounded-2xl p-[18px] bg-gradient-to-br from-[#FBF7EC] to-[#FDFBF5] border border-[#EFE6CC] flex flex-col">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gold-ink">
                    {sc.flag} {sc.country}
                  </span>
                  {sc.fullyFunded && (
                    <span className="text-[10.5px] font-semibold px-2 py-1 rounded-full bg-green-soft text-green whitespace-nowrap">Fully funded</span>
                  )}
                </div>
                <div className="font-display font-semibold text-[15.5px] text-navy mb-1">{sc.name}</div>
                <div className="text-[11.5px] font-semibold text-rust mb-1.5">Deadline {sc.deadline}</div>
                <div className="text-[13px] leading-relaxed mb-1.5">
                  <strong className="text-navy font-semibold">What you get:</strong> {sc.benefit}
                </div>
                <div className="text-[13px] leading-relaxed mb-3.5 flex-1">
                  <strong className="text-navy font-semibold">Who qualifies:</strong> {sc.eligibility}
                </div>
                <Link
                  to="/scholarships"
                  className="block text-center bg-navy text-white font-display font-semibold text-[13.5px] py-3 rounded-[10px]"
                >
                  Check if you qualify
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="px-5 sm:px-8 lg:px-12 pt-9 lg:pt-16 pb-2">
        <Container>
          <Eyebrow>Why VL</Eyebrow>
          <H2 className="mb-4 lg:mb-6">Guidance you can count on</H2>
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-10">
            {WHY_US.map((w, i) => (
              <div key={i} className="flex gap-3 items-start py-3 border-b border-line-soft">
                <div className="w-[26px] h-[26px] rounded-full bg-green-soft text-green flex items-center justify-center text-[13px] shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="font-display font-medium text-[14.5px] text-navy">{w.name}</div>
                  <div className="text-[13px] leading-normal text-slate mt-0.5">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* A full width photo band. It breaks up a long page of text blocks, and it puts the
          outcome, graduation day, right before the students who got there. */}
      <section className="relative mt-9 lg:mt-16 h-[190px] sm:h-[240px] lg:h-[300px]">
        <Img image={IMAGES.homeStories} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/15" />
        <Container className="relative h-full px-5 sm:px-8 lg:px-12 flex flex-col justify-center">
          <p className="font-display font-semibold text-[18px] sm:text-[24px] lg:text-[30px] text-white leading-snug m-0 max-w-lg">
            Three years, dozens of students, two countries we know properly.
          </p>
          <p className="text-[13px] sm:text-[14.5px] text-[#D3DCEE] mt-2 m-0 max-w-md">
            Every one of them started with a single message asking whether it was even possible.
          </p>
        </Container>
      </section>

      {/* Success stories */}
      <section className="pt-9 lg:pt-16 pb-2">
        <Container className="px-5 sm:px-8 lg:px-12">
          <Eyebrow>Success stories</Eyebrow>
          <H2 className="mb-4 lg:mb-6">Students already out there</H2>
        </Container>
        <div className="flex gap-3 overflow-x-auto md:overflow-visible md:grid md:grid-cols-3 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto pt-1 pb-3 no-scrollbar md:gap-4">
          {TESTIMONIALS.map((s, i) => (
            <div key={i} className="shrink-0 w-[280px] md:w-auto border border-line rounded-2xl p-[18px] shadow-[0_6px_16px_rgba(10,30,60,0.05)] bg-white">
              <div className="flex gap-3 items-center mb-3">
                <PersonAvatar person={s.personKey} className="w-11 h-11 rounded-full overflow-hidden shrink-0" />
                <div>
                  <div className="font-display font-semibold text-[14px] text-navy">{s.name}</div>
                  <div className="text-[11.5px] text-mist">
                    {s.flag} {s.tag}
                  </div>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed m-0 text-ink">“{s.quote}”</p>
            </div>
          ))}
        </div>
        <Container className="px-5 sm:px-8 lg:px-12 pt-4">
          <Link
            to="/about"
            className="block text-center sm:inline-block sm:mx-auto border-[1.5px] border-[#D6DEEC] text-navy font-display font-semibold text-[14px] py-3.5 px-8 rounded-xl"
          >
            Read more stories
          </Link>
        </Container>
      </section>

      {/* Eligibility form */}
      <section className="px-5 sm:px-8 lg:px-12 mt-9 lg:mt-16">
        <Container className="lg:max-w-xl">
          <div className="rounded-[20px] bg-[#F4F8FE] border border-[#E3EBF8] p-5 lg:p-8">
            <h2 className="font-display font-semibold text-[20px] text-navy m-0 mb-1.5">Free eligibility check</h2>
            <p className="text-[13.5px] leading-normal m-0 mb-4.5">
              Tell us a little about yourself and we will get back to you within a day with your options.
            </p>
            {sent ? (
              <div className="bg-green-soft border border-[#CBE5D8] rounded-xl p-[18px] text-center">
                <div className="font-display font-semibold text-[15px] text-green mb-1">Thanks, {form.name}.</div>
                <div className="text-[13px] text-ink">One of our counsellors will contact you within 24 hours.</div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <input value={form.name} onChange={setField('name')} placeholder="Full name" className={inputClass} />
                <input value={form.email} onChange={setField('email')} placeholder="Email address" className={inputClass} />
                <input value={form.phone} onChange={setField('phone')} placeholder="Phone or WhatsApp number" className={inputClass} />
                <select value={form.qual} onChange={setField('qual')} className={`${inputClass} text-ink`}>
                  <option value="">Current qualification</option>
                  <option>Matric or O Levels</option>
                  <option>FSc, FA or A Levels</option>
                  <option>Bachelor degree (BS, BSc, BA)</option>
                  <option>Master degree (MS, MSc, MA)</option>
                </select>
                <div className="flex gap-2.5">
                  <select value={form.country} onChange={setField('country')} className={`${inputClass} flex-1 min-w-0 text-ink`}>
                    <option value="">Country</option>
                    <option>Italy</option>
                    <option>France</option>
                    <option>Either</option>
                  </select>
                  <select value={form.intake} onChange={setField('intake')} className={`${inputClass} flex-1 min-w-0 text-ink`}>
                    <option value="">Intake</option>
                    <option>Sep 2026</option>
                    <option>Feb 2027</option>
                    <option>Sep 2027</option>
                  </select>
                </div>
                <input value={form.program} onChange={setField('program')} placeholder="Preferred program, for example MSc Data Science" className={inputClass} />
                <button
                  type="button"
                  onClick={submit}
                  className="mt-1 bg-royal text-white font-display font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer shadow-[0_8px_20px_rgba(43,92,230,0.28)]"
                >
                  Check my eligibility
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="px-5 sm:px-8 lg:px-12 pt-9 lg:pt-16 pb-2">
        <Container className="lg:max-w-3xl">
          <Eyebrow>FAQ</Eyebrow>
          <H2 className="mb-3.5 lg:mb-6">Questions students ask us</H2>
          <Faq items={HOME_FAQS} defaultOpen={0} />
        </Container>
      </section>

      {/* Guides. Linking the home page to the articles matters twice over: a student who is not
          ready to fill in a form still has a reason to stay on the site, and search engines use
          internal links to work out which of your pages are the important ones. */}
      <section className="px-5 sm:px-8 lg:px-12 pt-9 lg:pt-16 pb-2">
        <Container>
          <Eyebrow>Guides</Eyebrow>
          <H2 className="mb-2">Read before you apply</H2>
          <p className="text-[13.5px] leading-relaxed mb-4 lg:mb-6 max-w-2xl">
            Written for students applying from Pakistan, so they name IBCC, HEC, MOFA, Universitaly and Campus France
            rather than talking in general terms. No sign up, no email required.
          </p>
          <div className="grid sm:grid-cols-3 gap-3.5 lg:gap-4">
            {POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="flex flex-col rounded-[16px] overflow-hidden border border-line bg-white shadow-[0_6px_16px_rgba(10,30,60,0.05)]"
              >
                <div className="h-[130px]">
                  <Img image={IMAGES[post.image]} className="w-full h-full" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-royal mb-1.5">
                    {post.category} · {post.read} min
                  </div>
                  <h3 className="font-display font-semibold text-[15px] text-navy m-0 mb-1.5 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[13px] leading-normal text-slate m-0 flex-1">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/blog"
            className="block text-center mt-3.5 sm:inline-block sm:mx-auto border-[1.5px] border-[#D6DEEC] text-navy font-display font-semibold text-[14px] py-3.5 px-8 rounded-xl"
          >
            All guides
          </Link>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="px-5 sm:px-8 lg:px-12 mt-9 lg:mt-16 mb-9 lg:mb-16">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[20px] bg-gradient-to-br from-navy to-navy-soft p-[30px_22px] lg:p-12 text-center">
            <h2 className="font-display font-semibold text-[22px] lg:text-[28px] text-white m-0 mb-2 leading-tight">Ready to start?</h2>
            <p className="text-[13.5px] lg:text-[15px] leading-relaxed text-[#AAB8D4] m-0 mb-5 max-w-md mx-auto">
              Talk to a counsellor and get advice for Italy or France that fits your grades and your budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:justify-center sm:max-w-md mx-auto">
              <Link to="/contact" className="bg-white text-navy font-display font-semibold text-[15px] py-3.5 px-6 rounded-xl sm:flex-1">
                Book a free consultation
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 border border-white/25 text-white font-display font-semibold text-[15px] py-3 px-6 rounded-xl sm:flex-1"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

function DestinationCard({ image, flag, label, title, text, to, cta }) {
  return (
    <div className="rounded-[18px] overflow-hidden border border-line shadow-[0_10px_24px_rgba(10,30,60,0.07)] flex flex-col">
      <div className="h-[130px] lg:h-[180px] relative">
        <Img image={image} className="w-full h-full" />
        <span className="absolute top-2.5 left-2.5 bg-white/95 rounded-lg px-2.5 py-1.5 font-display font-semibold text-[12px] text-navy">
          {flag} {label}
        </span>
      </div>
      <div className="px-[18px] pt-4 pb-[18px] flex flex-col flex-1">
        <h3 className="font-display font-semibold text-[17px] text-navy m-0 mb-1.5">{title}</h3>
        <p className="text-[13.5px] leading-normal m-0 mb-3.5 flex-1">{text}</p>
        <Link to={to} className="block text-center bg-royal text-white font-display font-semibold text-[14px] py-3 rounded-[11px]">
          {cta}
        </Link>
      </div>
    </div>
  )
}
