// Every photo on the site is defined once, right here.
//
// ---------------------------------------------------------------------------------------------
// ONE PHOTO, ONE PLACE
//
// No photograph appears twice anywhere on the site. Each entry below is used on exactly one page,
// in exactly one spot. That is a deliberate rule, and worth keeping when you add pages: a visitor
// who sees the same picture on the home page and again on an article notices immediately, and it
// reads as a site that ran out of material.
//
// ---------------------------------------------------------------------------------------------
// TWO KINDS OF PHOTO
//
// 1. YOUR OWN PHOTOS, in `public/img`. Each one was saved at four widths (640 to 2000 pixels)
//    in two formats, .webp for modern browsers and .jpg as a backup. The browser picks the
//    smallest file that still looks sharp on the visitor's screen, so a student on a phone in
//    Lahore downloads roughly a tenth of what a desktop visitor does. That matters for Google:
//    how fast a page loads on a phone is part of how it ranks you.
//
//    Several are saved as a crop rather than the full frame, cut to the exact shape of the box
//    they sit in. That way the browser never has to chop the middle out of a picture to make it
//    fit, and you choose what stays in frame. Those are `hero-students`, `graduate-campus-path`,
//    `band-sunset`, `life-reading-room` and `life-study-desk`.
//
// 2. UNSPLASH PHOTOS, for the places where a picture has to actually be Italy or France, and for
//    six of the nine article covers. Your own photographs cover the rest. These are pinned to an
//    exact photo ID so the service always returns the same image, and every ID here has been
//    loaded and checked.
//
// ---------------------------------------------------------------------------------------------
// TO SWAP IN A PHOTO OF YOUR OWN
//
//   1. Save your photo as a .jpg.
//   2. Drop it into `public/img`, for example `public/img/my-students.jpg`.
//   3. Change the entry below to:  { src: '/img/my-students.jpg', alt: 'What it shows' }
//
// One large file works fine; the four widths are an optimisation, not a requirement. Real photos
// of your own students, with their permission, will always beat stock photography for trust.
//
// ALT TEXT: the `alt` line describes the picture for search engines and for anyone using a
// screen reader. Keep it a plain description of what is in the photo.
// ---------------------------------------------------------------------------------------------

const WIDTHS = [480, 768, 1200, 1800]
const WIDE = [640, 1024, 1600, 2000]

// Builds the set of sizes for one of your own photos in public/img.
function own(slug, alt, { widths = WIDTHS, sizes = '100vw', position = 'center' } = {}) {
  return {
    src: `/img/${slug}-${widths[widths.length - 1]}.jpg`,
    srcSet: widths.map((w) => `/img/${slug}-${w}.jpg ${w}w`).join(', '),
    webpSet: widths.map((w) => `/img/${slug}-${w}.webp ${w}w`).join(', '),
    sizes,
    position,
    alt,
  }
}

