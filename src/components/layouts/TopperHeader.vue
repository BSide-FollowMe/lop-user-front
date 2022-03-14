<template>
  <div class="container">
    <div class="inner-container flex-row">
      <div class="title">
        <img id="logo" src="@/assets/logo.svg" @click="ROUTE_TO.HOME" />
        <img id="logo-title" src="@/assets/logo-title.svg" @click="ROUTE_TO.HOME" />
      </div>
      <div class="tab">
        <span @click="ROUTE_TO.QNABOARD" :class="{'active':activeButton=='QNABOARD'}">질문 · 답변</span>
        <span v-if="isLoggedIn" @click="ROUTE_TO.MYPAGE" :class="{'active':activeButton=='MYPAGE'}">마이페이지</span>
        <span v-else @click="ROUTE_TO.LOGIN" :class="{'active':activeButton=='LOGIN'}">로그인</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { ROUTE_TO } from '@/router/routing';
import {PageEnum} from '@/enums/PageEnum';
import { tokenSvc } from '@/api/token-service';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const currentPath = computed(() => route.path);
    const activeButton = computed(() => {
      const path:any =  route.path
      if(!path|| !path.length) return ''
      if(path.startsWith(PageEnum.QNABOARD)) {
        return 'QNABOARD';
      }
      else if(path.startsWith(PageEnum.My_Page)) {
        return 'MYPAGE';
      }
      else if(path.startsWith(PageEnum.LOGIN)) {
        return 'LOGIN';
      }
      else {
        return '';
      }
    });
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
      currentPath,
      activeButton,
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
      &.active {
        font-weight: var(--font-weight-bold);
        color: var(--secondary-green-color);
      }
    }
    span:last-child {
      margin-left: 20px;
    }
    span:not(:last-child) {
      margin-right: 20px;
      &:after {
        cursor: default;
        font-size: 12px;
        content: '|';
        color: var(--background-color-1);
        position: absolute;
        margin: 0 20px;
      }
    }

    @include breakpoint-down-sm {
      font-size: 13px;
      line-height: 16px;
      letter-spacing: -0.0025em;
      span:last-child {
        margin-left: 10px;
      }
      span:not(:last-child) {
        margin-right: 12px;
        &:after {
          font-size:12px;
          cursor: default;
          content: '|';
          position: absolute;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
