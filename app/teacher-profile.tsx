'use client';

import Link from 'next/link';
import {useLanguage} from './language';

export default function TeacherProfile({page=false}:{page?:boolean}){
 const {locale,t}=useLanguage();
 const copy=(es:string,en:string)=>locale==='es'?es:en;
 const links=[
  {label:copy('Perfil de traductor TED','TED translator profile'),href:'https://www.ted.com/profiles/521925/translator'},
  {label:copy('Presentación COP16','COP16 presentation'),href:'https://www.youtube.com/watch?v=ztxMbes-Sp0&t=2524s'},
  {label:copy('Perfil de LinkedIn','LinkedIn profile'),href:'https://www.linkedin.com/in/jaime-ochoa-2a968b75/'}
 ];
 return <section className={'teacher-profile '+(page?'teacher-profile-page':'teacher-profile-home')} aria-labelledby="teacher-profile-title"><div className="wrap">
  <div className="teacher-profile-heading"><span className="eyebrow">{t('CONOCE A TU PROFESOR')}</span>{page?<h1 id="teacher-profile-title">Jaime Ochoa</h1>:<h2 id="teacher-profile-title">Jaime Ochoa</h2>}<p>{copy('Educador y Ecólogo · Traductor TED','Educator and Ecologist · TED Translator')}</p></div>
  <div className="teacher-profile-layout"><figure className="teacher-profile-photo">{page?<img src="/images/jaime-about.png" alt={copy('Jaime Ochoa, educador de idiomas','Jaime Ochoa, language educator')} width="1086" height="1448" loading="eager"/>:<video controls playsInline preload="metadata" poster="/images/jaime-video-poster-1s.jpg" aria-label={copy('Video de presentaci\u00f3n de Jaime Ochoa','Jaime Ochoa introduction video')}><source src="/videos/jaime-1020.mp4" type="video/mp4"/>{copy('Tu navegador no puede reproducir este video.','Your browser cannot play this video.')}</video>}</figure><div className="teacher-profile-copy"><p>{t('Con más de 30 años de experiencia enseñando, ayudo a estudiantes a comunicarse con claridad y naturalidad en inglés o español.')}</p>
   {page?<><div className="teacher-profile-links">{links.map(link=><a className="action-button" key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}</div><div className="teacher-profile-qr"><img src="/images/jaime-ted-qr.svg" width="132" height="132" alt={copy('Código QR al perfil TED de Jaime Ochoa','QR code to Jaime Ochoa TED profile')}/><div><h3>{copy('Escanea para ver mi perfil en TED','Scan to view my TED profile')}</h3><a className="action-button" href="https://www.ted.com/profiles/521925" target="_blank" rel="noreferrer">{copy('Abrir perfil TED','Open TED profile')}</a></div></div></>:<Link className="button teacher-profile-about-button" href="/sobre-jaime/">{copy('Conoce más sobre Jaime','Get to know Jaime')}</Link>}
  </div></div>
 </div></section>;
}
