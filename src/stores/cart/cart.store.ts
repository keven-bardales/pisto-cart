import { shuffleProducts } from "@/lib/utils/shuffle-products";
import { productService } from "@/services/product/product.service";
import { Cart, CartDetail } from "@/types/cart/types/cart.type";
import { Product } from "@/types/product/types/product.type";
import { create } from "zustand";

type CartState = {
  cart: Cart;
  setCart: (cart: Cart) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: Cart.fromObject({}),
  setCart: (cart: Cart) =>
    set((state) => ({
      cart: {
        ...state.cart,
        ...cart,
      },
    })),
}));

export class CartStore {
  private static instance: CartStore;

  constructor() {
    if (!CartStore.instance) {
      CartStore.instance = this;
    }
    return CartStore.instance;
  }

  async getCart() {
    return useCartStore.getState().cart;
  }

  addProduct(product: Product) {
    const cart = useCartStore.getState().cart;

    cart.addProduct(product);

    useCartStore.getState().setCart(cart);
  }

  removeProduct(product: CartDetail) {
    const cart = useCartStore.getState().cart;

    cart.removeProduct(product.productId);

    useCartStore.getState().setCart(cart);
  }

  increaseQuantity(product: CartDetail) {
    const cart = useCartStore.getState().cart;

    cart.increaseQuantity(product.productId);

    useCartStore.getState().setCart(cart);
  }

  decreaseQuantity(product: CartDetail) {
    const cart = useCartStore.getState().cart;

    cart.decreaseQuantity(product.productId);

    useCartStore.getState().setCart(cart);
  }

  get productExists() {
    return (productId: string) => {
      const cart = useCartStore.getState().cart;

      return cart.productExists(productId);
    };
  }
}

export const cartStore = new CartStore();
