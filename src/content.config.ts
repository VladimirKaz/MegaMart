import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  
  // 2. Схема и transform остаются практически без изменений
  schema: ({ image }) => z.object({
    name: z.string(),
    price: z.number(),
    oldPrice: z.number().optional(),
    brand: z.string(),
    image: image(),
    order: z.number().optional(),
  }).transform((data) => {
    const save = data.oldPrice ? data.oldPrice - data.price : 0;
    const discountPercent = data.oldPrice ? Math.round((save / data.oldPrice) * 100) : 0;
    
    return {
      ...data,
      save,
      discountPercent
    };
  }),
});

export const collections = {
  'products': productsCollection,
};