export const products = [
  {
    id: 'passenger',
    index: '01',
    name: 'Passenger elevators',
    kicker: 'Everyday movement, composed',
    summary:
      'Smooth, quiet vertical transport for apartment buildings, offices and hotels — configured around traffic, floor count and interior intent.',
    image: '/images/cabins/passenger-cabin.jpg',
    imageAlt: 'Concept render of a luxury passenger elevator cabin with walnut and brushed steel finishes',
    applications: ['Apartments', 'Offices', 'Hotels', 'Mixed-use'],
    options: ['Machine-room-less or traction configuration', 'Automatic centre-opening doors', 'Cabin finish and lighting programme', 'Display, voice and accessibility options'],
    note: 'Capacity, speed and shaft dimensions are confirmed after a site assessment.',
  },
  {
    id: 'home',
    index: '02',
    name: 'Home & villa lifts',
    kicker: 'Space-conscious, quietly engineered',
    summary:
      'Compact lifts for private homes and villas, planned around stairwells, existing walls and the way a household actually moves.',
    image: '/images/cabins/home-lift.jpg',
    imageAlt: 'Concept render of a glass home lift beside a travertine staircase in a villa',
    applications: ['Villas', 'Private homes', 'Duplexes', 'Renovations'],
    options: ['Compact footprints', 'Glass or solid shaft enclosures', 'Low-noise drive options', 'Accessible car controls'],
    note: 'Shaft availability and structural requirements are assessed before recommending a configuration.',
  },
  {
    id: 'hospital',
    index: '03',
    name: 'Hospital & stretcher',
    kicker: 'Calm, hygienic, dependable',
    summary:
      'Wide, level-access cabins for healthcare buildings, designed for stretchers, wheelchairs, staff traffic and easy cleaning.',
    image: '/images/cabins/hospital-cabin.jpg',
    imageAlt: 'Concept render of a stainless steel hospital elevator cabin with continuous handrails',
    applications: ['Hospitals', 'Clinics', 'Care homes', 'Diagnostic centres'],
    options: ['Stretcher-compatible car sizes', 'Continuous handrails', 'Hygienic wall and floor finishes', 'Priority and attendant controls'],
    note: 'Clinical requirements and traffic patterns are reviewed with the facility team.',
  },
  {
    id: 'goods',
    index: '04',
    name: 'Goods & freight',
    kicker: 'Built for the working day',
    summary:
      'Heavy-duty cars and wide entrances for material movement in warehouses, factories and back-of-house areas.',
    image: '/images/cabins/goods-cabin.jpg',
    imageAlt: 'Concept render of a freight elevator with protective bumper rails and a steel floor',
    applications: ['Warehouses', 'Factories', 'Retail back-of-house', 'Logistics'],
    options: ['Protective car linings', 'Wide power doors', 'Reinforced flooring', 'Load-specific configuration'],
    note: 'Load ratings and duty cycle are specified with the site engineer.',
  },
  {
    id: 'commercial',
    index: '05',
    name: 'Commercial elevators',
    kicker: 'Traffic, handled gracefully',
    summary:
      'Higher-traffic solutions for office towers, retail and hospitality, with an emphasis on response time and finish durability.',
    image: '/images/spaces/lobby-hero.jpg',
    imageAlt: 'Concept render of a dark stone elevator lobby with brushed metal doors and emerald light',
    applications: ['Office towers', 'Retail', 'Hotels', 'Institutions'],
    options: ['Group control options', 'High-traffic door systems', 'Durable architectural finishes', 'Destination display integration'],
    note: 'Traffic analysis and group control are scoped per building.',
  },
  {
    id: 'panoramic',
    index: '06',
    name: 'Panoramic & capsule',
    kicker: 'A view, framed in glass',
    summary:
      'Glass-walled and capsule lifts that add presence to atriums, facades and feature spaces while keeping the ride comfortable.',
    image: '/images/cabins/panoramic-glass.jpg',
    imageAlt: 'Concept render of a curved panoramic glass elevator on a tower exterior above a city',
    applications: ['Atriums', 'Facades', 'Hotels', 'Showrooms'],
    options: ['Curved or flat glass', 'Slim frame profiles', 'Custom lighting', 'Interior finish pairing'],
    note: 'Structural support and glass specification are confirmed with the project engineer.',
  },
  {
    id: 'automobile',
    index: '07',
    name: 'Automobile lifts',
    kicker: 'Vertical parking, quietly solved',
    summary:
      'Car lifts for showrooms, residences and constrained sites where driving space is limited.',
    image: '/images/spaces/doors-opening.jpg',
    imageAlt: 'Concept render of bronze elevator doors opening into an illuminated cabin',
    applications: ['Showrooms', 'Private garages', 'Dealerships', 'Constrained sites'],
    options: ['Car-sized platforms', 'Wide entrances', 'Vehicle guidance options', 'Surface protection'],
    note: 'Vehicle dimensions, turning space and ventilation are reviewed on site.',
  },
  {
    id: 'dumbwaiter',
    index: '08',
    name: 'Dumbwaiters & service lifts',
    kicker: 'Small loads, short distances',
    summary:
      'Compact service lifts for kitchens, pharmacies, cafés and utility cores — moving stock without moving people.',
    image: '/images/details/control-panel.jpg',
    imageAlt: 'Close-up concept render of a brushed steel elevator control panel',
    applications: ['Kitchens', 'Pharmacies', 'Cafés', 'Utility cores'],
    options: ['Compact car sizes', 'Hygienic linings', 'Service-level interlocks', 'Simple call stations'],
    note: 'Local regulations for service lifts vary; compliance is confirmed per location.',
  },
  {
    id: 'mrl',
    index: '09',
    name: 'MRL & traction systems',
    kicker: 'Machinery, considered',
    summary:
      'Machine-room-less and traction configurations that free up floor area and support efficient, comfortable travel.',
    image: '/images/engineering/machine-room.jpg',
    imageAlt: 'Concept render of a clean elevator machine room with a gearless traction machine',
    applications: ['New builds', 'Space-constrained cores', 'Mid-rise buildings', 'Retrofits'],
    options: ['Gearless traction', 'Compact controller packages', 'Energy-efficient drives', 'Shaft planning support'],
    note: 'Drive selection follows load, speed, rise and shaft conditions.',
  },
  {
    id: 'custom',
    index: '10',
    name: 'Bespoke & special',
    kicker: 'When the brief is unusual',
    summary:
      'Project-specific lifts for unusual shafts, special finishes or mixed-use requirements — planned with the design team from the start.',
    image: '/images/details/ceiling-light.jpg',
    imageAlt: 'Concept render of a backlit teal elevator ceiling with warm downlights',
    applications: ['Heritage buildings', 'Bespoke interiors', 'Mixed-use', 'Special shafts'],
    options: ['Custom cabin geometry', 'Bespoke finishes', 'Special control requirements', 'Integrated lighting design'],
    note: 'Feasibility depends on site survey, structure and applicable codes.',
  },
];

