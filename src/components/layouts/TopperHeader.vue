<template>
  <div class="container flex-row">
    <div class="title">
      <img id="logo" src="@/assets/logo.png" />
      <img id="logo-title" src="@/assets/logo-title.png" />
    </div>
    <div class="tab">
      <span @click="()=>{alert(1)}">질문 · 답변</span>
      <span v-if="isLoggedIn" @click="()=>{console.log('2')}">{{ username }}님</span>
      <span v-else @click="()=>{console.log('2')}">Login</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props, { emit }) {
    const onToggleDrawer = () => {
      emit('toggleDrawer');
    };
    const isLoggedIn = ref(false);

    return {
      isLoggedIn,
      onToggleDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/', '@/assets/fonts/pretendard/pretendard.css';
.container {
  max-width: var(--content-container-max-width);
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  // padding: 0 480px 0 518px;
  height: 101px;
  border-bottom: var(--background-color-1) 1px solid;
  @include breakpoint-down-sm {
    width: 360px;
    height: 60px;
    padding: --content-container-padding;
  }
  .title {
    img#logo {
      width: 26px;
      height: 34.98px;
    }
    img#logo-title {
      padding-left: 12px;
      width: 110px;
      height: 22px;
    }
    display: flex;
    align-items: center;
  }
  .tab {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    justify-content:end;
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
