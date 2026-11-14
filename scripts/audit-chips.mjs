import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox','--disable-gpu'] });
for (const [width, mode] of [[1440,'desktop'],[820,'tablet'],[390,'mobile']]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('rr-visited','1'); } catch {} });
  for (const route of ['/projects','/products','/contact','/interiors']) {
    await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle2' });
    await sleep(600);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 700) { await page.evaluate(t => window.scrollTo(0, t), y); await sleep(50); }
    await sleep(250);
    const out = await page.evaluate(() => {
      const rows = [];
      const texts = (el) => {
        const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; const rs = [];
        while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; const r = document.createRange(); r.selectNodeContents(n); for (const x of r.getClientRects()) if (x.width && x.height) rs.push(x); }
        return rs;
      };
      for (const el of Array.from(document.querySelectorAll('a, button'))) {
        if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (cs.display !== 'inline-flex' && cs.display !== 'flex') continue;
        const label = (el.innerText || '').replace(/\s+/g,' ').trim();
        if (!label || label.length > 40) continue;
        const rs = texts(el);
        if (!rs.length) continue;
        // skip big cards/links with multiple lines
        if (r.height > 90) continue;
        const tops = [...new Set(rs.map(x => Math.round(x.top)))];
        const textTop = Math.min(...rs.map(x=>x.top)), textBottom = Math.max(...rs.map(x=>x.bottom));
        const textCy = (textTop + textBottom)/2;
        const svg = el.querySelector('svg');
        const sr = svg ? svg.getBoundingClientRect() : null;
        const elCy = r.top + r.height/2;
        rows.push({
          label: label.slice(0, 26),
          h: +r.height.toFixed(1), w: +r.width.toFixed(1),
          lines: tops.length,
          textOff: +(textCy - elCy).toFixed(1),
          svgOff: sr ? +(((sr.top+sr.bottom)/2) - textCy).toFixed(1) : null,
          svg: sr ? `${Math.round(sr.width)}x${Math.round(sr.height)}` : '',
          pad: cs.padding, lh: cs.lineHeight,
        });
      }
      return rows;
    });
    if (out.length) {
      console.log(`\n== ${mode} ${route} ==`);
      console.table(out.slice(0, 25));
    }
  }
  await page.close();
}
await browser.close();
