import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [widthArg, route = '/', ...ys] = process.argv.slice(2);
const width = Number(widthArg) || 1440;
const offsets = ys.length ? ys.map(Number) : [0];
const mode = width < 640 ? 'mobile' : width < 1080 ? 'tablet' : 'desktop';
const slug = route.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width, height: mode === 'mobile' ? 844 : mode === 'tablet' ? 1000 : 900 });
await page.evaluateOnNewDocument(() => {
  try { sessionStorage.setItem('rr-visited', '1'); } catch {}
});
await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 900));
const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < h; y += 620) {
  await page.evaluate((t) => window.scrollTo(0, t), y);
  await new Promise((r) => setTimeout(r, 90));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 600));

for (const y of offsets) {
  await page.evaluate((t) => window.scrollTo(0, t), y);
  await new Promise((r) => setTimeout(r, 450));
  const file = `/tmp/rr-${slug || 'home'}-${y}-${mode}.png`;
  await page.screenshot({ path: file });
  console.log(file);
}
await browser.close();
