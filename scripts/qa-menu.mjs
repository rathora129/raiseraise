import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
const page=await browser.newPage();
await page.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
await page.evaluateOnNewDocument(()=>{try{sessionStorage.setItem('rr-visited','1');}catch{}});
await page.goto('http://localhost:3000/',{waitUntil:'networkidle2'});
await sleep(900);
await page.click('button[aria-label="Open menu"]');
await sleep(700);
await page.screenshot({path:'/tmp/rr-menu-mobile.png'});
console.log('menu screenshot saved');
const expanded = await page.evaluate(()=>Array.from(document.querySelectorAll('[aria-expanded]')).map(e=>[e.textContent.trim().slice(0,30),e.getAttribute('aria-expanded')]));
console.log(expanded);
// open Elevators submenu
const toggled = await page.evaluate(()=>{
  const b = Array.from(document.querySelectorAll('[aria-expanded="false"]')).find(e=>/Elevators/.test(e.textContent));
  if (b) { b.click(); return true; } return false;
});
await sleep(500);
await page.screenshot({path:'/tmp/rr-menu-sub-mobile.png'});
console.log('toggled', toggled);
await browser.close();
