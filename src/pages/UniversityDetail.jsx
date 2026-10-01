import { Link, useParams } from 'react-router-dom'
import Img from '../components/Img'
import { Container } from '../components/ui'
import { UNIVERSITIES, LAST_REVIEWED } from '../data/universities'
import { STATUS } from '../data/site'
import { useSeo, graph, absolute } from '../hooks/useSeo'

const UNIVERSITY_IMAGES = {
  'university-of-bologna': { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students talking together on a university campus' },
  'politecnico-di-milano': { src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Student working at a desk with study materials' },
  'sapienza-university-of-rome': { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students collaborating in a university setting' },
  'university-of-padua': { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students discussing a project together' },
  'politecnico-di-torino': { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students working together around a table' },
  'sorbonne-university': { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students studying together in a classroom' },
  'universite-paris-saclay': { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students working together with laptops' },
  'universite-grenoble-alpes': { src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Modern university and city campus setting' },
  'universite-de-lyon': { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students working in a bright study space' },
  'universite-cote-d-azur': { src: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students walking through a European city campus' },
  'sciences-po': { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&h=900&q=82', alt: 'Students discussing ideas in a modern study environment' },
}

function slugify(value) {
  return value.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function UniversityDetail() {
  const { slug } = useParams()
  const university = UNIVERSITIES.find((u) => slugify(u.name) === slug)

  if (!university) {
    return <div className="px-5 py-20 text-center"><h1 className="font-display text-2xl text-navy">University not found</h1><Link to="/universities" className="text-royal">Back to universities →</Link></div>
  }

  const photo = UNIVERSITY_IMAGES[slug] || UNIVERSITY_IMAGES['university-of-bologna']
  const status = STATUS[university.tone]
  const title = `${university.name} for Pakistani Students`
  const description = `${university.name} in ${university.city}, ${university.country}: entry requirements, English requirements, intake, application deadline and official admissions link for Pakistani students.`

  useSeo(title, description, {
    path: `/universities/${slug}`,
    image: photo.src,
    jsonLd: graph(
      {
        '@type': 'WebPage',
        name: title,
        url: absolute(`/universities/${slug}`),
        description,
        dateModified: '2026-10-01',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: university.name,
        url: university.official,
        address: { '@type': 'PostalAddress', addressLocality: university.city, addressCountry: university.country === 'Italy' ? 'IT' : 'FR' },
      }
    ),
  })

  return (
    <div className="site-page">
      <section className="page-hero">
        <Container className="page-hero-inner lg:max-w-6xl">
          <div className="page-hero-copy">
            <div className="eyebrow">{university.flag} {university.country}</div>
            <h1 className="page-hero-title">{university.name}</h1>
            <p className="page-hero-text">A practical guide for Pakistani students: what you can study, what English proof is accepted, when to apply and what to prepare before the application window closes.</p>
            <div className="hero-proof">
              <span>{university.city}</span><span>{university.levels}</span><span>{university.intake}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
              <a href={university.official} target="_blank" rel="noopener noreferrer" className="btn-primary">Open official admissions site</a>
              <Link to="/apply" className="btn-secondary">Ask for a profile check</Link>
            </div>
          </div>
          <div className="page-hero-media"><img src={photo.src} alt={photo.alt} loading="eager" fetchPriority="high" /></div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-8 lg:py-12">
        <Container className="lg:max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <Info label="Entry" value={university.entry} />
            <Info label="English" value={university.english} />
            <Info label="Apply by" value={university.applyBy} />
            <Info label="Status" value={university.status} tone={status} />
          </div>

          <div className="grid lg:grid-cols-[1.3fr_.7fr] gap-8">
            <article>
              <h2 className="font-display font-semibold text-[26px] text-navy mb-3">What Pakistani applicants should know</h2>
              <p className="text-[15px] leading-[1.8] text-ink m-0 mb-5">{university.detail}</p>
              <h2 className="font-display font-semibold text-[22px] text-navy mb-3">Before you apply</h2>
              <ul className="space-y-2.5 text-[14px] leading-relaxed text-ink pl-5">
                <li>Confirm the exact programme requirements on the university's official page.</li>
                <li>Prepare your passport, academic transcripts and English-language evidence early.</li>
                <li>For Pakistani qualifications, start the relevant IBCC or HEC attestation process before the application deadline.</li>
                <li>Check the scholarship route separately. Admission and scholarship deadlines are often different.</li>
                <li>Keep enough time between admission, pre-enrolment and the visa appointment.</li>
              </ul>
            </article>
            <aside className="rounded-2xl bg-[#F7F9FC] border border-line p-5 h-fit">
              <div className="text-[10.5px] uppercase tracking-[.1em] font-semibold text-royal mb-2">VL Study checklist</div>
              <h2 className="font-display font-semibold text-[18px] text-navy m-0 mb-2">Want to know if this university fits you?</h2>
              <p className="text-[13px] leading-relaxed text-slate m-0 mb-4">Send your qualification, percentage/CGPA, programme and preferred intake. We can tell you what to check before you spend money on an application.</p>
              <Link to="/apply" className="block text-center bg-navy text-white font-display font-semibold text-[13.5px] py-3 rounded-xl">Check my profile</Link>
              <div className="text-[11px] text-mist mt-3">University data last reviewed {LAST_REVIEWED}.</div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-10 bg-navy">
        <Container className="lg:max-w-5xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <div className="text-[11px] uppercase tracking-[.1em] text-[#8FB0FF] mb-1">Next step</div>
            <h2 className="font-display font-semibold text-[25px] text-white m-0">Compare this university with your other options.</h2>
          </div>
          <Link to="/universities" className="shrink-0 bg-white text-navy font-display font-semibold text-[13.5px] px-5 py-3.5 rounded-xl">Back to university finder</Link>
        </Container>
      </section>
    </div>
  )
}

function Info({ label, value, tone }) {
  return <div className="rounded-2xl border border-line bg-white p-4"><div className="text-[10.5px] uppercase tracking-[.08em] text-mist mb-1.5">{label}</div><div className={`font-display font-semibold text-[13px] leading-relaxed ${tone ? `${tone.bg} ${tone.fg} inline-flex px-2 py-1 rounded-full` : 'text-navy'}`}>{value}</div></div>
}
