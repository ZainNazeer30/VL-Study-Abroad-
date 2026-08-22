// Every photo on the site is defined once, right here, and each one is used a single time.
//
// HOW THE PICTURES ARE CHOSEN
//
// The two cards on the Home page ("Pick where you want to study") show a wide view of a famous
// historical place, Florence for Italy and Paris for France. That section asks the visitor to
// choose a country, so the picture has to say "Italy" or "France" in a second.
//
// Everywhere else the pictures are institutional: universities, campuses, lecture halls and
// libraries. This is a study abroad consultancy, not a travel agency. Both country page heroes
// are long views showing a whole building with its grounds, not a close crop of a wall.
//
// These are real photographs from Unsplash, free for commercial use, referenced by their exact
// photo ID rather than by keyword search. That matters: an earlier version searched by keyword
// ("paris,street") and the service returned whatever matched, which is how a graffiti van ended
// up on the Study in France page. A fixed ID always returns the same photograph.
//
// Each entry has a `fallback` too, tried automatically if the main photo fails to load, so a
// visitor never sees a broken image icon.
//
// ---------------------------------------------------------------------------------------------
// HOW TO SWAP ANY PICTURE YOURSELF, IN ONE LINE
//
// You can see these photos and can judge them far better than a written description can. If one
// is not right, open it in your browser to look at it first:
//
//     https://images.unsplash.com/photo-PASTE-THE-ID-HERE?w=1200
//
// then paste the ID you prefer into the matching `src` below. A list of tested alternates for
// each slot is at the bottom of this file, all confirmed to load.
//
// To use your OWN photo instead (best option once you have them, for example real photos of the
// campuses your students are on now):
//   1. Put the file in src/assets, for example src/assets/bologna-campus.jpg
//   2. At the top of this file add:  import bologna from '../assets/bologna-campus.jpg'
//   3. Set  src: bologna  on the matching entry below.
// ---------------------------------------------------------------------------------------------

// Asks Unsplash for a wide landscape crop. The width and height matter: every picture sits in a
// short, wide box, so requesting a 16:9 image lets Unsplash choose the crop instead of the
// browser chopping the middle out of a tall photo, which is what made earlier versions look
// zoomed in.
const u = (id, w = 1600, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const IMAGES = {
  // Home page hero. Students on a university campus.
  homeHero: {
    src: u('photo-1741637335289-c99652d3155f'),
    fallback: u('photo-1616428394230-ba242d33e3ba'),
    alt: 'Students walking past a university building on campus',
  },

  // Home page, Study in Italy card. Florence from above.
  homeItaly: {
    src: u('photo-1578262634053-eead874052be'),
    fallback: u('photo-1555992828-ca4dbe41d294'),
    alt: 'A view over the historic rooftops and domes of Florence, Italy',
  },

  // Home page, Study in France card. Paris from the air.
  homeFrance: {
    src: u('photo-1526821799652-2dc51675628e'),
    fallback: u('photo-1524396309943-e03f5249f002'),
    alt: 'An aerial view of Paris with the Eiffel Tower and Les Invalides at golden hour',
  },

  // Study in Italy hero. A long view down a path to a university building.
  italyHero: {
    src: u('photo-1745323193093-763059f1eb8c'),
    fallback: u('photo-1510758588288-aa8cf9445f5b'),
    alt: 'A tree lined path leading up to a university building',
  },

  // Study in Italy, student life. A university lecture hall.
  italyLife: {
    src: u('photo-1758270704787-615782711641'),
    fallback: u('photo-1758270704384-9df36d94a29d'),
    alt: 'Students talking and studying together in a university lecture hall',
  },

  // Study in France hero. The whole Université de Paris building.
  franceHero: {
    src: u('photo-1531686669028-c55493110d74'),
    fallback: u('photo-1755812970802-20776879c785'),
    alt: 'The Université de Paris building seen in full from across the street',
  },

  // Study in France, student life. A university library.
  franceLife: {
    src: u('photo-1683319598210-d70486f2f996'),
    fallback: u('photo-1501503069356-3c6b82a17d89'),
    alt: 'Students working at tables in a university library',
  },
}

// ---------------------------------------------------------------------------------------------
// TESTED ALTERNATES
//
// Every ID below loads correctly. Preview one at
// https://images.unsplash.com/photo-THE-ID?w=1200 and, if you prefer it, paste it into the
// matching `src` above. The short note is what the photographer described.
//
// homeItaly (a wide view that says "Italy")
//   photo-1555992828-ca4dbe41d294    aerial view of the Colosseum, Rome
//   photo-1567760855784-589f09ed5dc6 the Duomo cathedral, Milan
//   photo-1529154036614-a60975f5c760 the Trevi Fountain in a sunlit square, Rome
//
// homeFrance (a wide view that says "France")
//   photo-1524396309943-e03f5249f002 aerial photograph of the Eiffel Tower
//   photo-1511739001486-6bfe10ce785f the Eiffel Tower during the day
//   photo-1439393161192-32360eb753f1 the Eiffel Tower, Paris
//
// italyHero / franceHero (universities, long views)
//   photo-1531686669028-c55493110d74 the Université de Paris building, whole facade
//   photo-1755812970802-20776879c785 ornate university building with a dome and a fountain
//   photo-1774526993562-abc3f2afac0f the Sorbonne with French flags, the name readable in stone
//   photo-1650211233816-53d4e13a8817 a tall university building with a flag, seen from a distance
//   photo-1510758588288-aa8cf9445f5b aerial view of campus buildings and green fields
//   photo-1776536025707-9a0a915f85a5 aerial view of a whole campus
//   photo-1698153870091-5f2891c73362 a university building with columns and a gated entrance
//   photo-1704151101872-6888b508cf7c an arcade of stone arches with a lawn (closer crop)
//
// italyLife / franceLife (students, interiors)
//   photo-1758270704384-9df36d94a29d students listening in a lecture hall
//   photo-1501503069356-3c6b82a17d89 a group of people inside a library
//   photo-1683319598210-d70486f2f996 a library with people working at tables
// ---------------------------------------------------------------------------------------------
