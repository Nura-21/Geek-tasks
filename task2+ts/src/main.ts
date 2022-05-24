import { createApp } from "vue";
import App from "./App.vue";
import ProductList from "@/components/ProductList.vue";
import ProductItem from "@/components/ProductItem.vue";
const app = createApp(App);
app.component("ProductList", ProductList);
app.component("ProductItem", ProductItem);
app.mount("#app");
