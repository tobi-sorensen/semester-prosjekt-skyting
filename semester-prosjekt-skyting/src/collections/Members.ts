import { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  admin: { useAsTitle: 'name' },
  fields: [
    {
      name: 'memberNumber',
      type: 'number',
      label: 'Medlemsnummer',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Navn',
    },
    {
      name: 'club',
      type: 'relationship',
      relationTo: 'clubs' as any,
      required: true,
    },
    {
      name: 'class',
      type: 'select',
      options: ['A', 'B', 'F', 'D1'],
    },
  ],
}