const I = {
  instagram: <><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></>,
  telegram: <path d="M21 4 3 11l6 2 2 7 3-4 5 4z" />,
  whatsapp: <><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" /><path d="M9 8c0 3.500 3 6.500 6.500 6.500l1-1.500-2.200-1-.8.800c-.8-.4-1.800-1.400-2.200-2.200l.8-.8-1-2.200z" /></>,
  youtube: <><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10 9.500v5l4.500-2.500z" /></>,
  x: <path d="M5 5l14 14M19 5 5 19" /> }
export default function Social({ className = '' }) {
  return <div className={'social ' + className}>{Object.keys(I).map(k => <a key={k} href="#" aria-label={k} onClick={e => e.preventDefault()}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">{I[k]}</svg></a>)}</div>
}
