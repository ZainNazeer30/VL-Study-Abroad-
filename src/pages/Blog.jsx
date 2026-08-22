import { useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { Container, Eyebrow } from '../components/ui'
import { IMAGES } from '../data/images'
import { POSTS, BLOG_CATEGORIES, formatPostDate } from '../data/blog'
import { CONTACT } from '../data/site'
import { useSeo, graph, absolute } from '../hooks/useSeo'

export default function Blog() {
  const [cat, setCat] = useState('All')
  const shown = cat === 'All' ? POSTS : POSTS.filter((p) => p.category === cat)
  const [lead, ...rest] = shown

  useSeo(
    'Study Abroad Guides for Pakistani Students',
    'Straight answers for Pakistani students on attestation, fully funded scholarships, student visas, real costs and intake deadlines for Italy and France.',
    {
      path: '/blog',
      image: IMAGES.blogApply.src,
      jsonLd: graph(
        {
          '@type': 'Blog',
          name: 'VL Study Abroad guides',
          description:
            'Guides for Pakistani students applying to universities in Italy and France.',
          url: absolute('/blog'),
          inLanguage: 'en',
          blogPost: POSTS.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: absolute(`/blog/${p.slug}`),
            datePublished: p.date,
            dateModified: p.updated || p.date,
            author: { '@type': 'Organization', name: 'VL Study Abroad Consultants' },
          })),
        }
      ),
    }
  )

  return (
    <div>
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-6 lg:pt-12 lg:pb-8 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:max-w-3xl">
          <Eyebrow>Guides</Eyebrow>
          <h1 className="font-display font-bold text-[27px] sm:text-[34px] lg:text-[38px] leading-tight text-navy m-0 mb-3">
            Straight answers on studying in Italy and France
          </h1>
          <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed m-0 max-w-2xl">
            Everything here is written for a student applying from Pakistan, so it names IBCC, HEC, MOFA, Campus France
            and the embassies in Islamabad rather than talking in general international terms. These are the questions
            students actually ask us on the first call.
          </p>
        </Container>
      </section>

      <div className="px-5 sm:px-8 lg:px-12 pt-4">
        <Container>
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {BLOG_CATEGORIES.map((c) => {
              const active = c === cat
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`shrink-0 px-3.5 py-2.5 rounded-full border text-[13px] font-medium cursor-pointer whitespace-nowrap ${
                    active ? 'border-royal bg-royal text-white' : 'border-[#E4E9F1] bg-white text-ink'
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </Container>
      </div>

      <section className="px-5 sm:px-8 lg:px-12 pb-4">
        <Container>
          {lead && <LeadCard post={lead} />}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>

          {shown.length === 0 && (
            <div className="text-[13px] text-slate text-center py-10 border border-dashed border-[#D6DEEC] rounded-2xl">
              Nothing in that category yet.
            </div>
          )}
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 mt-6 mb-10 lg:mb-16">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[20px] bg-gradient-to-br from-navy to-navy-soft p-[28px_22px] lg:p-10 text-center">
            <h2 className="font-display font-semibold text-[21px] lg:text-[26px] text-white m-0 mb-2 leading-tight">
              Still not sure where you stand?
            </h2>
            <p className="text-[13.5px] lg:text-[15px] leading-relaxed text-[#AAB8D4] m-0 mb-5 max-w-md mx-auto">
              Send us your marks and your budget and we will tell you honestly which intake is realistic and what a
              fully funded route would look like for you.
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
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

function LeadCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block rounded-[18px] overflow-hidden border border-line shadow-[0_10px_24px_rgba(10,30,60,0.07)] bg-white lg:flex"
    >
      <div className="h-[180px] sm:h-[230px] lg:h-auto lg:w-[46%] shrink-0">
        <Img image={IMAGES[post.image]} loading="eager" className="w-full h-full min-h-[180px]" />
      </div>
      <div className="p-5 lg:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-royal">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#D6DEEC]" />
          <span className="text-[11.5px] text-mist">{post.read} min read</span>
        </div>
        <h2 className="font-display font-semibold text-[19px] sm:text-[23px] lg:text-[26px] text-navy m-0 mb-2 leading-snug">
          {post.title}
        </h2>
        <p className="text-[14px] leading-relaxed text-slate m-0 mb-3">{post.excerpt}</p>
        <span className="font-semibold text-[13.5px] text-royal">Read the guide →</span>
      </div>
    </Link>
  )
}

function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="flex flex-col rounded-[16px] overflow-hidden border border-line bg-white shadow-[0_6px_16px_rgba(10,30,60,0.05)]"
    >
      <div className="h-[140px]">
        <Img image={IMAGES[post.image]} className="w-full h-full" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-royal">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#D6DEEC]" />
          <span className="text-[11px] text-mist">{post.read} min</span>
        </div>
        <h3 className="font-display font-semibold text-[15.5px] text-navy m-0 mb-1.5 leading-snug">{post.title}</h3>
        <p className="text-[13px] leading-normal text-slate m-0 mb-3 flex-1">{post.excerpt}</p>
        <time dateTime={post.updated || post.date} className="text-[11.5px] text-mist">
          {formatPostDate(post.updated || post.date)}
        </time>
      </div>
    </Link>
  )
}
