import { useApp } from '../store.js'
const UK = <svg viewBox="0 0 60 30" width="26" height="16"><clipPath id="u"><path d="M0 0h60v30H0z" /></clipPath><g clipPath="url(#u)"><path d="M0 0v30h60V0z" fill="#012169" /><path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" /><path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" /><path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" /><path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" /></g></svg>
const IR = <svg viewBox="0 0 60 36" width="26" height="16"><rect width="60" height="12" fill="#239f40" /><rect y="12" width="60" height="12" fill="#fff" /><rect y="24" width="60" height="12" fill="#da0000" /><circle cx="30" cy="18" r="4" fill="none" stroke="#da0000" strokeWidth="2" /></svg>
export default function Flags() {
  const { lang, setLang } = useApp()
  return <span className="flags">{[['en', UK, 'English'], ['fa', IR, 'فارسی']].map(([k, f, n]) => <button key={k} title={n} aria-label={n} className={lang === k ? 'on' : ''} onClick={() => setLang(k)}>{f}</button>)}</span>
}
