import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// import copyText from "@meforma/vue-copy-to-clipboard";
import VueClipboard from "vue3-clipboard";

import "animate.css";
import "@/assets/icons/css/fontello.css";

// import ClickOutside from './utils/ClickOutside.js'

createApp(App).use(router).use(createPinia()).use(VueClipboard).mount("#app");
