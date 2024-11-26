import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "./assets/main.css";
import store from "./store";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";
import { i18n } from "./language";

createApp(App)
  .use(router)
  .use(store)
  .use(Antd)
  .use(i18n)
  .mount("#app");
