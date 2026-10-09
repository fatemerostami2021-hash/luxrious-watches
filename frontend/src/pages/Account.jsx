import { useEffect, useState } from 'react'
import { API, T } from '../data.js'
import { useApp } from '../store.js'
export default function Account() {
  const { user, token, setAuth, lang } = useApp(), t = T[lang]
  const [f, setF] = useState({ name: '', email: '', password: '' }), [orders, setOrders] = useState([])
  const go = async mode => { const r = await fetch(`${API}/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) }); const d = await r.json(); r.ok ? setAuth(d.user, d.token) : alert(d.error) }
  useEffect(() => { if (token) fetch(`${API}/orders/mine`, { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()).then(d => Array.isArray(d) && setOrders(d)).catch(() => {}) }, [token])
  if (user) return <section className="page"><h2>{user.name}</h2><button className="btn" onClick={() => setAuth(null, null)}>{t.logout}</button><h3>{t.orders}</h3>{orders.map(o => <div className="row" key={o.id}><span>#{o.id}</span><span>{o.status}</span><span>${o.total}</span></div>)}</section>
  return <section className="page"><h2>{t.account}</h2>{['name', 'email', 'password'].map(k => <input key={k} type={k === 'password' ? 'password' : 'text'} placeholder={t[k === 'pass' ? 'pass' : k] || t.pass} value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} />)}
    <button className="btn" onClick={() => go('login')}>{t.login}</button> <button className="btn" onClick={() => go('register')}>{t.register}</button></section>
}
