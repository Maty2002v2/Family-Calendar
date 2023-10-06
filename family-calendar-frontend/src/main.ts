import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { i18n } from './translations/main';

import "animate.css";
import "@/assets/icons/css/fontello.css";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(i18n)
  .mount("#app");
