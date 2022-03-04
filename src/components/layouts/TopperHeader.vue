<template>
  <div class="container">
    <div class="inner-container flex-row">
      <div class="title">
        <img id="logo" src="@/assets/logo.svg" @click="ROUTE_TO.HOME" />
        <img id="logo-title" src="@/assets/logo-title.svg" @click="ROUTE_TO.HOME" />
      </div>
      <div class="tab">
        <span @click="ROUTE_TO.QNABOARD">질문 · 답변</span>
        <span v-if="isLoggedIn" @click="ROUTE_TO.MYPAGE">마이페이지</span>
        <span v-else @click="ROUTE_TO.LOGIN">로그인</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { ROUTE_TO } from '@/router/routing';
import { tokenSvc } from '@/api/token-service';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const currentPath = computed(() => route.path);
    watch(currentPath, () => {
      checkLoggedIn();
    });
    const isLoggedIn = ref(false);
    checkLoggedIn();
    async function checkLoggedIn() {
      isLoggedIn.value = await tokenSvc.isValidToken();
    }
    return {
      ROUTE_TO,
      isLoggedIn,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/', '@/assets/fonts/pretendard/pretendard.css';
.container {
  border-bottom: var(--background-color-1) 1px solid;
  .inner-container {
    margin-left: auto;
    margin-right: auto;
    padding: var(--m-content-container-padding) var(--content-container-padding);
    align-items: center;
    height: var(--topper-header-height);
    max-width: var(--content-container-max-width);

    @include breakpoint-down-sm {
      min-width: 360px;
      padding: var(--m-content-container-padding) var(--m-content-container-padding);
    }
  }
  .title {
    img#logo-title {
      margin-left: 12px;
    }
    img {
      cursor: pointer;
    }
    display: flex;
    align-items: center;
    @include breakpoint-down-sm {
      img#logo-title {
        content: url('@/assets/mobile-title.svg');
      }
      img#logo {
        content: url('@/assets/mobile-logo.svg');
      }
    }
  }
  .tab {
    font-weight: var(--font-weight-medium);
    font-size: 15px;
    line-height: 18px;
    justify-content: flex-end;
    text-align: right;

    /* identical to box height */

    letter-spacing: -0.0025em;
    > span {
      cursor: pointer;
      // margin: 0 10px;
    }
    span:last-child{
      margin-left:10px;
    }
    span:not(:last-child) {
      margin-right:10px;
      &:after {
        cursor: default;
        content: "|";
        position: absolute;
        margin: 0 10px;
      }
    }

    @include breakpoint-down-sm {
      font-size: 13px;
      line-height: 16px;
      letter-spacing: -0.0025em;
    }
  }
}
</style>
