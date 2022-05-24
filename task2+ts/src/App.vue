<template><product-list></product-list></template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductList from "./components/ProductList.vue";

export default defineComponent({
  name: "App",
  components: {
    ProductList,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
