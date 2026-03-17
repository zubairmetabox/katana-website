import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tagline', 'featured', 'sortOrder'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier. Auto-generate from name or set manually.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short species name shown on product card, e.g. "TI ROUGET"',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'galleryImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'measurementRange',
      type: 'text',
      admin: {
        description: 'e.g. "80mm – 120mm"',
      },
    },
    {
      name: 'fishAttract',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'dimensions',
      type: 'text',
    },
    {
      name: 'colors',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'hex',
          type: 'text',
          admin: {
            description: 'Hex color code, e.g. "#FF0000"',
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