// Asks Unsplash for a wide landscape crop at a fixed photo ID.
const u = (id, w = 1600, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const IMAGES = {
  // -------------------------------------------------------------------------------------------
  // HOME PAGE
  // -------------------------------------------------------------------------------------------

  // The first thing anyone sees, and the most important picture on the site.
  //
  // It is three graduates taking a selfie: faces, a smile, daylight, people you can imagine
  // being. That is the register the established consultancies use on their own front pages,
  // because a student choosing who to trust with two years of their life responds to a person,
  // not to a ceremony photographed from the back of a hall.
  homeHero: own('hero-students', 'Three graduates in caps and gowns smiling and taking a selfie together on campus', {
    widths: WIDE,
    sizes: '(min-width: 1024px) 50vw, 100vw',
  }),

  // The two country cards. These have to read as Italy and France in a second, so they are the
  // one place where a well known view beats a campus.
  homeItaly: {
    src: u('photo-1578262634053-eead874052be'),
    fallback: u('photo-1555992828-ca4dbe41d294'),
    alt: 'The historic rooftops and domes of Florence, Italy, seen from above',
  },
  homeFrance: {
    src: u('photo-1526821799652-2dc51675628e'),
    fallback: u('photo-1524396309943-e03f5249f002'),
    alt: 'Paris from the air at golden hour with the Eiffel Tower and Les Invalides',
  },

  // Wide band above the success stories. Caps in the air at sunset over a city skyline: the
  // moment the whole process is for.
  homeStories: own('band-sunset', 'Graduates throwing their caps into the air at sunset with a city skyline behind them', {
    widths: WIDE,
    sizes: '100vw',
  }),

  // -------------------------------------------------------------------------------------------
  // STUDY IN ITALY AND STUDY IN FRANCE
  // -------------------------------------------------------------------------------------------

  italyHero: {
    src: u('photo-1745323193093-763059f1eb8c'),
    fallback: u('photo-1510758588288-aa8cf9445f5b'),
    alt: 'A tree lined path leading up to a university building in Italy',
  },
  franceHero: {
    src: u('photo-1531686669028-c55493110d74'),
    fallback: u('photo-1755812970802-20776879c785'),
    alt: 'The Université de Paris building seen in full from across the street',
  },

  // Both of these sit in a short, wide box beside the Student life text, so both are cut to 1.8
  // to 1 before they get here. The second one started life as a tall portrait: left as it was,
  // the browser sliced a strip out of the middle and you saw a chandelier and a blurred desk
  // instead of any students.
  italyLife: own('life-reading-room', 'Students working at long desks in a university reading room', {
    sizes: '(min-width: 1024px) 50vw, 100vw',
  }),
  franceLife: own('life-study-desk', 'Students working at library desks under brass reading lamps', {
    sizes: '(min-width: 1024px) 50vw, 100vw',
  }),

  // -------------------------------------------------------------------------------------------
  // UNIVERSITIES AND ABOUT
  // -------------------------------------------------------------------------------------------

  // Sits in the box beside the heading, the same layout the two country pages use. Cut to
  // exactly 16:10, which is the shape of that box, so nothing is trimmed off the sides at any
  // screen size. A graduate rather than a building, deliberately: this is the page where a
  // student is picking a university, and the picture should show the thing they are picking it
  // for. See LICENCES-AND-CONTENT.md for the licence.
  universitiesHero: own('graduate-campus-path', 'A graduate in a red cap and gown standing on a path between university buildings on a green campus', {
    widths: WIDE,
    sizes: '(min-width: 1024px) 50vw, 100vw',
  }),

  aboutTeam: own('graduates-raising-caps', 'International graduates in gowns raising their caps outside their university', {
    sizes: '(min-width: 1024px) 50vw, 100vw',
  }),

  // -------------------------------------------------------------------------------------------
  // ARTICLE COVERS, one per guide
  // -------------------------------------------------------------------------------------------

  blogApply: {
    src: u('photo-1741637335289-c99652d3155f'),
    fallback: u('photo-1616428394230-ba242d33e3ba'),
    alt: 'Students walking past a university building on campus',
  },
  blogAttestation: {
    src: u('photo-1683319598210-d70486f2f996'),
    fallback: u('photo-1501503069356-3c6b82a17d89'),
    alt: 'Students working through papers at tables in a university library',
  },
  blogScholarships: own('graduation-caps-throw', 'Graduates celebrating and throwing their caps outside their university', {
    sizes: '(min-width: 768px) 50vw, 100vw',
  }),
  blogItalyVisa: {
    src: u('photo-1698153870091-5f2891c73362'),
    fallback: u('photo-1704151101872-6888b508cf7c'),
    alt: 'A university building with stone columns and a gated entrance',
  },
  blogFranceVisa: {
    src: u('photo-1774526993562-abc3f2afac0f'),
    fallback: u('photo-1650211233816-53d4e13a8817'),
    alt: 'The Sorbonne in Paris with French flags above the entrance',
  },
  blogCost: own('museum-hall', 'The great hall of a European museum full of visitors', {
    sizes: '(min-width: 768px) 50vw, 100vw',
    position: 'center 40%',
  }),
  blogIelts: {
    src: u('photo-1758270704787-615782711641'),
    fallback: u('photo-1758270704384-9df36d94a29d'),
    alt: 'Students talking and studying together in a university lecture hall',
  },
  blogChoosing: own('campus-courtyard-gothic', 'The stone courtyard and clock tower of a European university', {
    sizes: '(min-width: 768px) 50vw, 100vw',
  }),
  blogDeadlines: {
    src: u('photo-1776536025707-9a0a915f85a5'),
    fallback: u('photo-1567760855784-589f09ed5dc6'),
    alt: 'An aerial view of a whole university campus',
  },
}

// ---------------------------------------------------------------------------------------------
// A PHOTO YOU SENT THAT IS NOT ON A PAGE
//
//   /img/students-city-walk-*.jpg   three students walking across a bridge over a city river
//
// It is a good photograph, but the American flag and the New York skyline are right in the middle
// of it, and this site is about Italy and France. It is kept rather than deleted, so if you want
// it somewhere it is one line away. Add this to the list above and use it like the others:
//
//   cityWalk: own('students-city-walk', 'Three students walking together across a city bridge'),
//
// Remember the rule at the top of the file: if you put it on a page, take something else off, so
// that no photograph is used twice.
// ---------------------------------------------------------------------------------------------
