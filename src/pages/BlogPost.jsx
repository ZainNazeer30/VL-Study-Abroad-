import { Link, useParams, Navigate } from 'react-router-dom'
import Img from '../components/Img'
import Faq from '../components/Faq'
import PostBody from '../components/PostBody'
import { Container } from '../components/ui'
import { IMAGES } from '../data/images'
import { POST_BY_SLUG, formatPostDate } from '../data/blog'
import { CONTACT } from '../data/site'
import { useSeo, faqSchema, graph, absolute } from '../hooks/useSeo'

export default function BlogPost() {
  const { slug } = useParams()
  const post = POST_BY_SLUG[slug]

  // An address that does not match an article should not quietly show something else, because a
  // search engine would then index a page that is not what its address says. Send it to the blog
  // index instead, and replace the history entry so the back button still works properly.
  if (!post) return <Navigate to="/blog" replace />

  return <Article key={post.slug} post={post} />
}

function Article({ post }) {
  const image = IMAGES[post.image]
  const related = (post.related || []).map((s) => POST_BY_SLUG[s]).filter(Boolean)

  useSeo(post.seoTitle || post.title, post.description, {
    path: `/blog/${post.slug}`,
    image: image?.src,
    type: 'article',
    jsonLd: graph(
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: absolute(image?.src),
        datePublished: post.date,
        dateModified: post.updated || post.date,
        inLanguage: 'en',
        keywords: (post.keywords || []).join(', '),
        wordCount: countWords(post),
        timeRequired: `PT${post.read}M`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(`/blog/${post.slug}`) },
        author: { '@type': 'Organization', name: 'VL Study Abroad Consultants', url: absolute('/') },
        publisher: {
          '@type': 'Organization',
          name: 'VL Study Abroad Consultants',
          logo: { '@type': 'ImageObject', url: absolute('/logo.png') },
        },
      },
      post.faqs?.length ? faqSchema(post.faqs) : null
    ),
  })

  return (
    <div>
      <article>
        <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-5 lg:pt-10 bg-gradient-to-b from-[#F6F9FE] to-white">
          <Container className="lg:max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-royal">{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-[#D6DEEC]" />
              <span className="text-[11.5px] text-mist">{post.read} min read</span>
            </div>
            <h1 className="font-display font-bold text-[26px] sm:text-[33px] lg:text-[38px] leading-[1.2] text-navy m-0 mb-3">
              {post.title}
            </h1>
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-slate m-0 mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-mist">
              <span>By the VL Study Abroad team</span>
              <span aria-hidden="true">·</span>
              <span>
                Published{' '}
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </span>
              {post.updated && post.updated !== post.date && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                  </span>
                </>
              )}
            </div>
          </Container>
        </section>

        <div className="px-5 sm:px-8 lg:px-12">
          <Container className="lg:max-w-3xl">
            <div className="rounded-[18px] overflow-hidden h-[190px] sm:h-[280px] lg:h-[340px]">
              <Img image={image} loading="eager" fetchPriority="high" className="w-full h-full" />
            </div>
          </Container>
        </div>

        <section className="px-5 sm:px-8 lg:px-12 pt-6">
          <Container className="lg:max-w-3xl">
            <PostBody blocks={post.body} />
          </Container>
        </section>

        {post.faqs?.length > 0 && (
          <section className="px-5 sm:px-8 lg:px-12 pt-6">
            <Container className="lg:max-w-3xl">
              <h2 className="font-display font-semibold text-[20px] sm:text-[23px] text-navy mt-4 mb-3">
                Common questions
              </h2>
              <Faq items={post.faqs} defaultOpen={0} />
            </Container>
          </section>
        )}
      </article>

      <section className="px-5 sm:px-8 lg:px-12 pt-8">
        <Container className="lg:max-w-3xl">
          <div className="rounded-[18px] border border-[#E3EBF8] bg-[#F4F8FE] p-5 lg:p-7">
            <h2 className="font-display font-semibold text-[18px] lg:text-[21px] text-navy m-0 mb-1.5">
              Want this checked against your own file?
            </h2>
            <p className="text-[13.5px] leading-relaxed m-0 mb-4">
              Send us your marks, your budget and your intended intake. We will tell you which universities are
              realistic, whether a fully funded route is open to you, and exactly what your documents need. There is no
              charge for the first conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                to="/apply"
                className="bg-royal text-white text-center font-display font-semibold text-[14.5px] py-3.5 px-6 rounded-xl sm:flex-1"
              >
                Start your application
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="border-[1.5px] border-[#D6DEEC] bg-white text-navy text-center font-display font-semibold text-[14.5px] py-3 px-6 rounded-xl sm:flex-1"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="px-5 sm:px-8 lg:px-12 pt-9">
          <Container className="lg:max-w-3xl">
            <h2 className="font-display font-semibold text-[19px] text-navy m-0 mb-3.5">Read next</h2>
            <div className="grid sm:grid-cols-3 gap-3.5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="flex flex-col rounded-[14px] border border-line bg-white overflow-hidden"
                >
                  <div className="h-[96px]">
                    <Img image={IMAGES[r.image]} className="w-full h-full" />
                  </div>
                  <div className="p-3.5">
                    <div className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-royal mb-1">
                      {r.category}
                    </div>
                    <div className="font-display font-semibold text-[14px] text-navy leading-snug">{r.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="px-5 sm:px-8 lg:px-12 pt-8 pb-10 lg:pb-16">
        <Container className="lg:max-w-3xl">
          <Link to="/blog" className="text-[13.5px] font-semibold text-royal">
            ← All guides
          </Link>
        </Container>
      </section>
    </div>
  )
}

// Used only for the structured data. Google does not rank on word count, but wordCount is part
// of the BlogPosting shape and costs nothing to fill in correctly.
function countWords(post) {
  const parts = post.body.flatMap((b) => {
    if (b.p) return [b.p]
    if (b.h2) return [b.h2]
    if (b.h3) return [b.h3]
    if (b.note) return [b.note]
    if (b.ul) return b.ul
    if (b.ol) return b.ol
    if (b.table) return [...b.table.head, ...b.table.rows.flat()]
    return []
  })
  return parts.join(' ').split(/\s+/).filter(Boolean).length
}
