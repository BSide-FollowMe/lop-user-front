import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

console.log("환경:", process.env);
createApp(App).use(router).use(store).mount('#app');
