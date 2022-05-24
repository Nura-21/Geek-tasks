<template>
  <div class="products-container">
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
    <div class="product-list-wrap" v-if="isNotEmpty">
      <div class="product-list" v-for="product in products" :key="product.id">
        <product-item
          :product="product"
          @edited="editProduct"
          @deleted="removeProduct"
        ></product-item>
      </div>
    </div>
    <div v-else>No products</div>
  </div>
</template>

<script lang="ts">
import apiProduct from "../services/products.api";
import { ref, computed } from "vue";
import { Product } from "../types/product";

export default {
  name: "ProductList",
  setup() {
    let products = ref({});

    let itemTitle = ref("New Generated Product");
    let itemAvatar = ref("http://loremflickr.com/640/480/technics");
    let itemDescription = ref("The description of the new generated product");

    const loadProducts = () => {
      apiProduct.getProducts().then((data) => {
        products.value = data;
      });
    };

    loadProducts();

    const removeProduct = (id: string) => {
      apiProduct.deleteProduct(id).then(() => loadProducts());
    };

    const editProduct = (id: string, editedObject: Partial<Product>) => {
      apiProduct.updateProduct(id, editedObject).then(() => loadProducts());
    };

    const generateNewItem = () => {
      apiProduct
        .addProduct({
          createdAt: new Date(),
          name: itemTitle.value,
          avatar: itemAvatar.value,
          description: itemDescription.value,
          id: "0",
        })
        .then(() => loadProducts());
    };

    return {
      products,
      itemTitle,
      itemAvatar,
      itemDescription,
      generateNewItem,
      loadProducts,
      removeProduct,
      editProduct,
      isNotEmpty: computed(() => Object.values(products.value).length),
    };
  },
};
</script>

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
