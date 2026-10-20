import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const browser=await chromium.launch({executablePath,headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
fs.mkdirSync('artifacts',{recursive:true});
try {
 for(const route of ['/','/programas/','/sobre-jaime/','/precios/','/plataforma/']){
  const response=await page.goto('http://127.0.0.1:3000'+route);assert.equal(response.status(),200);
  await page.screenshot({path:'artifacts/'+(route.split('/')[1]||'inicio')+'-desktop.png',fullPage:true});
  assert.equal(await page.locator('h1').count(),1);
 }
 await page.goto('http://127.0.0.1:3000/programas/#espanol');
 await page.getByRole('tab',{name:'Ñ Español'}).click();
 await page.getByRole('heading',{name:'Español: Conecta de verdad.'}).waitFor();
 await page.getByRole('tab',{name:'↗ IELTS / TOEFL'}).click();
 await page.getByRole('heading',{name:'IELTS / TOEFL: Ve por tu siguiente meta.'}).waitFor();
 await page.goto('http://127.0.0.1:3000/precios/');
 await page.getByRole('button',{name:'Internacional · USD'}).click();
 assert.match(await page.locator('.price-grid').innerText(),/US\$36/);
 await page.getByRole('button',{name:'Terracota',exact:true}).click();
 await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'tierra');
 await page.getByRole('button',{name:'Naranja vivo',exact:true}).click();
 await page.setViewportSize({width:390,height:844});
 for(const route of ['/','/programas/','/sobre-jaime/','/precios/','/plataforma/']){
  await page.goto('http://127.0.0.1:3000'+route);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Horizontal overflow '+route);
  await page.screenshot({path:'artifacts/'+(route.split('/')[1]||'inicio')+'-mobile.png',fullPage:true});
 }
 await page.getByRole('button',{name:'Abrir menú'}).click();
 await page.getByRole('navigation').getByRole('link',{name:'Programas'}).click();
 await page.waitForURL('**/programas/');
 await page.goto('http://127.0.0.1:3000/');
 await page.getByRole('button',{name:'Conoce a Mr. O'}).click();
 await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
 assert.equal(await page.getByRole('dialog').count(),0);assert.deepEqual(errors,[]);
 console.log('PASS: five routes, programs, currency, theme persistence, mobile menu, modal and mobile overflow.');
}finally{await browser.close()}
