<template>
  <div class="container">
    <div class="heart-empty-icon" />
    <div class="text">아직 저장한 식물이 없어요</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
@import '@/styles';
.container {
  width: 100%;
  min-height: 511px;
  height: 100%;
  background: #ffffff;
  border-radius: 4px;
  @include breakpoint-down-sm {
    min-height: 318px;
    height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height) - 186px);
    padding: 97px 0 136px 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 170px 0 203px 0;
}
.heart-empty-icon {
  -webkit-mask-image: url('@/assets/icon/heart-empty.svg');
  mask-image: url('@/assets/icon/heart-empty.svg');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center center;
  mask-position: center center;
  width: 66.67px;
  height: 66.17px;
  mask-size: 66.67px;
  background-color: rgba(89, 146, 112, 0.3);
  margin-bottom: 41.83px;
  @include breakpoint-down-sm {
    width: 46.67px;
    height: 42.82px;
    mask-size: 46.67px;

    letter-spacing: -0.01em;
    margin-bottom: 16px;
  }
}
.text {
  font-weight: var(--font-weight-medium);
  font-size: 24px;
  line-height: 34px;
  /* identical to box height, or 142% */

  text-align: center;
  letter-spacing: -0.01em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
  @include breakpoint-down-sm {
    font-size: 16px;
    line-height: 26px;

    letter-spacing: -0.01em;
  }
}
</style>
