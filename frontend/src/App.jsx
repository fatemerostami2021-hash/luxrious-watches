import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './store.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Chat from './components/Chat.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import Home from './pages/Home.jsx'
const Product = lazy(() => import('./pages/Product.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'))
const Account = lazy(() => import('./pages/Account.jsx'))
const Collection = lazy(() => import('./pages/Collection.jsx'))
export default function App() {
  const { lang, theme } = useApp(), { pathname, hash } = useLocation()
  useEffect(() => { const h = document.documentElement; h.dir = lang === 'fa' ? 'rtl' : 'ltr'; h.lang = lang; h.dataset.theme = theme }, [lang, theme])
  useEffect(() => { const p = pathname.split('/').filter(Boolean); document.title = (p[0] ? `${p[1] ? p[1].toUpperCase().replace(/-/g, ' ') : p[0][0].toUpperCase() + p[0].slice(1)} | ` : '') + 'VÉRION — Luxury Mechanical Watches' }, [pathname])
  useEffect(() => { if (!hash) scrollTo(0, 0) }, [pathname])
  return <><Header />
    <main><Suspense fallback={<div className="page" />}><Routes><Route path="/" element={<Home />} /><Route path="/collection" element={<Collection />} /><Route path="/collection/:slug" element={<Product />} /><Route path="/cart" element={<Cart />} /><Route path="/blog" element={<Blog />} /><Route path="/blog/:slug" element={<BlogPost />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="/account" element={<Account />} /></Routes></Suspense></main>
    <Footer /><Chat /><CookieConsent /></>
}
