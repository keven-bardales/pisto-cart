import { productCategoryService } from "@/services/product-category/product-category.service";
import { ProductCategory } from "@/types/product-category/types/product-category.type";
import { create } from "zustand";

type ProductCategoryState = {
  productCategories: ProductCategory[];
  setProductCategories: (productCategories: ProductCategory[]) => void;
  parentCategories: ProductCategory[];
  setParentCategories: (parentCategories: ProductCategory[]) => void;
};

export const useProductCategoryStore = create<ProductCategoryState>((set) => ({
  productCategories: [],
  setProductCategories: (productCategories: ProductCategory[]) =>
    set({
      productCategories: productCategories,
    }),
  parentCategories: [],
  setParentCategories: (parentCategories: ProductCategory[]) =>
    set({ parentCategories }),
}));

export class ProductCategoryStore {
  private static instance: ProductCategoryStore;

  constructor() {
    if (!ProductCategoryStore.instance) {
      ProductCategoryStore.instance = this;
    }
    return ProductCategoryStore.instance;
  }

  async getCategories() {
    const categories = useProductCategoryStore.getState().productCategories;

    if (categories.length === 0) {
      try {
        const response = await productCategoryService.getAll();

        console.log(response);

        if (response.fetchResponse.ok) {
          this.setCategories(response.responseData.data);
          this.setParentCategories();
        }
      } catch (error) {}
    }

    return useProductCategoryStore.getState().productCategories;
  }

  async setCategories(productCategories: ProductCategory[]) {
    useProductCategoryStore.getState().setProductCategories(productCategories);
  }

  async setParentCategories() {
    const categories = useProductCategoryStore.getState().productCategories;

    const parentCategories = categories.filter((category) => {
      return category.parentCategoryId === null;
    });

    useProductCategoryStore.getState().setParentCategories(parentCategories);
  }

  get categories() {
    return useProductCategoryStore.getState().productCategories;
  }

  get parentCategories() {
    return useProductCategoryStore.getState().parentCategories;
  }
}

export const productCategoryStore = new ProductCategoryStore();
