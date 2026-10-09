import { useState } from 'react'
import { useApp } from '../store.js'
import Social from '../components/Social.jsx'
export default function Contact() {
  const fa = useApp(s => s.lang) === 'fa', [f, setF] = useState({ name: '', email: '', msg: '' })
  const go = e => { e.preventDefault(); location.href = `mailto:support@verion.example?subject=${encodeURIComponent('VÉRION — ' + f.name)}&body=${encodeURIComponent(f.msg + '\n\n' + f.email)}` }
  const set = k => e => setF({ ...f, [k]: e.target.value })
  return <section className="page"><h1>{fa ? 'تماس با ما' : 'Contact'}</h1>
    <p className="lead">{fa ? 'ایمیل: support@verion.example · تلفن: ۰۰ ۰۰۰ ۰۰۰ ۰۰۰۰ · همه روزه ۹ تا ۲۱' : 'Email: support@verion.example · Phone: +00 000 000 0000 · Daily 9:00–21:00'}</p><Social />
    <form onSubmit={go} className="cform"><input required placeholder={fa ? 'نام' : 'Name'} value={f.name} onChange={set('name')} /><input required type="email" placeholder={fa ? 'ایمیل' : 'Email'} value={f.email} onChange={set('email')} />
      <textarea required rows="5" placeholder={fa ? 'پیام شما' : 'Your message'} value={f.msg} onChange={set('msg')} /><button className="btn">{fa ? 'ارسال' : 'Send'}</button></form></section>
}
