import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui'
import { CONTACT, BRAND } from '../data/site'
import { readChoice, saveChoice, clearChoice, applyConsent } from '../lib/consent'
import { useSeo, graph } from '../hooks/useSeo'

// ---------------------------------------------------------------------------------------------
// The two pages every site that collects a phone number should have, and most Pakistani
// consultancy sites do not.
//
// The privacy page exists because your forms ask for a name, an email, a phone number and
// someone's academic history. That is personal data, and once a student in Europe or a browser
// privacy check looks at your site, "what happens to my details" is a fair question with a real
// answer. Saying it plainly costs nothing and it is one of the trust signals Google's own quality
// guidelines describe.
//
// The terms page exists to say the thing that protects you: you give guidance, you do not decide
// visas, and no consultant on earth can guarantee one. Anybody who does is either lying or about
// to disappoint somebody. Writing it down is better for you than leaving it unsaid.
//
// EDIT THE TEXT BELOW to match how you actually work. It is written to be accurate for the site
// as it stands, but it is not legal advice, and if you take on staff, start storing files or work
// with partners abroad it is worth having a lawyer read it once.
// ---------------------------------------------------------------------------------------------

// Month and year only. A policy dated to the day looks like it was generated on the day, and
// nothing in here changes often enough for a date that precise to mean anything.
const LAST_UPDATED = 'April 2026'

