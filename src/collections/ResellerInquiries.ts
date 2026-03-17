import type { CollectionConfig } from 'payload'

export const ResellerInquiries: CollectionConfig = {
  slug: 'reseller-inquiries',
  access: {
    // Only admins can read; nobody can create via Payload REST (use /api/reseller)
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'businessName', 'emailAddress', 'submittedAt'],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'emailAddress',
      type: 'email',
      required: true,
    },
    {
      name: 'businessWebsite',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
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
