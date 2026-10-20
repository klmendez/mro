import assert from 'node:assert/strict';
import {launchBrowser,baseURL} from './browser.mjs';

const browser=await launchBrowser();
try{
 const page=await browser.newPage({viewport:{width:390,height:900}});
 const resources=new Set();
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 for(const route of ['/','/programas/','/precios/','/sobre-jaime/','/plataforma/']){
  await page.goto(baseURL+route);await page.locator('h1').waitFor();
  assert.equal(await page.locator('h1').count(),1);
  const paths=await page.locator('img,video,source').evaluateAll(items=>items.flatMap(item=>[item.getAttribute('src'),item.getAttribute('poster')]).filter(Boolean));
  for(const path of paths)if(path.startsWith('/'))resources.add(path);
  const prices=page.locator('.mobile-price-item');
  if(await prices.count()){
   assert.equal(await prices.count(),5);
   await prices.nth(0).locator('summary').click();await prices.nth(1).locator('summary').click();
   assert.equal(await page.locator('.mobile-price-item[open]').count(),1);
   assert.equal(await prices.nth(1).locator('summary>span').first().evaluate(e=>getComputedStyle(e).transform),'none');
  }
  if(route==='/'){
   assert.equal(await page.locator('.teacher-profile a').count(),1);
   assert.equal(await page.locator('.teacher-profile a').getAttribute('href'),'/sobre-jaime/');
   assert.equal(await page.locator('video source').getAttribute('src'),'/videos/jaime-1020.mp4');
  }
  if(route==='/sobre-jaime/'){
   const hrefs=await page.locator('.teacher-profile a').evaluateAll(items=>items.map(item=>item.href));
   assert.equal(hrefs.length,4);assert.equal(new Set(hrefs).size,4);
  }
 }
 for(const path of resources){
  const response=await page.request.head(baseURL+path);
  assert.equal(response.ok(),true,`${path}: ${response.status()}`);
 }
 assert.deepEqual(errors,[]);
 console.log(`PASS: ${resources.size} current media assets, mobile accordions and profile links; no browser errors.`);
}finally{await browser.close()}
