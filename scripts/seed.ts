/**
 * KATANA — Database Seed Script
 *
 * Downloads images from Figma MCP asset URLs and seeds Payload CMS
 * with media, products, guides, and retailers.
 *
 * NOTE: Figma asset URLs expire 7 days after generation (generated 2026-03-18).
 *
 * Run:
 *   pnpm seed
 */

// Only static import: Node built-ins (safe — no env dependency)
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ── Load .env BEFORE any Payload imports (ESM hoists statics, so payload/config
//    are loaded via dynamic import() below, after env is populated) ──────────
try {
  const envContent = readFileSync(resolve(process.cwd(), '.env'), 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx).trim()
    // Strip surrounding quotes from value if present
    let val = trimmed.slice(eqIdx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (key) process.env[key] = val
  }
  console.log('✓ Loaded .env')
} catch {
  console.warn('⚠ Could not load .env — relying on existing environment')
}

// Dynamic imports — evaluated AFTER env vars are set above
const { getPayload } = await import('payload')
// Use seed-specific config (no Vercel Blob plugin — stores files locally)
const { default: config } = await import('./seed-config')

// Ensure output dir exists
import { mkdirSync } from 'fs'
mkdirSync(resolve(process.cwd(), 'public/seed-media'), { recursive: true })

// ── Figma MCP asset URLs (valid until 2026-03-25) ──────────────────────────
const ASSETS = {
  heroFish: {
    url: 'https://www.figma.com/api/mcp/asset/3b6f8051-aa77-4ab6-95fd-6b70afa53992',
    alt: 'Fish caught with a Katana fishing lure',
    filename: 'katana-about-fish-hero.jpg',
  },
  homepageHero: {
    url: 'https://www.figma.com/api/mcp/asset/98d43498-34ff-42ee-af96-d3d3652ff784',
    alt: 'Katana fishing lures — homepage hero',
    filename: 'katana-homepage-hero.jpg',
  },
  productsHero: {
    url: 'https://www.figma.com/api/mcp/asset/ead30ec3-b88d-458b-95a7-964ab2b571bf',
    alt: 'Katana lure product lineup hero',
    filename: 'katana-products-hero.jpg',
  },
  guidesHero: {
    url: 'https://www.figma.com/api/mcp/asset/01b7aa19-1672-4bf8-8044-f87745bd88f6',
    alt: 'Fishing guides hero — underwater lure scene',
    filename: 'katana-guides-hero.jpg',
  },
  guidesCarousel: {
    url: 'https://www.figma.com/api/mcp/asset/538c5ed6-ac02-4ade-848b-98e1cc821e67',
    alt: 'Guide carousel — predator eye placement detail',
    filename: 'katana-guide-carousel-eye.jpg',
  },
  whereAreWeHero: {
    url: 'https://www.figma.com/api/mcp/asset/33a383f3-ce86-4044-9e74-1c347926e06e',
    alt: 'Underwater school of fish — Where Are We hero',
    filename: 'katana-where-are-we-hero.jpg',
  },
  contactHero: {
    url: 'https://www.figma.com/api/mcp/asset/812652f4-ad3a-47e9-8d74-17206d1ef523',
    alt: 'Shark underwater — Contact page hero',
    filename: 'katana-contact-hero.jpg',
  },
  resellerHero: {
    url: 'https://www.figma.com/api/mcp/asset/728a4bbc-6fa5-4aab-b327-424d3e377dad',
    alt: 'Katana fishing lure — Become a Reseller hero',
    filename: 'katana-reseller-hero.jpg',
  },
}

// ── Helpers ────────────────────────────────────────────────────────────────

async function downloadAsset(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed [${res.status}]: ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const mimeType = res.headers.get('content-type') || 'image/jpeg'
  return { data: buffer, mimeType, size: buffer.length }
}

async function uploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  asset: { url: string; alt: string; filename: string },
) {
  // Reuse existing record if already seeded (idempotent)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: asset.filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`  ↷ ${asset.filename} (existing id=${existing.docs[0]!.id})`)
    return existing.docs[0]!
  }
  console.log(`  ↓ ${asset.filename}`)
  const { data, mimeType, size } = await downloadAsset(asset.url)
  const result = await payload.create({
    collection: 'media',
    data: { alt: asset.alt },
    file: { data, name: asset.filename, mimetype: mimeType, size },
  })
  console.log(`    ✓ id=${result.id}  (${(size / 1024).toFixed(0)} KB)`)
  return result
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🎣 KATANA Seed Script\n')

  const payload = await getPayload({ config })

  // ── 1. Media ────────────────────────────────────────────────────────────
  console.log('📸 Uploading Figma images to Vercel Blob...')
  const media: Record<string, { id: number }> = {}

  for (const [key, asset] of Object.entries(ASSETS)) {
    media[key] = await uploadMedia(payload, asset)
  }

  // ── 2. Products ─────────────────────────────────────────────────────────
  console.log('\n📦 Seeding products...')

  const productDefs = [
    {
      name: 'Ti Rouget',
      slug: 'ti-rouget',
      tagline: 'TI ROUGET',
      heroImage: media.heroFish.id,
      measurementRange: '80mm – 120mm',
      fishAttract: [{ name: 'Rouget' }, { name: 'Kapitaine' }, { name: 'Vacoas' }],
      dimensions: '80mm / 18g',
      colors: [
        { name: 'Red Eye Natural', hex: '#C0392B' },
        { name: 'Blue Flash', hex: '#1A5276' },
        { name: 'Pearl White', hex: '#F5F5F5' },
      ],
      featured: true,
      sortOrder: 1,
    },
    {
      name: 'Ti Vert',
      slug: 'ti-vert',
      tagline: 'TI VERT',
      heroImage: media.heroFish.id,
      measurementRange: '90mm – 130mm',
      fishAttract: [{ name: 'Vert' }, { name: 'Vivaneaux' }],
      dimensions: '90mm / 22g',
      colors: [
        { name: 'Chartreuse', hex: '#7FFF00' },
        { name: 'Gold Rush', hex: '#D4AC0D' },
      ],
      featured: false,
      sortOrder: 2,
    },
    {
      name: 'Bleu Profond',
      slug: 'bleu-profond',
      tagline: 'BLEU PROFOND',
      heroImage: media.heroFish.id,
      measurementRange: '100mm – 150mm',
      fishAttract: [{ name: 'Thon' }, { name: 'Capitaine' }],
      dimensions: '100mm / 28g',
      colors: [
        { name: 'Deep Blue', hex: '#1A3A5C' },
        { name: 'Silver Scale', hex: '#C0C0C0' },
      ],
      featured: false,
      sortOrder: 3,
    },
    {
      name: 'Corail Rose',
      slug: 'corail-rose',
      tagline: 'CORAIL ROSE',
      heroImage: media.heroFish.id,
      measurementRange: '70mm – 100mm',
      fishAttract: [{ name: 'Corail' }, { name: 'Mérou' }],
      dimensions: '70mm / 14g',
      colors: [
        { name: 'Coral Pink', hex: '#FF6B6B' },
        { name: 'Sunset Orange', hex: '#FF8C42' },
      ],
      featured: false,
      sortOrder: 4,
    },
    {
      name: 'Nuit Noire',
      slug: 'nuit-noire',
      tagline: 'NUIT NOIRE',
      heroImage: media.heroFish.id,
      measurementRange: '110mm – 160mm',
      fishAttract: [{ name: 'Thon' }, { name: 'Marlin' }],
      dimensions: '110mm / 35g',
      colors: [
        { name: 'Midnight Black', hex: '#1C1C1C' },
        { name: 'UV Purple', hex: '#7B2FBE' },
      ],
      featured: false,
      sortOrder: 5,
    },
  ]

  for (const product of productDefs) {
    const existing = await payload.find({ collection: 'products', where: { slug: { equals: product.slug } }, limit: 1 })
    if (existing.docs.length > 0) { console.log(`  ↷ ${product.name} (existing)`); continue }
    const result = await payload.create({ collection: 'products', data: product })
    console.log(`  ✓ ${result.name} (id=${result.id})`)
  }

  // ── 3. Guides ───────────────────────────────────────────────────────────
  console.log('\n📚 Seeding guides...')

  const guideDefs = [
    {
      title: 'Why The Eyes Make Them Bite',
      slug: 'why-eyes-make-them-bite',
      type: 'biology' as const,
      heroImage: media.guidesHero.id,
      carouselImage: media.guidesCarousel.id,
      excerpt:
        "Eye placement isn't just cosmetic — it's tactical. Positioned correctly, the eyes make the bait appear weak and exposed, triggering a predator's instinct to strike.",
      publishedAt: new Date('2026-01-15').toISOString(),
    },
    {
      title: 'Mastering the Slow Roll Retrieve',
      slug: 'mastering-slow-roll-retrieve',
      type: 'technique' as const,
      heroImage: media.guidesHero.id,
      carouselImage: media.guidesCarousel.id,
      excerpt:
        'The slow roll is one of the most effective retrieves for lazy reef predators. Learn the cadence, depth control, and rod angle that triggers explosive strikes.',
      publishedAt: new Date('2026-02-01').toISOString(),
    },
    {
      title: 'Choosing the Right Hook Setup',
      slug: 'choosing-right-hook-setup',
      type: 'gear' as const,
      heroImage: media.guidesHero.id,
      carouselImage: media.guidesCarousel.id,
      excerpt:
        "VMC hooks, split rings, and assist setups — each configuration changes how your lure behaves and how fish are hooked. Here's what we run on every Katana lure.",
      publishedAt: new Date('2026-02-20').toISOString(),
    },
    {
      title: 'Reading Reef Structure for Ambush Predators',
      slug: 'reading-reef-structure',
      type: 'technique' as const,
      heroImage: media.guidesHero.id,
      carouselImage: media.guidesCarousel.id,
      excerpt:
        'Coral edges, drop-offs, and current seams — knowing where predators hold is half the battle. This guide breaks down how to read Mauritius reef structure.',
      publishedAt: new Date('2026-03-01').toISOString(),
    },
  ]

  for (const guide of guideDefs) {
    const existing = await payload.find({ collection: 'guides', where: { slug: { equals: guide.slug } }, limit: 1 })
    if (existing.docs.length > 0) { console.log(`  ↷ ${guide.title} (existing)`); continue }
    const result = await payload.create({ collection: 'guides', data: guide })
    console.log(`  ✓ ${result.title} (id=${result.id})`)
  }

  // ── 4. Retailers ────────────────────────────────────────────────────────
  console.log('\n🗺️  Seeding retailers...')

  const retailerDefs = [
    {
      name: 'La Pêcherie du Nord',
      region: 'Grand Baie',
      lat: -19.9899,
      lng: 57.5885,
      address: '12 Rue de la Mer, Grand Baie',
      active: true,
    },
    {
      name: 'Pêche & Passion',
      region: 'Curepipe',
      lat: -20.3155,
      lng: 57.5108,
      address: '45 Avenue des Sports, Curepipe',
      active: true,
    },
    {
      name: 'Ocean Tackle House',
      region: 'Port Louis',
      lat: -20.1654,
      lng: 57.4989,
      address: '8 Quai des Pêcheurs, Port Louis',
      active: true,
    },
    {
      name: 'Mauritius Fishing Co.',
      region: 'Mahébourg',
      lat: -20.4076,
      lng: 57.702,
      address: '3 Rue du Port, Mahébourg',
      active: true,
    },
    {
      name: 'Blue Water Sports',
      region: 'Tamarin',
      lat: -20.3283,
      lng: 57.3778,
      address: '22 Coastal Road, Tamarin',
      active: true,
    },
    {
      name: 'Island Anglers',
      region: 'Flic en Flac',
      lat: -20.2658,
      lng: 57.3647,
      address: '5 Lagoon Drive, Flic en Flac',
      active: true,
    },
    {
      name: 'Trou aux Biches Tackle',
      region: 'Trou aux Biches',
      lat: -20.0305,
      lng: 57.5385,
      address: '18 Beach Road, Trou aux Biches',
      active: true,
    },
  ]

  for (const retailer of retailerDefs) {
    const existing = await payload.find({ collection: 'retailers', where: { name: { equals: retailer.name } }, limit: 1 })
    if (existing.docs.length > 0) { console.log(`  ↷ ${retailer.name} (existing)`); continue }
    const result = await payload.create({ collection: 'retailers', data: retailer })
    console.log(`  ✓ ${result.name} — ${result.region} (id=${result.id})`)
  }

  // ── 5. Page globals ─────────────────────────────────────────────────────
  console.log('\n🌐 Seeding page globals...')

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroImage: media.heroFish.id,
      brandImage: media.heroFish.id,
      heroHeadline: 'Every Edge Has a Story.',
      brandHeading: 'A Sharper Perspective',
      brandBody:
        'Katana was founded on a simple belief: that a superior process creates a superior product. We approach bait design from every angle, blending artistry with hydrodynamic science. Each lure is the result of meticulous engineering and relentless on-the-water testing, built not just to attract, but to provoke. Our mission is to craft tools of precision that instill confidence in every cast and trigger the most aggressive strikes.',
    },
  })
  console.log('  ✓ about-page global')

  console.log('\n✅ Seed complete!\n')
  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ Seed failed:', err)
  process.exit(1)
})
