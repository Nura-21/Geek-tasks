import axios from "@/plugins/axios";
import { Product } from "@/types/product";
import { AxiosRequestConfig } from "axios";

class ApiProduct {
  private async axiosCall<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await axios.request<T>(config);
    return data;
  }

  async getProducts(): Promise<Product[]> {
    return this.axiosCall<Product[]>({ method: "get", url: "/products" });
  }

  async updateProduct(
    productId: string,
    updatedData: Partial<Product>
  ): Promise<Product> {
    return this.axiosCall<Product>({
      method: "put",
      url: `/products/${productId}`,
      data: updatedData,
    });
  }

  async deleteProduct(productId: string): Promise<void> {
    return this.axiosCall<void>({
      method: "delete",
      url: `/products/${productId}`,
    });
  }

  async addProduct(newProduct: Product): Promise<Product> {
    return this.axiosCall<Product>({
      method: "post",
      url: `/products`,
      data: newProduct,
    });
  }
}

const apiProduct = new ApiProduct();
export default apiProduct;
