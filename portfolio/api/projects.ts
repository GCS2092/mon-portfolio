import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

const KV_KEY = 'portfolio:projects:v1'
const sql = neon(process.env.DATABASE_URL!)

function unauthorized(res: VercelResponse) {
  res.status(401).json({ error: 'unauthorized' })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    if (!process.env.DATABASE_URL) {
      res.status(500).json({ error: 'missing_database_url' })
      return
    }

    const rows = await sql`
      SELECT value FROM app_kv WHERE key = ${KV_KEY} LIMIT 1;
    ` as { value: unknown }[]

    const data = rows[0]?.value ?? null
    res.status(200).json({ projects: data })
    return
  }

  if (req.method === 'PUT') {
    if (!process.env.DATABASE_URL) {
      res.status(500).json({ error: 'missing_database_url' })
      return
    }

    const expected = process.env.ADMIN_TOKEN
    if (!expected) {
      res.status(500).json({ error: 'missing_admin_token' })
      return
    }

    const auth = req.headers.authorization
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null

    if (!token || token !== expected) {
      unauthorized(res)
      return
    }

    const body = req.body as unknown

    await sql`
      INSERT INTO app_kv (key, value, updated_at)
      VALUES (${KV_KEY}, ${body}::jsonb, now())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = now();
    `

    res.status(200).json({ ok: true })
    return
  }

  res.setHeader('Allow', 'GET, PUT')
  res.status(405).json({ error: 'method_not_allowed' })
}