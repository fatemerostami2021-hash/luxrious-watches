import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Lightformer } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import Watch from './Watch.jsx'
import { useApp } from '../store.js'
function Rig({ ex, prog, opts, shift = 0, onPick, paused, tilt, lift = 0, sc = 1 }) {
  const g = useRef(), m = useRef([0, 0])
  useEffect(() => { const f = e => { m.current = [e.clientX / innerWidth - .5, e.clientY / innerHeight - .5] }; addEventListener('mousemove', f); return () => removeEventListener('mousemove', f) }, [])
  useFrame(({ camera, clock }) => {
    const p = prog?.current ?? 0
    camera.position.z += ((prog ? 8.5 - p * 2.2 : 8.8) - camera.position.z) * .06
    g.current.position.y += (lift - g.current.position.y) * .06; g.current.scale.setScalar(g.current.scale.x + (sc - g.current.scale.x) * .06)
    g.current.position.x += (shift - g.current.position.x) * .06
    const ty = (prog ? p * Math.PI * 1.6 + Math.sin(clock.elapsedTime * .4) * .15 : 0) + m.current[0] * .35
    g.current.rotation.y += (ty - g.current.rotation.y) * .08
    g.current.rotation.x += ((tilt ?? -.15) + m.current[1] * .25 - g.current.rotation.x) * .08
  })
  return <group ref={g}><Watch ex={ex} paused={paused} onPick={onPick} {...opts} /></group>
}
export default function Scene({ ex, prog, opts, interactive, shift, onPick, paused, ctrlRef, lift, sc }) {
  const theme = useApp(s => s.theme), low = typeof window !== 'undefined' && window.innerWidth < 768
  return <Canvas dpr={[1, low ? 1.25 : 2]} camera={{ position: [0, 0, 8.5], fov: 35 }} gl={{ antialias: !low, powerPreference: 'high-performance' }}>
    <color attach="background" args={[theme === 'light' ? '#f5efe3' : '#050506']} />
    <ambientLight intensity={.25} /><spotLight position={[4, 6, 6]} color="#ffe2bd" intensity={90} angle={.45} penumbra={1} /><pointLight position={[-4, -2, 3]} intensity={12} color="#9db4ff" />
    <Suspense fallback={null}><Environment resolution={128}><Lightformer form="rect" intensity={4} position={[0, 5, -5]} scale={[10, 5, 1]} /><Lightformer form="rect" intensity={2} position={[-5, 1, 3]} scale={[6, 6, 1]} rotation-y={Math.PI / 2} /><Lightformer form="rect" intensity={2} position={[5, 1, 3]} scale={[6, 6, 1]} rotation-y={-Math.PI / 2} /></Environment><Rig ex={ex} prog={prog} opts={opts} shift={shift} lift={lift} sc={sc} onPick={onPick} paused={paused} />
      {!low && <ContactShadows position={[0, -2.7, 0]} opacity={.45} blur={2.5} scale={10} />}</Suspense>
    {interactive && <OrbitControls ref={ctrlRef} enablePan={false} minDistance={4} maxDistance={9} />}
  </Canvas>
}
