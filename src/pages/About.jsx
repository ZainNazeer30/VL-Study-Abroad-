import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { PersonAvatar } from '../components/artwork'
import { Eyebrow, Container } from '../components/ui'
import { TONES } from '../data/site'
import { IMAGES } from '../data/images'
import { useSeo, graph, absolute } from '../hooks/useSeo'
import { Avatar } from '../components/ui'
import { ABOUT_STATS, ABOUT_VALUES, ABOUT_STORIES, FOUNDERS } from '../data/about'

export default function About() {
  useSeo(
    'About Us',
    'Three years helping Pakistani students into universities in Italy and France, with a focus on fully funded scholarships and a strong visa record.',
    {
      path: '/about',
      image: IMAGES.aboutTeam.src,
      jsonLd: graph(
        { '@type': 'AboutPage', name: 'About VL Study Abroad Consultants', url: absolute('/about') },
        // Naming the founders, with the profiles that back them up, is the clearest way to show
        // a search engine that a real business with real expertise is behind the advice.
        ...FOUNDERS.map((f) => ({
          '@type': 'Person',
          name: f.name,
          jobTitle: f.role,
          description: f.quote,
          sameAs: [f.linkedin],
          worksFor: { '@id': absolute('/#organisation') },
        })),
        {
          '@id': absolute('/#organisation'),
          founder: FOUNDERS.map((f) => ({ '@type': 'Person', name: f.name, sameAs: [f.linkedin] })),
        }
      ),
    }
  )
  return (
    <div>
      <section className="px-5 sm:px-8 lg:px-12 pt-7 pb-6 lg:py-14 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:max-w-3xl">
          <Eyebrow>About us</Eyebrow>
          <h1 className="font-display font-bold text-[27px] sm:text-[34px] leading-tight text-navy m-0 mb-3">
            We help students get into European universities
          </h1>
          <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed m-0">
            We started VL to make studying in Italy and France a real option for students from every background and
            budget. We chose to know two countries really well, rather than know twenty just a little, and we have
            spent more than three years building that knowledge.
          </p>
        </Container>
      </section>

      <div className="px-5 sm:px-8 lg:px-12">
        <Container className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-4 lg:max-w-3xl">
          {ABOUT_STATS.map((k, i) => (
            <div key={i} className="bg-navy rounded-[13px] px-2.5 py-3.5 lg:py-5 text-center">
              <div className="font-display font-bold text-[18px] lg:text-[22px] text-gold">{k.v}</div>
              <div className="text-[10.5px] leading-tight text-[#AAB8D4] mt-0.5">{k.l}</div>
            </div>
          ))}
        </Container>
      </div>

      <div className="px-5 sm:px-8 lg:px-12 pt-6">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[18px] overflow-hidden h-[190px] sm:h-[260px]">
            <Img image={IMAGES.aboutTeam} className="w-full h-full" />
          </div>
        </Container>
      </div>

      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[24px] text-navy m-0 mb-4">How we work</h2>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2.5">
            {ABOUT_VALUES.map((v, i) => (
              <div key={i} className="flex gap-3.5 bg-[#F9FBFE] border border-[#ECF0F7] rounded-[14px] p-4">
                <div className={`w-[34px] h-[34px] rounded-[10px] ${TONES[v.tone].bg} ${TONES[v.tone].fg} flex items-center justify-center text-[15px] shrink-0`}>
                  {v.glyph}
                </div>
                <div>
                  <div className="font-display font-semibold text-[14.5px] text-navy">{v.t}</div>
                  <div className="text-[13px] leading-relaxed mt-0.5">{v.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Who you actually get. A small consultancy's strongest asset is that the person on the
          call is a named person you can look up, rather than an anonymous "team". */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-3xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[24px] text-navy m-0 mb-1.5">
            Who you will be working with
          </h2>
          <p className="text-[14px] leading-relaxed m-0 mb-4">
            VL is deliberately small. There is no call centre and no handing your file between departments: you deal
            with one of us from the first conversation to the day you land.
          </p>
          <div className="flex flex-col gap-3.5">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="border border-line rounded-[16px] p-5 bg-white shadow-[0_6px_16px_rgba(10,30,60,0.05)]">
                <div className="flex items-center gap-3.5 mb-3">
                  {f.photo ? (
                    <img src={f.photo} alt={f.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
                  ) : (
                    <Avatar initials={f.initials} tone={f.tone} className="w-14 h-14 text-[17px]" />
                  )}
                  <div>
                    <div className="font-display font-semibold text-[16px] text-navy leading-tight">{f.name}</div>
                    <div className="text-[12.5px] text-mist mt-0.5">{f.role}</div>
                  </div>
                </div>
                {f.bio.map((para, i) => (
                  <p key={i} className="text-[13.5px] leading-relaxed text-ink m-0 mb-2.5">
                    {para}
                  </p>
                ))}
                <blockquote className="border-l-[3px] border-royal-soft pl-3.5 my-3 m-0">
                  <p className="text-[13.5px] leading-relaxed text-navy italic m-0">“{f.quote}”</p>
                </blockquote>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-royal"
                >
                  {f.name.split(' ')[0]} on LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container>
          <h2 className="font-display font-semibold text-[21px] sm:text-[24px] text-navy m-0 mb-1.5">Success stories</h2>
          <p className="text-[13.5px] leading-relaxed m-0 mb-4">Real students and real admissions. Here is how it went for a few of them.</p>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4">
            {ABOUT_STORIES.map((st, i) => (
              <div key={i} className="border border-line rounded-2xl p-[18px] shadow-[0_6px_16px_rgba(10,30,60,0.05)]">
                <div className="flex gap-3 items-center mb-3">
                  <PersonAvatar person={st.personKey} className="w-[46px] h-[46px] rounded-full overflow-hidden shrink-0" />
                  <div>
                    <div className="font-display font-semibold text-[14.5px] text-navy">{st.name}</div>
                    <div className="text-[12px] text-mist">
                      {st.flag} {st.tag}
                    </div>
                  </div>
                </div>
                <p className="text-[13.5px] leading-relaxed m-0">“{st.quote}”</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 mt-8 mb-9 lg:mt-14 lg:mb-16">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[20px] bg-gradient-to-br from-navy to-navy-soft p-[28px_22px] lg:p-12 text-center">
            <h2 className="font-display font-semibold text-[20px] lg:text-[26px] text-white m-0 mb-2">Your story could be next</h2>
            <p className="text-[13.5px] lg:text-[15px] leading-relaxed text-[#AAB8D4] m-0 mb-4.5 max-w-md mx-auto">
              Start with a free consultation and get honest advice about your real options.
            </p>
            <Link to="/contact" className="inline-block bg-white text-navy font-display font-semibold text-[15px] py-3.5 px-8 rounded-xl">
              Book a free consultation
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}
