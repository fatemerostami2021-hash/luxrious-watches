import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp, useUI } from '../store.js'
import { PRODUCTS } from '../data.js'
import { POSTS } from '../posts.js'
import Flags from './Flags.jsx'
import FlipText from './FlipText.jsx'
import Social from './Social.jsx'
const TXT = { en: { col: 'Collection', blog: 'Articles', about: 'About', contact: 'Contact', port: 'Portfolio', acc: 'Account', sup: 'Support', cart: 'Cart', ph: 'Search watches and articles…', mat: 'By case', feat: 'Featured watches', latest: 'Latest articles', quick: 'Quick links', m: ['Titanium', 'Steel', 'Rose Gold'], all: 'View all', s: 'Search', w: 'Watches', none: 'No results for', clr: 'Clear', dm: 'Dark mode' },
  fa: { col: 'کالکشن', blog: 'مقالات', about: 'درباره ما', contact: 'تماس', port: 'پورتفولیو', acc: 'حساب', sup: 'پشتیبانی', cart: 'سبد', ph: 'جستجوی ساعت و مقاله…', mat: 'بر اساس جنس بدنه', feat: 'ساعت‌های شاخص', latest: 'آخرین مقالات', quick: 'دسترسی سریع', m: ['تیتانیوم', 'استیل', 'رزگلد'], all: 'مشاهده همه', s: 'جستجو', w: 'ساعت‌ها', none: 'نتیجه‌ای پیدا نشد برای', clr: 'پاک کردن', dm: 'حالت تیره' } }
