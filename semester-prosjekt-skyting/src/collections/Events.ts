import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'discipline',
      type: 'select',
      options: [
        {
          label: 'Jaktfelt',
          value: 'jaktfelt',
        },
        {
          label: 'Elgskyting',
          value: 'elg',
        },
      ],
      required: true,
    },
    {
      name: 'rounds',
      type: 'number',
      label: 'Antall poster',
    },
  ],
}