import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { useMemo, useRef } from 'react'
function Rig({ prog, accent }) {
  const g = useRef(), pts = useRef(), pos = useMemo(() => Float32Array.from({ length: 900 }, () => (Math.random() - .5) * 14), [])
  useFrame(({ camera, clock }) => {
    const p = prog.current, t = clock.elapsedTime, w = innerWidth > 900, side = document.documentElement.dir === 'rtl' ? -1 : 1
    g.current.rotation.y = p * Math.PI * 5 + t * .15; g.current.rotation.x = Math.sin(p * Math.PI * 2) * .35
    g.current.position.x += ((w ? side * 2.7 + Math.sin(p * Math.PI * 2) * .5 : 0) - g.current.position.x) * .05; g.current.scale.setScalar((w ? .6 : .46) * (1 + Math.sin(p * Math.PI) * .12))
    camera.position.z += ((w ? 8.4 : 9) - p - camera.position.z) * .05; pts.current.rotation.y = t * .03 + p * 1.2
  })
  const gold = <meshStandardMaterial color={accent} metalness={1} roughness={.3} wireframe transparent opacity={.5} />
  return <><group ref={g}><mesh><torusKnotGeometry args={[1.1, .32, 160, 16]} />{gold}</mesh><mesh><icosahedronGeometry args={[.7, 1]} /><meshStandardMaterial color="#d8a08a" metalness={1} roughness={.25} flatShading /></mesh>
    {[1.9, 2.4].map((r, i) => <mesh key={r} rotation={[Math.PI / 2.3 + i * .5, i, 0]}><torusGeometry args={[r, .012, 8, 120]} /><meshBasicMaterial color={accent} /></mesh>)}</group>
    <points ref={pts}><bufferGeometry><bufferAttribute attach="attributes-position" count={pos.length / 3} array={pos} itemSize={3} /></bufferGeometry><pointsMaterial size={.03} color={accent} sizeAttenuation transparent opacity={.7} /></points></>
}
export default function PortfolioScene({ prog, accent = '#c9a96e' }) {
  return <Canvas gl={{ alpha: true }} dpr={[1, 1.5]} camera={{ position: [0, 0, 7.5], fov: 40 }}><ambientLight intensity={.3} /><directionalLight position={[3, 4, 5]} intensity={2} />
    <Environment resolution={64}><Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 4, 1]} /><Lightformer form="rect" intensity={2} position={[-4, 0, 2]} scale={[4, 6, 1]} /></Environment><Rig prog={prog} accent={accent} /></Canvas>
}
