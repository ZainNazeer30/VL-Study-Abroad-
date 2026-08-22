import { useState } from 'react'

// A photo with a safety net.
//
// Pass an image object from src/data/images.js: { src, fallback, alt }.
//
// The photo fades in once it has actually loaded, so a slow connection shows a soft brand
// coloured panel rather than a half drawn image. If the main photo fails, the fallback photo is
// tried. If that fails too, the panel simply stays, which looks deliberate. A visitor never sees
// a browser's broken image icon.
export default function Img({ image, className = '', loading = 'lazy' }) {
  const [stage, setStage] = useState(0) // 0 = main photo, 1 = fallback photo, 2 = gave up
  const [loaded, setLoaded] = useState(false)

  if (!image) return null
  const src = stage === 0 ? image.src : image.fallback

  return (
    <div className={`relative overflow-hidden bg-[#E7EDF7] ${className}`}>
      {stage < 2 && src && (
        <img
          key={stage}
          src={src}
          alt={image.alt || ''}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false)
            setStage((s) => (s === 0 && image.fallback ? 1 : 2))
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
