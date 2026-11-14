import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL_BASE = 'http://localhost:3000/contact';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

async function freshPage(width = 1280, height = 900) {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.evaluateOnNewDocument(() => {
    try {
      sessionStorage.setItem('rr-visited', '1');
    } catch {}
    window.__opened = [];
    window.open = (url) => {
      window.__opened.push(url);
      return null;
    };
  });
  await page.goto(URL_BASE, { waitUntil: 'networkidle2' });
  await page.waitForSelector('form select[name="service"]');
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelector('form').scrollIntoView({ block: 'center' });
  });
  await sleep(900);
  return page;
}

async function setField(page, selector, value) {
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.press('Backspace');
  if (value) await page.type(selector, value);
}

async function selectValue(page, selector, value) {
  await page.select(selector, value);
}

async function submit(page) {
  await page.click('form button[type="submit"]');
  await sleep(350);
}

async function opened(page) {
  return page.evaluate(() => window.__opened);
}

const page = await freshPage();

/* ---------- 1. Structure ---------- */
const structure = await page.evaluate(() => {
  const form = document.querySelector('form');
  const service = form.querySelector('select[name="service"]');
  const details = form.querySelector('textarea[name="details"]');
  return {
    hasForm: !!form,
    hasBuilding: !!form.querySelector('[name="building"]'),
    hasFloors: !!form.querySelector('[name="floors"]'),
    serviceOptions: [...service.options].map((o) => o.textContent.trim()),
    serviceRequired: service.required,
    serviceDescription: service.closest('label').querySelector('span').textContent.trim(),
    detailsPlaceholder: details.placeholder,
    detailsRequired: details.required,
    oldNotesField: !!form.querySelector('textarea[name="message"]'),
    requiredNames: [...form.querySelectorAll('[required]')].map((el) => el.name),
  };
});

check('Form renders with service dropdown', structure.hasForm && !!structure.serviceOptions.length);
const expectedServices = [
  'New Elevator Installation',
  'Home Elevator Installation',
  'Passenger Elevator Installation',
  'Hospital / Stretcher Elevator',
  'Goods / Freight Elevator',
  'Commercial Elevator Project',
  'Elevator Maintenance (AMC)',
  'Elevator Repair / Breakdown',
  'Elevator Modernization / Upgrade',
  'Elevator Cabin Decoration / Interior',
  'Elevator Safety Inspection',
  'Elevator Consultation',
  'Other Requirements',
];
check(
  'Service dropdown has the exact 13 options in order',
  JSON.stringify(structure.serviceOptions.slice(1)) === JSON.stringify(expectedServices),
  `${structure.serviceOptions.length - 1} options`
);
check(
  'Service label is "What do you need help with?"',
  structure.serviceDescription.replace(/\s*\*$/, '').trim() === 'What do you need help with?'
);
check('Service is required', structure.serviceRequired);
check('Building type field exists', structure.hasBuilding);
check('Number of floors field exists', structure.hasFloors);
check(
  'Details textarea has the exact placeholder',
  structure.detailsPlaceholder ===
    'Tell us more about your project, building requirements or specific needs...'
);
check('Details textarea is optional', structure.detailsRequired === false);
check('Old project notes field removed', structure.oldNotesField === false);

/* ---------- 2. Empty submission blocked ---------- */
await submit(page);
let openedUrls = await opened(page);
const emptyErrors = await page.evaluate(() =>
  [...document.querySelectorAll('form [id^="error-"]')].map((el) => el.textContent.trim())
);
check('Empty submit does not open WhatsApp', openedUrls.length === 0);
check('Empty submit shows required errors', emptyErrors.length === 6, `${emptyErrors.length} errors`);
check(
  'Focus moves to first invalid field',
  await page.evaluate(() => document.activeElement?.name === 'name')
);

