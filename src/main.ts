import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import router from './router';
import store from './store';
import { loadFonts } from './plugins/webfontloader';
import { createVueKakaoSdk } from 'vue3-kakao-sdk';
import './styles/index.scss';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { worker } from './mocks/browser';

loadFonts();

const isDev = process.env.NODE_ENV !== 'production';
if (isDev) {
  // worker.start();
  console.log('환경!:', process.env);
}
const app = createApp(App).use(createVueKakaoSdk(process.env.VUE_APP_KAKAO_API_KEY as string));

Sentry.init({
  app,
  dsn: 'https://dfbb0b1435cc4de2a0c5aa85c1dbdca2@o1204965.ingest.sentry.io/6334309',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'https://www.plantslang.com', /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

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

app
  .use(router)
  .use(store)
  .use(
    VueGtag,
    {
      config: {
        id: 'G-MG82RJWWSE',
        params: { send_page_view: false },
      },
    },
    router
  )
  .use(createMetaManager())
  .mount('#app');
