<template>
  <div class="app" id="app">
    <FormInput />
    <ProductList />
  </div>
</template>

<script>
import FormInput from "./components/FormInput.vue";
import ProductList from "./components/ProductList.vue";

export default {
  name: "App",
  components: {
    FormInput,
    ProductList,
  },
};
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
