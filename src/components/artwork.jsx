// Illustrated portraits for the success story cards on the Home and About pages.
//
// These are deliberately drawn rather than photographed. The testimonials are real quotes from
// real students, but we do not have their photos, and putting a stranger's stock photo next to a
// named client is the kind of thing a visitor can catch with a reverse image search. An
// illustration reads as a friendly placeholder rather than a false claim about who someone is.
//
// Each avatar is distinct so no two cards look alike, and each matches the gender of the name
// beside it.
//
// TO USE A REAL PHOTO instead, once a student has agreed to appear on the site: put the file in
// src/assets, import it in Home.jsx and About.jsx, and swap that card's <PersonAvatar /> for a
// normal <img> tag.

function Face({ bg, skin = '#E7B98D', children }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full block" role="img" aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill={bg} />
      <circle cx="50" cy="46" r="19" fill={skin} />
      <path d="M18 100 C18 74 34 62 50 62 C66 62 82 74 82 100 Z" fill={skin} />
      {children}
    </svg>
  )
}

// Ayesha K. Long dark hair, headscarf drape, navy top.
export function AyeshaArt({ className }) {
  return (
    <div className={className}>
      <Face bg="#EDF2FD" skin="#E7B98D">
        <path d="M27 46 C27 24 34 14 50 14 C66 14 73 24 73 46 L73 40 C73 30 66 22 50 22 C34 22 27 30 27 40 Z" fill="#B4482E" />
        <path d="M27 40 C22 52 22 78 30 100 L20 100 C16 76 18 52 27 40 Z" fill="#B4482E" />
        <path d="M73 40 C78 52 78 78 70 100 L80 100 C84 76 82 52 73 40 Z" fill="#B4482E" />
        <path d="M18 100 C18 82 30 68 50 68 C70 68 82 82 82 100 Z" fill="#2B5CE6" />
      </Face>
    </div>
  )
}

// Hamza R. Short hair, trimmed beard, green collared shirt.
export function HamzaArt({ className }) {
  return (
    <div className={className}>
      <Face bg="#EDF6F1" skin="#DDA97C">
        <path d="M30 40 C30 24 38 16 50 16 C62 16 70 24 70 40 L70 34 C70 26 62 24 50 24 C38 24 30 26 30 34 Z" fill="#22314D" />
        <path d="M32 52 C32 60 40 66 50 66 C60 66 68 60 68 52 L66 58 C66 62 58 64 50 64 C42 64 34 62 34 58 Z" fill="#22314D" opacity="0.8" />
        <path d="M20 100 C20 80 33 66 50 66 C67 66 80 80 80 100 Z" fill="#2E7D5B" />
        <path d="M42 92 L58 92 L54 100 L46 100 Z" fill="#FBFDFF" />
      </Face>
    </div>
  )
}

// Sana M. Shoulder length wavy hair, gold top.
export function SanaArt({ className }) {
  return (
    <div className={className}>
      <Face bg="#FBF7EC" skin="#E9C39B">
        <path d="M26 44 C24 24 34 12 50 12 C66 12 76 24 74 44 C70 30 62 24 50 24 C38 24 30 30 26 44 Z" fill="#3D2A1E" />
        <path d="M26 40 C22 50 22 58 26 60" stroke="#3D2A1E" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M74 40 C78 50 78 58 74 60" stroke="#3D2A1E" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M20 100 C20 80 33 68 50 68 C67 68 80 80 80 100 Z" fill="#C9A227" />
      </Face>
    </div>
  )
}

export const PEOPLE_ART = {
  ayesha: AyeshaArt,
  hamza: HamzaArt,
  sana: SanaArt,
}

export function PersonAvatar({ person, className }) {
  const Art = PEOPLE_ART[person]
  if (!Art) return null
  return <Art className={className} />
}
