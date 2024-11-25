import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "./assets/main.css";
import store from "./store";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";
import { i18n } from "./language";
import View360 from "@egjs/vue3-view360";
import "@egjs/vue3-view360/css/view360.min.css";
createApp(App)
  .use(router)
  .use(store)
  .use(Antd)
  .use(i18n)
  .use(View360)
  .mount("#app");
