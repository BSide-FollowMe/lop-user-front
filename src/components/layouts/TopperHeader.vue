<template>
  <div class="container">
    <div class="inner-container flex-row">
      <div class="title">
        <img id="logo" src="@/assets/logo.png" @click="ROUTE_TO.LANDING" />
        <img id="logo-title" src="@/assets/logo-title.png" @click="ROUTE_TO.LANDING" />
      </div>
      <div class="tab">
        <span
          @click="
            () => {
              alert(1);
            }
          "
        >
          질문 · 답변
        </span>
        <span
          v-if="isLoggedIn"
          @click="
            () => {
              console.log('2');
            }
          "
        >
          {{ username }}님
        </span>
        <span v-else @click="ROUTE_TO.LOGIN">Login</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ROUTE_TO } from '@/router/routing';

export default defineComponent({
  setup(props, { emit }) {
    const onToggleDrawer = () => {
      emit('toggleDrawer');
    };
    const isLoggedIn = ref(false);

    return {
      ROUTE_TO,
      isLoggedIn,
      onToggleDrawer,
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
      padding-left: 12px;
    }
    img {
      cursor: pointer;
    }
    display: flex;
    align-items: center;
    @include breakpoint-down-sm {
      img#logo-title {
        content: url('@/assets/mobile-title.png');
      }
      img#logo {
        content: url('@/assets/mobile-logo.png');
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
    }
    span:not(:last-child):after {
      cursor: default;
      content: '|';
      margin: 0 20px;
    }
  }
}
</style>
