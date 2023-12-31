import { Product } from "@/types/product/types/product.type";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export class Cart {
  constructor(
    public id: string,
    public total: number,
    public subTotal: number,
    public subTotalDiscount: number,
    public subTotalTax: number,
    public discount: number,
    public tax: number,
    public userId: number,
    public cartStatusId: number,
    public createdAt: string,
    public updatedAt: string,
    public user: any,
    public cartStatus: any,
    public cartDetail: CartDetail[]
  ) {}

  static fromObject(object: any) {
    const id = uuidv4();

    return new Cart(
      object?.id ?? id,
      object?.total ?? 0,
      object?.subTotal ?? 0,
      object?.subTotalDiscount ?? 0,
      object?.subTotalTax ?? 0,
      object?.discount ?? 0,
      object?.tax ?? 0,
      object?.userId ?? "",
      object?.cartStatusId ?? 0,
      object?.createdAt ?? "",
      object?.updatedAt ?? "",
      object?.user ?? {},
      object?.cartStatus ?? {},
      object?.cartDetail?.map((cartDetail: any) => CartDetail.fromObject(cartDetail)) ?? []
    );
  }

  addProduct = (product: Product) => {
    let foundIndex = -1;
    const cartDetail = this.cartDetail.find((cartDetail, index) => {
      if (cartDetail.productId === product.id) {
        foundIndex = index;
        return cartDetail;
      }
    });

    if (foundIndex !== -1) {
      this.cartDetail[foundIndex].quantity += 1;
    } else {
      this.cartDetail.push(
        CartDetail.fromObject({
          productId: product.id,
          product: product,
          ...product,
        })
      );
    }
  };

  removeProduct = (productId: string) => {
    this.cartDetail = this.cartDetail.filter((cartDetail) => cartDetail.product.id !== productId);

    console.log(this);
  };

  increaseQuantity = (productId: string) => {
    const foundIndex = this.cartDetail.findIndex((cartDetail) => cartDetail.productId === productId);

    if (foundIndex !== -1) {
      this.cartDetail[foundIndex].quantity += 1;
    }
  };

  decreaseQuantity = (productId: string) => {
    const foundIndex = this.cartDetail.findIndex((cartDetail) => cartDetail.productId === productId);

    if (foundIndex !== -1) {
      const quantity = this.cartDetail[foundIndex].quantity;
      if (quantity > 1) {
        this.cartDetail[foundIndex].quantity -= 1;
      }
    }
  };

  productExists = (productId: string) => {
    return this.cartDetail.some((cartDetail) => cartDetail.productId === productId);
  };

  emptyCart = () => {
    this.cartDetail = [];
    this.total = 0;
    this.subTotal = 0;
    this.subTotalDiscount = 0;
    this.subTotalTax = 0;
    this.discount = 0;
    this.tax = 0;
  };
}

export class CartDetail {
  constructor(public id: string, public quantity: number, public price: number, public productId: string, public cartId: string, public product: Product) {}

  static fromObject(object: any) {
    const id = uuidv4();

    return new CartDetail(id, object?.quantity ?? 1, object?.price ?? 0, object?.productId ?? "", object?.cartId ?? "", object?.product ?? {});
  }
}

class User {
  constructor(private id: string, private username: string, private email: string /*, other fields */) {}
}

class CartStatus {
  constructor(private id: string, private status: any /*, other fields */) {}
}
