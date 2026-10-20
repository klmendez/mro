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
 const programsCarousel=page.getByRole('region',{name:'Nuestros programas',exact:true});
 assert.equal(await page.locator('.reference-program-card,.reference-testimonial-card').count(),0);
 await programsCarousel.getByRole('heading',{name:'Aprende inglés',exact:true}).waitFor();
 await programsCarousel.getByRole('button',{name:'Siguiente',exact:true}).click();
 await programsCarousel.getByRole('heading',{name:'Aprende español',exact:true}).waitFor();
 assert.equal(await programsCarousel.getByRole('link',{name:'Ver programa →',exact:true}).getAttribute('href'),'/programas/#espanol');
 await page.keyboard.press('ArrowRight');
 await programsCarousel.getByRole('heading',{name:'Preparación IELTS / TOEFL',exact:true}).waitFor();
 await programsCarousel.getByRole('button',{name:'Siguiente',exact:true}).click();
 await programsCarousel.getByRole('heading',{name:'Aprende inglés',exact:true}).waitFor();
 await programsCarousel.getByRole('button',{name:'Anterior',exact:true}).click();
 await programsCarousel.getByRole('heading',{name:'Preparación IELTS / TOEFL',exact:true}).waitFor();
 await programsCarousel.getByRole('button',{name:'Ver Aprende inglés',exact:true}).click();
 await programsCarousel.getByRole('heading',{name:'Aprende inglés',exact:true}).waitFor();
 await programsCarousel.evaluate(element=>{
  const start=new Touch({identifier:1,target:element,clientX:300,clientY:100});
  element.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[start]}));
  const end=new Touch({identifier:1,target:element,clientX:100,clientY:105});
  element.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[end]}));
 });
 await programsCarousel.getByRole('heading',{name:'Aprende español',exact:true}).waitFor();
 const testimonials=page.getByRole('region',{name:'Testimonios de estudiantes',exact:true});
 assert.match(await testimonials.innerText(),/Samantha\s*Fornaris/);
 assert.match(await testimonials.innerText(),/Hace cuatro años/);
 assert.equal(await testimonials.getByRole('button',{name:'Siguiente',exact:true}).isDisabled(),true);
 await testimonials.getByRole('button',{name:'Leer original en inglés',exact:false}).click();
 assert.match(await testimonials.locator('blockquote').innerText(),/Four years ago, I could barely put a sentence together in Spanish/);
 assert.match(await testimonials.locator('blockquote').innerText(),/I absolutely love them and am so grateful/);
 assert.equal(await testimonials.locator('blockquote').getAttribute('lang'),'en');
 await testimonials.getByRole('button',{name:'Ver traducción',exact:false}).click();
 assert.equal(await testimonials.locator('blockquote').getAttribute('lang'),'es');
 await page.getByRole('button',{name:'Precios internacionales',exact:true}).click();
 assert.match(await page.locator('.home-price-grid').innerText(),/US\$135/);
 await page.getByRole('button',{name:'Precios en Colombia',exact:true}).click();
 assert.match(await page.locator('.home-price-grid').innerText(),/360.000 COP/);
 assert.ok(await page.locator('h1').innerText().then(t=>t.includes('Aprende')&&t.includes('Encuentra')));
 assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).length),0);
 await page.getByRole('button',{name:'Conoce a Mr. O'}).click();
 await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
 assert.equal(await page.getByRole('dialog').count(),0);
 await page.getByRole('button',{name:'English',exact:true}).click();
 await page.getByRole('heading',{level:1}).filter({hasText:'Learn'}).waitFor();
 await page.getByRole('region',{name:'Our programs',exact:true}).getByRole('heading',{name:'Learn Spanish',exact:true}).waitFor();
 const englishQuote=page.getByRole('region',{name:'Student testimonials',exact:true}).locator('blockquote');
 assert.equal(await englishQuote.getAttribute('lang'),'en');
 assert.match(await englishQuote.innerText(),/Four years ago, I could barely put a sentence together in Spanish/);
 assert.equal(await page.locator('html').getAttribute('lang'),'en');
 assert.equal(await page.getByRole('button',{name:'English',exact:true}).getAttribute('aria-pressed'),'true');
 assert.match(await page.title(),/Find your voice/);
 assert.match(await page.locator('meta[name="description"]').getAttribute('content'),/Personalized English/);
 assert.match(await page.locator('.home-price-grid').innerText(),/lesson \/ week/);
 assert.match(await page.locator('.home-price-grid').innerText(),/\/ lesson/);
 const bubble=page.getByRole('link',{name:'Chat with Jaime on WhatsApp',exact:true});
 assert.equal(await bubble.evaluate(e=>getComputedStyle(e).position),'fixed');
 const contact=new URL(await bubble.getAttribute('href'));
 assert.equal(contact.pathname,'/573178948694');assert.match(contact.searchParams.get('text'),/Hi Jaime/);
 assert.equal(await page.locator('header .brand-logo').getAttribute('src'),'/images/logo.png');
 assert.equal(await page.locator('footer .brand-logo').getAttribute('src'),'/images/logo.png');
 await page.getByRole('button',{name:'Open menu'}).click();
 await page.getByRole('navigation').getByRole('link',{name:'Programs',exact:true}).click();
 await page.waitForURL('**/programas/');
 await page.getByRole('heading',{level:1}).filter({hasText:'Your goal.'}).waitFor();
 await page.getByRole('tab',{name:'Ñ Spanish'}).click();
 await page.getByRole('heading',{name:'Spanish: Make real connections.'}).waitFor();
 await page.getByRole('button',{name:'Español',exact:true}).click();
 await page.getByRole('heading',{name:'Español: Conecta de verdad.'}).waitFor();
 await page.getByRole('button',{name:'English',exact:true}).click();
 await page.reload();
 await page.getByRole('heading',{level:1}).filter({hasText:'Your goal.'}).waitFor();
 const englishRoutes=[['/','Learn'],['/programas/','Your goal.'],['/sobre-jaime/','Teaching languages.'],['/precios/','Your learning.'],['/plataforma/','Your learning']];
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const [route,heading] of englishRoutes){
   await page.goto('http://127.0.0.1:3000'+route);
   await page.getByRole('heading',{level:1}).filter({hasText:heading}).waitFor();
   assert.equal(await page.locator('html').getAttribute('lang'),'en');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'English overflow '+width+' '+route);
   assert.equal(await page.locator('nav a[href="/"]').textContent(),'Home');
   if(width===390||width===1440)await page.screenshot({path:'artifacts/'+(route.split('/')[1]||'inicio')+'-en-'+width+'.png',fullPage:true});
   if(route==='/precios/'){
    assert.match(await page.locator('.price-grid').innerText(),/WEEKLY PLAN/);
    await page.locator('summary').filter({hasText:'Are lessons online?'}).click();
    await page.getByText('Yes, you can take online lessons from anywhere in the world.',{exact:false}).waitFor();
   }
  }
 }
 await page.getByRole('button',{name:'Español',exact:true}).click();
 await page.reload();await page.getByRole('heading',{level:1}).filter({hasText:'Tu aprendizaje'}).waitFor();
 assert.deepEqual(errors,[]);
 console.log('PASS: ES/EN across five routes and four viewport sizes; persistence, metadata, translated FAQ/programs/prices, logos, WhatsApp, currencies, themes, menu and modal.');
}finally{await browser.close()}
