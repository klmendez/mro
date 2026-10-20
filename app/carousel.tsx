'use client';

import {useEffect, useRef, useState} from 'react';
import {useLanguage} from './language';

type Slide={id:string;label:string;content:React.ReactNode};
export default function Carousel({id,label,slides,className='',pauseAutoplay=false,onSlideChange}:{id:string;label:string;slides:Slide[];className?:string;pauseAutoplay?:boolean;onSlideChange?:()=>void}){
 const {locale}=useLanguage();
 const [index,setIndex]=useState(0);
 const [paused,setPaused]=useState(false);
 const [hovered,setHovered]=useState(false);
 const [focused,setFocused]=useState(false);
 const [hidden,setHidden]=useState(false);
 const [reducedMotion,setReducedMotion]=useState(false);
 const touch=useRef<{x:number;y:number}|null>(null);
 const changeCallback=useRef(onSlideChange);
 changeCallback.current=onSlideChange;
 useEffect(()=>{changeCallback.current?.()},[index]);
 const multiple=slides.length>1;
 const playing=multiple&&!paused&&!hovered&&!focused&&!hidden&&!reducedMotion&&!pauseAutoplay;
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion=()=>setReducedMotion(media.matches);
  const visibility=()=>setHidden(document.hidden);
  motion();visibility();media.addEventListener('change',motion);document.addEventListener('visibilitychange',visibility);
  return()=>{media.removeEventListener('change',motion);document.removeEventListener('visibilitychange',visibility)};
 },[]);
 useEffect(()=>{
  if(!playing)return;
  const timer=window.setTimeout(()=>setIndex(value=>(value+1)%slides.length),8000);
  return()=>window.clearTimeout(timer);
 },[playing,index,slides.length]);
 if(slides.length===0)return null;
 const current=index%slides.length;
 const slide=slides[current];
 const move=(direction:number)=>setIndex(value=>(value+direction+slides.length)%slides.length);
 const es=locale==='es';
 return <div className={`showcase-carousel ${className}`} role="region" aria-roledescription={es?'carrusel':'carousel'} aria-label={label}
  onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
  onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false)}}
  onKeyDown={event=>{if(multiple&&(event.key==='ArrowRight'||event.key==='ArrowLeft')){event.preventDefault();move(event.key==='ArrowRight'?1:-1)}}}
  onTouchStart={event=>{const point=event.touches[0];touch.current={x:point.clientX,y:point.clientY}}}
  onTouchEnd={event=>{const point=event.changedTouches[0];if(touch.current&&multiple){const dx=point.clientX-touch.current.x;const dy=point.clientY-touch.current.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1)}touch.current=null}}
  onTouchCancel={()=>{touch.current=null}}>
  <div id={`${id}-slide`} className="showcase-slide" role="group" aria-roledescription={es?'diapositiva':'slide'} aria-label={`${current+1} ${es?'de':'of'} ${slides.length}: ${slide.label}`} key={slide.id}>{slide.content}</div>
  <div className="carousel-footer">
   <div className="carousel-progress" aria-live={playing?'off':'polite'} aria-atomic="true"><strong>{String(current+1).padStart(2,'0')}</strong><span>/ {String(slides.length).padStart(2,'0')}</span><span className="sr-only">{slide.label}</span></div>
   {multiple&&<button type="button" className="carousel-toggle" aria-label={paused||reducedMotion?(es?'Reproducir carrusel':'Play carousel'):(es?'Pausar carrusel':'Pause carousel')} onClick={()=>{if(reducedMotion){setReducedMotion(false);setPaused(false)}else setPaused(value=>!value)}}>{paused||reducedMotion?'▷':'Ⅱ'}</button>}
   {multiple&&<div className="carousel-dots" aria-label={es?'Elegir diapositiva':'Choose a slide'}>{slides.map((item,i)=><button type="button" key={item.id} aria-label={`${es?'Ver':'View'} ${item.label}`} aria-current={i===current?'true':undefined} aria-controls={`${id}-slide`} onClick={()=>setIndex(i)}><span/></button>)}</div>}
   <div className="carousel-arrows"><button type="button" disabled={!multiple} aria-label={es?'Anterior':'Previous'} aria-controls={`${id}-slide`} onClick={()=>move(-1)}>←</button><button type="button" disabled={!multiple} aria-label={es?'Siguiente':'Next'} aria-controls={`${id}-slide`} onClick={()=>move(1)}>→</button></div>
  </div>
 </div>
}
