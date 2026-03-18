/**
 * Seed-only Payload config — identical to main config but with Vercel Blob
 * enabled when BLOB_READ_WRITE_TOKEN is set (public store required).
 * Use this config ONLY in the seed script.
 */
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  lexicalEditor,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from '../src/collections/Users'
import { Media } from '../src/collections/Media'
import { Products } from '../src/collections/Products'
import { Guides } from '../src/collections/Guides'
import { Retailers } from '../src/collections/Retailers'
import { ContactSubmissions } from '../src/collections/ContactSubmissions'
import { ResellerInquiries } from '../src/collections/ResellerInquiries'
import { SiteSettings } from '../src/globals/SiteSettings'
import { Navigation } from '../src/globals/Navigation'
import { AboutPage } from '../src/globals/AboutPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname, '../src') },
  },
  collections: [
    Users,
    Media,
    Products,
    Guides,
    Retailers,
    ContactSubmissions,
    ResellerInquiries,
  ],
  globals: [SiteSettings, Navigation, AboutPage],
  editor: lexicalEditor({
    features: () => [
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, '../src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000,
      ssl: { rejectUnauthorized: false },
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
