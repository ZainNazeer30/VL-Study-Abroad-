import { useState } from 'react'

// A photo with a safety net.
//
// Pass an image object from src/data/images.js.
//
// For your own photos in public/img the object carries a `srcSet` and a `webpSet`, so the browser
// is handed a list of widths and picks the smallest file that still looks sharp on that screen.
// A phone downloads the 480 pixel wide version, a large desktop the 1800 pixel one. Modern
// browsers take the .webp, which is roughly a third smaller than the same .jpg; older ones fall
// back to the .jpg without anyone noticing.
//
// The photo fades in once it has actually loaded, so a slow connection shows a soft brand
// coloured panel rather than a half drawn image. If the main photo fails, an optional `fallback`
// photo is tried, and if that fails too the panel simply stays. A visitor never sees a browser's
// broken image icon.
//
// `loading="eager"` is for the one photo at the top of a page, which should start downloading
// immediately. Everything else stays lazy, so photos further down the page are only fetched when
// the visitor scrolls near them.
export default function Img({ image, className = '', loading = 'lazy', fetchPriority }) {
  // The photo at the top of a page is the one Chrome measures for Largest Contentful Paint,
  // and LCP is recorded at the moment of paint. Fading it in from opacity-0 means it does not
  // count as painted for half a second — on the exact image the score is about. So the eager
  // (above the fold) image appears instantly; everything below the fold still fades.
  const instant = loading === 'eager'
  const [stage, setStage] = useState(0) // 0 = main photo, 1 = fallback photo, 2 = gave up
  const [loaded, setLoaded] = useState(false)

  if (!image) return null
  const usingFallback = stage === 1
  const src = usingFallback ? image.fallback : image.src
  if (stage >= 2 || !src) {
    return <div className={`${positioning(className)} overflow-hidden bg-[#E7EDF7] ${className}`} />
  }

  const img = (
    <img
      key={stage}
      src={src}
      srcSet={usingFallback ? undefined : image.srcSet}
      sizes={usingFallback ? undefined : image.sizes}
      alt={image.alt || ''}
      loading={loading}
      fetchpriority={fetchPriority}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false)
        setStage((s) => (s === 0 && image.fallback ? 1 : 2))
      }}
      style={image.position ? { objectPosition: image.position } : undefined}
      className={`w-full h-full object-cover ${
        instant ? '' : `transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`
      }`}
    />
  )

  return (
    <div className={`${positioning(className)} overflow-hidden bg-[#E7EDF7] ${className}`}>
      {image.webpSet && !usingFallback ? (
        <picture>
          <source type="image/webp" srcSet={image.webpSet} sizes={image.sizes} />
          {img}
        </picture>
      ) : (
        img
      )}
    </div>
  )
}

// The wrapper normally needs `position: relative` so anything laid over the photo is placed
// against it. But some photos are themselves the layer, stretched behind a section with
// `absolute inset-0`, and in that case adding `relative` as well silently wins in the stylesheet
// and drops the photo back into normal flow, pushing whatever should sit on top of it down the
// page instead. So: only add `relative` when the caller has not already positioned this box.
function positioning(className) {
  return /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className) ? '' : 'relative'
}
