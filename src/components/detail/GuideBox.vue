<template>
  <div class="guide-box" @click="action()">
    {{ content }}
    <div class="arrow-icon"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

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
      default: '#969696',
    },
  },
  setup(props) {
    const borderColor = computed(() => {
      return props.hoverColor === '#969696' ? 'transparent' : props.hoverColor;
    });
    return {
      borderColor,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.guide-box {
  cursor: pointer;
  background: var(--background-color-4);
  border-radius: 4px;
  height: 56px;
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  @include breakpoint-down-sm {
    font-size: 15px;
    height: 46px;
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
  border: 1px solid transparent;
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
    background-color: var(--text-color-3);
  }

  &:hover {
    border: 1px solid v-bind(borderColor);
    color: v-bind(hoverColor);
    .arrow-icon {
      background-color: v-bind(hoverColor);
    }
  }
}
</style>
