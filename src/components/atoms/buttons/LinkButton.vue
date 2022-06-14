<template>
  <span class="link-button">
    <v-slot></v-slot>
    <div class="arrow-icon"></div>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.link-button {
  cursor: pointer;
  height: 24px;
  display: inline-block;
  padding: 2px 12px 2px 9px;
  margin-left: 10px;
  background: #f4f8f1;
  border-radius: 42px;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: -0.01em;

  color: var(--secondary-green-color-1);
  .arrow-icon {
    margin-left: 7.33px;
    display: inline-block;
    -webkit-mask-image: url('@/assets/icon/simple-arrow-right-pc.svg');
    mask-image: url('@/assets/icon/simple-arrow-right-pc.svg');
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    width: 7px;
    height: 10px;
    mask-size: contain;
    background-color: var(--secondary-green-color-1);
  }
}
</style>
