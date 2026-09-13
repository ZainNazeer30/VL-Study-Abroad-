import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { PersonAvatar } from '../components/artwork'
import { Container } from '../components/ui'
import { SERVICE_ICONS } from '../components/icons'
import { TILE } from '../data/site'
import { IMAGES } from '../data/images'
import { useSeo, graph, absolute } from '../hooks/useSeo'
import { Avatar } from '../components/ui'
import { ABOUT_STATS, ABOUT_VALUES, ABOUT_STORIES, FOUNDERS } from '../data/about'

export default function About() {
  useSeo(
    'About Us: Italy and France Specialists',
    'Meet Kashan and Umer. Three years getting Pakistani students into universities in Italy and France, with fully funded scholarships and a strong visa record.',
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
          // A named person with a face and a checkable profile is the strongest trust signal a
          // small consultancy has, and it is exactly what Google's quality guidelines look for.
          image: f.image && IMAGES[f.image] ? absolute(IMAGES[f.image].src) : undefined,
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
        <Container className="grid grid-cols-3 gap-2 lg:gap-4 lg:max-w-3xl">
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
            {ABOUT_VALUES.map((v, i) => {
              const Icon = SERVICE_ICONS[v.icon]
              return (
                <div key={i} className="flex gap-3.5 bg-[#F9FBFE] border border-[#ECF0F7] rounded-[14px] p-4">
                  <div className={`w-[34px] h-[34px] rounded-[10px] ${TILE.bg} ${TILE.fg} flex items-center justify-center shrink-0`}>
                    {Icon ? <Icon className="w-[18px] h-[18px]" /> : null}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-[14.5px] text-navy">{v.t}</div>
                    <div className="text-[13px] leading-relaxed mt-0.5">{v.d}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Who you actually get. A small consultancy's strongest asset is that the person on the
          call is a named person you can look up, rather than an anonymous "team". */}
      <section className="px-5 sm:px-8 lg:px-12 pt-8 lg:pt-14 pb-1.5">
        <Container className="lg:max-w-5xl">
          <h2 className="font-display font-semibold text-[21px] sm:text-[24px] text-navy m-0 mb-1.5">
            Who you will be working with
          </h2>
          <p className="text-[14px] leading-relaxed m-0 mb-4 lg:max-w-3xl">
            VL is deliberately small. There is no call centre and no handing your file between departments: you deal
            with one of us from the first conversation to the day you land. We work entirely online, on calls, video
            and WhatsApp, so it makes no difference where in Pakistan you are.
          </p>
          {/* Two across on wider screens, as in the reference layout. The container is widened
              for this section only so each card has room for a bio without going narrow. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-stretch">
            {FOUNDERS.map((f) => (
              <FounderCard key={f.name} founder={f} />
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

      <section className="px-5 sm:px-8 lg:px-12 mt-8 mb-9 lg:mt-14 lg:mb-16" id="cta">
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

// One founder, laid out the way the lead card on the Guides page is: photograph on the left,
// words on the right once there is room for both side by side. On a phone the photo sits on top
// at a fixed height and the text runs underneath, because two narrow columns would leave the
// bio about four words wide.
//
// The photo is a real photograph now, so it is given the same treatment as every other photo on
// the site: three widths in webp and jpg, and the browser takes the smallest file that still
// looks sharp. If an entry in src/data/about.js has no `image` key, the initials show instead
// and the layout is unchanged.
function FounderCard({ founder: f }) {
  const photo = f.image ? IMAGES[f.image] : null
  return (
    <article className="border border-line rounded-[18px] bg-white shadow-[0_6px_16px_rgba(10,30,60,0.05)] p-5 sm:p-6 lg:p-7 h-full">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        {/* Photograph as a rounded square rather than a full height panel. It sits beside the
            name instead of competing with it, which is what lets the name carry the card. */}
        <div className="shrink-0">
          {photo ? (
            <Img
              image={photo}
              className="w-[104px] h-[104px] lg:w-[124px] lg:h-[124px] rounded-[16px] overflow-hidden"
            />
          ) : (
            <Avatar
              initials={f.initials}
              tone={f.tone}
              className="w-[104px] h-[104px] lg:w-[124px] lg:h-[124px] text-[30px]"
            />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-display font-semibold text-[21px] lg:text-[24px] text-navy leading-tight m-0">
            {f.name}
          </h3>

          {/* Role and the LinkedIn address on one accent coloured line. A named person with a
              profile a student can open is the strongest trust signal a small consultancy has,
              so it belongs directly under the name rather than buried at the foot of the card. */}
          <div className="text-[13px] lg:text-[13.5px] font-semibold text-royal mt-1.5 mb-3">
            {f.role}
            <span className="text-mist font-normal"> · </span>
            <a
              href={f.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-navy"
            >
              LinkedIn
            </a>
          </div>

          {f.bio.map((para, i) => (
            <p key={i} className="text-[14px] lg:text-[14.5px] leading-[1.7] text-ink m-0 mb-2.5">
              {para}
            </p>
          ))}

          <p className="text-[13.5px] leading-relaxed text-navy italic m-0 mt-3">“{f.quote}”</p>
        </div>
      </div>
    </article>
  )
}