export default function Legal({ which }) {
  const page = which === 'terms' ? TERMS : PRIVACY

  useSeo(page.title, page.description, {
    path: page.path,
    jsonLd: graph(
      { '@type': 'WebPage', name: page.title, description: page.description }
    ),
  })

  return (
    <div>
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-5 lg:pt-12 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:max-w-3xl">
          <h1 className="font-display font-bold text-[26px] sm:text-[32px] text-navy m-0 mb-2">{page.title}</h1>
          <p className="text-[13px] text-mist m-0">Last updated {LAST_UPDATED}</p>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-10 lg:pb-16">
        <Container className="lg:max-w-3xl">
          {page.sections.map((s, i) => (
            <div key={i} className="mb-6">
              <h2 className="font-display font-semibold text-[18px] sm:text-[20px] text-navy m-0 mb-2.5">{s.h}</h2>
              {s.p?.map((para, j) => (
                <p key={j} className="text-[14.5px] leading-[1.75] text-ink m-0 mb-3">
                  {para}
                </p>
              ))}
              {s.ul && (
                <ul className="m-0 mb-3 pl-0 list-none flex flex-col gap-2">
                  {s.ul.map((li, j) => (
                    <li key={j} className="flex gap-2.5 text-[14.5px] leading-[1.7] text-ink">
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-royal shrink-0" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
              {/* Paragraphs that belong after the list rather than before it. */}
              {s.p2?.map((para, j) => (
                <p key={j} className="text-[14.5px] leading-[1.75] text-ink m-0 mb-3">
                  {para}
                </p>
              ))}
            </div>
          ))}

          {/* A policy that says "you can change your mind" has to give you a way to do it. */}
          {which === 'privacy' && <ConsentControl />}

          <div className="rounded-[16px] border border-[#E3EBF8] bg-[#F4F8FE] p-5">
            <h2 className="font-display font-semibold text-[16px] text-navy m-0 mb-1.5">Questions about this page</h2>
            <p className="text-[14px] leading-relaxed m-0 mb-2">
              Email{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-royal font-medium">
                {CONTACT.email}
              </a>{' '}
              or message us on{' '}
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="text-royal font-medium">
                WhatsApp
              </a>
              . We answer every message about data or fees personally.
            </p>
            <Link to="/contact" className="text-[13.5px] font-semibold text-royal">
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}

const PRIVACY = {
  title: 'Privacy Policy',
  path: '/privacy',
  description:
    'What VL Study Abroad Consultants collects when you fill in a form, what we do with it, how long we keep it and how to have it deleted.',
  sections: [
    {
      h: 'The short version',
      p: [
        `${BRAND.fullName} collects the details you type into a form here so that a counsellor can write back to you. That is the whole purpose. We do not sell your details, we do not pass them to anyone who is not working on your application, and if you ask us to delete them, we delete them.`,
      ],
    },
    {
      h: 'What we collect',
      p: ['Only what you type in. Depending on which form you used, that is:'],
      ul: [
        'Your name, email address and phone or WhatsApp number.',
        'Your current qualification, and the country, intake and programme you have in mind.',
        'Whatever you choose to write in a message or notes box.',
        'If you booked a call, the day and time you picked.',
      ],
    },
    {
      h: 'Cookies and how we measure the site',
      p: [
        'The first time you open the site we ask whether we may measure how it gets used. Nothing is stored before you answer, and nothing is stored at all if you say no. The site behaves exactly the same either way.',
        'If you say yes, we use Google Analytics. It sets a cookie and records which pages you open, roughly how long you stay, the rough area you are in (worked out from your IP address, which is shortened before it is stored) and what device and browser you are on. We look at it for one reason: to see which pages are actually helping students, so we know what to write more of.',
        'Your answer is saved in your browser so you are not asked again on every visit. You can change it whenever you like, using the buttons at the bottom of this page. Clearing your browser data clears it too, and you will simply be asked again next time.',
        'We do not run ads, we do not build a profile of you, and we do not share anything with advertisers. The advertising and personalisation features in Google Analytics are switched off.',
      ],
    },
    {
      h: 'What we never collect',
      ul: [
        'We never ask for your passport number, CNIC, bank details or card details through this website.',
        'There are no advertising trackers, retargeting pixels or profiling cookies anywhere on the site.',
        'If you say no to the measurement above and do not send a form, we hold nothing at all about your visit.',
      ],
      p: [
        'One line worth reading twice. If somebody contacts you claiming to be us and asks for a bank transfer or a card number through a web form, it is not us. Call the number on the contact page before you pay anybody anything.',
      ],
    },
    {
      h: 'Where it goes, and who else sees it',
      p: [
        'When you send a form it arrives as an email in our own inbox, a counsellor reads it and replies. It stays in that inbox, and for students who go on to become clients, in our own working notes for the application. We work entirely online and keep no paper files, so there is no filing cabinet in an office somewhere with your documents in it.',
        'We do not sell your details and we do not hand them to other consultancies, agents or lead buying services. If your information needs to reach a university, a scholarship body or an embassy, that happens only for a student who has asked us to make that application, and it goes to that institution and nowhere else.',
      ],
      ul: [
        'Our website host, which serves these pages and runs the small program that emails your form to us.',
        'Google, which carries and stores that email in Gmail, and Google Analytics if you agreed to the measurement above.',
        'WhatsApp, owned by Meta, if you choose to message us there. That conversation is covered by WhatsApp\u2019s own privacy terms rather than ours.',
      ],
      p2: [
        'Some of these companies are based outside Pakistan, so your details may sit on servers in other countries, including the United States and the European Union.',
      ],
    },
    {
      h: 'How long we keep it',
      p: [
        'If you enquire and then decide not to go ahead, we keep the enquiry for as long as it is still useful to you. Students often come back a year later for the next intake. Ask us to delete it at any point and we will.',
        'If you become a client, we keep the records tied to your application while we are working on it and for a reasonable period afterwards, because a question about a visa or an enrolment can turn up months later.',
      ],
    },
    {
      h: 'Your choices',
      ul: [
        'Ask what we hold about you and we will tell you.',
        'Ask us to correct anything that is wrong.',
        'Ask us to delete your details and we will, unless we are in the middle of an application you asked us to run.',
        'Ask us to stop contacting you and we stop.',
        'Ask for a copy of what you gave us, in a form you can pass to someone else.',
        'Change your mind about the measurement cookie whenever you like, using the buttons at the bottom of this page.',
      ],
      p: [
        'Email us and say what you want. There is no form to fill in for this. We will not ask you to prove anything beyond enough for us to be sure it is really you, and we answer within 30 days, usually much sooner.',
        'If you are in the European Union or the United Kingdom, the law there gives you these rights directly, and you can complain to your national data protection authority if you think we have handled your details badly. We would far rather you told us first, so we can put it right.',
      ],
    },
    {
      h: 'Photographs on this site',
      p: [
        'The photographs of Umer and Kashan on the About page are really them. The quotes on the success story cards come from students we have worked with, but the portraits beside those quotes are illustrations rather than photographs, so no student is identifiable from a picture they never agreed to. If a student does agree to appear with their real name and photograph, we ask them in writing first, and they can change their mind at any time.',
      ],
    },
    {
      h: 'Children',
      p: [
        'This site is for students applying to university. If you are under 18, go through the enquiry with a parent or guardian. They will need to be part of the funding and the visa file anyway.',
      ],
    },
    {
      h: 'Changes',
      p: [
        'If this policy changes we update the date at the top of the page. This is a plain description of how we actually work rather than a document drafted by a lawyer, and it is not legal advice.',
      ],
    },
  ],
}

const TERMS = {
  title: 'Terms of Use',
  path: '/terms',
  description:
    'The terms for using the VL Study Abroad Consultants website: what our guidance is and is not, no guarantee of admission or visa, and how fees are agreed.',
  sections: [
    {
      h: 'What this website is',
      p: [
        `This site describes what ${BRAND.fullName} does and gives general guidance to students applying to universities in Italy and France from Pakistan. Reading it does not put you under contract with us. That happens separately and in writing, when you engage us for a specific piece of work.`,
      ],
    },
    {
      h: 'Guidance, not a decision',
      p: [
        'Nothing here is legal or immigration advice, and we are not a law firm. Universities decide admissions. Embassies and consulates decide visas. Awarding bodies decide scholarships. We prepare your file, advise you and represent you as well as we can, and none of that lets us decide the outcome.',
        'So we do not guarantee admission, a scholarship or a visa, and we would ask you to be careful with any consultant who does.',
      ],
    },
    {
      h: 'How we work with you',
      p: [
        'We operate online. Consultations happen by call, video or WhatsApp, and documents are shared and reviewed digitally. There is no office to visit and no walk in service. That is what lets us charge the same fee to a student in Karachi as to one in Gilgit.',
        'It also means you should be sure you are talking to us. Our number and email address are on the contact page. A message from any other number, or an offer made in our name by somebody else, is not us.',
      ],
    },
    {
      h: 'Accuracy and dates',
      p: [
        'Fees, deadlines, scholarship amounts and visa requirements change, sometimes in the middle of an application cycle. We keep these pages as current as we can and mark when each guide was last updated. Even so, before you make a decision based on a figure here, check it against the university, the embassy or the awarding body for your own intake year. Where a page names an amount, treat it as a guide rather than a promise.',
      ],
    },
    {
      h: 'Fees and refunds',
      p: [
        'What we charge, what it covers and when it is payable are agreed with you directly and in writing before any paid work begins, along with where you stand on refunds. Nothing is charged through this website, and we will never ask for card details or a bank transfer through a web form.',
      ],
    },
    {
      h: 'What we ask of you',
      ul: [
        'Give us accurate information and genuine documents. We will not submit anything we believe to be false, and doing so puts your own future travel at far more risk than it puts ours.',
        'Meet the deadlines we give you. Most of them belong to somebody else and cannot be moved.',
        'Tell us quickly if your circumstances, your funding or your plans change.',
      ],
    },
    {
      h: 'Other websites',
      p: [
        'We link to university, government and embassy pages so you can check things at the source. We do not control those sites and are not responsible for what is on them, though we would rather you checked them than took our word for it.',
      ],
    },
    {
      h: 'The content on this site',
      p: [
        'The text, the guides and the design here are our own work. Read it, print it and share the links, all of that is welcome. Please do not republish whole articles as your own. A link back is always fine.',
      ],
    },
    {
      h: 'Law',
      p: [
        'These terms are governed by the law of Pakistan. If anything here does not match what we agreed with you in writing for your own case, the written agreement is what counts.',
      ],
    },
  ],
}

// Lets a visitor see and change the analytics choice they made in the banner. Required in
// substance by the EU and UK rules, withdrawing consent has to be as easy as giving it, and
// it is the part most sites skip.
function ConsentControl() {
  const [choice, setChoice] = useState(() => readChoice())

  const set = (value) => {
    saveChoice(value)
    applyConsent(value === 'accepted')
    setChoice(value)
  }
  const reset = () => {
    clearChoice()
    setChoice(null)
  }

  const label =
    choice === 'accepted'
      ? 'You have allowed us to measure how the site is used.'
      : choice === 'declined'
        ? 'You have asked us not to measure how the site is used. Nothing is being stored.'
        : 'You have not been asked yet, so nothing is being stored.'

  return (
    <div className="rounded-[16px] border border-[#E3EBF8] bg-white p-5 mb-5">
      <h2 className="font-display font-semibold text-[16px] text-navy m-0 mb-1.5">Your cookie choice</h2>
      <p role="status" aria-live="polite" className="text-[14px] leading-relaxed text-ink m-0 mb-3">
        {label}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {choice !== 'accepted' && (
          <button
            type="button"
            onClick={() => set('accepted')}
            className="bg-royal text-white font-display font-semibold text-[13.5px] px-5 py-2.5 rounded-[11px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            Allow measurement
          </button>
        )}
        {choice !== 'declined' && (
          <button
            type="button"
            onClick={() => set('declined')}
            className="border-[1.5px] border-[#D6DEEC] bg-white text-navy font-display font-semibold text-[13.5px] px-5 py-2.5 rounded-[11px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            Turn measurement off
          </button>
        )}
        {choice && (
          <button
            type="button"
            onClick={reset}
            className="text-royal font-display font-semibold text-[13.5px] px-2 py-2.5 cursor-pointer underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            Ask me again
          </button>
        )}
      </div>
    </div>
  )
}
