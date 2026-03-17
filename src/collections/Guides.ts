import type { CollectionConfig } from 'payload'

export const Guides: CollectionConfig = {
  slug: 'guides',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Technique', value: 'technique' },
        { label: 'Biology', value: 'biology' },
        { label: 'Gear', value: 'gear' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'carouselImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Left image shown in the guides carousel slide (60% width)',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary shown in carousel (~2 lines)',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
