'use client';

import Link from 'next/link';
import {useState} from 'react';
import Carousel from './carousel';
import {useLanguage} from './language';

export function ProgramShowcase(){
 const {t,locale}=useLanguage();
 const programs=[
  {id:'ingles',image:'english.png',mark:'Aa',title:t('Aprende inglés'),audience:t('Para hispanohablantes.'),description:t('Desarrolla un inglés práctico para comunicarte en situaciones reales, desde tu punto de partida hasta donde quieras llegar.'),alt:locale==='es'?'Personas practicando inglés en una conversación':'People practicing English in a conversation'},
  {id:'espanol',image:'spanish.png',mark:'Ñ',title:t('Aprende español'),audience:t('Para angloparlantes.'),description:t('Desarrolla un español práctico para comunicarte con naturalidad en situaciones reales y significativas.'),alt:locale==='es'?'Personas aprendiendo español mediante la conversación':'People learning Spanish through conversation'},
  {id:'examenes',image:'exam.jpg',mark:'◎',title:t('Preparación IELTS / TOEFL'),audience:t('Para tus objetivos de examen.'),description:t('Preparación enfocada con estrategias, práctica y retroalimentación.'),alt:t('Cuaderno para la práctica y preparación de exámenes')}
 ];
 return <section className="programs-section" aria-labelledby="programs-heading"><div className="wrap reference-programs programs-showcase">
  <div className="section-heading"><div><div className="eyebrow">{t('NUESTROS PROGRAMAS')}</div><h2 id="programs-heading">{t('Un camino para cada objetivo.')}</h2></div><Link className="underlink" href="/programas/">{t('Conoce todos los programas')} <span>→</span></Link></div>
  <Carousel id="programs-carousel" label={locale==='es'?'Nuestros programas':'Our programs'} slides={programs.map(program=>({id:program.id,label:program.title,content:<article className="program-editorial"><Link href={'/programas/#'+program.id} className="program-editorial-image" aria-label={program.title}><img src={'/images/'+program.image} alt={program.alt} width="1448" height="1086"/></Link><div className="program-editorial-copy"><span className="program-editorial-mark" aria-hidden="true">{program.mark}</span><span className="eyebrow">{program.audience}</span><h3>{program.title}</h3><p>{program.description}</p><Link className="underlink" href={'/programas/#'+program.id}>{t('Ver programa →')}</Link></div></article>}))}/>
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

export function TestimonialShowcase(){
 const {t,locale}=useLanguage();
 const [showOriginal,setShowOriginal]=useState(false);
 const [reading,setReading]=useState(false);
 const quoteLocale=locale==='en'||showOriginal?'en':'es';
 return <section className="wrap reference-testimonials testimonials-showcase" aria-labelledby="testimonials-heading">
  <div className="section-heading"><div><div className="eyebrow">{t('TESTIMONIOS')}</div><h2 id="testimonials-heading">{t('Historias reales.')}<br/>{t('Resultados reales.')}</h2></div></div>
  <Carousel id="testimonials-carousel" label={locale==='es'?'Testimonios de estudiantes':'Student testimonials'} className="testimonial-carousel" pauseAutoplay={reading} onSlideChange={()=>setReading(false)} slides={[{id:'samantha-fornaris',label:'Samantha Fornaris',content:<figure className="testimonial-editorial"><figcaption className="testimonial-author"><span className="testimonial-initials" aria-hidden="true">SF</span><h3>Samantha Fornaris</h3><p>{locale==='es'?'Estudiante de español · EE. UU.':'Spanish student · USA'}</p><span className="eyebrow">{locale==='es'?'Clases desde la pandemia':'Taking lessons since the pandemic'}</span></figcaption><div className="testimonial-words"><span className="editorial-quote" aria-hidden="true">“</span><blockquote lang={quoteLocale}><p>{samantha[quoteLocale][0]}</p><details className="full-testimonial" onToggle={event=>setReading(event.currentTarget.open)}><summary>{locale==='es'?'Leer testimonio completo':'Read the full testimonial'} <span>+</span></summary><p>{samantha[quoteLocale][1]}</p></details></blockquote>{locale==='es'&&<div className="quote-language"><span>{showOriginal?'Original en inglés':'Traducción del original en inglés'}</span><button type="button" aria-pressed={showOriginal} onClick={()=>setShowOriginal(value=>!value)}>{showOriginal?'Ver traducción':'Leer original en inglés'} <span>↗</span></button></div>}</div></figure>}]} />
 </section>
}
