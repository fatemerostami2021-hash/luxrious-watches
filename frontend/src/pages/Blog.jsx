import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../data.js'
import { POSTS } from '../posts.js'
import { useApp } from '../store.js'
export default function Blog() {
  const fa = useApp(s => s.lang) === 'fa', [posts, setPosts] = useState(POSTS), [i, setI] = useState(0), [vErr, setVErr] = useState(false)
  useEffect(() => { fetch(`${API}/posts`).then(r => r.json()).then(d => Array.isArray(d) && setPosts([...POSTS, ...d.filter(x => !POSTS.some(p => p.slug === x.slug))])).catch(() => {}) }, [])
  const hero = posts.slice(0, 3), n = hero.length, s = hero[i % n]
  useEffect(() => { const id = setInterval(() => setI(x => (x + 1) % n), 6500); return () => clearInterval(id) }, [i, n])
  const go = d => setI(x => (x + d + n) % n)
  return <>
    <section className="ahero" aria-roledescription="carousel" aria-label={fa ? 'مقالات ویژه' : 'Featured articles'}>
      {!vErr && <video autoPlay muted loop playsInline preload="metadata" onError={() => setVErr(true)}><source src="/articles/hero-articles.mp4" type="video/mp4" /></video>}
      <div className="aslide" key={s.slug} aria-live="polite"><span className="kicker">{fa ? s.tag_fa : s.tag} · {s.date}</span><h2>{fa ? s.title_fa : s.title}</h2><p>{((fa ? s.body_fa : s.body) || '').split('\n\n')[0]}</p><Link className="btn fill" to={`/blog/${s.slug}`}>{fa ? 'خواندن مقاله' : 'Read article'}</Link></div>
      <div className="actl"><div className="dots">{hero.map((h, j) => <button key={h.slug} aria-label={`${j + 1}`} className={j === i % n ? 'on' : ''} onClick={() => setI(j)} />)}</div><div className="arrs"><button aria-label="prev" onClick={() => go(-1)}>{fa ? '→' : '←'}</button><button aria-label="next" onClick={() => go(1)}>{fa ? '←' : '→'}</button></div></div></section>
    <section className="page wide"><h1>{fa ? 'مقالات' : 'Journal'}</h1>
      <div className="grid">{posts.map(p => <Link key={p.slug} to={`/blog/${p.slug}`} className="card"><span className="kicker">{fa ? p.tag_fa : p.tag}</span><h3>{fa ? p.title_fa : p.title}</h3><p>{((fa ? p.body_fa : p.body) || '').split('\n\n')[0]}</p><span className="more">{fa ? 'ادامه' : 'Read'} →</span></Link>)}</div></section></>
}
