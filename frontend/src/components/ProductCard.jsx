import { useState } from 'react'
import { Link } from 'react-router-dom'
import { T } from '../data.js'
import { useApp } from '../store.js'
const CC = { titanium: '#8c9095', steel: '#d0d3d6', rose: '#d8a08a' }, DD = { obsidian: '#0b0b0d', ivory: '#e8dfcb', blue: '#10265a' }
export default function ProductCard({ p }) {
  const lang = useApp(s => s.lang), t = T[lang], [bad, setBad] = useState(!p.img)
  return <Link to={`/collection/${p.slug}`} className="card pc">
    <div className="pimg">{!bad ? <img src={p.img} alt={`${p.name} — ${p[lang]}`} loading="lazy" decoding="async" onError={() => setBad(true)} /> : <div className="face" style={{ borderColor: CC[p.c], background: DD[p.d] }} />}<span className="badge">{lang === 'fa' ? 'مجموعه‌ی ویژه' : 'Limited'}</span></div>
    <div className="pmeta"><h3>{lang === 'fa' ? p.name_fa : p.name}</h3><b>${p.price.toLocaleString()}</b></div>
    <p>{p[lang]}</p><div className="cardfoot"><span className="dots"><i style={{ background: CC[p.c] }} /><i style={{ background: DD[p.d] }} /></span><span>{t.view} →</span></div></Link>
}
