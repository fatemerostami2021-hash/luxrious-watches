import { useRef, useState } from 'react'
export default function FlipText({ t, fa }) {
  const [go, setGo] = useState(false), tm = useRef()
  const parts = fa ? t.split(' ').map((w, i, a) => i < a.length - 1 ? w + '\u00a0' : w) : [...t].map(c => c === ' ' ? '\u00a0' : c)
  const kick = () => { setGo(true); clearTimeout(tm.current); tm.current = setTimeout(() => setGo(false), 900) }
  return <span className={'ft' + (go ? ' go' : '')} onPointerDown={kick} aria-label={t}><span className="ftin" aria-hidden="true">{parts.map((c, i) => <span key={i} className="c" style={{ '--i': i }} data-c={c}>{c}</span>)}</span></span>
}
