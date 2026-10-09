import { Link } from 'react-router-dom'
import { T } from '../data.js'
import { useApp } from '../store.js'
const CC = { titanium: '#8c9095', steel: '#d0d3d6', rose: '#d8a08a' }, DD = { obsidian: '#0b0b0d', ivory: '#e8dfcb', blue: '#10265a' }
export default function ProductCard({ p }) {
  const lang = useApp(s => s.lang), t = T[lang]
  return <Link to={`/collection/${p.slug}`} className="card">
    <div className="swatch"><div className="face" style={{ borderColor: CC[p.c], background: DD[p.d] }} /></div>
    <h3>{lang === 'fa' ? p.name_fa : p.name}</h3><p>{p[lang]}</p>
    <div className="cardfoot"><b>${p.price.toLocaleString()}</b><span>{t.view} →</span></div></Link>
}
