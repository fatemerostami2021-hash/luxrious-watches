import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
export const CASES = { titanium: { color: '#8c9095', roughness: .3 }, steel: { color: '#d0d3d6', roughness: .18 }, rose: { color: '#dca48b', roughness: .2 } }
export const DIALS = { obsidian: '#15161a', ivory: '#7d7565', blue: '#14284f' }
export const STRAPS = { black: '#16161a', white: '#e9e9ec', gold: '#d4af6a' }
const rx = [Math.PI / 2, 0, 0], sm = x => x * x * (3 - 2 * x), cl = x => Math.min(1, Math.max(0, x))
function Part({ id, reg, onPick, children, ...p }) {
  const [h, setH] = useState(false), hl = h ? { emissive: '#c9a96e', emissiveIntensity: .55 } : {}
  return <group ref={el => { reg.current[id] = el }} {...p}
    onPointerOver={e => { e.stopPropagation(); setH(true); document.body.style.cursor = 'pointer' }}
    onPointerOut={() => { setH(false); document.body.style.cursor = '' }}
    onClick={e => { e.stopPropagation(); onPick?.(id) }}>{children(hl)}</group>
}
function Gear({ n, r, id, reg, pos, mat, w = .04 }) {
  const im = useRef()
  useLayoutEffect(() => { const o = new THREE.Object3D(); for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; o.position.set(Math.cos(a) * r, Math.sin(a) * r, 0); o.rotation.z = a; o.updateMatrix(); im.current.setMatrixAt(i, o.matrix) } im.current.instanceMatrix.needsUpdate = true }, [n, r])
  return <group position={[pos[0], pos[1], 0]}><group ref={el => { reg.current[id] = el }}>
    <mesh><torusGeometry args={[r * .84, r * .08, 6, 32]} />{mat}</mesh>
    <mesh rotation={rx}><cylinderGeometry args={[r * .16, r * .16, w * 1.6, 16]} />{mat}</mesh>
    {[0, 1, 2, 3].map(i => <mesh key={i} rotation={[0, 0, i * Math.PI / 4]}><boxGeometry args={[r * 1.7, r * .07, w]} />{mat}</mesh>)}
    <instancedMesh ref={im} args={[null, null, n]}><boxGeometry args={[r * .2, Math.PI * r / n * .9, w]} />{mat}</instancedMesh></group></group>
}
export default function Watch({ ex, c = 'rose', d = 'obsidian', s = 'black', onPick, paused }) {
  const reg = useRef({}), T = useRef(0), e = useRef(0), crownSpin = useRef(0)
  const cm = CASES[c], tint = DIALS[d], gold = '#d9a98f'
  const chain = useMemo(() => {
    const dir = a => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)], rr = n => n * .011
    const nn = [26, 24, 20, 16, 14], P = [[-.51, .3], [0, 0]]
    ;[[2, -20], [3, -80], [4, 200]].forEach(([i, a]) => { const q = P[i - 1], k = (rr(nn[i - 1]) + rr(nn[i])) * 1, v = dir(a); P.push([q[0] + v[0] * k, q[1] + v[1] * k]) })
    const w = [.3]; for (let i = 1; i < 4; i++) w.push(-w[i - 1] * nn[i - 1] / nn[i])
    return nn.map((n, i) => ({ n, r: rr(n), p: P[i], w: w[i] }))
  }, [])
  const M = h => <meshStandardMaterial color={cm.color} metalness={1} roughness={cm.roughness} envMapIntensity={1.2} {...h} />
  const G = h => <meshStandardMaterial color={gold} metalness={1} roughness={.28} {...h} />
  const S = h => <meshStandardMaterial color="#9a9ca0" metalness={1} roughness={.35} {...h} />
  useFrame((_, dt) => {
    if (!paused?.current) T.current += Math.min(dt, .05)
    const t = T.current, g = reg.current; e.current += ((ex?.current ?? 0) - e.current) * .07
    const st = i => sm(cl(e.current * 8 - i))
    g.crystal.position.z = .34 + 2 * st(0); g.bezel.position.z = .22 + 1.5 * st(1); g.hands.position.z = .2 + 1.1 * st(2); g.chapter.position.z = .12 + .8 * st(3)
    g.train.position.z = .05 + .4 * st(4); g.esc.position.z = .08 + .6 * st(5); g.plate.position.z = -.06 - .5 * st(6)
    g.case.position.z = -.22 - 1 * st(7); g.crown.position.x = 1.16 + .8 * st(7); g.strapT.position.y = 1.6 + .9 * st(7); g.strapB.position.y = -1.6 - .9 * st(7)
    const d0 = new Date(), S0 = d0.getSeconds() + d0.getMilliseconds() / 1000, TAU = Math.PI * 2
    g.sec.rotation.z = -S0 / 60 * TAU; g.min.rotation.z = -(d0.getMinutes() + S0 / 60) / 60 * TAU; g.hour.rotation.z = -((d0.getHours() % 12) + d0.getMinutes() / 60) / 12 * TAU
    chain.forEach((o, i) => { if (i < 4) g['g' + i].rotation.z = o.w * t })
    const f = t * 5; g.g4.rotation.z = -(Math.floor(f) + sm(cl((f % 1) * 4))) * TAU / 14
    g.bal.rotation.z = Math.sin(t * TAU * 2.5) * 1.3; g.cage.rotation.z = t * .6; g.tbal.rotation.z = Math.sin(t * TAU * 2.5) * 1.1
    crownSpin.current *= .94; g.crown.rotation.x += crownSpin.current
  })
  const P = { reg, onPick }
  return <group>
    <Part id="strapT" {...P} position={[0, 1.6, -.12]} rotation={[-.12, 0, 0]}>{h => <Links s={s} h={h} />}</Part>
    <Part id="strapB" {...P} position={[0, -1.6, -.12]} rotation={[.12, 0, 0]}>{h => <Links s={s} h={h} />}</Part>
    <Part id="case" {...P} position={[0, 0, -.22]}>{h => <><mesh rotation={rx}><cylinderGeometry args={[1.12, 1.12, .34, 64, 1, true]} /><M2 h={h} cm={cm} /></mesh>
      {[[-.5, 1], [.5, 1], [-.5, -1], [.5, -1]].map(([x, y], i) => <mesh key={i} position={[x, y * 1.08, -.02]}><boxGeometry args={[.2, .5, .2]} />{M(h)}</mesh>)}</>}</Part>
    <Part id="crown" {...P} position={[1.16, 0, -.05]} onPick={id => { crownSpin.current = .5; onPick?.(id) }}>{h => <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.13, .13, .24, 20]} />{G(h)}</mesh>}</Part>
    <Part id="plate" {...P} position={[0, 0, -.06]}>{h => <><mesh rotation={rx}><cylinderGeometry args={[.95, .95, .03, 48]} /><meshStandardMaterial color="#0c0d10" metalness={.8} roughness={.5} /></mesh>
      <mesh><torusGeometry args={[.88, .05, 8, 48]} />{S(h)}</mesh>{[20, 140, 260].map(a => <mesh key={a} rotation={[0, 0, a * Math.PI / 180]} position={[0, 0, .03]}><boxGeometry args={[1.7, .09, .03]} /><meshStandardMaterial color={tint} metalness={.9} roughness={.4} {...h} /></mesh>)}</>}</Part>
    <Part id="train" {...P} position={[0, 0, .05]}>{h => <>{chain.slice(0, 4).map((o, i) => <Gear key={i} id={'g' + i} reg={reg} n={o.n} r={o.r} pos={o.p} mat={i % 2 ? S(h) : G(h)} />)}</>}</Part>
    <Part id="esc" {...P} position={[0, 0, .08]}>{h => <>
      <Gear id="g4" reg={reg} n={chain[4].n} r={chain[4].r} pos={chain[4].p} mat={S(h)} />
      <group position={[.35, .5, 0]}><group ref={el => { reg.current.bal = el }}><mesh><torusGeometry args={[.28, .03, 8, 40]} />{G(h)}</mesh><mesh><torusGeometry args={[.12, .008, 6, 40]} />{S(h)}</mesh><mesh rotation={[0, 0, 0]}><boxGeometry args={[.56, .03, .03]} />{G(h)}</mesh></group></group>
      <group position={[-.3, -.55, 0]}><group ref={el => { reg.current.cage = el }}><mesh><torusGeometry args={[.26, .02, 8, 32]} />{S(h)}</mesh><mesh><boxGeometry args={[.52, .02, .02]} />{S(h)}</mesh><group ref={el => { reg.current.tbal = el }}><mesh><torusGeometry args={[.13, .015, 8, 24]} />{G(h)}</mesh></group></group></group></>}</Part>
    <Part id="chapter" {...P} position={[0, 0, .12]}>{h => <><mesh><torusGeometry args={[.93, .012, 6, 64]} />{G(h)}</mesh>{Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return <mesh key={i} position={[Math.sin(a) * .82, Math.cos(a) * .82, 0]} rotation={[0, 0, -a]}><boxGeometry args={[i % 3 ? .035 : .06, .14, .02]} />{G(h)}</mesh> })}</>}</Part>
    <Part id="hands" {...P} position={[0, 0, .2]}>{h => <>
      <group ref={el => { reg.current.hour = el }}><mesh position={[0, .22, 0]}><boxGeometry args={[.07, .46, .02]} />{G(h)}</mesh></group>
      <group ref={el => { reg.current.min = el }}><mesh position={[0, .36, .02]}><boxGeometry args={[.05, .72, .02]} />{G(h)}</mesh></group>
      <group ref={el => { reg.current.sec = el }}><mesh position={[0, .3, .04]}><boxGeometry args={[.01, .8, .01]} /><meshStandardMaterial color="#c33" /></mesh></group>
      <mesh rotation={rx} position={[0, 0, .05]}><cylinderGeometry args={[.05, .05, .06, 16]} />{S(h)}</mesh></>}</Part>
    <Part id="bezel" {...P} position={[0, 0, .22]}>{h => <mesh><torusGeometry args={[1.02, .1, 24, 80]} />{M(h)}</mesh>}</Part>
    <Part id="crystal" {...P} position={[0, 0, .34]}>{() => <mesh rotation={rx}><cylinderGeometry args={[.95, .95, .03, 64]} /><meshPhysicalMaterial transmission={1} thickness={.1} roughness={0} ior={1.5} transparent opacity={.35} envMapIntensity={2} /></mesh>}</Part>
  </group>
}
function M2({ h, cm }) { return <meshStandardMaterial color={cm.color} metalness={1} roughness={cm.roughness} side={THREE.DoubleSide} {...h} /> }

const SM = { black: ['#16161a', .3], white: ['#e9e9ec', .2], gold: ['#d4af6a', .22] }
function Links({ s, h }) { const [col, ro] = SM[s] || SM.black; return <>{Array.from({ length: 6 }, (_, i) => <group key={i} position={[0, .7 - i * .27, 0]}><mesh><boxGeometry args={[.9, .24, .09]} /><meshStandardMaterial color={col} metalness={1} roughness={ro} envMapIntensity={1.3} {...h} /></mesh><mesh position={[0, 0, .05]}><boxGeometry args={[.5, .2, .02]} /><meshStandardMaterial color={col} metalness={1} roughness={ro * .6} {...h} /></mesh></group>)}</> }
