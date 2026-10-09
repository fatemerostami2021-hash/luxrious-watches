import { useEffect, useMemo, useRef } from 'react'
import { TOOLS } from '../toolsData.js'
import { buildTiers, metrics, place, rad, clamp, TILT, SPEED } from '../toolsLayout.js'
const fg = h => { const n = parseInt(h.slice(1), 16), l = ((n >> 16) * .299 + ((n >> 8) & 255) * .587 + (n & 255) * .114) / 255; return l > .62 ? '#0a0a0b' : '#ffffff' }
const Ico = ({ t, s = 26 }) => <span className="ti" style={{ background: t.c, color: fg(t.c) }}>{t.ic ? <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" aria-hidden="true"><path d={t.ic} /></svg> : <b>{t.m}</b>}</span>

export default function ToolsMountain({ fa, title, note, listLabel }) {
  const box = useRef(null), tiers = useMemo(() => buildTiers(TOOLS), [])
  useEffect(() => {
    const el = box.current; if (!el) return
    const rings = [...el.querySelectorAll('.ring')], nodes = [...el.querySelectorAll('.node')], peak = el.querySelector('.peak'), base = el.querySelector('.base')
    const flat = tiers.flatMap((t, ti) => t.items.map(it => ({ a: it.a, ti })))
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0, last = 0, phase = 0, paused = false, onscreen = true, tilt = TILT.rest, target = TILT.rest, W = 0, M = null
    const layout = () => {
      W = el.clientWidth; M = metrics(tiers, W); el.style.height = M.h + 'px'
      const cx = W / 2, bt = tiers[tiers.length - 1]
      peak.style.left = cx + 'px'; peak.style.top = M.cy + (tiers[0].y0 - 92) * M.k + 'px'
      const bw = M.rmax * 2.3 * M.k, bh = bw * Math.sin(rad(TILT.rest)) * 1.15
      Object.assign(base.style, { width: bw + 'px', height: bh + 'px', left: cx - bw / 2 + 'px', top: M.cy + (bt.y0 + 36) * M.k - bh / 2 + 'px' })
    }
    const draw = () => {
      if (!M) return
      const cx = W / 2, st = Math.sin(rad(tilt))
      rings.forEach((rg, i) => { const t = tiers[i], w = 2 * t.r * M.k, h = Math.max(2, w * st); rg.style.width = w + 'px'; rg.style.height = h + 'px'; rg.style.transform = `translate(${cx - w / 2}px,${M.cy + t.y0 * M.k - h / 2}px)` })
      nodes.forEach((nd, i) => { const f = flat[i], p = place(f.a, tiers[f.ti], phase, tilt, M.k)
        nd.style.transform = `translate(${cx + p.x}px,${M.cy + p.y}px) translate(-50%,-50%) scale(${p.s})`
        nd.style.opacity = p.o; nd.style.zIndex = p.z; nd.style.pointerEvents = p.o > .55 ? 'auto' : 'none' })
    }
    const tick = t => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(.05, (t - last) / 1000 || 0); last = t
      if (!onscreen) return
      if (!paused) phase = (phase + SPEED * dt) % 360
      tilt += (target - tilt) * Math.min(1, dt * 4); draw()
    }
    const move = e => { const r = el.getBoundingClientRect(); target = TILT.min + clamp((e.clientY - r.top) / r.height, 0, 1) * (TILT.max - TILT.min) }
    const enter = () => { paused = true }, leave = () => { paused = false; target = TILT.rest }
    layout(); draw()
    const ro = new ResizeObserver(() => { if (el.clientWidth !== W) { layout(); draw() } }); ro.observe(el)
    const io = new IntersectionObserver(([e]) => { onscreen = e.isIntersecting }); io.observe(el)
    if (!reduce) { el.addEventListener('pointermove', move); el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave); raf = requestAnimationFrame(tick) }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); el.removeEventListener('pointermove', move); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave) }
  }, [tiers])
  return <section className="pf-sec pf-tools"><h2 className="pf-h2">{title}</h2><p className="lead pf-j">{note}</p>
    <div className="scene3d" ref={box} aria-hidden="true"><span className="base" /><span className="peak" />
      {tiers.map(t => <i key={t.id} className="ring" />)}
      {tiers.flatMap(t => t.items.map(({ t: x }) => <a key={t.id + x.n} className="node" href={x.u} target="_blank" rel="noopener noreferrer" tabIndex={-1} title={x.n} style={{ '--c': x.c }}><Ico t={x} s={24} /><span className="nm">{x.n}</span></a>))}
    </div>
    <details className="pf-list"><summary>{listLabel}</summary>{TOOLS.map(c => <div key={c.id} className="pf-cat"><h3 className="kicker">{fa ? c.fa : c.en}</h3><div className="pf-chips">{c.items.map(t => <a key={t.n} className="pf-tool" href={t.u} target="_blank" rel="noopener noreferrer" style={{ '--c': t.c }}><Ico t={t} s={22} /><span className="tn"><strong>{t.n}</strong>{t.d && <em>{fa ? t.d[1] : t.d[0]}</em>}</span></a>)}</div></div>)}</details></section>
}
