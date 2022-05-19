<template>
  <div class="products-list-wrap">
    <button @click="generateNewItem">Generate</button>
    <div class="product-item" v-for="(product, key) in products" :key="key">
      <img :src="product.avatar" alt="avatar" style="width: 300px" />
      <h4>{{ product.name }}</h4>
      <h5>{{ product.description }}</h5>
      <h5>{{ product.createdAt }}</h5>
      <button @click="deleteItem(product.id)">Delete</button>
      <button @click="editItem(product.id)">Edit</button>
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
import api from "@/services/productsService";
import { ref } from "vue";
export default {
  setup() {
    let products = ref([]);
    api.fetchProducts().then((data) => (products.value = data));

    function deleteItem(id) {
      api.deleteProduct(id).then((res) => console.log(res));
    }

    function generateNewItem() {
      api.postProduct({
        createdAt: "2022-05-19T06:02:22.503Z",
        name: "New Generated Product",
        avatar: "http://loremflickr.com/640/480/technics",
        description:
          "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        id: `${products.value.length + 1}`,
      });
    }

    function editItem(id) {
      api.putProduct(id, { name: "Edited Product Data" });
    }
    return {
      products,
      deleteItem,
      generateNewItem,
      editItem,
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
