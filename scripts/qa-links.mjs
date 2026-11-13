import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const paths=['/','/about','/products','/installation','/maintenance','/repair','/modernization','/interiors','/projects','/contact'];
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
const seen=new Set();
for(const path of paths){
  const page=await browser.newPage();
  await page.setViewport({width:1280,height:900});
  await page.goto('http://localhost:3000'+path,{waitUntil:'networkidle2'});
  const links=await page.evaluate(()=>[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')));
  const bad=links.filter(h=>!h||h==='#'||h.startsWith('javascript:'));
  const internal=[...new Set(links.filter(h=>h.startsWith('/')&&!h.startsWith('//')))];
  internal.forEach(h=>seen.add(h.split('#')[0]));
  console.log(path,'links',links.length,'bad',bad.length,'external', [...new Set(links.filter(h=>/^(https?:|tel:|mailto:)/.test(h)))].slice(0,4));
  if(bad.length) console.log('  BAD',bad);
  await page.close();
}
console.log('internal routes', [...seen].sort().join(' '));
await browser.close();
