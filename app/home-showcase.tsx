'use client';

import Link from 'next/link';
import {useEffect,useState} from 'react';
import Carousel from './carousel';
import {useLanguage} from './language';

export function ProgramShowcase(){
 const {t,locale}=useLanguage();
 const [active,setActive]=useState(0);
 const [progress,setProgress]=useState(0);
 const [interacting,setInteracting]=useState(false);
 const [focused,setFocused]=useState(false);
 const [hidden,setHidden]=useState(false);
 const [reducedMotion,setReducedMotion]=useState(true);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncMotion=()=>setReducedMotion(media.matches);
  const syncVisibility=()=>setHidden(document.hidden);
  syncMotion();syncVisibility();
  media.addEventListener('change',syncMotion);document.addEventListener('visibilitychange',syncVisibility);
  return()=>{media.removeEventListener('change',syncMotion);document.removeEventListener('visibilitychange',syncVisibility)};
 },[]);
 useEffect(()=>{
  setProgress(0);
  if(interacting||focused||hidden||reducedMotion)return;
  const started=performance.now();
  const timer=window.setInterval(()=>{
   const elapsed=performance.now()-started;
   setProgress(Math.min(elapsed/8000,1));
   if(elapsed>=8000){window.clearInterval(timer);setActive(value=>(value+1)%3)}
  },50);
  return()=>window.clearInterval(timer);
 },[active,interacting,focused,hidden,reducedMotion]);
 const programs=[
  {id:'ingles',image:'english.png',mark:'Aa',title:t('Aprende inglés'),audience:t('Para hispanohablantes.'),description:t('Desarrolla un inglés práctico para comunicarte en situaciones reales, desde tu punto de partida hasta donde quieras llegar.'),alt:locale==='es'?'Personas practicando inglés en una conversación':'People practicing English in a conversation'},
  {id:'espanol',image:'spanish.png',mark:'Ñ',title:t('Aprende español'),audience:t('Para angloparlantes.'),description:t('Desarrolla un español práctico para comunicarte con naturalidad en situaciones reales y significativas.'),alt:locale==='es'?'Personas aprendiendo español mediante la conversación':'People learning Spanish through conversation'},
  {id:'examenes',image:'exam.jpg',mark:'◎',title:t('Preparación IELTS / TOEFL'),audience:t('Para tus objetivos de examen.'),description:t('Preparación enfocada con estrategias, práctica y retroalimentación.'),alt:t('Cuaderno para la práctica y preparación de exámenes')}
 ];
 return <section className="programs-section" aria-labelledby="programs-heading"><div className="program-time-track" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div><div className="wrap reference-programs programs-showcase">
  <div className="program-explorer" onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false)}}>
   <div className="program-explorer-navigation"><div className="section-heading"><div><div className="programs-mobile-heading-row"><h2 id="programs-heading">{t('Nuestros programas')}</h2><Link className="action-button programs-mobile-view-all" href="/programas/">{locale==='es'?'Ver todos':'View all'}</Link></div><p className="programs-section-subtitle">{t('Un camino para cada objetivo.')}</p></div></div><div className="program-accordion">{programs.map((program,i)=><article className={'program-accordion-item '+(active===i?'is-open':'')} key={program.id}>
    <h3><button type="button" id={'program-trigger-'+program.id} aria-expanded={active===i} aria-controls={'program-panel-'+program.id} onClick={()=>setActive(i)}><span className="program-list-number" aria-hidden="true">0{i+1}</span><span>{program.title}</span><span className="program-list-toggle" aria-hidden="true">{active===i?'−':'+'}</span></button></h3>
   </article>)}</div></div>
   <div className="program-explorer-details">{programs.map((program,i)=><div id={'program-panel-'+program.id} className="program-detail-panel" role="region" aria-labelledby={'program-trigger-'+program.id} hidden={active!==i} key={program.id}><div className="program-detail-copy"><h3 className="program-audience-title">{program.audience}</h3><p>{program.description}</p><Link className="action-button" href={'/programas/#'+program.id}>{t('Ver programa')}</Link></div><div className="program-detail-image"><img src={'/images/'+program.image} alt={program.alt} width="1448" height="1086" loading="lazy"/></div></div>)}</div>
  </div>
 </div></section>
}

type Testimonial = {
 id: string; name: string; initials: string; flag: string; country: {es: string; en: string};
 role: {es: string; en: string}; student: {es: string; en: string}; lang: string; text: string[];
};