export const services = [
  {
    id: 'installation',
    index: '01',
    name: 'Installation & engineering',
    href: '/installation',
    image: '/images/engineering/shaft.jpg',
    imageAlt: 'Concept render looking up an elevator shaft with guide rails and traction ropes',
    summary: 'From the first site visit to a documented handover.',
  },
  {
    id: 'maintenance',
    index: '02',
    name: 'Maintenance & AMC',
    href: '/maintenance',
    image: '/images/engineering/machine-room.jpg',
    imageAlt: 'Concept render of a clean machine room with a traction machine and controller',
    summary: 'Planned care that keeps the ride consistent.',
  },
  {
    id: 'repair',
    index: '03',
    name: 'Repair & breakdown',
    href: '/repair',
    image: '/images/details/control-panel.jpg',
    imageAlt: 'Concept render of an illuminated elevator control button',
    summary: 'Diagnosis first, then the right fix.',
  },
  {
    id: 'modernization',
    index: '04',
    name: 'Modernization',
    href: '/modernization',
    image: '/images/spaces/doors-opening.jpg',
    imageAlt: 'Concept render of elevator doors opening into a newly finished cabin',
    summary: 'New performance inside an existing structure.',
  },
];

export const processSteps = [
  {
    index: '01',
    title: 'Consultation',
    text: 'We start with building type, usage, floor count and the constraints you already know about.',
  },
  {
    index: '02',
    title: 'Site inspection',
    text: 'Shaft dimensions, headroom, pit depth, power supply and access routes are recorded on site.',
  },
  {
    index: '03',
    title: 'Planning & design',
    text: 'Configuration, capacity, finishes and interface points are agreed before anything is ordered.',
  },
  {
    index: '04',
    title: 'Engineering',
    text: 'Drawings, structural interfaces, electrical requirements and installation sequencing are coordinated.',
  },
  {
    index: '05',
    title: 'Installation',
    text: 'Rails, machinery, doors, cabin and wiring are installed by the project team with site supervision.',
  },
  {
    index: '06',
    title: 'Testing',
    text: 'Door operation, levelling, safety circuits and ride quality are checked stage by stage.',
  },
  {
    index: '07',
    title: 'Commissioning',
    text: 'The installation is commissioned against the agreed specification and inspected before handover.',
  },
  {
    index: '08',
    title: 'Handover & care',
    text: 'Documentation, operating guidance and a maintenance plan are handed over with the keys.',
  },
];

