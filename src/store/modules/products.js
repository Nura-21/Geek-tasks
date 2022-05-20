import axios from "@/plugins/axios";
import mutations from "@/store/mutations";

function serializeResponses(products) {
  return products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});
}

function serializeResponse(product) {
  let temp = {};
  temp[product.id] = product;
  return temp;
}

const { PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } = mutations;

const productsStore = {
  state: {
    products: {},
  },
  getters: {
    products: ({ products }) => products,
  },
  mutations: {
    [PRODUCTS](state, value) {
      state.products = value;
    },
    [ADD_PRODUCT](state, value) {
      Object.assign(state.products, value);
    },
    [DELETE_PRODUCT](state, id) {
      delete state.products[id];
    },
    [EDIT_PRODUCT](state, id, changes = "Edited Product Title") {
      state.products[id].name = changes;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const request = await axios.get(`/products`);
        const products = serializeResponses(request);
        console.log(products);
        commit(PRODUCTS, products);
      } catch (err) {
        console.log(err);
      }
    },

    async fetchProductById({ commit }, id) {
      try {
        const request = await axios.get(`/products/${id}`);
        commit(ADD_PRODUCT, request);
      } catch (err) {
        console.log(err);
      }
    },

    async removeProduct({ commit }, id) {
      try {
        await axios.delete(`/products/${id}`);
        commit(DELETE_PRODUCT, id);
      } catch (err) {
        console.log(err);
      }
    },

    async addProduct({ commit, dispatch }, newProduct) {
      try {
        const response = await axios.post(`/products`, newProduct);
        const output = serializeResponse(response);
        console.log(output);
        commit(ADD_PRODUCT, output);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("fetchProducts");
      }
    },

    async editProduct({ commit }, id) {
      try {
        await axios.put(`/products/${id}`, { name: "Edited Product Data" });
        commit(EDIT_PRODUCT, id, "Edited Product Data");
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default productsStore;
