import { useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import {
  Star,
  Sparkles,
  Compass,
  BookOpen,
  FlaskConical,
  Map,
} from 'lucide-react'
import { useMouseParallax } from '../hooks/useMouseParallax'

const HERO_SCRAPS = [
  {
    id: 'polaroid-1',
    type: 'polaroid',
    icon: FlaskConical,
    caption: '3am experiment',
    top: '14%',
    left: '4%',
    rotate: -14,
    depth: 1.4,
    tape: 'sage',
  },
  {
    id: 'polaroid-2',
    type: 'polaroid',
    icon: Compass,
    caption: 'found this!',
    top: '18%',
    right: '5%',
    rotate: 11,
    depth: 1.2,
    tape: 'pink',
  },
  {
    id: 'note-1',
    type: 'note',
    text: "don't lose this idea →",
    top: '42%',
    left: '2%',
    rotate: -6,
    depth: 0.9,
  },
  {
    id: 'stamp-1',
    type: 'stamp',
    text: 'Collected',
    top: '30%',
    right: '3%',
    rotate: -18,
    depth: 0.7,
  },
  {
    id: 'polaroid-3',
    type: 'polaroid',
    icon: Map,
    caption: 'side quest log',
    bottom: '22%',
    left: '6%',
    rotate: 8,
    depth: 1.1,
    tape: 'gold',
  },
  {
    id: 'note-2',
    type: 'note',
    text: '★ built with love',
    bottom: '18%',
    right: '4%',
    rotate: 5,
    depth: 0.8,
  },
  {
    id: 'sticker-1',
    type: 'sticker',
    emoji: '✦',
    top: '55%',
    left: '10%',
    rotate: -20,
    depth: 1.3,
  },
  {
    id: 'sticker-2',
    type: 'sticker',
    emoji: '♡',
    top: '12%',
    left: '22%',
    rotate: 12,
    depth: 1,
  },
  {
    id: 'sticker-3',
    type: 'sticker',
    emoji: '→',
    bottom: '30%',
    right: '12%',
    rotate: -8,
    depth: 1.15,
  },
]

const PAGE_SCRAPS = [
  { id: 'pg-1', emoji: '✿', top: '120%', left: '3%', rotate: -10 },
  { id: 'pg-2', emoji: '☆', top: '200%', right: '4%', rotate: 15 },
  { id: 'pg-3', emoji: '◇', top: '280%', left: '6%', rotate: -5 },
  { id: 'pg-4', emoji: '✧', top: '360%', right: '5%', rotate: 8 },
]

function ScrapPiece({ item, springX, springY, onStickerClick, clickedStickers }) {
  const Icon = item.icon
  const isClicked = clickedStickers.has(item.id)
  const x = useTransform(springX, (v) => v * item.depth * 0.55)
  const y = useTransform(springY, (v) => v * item.depth * 0.55)

  const baseStyle = {
    top: item.top,
    left: item.left,
    right: item.right,
    bottom: item.bottom,
    '--r': `${item.rotate}deg`,
    rotate: `${item.rotate}deg`,
    zIndex: Math.round(item.depth * 10),
  }

  if (item.type === 'polaroid') {
    return (
      <motion.div
        className="scrap-piece scrap-polaroid scrap-piece--torn scrap-drift"
        style={{ ...baseStyle, x, y }}
        whileHover={{ scale: 1.06, rotate: item.rotate + 4, zIndex: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <span
          className={`washi-tape washi-tape--${item.tape}`}
          style={{ top: -9, left: '50%', transform: 'translateX(-50%) rotate(-2deg)', width: 48 }}
        />
        <div className="scrap-polaroid__img">
          {Icon && <Icon size={28} strokeWidth={1.5} />}
        </div>
        <p className="scrap-polaroid__cap">{item.caption}</p>
      </motion.div>
    )
  }

  if (item.type === 'note') {
    return (
      <motion.div
        className="scrap-piece scrap-note scrap-piece--torn scrap-drift-slow"
        style={{ ...baseStyle, x, y }}
        whileHover={{ scale: 1.05, rotate: item.rotate - 3 }}
      >
        <span
          className="washi-tape washi-tape--blue"
          style={{ top: -8, right: 8, width: 36, transform: 'rotate(8deg)' }}
        />
        {item.text}
      </motion.div>
    )
  }

  if (item.type === 'stamp') {
    return (
      <motion.div
        className="scrap-piece scrap-stamp scrap-drift-slow"
        style={{ ...baseStyle, x, y }}
        whileHover={{ scale: 1.1, opacity: 1 }}
      >
        {item.text}
      </motion.div>
    )
  }

  return (
    <motion.button
      type="button"
      className={`scrap-piece scrap-sticker scrap-drift ${isClicked ? 'scrap-sticker--clicked' : ''}`}
      style={{ ...baseStyle, x, y, '--r': `${item.rotate}deg` }}
      whileHover={{ scale: 1.15, rotate: item.rotate + 10 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onStickerClick(item.id)}
      aria-label={`Sticker ${item.emoji}`}
    >
      {item.emoji}
    </motion.button>
  )
}

export function HeroScrapbookLayer() {
  const { x: springX, y: springY } = useMouseParallax(22)
  const [clickedStickers, setClickedStickers] = useState(new Set())

  const onStickerClick = (id) => {
    setClickedStickers((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setClickedStickers((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 450)
  }

  return (
    <div className="hero-scrapbook">
      <div className="floating-artifacts" aria-hidden="true">
        {[
          { Icon: BookOpen, top: '8%', right: '18%', size: 36, delay: 0 },
          { Icon: Star, top: '65%', left: '15%', size: 28, delay: 1 },
          { Icon: Sparkles, bottom: '12%', left: '20%', size: 24, delay: 2 },
        ].map(({ Icon, top, right, left, bottom, size, delay }, i) => (
          <motion.div
            key={i}
            className="artifact float-b"
            style={{
              top,
              right,
              left,
              bottom,
              color: 'var(--rose)',
              opacity: 0.22,
              animationDelay: `${delay}s`,
            }}
            animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
            transition={{
              duration: 5 + delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          >
            <Icon size={size} strokeWidth={1.25} />
          </motion.div>
        ))}
      </div>

      {HERO_SCRAPS.map((item) => (
        <ScrapPiece
          key={item.id}
          item={item}
          springX={springX}
          springY={springY}
          onStickerClick={onStickerClick}
          clickedStickers={clickedStickers}
        />
      ))}
    </div>
  )
}

function PageScrap({ item }) {
  const [popped, setPopped] = useState(false)

  return (
    <motion.button
      type="button"
      className={`scrap-piece scrap-sticker scrap-drift-slow ${popped ? 'scrap-sticker--clicked' : ''}`}
      style={{
        position: 'absolute',
        top: item.top,
        left: item.left,
        right: item.right,
        '--r': `${item.rotate}deg`,
        rotate: `${item.rotate}deg`,
      }}
      whileHover={{ scale: 1.2, rotate: item.rotate + 12 }}
      whileTap={{ scale: 0.85 }}
      onClick={() => {
        setPopped(true)
        setTimeout(() => setPopped(false), 450)
      }}
      aria-label={`Page sticker ${item.emoji}`}
    >
      {item.emoji}
    </motion.button>
  )
}

export function PageScrapLayer() {
  return (
    <div className="page-scrap-layer" aria-hidden="true">
      {PAGE_SCRAPS.map((item) => (
        <PageScrap key={item.id} item={item} />
      ))}
    </div>
  )
}

export function RoomDoodles({ left, right }) {
  return (
    <>
      {left && <span className="room-header-doodle room-header-doodle--left">{left}</span>}
      {right && <span className="room-header-doodle room-header-doodle--right">{right}</span>}
    </>
  )
}
