import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('rr-visited','1'); } catch {} });

async function shot(url, finder, name, pad = 14) {
  await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 700));
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 800) { await page.evaluate(t => window.scrollTo(0, t), y); await new Promise(r => setTimeout(r, 50)); }
  await page.evaluate((f) => {
    const node = eval(f);
    const top = node.getBoundingClientRect().top + window.scrollY;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, Math.max(0, top - 300));
  }, finder);
  await new Promise(r => setTimeout(r, 400));
  const rect = await page.evaluate((f) => {
    const node = eval(f);
    if (!node) return null;
    const r = node.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  }, finder);
  if (!rect) { console.log('missing', name); return; }
  await page.screenshot({ path: `/tmp/crop-${name}.png`, clip: { x: Math.max(0, rect.x - pad), y: Math.max(0, rect.y - pad), width: rect.w + pad * 2, height: rect.h + pad * 2 } });
  console.log(`/tmp/crop-${name}.png`, JSON.stringify(rect));
}

await shot('/', `document.querySelector('section:first-of-type a[href^="https://wa.me"]')`, 'hero-btn');
await shot('/', `document.querySelector('ul[aria-label="Elevator product ranges"] li')`, 'product-card', 6);
await shot('/', `document.querySelector('button[id^="faq-button"]')`, 'accordion');
await shot('/', `Array.from(document.querySelectorAll('a[href=\"/maintenance\"]')).filter(a => a.querySelector('svg')).pop()`, 'care-card');
await shot('/contact', `Array.from(document.querySelectorAll('main a[href^="tel:"]'))[0]`, 'contact-row');
await shot('/', `document.querySelector('header a[href^="https://wa.me"]')`, 'header-quote');
await browser.close();
