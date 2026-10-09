import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS, T } from '../data.js'
import { useApp } from '../store.js'
import ProductCard from '../components/ProductCard.jsx'
export default function Collection() {
  const lang = useApp(s => s.lang), t = T[lang], [sp] = useSearchParams(), [f, setF] = useState(sp.get('c') || 'all')
  useEffect(() => { setF(sp.get('c') || 'all') }, [sp])
  const list = PRODUCTS.filter(p => f === 'all' || p.c === f)
  const names = { all: lang === 'fa' ? 'همه' : 'All', titanium: lang === 'fa' ? 'تیتانیوم' : 'Titanium', steel: lang === 'fa' ? 'استیل' : 'Steel', rose: lang === 'fa' ? 'رزگلد' : 'Rose Gold' }
  return <section className="page wide"><h1>{t.col}</h1>
    <div className="filters">{Object.keys(names).map(k => <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{names[k]}</button>)}</div>
    <div className="grid">{list.map(p => <ProductCard key={p.slug} p={p} />)}</div></section>
}