const CC = { titanium: '#8c9095', steel: '#d0d3d6', rose: '#d8a08a' }, DD = { obsidian: '#0b0b0d', ivory: '#e8dfcb', blue: '#10265a' }
const Sun = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
const Moon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
const Mag = ({ s = 18 }) => <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.500" /><path d="M16 16l5 5" /></svg>
export default function Header() {
  const { lang, theme, setTheme, items } = useApp(), { setChat } = useUI(), t = TXT[lang], fa = lang === 'fa'
  const [open, setOpen] = useState(false), [mega, setMega] = useState(false), [sq, setSq] = useState(false), [q, setQ] = useState(''), { pathname } = useLocation()
  useEffect(() => { setOpen(false); setMega(false); setSq(false); setQ('') }, [pathname])
  useEffect(() => { const k = e => { if (e.key === 'Escape') { setSq(false); setMega(false); setOpen(false) } else if ((e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || '')) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); setSq(true); setOpen(false) } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  const n = items.reduce((s, i) => s + i.qty, 0), k = q.trim().toLowerCase()
  const rp = k ? PRODUCTS.filter(p => (p.name + p.name_fa).toLowerCase().includes(k)) : [], ra = k ? POSTS.filter(p => (p.title + p.title_fa).toLowerCase().includes(k)) : []
  const dark = theme === 'dark'
  const Th = <button className="tg" role="switch" aria-checked={dark} aria-label={t.dm} title={t.dm} onClick={() => setTheme(dark ? 'light' : 'dark')}><Sun /><Moon /><i className="tgk">{dark ? <Moon /> : <Sun />}</i></button>
  const Se = <button className="sb" aria-label={t.s} onClick={() => { setSq(true); setOpen(false) }}><Mag /><span>{t.s}</span><kbd>/</kbd></button>
  const nav = [['/blog', t.blog], ['/about', t.about], ['/contact', t.contact], ['/portfolio', t.port]]
  return <header className="hdr" onMouseLeave={() => setMega(false)}>
    <nav className="bar"><Link to="/" className="logo" aria-label="VÉRION"><span className="wmark"><img src="/images/logo/logo-website.webp" alt="" width="30" height="30" decoding="async" onError={e => { e.currentTarget.style.display = 'none' }} /><svg className="wring" viewBox="0 0 48 48" aria-hidden="true"><circle className="wtrack" cx="24" cy="24" r="22" /><circle className="wglow" cx="24" cy="24" r="22" /><g className="whand"><path d="M24 24V7" /><circle cx="24" cy="5.500" r="2.600" /></g></svg></span>VÉRION</Link>
      <div className="nl"><Link to="/collection" className={pathname.startsWith('/collection') ? 'act' : ''} onMouseEnter={() => setMega(true)}><FlipText t={t.col} fa={fa} /> ▾</Link>{nav.map(([to, l]) => <Link key={to} to={to} className={pathname === to ? 'act' : ''} onMouseEnter={() => setMega(false)}><FlipText t={l} fa={fa} /></Link>)}</div>
      <div className="rt">{Se}<span className="dsk"><Flags /></span><span className="dsk">{Th}</span><Link to="/account" className="tl dsk"><FlipText t={t.acc} fa={fa} /></Link><button className="tl dsk" onClick={() => setChat(true)}><FlipText t={t.sup} fa={fa} /></button><Link to="/cart" className="tl">{t.cart} ({n})</Link>
        <button className="hb" aria-label={open ? (fa ? 'بستن منو' : 'Close menu') : (fa ? 'منو' : 'Menu')} aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /><i /></button></div></nav>
    {mega && <div className="mega"><div><span className="mh">{t.mat}</span>{['titanium', 'steel', 'rose'].map((c, i) => <Link key={c} to={'/collection?c=' + c}>{t.m[i]}</Link>)}<Link to="/collection" className="more">{t.all} →</Link></div>
      <div><span className="mh">{t.feat}</span>{PRODUCTS.map(p => <Link key={p.slug} to={'/collection/' + p.slug} className="mp"><i style={{ borderColor: CC[p.c], background: DD[p.d] }} />{fa ? p.name_fa : p.name}<b>${p.price.toLocaleString()}</b></Link>)}</div>
      <div><span className="mh">{t.latest}</span>{POSTS.slice(0, 3).map(p => <Link key={p.slug} to={'/blog/' + p.slug}>{fa ? p.title_fa : p.title}</Link>)}</div>
      <div><span className="mh">{t.quick}</span><Link to="/about">{t.about}</Link><Link to="/contact">{t.contact}</Link><button onClick={() => setChat(true)}>{t.sup}</button></div></div>}
    {open && <div className="mobmenu"><Link to="/collection"><FlipText t={t.col} fa={fa} /></Link>{['titanium', 'steel', 'rose'].map((c, i) => <Link key={c} className="sub" to={'/collection?c=' + c}>{t.m[i]}</Link>)}{nav.map(([to, l]) => <Link key={to} to={to}><FlipText t={l} fa={fa} /></Link>)}<Link to="/account"><FlipText t={t.acc} fa={fa} /></Link>
      <button onClick={() => { setOpen(false); setChat(true) }}>{t.sup}</button><div className="mobrow"><Flags />{Th}</div><Social /></div>}
    {sq && <div className="srch" onClick={() => setSq(false)}><div className="sp" role="dialog" aria-label={t.s} onClick={e => e.stopPropagation()}>
      <div className="sbar"><Mag s={20} /><input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={t.ph} aria-label={t.s} />{q && <button className="sx" aria-label={t.clr} onClick={() => setQ('')}>×</button>}<kbd>Esc</kbd></div>
      {!k ? <div className="sug">
        <div><span className="mh">{t.mat}</span><div className="chips">{['titanium', 'steel', 'rose'].map((c, i) => <Link key={c} className="chip" to={'/collection?c=' + c} onClick={() => setSq(false)}>{t.m[i]}</Link>)}<Link className="chip all" to="/collection" onClick={() => setSq(false)}>{t.all} →</Link></div>
          <span className="mh sp2">{t.quick}</span><div className="chips"><Link className="chip" to="/about" onClick={() => setSq(false)}>{t.about}</Link><Link className="chip" to="/contact" onClick={() => setSq(false)}>{t.contact}</Link><Link className="chip" to="/portfolio" onClick={() => setSq(false)}>{t.port}</Link><button className="chip" onClick={() => { setSq(false); setChat(true) }}>{t.sup}</button></div></div>
        <div><span className="mh">{t.feat}</span>{PRODUCTS.map(p => <Link key={p.slug} to={'/collection/' + p.slug} className="si mp" onClick={() => setSq(false)}><i style={{ borderColor: CC[p.c], background: DD[p.d] }} />{fa ? p.name_fa : p.name}<b>${p.price.toLocaleString()}</b></Link>)}</div>
        <div><span className="mh">{t.latest}</span>{POSTS.slice(0, 4).map(p => <Link key={p.slug} to={'/blog/' + p.slug} className="si" onClick={() => setSq(false)}>{fa ? p.title_fa : p.title}</Link>)}</div></div>
      : (rp.length || ra.length) ? <div className="sres">
        {rp.length > 0 && <div><span className="mh">{t.w}</span>{rp.map(p => <Link key={p.slug} to={'/collection/' + p.slug} className="si mp" onClick={() => setSq(false)}><i style={{ borderColor: CC[p.c], background: DD[p.d] }} />{fa ? p.name_fa : p.name}<b>${p.price.toLocaleString()}</b></Link>)}</div>}
        {ra.length > 0 && <div><span className="mh">{t.blog}</span>{ra.map(p => <Link key={p.slug} to={'/blog/' + p.slug} className="si" onClick={() => setSq(false)}>{fa ? p.title_fa : p.title}</Link>)}</div>}</div>
      : <p className="sno">{t.none} “{q}”</p>}
    </div></div>}
  </header>
}
