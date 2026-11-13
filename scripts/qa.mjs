import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const base = process.env.QA_BASE || 'http://localhost:3000';
const mode = process.argv[2] || 'desktop';
const paths = process.argv.slice(3);
const viewport =
  mode === 'mobile'
    ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { width: 1440, height: 900, deviceScaleFactor: 1 };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

for (const path of paths) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.evaluateOnNewDocument(() => {
    try {
      sessionStorage.setItem('rr-visited', '1');
    } catch {}
    window.__qa = true;
  });

  const messages = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      messages.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => messages.push(`[pageerror] ${err.message}`));

  const url = `${base}${path}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  } catch (error) {
    messages.push(`[goto] ${error.message}`);
  }
  await sleep(1200);

  const metrics = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    width: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    brokenImages: Array.from(document.images)
      .filter((img) => img.currentSrc && img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc),
    missingAlt: Array.from(document.images).filter((img) => !img.hasAttribute('alt')).length,
  }));

  // Walk the page so whileInView reveals, lazy images and gated 3D mounts all fire.
  const step = Math.round(viewport.height * 0.7);
  for (let y = 0; y < metrics.height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await sleep(260);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1500);

  const slug = path === '/' ? 'home' : path.replace(/\//g, '-').replace(/^-/, '');
  const file = `/tmp/rr-${slug}-${mode}.png`;
  await page.screenshot({ path: file, fullPage: true });
  const title = await page.title();
  console.log(`\n=== ${path} (${mode}) ===`);
  console.log(`title: ${title}`);
  console.log(`file: ${file}`);
  console.log(
    `layout: ${metrics.width}px wide in ${metrics.innerWidth}px viewport${
      metrics.width > metrics.innerWidth ? ' — HORIZONTAL OVERFLOW' : ''
    }, page height ${metrics.height}px, missing alt ${metrics.missingAlt}`
  );
  if (metrics.brokenImages.length) {
    console.log(`broken images: ${metrics.brokenImages.join(', ')}`);
  }
  if (messages.length) {
    console.log(messages.slice(0, 25).join('\n'));
  } else {
    console.log('console: clean');
  }
  await page.close();
}

await browser.close();
