<template>
  <div class="products-list-wrap">
    <div class="product-item" v-for="(product, key) in products" :key="key">
      <img :src="product.avatar" alt="avatar" style="width: 300px" />
      <h4>{{ product.name }}</h4>
      <h5>{{ product.description }}</h5>
      <h5>{{ product.createdAt }}</h5>
    </div>
  </div>
</template>

<!-- * Using store -->
<!-- <script> 
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductList",
  computed: {
    ...mapGetters(["products"]),
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
  beforeMount() {
    this.fetchProducts();
  },
};
</script> -->

<!-- ? Composition -->
<script>
import axios from "@/plugins/axios";
import { ref } from "vue";

function getProducts() {
  function serializeResponse(products) {
    return products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }

  let products = ref({});

  async function fetchProducts() {
    const request = await axios.get(`/products`);
    const response = serializeResponse(request);
    products.value = response;
    console.log(products.value);
  }
  fetchProducts();
  return {
    products,
  };
}
export default {
  setup() {
    const { products } = getProducts();
    return {
      products,
    };
  },
};
</script>

<style scoped>
.product-item {
  border: 2px solid black;
  border-radius: 50px;
  margin-top: 20px;
}
</style>
