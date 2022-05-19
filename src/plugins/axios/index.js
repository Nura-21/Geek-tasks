import axios from "axios";
import interceptors from "./interceptors";
const instance = axios.create({
  baseURL: "https://6285d3c496bccbf32d6907ef.mockapi.io/api/v1",
});
interceptors(instance);
export default instance;
