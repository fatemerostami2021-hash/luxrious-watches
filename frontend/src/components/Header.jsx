import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp, useUI } from '../store.js'
import { PRODUCTS } from '../data.js'
import { POSTS } from '../posts.js'
import Flags from './Flags.jsx'
import Social from './Social.jsx'
const TXT = { en: { col: 'Collection', blog: 'Articles', about: 'About', contact: 'Contact', acc: 'Account', sup: 'Support', cart: 'Cart', ph: 'Search watches and articles…', mat: 'By case', feat: 'Featured watches', latest: 'Latest articles', quick: 'Quick links', m: ['Titanium', 'Steel', 'Rose Gold'], all: 'View all' },
  fa: { col: 'کالکشن', blog: 'مقالات', about: 'درباره ما', contact: 'تماس', acc: 'حساب', sup: 'پشتیبانی', cart: 'سبد', ph: 'جستجوی ساعت و مقاله…', mat: 'بر اساس جنس بدنه', feat: 'ساعت‌های شاخص', latest: 'آخرین مقالات', quick: 'دسترسی سریع', m: ['تیتانیوم', 'استیل', 'رزگلد'], all: 'مشاهده همه' } }
const CC = { titanium: '#8c9095', steel: '#d0d3d6', rose: '#d8a08a' }, DD = { obsidian: '#0b0b0d', ivory: '#e8dfcb', blue: '#10265a' }
export default function Header() {
  const { lang, theme, setTheme, items } = useApp(), { setChat } = useUI(), t = TXT[lang], fa = lang === 'fa'
  const [open, setOpen] = useState(false), [mega, setMega] = useState(false), [sq, setSq] = useState(false), [q, setQ] = useState(''), { pathname } = useLocation()
  useEffect(() => { setOpen(false); setMega(false); setSq(false); setQ('') }, [pathname])
  useEffect(() => { const k = e => { if (e.key === 'Escape') { setSq(false); setMega(false) } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  const n = items.reduce((s, i) => s + i.qty, 0), k = q.trim().toLowerCase()
  const res = k ? [...PRODUCTS.filter(p => (p.name + p.name_fa).toLowerCase().includes(k)).map(p => ({ to: '/collection/' + p.slug, l: fa ? p.name_fa : p.name })), ...POSTS.filter(p => (p.title + p.title_fa).toLowerCase().includes(k)).map(p => ({ to: '/blog/' + p.slug, l: fa ? p.title_fa : p.title }))] : []
  const Th = <button className="ib" aria-label="theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀' : '☾'}</button>
  const Se = <button className="ib" aria-label="search" onClick={() => { setSq(true); setOpen(false) }}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6.500" /><path d="M16 16l5 5" /></svg></button>
  const nav = [['/blog', t.blog], ['/about', t.about], ['/contact', t.contact]]
  return <header className="hdr" onMouseLeave={() => setMega(false)}>
    <nav className="bar"><Link to="/" className="logo"><svg className="wlogo" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /><path className="tick" d="M12 12V4.500" stroke="#c9a96e" /><circle className="blink" cx="12" cy="12" r="1.600" fill="#c9a96e" stroke="none" /></svg>VÉRION</Link>
      <div className="nl"><Link to="/collection" className={pathname.startsWith('/collection') ? 'act' : ''} onMouseEnter={() => setMega(true)}>{t.col} ▾</Link>{nav.map(([to, l]) => <Link key={to} to={to} className={pathname === to ? 'act' : ''} onMouseEnter={() => setMega(false)}>{l}</Link>)}</div>
      <div className="rt">{Se}<span className="dsk"><Flags /></span><span className="dsk">{Th}</span><Link to="/account" className="tl dsk">{t.acc}</Link><button className="tl dsk" onClick={() => setChat(true)}>{t.sup}</button><Link to="/cart" className="tl">{t.cart} ({n})</Link>
        <button className="hb" aria-label="menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /><i /></button></div></nav>
    {mega && <div className="mega"><div><span className="mh">{t.mat}</span>{['titanium', 'steel', 'rose'].map((c, i) => <Link key={c} to={'/collection?c=' + c}>{t.m[i]}</Link>)}<Link to="/collection" className="more">{t.all} →</Link></div>
      <div><span className="mh">{t.feat}</span>{PRODUCTS.map(p => <Link key={p.slug} to={'/collection/' + p.slug} className="mp"><i style={{ borderColor: CC[p.c], background: DD[p.d] }} />{fa ? p.name_fa : p.name}<b>${p.price.toLocaleString()}</b></Link>)}</div>
      <div><span className="mh">{t.latest}</span>{POSTS.slice(0, 3).map(p => <Link key={p.slug} to={'/blog/' + p.slug}>{fa ? p.title_fa : p.title}</Link>)}</div>
      <div><span className="mh">{t.quick}</span><Link to="/about">{t.about}</Link><Link to="/contact">{t.contact}</Link><button onClick={() => setChat(true)}>{t.sup}</button></div></div>}
    {open && <div className="mobmenu"><Link to="/collection">{t.col}</Link>{['titanium', 'steel', 'rose'].map((c, i) => <Link key={c} className="sub" to={'/collection?c=' + c}>— {t.m[i]}</Link>)}{nav.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}<Link to="/account">{t.acc}</Link>
      <button onClick={() => { setOpen(false); setChat(true) }}>{t.sup}</button><div className="mobrow"><Flags />{Th}</div><Social /></div>}
    {sq && <div className="srch" onClick={() => setSq(false)}><div onClick={e => e.stopPropagation()}><input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={t.ph} />{res.map(r => <Link key={r.to} to={r.to}>{r.l}</Link>)}</div></div>}
  </header>
}
