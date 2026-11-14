import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const routes=['/','/products','/interiors','/installation','/maintenance','/repair','/modernization','/projects','/about','/contact'];
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
let bad=0;
for(const route of routes){
  const page=await browser.newPage();
  await page.setViewport({width:1440,height:900});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.evaluateOnNewDocument(()=>{try{sessionStorage.setItem('rr-visited','1');}catch{}});
  const res=await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle2'});
  await sleep(700);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  const ok=res.status()===200 && errors.length===0 && overflow<=0;
  if(!ok) bad++;
  console.log(`${ok?'PASS':'FAIL'} ${route} status=${res.status()} overflow=${overflow} errors=${errors.length}${errors.length?': '+errors[0]:''}`);
  await page.close();
}
if(routes.includes('/contact')){
  const page=await browser.newPage();
  await page.evaluateOnNewDocument(()=>{try{sessionStorage.setItem('rr-visited','1');}catch{}});
  await page.goto('http://localhost:3000/contact',{waitUntil:'networkidle2'});
  const links=await page.evaluate(()=>({
    whatsapp:[...document.querySelectorAll('a[href^="https://wa.me/"]')].map(a=>a.href).slice(0,3),
    call:[...document.querySelectorAll('a[href^="tel:"]')].map(a=>a.href),
  }));
  const ok=links.whatsapp.length>0 && links.call.length>0 && links.whatsapp.every(u=>u.startsWith('https://wa.me/917827433486')) && links.call.every(u=>u==='tel:+917827433486');
  if(!ok) bad++;
  console.log(`${ok?'PASS':'FAIL'} contact CTAs whatsapp=${links.whatsapp.length} call=${links.call.length}`);
  await page.close();
}
await browser.close();
console.log(bad?`${bad} failures`:'All smoke checks passed.');
process.exit(bad?1:0);
