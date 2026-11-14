import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:3000';
const routes = ['/', '/about', '/products', '/installation', '/maintenance', '/repair', '/modernization', '/interiors', '/projects', '/contact'];
const widths = [
  [1440, 'desktop'],
  [820, 'tablet'],
  [390, 'mobile'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

for (const [width, mode] of widths) {
  console.log(`\n########## ${mode} ${width}px ##########`);
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.evaluateOnNewDocument(() => {
    try { sessionStorage.setItem('rr-visited', '1'); } catch {}
  });

  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: 'networkidle2' });
    await sleep(600);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 640) {
      await page.evaluate((t) => window.scrollTo(0, t), y);
      await sleep(110);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);

    const issues = await page.evaluate(() => {
      const out = [];
      const els = Array.from(document.querySelectorAll('a, button'));

      for (const el of els) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || el.getBoundingClientRect().width === 0) continue;
        const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
        if (!text) continue;

        const svgs = Array.from(el.querySelectorAll('svg')).filter((s) => {
          const sr = s.getBoundingClientRect();
          const w = parseFloat(getComputedStyle(s).width);
          return sr.width > 4 && sr.height > 4 && w <= 40 && sr.width <= 40 && sr.height <= 40;
        });
        if (!svgs.length) continue;

        const textRects = [];
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = walker.nextNode())) {
          if (!n.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          for (const rect of range.getClientRects()) {
            if (rect.width > 0 && rect.height > 0) textRects.push({ rect, text: n.textContent.trim() });
          }
        }
        if (!textRects.length) continue;

        const label = `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0].split('__').pop()} "${text.slice(0, 40)}"`;

        for (const svg of svgs) {
          const s = svg.getBoundingClientRect();
          // nearest text rect by center distance
          let best = null;
          let bestD = Infinity;
          for (const tr of textRects) {
            const r = tr.rect;
            const dx = Math.max(0, Math.max(r.left - s.right, s.left - r.right));
            const dy = Math.max(0, Math.max(r.top - s.bottom, s.top - r.bottom));
            const d = Math.hypot(dx, dy) + Math.abs((r.top + r.bottom) / 2 - (s.top + s.bottom) / 2) * 0.25;
            if (d < bestD) { bestD = d; best = tr; }
          }
          const r = best.rect;
          const sCenterY = (s.top + s.bottom) / 2;
          const tCenterY = (r.top + r.bottom) / 2;
          const deltaY = +(sCenterY - tCenterY).toFixed(1);
          const horizontalGap = Math.max(r.left - s.right, s.left - r.right);
          const verticalGap = Math.max(r.top - s.bottom, s.top - r.bottom);
          const sameLine = verticalGap < Math.min(s.height, r.height) * 0.6;

          if (sameLine && Math.abs(deltaY) > 2.5) {
            out.push({ type: 'icon-offcenter', label, detail: `"${best.text.slice(0, 24)}" deltaY ${deltaY}px; svg ${Math.round(s.width)}x${Math.round(s.height)}` });
          }
          if (sameLine && horizontalGap < -1) {
            out.push({ type: 'icon-overlap', label, detail: `"${best.text.slice(0, 24)}" overlap ${Math.round(-horizontalGap)}px deltaY ${deltaY}` });
          }
          if (!sameLine && horizontalGap > -1) {
            out.push({ type: 'icon-stacked', label, detail: `"${best.text.slice(0, 24)}" vGap ${Math.round(verticalGap)}px hGap ${Math.round(horizontalGap)}px` });
          }
          const sr = svg.getBoundingClientRect();
          if (Math.abs(sr.width - sr.height) > 1) {
            out.push({ type: 'icon-nonsquare', label, detail: `${sr.width.toFixed(1)}x${sr.height.toFixed(1)}` });
          }
        }

        // element box vs line-height sanity for button-ish elements
        const isPill = cs.display.includes('flex') && parseFloat(cs.borderTopWidth) >= 1;
        if (isPill) {
          const lh = parseFloat(cs.lineHeight);
          const fs = parseFloat(cs.fontSize);
          if (cs.lineHeight !== 'normal' && lh < fs * 0.9) {
            out.push({ type: 'tight-line-height', label, detail: `lh ${lh} fs ${fs}` });
          }
        }
      }

      const uniq = [];
      const keys = new Set();
      for (const o of out) {
        const k = o.type + '|' + o.label + '|' + o.detail;
        if (!keys.has(k)) { keys.add(k); uniq.push(o); }
      }
      return uniq;
    });

    if (issues.length) {
      console.log(`\n${route}`);
      for (const i of issues) console.log(`  [${i.type}] ${i.label}\n      ${i.detail}`);
    } else {
      console.log(`${route}: ok`);
    }
  }
  await page.close();
}

await browser.close();
