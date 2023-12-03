import {
  RestClient,
  restClient,
} from "@/services/rest-client/rest-client.service";
import { ApiResponse } from "@/types/generics/api-response";
import { ProductCategory } from "@/types/product-category/types/product-category.type";

export class ProductCategoryService {
  baseUrl = "/productCategory";

  constructor(private restClient: RestClient) {}

  async getAll() {
    const response = await this.restClient.get<ApiResponse<ProductCategory[]>>(
      `${this.baseUrl}/getAll`
    );

    return response;
  }
}

export const productCategoryService = new ProductCategoryService(restClient);
