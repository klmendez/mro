'use client';
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import translations from './translations.json';

export type Locale='es'|'en';
const messages:Record<string,string>=translations;
export function translate(text:string,locale:Locale){
 if(locale==='es')return text;
 const key=text.trim();
 const value=messages[key];
 return value===undefined?text:text.replace(key,value);
}
const descriptions={es:'Clases personalizadas de inglés y español con Jaime Ochoa. Preparación IELTS y TOEFL. En línea en todo el mundo.',en:'Personalized English and Spanish lessons with Jaime Ochoa. IELTS and TOEFL preparation. Online worldwide.'};
const LanguageContext=createContext<{locale:Locale;setLocale:(locale:Locale)=>void;t:(text:string)=>string;whatsapp:string}|null>(null);
export function LanguageProvider({children}:{children:React.ReactNode}){
 const [locale,setLocale]=useState<Locale>('es');
 useEffect(()=>{try{if(localStorage.getItem('mro-language')==='en')setLocale('en')}catch{}},[]);
 useEffect(()=>{
  document.documentElement.lang=locale;
  document.title=locale==='en'?'Mr. O School — Learn the language. Find your voice.':'Mr. O School — Aprende el idioma. Encuentra tu voz.';
  document.querySelector('meta[name="description"]')?.setAttribute('content',descriptions[locale]);
 },[locale]);
 const changeLocale=useCallback((next:Locale)=>{setLocale(next);try{localStorage.setItem('mro-language',next)}catch{}},[]);
 const value=useMemo(()=>({locale,setLocale:changeLocale,t:(text:string)=>translate(text,locale),whatsapp:'https://wa.me/573178948694?text='+encodeURIComponent(locale==='en'?"Hi Jaime, I'd like to learn more about lessons at Mr. O School.":'Hola Jaime, quiero conocer las clases de Mr. O School.')}),[locale,changeLocale]);
 return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
export function useLanguage(){const value=useContext(LanguageContext);if(!value)throw new Error('LanguageProvider is required');return value}
export function LanguageSwitcher(){const {locale,setLocale}=useLanguage();return <div className="language-switcher" role="group" aria-label={locale==='es'?'Idioma del sitio':'Website language'}><button type="button" lang="es" aria-label="Español" aria-pressed={locale==='es'} onClick={()=>setLocale('es')}>ES</button><button type="button" lang="en" aria-label="English" aria-pressed={locale==='en'} onClick={()=>setLocale('en')}>EN</button></div>}
export function WhatsAppBubble(){const {locale,whatsapp}=useLanguage();const label=locale==='es'?'Chatea con Jaime por WhatsApp':'Chat with Jaime on WhatsApp';return <a className="whatsapp-bubble" href={whatsapp} aria-label={label} title={label} target="_blank" rel="noreferrer"><svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M16 .8A15.1 15.1 0 0 0 2.9 23.4L.8 31.2l8-2.1A15.2 15.2 0 1 0 16 .8Zm0 27.7a12.5 12.5 0 0 1-6.4-1.8l-.5-.3-4.7 1.3 1.3-4.6-.3-.5A12.5 12.5 0 1 1 16 28.5Zm7-9.3c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.3 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.2s1.4 3.7 1.6 4c.2.3 2.8 4.3 6.8 6 1 .4 1.7.6 2.3.8 1 .3 1.8.2 2.5.1.8-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5Z"/></svg></a>}
