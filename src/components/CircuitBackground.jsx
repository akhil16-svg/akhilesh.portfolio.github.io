/**
 * CircuitBackground.jsx
 * ─────────────────────────────────────────────────────────────────
 * Canvas-based interactive circuit board animation.
 * On idle: completely invisible.
 * On mouse move: glowing circuit traces radiate from the cursor,
 * fading out after ~1.5 seconds — like electricity flowing through a PCB.
 * Hidden on touch/mobile devices.
 */

import { useEffect, useRef, useCallback } from 'react'

/* ── CONFIG ──────────────────────────────────── */
const GRID      = 48      // px between grid nodes
const MAX_SEGS  = 80      // max active circuit segments
const FADE_MS   = 1400    // ms for a segment to fully fade
const COLORS    = [
  'rgba(197, 169, 106,',  // amber gold (primary)
  'rgba(110, 168, 200,',  // steel blue (secondary)
]

/* Directions: right, down, left, up */
const DIRS = [
  { dx: 1,  dy: 0  },
  { dx: 0,  dy: 1  },
  { dx: -1, dy: 0  },
  { dx: 0,  dy: -1 },
]

export default function CircuitBackground() {
  const canvasRef  = useRef(null)
  const mouseRef   = useRef({ x: -1000, y: -1000 })
  const segsRef    = useRef([])
  const rafRef     = useRef(null)
  const isTouchRef = useRef(false)

  /* Snap a pixel coord to the nearest grid node */
  const snap = useCallback((v) => Math.round(v / GRID) * GRID, [])

  /* Grow a new random circuit trace from the cursor grid node */
  const spawnTrace = useCallback((ox, oy) => {
    const segments = segsRef.current
    if (segments.length >= MAX_SEGS) return

    /* Pick a random direction and random length 2–6 hops */
    const dir    = DIRS[Math.floor(Math.random() * DIRS.length)]
    const hops   = 2 + Math.floor(Math.random() * 5)
    const color  = COLORS[Math.floor(Math.random() * COLORS.length)]
    const now    = performance.now()

    let x = ox, y = oy
    for (let i = 0; i < hops; i++) {
      const nx = x + dir.dx * GRID
      const ny = y + dir.dy * GRID

      /* 30% chance to turn at each step */
      if (Math.random() < 0.3 && i > 0) {
        const turn = DIRS[Math.floor(Math.random() * DIRS.length)]
        segments.push({ x1: x, y1: y, x2: x + turn.dx * GRID, y2: y + turn.dy * GRID, color, born: now })
        x = x + turn.dx * GRID
        y = y + turn.dy * GRID
      } else {
        segments.push({ x1: x, y1: y, x2: nx, y2: ny, color, born: now })
        x = nx
        y = ny
      }

      if (segments.length >= MAX_SEGS) break
    }

    /* Add a dot at the end node */
    segments.push({ dot: true, x: x, y: y, color, born: now })
  }, [])

  /* Animation loop */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx  = canvas.getContext('2d')
    const now  = performance.now()

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    /* Cull expired segments */
    segsRef.current = segsRef.current.filter(s => now - s.born < FADE_MS)

    for (const s of segsRef.current) {
      const age     = now - s.born
      const alpha   = Math.max(0, 1 - age / FADE_MS)

      if (s.dot) {
        /* Glowing node dot */
        ctx.beginPath()
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `${s.color}${alpha.toFixed(2)})`
        ctx.shadowColor = `${s.color}${(alpha * 0.7).toFixed(2)})`
        ctx.shadowBlur  = 8
        ctx.fill()
        ctx.shadowBlur = 0
      } else {
        /* Line segment */
        ctx.beginPath()
        ctx.moveTo(s.x1, s.y1)
        ctx.lineTo(s.x2, s.y2)
        ctx.strokeStyle = `${s.color}${alpha.toFixed(2)})`
        ctx.lineWidth   = 1
        ctx.shadowColor = `${s.color}${(alpha * 0.5).toFixed(2)})`
        ctx.shadowBlur  = 6
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  /* Throttled mouse handler — spawn every ~80ms max */
  const lastSpawnRef = useRef(0)
  const onMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
    const now = performance.now()
    if (now - lastSpawnRef.current > 80) {
      lastSpawnRef.current = now
      const gx = snap(e.clientX)
      const gy = snap(e.clientY)
      spawnTrace(gx, gy)
      /* Spawn a second branch 40% of the time for richness */
      if (Math.random() < 0.4) spawnTrace(gx, gy)
    }
  }, [snap, spawnTrace])

  useEffect(() => {
    /* Detect touch device — don't show on mobile */
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches
    if (isTouchRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    /* Set canvas to full window size */
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    /* Start animation */
    rafRef.current = requestAnimationFrame(draw)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [draw, onMouseMove])

  /* Don't render canvas on touch devices */
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