export const industries = [
  {
    name: 'Residential',
    text: 'Apartments, villas and private homes where quiet operation and finish matter.',
    image: '/images/cabins/home-lift.jpg',
    alt: 'Concept render of a home lift beside a staircase',
  },
  {
    name: 'Commercial',
    text: 'Offices, retail and mixed-use buildings balancing traffic and durability.',
    image: '/images/spaces/lobby-hero.jpg',
    alt: 'Concept render of a luxury commercial elevator lobby',
  },
  {
    name: 'Healthcare',
    text: 'Hospitals and care facilities that need stretcher access and hygiene.',
    image: '/images/cabins/hospital-cabin.jpg',
    alt: 'Concept render of a stainless steel hospital elevator cabin',
  },
  {
    name: 'Hospitality',
    text: 'Hotels and clubs where the cabin is part of the guest experience.',
    image: '/images/spaces/doors-opening.jpg',
    alt: 'Concept render of bronze elevator doors opening into a lit cabin',
  },
  {
    name: 'Industrial',
    text: 'Factories, warehouses and logistics sites moving goods safely.',
    image: '/images/cabins/goods-cabin.jpg',
    alt: 'Concept render of a freight elevator interior',
  },
  {
    name: 'Institutional',
    text: 'Schools, campuses and public buildings with accessibility in mind.',
    image: '/images/engineering/shaft.jpg',
    alt: 'Concept render of an elevator shaft under installation',
  },
];

export const faqs = [
  {
    q: 'How do I get a quote?',
    a: 'Send us the building type, number of floors, intended use and any shaft drawings you already have. We will confirm what is missing and arrange a site assessment before quoting.',
  },
  {
    q: 'Can you install a lift in an existing building?',
    a: 'Often, yes — but it depends on the available shaft, headroom and pit, structural support, and access for materials. A site inspection is the only reliable way to confirm feasibility.',
  },
  {
    q: 'Which elevator types do you supply?',
    a: 'The site lists the ranges we plan and deliver most often. Availability is confirmed per project after reviewing the site, usage and supply partners. We do not claim to manufacture every category ourselves.',
  },
  {
    q: 'What maintenance plans are available?',
    a: 'Preventive and periodic maintenance, plus annual maintenance contracts. Comprehensive and non-comprehensive structures are available; the exact scope, visit frequency and exclusions are written into the agreement.',
  },
  {
    q: 'Do you provide emergency support?',
    a: 'Emergency support availability and response terms depend on your location and service agreement. These are confirmed in writing rather than promised generically.',
  },
  {
    q: 'Can I customise the cabin interiors?',
    a: 'Yes — wall finishes, flooring, ceiling design, lighting, handrails and control panels can be selected from available options. The design studio on this site is a concept preview; final availability is confirmed with your quote.',
  },
  {
    q: 'What should I prepare before the first call?',
    a: 'Floor count, building use, expected passenger or load capacity, shaft dimensions if known, power availability and any architect drawings. Photos of the proposed location are also helpful.',
  },
  {
    q: 'Where do you work?',
    a: 'Service coverage depends on the project. Share your location on WhatsApp and we will confirm whether we can support it before you commit to anything.',
  },
];

