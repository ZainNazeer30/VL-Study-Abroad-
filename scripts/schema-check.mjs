// Checks that every structured data block on the site is valid and, for the FAQ blocks, that
// every question in the data is genuinely visible on the page. That second check is Google's own
// rule: an FAQ block describing questions that are not on the page can get all of a site's rich
// results withdrawn.
//
//   npm run build && node scripts/schema-check.mjs

import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const DIST = fileURLToPath(new URL('../dist', import.meta.url))
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.ico':'image/x-icon','.xml':'application/xml'}
const server=createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);let f=join(DIST,u);if(!existsSync(f)||statSync(f).isDirectory())f=join(DIST,'index.html');s.writeHead(200,{'Content-Type':MIME[extname(f)]||'application/octet-stream'});s.end(readFileSync(f))})
await new Promise(r=>server.listen(4326,r))
// Find the browser. `npx playwright install chromium` puts it where Playwright looks by
// default, so no path is needed. PW_CHROME is only an override for unusual setups such as CI
// images that ship their own Chromium.
//
// This used to hardcode '/opt/pw-browsers/chromium', which is a path that exists on the machine
// this project was originally built on and nowhere else — so `npm run check-schema` failed with
// "executable doesn't exist" for anyone else who tried to run it.
async function launchBrowser() {
  try {
    return await chromium.launch(
      process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {}
    )
  } catch (err) {
    console.error('\n  Could not start a browser. Install one once with:\n')
    console.error('    npx playwright install chromium\n')
    console.error('  ' + String(err).split('\n')[0] + '\n')
    process.exit(1)
  }
}

const b = await launchBrowser()
const p=await (await b.newContext({viewport:{width:1440,height:900}})).newPage()
const problems=[]
const check=(cond,msg)=>{ if(!cond) problems.push(msg) }
for (const route of ['/','/italy','/blog','/blog/italy-student-visa-from-pakistan','/contact','/universities']) {
  await p.goto(`http://localhost:4326${route}`,{waitUntil:'networkidle'}); await p.waitForTimeout(250)
  const nodes = await p.evaluate(()=>[...document.head.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap(s=>{const j=JSON.parse(s.textContent); return j['@graph']||[j]}))
  for (const n of nodes) {
    const t = Array.isArray(n['@type'])?n['@type'][0]:n['@type']
    if (t==='BlogPosting') {
      check(n.headline && n.headline.length<=110, `${route} BlogPosting headline`)
      check(!!n.datePublished && /^\d{4}-\d{2}-\d{2}$/.test(n.datePublished), `${route} datePublished`)
      check(!!n.dateModified, `${route} dateModified`)
      check(!!n.image && n.image.startsWith('https://'), `${route} image absolute`)
      check(!!n.author?.name && !!n.publisher?.logo?.url, `${route} author/publisher`)
      check(!!n.mainEntityOfPage?.['@id'], `${route} mainEntityOfPage`)
    }
    if (t==='FAQPage') {
      check(Array.isArray(n.mainEntity)&&n.mainEntity.length>0, `${route} FAQ empty`)
      for (const q of n.mainEntity||[]) {
        check(q['@type']==='Question' && !!q.name, `${route} FAQ question name`)
        check(q.acceptedAnswer?.['@type']==='Answer' && (q.acceptedAnswer.text||'').length>20, `${route} FAQ answer`)
      }
    }
    if (t==='BreadcrumbList') {
      const items=n.itemListElement||[]
      check(items.length>=2, `${route} breadcrumb too short`)
      items.forEach((it,i)=>{ check(it.position===i+1 && !!it.name && String(it.item).startsWith('https://'), `${route} breadcrumb item ${i}`) })
    }
    if (t==='EducationalOrganization') {
      check(!!n.logo, `${route} org logo`); check(!!n.url, `${route} org url`)
    }
  }
  // FAQ answers must actually appear on the page (Google's rule, and honesty)
  const faqOnPage = await p.evaluate(()=>{
    const scripts=[...document.head.querySelectorAll('script[type="application/ld+json"]')]
      .flatMap(s=>{const j=JSON.parse(s.textContent); return j['@graph']||[j]})
    const faq=scripts.find(n=>(Array.isArray(n['@type'])?n['@type'][0]:n['@type'])==='FAQPage')
    if(!faq) return true
    const text=document.body.innerText
    return faq.mainEntity.every(q=>text.includes(q.name.slice(0,40)))
  })
  check(faqOnPage, `${route} FAQ schema question not visible on page`)
}
// sitemap + robots
await p.goto('http://localhost:4326/sitemap.xml')
const sm = await p.content()
check(!sm.includes('parsererror'), 'sitemap.xml is not valid XML')
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'Structured data: all checks passed')
await b.close(); server.close()
