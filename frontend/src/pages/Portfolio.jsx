import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApp } from '../store.js'
import Social from '../components/Social.jsx'
const Scene = lazy(() => import('../components/PortfolioScene.jsx'))
const PR = [['Kabab Dagh Nan Dagh', 'https://kababdagh.com'], ['Bonyan Sazeh Kourosh Kabir', 'https://construction-website-eosin.vercel.app'], ['E-ZONE', 'https://e-zone-app.vercel.app'], ['FitZone', 'https://gym-website-rvhj.vercel.app'], ['Apple-Style E-commerce', 'https://apple-project-flame.vercel.app'], ['LinkedIn Automation', '']]
const D = {
  en: { k: 'PORTFOLIO', name: 'Fatemeh Rostami', role: 'Full-Stack Developer · Interactive 3D Web', intro: 'Interactive Three.js / WebGL2 hero sections and GSAP scroll-driven interfaces for e-commerce, hospitality, medical and enterprise websites.',
    ah: 'About', ab: ['Full-stack developer and multilingual translator specializing in modern, responsive web platforms, with a focus on e-commerce, hospitality and service businesses.', 'Experienced across the MERN stack (React, Next.js, Node.js, MongoDB), PostgreSQL and WordPress/WooCommerce. Projects are delivered end-to-end for clients in Iran and on international freelance platforms, in Persian, English, Arabic and Turkish.'],
    sh: 'Skills', sk: [['3D & Motion', 'Three.js · WebGL2 · Canvas · GSAP & ScrollTrigger · Lenis · requestAnimationFrame loops'], ['Frontend', 'React · Next.js · Responsive design · Elementor · Dark/Light mode · Reusable components'], ['Backend & Data', 'Node.js · Express · Next.js API routes · MongoDB · PostgreSQL'], ['CMS & Automation', 'WordPress · WooCommerce · n8n · API integrations']],
    ph: 'Selected projects', pd: ['Trilingual restaurant website in Doha with online ordering, catering requests, QR menu and PWA prompts.', 'Next.js and MongoDB corporate site with a CMS admin panel, dark/light theme, RTL/LTR and 360° virtual tours.', 'Bilingual customs, warehouse and production management platform (React, Express, PostgreSQL).', 'Responsive gym platform built around trainee and coach dashboards.', 'Front-end store concept inspired by Apple’s product design language.', 'n8n pipeline: YouTube Data API, Gemini, DALL-E 3, Telegram Bot and Google Sheets.'], visit: 'Visit site',
    eh: 'Experience', ex: ['Freelance Full-Stack Developer & Translator on Freelancer.com, Fiverr, Karlancer and OpenSooq.', 'Interactive 3D hero sections and motion-rich interfaces (Three.js, WebGL2, GSAP, Lenis), optimized for performance.', 'Tiered proposals: WordPress/WooCommerce builds and custom React/Next.js solutions matched to budget.'], lang: 'Languages: Persian (native), English, Arabic, Turkish', ch: 'Let’s work together' },
  fa: { k: 'نمونه‌کار', name: 'فاطمه رستمی', role: 'توسعه‌دهنده‌ی فول‌استک · وب سه‌بعدی تعاملی', intro: 'بخش‌های هیرو تعاملی با Three.js و WebGL2 و رابط‌های اسکرول‌محور با GSAP برای وب‌سایت‌های فروشگاهی، رستورانی، پزشکی و سازمانی.',
    ah: 'درباره‌ی من', ab: ['توسعه‌دهنده‌ی فول‌استک و مترجم چندزبانه، متخصص پلتفرم‌های وب مدرن و ریسپانسیو با تمرکز بر فروشگاه اینترنتی، خدمات و کسب‌وکارهای میزبانی.', 'تجربه در استک MERN (React، Next.js، Node.js، MongoDB)، PostgreSQL و وردپرس/ووکامرس. پروژه‌ها را برای مشتریان ایران و پلتفرم‌های بین‌المللی فریلنسر به فارسی، انگلیسی، عربی و ترکی تحویل می‌دهم.'],
    sh: 'مهارت‌ها', sk: [['سه‌بعدی و موشن', 'Three.js · WebGL2 · Canvas · GSAP و ScrollTrigger · Lenis · حلقه‌های requestAnimationFrame'], ['فرانت‌اند', 'React · Next.js · طراحی ریسپانسیو · Elementor · حالت تیره/روشن · کامپوننت‌های قابل‌استفاده‌ی مجدد'], ['بک‌اند و داده', 'Node.js · Express · API Routes در Next.js · MongoDB · PostgreSQL'], ['CMS و اتوماسیون', 'وردپرس · ووکامرس · n8n · یکپارچه‌سازی API']],
    ph: 'پروژه‌های منتخب', pd: ['وب‌سایت سه‌زبانه‌ی رستوران در دوحه با سفارش آنلاین، درخواست کترینگ، منوی QR و PWA.', 'وب‌سایت سازمانی با Next.js و MongoDB، پنل ادمین CMS، تم تیره/روشن، RTL/LTR و تور مجازی ۳۶۰ درجه.', 'پلتفرم دوزبانه‌ی مدیریت گمرک، انبار و تولید (React، Express، PostgreSQL).', 'پلتفرم ریسپانسیو باشگاه ورزشی با داشبورد ورزشکار و مربی.', 'نمونه‌ی فروشگاه فرانت‌اند با الهام از زبان طراحی اپل.', 'پایپ‌لاین n8n: YouTube Data API، Gemini، DALL-E 3، ربات تلگرام و Google Sheets.'], visit: 'مشاهده‌ی سایت',
    eh: 'تجربه', ex: ['توسعه‌دهنده‌ی فول‌استک و مترجم فریلنسر در Freelancer.com، Fiverr، کارلنسر و OpenSooq.', 'هیروهای سه‌بعدی تعاملی و رابط‌های پرحرکت (Three.js، WebGL2، GSAP، Lenis) با بهینه‌سازی عملکرد.', 'پیشنهادهای پلکانی: ووکامرس/وردپرس و راه‌حل‌های سفارشی React/Next.js متناسب با بودجه.'], lang: 'زبان‌ها: فارسی (مادری)، انگلیسی، عربی، ترکی', ch: 'بیا با هم کار کنیم' } }
