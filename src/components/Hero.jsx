import { motion } from 'framer-motion'
import {
  Telescope,
  Gem,
  Compass,
  Key,
  ScrollText,
  Feather,
  Sparkles,
} from 'lucide-react'
import './Hero.css'

const ARTIFACTS = [
  { Icon: Telescope, top: '10%', left: '6%', size: 32, delay: 0, rotate: -12 },
  { Icon: Gem, top: '18%', right: '10%', size: 28, delay: 0.8, rotate: 15 },
  { Icon: Compass, top: '55%', left: '4%', size: 26, delay: 1.4, rotate: -8 },
  { Icon: Key, top: '72%', right: '7%', size: 24, delay: 0.4, rotate: 20 },
  { Icon: ScrollText, top: '38%', right: '5%', size: 30, delay: 1.1, rotate: -18 },
  { Icon: Feather, top: '65%', left: '12%', size: 22, delay: 1.8, rotate: 10 },
  { Icon: Sparkles, top: '28%', left: '18%', size: 20, delay: 2.2, rotate: -5 },
  { Icon: Gem, top: '82%', left: '22%', size: 18, delay: 0.6, rotate: 25 },
]

function FloatingArtifact({ Icon, style, delay, rotate, size }) {
  return (
    <motion.div
      className="hero__artifact"
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0.25, 0.45, 0.25],
        y: [0, -14, 0],
        rotate: [rotate, rotate + 6, rotate],
      }}
      transition={{
        opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay },
        y: { duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay },
        rotate: { duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={1.25} />
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="museum-title">
      <div className="hero__arch" aria-hidden="true" />
      <div className="hero__floor" aria-hidden="true" />

      <div className="hero__artifacts">
        {ARTIFACTS.map(({ Icon, delay, rotate, size, ...position }, i) => (
          <FloatingArtifact
            key={i}
            Icon={Icon}
            delay={delay}
            rotate={rotate}
            size={size}
            style={position}
          />
        ))}
      </div>

      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero__eyebrow">Est. whenever curiosity struck</p>

        <h1 id="museum-title" className="hero__title">
          The Museum of Curious Things
          <span className="hero__title-accent">Built by Uttara</span>
        </h1>

        <p className="hero__subtitle">
          Step through the velvet rope and wander halls of odd inventions,
          half-finished wonders, and artifacts that probably shouldn&apos;t work — but do.
        </p>

        <motion.a
          href="#exhibits"
          className="hero__cta"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="hero__cta-label">Enter the Museum</span>
          <span className="hero__cta-arrow" aria-hidden="true">
            →
          </span>
        </motion.a>
      </motion.div>

      <div className="hero__plaque" aria-hidden="true">
        <span>Open daily</span>
        <span className="hero__plaque-dot">·</span>
        <span>Admission: wonder</span>
      </div>
    </section>
  )
}
