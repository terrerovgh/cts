import { z, defineCollection } from 'astro:content';

const artistsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    gallery_link: z.string(),
    images: z.array(z.string()),
  }),
});

const servicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    services: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })),
  }),
});

export const collections = {
  'artists': artistsCollection,
  'services': servicesCollection,
};
