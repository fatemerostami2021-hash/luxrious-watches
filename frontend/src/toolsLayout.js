// Pure layout maths for the tools carousel (no DOM) — shared by the component and tests.
export const rad = d => d * Math.PI / 180
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export const H = 112                         // vertical distance between tiers
export const NODE_W = 96, NODE_H = 80        // node box (icon + label)
export const TILT = { min: 10, rest: 13, max: 16 }   // camera tilt in degrees (pointer moves it inside this range)
export const VIS = { full: .62, none: .3 }   // cos(angle): fully visible above .62, invisible below .30
export const SPEED = 8                       // degrees per second -> one turn every 45 s

const LIMIT = Math.acos(VIS.none + .04) * 180 / Math.PI   // ~70°: angle where a node has almost faded out

export const sortTiers = tools => [...tools].sort((a, b) => a.items.length - b.items.length)

// Ring radius: grows with item count (cone shape) and is always wide enough that
// two neighbouring visible nodes sit at least one node-width apart horizontally.
export function tierRadius(m) {
  const base = 64 + m * 22, step = 360 / m
  if (step >= LIMIT) return base
  const gap = Math.sin(rad(LIMIT)) - Math.sin(rad(LIMIT - step))
  return Math.max(base, (NODE_W + 6) / gap)
}

export function buildTiers(tools) {
  const sorted = sortTiers(tools), n = sorted.length
  return sorted.map((c, i) => {
    const m = c.items.length
    return { id: c.id, m, r: tierRadius(m), y0: (i - (n - 1) / 2) * H, floor: m <= 2 ? .22 : 0,
      items: c.items.map((t, j) => ({ t, a: (j * 360) / m + i * 23 })) }
  })
}

export function metrics(tiers, W) {
  const rmax = Math.max(...tiers.map(t => t.r))
  const fitW = 2 * rmax * Math.sqrt(1 - VIS.none ** 2) + NODE_W + 24
  const k = clamp(W / fitW, .5, 1)
  const top = tiers[0].y0 - 140, bottom = tiers[tiers.length - 1].y0 + rmax * Math.sin(rad(TILT.max)) + 70
  return { k, rmax, h: (bottom - top) * k, cy: -top * k }
}

// Position of one node (relative to the scene centre, before adding cx / cy).
export function place(a, tier, phase, tilt, k) {
  const th = rad(a + phase), c = Math.cos(th), st = Math.sin(rad(tilt))
  return {
    x: tier.r * Math.sin(th) * k,
    y: (tier.y0 + tier.r * c * st) * k,
    s: k * (.86 + .2 * (c + 1) / 2),
    o: Math.max(tier.floor, clamp((c - VIS.none) / (VIS.full - VIS.none), 0, 1)),
    z: Math.round(c * 100) + 100
  }
}
