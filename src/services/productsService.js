import axios from "@/plugins/axios";

function serializeResponse(products) {
  return products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});
}

class Api {
  async fetchProducts() {
    try {
      const request = await axios.get(`/products`);
      const response = serializeResponse(request);
      // products.value = response;
      // console.log(products.value);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchProductById(id) {
    try {
      const request = await axios.get(`/products/${id}`);
      const response = serializeResponse(request);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      const request = await axios.delete(`/products/${id}`);
      if (request.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postProduct(newProduct) {
    try {
      const request = await axios.post(`/products`, newProduct);
      if (request.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async putProduct(id, newData) {
    try {
      const request = await axios.put(`/products/${id}`, newData);
      if (request.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new Api();
export default api;
