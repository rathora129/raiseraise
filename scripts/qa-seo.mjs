import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const paths=['/','/about','/products','/installation','/maintenance','/repair','/modernization','/interiors','/projects','/contact'];
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
for(const path of paths){
  const page=await browser.newPage();
  await page.setViewport({width:1280,height:900});
  await page.goto('http://localhost:3000'+path,{waitUntil:'domcontentloaded'});
  const out=await page.evaluate(()=>{
    const scripts=[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent);
    let ok=true, types=[], err='';
    try{ for(const s of scripts){ const j=JSON.parse(s); types.push(j['@graph']?j['@graph'].map(x=>x['@type']).join(','):j['@type']||'?'); } }catch(e){ ok=false; err=e.message; }
    return {
      h1: [...document.querySelectorAll('h1')].map(h=>h.innerText.replace(/\s+/g,' ').slice(0,70)),
      ldOk: ok, ldTypes: types, ldErr: err,
      canonical: document.querySelector('link[rel=canonical]')?.href,
      description: document.querySelector('meta[name=description]')?.content?.length,
      og: !!document.querySelector('meta[property="og:title"]'),
      twitter: !!document.querySelector('meta[name="twitter:card"]'),
    };
  });
  console.log(path, JSON.stringify(out));
  await page.close();
}
await browser.close();
