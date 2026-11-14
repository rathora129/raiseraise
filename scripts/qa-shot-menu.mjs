import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('rr-visited','1'); } catch {} });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 800));
await page.click('button[aria-label*="menu" i]');
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: '/tmp/rr-menu-mobile.png' });
const btn = await page.$('button[aria-label="Show Elevators links"]');
if (btn) { await btn.click(); await new Promise(r => setTimeout(r, 600)); }
await page.screenshot({ path: '/tmp/rr-menu2-mobile.png' });
const data = await page.evaluate(() => {
  const norm = (el) => { const r = el.getBoundingClientRect(); return { x:+r.x.toFixed(1), y:+r.y.toFixed(1), w:+r.width.toFixed(1), h:+r.height.toFixed(1) }; };
  return Array.from(document.querySelectorAll('a, button')).filter(el => el.offsetParent && el.querySelector('svg') && el.innerText.trim()).map(el => {
    const svg = el.querySelector('svg');
    return { text: el.innerText.trim().slice(0,30), box: norm(el), svg: norm(svg), display: getComputedStyle(el).display, align: getComputedStyle(el).alignItems };
  });
});
console.log(JSON.stringify(data, null, 1));
await browser.close();
