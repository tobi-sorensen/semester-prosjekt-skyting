import { CollectionConfig } from 'payload'

export const Results: CollectionConfig = {
  slug: 'results',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members' as any,
      required: true,
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'post1',
      type: 'number',
    },
    {
      name: 'post2',
      type: 'number',
    },
    {
      name: 'post3',
      type: 'number',
    },
    {
      name: 'post4',
      type: 'number',
    },
    {
      name: 'post5',
      type: 'number',
    },
    {
      name: 'total',
      type: 'number',
    },
  ],
}