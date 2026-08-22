// One photo, one place.
//
// No photograph on this site is the picture for two different things. A photo can of course show
// up more than once as you move around, because the small card that links to an article shows
// that article's own cover, and that is the article's identity rather than a repeat. What must
// never happen is the same picture being the hero of the home page and also the cover of a
// guide, or the Study in Italy photo turning up again on Study in France.
//
// This checks that, by reading src/data/images.js rather than the finished pages, so it catches
// a mistake the moment you make it:
//
//   node scripts/check-images.mjs
//
// It reports three kinds of problem: the same photograph behind two entries, an entry nothing
// uses, and a page asking for an entry that does not exist.

import { readFileSync } from 'node:fs'
import { readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const imagesFile = readFileSync(join(root, 'src/data/images.js'), 'utf8')

// Every top level entry in the IMAGES object, with the photographs behind it.
const body = imagesFile.slice(imagesFile.indexOf('export const IMAGES = {'))
const entries = []
for (const m of body.matchAll(/^ {2}(\w+):\s*(own\(|\{)([\s\S]*?)(?=^ {2}\w+:|^\})/gm)) {
  const [, key, kind, chunk] = m
  const photos = []
  if (kind.startsWith('own')) {
    photos.push(chunk.match(/^'([^']+)'/)?.[1])
  } else {
    for (const p of chunk.matchAll(/u\('(photo-[\w-]+)'\)/g)) photos.push(p[1])
  }
  entries.push({ key, photos: photos.filter(Boolean) })
}

// Where each entry is used across the source.
const files = []
;(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (['.js', '.jsx'].includes(extname(p))) files.push(p)
  }
})(join(root, 'src'))
const source = files.filter((f) => !f.endsWith('images.js')).map((f) => readFileSync(f, 'utf8')).join('\n')

const problems = []

// 1. The same photograph behind two entries.
const seen = new Map()
for (const { key, photos } of entries) {
  for (const photo of photos) {
    if (seen.has(photo)) problems.push(`"${photo}" is used by both ${seen.get(photo)} and ${key}`)
    else seen.set(photo, key)
  }
}

// 2. Entries nothing uses, and 3. pages asking for entries that do not exist.
const known = new Set(entries.map((e) => e.key))
// Entries are reached two ways: directly, as IMAGES.homeHero, and by name, as the string
// 'italyHero' sitting in countries.js or blog.js. Both count as being used.
const quoted = new Set([...source.matchAll(/'(\w+)'/g)].map((m) => m[1]))
const used = new Set([
  ...[...source.matchAll(/IMAGES\.(\w+)/g)].map((m) => m[1]),
  ...[...quoted].filter((q) => known.has(q)),
])
for (const key of known) if (!used.has(key)) problems.push(`"${key}" is defined but never used on any page`)
for (const key of used) if (!known.has(key)) problems.push(`a page asks for "${key}", which is not in images.js`)

console.log(`${entries.length} image entries, ${seen.size} distinct photographs.`)
if (problems.length) {
  console.log('\nPROBLEMS:')
  for (const p of problems) console.log('  ' + p)
  process.exitCode = 1
} else {
  console.log('Every photograph is the picture for exactly one thing, and every entry is in use.')
}