/* ---------- 3. Invalid formats ---------- */
await setField(page, 'input[name="name"]', 'Aarav Singh');
await setField(page, 'input[name="phone"]', '12345');
await setField(page, 'input[name="email"]', 'not-an-email');
await setField(page, 'input[name="city"]', 'New Delhi');
await selectValue(page, 'select[name="type"]', 'Passenger elevators');
await setField(page, 'input[name="building"]', 'Apartment block');
await setField(page, 'input[name="floors"]', 'abc');
await selectValue(page, 'select[name="service"]', 'Elevator Repair / Breakdown');
await submit(page);

openedUrls = await opened(page);
const invalidErrors = await page.evaluate(() => ({
  phone: document.querySelector('#error-phone')?.textContent || '',
  email: document.querySelector('#error-email')?.textContent || '',
  floors: document.querySelector('#error-floors')?.textContent || '',
  count: document.querySelectorAll('form [id^="error-"]').length,
}));
check('Invalid formats do not open WhatsApp', openedUrls.length === 0);
check('Invalid mobile number is rejected', !!invalidErrors.phone, invalidErrors.phone);
check('Invalid email is rejected', !!invalidErrors.email, invalidErrors.email);
check('Invalid floor count is rejected', !!invalidErrors.floors, invalidErrors.floors);

/* ---------- 4. Valid submission, full message ---------- */
await setField(page, 'input[name="phone"]', '+91 98765 43210');
await setField(page, 'input[name="email"]', 'aarav@example.com');
await setField(page, 'input[name="floors"]', 'G + 6');
await setField(page, 'textarea[name="details"]', 'Need a 7-stop lift. Budget ₹12L & 100% clarity? Yes / no.');
await submit(page);

openedUrls = await opened(page);
check('Valid submit opens exactly one WhatsApp tab', openedUrls.length === 1);

const parsed = openedUrls[0] ? new URL(openedUrls[0]) : null;
check('Recipient is wa.me/917827433486', parsed?.hostname === 'wa.me' && parsed?.pathname === '/917827433486', openedUrls[0]?.split('?')[0]);
const text = parsed?.searchParams.get('text') || '';
const expectedFull = [
  'NEW WEBSITE ENQUIRY – RAISERAISE ELEVATORS',
  '',
  'Customer Details:',
  'Name: Aarav Singh',
  'Phone: +91 98765 43210',
  'Email: aarav@example.com',
  'Location: New Delhi',
  '',
  'Project Requirements:',
  'Elevator Requirement: Passenger elevators',
  'Building Type: Apartment block',
  'Number of Floors: G + 6',
  'Selected Service: Elevator Repair / Breakdown',
  '',
  'Additional Project Details:',
  'Need a 7-stop lift. Budget ₹12L & 100% clarity? Yes / no.',
  '',
  'Source: RaiseRaise Elevators Website',
].join('\n');
check('Message matches the required format exactly', text === expectedFull);
if (text !== expectedFull) console.log('\n--- actual ---\n' + text + '\n--- end ---\n');
check('Special characters survive encoding', /₹12L & 100% clarity\? Yes \/ no\./.test(text));

const confirmation = await page.evaluate(() => document.querySelector('[role="status"]')?.textContent.trim() || '');
check(
  'Exact confirmation message shown',
  confirmation ===
    'Your enquiry is ready! Please send the pre-filled WhatsApp message to complete your submission.',
  confirmation
);
const buttonState = await page.evaluate(() => {
  const b = document.querySelector('form button[type="submit"]');
  return { text: b.textContent.trim(), disabled: b.disabled };
});
check('Submit button restored after send', !buttonState.disabled && !/Preparing/.test(buttonState.text), buttonState.text);

