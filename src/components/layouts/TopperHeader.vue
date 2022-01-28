<template>
  <div class="container">
    <div class="inner-container flex-row">
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
  border-bottom: var(--background-color-1) 1px solid;
  .inner-container{
    margin-left: auto;
    margin-right: auto;
    padding: var(--m-content-container-padding) var(--content-container-padding);
    align-items: center;
    height: 101px;
    max-width: var(--content-container-max-width);

  @include breakpoint-down-sm {
    min-width: 360px;
    height: 60px;
    padding: var(--m-content-container-padding) var(--m-content-container-padding);
  }
  }
  .title {
    cursor:pointer;
    img#logo-title {
      padding-left: 12px;
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
    text-align:right;

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
