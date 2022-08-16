<template>
  <div class="container">
    <div class="inner-container">
      <div class="title">
        <img id="logo" src="@/assets/logo.svg" @click="ROUTE_TO.HOME" />
      </div>
      <div class="tab">
        <button class="tab__item" @click="() => ROUTE_TO.ALLPLANTS(1)" :class="{ active: activeButton == 'ALLPLANTS' }">모든 식물</button>
        <button class="tab__item" @click="ROUTE_TO.QNABOARD" :class="{ active: activeButton == 'QNABOARD' }">질문 · 답변</button>
        <button class="tab__item" @click="ROUTE_TO.STORY_FEED" :class="{ active: activeButton == 'STORY' }">
          스토리
          <span class="new"></span>
        </button>
      </div>
      <div class="login-tab">
        <button v-if="isLoggedIn" @click="ROUTE_TO.MYPAGE" :class="{ button: true, mypage: true, active: activeButton == 'MYPAGE' }">
          마이페이지
        </button>
        <button v-else @click="ROUTE_TO.LOGIN" :class="{ login: true, button: true, active: activeButton == 'LOGIN' }">로그인</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { ROUTE_TO } from '@/router/routing';
import { PageEnum } from '@/enums/PageEnum';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const activeButton = computed(() => {
      const path: string = route.path;
      return ['ALL_PLANTS', 'QNABOARD', 'My_PAGE', 'LOGIN']
        .find((item) => path.startsWith(PageEnum[item as 'ALL_PLANTS' | 'QNABOARD' | 'My_PAGE' | 'LOGIN']))
        ?.replaceAll('_', '');
    });

    const isLoggedIn = computed(() => store.getters.isAuthenticated);

    return {
      ROUTE_TO,
      isLoggedIn,
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    padding: var(--m-content-container-padding) var(--content-container-padding);
    height: auto;
    max-width: var(--content-container-max-width);

    @include breakpoint-down-sm {
      flex-wrap: wrap;
      min-width: 360px;
      padding: 0;
      height: auto;
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
      height: 60px;
      padding-left: var(--m-content-container-padding);
      img#logo {
        content: url('@/assets/mobile-logo.svg');
      }
    }
  }
  .tab {
    flex-basis: 100%;
    margin-left: 50px;
    line-height: 18px;
    height: 18px;
    text-align: left;

    /* identical to box height */

    letter-spacing: -0.0025em;
    &__item {
      font-weight: var(--font-weight-medium);
      font-size: 15px;
      background: transparent;
      border: none;
      vertical-align: middle;
      flex-basis: 33.3%;
      &.active {
        font-weight: var(--font-weight-bold);
        color: var(--secondary-green-color);
      }
      @include breakpoint-down-sm {
        position: relative;
      }
    }
    &__item:not(:first-child) {
      margin-left: 20px;
      @include breakpoint-down-sm {
        margin-left: 10px;
      }
    }
    &__item:not(:last-child) {
      margin-right: 20px;
      &:after {
        cursor: default;
        font-size: 12px;
        content: '|';
        color: var(--background-color-1);
        position: absolute;
        margin: 0 20px;
      }
      @include breakpoint-down-sm {
        margin-right: 12px;
        &:after {
          font-size: 12px;
          cursor: default;
          content: '|';
          position: absolute;
          margin-left: calc(50% - 12px);
        }
      }
    }
    .new {
      margin-left: 2px;
      position: relative;
      top: -10px;
      border-radius: 100%;
      display: inline-block;
      width: 4px;
      height: 4px;
      background: #e27d55;
    }
    @include breakpoint-down-sm {
      order: 3;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
      border-top: 1px solid #dddddd;
      margin: 0;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      line-height: 16px;
      letter-spacing: -0.0025em;
    }
  }

  .login-tab {
    flex-shrink: 0;
    @include breakpoint-down-sm {
      padding-right: var(--m-content-container-padding);
    }
    .button {
      font-size: 14px;
      font-weight: var(--font-weight-medium);
      padding: 4px 10px;
      border-radius: 2px;
      &.mypage {
        color: #444444;
        background: var(--background-color-4);
      }
      &.login {
        color: #ffffff;
        background: var(--secondary-green-color-1);
      }
    }
  }
}
</style>
