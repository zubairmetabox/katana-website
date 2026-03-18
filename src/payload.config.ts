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

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Guides } from './collections/Guides'
import { Retailers } from './collections/Retailers'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { ResellerInquiries } from './collections/ResellerInquiries'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { AboutPage } from './globals/AboutPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Katana Admin',
    },
  },
  collections: [Users, Media, Products, Guides, Retailers, ContactSubmissions, ResellerInquiries],
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
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: process.env.NODE_ENV === 'production' ? 10 : 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
