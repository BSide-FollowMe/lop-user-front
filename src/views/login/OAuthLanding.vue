<template>
  <div>Logging on...{{ accessToken }}</div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ROUTE_TO } from '@/router/routing';
import { tokenSvc } from '@/api/token-service';

export default defineComponent({
  setup() {
    const route = useRoute();
    const accessToken = computed(() => route.query['access_token'] || '');

    if (isEmptyToken(accessToken.value)) {
      alert('잘못된 접근입니다.');
      ROUTE_TO.HOME();
    }
    tokenSvc.setToken({ token: accessToken.value });

    if (!checkValidToken()) {
      alert('잘못되었거나 만료된 토큰입니다. 다시 로그인해주세요');
      tokenSvc.removeToken();
      ROUTE_TO.LOGIN();
    }

    ROUTE_TO.HOME();

    function isEmptyToken(token) {
      return !token || token === '';
    }
    async function checkValidToken() {
      return await tokenSvc.isValidToken();
    }

    return {
      accessToken,
    };
  },
});
</script>
