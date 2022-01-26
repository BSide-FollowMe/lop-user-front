<template>
  <div class="text-center">
    <h1>식물의 언어 임시 라우팅 페이지</h1>
    <router-link to="/home">
      메인페이지
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Landing',
  setup() {
    //TODO: 랜딩 콜백
    return {};
  },
});
</script>
