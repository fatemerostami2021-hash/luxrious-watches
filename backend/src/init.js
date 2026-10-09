import 'dotenv/config'
import fs from 'fs'
import pg from 'pg'
const c = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false })
await c.connect()
await c.query(fs.readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'))
console.log('DB ready'); await c.end()
