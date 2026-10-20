import assert from 'node:assert/strict';
import {launchBrowser,baseURL} from './browser.mjs';
const browser=await launchBrowser();
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
 await page.clock.install();await page.goto(baseURL+'/');
 await page.locator('#program-trigger-ingles').waitFor();await page.mouse.move(0,0);await page.clock.runFor(1000);await page.clock.runFor(8000);
 assert.equal(await page.locator('#program-trigger-espanol').getAttribute('aria-expanded'),'true');
 await page.locator('#program-trigger-examenes').click();await page.clock.runFor(16000);
 assert.equal(await page.locator('#program-panel-examenes').isVisible(),true);
 await page.goto(baseURL+'/programas/');await page.mouse.move(0,0);await page.clock.runFor(6000);
 assert.equal(await page.locator('.lesson-timeline .is-active h2').innerText(),'Usar');
 await page.locator('.timeline-point').nth(3).click();
 assert.equal(await page.locator('.lesson-timeline .is-active h2').innerText(),'Reflexionar');
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(baseURL+'/');await page.clock.runFor(18000);
 assert.equal(await page.locator('#program-trigger-ingles').getAttribute('aria-expanded'),'true');
 console.log('PASS: program autoplay, focus pause, timeline and reduced motion.');
}finally{await browser.close()}
