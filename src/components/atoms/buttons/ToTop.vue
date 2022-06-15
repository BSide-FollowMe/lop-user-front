<template>
  <button id="toTop" class="to-top-btn" :class="{ visible: visible, fixed: isFixed, 'at-bottom': isAtBottom }">
    <img src="@/assets/icon/arrow_upward.svg" />
  </button>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    isAtBottom: {
      type: Boolean,
      default: false,
    },
  },
  name: 'ToTopBtn',
  components: {},
  setup(props) {
    const isFixed = computed(() => props.fixed);

    return {
      isFixed,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.to-top-btn {
  z-index: 99;
  right: 50%;
  bottom: 20px;
  cursor: pointer;
  background-color: #ebf1f1;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 4px 6px 2px rgba(0, 0, 0, 0.04);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.fixed {
    position: fixed;

    @include breakpoint-only-lg {
      left: calc(50% + 570px);
    }

    @include breakpoint-down-md {
      right: 20px;
    }
    @include breakpoint-down-sm {
      right: 20px;
      bottom: 20px;
    }
  }
  &.at-bottom {
    @include breakpoint-up-sm {
      // bottom:210px;
    }
  }

  &.visible {
    opacity: 1;
  }
}
</style>
