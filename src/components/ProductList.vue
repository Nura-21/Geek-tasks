<template>
  <div class="products-list">
    <div class="product-form">
      <h2>New product form</h2>
      <input
        type="text"
        v-model="itemTitle"
        class="form-input"
        placeholder="New title"
      />
      <input
        type="text"
        v-model="itemAvatar"
        class="form-input"
        placeholder="New avatar"
      />
      <textarea
        type="text"
        v-model="itemDescription"
        class="form-textarea"
        placeholder="New description"
      />
      <button @click="generateNewItem">Generate</button>
    </div>

    <div class="products-list-wrap" v-if="isNotEmpty">
      <div class="product-list" v-for="product in products" :key="product.id">
        <!-- Если так он выводит, но в компанент ProductItem эти данные не летят -->
        {{ product }}

        <ProductItem :product="product" />
      </div>
    </div>
    <div class="info" v-else>No products</div>
  </div>
</template>

<!-- ? Composition <=> Service -->
<script>
import { computed, ref, onBeforeMount } from "vue";
import ProductItem from "./ProductItem";
import api from "../services/products.api";
export default {
  name: "ProductList",
  component: {
    ProductItem,
  },
  setup() {
    let isLoaded = ref(false);
    let products = ref({ name: "Test" });

    onBeforeMount(async () => {
      products.value = await api.fetchProducts().then((data) => data);
    });

    console.log(products.value); // {name: "Test"}

    let itemTitle = ref("New Generated Product");
    let itemAvatar = ref("http://loremflickr.com/640/480/technics");
    let itemDescription = ref("The description of the new generated product");

    function generateNewItem() {
      api.addProduct({
        createdAt: new Date(),
        name: itemTitle.value,
        avatar: itemAvatar.value,
        description: itemDescription.value,
        id: 0,
      });
    }

    return {
      products,
      isLoaded,
      itemTitle,
      itemAvatar,
      itemDescription,
      isNotEmpty: computed(() => !!products.value),
      generateNewItem,
    };
  },
};
</script>

<!-- ? Composition + Store -->
<!-- <script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import ProductItem from "./ProductItem";
export default {
  components: {
    ProductItem,
  },
  setup() {
    const store = useStore();

    let itemTitle = ref("New Generated Product");
    let itemAvatar = ref("http://loremflickr.com/640/480/technics");
    let itemDescription = ref("The description of the new generated product");

    store.dispatch("fetchProducts");

    function generateNewItem() {
      store.dispatch("addProduct", {
        createdAt: new Date(),
        name: itemTitle.value,
        avatar: itemAvatar.value,
        description: itemDescription.value,
        id: 0,
      });
    }

    return {
      products: computed(() => store.getters.products),
      itemTitle,
      itemAvatar,
      itemDescription,
      generateNewItem,
      isNotEmpty: computed(() => Object.values(store.getters.products).length),
    };
  },
};
</script> -->

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-input {
  margin-bottom: 20px;
  width: 20%;
}

.form-textarea {
  margin-bottom: 20px;
  width: 20%;
  height: 100px;
}
</style>
