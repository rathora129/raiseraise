// Single source of truth for company details and CTAs.
// Only verified information is filled in. Anything not supplied by the
// client stays null and is rendered as a clearly marked pending state.

export const site = {
  name: 'RaiseRaise Elevators',
  legalName: 'Raise Raise Elevators',
  shortName: 'RaiseRaise',
  tagline: 'Elevating every journey with safety.',
  secondaryTagline: 'We lift your trust.',
  description:
    'RaiseRaise Elevators supplies, installs and cares for elevators for residential, commercial and industrial buildings — with a focus on safety, finish and long-term service.',
  url: 'https://raiseraiseelevators.com',
  locale: 'en_IN',

  // Verified from the client's public site (WhatsApp click-to-chat).
  whatsapp: '917827433486',
  whatsappDisplay: '+91 78274 33486',
  // The verified public number is used for both WhatsApp and calls until a
  // dedicated landline is confirmed by the client.
  phone: '+917827433486',
  phoneDisplay: '+91 78274 33486',

  // Awaiting client confirmation — deliberately left empty.
  email: null,
  address: null,
  locality: null,
  region: null,
  postalCode: null,
  country: 'IN',
  mapsUrl: null,
  hours: null,

  social: [],
  founded: null,
  serviceAreas: null,
};

export const whatsappLink = (message) => {
  const text = message || 'Hello RaiseRaise Elevators, I would like to discuss an elevator requirement.';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
};

export const telLink = site.phone ? `tel:${site.phone}` : null;

export const nav = [
  {
    label: 'Elevators',
    href: '/products',
    children: [
      { label: 'Passenger elevators', href: '/products#passenger' },
      { label: 'Home & villa lifts', href: '/products#home' },
      { label: 'Hospital & stretcher', href: '/products#hospital' },
      { label: 'Goods & freight', href: '/products#goods' },
      { label: 'Panoramic & capsule', href: '/products#panoramic' },
      { label: 'All product ranges', href: '/products' },
    ],
  },
  {
    label: 'Interiors',
    href: '/interiors',
    children: [
      { label: '360° cabin explorer', href: '/interiors#explore' },
      { label: 'Design studio', href: '/interiors#studio' },
      { label: 'Finish library', href: '/interiors#finishes' },
    ],
  },
  {
    label: 'Services',
    href: '/installation',
    children: [
      { label: 'Installation & engineering', href: '/installation' },
      { label: 'Maintenance & AMC', href: '/maintenance' },
      { label: 'Repair & breakdown', href: '/repair' },
      { label: 'Modernization', href: '/modernization' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  {
    title: 'Elevators',
    links: [
      { label: 'Passenger', href: '/products#passenger' },
      { label: 'Home & villa', href: '/products#home' },
      { label: 'Hospital', href: '/products#hospital' },
      { label: 'Goods & freight', href: '/products#goods' },
      { label: 'Panoramic', href: '/products#panoramic' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Installation', href: '/installation' },
      { label: 'Maintenance & AMC', href: '/maintenance' },
      { label: 'Repair', href: '/repair' },
      { label: 'Modernization', href: '/modernization' },
      { label: 'Cabin interiors', href: '/interiors' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQs', href: '/#faq' },
    ],
  },
];
