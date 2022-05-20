<template>
  <div class="products-list">
    <button @click="generateNewItem">Generate</button>
    <div class="products-list-wrap" v-if="isNotEmpty">
      <div class="product-item" v-for="(product, key) in products" :key="key">
        <img :src="product.avatar" alt="avatar" style="width: 300px" />
        <h4>{{ product.name }}</h4>
        <h4>{{ product.id }}</h4>
        <h5>{{ product.description }}</h5>
        <h5>{{ product.createdAt }}</h5>
        <button @click="deleteItem(product.id)">Delete</button>
        <button @click="editItem(product.id)">Edit</button>
      </div>
    </div>
    <div class="info" v-else>No products</div>
  </div>
</template>
<!-- ? Composition -->
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();

    store.dispatch("fetchProducts");

    function deleteItem(id) {
      store.dispatch("removeProduct", id);
    }

    function generateNewItem() {
      let testObject = {
        createdAt: "2022-05-19T06:02:22.503Z",
        name: "New Generated Product",
        avatar: "http://loremflickr.com/640/480/technics",
        description:
          "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        id: `${0}`,
      };
      store.dispatch("addProduct", testObject);
    }

    function editItem(id) {
      store.dispatch("editProduct", id);
    }

    return {
      products: computed(() => store.getters.products),
      deleteItem,
      generateNewItem,
      editItem,
      isNotEmpty: computed(() => Object.values(store.getters.products).length),
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
