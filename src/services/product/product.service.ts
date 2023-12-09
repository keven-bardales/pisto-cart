import {
  RestClient,
  restClient,
} from "@/services/rest-client/rest-client.service";
import { ApiResponse } from "@/types/generics/api-response";
import { Product } from "@/types/product/types/product.type";

export class ProductService {
  baseUrl = "/product";

  constructor(private restClient: RestClient) {}

  async getAll() {
    const response = await this.restClient.get<ApiResponse<Product[]>>(
      `${this.baseUrl}/getAll`
    );

    return response;
  }
}

export const productService = new ProductService(restClient);
