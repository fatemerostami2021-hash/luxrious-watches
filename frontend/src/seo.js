// Page titles + descriptions: the 3D idea comes first, because a Chrome tab only shows ~25 characters.
import { PRODUCTS } from './data.js'
import { POSTS } from './posts.js'
const BR = 'VÉRION'
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s)
const T = {
  en: {
    home: ['3D Luxury Watches — Explore in Interactive 3D | ' + BR, 'Explore VÉRION’s Swiss-inspired mechanical watches in real-time interactive 3D: rotate, open up the movement and customise every watch before you buy.'],
    collection: ['Watch Collection — View Every Watch in 3D | ' + BR, 'Browse the VÉRION collection and inspect each mechanical watch in interactive 3D, from case and dial to strap.'],
    blog: ['Journal — Watchmaking, Up Close | ' + BR, 'Stories about movements, materials and craftsmanship behind VÉRION’s 3D-visualised mechanical watches.'],
    about: ['About ' + BR + ' — Swiss-Inspired 3D Watchmaking', 'VÉRION pairs Swiss-inspired mechanical watchmaking with interactive 3D, so you can study every detail before you buy.'],
    contact: ['Contact | ' + BR + ' 3D Watches', 'Questions about a VÉRION watch, shipping or warranty? Get in touch with our team.'],
    cart: ['Your Cart | ' + BR + ' 3D Watches', 'Review the watches in your cart and check out securely.'],
    account: ['Account | ' + BR + ' 3D Watches', 'Sign in to manage your VÉRION orders and details.'],
    portfolio: ['Fatemeh Rostami — 3D Web Developer | ' + BR + ' Portfolio', 'Portfolio of Fatemeh Rostami, full-stack developer building interactive 3D web experiences with Three.js, WebGL2 and GSAP.'],
    product: (n, d, price) => [n + ' — Interactive 3D Watch | ' + BR, d + ' Rotate, open up and customise it in real-time 3D — from $' + price + '.'],
    post: t => [t + ' — ' + BR + ' Journal', null]
  },
  fa: {
    home: ['ساعت‌های لوکس سه‌بعدی — تماشا در ۳ بعد | ' + BR, 'ساعت‌های مکانیکی VÉRION با الهام از ساعت‌سازی سوئیس را در سه‌بعدی تعاملی ببین: بچرخان، موومنت را باز کن و پیش از خرید شخصی‌سازی کن.'],
    collection: ['کالکشن ساعت — نمایش سه‌بعدی | ' + BR, 'کالکشن VÉRION را مرور کن و هر ساعت مکانیکی را از بدنه و صفحه تا بند در سه‌بعدی تعاملی ببین.'],
    blog: ['مقالات — ساعت‌سازی از نزدیک | ' + BR, 'داستان‌هایی از موومنت، مواد و هنر ساخت ساعت‌های مکانیکی سه‌بعدی VÉRION.'],
    about: ['درباره‌ی ' + BR + ' — ساعت‌سازی سه‌بعدی با الهام از سوئیس', 'VÉRION ساعت‌سازی مکانیکی با الهام از سوئیس را با سه‌بعدی تعاملی ترکیب می‌کند تا پیش از خرید همه‌ی جزئیات را ببینی.'],
    contact: ['تماس | ساعت‌های سه‌بعدی ' + BR, 'درباره‌ی ساعت، ارسال یا گارانتی سؤال داری؟ با تیم ما در تماس باش.'],
    cart: ['سبد خرید | ' + BR, 'ساعت‌های سبد خرید را مرور کن و با خیال راحت پرداخت کن.'],
    account: ['حساب کاربری | ' + BR, 'برای مدیریت سفارش‌ها و اطلاعاتت وارد شو.'],
    portfolio: ['فاطمه رستمی — توسعه‌دهنده‌ی وب سه‌بعدی | ' + BR, 'نمونه‌کارهای فاطمه رستمی، توسعه‌دهنده‌ی فول‌استک و سازنده‌ی تجربه‌های وب سه‌بعدی تعاملی با Three.js، WebGL2 و GSAP.'],
    product: (n, d, price) => [n + ' — ساعت سه‌بعدی تعاملی | ' + BR, d + ' آن را در سه‌بعدی بچرخان، باز کن و شخصی‌سازی کن — از ' + price + ' دلار.'],
    post: t => [t + ' — مقالات ' + BR, null]
  }
}
export function pageMeta(pathname, lang = 'en') {
  const L = lang === 'fa' ? 'fa' : 'en', t = T[L], [a, b] = pathname.split('/').filter(Boolean)
  const fmt = n => n.toLocaleString(L === 'fa' ? 'fa-IR' : 'en-US')
  if (a === 'collection' && b) {
    const p = PRODUCTS.find(x => x.slug === b)
    if (p) { const name = (L === 'fa' ? p.name_fa : p.name).replace(/^(VÉRION|ورینون)\s+/, ''); const [ti, de] = t.product(name, p[L], fmt(p.price)); return { title: ti, description: de } }
  }
  if (a === 'blog' && b) {
    const p = POSTS.find(x => x.slug === b)
    if (p) { const [ti] = t.post(L === 'fa' ? p.title_fa : p.title); const body = (L === 'fa' ? p.body_fa : p.body) || ''; return { title: ti, description: clip(body.replace(/\s+/g, ' ').trim(), 155) || t.blog[1] } }
  }
  const k = a && t[a] && Array.isArray(t[a]) ? a : 'home', [title, description] = t[k]
  return { title, description }
}
