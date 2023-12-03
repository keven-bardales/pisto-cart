export type ProductCategory = {
  id: string;
  name: string;
  categoryLevel: number;
  description: string;
  imageUrl: string;
  parentCategoryId: string | null;
};
