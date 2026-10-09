import { useState } from 'react'
import { useApp } from '../store.js'
import { API, T } from '../data.js'
export default function Cart() {
  const { items, qty, remove, clear, token, lang } = useApp(), t = T[lang]
  const [f, setF] = useState({ email: '', address: '' }), [done, setDone] = useState(false)
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const submit = async () => {
    const r = await fetch(`${API}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token && { Authorization: 'Bearer ' + token }) }, body: JSON.stringify({ ...f, items }) })
    if (r.ok) { clear(); setDone(true) } else alert('API error')
  }
  if (done) return <section className="page"><h2>{t.ok}</h2></section>
  return <section className="page"><h2>{t.cart}</h2>{!items.length && <p>{t.empty}</p>}
    {items.map(i => <div className="row" key={i.key}><span>{i.name} ({i.opts.c}/{i.opts.d}/{i.opts.s})</span><span><button onClick={() => qty(i.key, -1)}>−</button> {i.qty} <button onClick={() => qty(i.key, 1)}>+</button></span><span>${i.price * i.qty}</span><button onClick={() => remove(i.key)}>✕</button></div>)}
    {!!items.length && <><h3>${total.toLocaleString()}</h3><input placeholder={t.email} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /><input placeholder={t.address} value={f.address} onChange={e => setF({ ...f, address: e.target.value })} /><button className="btn" onClick={submit}>{t.checkout}</button></>}</section>
}
