import { lazy, Suspense, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCTS, EXTRA, T } from '../data.js'
import { INFO } from '../info.js'
import { useApp } from '../store.js'
const Scene = lazy(() => import('../components/Scene.jsx'))
export default function Product() {
  const { slug } = useParams(), p = PRODUCTS.find(x => x.slug === slug) || PRODUCTS[0]
  const lang = useApp(s => s.lang), add = useApp(s => s.add), t = T[lang], fa = lang === 'fa'
  const [o, set] = useState({ c: p.c, d: p.d, s: p.s }), [pick, setPick] = useState(null)
  const ex = useRef(0), paused = useRef(false), ctrl = useRef()
  const price = p.price + EXTRA.c[o.c] + EXTRA.s[o.s], inf = pick && INFO[pick]
  const row = (k, label, vals) => <div className="opt"><span>{label}</span>{vals.map(v => <button key={v} className={o[k] === v ? 'on' : ''} onClick={() => set({ ...o, [k]: v })}>{v}</button>)}</div>
  return <section className="product"><div className="viewer"><Suspense fallback={null}><Scene opts={o} ex={ex} paused={paused} ctrlRef={ctrl} interactive onPick={id => { paused.current = true; setPick(id) }} /></Suspense>
    <div className="ctrls"><button onClick={() => { ex.current = ex.current ? 0 : 1 }}>{fa ? 'نمای انفجاری' : 'Exploded view'}</button><button onClick={() => ctrl.current?.reset()}>{fa ? 'بازنشانی دوربین' : 'Reset camera'}</button></div>
    {inf && <div className="panel"><b>{inf[fa ? 2 : 0]}</b><p>{inf[fa ? 3 : 1]}</p><button onClick={() => { paused.current = false; setPick(null) }}>{fa ? 'ادامه' : 'Resume'}</button></div>}</div>
    <div className="info"><h1>{fa ? p.name_fa : p.name}</h1><p>{p[lang]}</p>
      {row('c', t.caseL, ['titanium', 'steel', 'rose'])}{row('d', t.dialL, ['obsidian', 'ivory', 'blue'])}{row('s', t.strapL, ['black', 'white', 'gold'])}
      <div className="buy"><h2>${price.toLocaleString()}</h2>
        <button className="btn" onClick={() => add({ key: `${p.slug}-${o.c}-${o.d}-${o.s}`, name: p.name, price, opts: o })}>{t.add}</button></div>
      <p className="hint">{fa ? 'روی قطعه‌ها کلیک کن تا نامشان را ببینی.' : 'Click any part to see what it does.'}</p></div></section>
}
