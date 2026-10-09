import { useRef, useState, useEffect } from 'react'
import { useApp, useUI } from '../store.js'
import Social from './Social.jsx'
const KB = [[/ship|deliver|ارسال|تحویل/i, 'Orders ship insured within 2–3 business days; delivery takes 3–7 days.', 'سفارش‌ها بیمه‌شده طی ۲ تا ۳ روز کاری ارسال می‌شوند و تحویل ۳ تا ۷ روز طول می‌کشد.'], [/warrant|guarantee|گارانتی|ضمانت/i, 'Every watch has a 5-year warranty covering the movement.', 'هر ساعت ۵ سال گارانتی موومنت دارد.'], [/pay|card|پرداخت|کارت/i, 'You can pay by card or bank transfer at checkout.', 'در مرحله‌ی ثبت سفارش می‌توانی با کارت یا انتقال بانکی پرداخت کنی.'], [/water|ضدآب|آب/i, 'All cases are water resistant to 100 m (10 ATM).', 'همه‌ی بدنه‌ها تا ۱۰۰ متر ضدآب هستند.'], [/price|cost|قیمت/i, 'Prices start at $4,900 and change with case and strap.', 'قیمت‌ها از ۴٬۹۰۰ دلار شروع می‌شود و با بدنه و بند تغییر می‌کند.']]
export default function Chat() {
  const fa = useApp(s => s.lang) === 'fa', { chat, setChat } = useUI(), end = useRef()
  const [m, setM] = useState([]), [v, setV] = useState('')
  useEffect(() => { end.current?.scrollIntoView() }, [m, chat])
  const send = txt => {
    if (!txt.trim()) return
    const k = KB.find(x => x[0].test(txt)), a = k ? k[fa ? 2 : 1] : fa ? 'ممنون! همکاران ما به‌زودی پاسخ می‌دهند. برای پاسخ سریع‌تر از تلگرام یا واتساپ پیام بده.' : 'Thanks! Our team will reply shortly. For a faster answer, message us on Telegram or WhatsApp.'
    setM(x => [...x, { me: 1, t: txt }]); setV(''); setTimeout(() => setM(x => [...x, { t: a }]), 600)
  }
  const quick = fa ? ['ارسال', 'گارانتی', 'پرداخت', 'قیمت'] : ['Shipping', 'Warranty', 'Payment', 'Price']
  return <>
    <button className="fab" aria-label="support" onClick={() => setChat(!chat)}>{chat ? '✕' : <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4z" /></svg>}</button>
    {chat && <div className="chat"><div className="chead"><b>{fa ? 'پشتیبانی آنلاین' : 'Live support'}</b><span>● {fa ? 'آنلاین' : 'Online'}</span></div>
      <div className="cbody"><p className="bot">{fa ? 'سلام! چطور می‌توانم کمک کنم؟' : 'Hello! How can we help you?'}</p>{m.map((x, i) => <p key={i} className={x.me ? 'me' : 'bot'}>{x.t}</p>)}<div ref={end} /></div>
      <div className="quick">{quick.map(q => <button key={q} onClick={() => send(q)}>{q}</button>)}</div>
      <Social className="chatsoc" /><form onSubmit={e => { e.preventDefault(); send(v) }}><input value={v} onChange={e => setV(e.target.value)} placeholder={fa ? 'پیام خود را بنویس...' : 'Type your message...'} /><button>➤</button></form></div>}</>
}
