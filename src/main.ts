import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { store } from "@/store";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

loadFonts();

createApp(App)
  .use(Vue3Toastify, {
    theme: "dark",
    toastClassName: "color-toast",
  } as ToastContainerOptions)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount("#app");
