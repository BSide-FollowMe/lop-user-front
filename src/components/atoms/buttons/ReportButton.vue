<template>
  <div class="button">
    <div class="icon__wrapper"><img class="icon" :src="icon" /></div>
    <span>신고하기</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import reportIcon from '@/assets/icon/report.svg';
export default defineComponent({
  setup() {
    return {
      icon: reportIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.button {
  cursor: pointer;
  > span {
    vertical-align: middle;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    letter-spacing: -0.01em;

    color: var(--text-color-3);
    @include breakpoint-down-sm {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
.icon {
  width: 100%;
  height: 100%;
  vertical-align: middle;

  &__wrapper {
    width: 13.07px;
    margin-right: 5px;
    height: 12.75px;
    display: inline-block;
    @include breakpoint-down-sm {
      width: 11.61px;
      height: 10.89px;
      margin-right: 4.61px;
    }
  }
}
</style>
