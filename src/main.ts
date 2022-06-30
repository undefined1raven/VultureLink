import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import runtime from "serviceworker-webpack-plugin/lib/runtimeTemplate.js";

// if("serviceWorker" in navigator){
//     runtime.register();
// }

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
