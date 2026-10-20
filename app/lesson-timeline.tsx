'use client';

import {useEffect,useState} from 'react';
import {useLanguage} from './language';

export default function LessonTimeline({steps}:{steps:string[][]}){
 const {locale}=useLanguage();
 const [active,setActive]=useState(0);
 const [hovered,setHovered]=useState(false);
 const [focused,setFocused]=useState(false);
 const [reduced,setReduced]=useState(true);
 const [hidden,setHidden]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion=()=>setReduced(media.matches);
  const visibility=()=>setHidden(document.hidden);
  motion();visibility();media.addEventListener('change',motion);document.addEventListener('visibilitychange',visibility);
  return()=>{media.removeEventListener('change',motion);document.removeEventListener('visibilitychange',visibility)};
 },[]);
 useEffect(()=>{
  if(hovered||focused||reduced||hidden)return;
  const timer=window.setTimeout(()=>setActive(value=>(value+1)%steps.length),5000);
  return()=>window.clearTimeout(timer);
 },[active,hovered,focused,reduced,hidden,steps.length]);
 return <ol className="lesson-timeline" aria-label={locale==='es'?'Etapas de una clase':'Stages of a lesson'} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false)}}>{steps.map(([number,title,description],i)=><li key={number} className={`${i===active?'is-active':''} ${i<active?'is-complete':''}`}>
  <button type="button" className="timeline-point" aria-label={(locale==='es'?'Ver etapa ':'View stage ')+number+': '+title} aria-current={i===active?'step':undefined} aria-expanded={i===active} aria-controls={'lesson-stage-'+number} onClick={()=>setActive(i)}><span aria-hidden="true">{number}</span></button>
  <div className="timeline-copy"><h2>{title}</h2><div id={'lesson-stage-'+number} hidden={i!==active}><p>{description}</p></div></div>
 </li>)}</ol>;
}
