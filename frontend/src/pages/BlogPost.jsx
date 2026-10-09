import { Link, useParams } from 'react-router-dom'
import { POSTS } from '../posts.js'
import { useApp } from '../store.js'
export default function BlogPost() {
  const { slug } = useParams(), lang = useApp(s => s.lang), p = POSTS.find(x => x.slug === slug)
  if (!p) return <section className="page"><h2>404</h2><Link className="btn" to="/blog">←</Link></section>
  return <article className="page"><Link to="/blog" className="more">← {lang === 'fa' ? 'مجله' : 'Journal'}</Link>
    <span className="kicker">{lang === 'fa' ? p.tag_fa : p.tag} · {p.date}</span><h1>{lang === 'fa' ? p.title_fa : p.title}</h1>
    {(lang === 'fa' ? p.body_fa : p.body).split('\n\n').map((x, i) => <p key={i} className="lead">{x}</p>)}</article>
}
