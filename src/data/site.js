/**
 * ============================================================
 *  NKIRUKA + OSITADINMA — SINGLE SOURCE OF TRUTH
 * ============================================================
 *  Every name, date, address, phone number and photo path used
 *  anywhere on the site lives here. Editing this one file updates
 *  the whole website — no component needs to be touched.
 *
 *  Photos live in /public/images/. Any image that is missing simply
 *  falls back to a warm mocha panel, so the site never looks broken.
 * ============================================================
 */

export const couple = {
  bride: 'Nkiruka',
  groom: 'Ositadinma',
  groomShort: 'Osita',
  brideFamily: 'Daughter of Late Engr. Samuel & Mrs. Ekwunife Ashara',
  groomFamily: 'Son of Prof. EJC & Dr (Mrs.) Grace Nwana',
  hashtag: '#OfficiallyKOd',
  monogram: '/monogram.png',
};

// ISO date-time of the reception start. Used by the countdown.
export const weddingDate = '2026-09-26T14:00:00+01:00';

export const dateLabel = {
  long: 'Saturday, the Twenty Sixth of September',
  year: 'Two Thousand and Twenty Six',
  numeric: '26 . 09 . 26',
  short: '26 September 2026',
  city: 'Victoria Island, Lagos',
};

/* ---------------------------------------------------------- */
/*  THE DAY  (from the invitation)                             */
/* ---------------------------------------------------------- */

export const events = [
  {
    id: 'church',
    label: 'The Blessing',
    title: 'Church Ceremony',
    time: '10:30 AM prompt',
    doors: 'Doors open 9:45 AM',
    venue: 'St. Charles Borromeo Catholic Church',
    address: '1004 Estate, Victoria Island, Lagos',
    dress: 'Formal. Champagne tones and shades of brown',
    note: 'Seating closes at 10:20 AM. Please come early; the procession begins on time.',
    map: 'https://www.google.com/maps/search/?api=1&query=St+Charles+Borromeo+Catholic+Church+1004+Estate+Victoria+Island+Lagos',
  },
  {
    id: 'reception',
    label: 'The Celebration',
    title: 'White Wedding Reception',
    time: '2:00 PM till late',
    doors: 'Guest arrival from 1:00 PM',
    venue: 'Queens Park Event Center',
    address:
      'Water Corporation Drive, Trinity Avenue, Off Ligali Ayorinde Street, Victoria Island, Lagos',
    dress: 'Champagne tones and shades of brown',
    note: 'Welcome cocktails, a champagne bell and a voice-note booth are waiting in the foyer.',
    map: 'https://www.google.com/maps/search/?api=1&query=Queens+Park+Event+Center+Water+Corporation+Drive+Victoria+Island+Lagos',
  },
];

/**
 * TOGGLE: the reception run-sheet is not final yet, so the whole "Order of
 * events" section is hidden. Flip this to `true` and it comes straight back on
 * the Wedding Day page, using the list below. Nothing else needs to change.
 */
export const showOrderOfEvents = false;

export const orderOfEvents = [
  {
    time: '1:00 PM',
    what: 'Guests arrive, welcome cocktails, voice notes for the couple',
  },
  { time: '2:00 PM', what: 'Doors open, guests seated' },
  { time: '2:30 PM', what: 'Grand entrance of Mr & Mrs Nwana' },
  { time: '2:45 PM', what: 'Opening prayer and welcome' },
  { time: '3:00 PM', what: 'Lunch is served' },
  { time: '4:00 PM', what: 'Toasts, first dance, cutting of the cake' },
  { time: '5:00 PM', what: 'Dance dance dance' },
  { time: '6:30 PM', what: 'Vote of thanks' },
  { time: '7:00 PM', what: 'Parte after Parte' },
];

export const parking = {
  headline: 'Parking & arrival',
  points: [
    'The parking space is enough for everybody, so drive in to park.',
    'Secure parking is available on-site with attendants on duty from 12:30 PM.',
    'Drop-off is at the main portico; drivers can wait in the designated driver bay.',
    'If you are riding, set your destination pin to the venue gate, not the street name.',
  ],
};

/* ---------------------------------------------------------- */
/*  COLOURS OF THE DAY  (shown on the landing page)            */
/* ---------------------------------------------------------- */

