// Pure layout maths for the tools carousel (no DOM) — shared by the component and tests.
export const rad = d => d * Math.PI / 180
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export const H = 112                         // vertical distance between tiers inside one column
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

// Static description of every tier (order never changes, so the DOM stays stable).
export function buildTiers(tools) {
  return sortTiers(tools).map((c, i) => {
    const m = c.items.length
    return { id: c.id, m, r: tierRadius(m), floor: m <= 2 ? .22 : 0,
      items: c.items.map((t, j) => ({ t, a: (j * 360) / m + i * 23 })) }
  })
}

// Where each tier goes for a given scene width: one column, or two columns side by side
// when there is room (this roughly halves the height). Tiers are dealt out alternately
// so both columns stay cone-shaped (small rings on top, big rings below).
export function arrange(tiers, W) {
  const rmax = Math.max(...tiers.map(t => t.r))
  const fitW = 2 * rmax * Math.sqrt(1 - VIS.none ** 2) + NODE_W + 24
  const cols = tiers.length > 1 && W >= 2 * fitW * .6 ? 2 : 1
  const k = clamp(W / (cols * fitW), .5, 1)
  const groups = Array.from({ length: cols }, () => [])
  tiers.forEach((_, i) => groups[i % cols].push(i))
  const pos = [], nmax = Math.max(...groups.map(g => g.length))
  groups.forEach((g, c) => g.forEach((ti, idx) => { pos[ti] = { y0: (idx - (g.length - 1) / 2) * H, cx: W * (c + .5) / cols } }))
  const top = -((nmax - 1) / 2) * H - 110, bottom = ((nmax - 1) / 2) * H + rmax * Math.sin(rad(TILT.max)) + 60
  return { cols, k, rmax, groups, pos, h: (bottom - top) * k, cy: -top * k }
}

// Position of one node relative to its column centre (add the column's cx / the scene cy).
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
