'use client';
import Link from 'next/link';
import Home, { Wordmark } from './home';
import ProgramsContent from './programs-content';
import Pricing from './pricing';
import TeacherProfile from './teacher-profile';
import {useLanguage,LanguageSwitcher,WhatsAppBubble} from './language';
import { useEffect, useState } from 'react';

function Reserve({children, light=false}:{children?:React.ReactNode,light?:boolean}){const {t,whatsapp:wa}=useLanguage();return <a className={`button ${light?'light':''}`} href={wa} target="_blank" rel="noreferrer">{children ?? t("Hablemos de tus metas")}</a>}

export default function School({page}:{page:string}) {
 const {t,whatsapp:wa}=useLanguage();
const nav = [['inicio','/',t("Inicio")],['programas','/programas/',t("Programas")],['jaime','/sobre-jaime/',t("Sobre Jaime")],['precios','/precios/',t("Precios")]];

 const [theme,setTheme]=useState('vivo'); const [menu,setMenu]=useState(false);
 useEffect(()=>{const t=localStorage.getItem('mro-theme'); if(t && ['vivo','tierra','mandarina'].includes(t)) setTheme(t)},[]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('mro-theme',theme)},[theme]);
 return <>
 <header><Link href="/" className="brand"><Wordmark/></Link><nav className={menu?'open':''} aria-label={t("Navegación principal")}>{nav.map(([id,url,label])=><Link className="nav-page-link" key={id} href={url} aria-current={page===id?'page':undefined} onClick={()=>setMenu(false)}>{label}</Link>)}<Link className="action-button mobile-platform-button" href="/plataforma/" onClick={()=>setMenu(false)}>{t("Mi plataforma")}</Link></nav><div className="header-actions"><Link href="/plataforma/" className="action-button hub-link">{t("Mi plataforma")}</Link><a className="small-cta" href={wa} target="_blank" rel="noreferrer">{t("Comienza hoy")}</a><LanguageSwitcher/><button className="menu-toggle" aria-label={t("Abrir menú")} aria-expanded={menu} onClick={()=>setMenu(!menu)}>☰</button></div></header>
 <main>
 {page==='inicio' && <Home/>}
 {page==='programas' && <ProgramsContent/>}
 {page==='jaime' && <TeacherProfile page/>}
 {page==='precios' && <Pricing/>}
 {page==='plataforma' && <section className="wrap inner-page hub-page"><div className="eyebrow">STUDENT LEARNING HUB</div><h1>{t("Tu aprendizaje")}<br/><em>{t("continúa aquí.")}</em></h1><p className="intro">{t("Materiales, actividades y recursos para acompañar tus clases.")}</p><div className="hub-notice"><span>◇</span><h2>{t("Acceso para estudiantes")}</h2><p>{t("Recibirás tus instrucciones de acceso de forma privada después de confirmar la reserva y el pago. Si ya eres estudiante, escríbele a Jaime para recuperar tu enlace.")}</p><Reserve>{t("Solicitar mi acceso")}</Reserve><small>{t("El acceso al Hub aún no está conectado a esta web.")}</small></div></section>}
 </main>
 <section className="closing"><div className="wrap"><div><span className="eyebrow">{t("¿LISTO PARA COMENZAR?")}</span><h2>{t("Tu próxima conversación")}<br/>{t("abre nuevas puertas.")}</h2></div><Reserve light>{t("Contáctame por WhatsApp")}</Reserve></div></section>
 <footer className="wrap"><div className="footer-main"><Link href="/" className="brand"><span><Wordmark/><small>{t("Aprende hoy. Abre nuevas puertas.")}</small></span></Link><div className="footer-links">{nav.map(([id,url,label])=><Link className="footer-page-link" href={url} key={id} aria-current={page===id?'page':undefined}>{label}</Link>)}<Link className="action-button" href="/plataforma/">{t("Mi plataforma")}</Link></div></div><div className="footer-bottom"><span>© 2026 Mr. O School · Jaime Ochoa</span><div className="theme-picker"><span>{t("Elige tu naranja")}</span>{[['vivo',t("Naranja vivo")],['tierra',t("Terracota")],['mandarina',t("Mandarina")]].map(([id,title])=><button key={id} title={title} aria-label={title} aria-pressed={theme===id} className={'swatch '+id} onClick={()=>setTheme(id)}/>)}</div><span>{t("Hecho para conectar.")}</span></div></footer>
 <WhatsAppBubble/>
 </>
}
