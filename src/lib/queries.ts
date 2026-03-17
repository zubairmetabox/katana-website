import { getPayload } from 'payload'
import config from '@payload-config'

async function getPayloadClient() {
  return getPayload({ config })
}

export async function getProducts(options?: { featured?: boolean; limit?: number }) {
  const payload = await getPayloadClient()
  const where = options?.featured !== undefined ? { featured: { equals: options.featured } } : undefined
  const result = await payload.find({
    collection: 'products',
    ...(where ? { where } : {}),
    sort: 'sortOrder',
    limit: options?.limit || 100,
    depth: 1,
  })
  return result.docs
}

export async function getProductBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
}

export async function getGuides(options?: { type?: string; limit?: number }) {
  const payload = await getPayloadClient()
  const where = options?.type ? { type: { equals: options.type } } : undefined
  const result = await payload.find({
    collection: 'guides',
    ...(where ? { where } : {}),
    sort: '-publishedAt',
    limit: options?.limit || 100,
    depth: 1,
  })
  return result.docs
}

export async function getGuideBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'guides',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
}

export async function getRetailers() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'retailers',
    where: { active: { equals: true } },
    sort: 'name',
    limit: 200,
  })
  return result.docs
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
}

export async function getNavigation() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation' })
}
