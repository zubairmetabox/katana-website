import type { CollectionConfig } from 'payload'

export const Retailers: CollectionConfig = {
  slug: 'retailers',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'active'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'region',
      type: 'text',
    },
    {
      name: 'lat',
      type: 'number',
      required: true,
    },
    {
      name: 'lng',
      type: 'number',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
