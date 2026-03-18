/**
 * Backfill blurDataURL (LQIP) for existing media records that don't have one.
 * Downloads each image, generates a 16×16 WebP, stores as base64 data URI.
 *
 * Run: NODE_OPTIONS=--no-deprecation pnpm tsx scripts/backfill-lqip.ts
 */
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import sharp from 'sharp'

try {
  const envContent = readFileSync(resolve(process.cwd(), '.env'), 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx).trim()
    let val = trimmed.slice(eqIdx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
    if (key) process.env[key] = val
  }
  console.log('✓ Loaded .env')
} catch { console.warn('Could not load .env') }

const { getPayload } = await import('payload')
const { default: config } = await import('./seed-config')

const payload = await getPayload({ config })
const all = await payload.find({ collection: 'media', limit: 200 })
console.log(`Found ${all.docs.length} media records\n`)

for (const doc of all.docs) {
  if (doc.blurDataURL) {
    console.log(`  ↷ ${doc.filename} (already has blurDataURL)`)
    continue
  }
  if (!doc.url) {
    console.warn(`  ✗ ${doc.filename} — no URL, skipping`)
    continue
  }
  try {
    console.log(`  ↓ ${doc.filename}`)
    // Try reading from local seed-media dir first, fall back to fetching the URL
    const localPath = resolve(process.cwd(), 'public/seed-media', doc.filename ?? '')
    let buffer: Buffer
    if (existsSync(localPath)) {
      buffer = readFileSync(localPath)
    } else if (doc.url && doc.url.startsWith('http')) {
      const res = await fetch(doc.url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      buffer = Buffer.from(await res.arrayBuffer())
    } else {
      console.warn(`    ✗ No local file and no absolute URL for ${doc.filename}, skipping`)
      continue
    }
    const lqipBuffer = await sharp(buffer)
      .resize(16, 16, { fit: 'cover' })
      .webp({ quality: 20 })
      .toBuffer()
    const blurDataURL = `data:image/webp;base64,${lqipBuffer.toString('base64')}`
    await payload.update({ collection: 'media', id: doc.id, data: { blurDataURL } })
    console.log(`    ✓ blurDataURL generated (${lqipBuffer.length} bytes)`)
  } catch (err) {
    console.warn(`    ✗ Failed for ${doc.filename}:`, err)
  }
}

console.log('\n✅ LQIP backfill complete!')
process.exit(0)
