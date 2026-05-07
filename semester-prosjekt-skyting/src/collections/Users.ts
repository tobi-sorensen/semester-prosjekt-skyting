import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: false, 
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
};
