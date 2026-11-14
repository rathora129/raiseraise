import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:3000';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });

for (const [width, mode] of [[1440, 'desktop'], [820, 'tablet'], [390, 'mobile']]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('rr-visited', '1'); } catch {} });
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await sleep(700);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 640) {
    await page.evaluate((t) => window.scrollTo(0, t), y);
    await sleep(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);

  const data = await page.evaluate(() => {
    const pick = (sel) => Array.from(document.querySelectorAll(sel));
    const box = (el) => {
      const r = el.getBoundingClientRect();
      return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), cy: +(r.y + r.height / 2).toFixed(1) };
    };
    const textBox = (el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let n;
      const rects = [];
      while ((n = walker.nextNode())) {
        if (!n.textContent.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        for (const r of range.getClientRects()) if (r.width && r.height) rects.push(r);
      }
      if (!rects.length) return null;
      const left = Math.min(...rects.map((r) => r.left));
      const right = Math.max(...rects.map((r) => r.right));
      const top = Math.min(...rects.map((r) => r.top));
      const bottom = Math.max(...rects.map((r) => r.bottom));
      return { x: +left.toFixed(1), y: +top.toFixed(1), w: +(right - left).toFixed(1), h: +(bottom - top).toFixed(1), cy: +((top + bottom) / 2).toFixed(1) };
    };
    const report = {};

    report.headerNav = pick('header nav a, header nav button').map((el) => {
      const cs = getComputedStyle(el);
      const svg = el.querySelector('svg');
      return {
        text: el.innerText.trim().slice(0, 22),
        box: box(el),
        textBox: textBox(el),
        svg: svg ? box(svg) : null,
        display: cs.display,
        align: cs.alignItems,
        gap: cs.gap,
        lh: cs.lineHeight,
        pad: cs.padding,
      };
    });

    report.quote = pick('header a[href^="https://wa.me"]').slice(-1).map((el) => {
      const cs = getComputedStyle(el);
      return { text: el.innerText.trim(), box: box(el), textBox: textBox(el), display: cs.display, align: cs.alignItems, gap: cs.gap, pad: cs.padding, lh: cs.lineHeight, fs: cs.fontSize };
    });

    report.phoneLink = pick('header a[href^="tel:"]').map((el) => {
      const cs = getComputedStyle(el);
      const svg = el.querySelector('svg');
      return { text: el.innerText.trim(), box: box(el), textBox: textBox(el), svg: svg ? box(svg) : null, display: cs.display, align: cs.alignItems, gap: cs.gap, pad: cs.padding };
    });

    report.burger = pick('header button[aria-label*="menu" i]').map((el) => {
      const cs = getComputedStyle(el);
      return { box: box(el), display: cs.display, align: cs.alignItems, justify: cs.justifyContent, pad: cs.padding };
    });

    report.heroButtons = pick('main section:first-of-type a[href^="https://wa.me"], main section:first-of-type a[href="/products"]').map((el) => {
      const cs = getComputedStyle(el);
      const svg = el.querySelector('svg');
      return { text: el.innerText.trim().slice(0, 30), box: box(el), textBox: textBox(el), svg: svg ? box(svg) : null, display: cs.display, align: cs.alignItems, justify: cs.justifyContent, gap: cs.gap, pad: cs.padding, lh: cs.lineHeight, maxW: cs.width };
    });

    const acc = document.querySelector('button[id^="faq-button"]');
    if (acc) {
      const q = acc.querySelector('span');
      const ic = acc.querySelector('span:nth-child(2)');
      const svg = acc.querySelector('svg');
      report.accordion = {
        button: { box: box(acc), align: getComputedStyle(acc).alignItems, pad: getComputedStyle(acc).padding },
        q: { box: box(q), lh: getComputedStyle(q).lineHeight, fs: getComputedStyle(q).fontSize },
        iconWrap: ic ? { box: box(ic) } : null,
        svg: svg ? box(svg) : null,
      };
    }

    const care = Array.from(document.querySelectorAll('a')).find((a) => a.innerText.includes('Explore maintenance'));
    if (care) {
      const arrow = Array.from(care.querySelectorAll('span')).find((s) => s.innerText.includes('Explore maintenance'));
      if (arrow) {
        const svg = arrow.querySelector('svg');
        report.careArrow = { span: { box: box(arrow), display: getComputedStyle(arrow).display, align: getComputedStyle(arrow).alignItems, gap: getComputedStyle(arrow).gap }, svg: svg ? box(svg) : null };
      }
    }

    const railCard = document.querySelector('ul[aria-label="Elevator product ranges"] li a');
    if (railCard) {
      const foot = railCard.querySelector('div');
      const title = railCard.querySelector('h3');
      const circle = railCard.querySelector('span:last-child');
      const svg = railCard.querySelector('svg');
      report.railCard = {
        foot: { box: box(foot), align: getComputedStyle(foot).alignItems },
        title: { box: box(title), lh: getComputedStyle(title).lineHeight },
        circle: circle ? box(circle) : null,
        svg: svg ? box(svg) : null,
      };
    }

    const svc = document.querySelector('a[href="/installation"]');
    const footer = document.querySelector('footer');
    if (footer) {
      report.footerRows = Array.from(footer.querySelectorAll('a')).filter((a) => a.querySelector('svg')).map((el) => {
        const cs = getComputedStyle(el);
        const svg = el.querySelector('svg');
        return { text: el.innerText.trim().slice(0, 26), box: box(el), textBox: textBox(el), svg: svg ? box(svg) : null, display: cs.display, align: cs.alignItems, gap: cs.gap };
      });
    }
    return report;
  });
  console.log(`\n===== ${mode} ${width} =====`);
  console.log(JSON.stringify(data, null, 1));
  await page.close();
}
await browser.close();
