import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const routes = ['/', '/about', '/products', '/installation', '/maintenance', '/repair', '/modernization', '/interiors', '/projects', '/contact'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (const [width, mode] of [[1440, 'desktop'], [390, 'mobile']]) {
  console.log(`\n##### ${mode} #####`);
  for (const route of routes) {
    const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('rr-visited','1'); } catch {} });
    await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle2' });
    await sleep(400);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 900) { await page.evaluate((t) => window.scrollTo(0, t), y); await sleep(60); }
    await sleep(250);
    const issues = await page.evaluate(() => {
      const out = [];
      for (const el of Array.from(document.querySelectorAll('a, button, span, div, li, p'))) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const directSvg = Array.from(el.children).filter((c) => c.tagName.toLowerCase() === 'svg');
        if (!directSvg.length) continue;
        if (el.getBoundingClientRect().width === 0) continue;
        const textRects = [];
        for (const node of Array.from(el.childNodes)) {
          if (node.nodeType !== 3 || !node.textContent.trim()) continue;
          const range = document.createRange(); range.selectNodeContents(node);
          for (const r of range.getClientRects()) if (r.width && r.height) textRects.push(r);
        }
        // also spans with label text (common pattern icon + <span>label</span>)
        for (const child of Array.from(el.children)) {
          if (child.tagName.toLowerCase() === 'svg') continue;
          if (!(child.innerText || '').trim()) continue;
          if (child.querySelector('svg')) continue;
          const cr = child.getBoundingClientRect();
          if (cr.width && cr.height) textRects.push({ left: cr.left, right: cr.right, top: cr.top, bottom: cr.bottom });
        }
        if (!textRects.length) continue;
        for (const svg of directSvg) {
          const s = svg.getBoundingClientRect();
          if (s.width > 40 || s.height > 40) continue;
          for (const r of textRects) {
            const hOverlap = Math.min(s.bottom, r.bottom) - Math.max(s.top, r.top);
            if (hOverlap < Math.min(s.height, r.height) * 0.5) continue;
            const hGap = Math.max(r.left - s.right, s.left - r.right);
            if (hGap > 44) continue;
            const delta = +(((s.top + s.bottom) / 2) - ((r.top + r.bottom) / 2)).toFixed(1);
            if (Math.abs(delta) > 1.8) {
              const elText = (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 40);
              out.push({ text: elText, tag: el.tagName.toLowerCase(), cls: String(el.className).split(' ')[0].slice(0, 24), delta, svg: `${Math.round(s.width)}x${Math.round(s.height)}`, gap: Math.round(hGap) });
              break;
            }
          }
        }
      }
      const seen = new Set(); return out.filter((o) => { const k = o.text + o.delta; if (seen.has(k)) return false; seen.add(k); return true; });
    });
    if (issues.length) {
      console.log(`\n${route}`);
      for (const i of issues) console.log(`  ${i.delta}px  ${i.tag}.${i.cls} svg${i.svg} gap${i.gap}  "${i.text}"`);
    } else console.log(`${route}: ok`);
    await browser.close();
  }
}
