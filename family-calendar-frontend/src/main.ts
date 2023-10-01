import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "animate.css";
import "@/assets/icons/css/fontello.css";

createApp(App).use(router).use(createPinia()).mount("#app");
