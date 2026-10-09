import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PRODUCTS, T } from '../data.js'
import { COPY } from '../copy.js'
import { useApp } from '../store.js'
import useReveal from '../useReveal.js'
import ProductCard from '../components/ProductCard.jsx'
const Scene = lazy(() => import('../components/Scene.jsx'))
const sm = x => x * x * (3 - 2 * x)
const bump = p => p < .25 ? 0 : p < .5 ? sm((p - .25) / .25) : p < .75 ? 1 : 1 - sm(Math.min(1, (p - .75) / .25))
const L = { en: { disc: 'DISCOVER THE WATCH', all: 'View all watches', parts: ['Crystal', 'Bezel', 'Dial', 'Hands', 'Movement', 'Case', 'Crown', 'Strap'], k: 'THE ART OF TIME', k2: 'EXPLODED VIEW', k3: 'PRECISION', k4: 'BY THE NUMBERS', h4: 'Numbers that matter',
  stats: [['28,800', 'vibrations per hour', 'Balance wheel'], ['72 h', 'power reserve', 'Automatic movement'], ['100 m', 'water resistance', '10 ATM'], ['9', 'Mohs hardness', 'Sapphire crystal']],
  bold: ['28,800', 'mainspring', 'sapphire crystal', 'Mohs', 'tourbillon', 'Abraham-Louis Breguet', '1801', '316L stainless steel', 'grade 5 titanium', '18-carat rose gold', '100 metres', '72-hour power reserve', 'Geneva stripes', 'perlage', 'skeleton dial', 'hundredths of a millimetre', 'synthetic ruby'] },
  fa: { disc: 'کشف ساعت', all: 'مشاهده همه‌ی ساعت‌ها', parts: ['کریستال', 'بزل', 'صفحه', 'عقربه‌ها', 'موومنت', 'بدنه', 'تاج', 'بند'], k: 'هنر زمان', k2: 'نمای انفجاری', k3: 'دقت', k4: 'در یک نگاه', h4: 'اعدادی که مهم‌اند',
  stats: [['۲۸٬۸۰۰', 'نوسان در ساعت', 'بالانس'], ['۷۲ ساعت', 'ذخیره‌ی انرژی', 'موومنت اتوماتیک'], ['۱۰۰ متر', 'ضدآب', '۱۰ اتمسفر'], ['۹', 'سختی موس', 'کریستال یاقوت کبود']],
  bold: ['۲۸٬۸۰۰', 'فنر اصلی', 'یاقوت کبود', 'توربیون', 'ابراهام-لوئی برگه', '۱۸۰۱', 'استیل ۳۱۶L', 'تیتانیوم درجه ۵', 'رزگلد ۱۸ عیار', '۱۰۰ متر', '۷۲ ساعت ذخیره‌ی انرژی', 'نقش ژنو', 'پرلاژ', 'صفحه‌ی اسکلتون', 'صدم میلی‌متر', 'یاقوت مصنوعی'] } }
const Rich = ({ t, b }) => { const re = new RegExp('(' + b.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'i'); return t.split(re).map((p, i) => i % 2 ? <strong key={i}>{p}</strong> : p) }
const P = ({ k, h, id, children }) => <section className="screen side" aria-labelledby={id}><div className="glass rv"><span className="kicker">{k}</span><h2 id={id}>{h}</h2>{children}</div></section>
const Ps = ({ list, b }) => list.map((x, i) => <p key={i} className="lead rv" style={{ transitionDelay: `${(i + 1) * 140}ms` }}><Rich t={x} b={b} /></p>)
const FEATS = { en: ['Why VÉRION', [['Visible movement', 'The skeleton dial exposes the gear train, balance wheel and tourbillon, so the mechanism becomes part of the design.'], ['Sapphire and steel', 'A scratch-resistant sapphire crystal (9 on the Mohs scale) and water resistance to 100 metres in every case material.'], ['Hand-finished', 'Bridges are decorated with Geneva stripes and perlage and finished by hand before assembly.'], ['Peace of mind', 'A 5-year warranty and insured worldwide shipping on every order.']]],
  fa: ['چرا ورینون', [['موومنت نمایان', 'صفحه‌ی اسکلتون چرخ‌دنده‌ها، بالانس و توربیون را نشان می‌دهد و مکانیزم بخشی از طراحی می‌شود.'], ['یاقوت کبود و استیل', 'کریستال یاقوت کبود ضدخش (سختی ۹ موس) و مقاومت در برابر آب تا ۱۰۰ متر در همه‌ی جنس‌های بدنه.'], ['تکمیل دستی', 'پل‌ها با نقش ژنو و پرلاژ تزئین می‌شوند و پیش از مونتاژ با دست تکمیل می‌شوند.'], ['آرامش خاطر', '۵ سال گارانتی و ارسال بیمه‌شده به سراسر جهان برای هر سفارش.']]] }
