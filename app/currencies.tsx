'use client';

export const currencies = ['cop','usd','eur','cny','jpy'] as const;
export type Currency = typeof currencies[number];
// ECB reference rates, 2026-10-29. All quoted per EUR; international fees use USD.
export const referenceRates = {eur:1/1.1130,cny:7.4144/1.1130,jpy:175.92/1.1130};
export function formatPrice(cop:string,usd:string,currency:Currency,locale:'es'|'en'){
 if(currency==='cop')return cop.replace(/ COP$/, '')+' COP';
 if(currency==='usd')return 'US$'+usd.replace(/^US\$/, '');
 const digits=currency==='jpy'?0:2;
 const parts=usd.replace(/^US\$/, '').split('\u2013').map(value=>new Intl.NumberFormat(locale==='es'?'es-CO':'en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits}).format(Number(value)*referenceRates[currency]));
 const symbol=currency==='eur'?'\u20ac':currency==='cny'?'CN\u00a5':'\u00a5';
 return symbol+parts.join('\u2013');
}
export function CurrencySelector({currency,onChange,locale,className}:{currency:Currency;onChange:(value:Currency)=>void;locale:'es'|'en';className:string}){
 const labels={cop:locale==='es'?'Peso colombiano':'Colombian peso',usd:locale==='es'?'Dólar estadounidense':'US dollar',eur:'Euro',cny:locale==='es'?'Yuan chino':'Chinese yuan',jpy:locale==='es'?'Yen japonés':'Japanese yen'};
 return <div className={className+' currency-options'} role="group" aria-label={locale==='es'?'Moneda de los precios':'Pricing currency'}>{currencies.map(code=><button type="button" key={code} aria-label={labels[code]} title={labels[code]} aria-pressed={currency===code} onClick={()=>onChange(code)}>{code.toUpperCase()} {code==='eur'?'\u20ac':code==='cny'?'CN\u00a5':code==='jpy'?'\u00a5':code==='usd'?'US$':'$'}</button>)}</div>;
}
export function ConversionNote({currency,locale}:{currency:Currency;locale:'es'|'en'}){
 if(currency==='cop'||currency==='usd')return null;
 return <p className="currency-conversion-note">{locale==='es'?'Equivalencias orientativas de las tarifas en USD. Cambio del 29/10/2026. Confirma el importe final y la moneda de pago con Jaime.':'Indicative equivalents of USD fees. Exchange rates dated 29 Oct 2026. Confirm the final amount and payment currency with Jaime.'} <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener noreferrer">{locale==='es'?'Fuente: BCE':'Source: ECB'}</a></p>;
}
