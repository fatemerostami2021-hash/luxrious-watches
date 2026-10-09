import { useEffect } from 'react'
export default function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12 })
    document.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el)); return () => io.disconnect()
  }, [dep])
}
