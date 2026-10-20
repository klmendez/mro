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

const samantha={
 en:[
  'Four years ago, I could barely put a sentence together in Spanish. Now I’m reading books, watching shows, singing songs, and striking up conversations with strangers, all thanks to Jaime!',
  'He has a way of making learning Spanish feel fun, interactive, and relevant to real life. Our classes are full of laughter, and he is so warm and encouraging that you never feel intimidated or afraid to make mistakes. At the same time, he always knows how to challenge me and push me outside of my comfort zone, which has helped me grow so much. He is authentic, genuinely passionate about teaching, and, over the years, has become a true friend. There’s a reason I’ve been coming back to his classes for four years. I absolutely love them and am so grateful for the confidence he’s given me in speaking Spanish!'
 ],
 es:[
  'Hace cuatro años, apenas podía formar una frase en español. Ahora leo libros, veo series, canto canciones e inicio conversaciones con desconocidos, ¡todo gracias a Jaime!',
  'Él tiene una manera de hacer que aprender español sea divertido, interactivo y relevante para la vida real. Nuestras clases están llenas de risas, y él es tan cálido y alentador que nunca te sientes intimidada ni tienes miedo de cometer errores. Al mismo tiempo, siempre sabe cómo retarme y animarme a salir de mi zona de confort, lo que me ha ayudado a crecer muchísimo. Es auténtico, le apasiona de verdad enseñar y, con los años, se ha convertido en un verdadero amigo. Por algo llevo cuatro años volviendo a sus clases. ¡Me encantan y estoy muy agradecida por la confianza que me ha dado para hablar español!'
 ]
};

const testimonials=[
 {id:'samantha',name:'Samantha Fornaris',initials:'SF',simulated:false,role:{es:'Estudiante de español · EE. UU.',en:'Spanish student · USA'},text:samantha},
 {id:'laura',name:'Laura Méndez',initials:'LM',simulated:true,role:{es:'Estudiante de inglés',en:'English student'},text:{
  es:['Antes ensayaba cada frase en mi cabeza. Ahora me animo a participar en conversaciones en inglés, aunque no tenga todas las palabras.','Las clases combinan conversaciones cotidianas con ejercicios que puedo aplicar durante la semana. Me gusta recibir correcciones claras y tener espacio para volver a intentarlo a mi ritmo.'],
  en:['I used to rehearse every sentence in my head. Now I feel ready to join conversations in English, even when I don’t know every word.','Classes combine everyday conversations with exercises I can use during the week. I like getting clear feedback and having room to try again at my own pace.']
 }},
 {id:'daniel',name:'Daniel Brooks',initials:'DB',simulated:true,role:{es:'Estudiante de español',en:'Spanish student'},text:{
  es:['Quería aprender español para conectar con las personas durante mis viajes. Practicar situaciones reales hace que cada clase tenga sentido para mí.','Trabajamos con temas que me interesan, desde pedir comida hasta contar una experiencia. Poco a poco me siento más cómodo escuchando, haciendo preguntas y manteniendo una conversación.'],
  en:['I wanted to learn Spanish to connect with people while traveling. Practicing real situations makes every class feel meaningful to me.','We work on topics I care about, from ordering food to sharing an experience. Little by little, I feel more comfortable listening, asking questions, and keeping a conversation going.']
 }}

];

export function TestimonialShowcase(){
 const {t,locale}=useLanguage();
 const [reading,setReading]=useState<number|null>(null);
 const selected=reading===null?null:testimonials[reading];
 return <section className="wrap reference-testimonials testimonials-showcase centered-testimonials" aria-labelledby="testimonials-heading">
  <div className="section-heading"><div><div className="eyebrow">{t('TESTIMONIOS')}</div><h2 id="testimonials-heading">{locale==='es'?'Cada voz, un camino.':'Every voice, a journey.'}</h2></div></div>
  <Carousel id="testimonials-carousel" label={locale==='es'?'Testimonios de estudiantes':'Student testimonials'} className="testimonial-carousel center-testimonial-carousel" centerMode simpleControls pauseAutoplay={reading!==null} slides={testimonials.map((person,i)=>({id:person.id,label:person.name,content:<figure className="center-testimonial"><span className="center-quote-symbol" aria-hidden="true">&ldquo;</span><blockquote lang={locale}><p>{person.text[locale][0]}</p></blockquote><figcaption><span className="center-initials" aria-hidden="true">{person.initials}</span><div><h3>{person.name}</h3><p>{person.role[locale]}</p>{person.simulated&&<small className="testimonial-simulation">{locale==='es'?'Testimonio simulado':'Simulated testimonial'}</small>}<button type="button" className="action-button testimonial-read-more" onClick={()=>setReading(i)}>{locale==='es'?'Ver testimonio completo':'View full testimonial'}</button></div></figcaption></figure>}))} />
  {selected&&<dialog className="testimonial-dialog" ref={element=>{if(element&&!element.open)element.showModal()}} onCancel={()=>setReading(null)} onClick={event=>{if(event.target===event.currentTarget){const bounds=event.currentTarget.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)setReading(null)}}} aria-labelledby="full-testimonial-heading"><button type="button" autoFocus className="testimonial-dialog-close" aria-label={locale==='es'?'Cerrar':'Close'} onClick={()=>setReading(null)}>&times;</button><h3 id="full-testimonial-heading">{selected.name}</h3>{selected.simulated&&<p className="testimonial-example-note">{locale==='es'?'Testimonio simulado · Persona y experiencia de ejemplo.':'Simulated testimonial · Example person and experience.'}</p>}<blockquote lang={locale}>{selected.text[locale].map((paragraph,i)=><p key={i}>{paragraph}</p>)}</blockquote></dialog>}
 </section>
}
