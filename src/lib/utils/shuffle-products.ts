import { Product } from "@/types/product/types/product.type";

export const shuffleProducts = (products: Product[]) => {
  return products
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