/* ---------- 5. Optional fields omitted ---------- */
const minimal = await freshPage();
await setField(minimal, 'input[name="name"]', 'Meera');
await setField(minimal, 'input[name="phone"]', '9876543210');
await setField(minimal, 'input[name="city"]', 'Pune');
await selectValue(minimal, 'select[name="type"]', 'Home & villa lifts');
await setField(minimal, 'input[name="building"]', 'Villa');
await selectValue(minimal, 'select[name="service"]', 'Home Elevator Installation');
await submit(minimal);
const minUrls = await opened(minimal);
const minText = minUrls[0] ? new URL(minUrls[0]).searchParams.get('text') : '';
const expectedMin = [
  'NEW WEBSITE ENQUIRY – RAISERAISE ELEVATORS',
  '',
  'Customer Details:',
  'Name: Meera',
  'Phone: 9876543210',
  'Location: Pune',
  '',
  'Project Requirements:',
  'Elevator Requirement: Home & villa lifts',
  'Building Type: Villa',
  'Selected Service: Home Elevator Installation',
  '',
  'Source: RaiseRaise Elevators Website',
].join('\n');
check('Empty optional fields are omitted', minText === expectedMin);
if (minText !== expectedMin) console.log('\n--- actual minimal ---\n' + minText + '\n--- end ---\n');
check('No undefined/null leaked into message', !/undefined|null/.test(minText));
check('Additional details section omitted when empty', !/Additional Project Details/.test(minText));
check('Email line omitted when empty', !/^Email:/m.test(minText));

/* ---------- 6. Duplicate click guard ---------- */
await minimal.close();
await page.bringToFront();
await sleep(300);
await page.evaluate(() => {
  window.__opened = [];
  const btn = document.querySelector('form button[type="submit"]');
  btn.click();
  btn.click();
  btn.click();
});
await sleep(500);
const dup = await opened(page);
check('Rapid repeated clicks open WhatsApp once', dup.length === 1, `${dup.length} opens`);

/* ---------- 7. Mobile viewport ---------- */
const mobile = await freshPage(390, 844);
const mobileLayout = await mobile.evaluate(() => {
  const select = document.querySelector('select[name="service"]');
  const details = document.querySelector('textarea[name="details"]');
  const rect = select.getBoundingClientRect();
  return {
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    serviceWidth: Math.round(rect.width),
    detailsWidth: Math.round(details.getBoundingClientRect().width),
    viewport: window.innerWidth,
    serviceVisible: rect.height > 0,
  };
});
check('No horizontal overflow on mobile', mobileLayout.overflow <= 0, `${mobileLayout.overflow}px`);
check(
  'Dropdown and textarea are full width on mobile',
  mobileLayout.serviceWidth > mobileLayout.viewport * 0.7 &&
    mobileLayout.detailsWidth > mobileLayout.viewport * 0.7,
  `${mobileLayout.serviceWidth}px / ${mobileLayout.detailsWidth}px`
);

await setField(mobile, 'input[name="name"]', 'Rohan');
await setField(mobile, 'input[name="phone"]', '+91 90000 00000');
await setField(mobile, 'input[name="city"]', 'Mumbai');
await selectValue(mobile, 'select[name="type"]', 'Goods & freight');
await setField(mobile, 'input[name="building"]', 'Warehouse');
await selectValue(mobile, 'select[name="service"]', 'Goods / Freight Elevator');
await setField(mobile, 'textarea[name="details"]', 'Two-tonne goods lift.');
await submit(mobile);
const mobileUrls = await opened(mobile);
const mobileText = mobileUrls[0] ? new URL(mobileUrls[0]).searchParams.get('text') : '';
check('Mobile submit opens WhatsApp with the selected service', mobileText.includes('Selected Service: Goods / Freight Elevator'));
check('Mobile detail text is included', mobileText.includes('Two-tonne goods lift.'));
const mobileStatus = await mobile.evaluate(() => {
  const el = document.querySelector('[role="status"]');
  return el ? el.textContent.trim() : '';
});
check('Mobile confirmation is visible', mobileStatus.startsWith('Your enquiry is ready!'));

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
if (failed.length) {
  console.log('Failed: ' + failed.map((f) => f.name).join('; '));
  process.exit(1);
}
