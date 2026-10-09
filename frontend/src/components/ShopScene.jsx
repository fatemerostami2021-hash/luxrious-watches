import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import Watch from './Watch.jsx'
const sm = x => x * x * (3 - 2 * x), cl = x => Math.min(1, Math.max(0, x)), PERIOD = 17
const KEYS = [[0, [2.5, 1.7, 9], [0, 1.2, 2]], [5, [1.8, 1.6, 4.6], [0, 1.3, .8]], [8, [-3, 1.9, 3.2], [0, 1.6, -1]], [12, [0, 1.95, 1.2], [0, 1.9, -1]], [15, [.6, 2, 1.7], [0, 1.9, -1]], [17, [2.5, 1.7, 9], [0, 1.2, 2]]]
const marble = <meshStandardMaterial color="#121214" metalness={.7} roughness={.3} />
const glassM = <meshPhysicalMaterial color="#cfd8e6" transparent opacity={.16} roughness={0} metalness={.1} envMapIntensity={2} />
function Rig({ T, onStep }) {
  const look = useRef(new THREE.Vector3()), step = useRef(-1)
  useFrame(({ camera }, dt) => {
    T.current = (T.current + Math.min(dt, .05)) % PERIOD; const t = T.current
    let i = KEYS.findIndex((k, j) => t >= k[0] && t < KEYS[j + 1][0]); if (i < 0) i = 0
    const [a, pa, la] = KEYS[i], [b, pb, lb] = KEYS[i + 1], k = sm((t - a) / (b - a))
    camera.position.set(0, 0, 0).add(new THREE.Vector3(...pa).lerp(new THREE.Vector3(...pb), k))
    look.current.set(...la).lerp(new THREE.Vector3(...lb), k); camera.lookAt(look.current)
    const s = t < 5 ? 0 : t < 8 ? 1 : t < 12 ? 2 : 3; if (s !== step.current) { step.current = s; onStep(s) }
  })
  return null
}
function Mini({ x, c, d }) {
  const m = <meshStandardMaterial color={c} metalness={1} roughness={.25} />
  return <group position={[x, 0, -3.2]}><mesh position={[0, .5, 0]}>{null}<boxGeometry args={[.9, 1, .9]} />{marble}</mesh>
    <mesh position={[0, 1.6, 0]}><boxGeometry args={[.85, 1.2, .85]} />{glassM}</mesh>
    <group position={[0, 1.6, 0]} scale={.22}><mesh><torusGeometry args={[1, .12, 16, 40]} />{m}</mesh><mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.95, .95, .06, 32]} /><meshStandardMaterial color={d} /></mesh>
      <mesh position={[0, .35, .05]}><boxGeometry args={[.06, .7, .02]} />{m}</mesh><mesh position={[.3, 0, .05]} rotation={[0, 0, 1.4]}><boxGeometry args={[.05, .6, .02]} />{m}</mesh>
      {[1.7, -1.7].map(y => <mesh key={y} position={[0, y, -.05]}><boxGeometry args={[.9, 1.4, .1]} /><meshStandardMaterial color="#1a1512" roughness={.8} /></mesh>)}</group></group>
}
function Featured({ T }) {
  const g = useRef(), glass = useRef(), ex = useRef(0)
  useFrame((_, dt) => {
    const t = T.current, lift = sm(cl((t - 8) / 1.5)) * (1 - sm(cl((t - 15) / 1.5)))
    g.current.position.y = 1.95 + .2 * lift; g.current.rotation.y += dt * (.35 + lift * .5)
    ex.current = sm(cl((t - 9.5) / 1.5)) * (1 - sm(cl((t - 12.5) / 1.5))); glass.current.visible = !(t > 8 && t < 15.5)
  })
  return <group position={[0, 0, -1]}><mesh position={[0, .5, 0]}><cylinderGeometry args={[.72, .78, 1, 48]} />{marble}</mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.01, 0]}><torusGeometry args={[.64, .013, 8, 64]} /><meshBasicMaterial color="#e2b86a" /></mesh>
    <mesh ref={glass} position={[0, 1.95, 0]}><cylinderGeometry args={[.64, .64, 1.9, 40, 1, true]} />{glassM}</mesh>
    <group ref={g} position={[0, 1.95, 0]} scale={.28}><Watch ex={ex} c="rose" d="obsidian" s="black" /></group></group>
}
function Client({ T }) {
  const g = useRef(), arm = useRef(), s1 = useRef(), s2 = useRef()
  const prof = useMemo(() => [[.001, 0], [.36, 0], [.33, .12], [.27, .5], [.19, .85], [.125, 1.05], [.16, 1.22], [.185, 1.36], [.15, 1.48], [.001, 1.5]].map(([x, y]) => new THREE.Vector2(x, y)), [])
  const gold = <meshStandardMaterial color="#e2b86a" metalness={1} roughness={.2} />, skin = <meshStandardMaterial color="#d8b79c" roughness={.65} />, hair = <meshStandardMaterial color="#1c120d" roughness={.5} />
  useFrame(() => {
    const t = T.current, w = sm(cl(t / 5)), walk = t < 5
    g.current.position.set(-.4 - .7 * w, walk ? Math.abs(Math.sin(t * 7)) * .02 : 0, 5.5 - 4.9 * w)
    g.current.rotation.y = Math.PI - .6 * sm(cl((t - 4.5) / 1.2)); g.current.rotation.z = walk ? Math.sin(t * 7) * .025 : 0
    const k = walk ? Math.sin(t * 7) * .12 : 0; s1.current.position.z = k; s2.current.position.z = -k
    arm.current.rotation.x = -1.3 * sm(cl((t - 8) / 1)) * (1 - sm(cl((t - 13) / 1.2)))
  })
  const limb = <><mesh position={[0, -.27, 0]}><cylinderGeometry args={[.027, .022, .55, 10]} />{skin}</mesh></>
  return <group ref={g}>
    <mesh><latheGeometry args={[prof, 28]} /><meshStandardMaterial color="#0a0a0c" metalness={.35} roughness={.3} envMapIntensity={1.6} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.05, 0]}><torusGeometry args={[.13, .012, 8, 24]} />{gold}</mesh>
    <mesh position={[0, 1.6, 0]}><cylinderGeometry args={[.035, .04, .12, 12]} />{skin}</mesh>
    <mesh position={[0, 1.56, .02]} rotation={[Math.PI / 2.2, 0, 0]}><torusGeometry args={[.075, .007, 8, 24]} />{gold}</mesh>
    <mesh position={[0, 1.73, 0]} scale={[1, 1.15, 1]}><sphereGeometry args={[.1, 24, 20]} />{skin}</mesh>
    <mesh position={[0, 1.75, -.025]} scale={[1.08, 1.12, 1.05]}><sphereGeometry args={[.105, 24, 20]} />{hair}</mesh>
    <mesh position={[0, 1.45, -.1]}><capsuleGeometry args={[.085, .5, 6, 14]} />{hair}</mesh>
    {[-.1, .1].map(x => <mesh key={x} position={[x, 1.69, 0]}><sphereGeometry args={[.014, 10, 8]} />{gold}</mesh>)}
    <group position={[-.2, 1.45, 0]}>{limb}<mesh position={[0, -.55, .03]}><boxGeometry args={[.16, .1, .035]} />{gold}</mesh></group>
    <group ref={arm} position={[.2, 1.45, 0]}>{limb}<mesh position={[0, -.5, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.024, .006, 6, 12]} />{gold}</mesh></group>
    <mesh ref={s1} position={[-.07, .03, 0]}><boxGeometry args={[.07, .06, .14]} /><meshStandardMaterial color="#0a0a0c" /></mesh>
    <mesh ref={s2} position={[.07, .03, 0]}><boxGeometry args={[.07, .06, .14]} /><meshStandardMaterial color="#0a0a0c" /></mesh>
  </group>
}
export default function ShopScene({ onStep }) {
  const T = useRef(0)
  return <Canvas dpr={[1, 1.5]} camera={{ position: [2.5, 1.7, 9], fov: 40 }} gl={{ powerPreference: 'high-performance' }}>
    <color attach="background" args={['#050506']} /><fog attach="fog" args={['#050506', 9, 24]} />
    <ambientLight intensity={.18} /><spotLight position={[0, 6, 1]} color="#ffd9a0" intensity={140} angle={.4} penumbra={1} /><pointLight position={[-4, 2.5, -3]} color="#e2b86a" intensity={14} /><pointLight position={[4, 2.5, -3]} color="#e2b86a" intensity={14} />
    <Suspense fallback={null}><Environment resolution={128}><Lightformer form="rect" intensity={3} position={[0, 5, -3]} scale={[10, 4, 1]} /><Lightformer form="rect" intensity={1.5} position={[-5, 2, 3]} scale={[5, 5, 1]} rotation-y={Math.PI / 2} /></Environment>
      <Rig T={T} onStep={onStep} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#0b0b0d" metalness={.6} roughness={.35} /></mesh>
      <mesh position={[0, 2.5, -5]}><boxGeometry args={[18, 5, .2]} />{marble}</mesh>
      {[3.6, .15].map(y => <mesh key={y} position={[0, y, -4.85]}><boxGeometry args={[14, .04, .04]} /><meshBasicMaterial color="#e2b86a" /></mesh>)}
      <Mini x={-4} c="#8c9095" d="#14284f" /><Mini x={-2.2} c="#d0d3d6" d="#0b0b0d" /><Mini x={2.2} c="#d8a08a" d="#e8dfcb" /><Mini x={4} c="#8c9095" d="#0b0b0d" />
      <Featured T={T} /><Client T={T} /></Suspense>
  </Canvas>
}
