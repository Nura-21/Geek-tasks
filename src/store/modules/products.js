import axios from "@/plugins/axios";
import mutations from "@/store/mutations";

function serializeResponse(products) {
  return products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});
}

const { PRODUCTS } = mutations;

const productsStore = {
  state: {
    products: [],
  },
  getters: {
    products: ({ products }) => products,
  },
  mutations: {
    [PRODUCTS](state, value) {
      state.products = value;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const request = await axios.get(`/products`);
        const products = serializeResponse(request);
        console.log(products);
        commit("PRODUCTS", products);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default productsStore;
