import { Link } from 'react-router-dom'
import { useApp } from '../store.js'
import { useUI } from '../store.js'
import Social from './Social.jsx'
export default function Footer() {
  const fa = useApp(s => s.lang) === 'fa', { setChat } = useUI()
  return <footer className="foot"><div className="cols">
    <div><div className="logo">VÉRION</div><p>{fa ? 'ساعت‌های مکانیکی لوکس با الهام از ساعت‌سازی سوئیس. زمان، پالایش‌شده.' : 'Luxury mechanical watches inspired by Swiss watchmaking. Time, refined.'}</p><Social /></div>
    <div><h3>{fa ? 'فروشگاه' : 'Shop'}</h3><Link to="/collection">{fa ? 'کالکشن' : 'Collection'}</Link><Link to="/collection/aurel">AUREL</Link><Link to="/collection/noir">NOIR</Link><Link to="/cart">{fa ? 'سبد خرید' : 'Cart'}</Link></div>
    <div><h3>{fa ? 'شرکت' : 'Company'}</h3><Link to="/blog">{fa ? 'مقالات' : 'Journal'}</Link><Link to="/about">{fa ? 'درباره ما' : 'About'}</Link><Link to="/contact">{fa ? 'تماس' : 'Contact'}</Link><Link to="/account">{fa ? 'حساب کاربری' : 'Account'}</Link><span>{fa ? 'گارانتی ۵ ساله' : '5-year warranty'}</span><span>{fa ? 'ارسال بیمه‌شده' : 'Insured shipping'}</span></div>
    <div><h3>{fa ? 'تماس' : 'Contact'}</h3><span>support@verion.example</span><span>+00 000 000 0000</span><span>{fa ? 'همه روزه ۹ تا ۲۱' : 'Daily 9:00–21:00'}</span><button className="fsup" onClick={() => setChat(true)}>{fa ? 'پشتیبانی آنلاین' : 'Live support'}</button></div></div>
    <div className="legal"><span>© {new Date().getFullYear()} VÉRION — Luxury Mechanical Watches</span><span>{fa ? 'برند نمونه و خیالی' : 'Concept brand, not a real watch company'}</span><button className="ckset" onClick={() => dispatchEvent(new Event('verion:cookies'))}>{fa ? 'تنظیمات کوکی' : 'Cookie settings'}</button></div></footer>
}
