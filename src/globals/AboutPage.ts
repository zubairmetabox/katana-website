import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image (right side, rotated)',
      admin: {
        description: 'Fish / lure photo displayed in the hero section (rotated -14.5°)',
      },
    },
    {
      name: 'heroHeadline',
      type: 'text',
      defaultValue: 'Every Edge Has a Story.',
      label: 'Hero Headline',
    },
    {
      name: 'brandImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Brand Section Image',
      admin: {
        description: 'Fish / lure photo displayed in the "A Sharper Perspective" section',
      },
    },
    {
      name: 'brandHeading',
      type: 'text',
      defaultValue: 'A Sharper Perspective',
      label: 'Brand Section Heading',
    },
    {
      name: 'brandBody',
      type: 'textarea',
      defaultValue:
        'Katana was founded on a simple belief: that a superior process creates a superior product. We approach bait design from every angle, blending artistry with hydrodynamic science. Each lure is the result of meticulous engineering and relentless on-the-water testing, built not just to attract, but to provoke. Our mission is to craft tools of precision that instill confidence in every cast and trigger the most aggressive strikes.',
      label: 'Brand Section Body Text',
    },
  ],
}
