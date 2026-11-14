import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('rr-visited','1'); } catch {} });
for (const route of ['/', '/contact', '/products', '/repair', '/installation', '/maintenance', '/modernization', '/about', '/projects']) {
  await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle2' });
  await sleep(500);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 700) { await page.evaluate((t) => window.scrollTo(0, t), y); await sleep(70); }
  await sleep(300);
  const rows = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('a, button')).filter((el) => el.querySelector('.btn-icon'));
    return els.map((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      // group extents: all svg + text
      const svgs = Array.from(el.querySelectorAll('svg')).map((s) => s.getBoundingClientRect());
      const left = Math.min(...svgs.map((s) => s.left));
      const right = Math.max(...svgs.map((s) => s.right));
      return {
        text: el.innerText.trim().slice(0, 30),
        w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        pad: cs.padding, lh: cs.lineHeight, gap: cs.gap, fs: cs.fontSize,
        iconLeft: +(left - r.left).toFixed(1), iconRight: +(r.right - right).toFixed(1),
        variant: cs.backgroundColor,
        textEl: (() => { const span = el.querySelector(':scope > span'); if (!span) return null; const sr = span.getBoundingClientRect(); return { w: +sr.width.toFixed(1), h: +sr.height.toFixed(1), cy: +(sr.top + sr.height / 2).toFixed(1) }; })(),
      };
    });
  });
  if (rows.length) { console.log('\n' + route); console.table(rows); }
}
await browser.close();
