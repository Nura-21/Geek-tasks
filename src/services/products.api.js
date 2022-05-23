import axios from "@/plugins/axios";

class Api {
  async fetchProducts() {
    try {
      const request = await axios.get(`/products`);
      return request;
    } catch (err) {
      // console.log(err);
      return Promise.reject(err);
    }
  }

  async removeProduct(id) {
    try {
      await axios.delete(`/products/${id}`);
    } catch (err) {
      console.log(err);
    } finally {
      this.fetchProducts();
    }
  }

  async addProduct(newProduct) {
    try {
      const response = await axios.post(`/products`, newProduct);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      this.fetchProducts();
    }
  }

  async editProduct({ editedObject, id }) {
    try {
      await axios.put(`/products/${id}`, editedObject);
    } catch (err) {
      console.log(err);
    } finally {
      this.fetchProducts();
    }
  }
}
const api = new Api();
export default api;
