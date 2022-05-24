<template>
  <div class="product">
    <div class="product-item">
      <div class="product-item-info">
        <img :src="product.avatar" alt="avatar" style="width: 300px" />
        <h4>{{ product.name }}</h4>
        <h4>{{ product.id }}</h4>
        <h5>{{ product.description }}</h5>
        <h5>{{ product.createdAt }}</h5>
        <button @click="deleteItem(+product.id)">Delete</button>
        <button @click="handleEdit(product.id)">Edit</button>
      </div>
      <div :id="product.id" class="hide">
        <input type="text" class="edit-input" v-model="itemTitle" />
        <input type="text" class="edit-input" v-model="itemAvatar" />
        <textarea type="text" class="edit-textarea" v-model="itemDescription" />
        <button @click="editItem(product.id)">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "../types/product";
import { PropType, defineComponent, ref } from "vue";
import apiProduct from "../services/products.api";

export default defineComponent({
  name: "ProductItem",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  emits: ["edited"],

  setup(props, { emit }) {
    let itemTitle = ref(props.product.name);
    let itemAvatar = ref(props.product.avatar);
    let itemDescription = ref(props.product.description);

    const deleteItem = (id: number) => {
      apiProduct.deleteProduct(id);
      emit("edited");
    };

    const handleEdit = (id: string) => {
      const form = document.getElementById(id);
      form.classList.remove("hide");
      form.classList.add("show");
    };

    const editItem = (id: string) => {
      const form = document.getElementById(id);

      let editedObject = {};

      if (itemTitle.value != "") {
        Object.assign(editedObject, { name: itemTitle.value });
      }

      if (itemAvatar.value != "") {
        Object.assign(editedObject, { avatar: itemAvatar.value });
      }

      if (itemDescription.value != "") {
        Object.assign(editedObject, { description: itemDescription.value });
      }

      form.classList.remove("show");
      form.classList.add("hide");

      // store.dispatch("editProduct", { editedObject, id });
      apiProduct.updateProduct(+id, editedObject);
      emit("edited");
    };

    return {
      deleteItem,
      editItem,
      handleEdit,
      itemTitle,
      itemAvatar,
      itemDescription,
    };
  },
});
</script>

<style scoped>
.product-item {
  border: 2px solid black;
  margin-top: 20px;
  display: flex;
}
.product-item-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 85%;
}

.edit-input {
  width: 100%;
  height: 35px;
}

.edit-textarea {
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.show {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 14%;
  height: 100%;
}

.hide {
  display: none;
}
</style>