const HERO = { en: { tag: 'Beyond time: elegance and precision, expressed.', p: 'A union of engineering art, modern design and the beauty of delicate mechanisms. By blending deep black with the glow of rose gold, VÉRION offers a different view of time, where every detail speaks of authenticity, character and refinement.', c: 'VÉRION — experience time differently.' },
  fa: { tag: 'فراتر از زمان، تجلی ظرافت و دقت', p: 'ترکیبی از هنر مهندسی، طراحی مدرن و زیبایی مکانیزم‌های ظریف. VÉRION با تلفیق مشکی عمیق و درخشش رزگلد، نگاهی متفاوت به زمان می‌آفریند؛ جایی که هر جزئیات، بیانگر اصالت، شخصیت و ظرافت است.', c: 'VÉRION — زمان را متفاوت تجربه کنید.' } }
export default function Home() {
  const lang = useApp(s => s.lang), t = T[lang], l = L[lang], c = COPY[lang], { hash } = useLocation()
  const ex = useRef(0), prog = useRef(0), [ready, setReady] = useState(false)
  useReveal(lang + ready)
  useEffect(() => { const f = () => setReady(true), id = window.requestIdleCallback ? requestIdleCallback(f, { timeout: 800 }) : setTimeout(f, 300); return () => window.cancelIdleCallback ? cancelIdleCallback(id) : clearTimeout(id) }, [])
  useEffect(() => {
    const f = () => { const end = Math.max(1, (document.getElementById('collection')?.offsetTop || innerHeight * 4) - innerHeight); const p = Math.min(1, scrollY / end); prog.current = p; ex.current = bump(p) }
    f(); addEventListener('scroll', f, { passive: true }); addEventListener('resize', f)
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f) }
  }, [lang])
  useEffect(() => { if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80) }, [hash])
  const mob = innerWidth <= 900, shift = innerWidth > 900 ? (lang === 'fa' ? -2.1 : 2.1) : 0
  return <>
    <div className="stage">{ready && <Suspense fallback={null}><Scene ex={ex} prog={prog} shift={shift} lift={mob ? .45 : 0} sc={mob ? .8 : 1} opts={{ c: 'rose', d: 'obsidian', s: 'black' }} /></Suspense>}</div>
    <section className="screen hero"><span className="kicker rv">SWISS-INSPIRED · MECHANICAL EXCELLENCE</span><h1 className="rv">VÉRION<span className="sr"> — Luxury Mechanical Watches</span></h1><p className="tag rv">{HERO[lang].tag}</p><p className="lead rv">{HERO[lang].p}</p><p className="close rv">{HERO[lang].c}</p><div className="btns rv"><Link className="btn" to="/collection/aurel">{l.disc}</Link><Link className="btn fill" to="/collection">{t.explore}</Link></div></section>
    <P k={l.k4} h={l.h4} id="s-num"><div className="stats4">{l.stats.map(([n, a, b], i) => <div key={n} className="stat rv" style={{ transitionDelay: `${i * 120}ms` }}><b>{n}</b><strong>{a}</strong><span>{b}</span></div>)}</div></P>
    <P k={l.k} h={t.art} id="s-art"><Ps list={c.art} b={l.bold} /></P>
    <P k={l.k2} h={t.exp} id="s-exp"><Ps list={c.exp} b={l.bold} /><div className="labels">{l.parts.map((x, i) => <span key={x} className="rv" style={{ transitionDelay: `${i * 70}ms` }}><i>0{i + 1}</i>{x}</span>)}</div></P>
    <P k={l.k3} h={lang === 'fa' ? 'مهندسی دقیق' : 'Built to last'} id="s-prec"><Ps list={c.prec} b={l.bold} /><ul className="specs">{t.spec.map(x => <li key={x}>{x}</li>)}</ul></P>
    <section id="collection" className="solid" aria-labelledby="s-col"><div className="head"><h2 id="s-col">{t.col}</h2><Link className="more" to="/collection">{l.all} →</Link></div>
      <div className="grid">{PRODUCTS.map(p => <ProductCard key={p.slug} p={p} />)}</div></section>
    <section className="solid features" aria-labelledby="s-feat"><h2 id="s-feat" className="rv">{FEATS[lang][0]}</h2><div className="fgrid">{FEATS[lang][1].map(([a, b], i) => <article key={a} className="fcard rv" style={{ transitionDelay: `${i * 110}ms` }}><i>0{i + 1}</i><h3>{a}</h3><p>{b}</p></article>)}</div></section>
  </>
}
