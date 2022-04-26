<template>
  <div>
    식물의 목소리를 듣는중입니다...
    <br />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ROUTE_TO } from '@/router/routing';
import { tokenSvc } from '@/api/token-service';
import { getAccountInfo } from '@/api/account';
import store from '@/store';

export default defineComponent({
  setup() {
    const route = useRoute();
    const accessToken = computed(() => route.query['access_token'] || '');

    tokenSvc.setToken({ token: accessToken.value });
    if (isEmptyToken(accessToken.value)) {
      alert('잘못된 접근입니다.');
      ROUTE_TO.HOME();
    }
    getUserInfo();

    if (!checkValidToken()) {
      alert('잘못되었거나 만료된 토큰입니다. 다시 로그인해주세요');
      tokenSvc.removeToken();
      ROUTE_TO.LOGIN();
    }
    const myUserInfo = computed(() => store.getters.getUserInfo);

    async function getUserInfo() {
      try {
        const { data } = await getAccountInfo();
        console.log(data);
        tokenSvc.setToken({ token: accessToken.value, ...data });
        ROUTE_TO.HOME();
      } catch (e) {
        alert('잘못된 접근입니다.');
        ROUTE_TO.HOME();
        console.error(e);
      }
    }

    function isEmptyToken(token) {
      return !token || token === '';
    }
    async function checkValidToken() {
      return await tokenSvc.isValidToken();
    }

    return {
      accessToken,
      myUserInfo,
    };
  },
});
</script>
