'use client';

import {useId} from 'react';
import {useLanguage} from './language';

type Plan={title:string;price:string;unit:string;features:string[];href:string};
export default function MobilePriceList({plans}:{plans:Plan[]}){
 const group=useId();
 const {locale}=useLanguage();
 return <div className="mobile-price-list">{plans.map(plan=><details name={group} key={plan.title} className="mobile-price-item"><summary><span><strong>{plan.title}</strong><small>{plan.price} <span>{plan.unit}</span></small></span><span className="mobile-price-toggle" aria-hidden="true">+</span></summary><div className="mobile-price-content"><ul>{plan.features.map(feature=><li key={feature}>{feature}</li>)}</ul><a className="action-button" href={plan.href} target={plan.href.startsWith('http')?'_blank':undefined} rel={plan.href.startsWith('http')?'noreferrer':undefined}>{locale==='es'?'Ver este plan':'View this plan'}</a></div></details>)}</div>;
}
