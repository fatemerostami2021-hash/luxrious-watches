import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import pg from 'pg'
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false })
const app = express()
app.use(cors()); app.use(express.json())
const sign = u => jwt.sign({ id: u.id, role: u.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' })
const auth = (req, _res, next) => { try { req.user = jwt.verify((req.headers.authorization || '').slice(7), process.env.JWT_SECRET || 'dev') } catch {} next() }
const need = (role) => (req, res, next) => !req.user ? res.status(401).json({ error: 'login' }) : role && req.user.role !== role ? res.status(403).json({ error: 'forbidden' }) : next()
const wrap = f => (req, res) => f(req, res).catch(e => res.status(500).json({ error: e.message }))
app.use(auth)
app.get('/api/health', (_q, r) => r.json({ ok: true }))
app.post('/api/auth/register', wrap(async (q, r) => {
  const { name, email, password } = q.body
  const { rows } = await pool.query('INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email,role', [name, email, await bcrypt.hash(password, 10)])
  r.json({ user: rows[0], token: sign(rows[0]) })
}))
app.post('/api/auth/login', wrap(async (q, r) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [q.body.email])
  const u = rows[0]
  if (!u || !(await bcrypt.compare(q.body.password, u.password))) return r.status(401).json({ error: 'invalid' })
  r.json({ user: { id: u.id, name: u.name, email: u.email, role: u.role }, token: sign(u) })
}))
app.get('/api/me', need(), wrap(async (q, r) => r.json((await pool.query('SELECT id,name,email,role FROM users WHERE id=$1', [q.user.id])).rows[0])))
app.get('/api/products', wrap(async (_q, r) => r.json((await pool.query('SELECT * FROM products ORDER BY id')).rows)))
app.post('/api/products', need('admin'), wrap(async (q, r) => { const p = q.body; r.json((await pool.query('INSERT INTO products(slug,name,name_fa,description,description_fa,price,stock) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *', [p.slug, p.name, p.name_fa, p.description, p.description_fa, p.price, p.stock || 10])).rows[0]) }))
app.delete('/api/products/:id', need('admin'), wrap(async (q, r) => { await pool.query('DELETE FROM products WHERE id=$1', [q.params.id]); r.json({ ok: true }) }))
app.get('/api/posts', wrap(async (_q, r) => r.json((await pool.query('SELECT * FROM posts ORDER BY created_at DESC')).rows)))
app.post('/api/orders', wrap(async (q, r) => {
  const { items, email, address } = q.body
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  r.json((await pool.query('INSERT INTO orders(user_id,email,address,items,total) VALUES($1,$2,$3,$4,$5) RETURNING *', [q.user?.id || null, email, address, JSON.stringify(items), total])).rows[0])
}))
app.get('/api/orders/mine', need(), wrap(async (q, r) => r.json((await pool.query('SELECT * FROM orders WHERE user_id=$1 ORDER BY id DESC', [q.user.id])).rows)))
app.get('/api/orders', need('admin'), wrap(async (_q, r) => r.json((await pool.query('SELECT * FROM orders ORDER BY id DESC')).rows)))
app.patch('/api/orders/:id', need('admin'), wrap(async (q, r) => r.json((await pool.query('UPDATE orders SET status=$1 WHERE id=$2 RETURNING *', [q.body.status, q.params.id])).rows[0])))
export default app
