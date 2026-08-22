import { Link } from 'react-router-dom'
import { Container } from '../components/ui'
import { NAV_ITEMS } from '../data/site'
import { useSeo } from '../hooks/useSeo'

// Shown for any address that does not exist.
//
// The important part is the noindex tag below. A single page app cannot send a real 404 status
// from the browser, so without it a mistyped or dead link would be indexed as a real page. The
// tag tells search engines to leave this one out, which keeps your index clean and stops Search
// Console filling up with pages you never wrote.
export default function NotFound() {
  useSeo(
    'Page not found',
    'That page does not exist. Use the links here to find what you were looking for.',
    // noindex keeps mistyped and dead addresses out of Google. A single page app cannot send a
    // real 404 status from the browser, so this tag is what does the job instead.
    { noindex: true }
  )

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-14 lg:py-24">
      <Container className="lg:max-w-2xl text-center">
        <div className="font-display font-bold text-[52px] text-royal-soft leading-none mb-2">404</div>
        <h1 className="font-display font-bold text-[26px] sm:text-[32px] text-navy m-0 mb-3">
          We could not find that page
        </h1>
        <p className="text-[15px] leading-relaxed m-0 mb-6">
          The link may be out of date, or the address may have a typo in it. Everything on the site is one click from
          here.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-7">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border border-[#E4E9F1] bg-white rounded-full px-3.5 py-2.5 text-[13px] font-medium text-navy"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          to="/"
          className="inline-block bg-navy text-white font-display font-semibold text-[15px] py-3.5 px-8 rounded-xl"
        >
          Back to the home page
        </Link>
      </Container>
    </div>
  )
}
