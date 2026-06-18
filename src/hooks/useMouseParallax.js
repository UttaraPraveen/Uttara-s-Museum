import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useMouseParallax(intensity = 18) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 55, damping: 22 })
  const springY = useSpring(y, { stiffness: 55, damping: 22 })

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      x.set(((e.clientX - cx) / cx) * intensity)
      y.set(((e.clientY - cy) / cy) * intensity)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [intensity, x, y])

  return { x: springX, y: springY }
}
