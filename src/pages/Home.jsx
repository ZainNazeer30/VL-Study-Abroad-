import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { H2, Container } from '../components/ui'
import { IMAGES } from '../data/images'
import { CONTACT } from '../data/site'
import { POSTS } from '../data/blog'
import { HOME_UNIS, STEPS } from '../data/home'
import { useSeo, graph, absolute } from '../hooks/useSeo'

const SERVICES = [
  ['01', 'University selection', 'Shortlisting is based on the course, academic background, language, budget and the university’s actual requirements.'],
  ['02', 'Applications', 'Our admissions team checks forms, supporting documents, motivation letters and deadlines before submission.'],
  ['03', 'Documents', 'We guide students through the relevant IBCC, HEC, MOFA and university documentation requirements.'],
  ['04', 'Scholarships', 'We identify scholarship and fee-support routes and explain eligibility, deadlines and what each award covers.'],
  ['05', 'Visa preparation', 'The visa file is reviewed against the current official requirements, including financial and academic evidence.'],
  ['06', 'Pre-departure', 'Before travel, students receive practical guidance on accommodation, documents, arrival and the first steps abroad.'],
]

const UNIVERSITY_ROWS = [
  ...HOME_UNIS.slice(0, 6),
]

export default function Home() {
  useSeo(
    'Study in Italy or France from Pakistan | VL Study Abroad',
    'VL Study Abroad helps Pakistani students research universities, scholarships and application routes for Italy and France, with admissions, documents and visa guidance from a local team.',
    {
      path: '/',
      bare: true,
      image: IMAGES.homeHero.src,
      jsonLd: graph({
        '@type': 'WebPage',
        '@id': absolute('/#webpage'),
        url: absolute('/'),
        name: 'Study in Italy or France from Pakistan',
        isPartOf: { '@id': absolute('/#website') },
        about: { '@id': absolute('/#organisation') },
        primaryImageOfPage: absolute(IMAGES.homeHero.src),
        inLanguage: 'en',
      }),
    }
  )

  return (
    <div className="site-page overflow-hidden">
      <section className="home-editorial-hero">
        <Container className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="editorial-kicker">Study in Italy or France from Pakistan</p>
            <h1>Good applications start with good information.</h1>
            <p className="home-lead">
              Explore universities, programmes, scholarships and application requirements before you make a decision. When you need help, our team works with you through the application process.
            </p>
            <div className="home-actions">
              <Link to="/universities" className="btn-primary">Explore universities</Link>
              <Link to="/contact" className="btn-secondary">Contact the team</Link>
            </div>
            <div className="home-facts" aria-label="VL Study Abroad at a glance">
              <span><strong>Italy + France</strong> <small>our focus</small></span>
              <span><strong>20+</strong> <small>students placed</small></span>
              <span><strong>Pakistan</strong> <small>local guidance</small></span>
            </div>
          </div>
          <div className="home-hero-media-wrap">
            <Img image={IMAGES.homeHero} className="home-hero-image" />
            <div className="home-hero-caption">
              <strong>For students applying from Pakistan</strong>
              <span>University choice · documents · scholarships · visa preparation</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-intro">
        <Container className="home-intro-grid">
          <div>
            <p className="editorial-kicker">About VL</p>
            <H2>A study abroad agency with a practical approach.</H2>
          </div>
          <div className="home-intro-copy">
            <p>Choosing a university is only one part of studying abroad. For Pakistani students, the academic requirements, document attestation, university process and visa preparation all have to fit together.</p>
            <p>VL Study Abroad is a team focused on Italy and France. We combine research with application support, so students can understand their options before deciding which route to take.</p>
            <Link to="/about" className="text-link">Meet our team →</Link>
          </div>
        </Container>
      </section>

      <section className="home-destinations">
        <Container>
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">Destinations</p>
              <H2>Two countries. Different systems.</H2>
            </div>
            <p>Italy and France have different admission, scholarship and visa processes. Start with the country, then narrow down to the right university.</p>
          </div>
          <div className="destination-editorial-grid">
            <Destination image={IMAGES.homeItaly} country="Italy" title="Study in Italy" text="Explore public universities, English-taught programmes, regional scholarships and the application steps for students applying from Pakistan." to="/italy" />
            <Destination image={IMAGES.homeFrance} country="France" title="Study in France" text="Understand universities, specialist schools, Campus France, scholarships and the student visa route from Pakistan." to="/france" />
          </div>
        </Container>
      </section>

      <section className="home-research">
        <Container>
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">Research</p>
              <H2>Start with the information you need.</H2>
            </div>
            <p>The website is designed to be useful even if you are not ready to contact us yet.</p>
          </div>
          <div className="research-links">
            <ResearchLink to="/universities" title="University finder" text="Browse universities by country, level and subject." />
            <ResearchLink to="/scholarships" title="Scholarships" text="See available funding routes and their requirements." />
            <ResearchLink to="/universities/bachelors" title="Bachelor degrees" text="Understand the route after FSc, A Levels or equivalent." />
            <ResearchLink to="/universities/masters" title="Master degrees" text="Compare entry requirements and application routes." />
            <ResearchLink to="/blog/cost-of-studying-in-italy-and-france" title="Costs" text="Read about tuition, living costs and other expenses." />
            <ResearchLink to="/blog/intake-deadlines-italy-france" title="Deadlines" text="See how application timelines usually work." />
          </div>
        </Container>
      </section>

      <section className="home-universities">
        <Container>
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">Universities</p>
              <H2>Begin with the university, not the promise.</H2>
            </div>
            <Link to="/universities" className="text-link">Browse all universities →</Link>
          </div>
          <div className="university-table-wrap">
            <table className="university-table">
              <thead><tr><th>University</th><th>Country</th><th>Level</th><th>Study area</th></tr></thead>
              <tbody>
                {UNIVERSITY_ROWS.map((u) => (
                  <tr key={u.name}>
                    <td><Link to={`/universities/${slugify(u.name)}`}>{u.name}</Link></td>
                    <td>{u.country}</td>
                    <td>{u.levels?.join(' / ') || 'Bachelor / Master'}</td>
                    <td>{u.tags?.slice(0, 2).join(', ') || 'Multiple subjects'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="source-note">University information can change by programme and intake. Check the individual university page and the official university source before applying.</p>
        </Container>
      </section>

      <section className="home-services">
        <Container>
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">Our work</p>
              <H2>Where our team gets involved.</H2>
            </div>
            <p>Not every student needs the same level of support. We work through the parts of the process that need attention.</p>
          </div>
          <div className="service-list">
            {SERVICES.map(([number, title, text]) => (
              <article key={number} className="service-row">
                <span className="service-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-process">
        <Container>
          <div className="process-heading">
            <p className="editorial-kicker">The process</p>
            <H2>From choosing a course to preparing for departure.</H2>
          </div>
          <div className="process-list">
            {STEPS.map((step, index) => (
              <div className="process-row" key={step.n || index}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{step.name}</h3><p>{step.desc || step.d}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-guides">
        <Container>
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">Guides</p>
              <H2>Practical reading for Pakistani students.</H2>
            </div>
            <Link to="/blog" className="text-link">View all guides →</Link>
          </div>
          <div className="guide-editorial-grid">
            {POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="guide-editorial">
                <Img image={IMAGES[post.image]} className="guide-image" />
                <div className="guide-body">
                  <span>{post.category} · {post.read} min read</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-contact-band">
        <Container className="contact-band-inner">
          <div>
            <p className="editorial-kicker">Need help with your case?</p>
            <h2>Talk to the VL team.</h2>
            <p>Tell us your study level, subject and preferred country. We can explain what the next steps normally look like.</p>
          </div>
          <div className="home-actions">
            <Link to="/contact" className="btn-primary">Contact the team</Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp</a>
          </div>
        </Container>
      </section>
    </div>
  )
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function Destination({ image, country, title, text, to }) {
  return (
    <Link to={to} className="destination-editorial">
      <Img image={image} className="destination-image" />
      <div className="destination-body">
        <span>{country}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <strong>Explore {country} →</strong>
      </div>
    </Link>
  )
}

function ResearchLink({ to, title, text }) {
  return (
    <Link to={to} className="research-link">
      <div><h3>{title}</h3><p>{text}</p></div><span aria-hidden="true">→</span>
    </Link>
  )
}
