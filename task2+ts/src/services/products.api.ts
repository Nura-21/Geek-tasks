import axios from "@/plugins/axios";
import { Product } from "@/types/product";
import { AxiosRequestConfig } from "axios";

class ApiProduct {
  private async axiosCall<T>(config: AxiosRequestConfig) {
    try {
      const { data } = await axios.request<T>(config);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getProducts() {
    return this.axiosCall<Product[]>({ method: "get", url: "/products" });
  }

  async updateProduct(productId: number, updatedData: Partial<Product>) {
    return this.axiosCall<Product>({
      method: "put",
      url: `/products/${productId}`,
      data: updatedData,
    });
  }

  async deleteProduct(productId: number) {
    return this.axiosCall<void>({
      method: "delete",
      url: `/products/${productId}`,
    });
  }

  async addProduct(newProduct: Product) {
    return this.axiosCall<Product>({
      method: "post",
      url: `/products`,
      data: newProduct,
    });
  }
}

const apiProduct = new ApiProduct();
export default apiProduct;
