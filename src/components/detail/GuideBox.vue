<template>
  <div class="guide-box" @click="action()">
    {{ content }}
    <div class="arrow-icon"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
    action: {
      type: Function,
      default: () => {
        console.log('clicked!');
      },
    },
    hoverColor: {
      type: String,
      default: '#c9704c',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.guide-box {
  cursor: pointer;
  background: var(--background-color-4);
  border-radius: 0px 0px 4px 4px;
  height: 56px;
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  @include breakpoint-down-sm{
    font-size: 15px;
    height:46px;
  }
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/3 */

  color: var(--text-color-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 22.5px;
  .arrow-icon {
    display: inline-block;
    -webkit-mask-image: url('@/assets/icon/simple-arrow-right-pc.svg');
    mask-image: url('@/assets/icon/simple-arrow-right-pc.svg');
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    width: 20px;
    height: 18.35px;
    background-color: var(--primary-color-1);
  }
  &:hover {
    color: v-bind(hoverColor);
    .arrow-icon {
      background-color: v-bind(hoverColor);
    }
  }
}
</style>
