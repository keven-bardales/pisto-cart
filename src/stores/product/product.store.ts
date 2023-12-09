import { shuffleProducts } from "@/lib/utils/shuffle-products";
import { productService } from "@/services/product/product.service";
import { Product } from "@/types/product/types/product.type";
import { create } from "zustand";

type ProductState = {
  products: Product[];
  setProducts: (productCategories: Product[]) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products: Product[]) =>
    set({
      products: products,
    }),
}));

export class ProductCategoryStore {
  private static instance: ProductCategoryStore;

  constructor() {
    if (!ProductCategoryStore.instance) {
      ProductCategoryStore.instance = this;
    }
    return ProductCategoryStore.instance;
  }

  async getProducts() {
    const products = useProductStore.getState().products;

    if (products.length === 0) {
      try {
        const response = await productService.getAll();

        if (response.fetchResponse.ok) {
          const fetchedProducts = response.responseData.data;

          const shuffledProducts = shuffleProducts(fetchedProducts);

          this.setProducts(shuffledProducts);
        }
      } catch (error) {}
    }

    return useProductStore.getState().products;
  }

  async setProducts(products: Product[]) {
    useProductStore.getState().setProducts(products);
  }
}

export const productStore = new ProductCategoryStore();
