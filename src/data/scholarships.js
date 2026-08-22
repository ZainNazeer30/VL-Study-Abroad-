// Scholarship list used on the Scholarships page. fullyFunded marks the ones that realistically
// cover both tuition and living costs, since that is what most of our applicants are actually
// looking for. Fully funded ones are listed first.

export const SCHOLARSHIPS = [
  {
    flag: '🇮🇹', country: 'Italy', name: 'DSU regional scholarship', deadline: 'Sep 2026', fullyFunded: true,
    benefit: 'Up to €7,000 a year, a full tuition waiver, and help with housing and meals. For most students who qualify, this covers the year.',
    eligibility: 'Based on family income, with an ISEE under about €27,000. There is no minimum grade.',
  },
  {
    flag: '🇫🇷', country: 'France', name: 'Eiffel Excellence scholarship', deadline: 'Jan 2027', fullyFunded: true,
    benefit: '€1,181 a month plus travel, insurance and cultural activities, enough to live on without a second income.',
    eligibility: 'Under 25 for a Master or under 30 for a PhD, and nominated by the French university.',
  },
  {
    flag: '🇮🇹', country: 'Italy', name: 'Invest Your Talent in Italy', deadline: 'Feb 2027', fullyFunded: true,
    benefit: '€900 a month for nine months plus tuition support for Master students, which covers most living costs in a student city.',
    eligibility: 'Open to citizens of selected countries with strong grades, in fields like engineering, economics or design.',
  },
  {
    flag: '🇮🇹', country: 'Italy', name: 'University merit awards', deadline: 'Varies', fullyFunded: false,
    benefit: 'Fees cut to as low as €200 a year, and some awards add a stipend, though this is usually tuition help rather than full funding.',
    eligibility: 'Strong grades and a solid application. Many universities consider you automatically.',
  },
  {
    flag: '🇫🇷', country: 'France', name: 'Differentiated fee waivers', deadline: 'With your application', fullyFunded: false,
    benefit: 'Brings international tuition down to the EU rate, roughly €170 to €380 a year. This lowers your bill, it does not cover living costs.',
    eligibility: 'Granted by many universities, either automatically or on request.',
  },
  {
    flag: '🇫🇷', country: 'France', name: 'Campus France and embassy grants', deadline: 'Varies by country', fullyFunded: false,
    benefit: 'A monthly stipend along with social security cover. The amount depends on the country you apply from, so we check what applies to you.',
    eligibility: 'Set by each country through the French embassy where you live.',
  },
  {
    flag: '🇫🇷', country: 'France', name: 'Émile Boutmy scholarship (Sciences Po)', deadline: 'With your application', fullyFunded: false,
    benefit: 'A tuition scholarship for non-EU students admitted to Sciences Po, on top of its income-scaled fees. It reduces tuition, not living costs.',
    eligibility: 'Automatically considered when you apply to Sciences Po from outside the EU or EEA.',
  },
]
