import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { loadFonts } from './plugins/webfontloader';
import { createVueKakaoSdk } from 'vue3-kakao-sdk'
import './styles/index.scss';

loadFonts();

console.log('환경:', process.env);

const app = createApp(App).use(createVueKakaoSdk(process.env.VUE_APP_KAKAO_API_KEY));
// click outside directive 생성 v-click-outside (of component)
app.directive('click-outside', {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});

app.use(router).use(store).mount('#app');