export const palette = {
  intro:
    'Colours of the day: champagne tones and shades of brown. Wear them well and you will fold right into the room. Please leave white to the bride.',
  groups: [
    {
      name: 'Champagne tones',
      swatches: [
        { name: 'Ivory', hex: '#f3ebdf' },
        { name: 'Oat', hex: '#dccdb9' },
        { name: 'Champagne', hex: '#cbb489' },
        { name: 'Gold', hex: '#b08d57' },
      ],
    },
    {
      name: 'Shades of brown',
      swatches: [
        { name: 'Taupe', hex: '#a38f79' },
        { name: 'Mocha', hex: '#6e4a2e' },
        { name: 'Cocoa', hex: '#8a5622' },
        { name: 'Espresso', hex: '#241a15' },
      ],
    },
  ],
  // Short version, shown right under the hero. Adults-only is the part
  // guests most need to see before they start planning.
  shortNote:
    'This is an adults-only celebration, and access is strictly by invitation. Formal dress, please. Kindly avoid white, bright colours and denim.',
};

/* ---------------------------------------------------------- */
/*  BRIDAL PARTY                                               */
/* ---------------------------------------------------------- */

export const bridalParty = [
  {
    group: 'Standing with the bride',
    people: [
      { name: 'Kosi', role: 'Chief Bridesmaid', photo: '/images/kosi.jpg' },
      { name: 'Princess', role: 'Bridesmaid', photo: '/images/gal-07.jpg' },
      { name: 'Joy', role: 'Bridesmaid', photo: '/images/gal-04.jpg' },
      { name: 'Oby', role: 'Bridesmaid', photo: '/images/gal-05.jpg' },
      { name: 'Golden', role: 'Bridesmaid', photo: '/images/gal-08.jpg' },
      { name: 'Victoria', role: 'Bridesmaid', photo: '/images/victoria.jpg' },
    ],
  },
  {
    group: 'Standing with the groom',
    // First names only, in the order the groom asked for. Each man keeps the
    // photograph he already had, so the faces still match the names.
    people: [
      { name: 'Olisa', role: 'Groomsman', photo: '/images/gal-01.jpg' },
      { name: 'Scott', role: 'Groomsman', photo: '/images/gal-02.jpg' },
      { name: 'Kamali', role: 'Groomsman', photo: '/images/gal-03.jpg' },
      { name: 'Ugonna', role: 'Groomsman', photo: '/images/ugonna.jpg' },
    ],
  },
];

/* ---------------------------------------------------------- */
/*  STORY — told as The Sepia Chronicle (Nkiruka's own words)  */
/* ---------------------------------------------------------- */

export const story = {
  masthead: 'The Sepia Chronicle',
  edition: 'Lagos Edition',
  price: 'One love story, freely given',
  volume: 'Vol. I · No. 26',
  dateline: 'Saturday, 26 September 2026',
  headline: 'She Went to Check a Box. She Is Leaving with a Husband.',
  standfirst:
    'It began on the 20th of April, 2025, an ordinary Easter Sunday, a game of charades, and a man who was, frankly, showing off.',
  columns: [
    {
      kicker: 'How they met',
      body: `I met Osita on the 20th of April, 2025. It was one of those really ordinary days; I had just gone to fulfil all righteousness. My friend Kido had told me about a guy she felt I was going to like, and by coincidence I had sworn off dating and wasn\u2019t even looking for anything serious. Kido basically threatened me, I had to come to her Easter Sunday party, and if I didn\u2019t, she was going to stop talking to me (eyes rolling). So I went to check off a box and go home.

My first impression of him was that he was a show-off. They were playing charades at Kido\u2019s, and he had his hand in his pocket, casually using the right, intelligent words to describe the words on his card without breaking a sweat. He ended up with the highest points, but I was definitely still not interested. Ope, who was also in on it, was sitting beside me, and I threatened her not to get up, because I was sure he was going to come and start talking to me.

Anyway, when I stood up to leave, he finally came over to start a conversation. We exchanged numbers, please remember I only did that out of peer pressure.`,
    },
    {
      kicker: 'The months between',
      body: `Talking to Osita after that day was so easy, and I never doubted my place in his life or what his intentions were. It was also a coincidence that his twin sister and I share the same first name, maybe that helped too, I can\u2019t deny it.

He ticks every box of what I\u2019ve always wanted. I honestly can\u2019t wait to be married to him.`,
    },
  ],
  pullquote:
    'I went to check off a box and go home. Reader, I did not go home the same.',
  captions: {
    lead: 'From the pre-wedding shoot, sixteen months in the making.',
    small: 'At home in Lagos, counting down to the day.',
  },
};

/* ---------------------------------------------------------- */
/*  GALLERY                                                    */
/* ---------------------------------------------------------- */

