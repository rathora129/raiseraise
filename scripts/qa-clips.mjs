import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const base = process.env.QA_BASE || 'http://localhost:3000';
const path = process.argv[2] || '/';
const label = process.argv[3] || 'sec';
const offsets = process.argv.slice(4).map(Number);
const mode = process.env.QA_MODE || 'desktop';
const viewport =
  mode === 'mobile'
    ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { width: 1440, height: 900, deviceScaleFactor: 1 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport(viewport);
await page.evaluateOnNewDocument(() => {
  try { sessionStorage.setItem('rr-visited', '1'); } catch {}
});
await page.goto(`${base}${path}`, { waitUntil: 'networkidle2', timeout: 45000 });
await sleep(1200);
const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < h; y += Math.round(viewport.height * 0.7)) {
  await page.evaluate((t) => window.scrollTo(0, t), y);
  await sleep(200);
}
for (const y of offsets) {
  await page.evaluate((t) => window.scrollTo(0, t), y);
  await sleep(700);
  const file = `/tmp/rr-${label}-${y}-${mode}.png`;
  await page.screenshot({ path: file });
  console.log(file);
}
await browser.close();
