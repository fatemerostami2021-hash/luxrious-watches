import { SOCIALS } from '../socials.js'
const I = {
  instagram: <><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.800" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></>,
  telegram: <path d="M21 4 3 11l6 2 2 7 3-4 5 4z" />,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v6M8 8v.01M12 17v-6m0 3c0-2.500 4-3 4 0v3" /></>,
  facebook: <path d="M14 8h2V5h-2.500C11.500 5 11 6.500 11 8v2H9v3h2v6h3v-6h2l.5-3H14z" />,
  whatsapp: <><path d="M4 20l1.300-4A8 8 0 1 1 8 18.700z" /><path d="M9 8c0 3.500 3 6.500 6.500 6.500l1-1.500-2.200-1-.8.800c-.8-.4-1.800-1.400-2.200-2.200l.8-.8-1-2.200z" /></>,
  youtube: <><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10 9.500v5l4.500-2.500z" /></> }
export default function Social({ className = '' }) {
  return <div className={'social ' + className}>{SOCIALS.map(s => <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.id}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">{I[s.id]}</svg></a>)}</div>
}