export const gallery = {
  // The gallery is the couple's pre-wedding shoot only. The bridal train and
  // the groom's men have their own page (Our People), so they are not repeated
  // here.
  sets: [
    {
      label: 'The pre-wedding shoot',
      photos: [
        {
          src: '/images/pre-01.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-02.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-03.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-04.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-05.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-06.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-07.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-08.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-09.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-10.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-11.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-12.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-13.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
        {
          src: '/images/pre-14.jpg',
          alt: 'The couple at the pre-wedding shoot',
        },
      ],
    },
  ],
  // Optional film. Leave url empty to hide the player.
  film: {
    url: '',
    poster: '/images/film-poster.jpg',
    label: 'Our pre-wedding film',
  },
};

/* ---------------------------------------------------------- */
/*  GUEST GUIDE                                                */
/* ---------------------------------------------------------- */

export const travel = {
  intro:
    'Most of you are already in Lagos, so this page is short on purpose. It is here for the few flying in, and for anyone who would rather not think about Victoria Island traffic on the day.',
  tips: [
    {
      title: 'Coming from outside Nigeria',
      body: 'Fly into Murtala Muhammed International (LOS). Nigeria is visa-on-arrival for some passports and pre-approval for others, check your embassy early, not in September. Bring your yellow fever card.',
    },
    {
      title: 'Getting to the venue',
      body: 'Both the church and the reception are on Victoria Island. Use Uber, Bolt or a trusted private driver rather than street taxis, and set your pin to the venue gate. Leave a full hour earlier than the map suggests; the Island does not respect estimated arrival times.',
    },
    {
      title: 'Small practical things',
      body: 'Bring a light wrap for the air conditioning, and save the RSVP numbers on this page before you set out. Remember: adults only, no plus-ones, and access is strictly by invitation.',
    },
  ],
};

export const faqs = [
  {
    q: 'What time should I actually arrive?',
    a: 'For church, 9:45 AM. The ceremony starts at 10:30 prompt. For the reception, from 1:00 PM. We are starting on time; please help us make that true.',
  },
  {
    q: 'What is the dress code?',
    a: 'Champagne tones and shades of brown. Ivory, oat, champagne, gold, taupe, mocha, espresso. Formal. Please leave white to the bride, and leave denim at home.',
  },
  {
    q: 'Can I bring my children?',
    a: 'With love, this is an adults-only celebration, so please make arrangements for the little ones and come enjoy the day.',
  },
  {
    q: 'Can I bring a plus-one?',
    a: 'There are no plus-ones. Access is strictly by invitation, and we cater for named guests only, so please do not bring anyone who was not invited. They will not be seated.',
  },
  {
    q: 'Is there parking?',
    a: 'Yes, the parking space is enough for everybody, so drive in to park. Secure on-site parking with attendants from 12:30 PM, plus a driver waiting bay.',
  },
  {
    q: 'Can I take photos?',
    a: 'During the church ceremony, please keep phones down and let our photographers work. From the reception onward, photograph everything.',
  },
  {
    q: 'Where do I post them?',
    a: 'Tag #OfficiallyKOd so we can find every last one.',
  },
  {
    q: 'When must I RSVP by?',
    a: 'Kindly respond by 30 August 2026 so we can confirm your seat and your plate. Every single guest must RSVP separately, in their own name. One response is one seat, so if your invitation names two of you, please send two responses.',
  },
];

export const contacts = [
  {
    name: 'Chidubem',
    role: 'RSVP coordinator',
    phone: '+234 814 031 9163',
    email: '',
  },
  {
    name: 'Kamali',
    role: 'RSVP coordinator',
    phone: '+234 913 459 7819',
    email: '',
  },
];

/* ---------------------------------------------------------- */
/*  RSVP                                                       */
/* ---------------------------------------------------------- */

export const rsvp = {
  deadline: '30 August 2026',
  // Paste a Formspree / Getform / Google Apps Script endpoint here.
  // Leave empty and the form falls back to a pre-filled WhatsApp message.
  endpoint: '',
  whatsapp: '2348140319163', // Chidubem — country code, no plus sign
};

/* ---------------------------------------------------------- */
/*  HERO / PAGE PLATES                                         */
/* ---------------------------------------------------------- */

export const plates = {
  // Home hero. `home` is a wide crop for desktop; `homeMobile` is the full
  // 4:5 frame so nothing is cropped off the couple on a phone.
  // Both now use the bright white-background frames from the shoot, so the
  // names and dates read far more clearly over the top.
  home: '/images/hero-light.jpg',
  homeMobile: '/images/hero-light-mobile.jpg',

  story: '/images/story-small.jpg',
  storySmall: '/images/story-small.jpg',
  // Page-header plates — frames from the couple's pre-wedding shoot.
  day: '/images/pre-12.jpg',
  party: '/images/pre-14.jpg',
  rsvp: '/images/rsvp.jpg',
  gifts: '/images/gifts.jpg',
  // Guest Guide header. The Queens Park venue photograph is gone; this slot now
  // reuses the original home landing background, a couple portrait.
  guide: '/images/hero.jpg',
};
