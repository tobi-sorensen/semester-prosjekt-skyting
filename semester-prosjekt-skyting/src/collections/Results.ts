import { CollectionConfig } from 'payload'

export const Results: CollectionConfig = {
  slug: 'results',
  admin: {
    useAsTitle: 'shooterName',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'shooterName',
      type: 'text',
      required: true,
    },
    {
      name: 'team',
      type: 'number',
      required: true,
    },
    {
      name: 'standplass',
      type: 'number',
      required: true,
    },
    {
      name: 'startNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'class',
      type: 'text',
    },

    { name: 'post1', type: 'number', defaultValue: 0 },
    { name: 'inner1', type: 'number', defaultValue: 0 },

    { name: 'post2', type: 'number', defaultValue: 0 },
    { name: 'inner2', type: 'number', defaultValue: 0 },

    { name: 'post3', type: 'number', defaultValue: 0 },
    { name: 'inner3', type: 'number', defaultValue: 0 },

    { name: 'post4', type: 'number', defaultValue: 0 },
    { name: 'inner4', type: 'number', defaultValue: 0 },

    { name: 'post5', type: 'number', defaultValue: 0 },
    { name: 'inner5', type: 'number', defaultValue: 0 },

    { name: 'post6', type: 'number', defaultValue: 0 },
    { name: 'inner6', type: 'number', defaultValue: 0 },

    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'sf1',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'sf2',
      type: 'number',
      defaultValue: 0,
    },
  ],
}