const testimonials: Testimonial[] = [
 {
  id:'carlos', name:'Carlos Narváez', initials:'CN', flag:'co', country:{es:'Colombia',en:'Colombia'},
  role:{es:'Ingeniero Electrónico y Telecomunicaciones',en:'Electronics and Telecommunications Engineer'},
  student:{es:'Estudiante de inglés desde 2024',en:'English student since 2024'}, lang:'en',
  text:[`Mr. Ochoa's lessons are very dynamic from singing songs in english to watching interesting news stories from for example the BBC. While you improve your english, you also learn about ecology, animals, plants, music, politics, and curious news from around the world.`,
  `His method makes you want to speak English every day, and it helps you improve your accent, vocabulary, listening, and writing. Thanks to his classes, I felt much more confident going into job interviews in English, and after practicing with Mr. Ochoa, I actually got a new job. I highly recommend him!`]
 },
 {
  id:'samantha', name:'Samantha Fornaris', initials:'SF', flag:'us', country:{es:'Estados Unidos',en:'United States'},
  role:{es:'Nutricionista',en:'Nutritionist'}, student:{es:'Estudiante de español desde 2021',en:'Spanish student since 2021'}, lang:'es',
  text:[`Hace cuatro años, apenas hablaba español en frases completas. Ahora leo libros, veo series (¡y telenovelas!), canto canciones, y hasta entablo conversaciones con desconocidos, ¡todo gracias a Jaime (también conocido como Mr. O)!`,
  `Jaime tiene una manera especial de hacer que aprender español se sienta divertido, interactivo y útil para la vida real. Nuestras clases están llenas de risas y él es muy cálido y alentador. Nunca me hace sentir intimidada ni con miedo de cometer errores. Al mismo tiempo, él siempre sabe cómo desafiarme y empujarme fuera de mi zona de confort, lo que me ha ayudado a crecer. Él es auténtico, tiene una fuerte pasión por enseñar y con los años, se ha convertido en un gran amigo. ¡Hay una razón por la que he estado aprendiendo con Jaime por años!`,
  `¡Me encantan sus clases completamente y estoy muy agradecida por la confianza que él me ha dado para hablar español!`]
 },
 {
  id:'estefania', name:'Estefanía Ascencio', initials:'EA', flag:'es', country:{es:'España',en:'Spain'},
  role:{es:'Research Fellow in Computer Science/AI models',en:'Research Fellow in Computer Science/AI models'},
  student:{es:'Estudiante de IELTS desde enero de 2026',en:'IELTS student since January 2026'}, lang:'en',
  text:[`My experience with Mr. O has been truly rewarding. Throughout my IELTS preparation, I have noticed myself becoming more confident speaking English with every class. His varied teaching methods have helped me understand what I hear more easily, respond more spontaneously, and expand my vocabulary.`,
  `I especially appreciate his dedication and his warm, personalised support. He has taken the time to identify my difficulties and help me overcome them step by step, including through extra exercises outside class. Alongside speaking, we have also worked on listening, writing, and reading, all of which have been essential to my preparation.`]
 },
 {
  id:'gabriela', name:'Gabriela Catuche', initials:'GC', flag:'co', country:{es:'Colombia',en:'Colombia'},
  role:{es:'Ingeniera Electrónica',en:'Electronics Engineer'}, student:{es:'Estudiante de inglés desde febrero de 2026',en:'English student since February 2026'}, lang:'en',
  text:[`I've been taking classes with Jaime for a few months, and I feel that my English has improved a lot.`,
  `Before contacting Jaime, I paid for an academic English course, but I realized that I needed more than just traditional classes. At first, I felt nervous about speaking English, but as I continued taking classes with him, I became more confident and started to see improvements in my English level.`,
  `I'm currently taking classes with Jaime because I'd like to study abroad. I know I need to improve my communication skills and develop other skills as well, and Jaime helps me work towards these goals.`,
  `His teaching style focuses on practice and building self-confidence. His classes are fun and engaging, and I feel comfortable expressing my ideas without being afraid of making mistakes. He corrects me when necessary, and we use my mistakes as opportunities to practice and improve.`,
  `I'm really happy with my progress, and I would recommend his classes to anyone who wants to improve their English and feel more confident speaking it.`]
 },
 {
  id:'david', name:'Dávid Hajdu', initials:'DH', flag:'hu', country:{es:'Hungría',en:'Hungary'},
  role:{es:'Ingeniero de Machine Learning · Budapest',en:'Machine Learning Engineer · Budapest'}, student:{es:'Estudiante de español',en:'Spanish student'}, lang:'en',
  text:[`I strongly recommend Jaime as a Spanish instructor. He excels at structuring lessons around topics that personally interest me, making conversation practice effortless and engaging. His ability to balance core grammar with personalized content has greatly accelerated my language learning.`]
 }
];

// Original dimensions and square portrait framing: width, height, x, y, size.
const portraitFrames: Record<string, [number, number, number, number, number]> = {
 carlos:[311,354,0,0,311],
 samantha:[470,705,35,80,390],
 estefania:[434,491,18,15,302],
 gabriela:[1072,634,70,40,540],
 david:[555,735,155,200,245]
};