export default function Portfolio() {
  const lang = useApp(s => s.lang), d = D[lang], fa = lang === 'fa', root = useRef(), pin = useRef(), track = useRef(), prog = useRef(0)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger); const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: s => { prog.current = s.progress } })
      gsap.from('.pf-w > span', { yPercent: 115, opacity: 0, stagger: .12, duration: 1.1, ease: 'power4.out' })
      gsap.from('.pf-hero .pf-in', { y: 30, opacity: 0, stagger: .15, delay: .5, duration: 1, ease: 'power3.out' })
      gsap.utils.toArray('.pf-rv').forEach(el => gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
      gsap.from('.pf-sk', { y: 50, opacity: 0, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.pf-skills', start: 'top 80%' } })
      mm.add('(min-width: 900px)', () => { const tr = track.current; gsap.to(tr, { x: () => -(tr.scrollWidth - innerWidth + 120), ease: 'none', scrollTrigger: { trigger: pin.current, start: 'top top', end: () => '+=' + tr.scrollWidth, pin: true, scrub: 1, invalidateOnRefresh: true } }) })
    }, root)
    return () => { mm.revert(); ctx.revert() }
  }, [lang])
  return <main className="pf" ref={root}><div className="pf-stage" aria-hidden="true"><Suspense fallback={null}><Scene prog={prog} /></Suspense></div>
    <section className="pf-hero"><span className="kicker pf-in">{d.k}</span><h1>{d.name.split(' ').map(w => <span className="pf-w" key={w}><span>{w}</span></span>)}</h1><p className="pf-role pf-in">{d.role}</p><p className="lead pf-in">{d.intro}</p></section>
    <section className="pf-sec"><div className="glass pf-rv"><h2>{d.ah}</h2>{d.ab.map((x, i) => <p key={i} className="lead">{x}</p>)}</div></section>
    <section className="pf-sec"><h2 className="pf-rv pf-h2">{d.sh}</h2><div className="pf-skills">{d.sk.map(([a, b]) => <article key={a} className="glass pf-sk"><h3>{a}</h3><p className="lead">{b}</p></article>)}</div></section>
    <section className="pf-pin" ref={pin}><div className="pf-ph"><h2>{d.ph}</h2></div><div className="pf-track" ref={track} style={{ direction: 'ltr' }}>{PR.map(([n, u], i) => <article key={n} className="glass pf-card" style={{ direction: fa ? 'rtl' : 'ltr' }}><span className="kicker">0{i + 1}</span><h3>{n}</h3><p className="lead">{d.pd[i]}</p>{u && <a className="btn" href={u} target="_blank" rel="noopener noreferrer">{d.visit} ↗</a>}</article>)}</div></section>
    <section className="pf-sec"><div className="glass pf-rv"><h2>{d.eh}</h2>{d.ex.map((x, i) => <p key={i} className="lead">{x}</p>)}<p className="lead"><strong>{d.lang}</strong></p></div></section>
    <section className="pf-sec pf-end"><h2 className="pf-rv pf-h2">{d.ch}</h2><a className="btn fill" href="mailto:fatimarostami963369@gmail.com">fatimarostami963369@gmail.com</a><Social /></section></main>
}
