// The build-time render. Only scripts/prerender.mjs imports this; the browser never loads it.
//
// It turns one address into finished HTML, so every page ships with its real content and its own
// title, description and preview picture already in the file. Crawlers that do not run
// JavaScript — WhatsApp, Facebook and LinkedIn among them — read that directly.
//
// renderToPipeableStream rather than renderToString, because the route table loads most pages
// with React.lazy. renderToString would stop at the Suspense boundary and write out the empty
// placeholder; the streaming renderer waits for the real page to arrive first.

import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { PassThrough } from 'node:stream'
import { AppRoutes } from './App.jsx'
import { ssrHead } from './hooks/useSeo.js'

export async function render(url) {
  ssrHead.current = null

  const html = await new Promise((resolve, reject) => {
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

  return { html, head: ssrHead.current }
}
