import { useEffect, useRef, useState } from 'react'
import { useApp } from '../store.js'
const KEY = 'verion-consent'
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch { return null } }
const TX = {
  en: { h: 'Cookies & local storage', b: 'VÉRION stores a few small pieces of data in your browser so the website can work: your cart and sign-in session and, if you allow it, your language and theme. We do not use advertising or analytics cookies.', agree: 'Agree', ess: 'Essential only', cfg: 'Configure', ch: 'Your choices', e1: 'Essential', e2: 'Cart and sign-in session. Always on.', p1: 'Preferences', p2: 'Remember your language and theme on your next visit.', save: 'Save choices', back: 'Back' },
  fa: { h: 'کوکی‌ها و ذخیره‌سازی محلی', b: 'VÉRION برای کار کردن وب‌سایت چند داده‌ی کوچک در مرورگر شما نگه می‌دارد: سبد خرید و نشست ورود و، اگر اجازه بدهید، زبان و تم. ما از کوکی‌های تبلیغاتی یا آنالیتیکس استفاده نمی‌کنیم.', agree: 'موافقم', ess: 'فقط ضروری‌ها', cfg: 'تنظیمات', ch: 'انتخاب‌های شما', e1: 'ضروری', e2: 'سبد خرید و نشست ورود. همیشه فعال.', p1: 'ترجیحات', p2: 'به‌خاطر سپردن زبان و تم برای بازدید بعدی.', save: 'ذخیره‌ی انتخاب‌ها', back: 'بازگشت' }
}
export default function CookieConsent() {
  const fa = useApp(s => s.lang) === 'fa', t = TX[fa ? 'fa' : 'en']
  const [open, setOpen] = useState(false), [cfg, setCfg] = useState(false), [prefs, setPrefs] = useState(true), box = useRef(null)
  useEffect(() => { if (!read()) { const id = setTimeout(() => setOpen(true), 500); return () => clearTimeout(id) } }, [])
  useEffect(() => { const f = () => { setPrefs(read()?.prefs === true); setCfg(true); setOpen(true) }; addEventListener('verion:cookies', f); return () => removeEventListener('verion:cookies', f) }, [])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'
    box.current?.querySelector('button')?.focus()
    return () => { document.body.style.overflow = prev }
  }, [open, cfg])
  const save = p => { try { localStorage.setItem(KEY, JSON.stringify({ v: 1, prefs: p, ts: Date.now() })) } catch {} useApp.setState({}); setOpen(false); setCfg(false) }
  const trap = e => { if (e.key !== 'Tab') return; const f = [...box.current.querySelectorAll('button:not([disabled])')]; if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() } }
  if (!open) return null
  return <div className="ckw"><div className="ck" ref={box} role="dialog" aria-modal="true" aria-labelledby="ckh" onKeyDown={trap}>
    <div className="ckl"><span className="logo"><img src="/images/logo/logo-website.webp" alt="" width="34" height="34" onError={e => { e.currentTarget.style.display = 'none' }} />VÉRION</span></div>
    {!cfg ? <><h2 id="ckh">{t.h}</h2><p>{t.b}</p>
      <div className="ckb"><button className="pri" onClick={() => save(true)}>{t.agree}</button><button onClick={() => save(false)}>{t.ess}</button><button onClick={() => { setPrefs(true); setCfg(true) }}>{t.cfg}</button></div></>
    : <><h2 id="ckh">{t.ch}</h2>
      <div className="ckr"><div><strong>{t.e1}</strong><span>{t.e2}</span></div><i className="ckt on lock" aria-hidden="true" /></div>
      <div className="ckr"><div><strong>{t.p1}</strong><span>{t.p2}</span></div><button className={'ckt' + (prefs ? ' on' : '')} role="switch" aria-checked={prefs} aria-label={t.p1} onClick={() => setPrefs(!prefs)} /></div>
      <div className="ckb"><button className="pri" onClick={() => save(prefs)}>{t.save}</button><button onClick={() => setCfg(false)}>{t.back}</button></div></>}
  </div></div>
}
