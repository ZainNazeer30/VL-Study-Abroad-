// The build-time render. Only scripts/prerender.mjs imports this; the browser never loads it.
//
// It turns one address into finished HTML, so every page ships with its real content and its own
// title, description and preview picture already in the file. Crawlers that do not run
// JavaScript — WhatsApp, Facebook and LinkedIn among them — read that directly.
//
// renderToPipeableStream rather than renderToString, because the route table loads most pages
// with React.lazy. renderToString would stop at the Suspense boundary and write out the empty
// placeholder; the streaming renderer waits for the real page to arrive first.
//
// THE WARM-UP RENDER, AND WHY IT IS NOT WASTE
//
// Every page except the home page is loaded through React.lazy. The first time one is rendered,
// its import has not resolved yet, so Suspense suspends. React still finishes the page, but it
// writes it out in its streaming shape: an empty placeholder inside <main>, the real content in
// a <div hidden> further down, and a script that moves one into the other once JavaScript runs.
//
// For a browser that is fine and invisible. For a crawler it is not what we want at all — the
// whole point of prerendering is that <main> contains the page. WhatsApp and Facebook read the
// raw HTML and stop, and content parked in a hidden div is a far weaker signal to a search engine
// than content in its proper place.
//
// So each page is rendered twice. The first render is thrown away, and exists only to make the
// lazy import resolve. By the second render the component is already in hand, nothing suspends,
// and React writes the page inline where it belongs. It costs a few milliseconds per page at
// build time and it is the difference between a real HTML page and a shell.
import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { PassThrough } from 'node:stream'
import { AppRoutes, renderSuspenseInlineForSSR } from './App.jsx'
import { ssrHead } from './hooks/useSeo.js'

function renderOnce(url) {
  return new Promise((resolve, reject) => {
    let out = ''
    const sink = new PassThrough()
    sink.on('data', (c) => (out += c))
    sink.on('end', () => resolve(out))
    sink.on('error', reject)

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </StrictMode>,
      {
        // onAllReady, not onShellReady: we want the finished page, not the first paint.
        onAllReady() {
          pipe(sink)
        },
        onError(err) {
          reject(err)
        },
      },
    )

    // A page that never settles should fail the build loudly rather than write a half-page.
    setTimeout(() => {
      abort()
      reject(new Error(`Render timed out for ${url}`))
    }, 20000).unref?.()
  })
}

export async function render(url) {
  // Warm-up pass: resolves this route's lazy import. Output discarded. Suspense is still in the
  // tree here, which is what lets the import resolve rather than throw.
  await renderOnce(url)
  // From here on the route table renders its pages without a Suspense boundary, so React writes
  // them inline instead of in its streaming shape. See the note in src/App.jsx.
  renderSuspenseInlineForSSR()

  ssrHead.current = null
  const html = await renderOnce(url)

  // If the page still came back in the streaming shape it would ship as a shell, with a
  // placeholder where the content should be. Fail rather than write it: a red build is cheap,
  // a silently empty page is the exact thing this script exists to prevent.
  if (html.includes('<div hidden')) {
    throw new Error(`${url} rendered as a Suspense shell, not inline HTML`)
  }

  return { html, head: ssrHead.current }
}
