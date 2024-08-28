import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(4),
  description: z.string().min(8),
  price: z.string(),
  image: z.string().url(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export const products: ProductType[] = [
  {
    id: 1,
    name: "Product 1",
    description: "This is the description for Product 1.",
    price: "$19.99",
    image: "https://placehold.co/600x400?text=Product+1",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is the description for Product 2.",
    price: "$29.99",
    image: "https://placehold.co/600x400?text=Product+2",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is the description for Product 3.",
    price: "$39.99",
    image: "https://placehold.co/600x400?text=Product+3",
  },
];
