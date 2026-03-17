import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    // Only admins can read; nobody can create via Payload REST (use /api/contact)
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'submittedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}