function TestimonialPortrait({person}: {person: Testimonial}){
 const [width,height,x,y,size]=portraitFrames[person.id];
 return <span className="testimonial-portrait"><img src={'/images/testimonials/'+person.id+'.jpeg'} alt={person.name} width={width} height={height} loading="lazy" style={{width:`${width/size*100}%`,height:`${height/size*100}%`,left:`${-x/size*100}%`,top:`${-y/size*100}%`}}/></span>;
}

export function TestimonialShowcase(){
 const {t,locale}=useLanguage();
 const [reading,setReading]=useState<number|null>(null);
 const [playing,setPlaying]=useState(false);
 const selected=reading===null?null:testimonials[reading];
 return <section id="testimonios" className="wrap reference-testimonials testimonials-showcase centered-testimonials" aria-labelledby="testimonials-heading">
  <div className="section-heading"><div><h2 id="testimonials-heading">{locale==='es'?'Testimonios':'Testimonials'}</h2><p className="testimonials-subtitle">{locale==='es'?'Cada voz, un camino.':'Every voice, a journey.'}</p></div></div>
  <article className="featured-testimonial" aria-labelledby="featured-testimonial-heading">
   <div className="featured-testimonial-copy"><div className="eyebrow">{locale==='es'?'MARIALEJANDRA OCHOA':'MARIALEJANDRA OCHOA'}</div><h3 id="featured-testimonial-heading">{locale==='es'?'El bilingüismo, en primera persona.':'Bilingualism, in her own words.'}</h3><p>{locale==='es'?'Una experiencia personal con el bilingüismo y el aprendizaje de idiomas. Escucha su historia.':'A personal experience with bilingualism and language learning. Hear her story.'}</p><a className="action-button" href="https://www.youtube.com/watch?v=MCzNhIQKHQo" target="_blank" rel="noopener noreferrer">{locale==='es'?'Ver en YouTube':'Watch on YouTube'} ↗</a></div>
   <div className="featured-testimonial-video">{playing?<iframe src="https://www.youtube-nocookie.com/embed/MCzNhIQKHQo?autoplay=1&rel=0" title={locale==='es'?'Marialejandra Ochoa comparte su experiencia con el bilingüismo':"Marialejandra Ochoa shares her experience with bilingualism"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>:<button type="button" className="featured-video-play" onClick={()=>setPlaying(true)} aria-label={locale==='es'?'Reproducir testimonio en video':'Play video testimonial'}><img src="https://i.ytimg.com/vi/MCzNhIQKHQo/hqdefault.jpg" alt="" loading="lazy"/><span className="featured-video-play-icon" aria-hidden="true">▶</span><span className="featured-video-label">{locale==='es'?'Escucha su historia':'Hear her story'}</span></button>}</div>
  </article>
  <Carousel id="testimonials-carousel" label={locale==='es'?'Testimonios de estudiantes':'Student testimonials'} className="testimonial-carousel center-testimonial-carousel" centerMode simpleControls pauseAutoplay={reading!==null||playing} slides={testimonials.map((person,i)=>({id:person.id,label:person.name,content:<figure className="center-testimonial"><span className="center-quote-symbol" aria-hidden="true">&ldquo;</span><blockquote lang={person.lang}><p>{person.text[0]}</p></blockquote><figcaption><TestimonialPortrait person={person}/><div><h3>{person.name} <img className="testimonial-flag" src={'/images/flags/'+person.flag+'.svg'} alt={person.country[locale]} title={person.country[locale]} width="24" height="16"/></h3><p>{person.role[locale]}</p><p>{person.student[locale]}</p><button type="button" className="action-button testimonial-read-more" onClick={()=>setReading(i)}>{locale==='es'?'Leer testimonio':'Read testimonial'}</button></div></figcaption></figure>}))} />
  {selected&&<dialog className="testimonial-dialog" ref={element=>{if(element&&!element.open)element.showModal()}} onCancel={()=>setReading(null)} onClick={event=>{if(event.target===event.currentTarget){const bounds=event.currentTarget.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)setReading(null)}}} aria-labelledby="full-testimonial-heading"><button type="button" autoFocus className="testimonial-dialog-close" aria-label={locale==='es'?'Cerrar':'Close'} onClick={()=>setReading(null)}>&times;</button><TestimonialPortrait person={selected}/><h3 id="full-testimonial-heading">{selected.name} <img className="testimonial-flag" src={'/images/flags/'+selected.flag+'.svg'} alt={selected.country[locale]} title={selected.country[locale]} width="24" height="16"/></h3><p className="testimonial-profile">{selected.role[locale]}<br/>{selected.student[locale]}</p><blockquote lang={selected.lang}>{selected.text.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</blockquote></dialog>}
 </section>
}
