import { ProductCategory } from "@/types/product-category/types/product-category.type";

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  productCategoryId: string;
  productStatusId: number;
  imageUrl: string;
  updatedAt: string;
  createdAt: string;
  productCategory: ProductCategory;
};
