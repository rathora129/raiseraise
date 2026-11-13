import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
const page=await browser.newPage();
await page.setViewport({width:1280,height:900});
await page.evaluateOnNewDocument(()=>{try{sessionStorage.setItem('rr-visited','1');}catch{}});
await page.goto('http://localhost:3000/',{waitUntil:'networkidle2'});
await sleep(800);
// FAQ accordion
const faq=await page.evaluate(()=>{
  const b=[...document.querySelectorAll('button[aria-expanded="false"]')].find(x=>/How do I get a quote/.test(x.textContent));
  if(!b) return 'button missing';
  b.click(); return 'clicked';
});
await sleep(600);
console.log('faq',faq, await page.evaluate(()=>document.body.innerText.includes('WhatsApp or call with the building type')));
// product rail
await page.evaluate(()=>document.querySelector('#product-ranges')?.scrollIntoView());
const rail=await page.evaluate(()=>{
  const track=[...document.querySelectorAll('div')].find(d=>d.scrollWidth>d.clientWidth+200 && d.querySelector('article, a'));
  return track?{w:track.scrollWidth,c:track.clientWidth,left:track.scrollLeft}:null;
});
console.log('rail before',rail);
const clicked=await page.evaluate(()=>{
  const b=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')?.toLowerCase().includes('next'));
  if(!b) return 'no next';
  b.click(); return b.getAttribute('aria-label');
});
await sleep(700);
const rail2=await page.evaluate(()=>{
  const track=[...document.querySelectorAll('div')].find(d=>d.scrollWidth>d.clientWidth+200 && d.querySelector('article, a'));
  return track?{left:track.scrollLeft}:null;
});
console.log('rail next',clicked,rail2);
await browser.close();