export const maintenanceChecks = [
  'Door operation, alignment and safety edges',
  'Levelling accuracy across floors',
  'Controller fault logs and battery condition',
  'Traction ropes, sheaves and terminations',
  'Guide rails, rollers and lubrication points',
  'Safety gear and governor operation',
  'Car and landing fixture condition',
  'Emergency alarm, light and communication',
  'Cabin ventilation and lighting',
  'Pit, shaft and machine-space housekeeping',
];

export const repairCategories = [
  {
    title: 'Door systems',
    text: 'Doors that drag, fail to close, reopen unexpectedly or misalign at a landing.',
  },
  {
    title: 'Controllers',
    text: 'Intermittent stops, display faults and error codes that need proper diagnosis.',
  },
  {
    title: 'Traction & machinery',
    text: 'Noise, vibration or abnormal movement from ropes, sheaves or the machine.',
  },
  {
    title: 'Electrical faults',
    text: 'Supply issues, loose terminations, safety-circuit faults and fixture failures.',
  },
  {
    title: 'Levelling & ride',
    text: 'Steps at landings, uneven travel or discomfort that points to adjustment issues.',
  },
  {
    title: 'Sensors & safety',
    text: 'Safety edges, door sensors, overload detection and emergency devices.',
  },
];

export const modernizationSigns = [
  'Frequent breakdowns or recurring door faults',
  'Difficulty sourcing spare parts',
  'Slow, noisy or uneven travel',
  'Outdated controllers with poor diagnostics',
  'Cabin finishes that no longer suit the building',
  'Accessibility or safety features missing',
  'Energy bills rising without a clear cause',
];

export const modernizationScope = [
  { title: 'Controller upgrade', text: 'Modern control logic, clearer diagnostics and quieter operation.' },
  { title: 'Door system renewal', text: 'New operator, doors and safety edges for reliable landings.' },
  { title: 'Machine & drive', text: 'Assessment and replacement where performance or parts support has run out.' },
  { title: 'Cabin renovation', text: 'New wall panels, flooring, ceiling, lighting and fixtures.' },
  { title: 'Safety systems', text: 'Updated safety circuits, alarms and communication where required.' },
  { title: 'Energy efficiency', text: 'LED lighting, standby modes and efficient drive options.' },
];

export const cabinFinishes = {
  wall: [
    { id: 'steel', name: 'Brushed steel', swatch: '#B9C0BD' },
    { id: 'walnut', name: 'Walnut timber', swatch: '#6B4A33' },
    { id: 'mirror', name: 'Bronze mirror', swatch: '#8C7B63' },
    { id: 'stone', name: 'Green stone', swatch: '#2E5B4E' },
  ],
  floor: [
    { id: 'graphite', name: 'Graphite stone', swatch: '#3B3F3D' },
    { id: 'terrazzo', name: 'Light terrazzo', swatch: '#CFCABE' },
    { id: 'oak', name: 'Smoked oak', swatch: '#8A6647' },
  ],
  ceiling: [
    { id: 'backlit', name: 'Backlit panel', swatch: '#9FE0CF' },
    { id: 'slats', name: 'Timber slats', swatch: '#7A5637' },
    { id: 'spot', name: 'Spotlights', swatch: '#E8E2D4' },
  ],
  light: [
    { id: 'warm', name: 'Warm 3000K', swatch: '#FFD9A0' },
    { id: 'neutral', name: 'Neutral 4000K', swatch: '#F4F0E6' },
    { id: 'teal', name: 'Brand teal', swatch: '#4BC2AC' },
  ],
  rail: [
    { id: 'brass', name: 'Brushed brass', swatch: '#B9A06A' },
    { id: 'steel', name: 'Stainless steel', swatch: '#B6BCB9' },
    { id: 'black', name: 'Matte black', swatch: '#23282A' },
  ],
  door: [
    { id: 'steel', name: 'Brushed steel', swatch: '#A3AAA6' },
    { id: 'bronze', name: 'Bronze mirror', swatch: '#8C7B63' },
    { id: 'graphite', name: 'Graphite', swatch: '#33383A' },
  ],
};
