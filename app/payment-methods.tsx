import {useLanguage} from './language';

export default function PaymentMethods(){
 const {locale}=useLanguage();
 return <ul className="payment-methods" aria-label={locale==='es'?'Opciones de pago':'Payment methods'}>
  <li><svg className="payment-paypal" viewBox="0 0 32 32" aria-hidden="true"><path fill="#003087" d="M10 4h10c7 0 9 4 7 10-1 5-5 7-11 7h-3l-1 7H6z"/><path fill="#009cde" d="M14 10h9c6 0 7 4 5 9-1 4-4 6-9 6h-3l-1 6H9z"/><path fill="#012169" d="m14 10-2 11h4c6 0 10-2 11-7l.3-2c-1-1-3-2-5-2z"/></svg><span>PayPal<small>{locale==='es'?'Pago en línea':'Online payment'}</small></span></li>
  <li><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="3" width="26" height="26" rx="8" fill="#200020"/><circle cx="12" cy="12" r="4" fill="#ff008e"/><circle cx="21" cy="21" r="4" fill="#00d5e0"/><path d="m13 21 7-10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg><span>Nequi<small>{locale==='es'?'En Colombia':'In Colombia'}</small></span></li>
  <li><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 10 13-7 13 7v3H3zM6 16v9m7-9v9m6-9v9m7-9v9M3 29h26"/><path d="M4 25h24"/></svg><span>{locale==='es'?'Transferencia bancaria':'Bank transfer'}<small>{locale==='es'?'Datos por privado':'Details shared privately'}</small></span></li>
 </ul>;
}
