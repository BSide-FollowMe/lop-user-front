<template>
  <button id="toTop" class="to-top-btn" :class="{ visible: isVisible, fixed: isFixed, 'at-bottom': isBottom }" @click="clickToTop">
    <img src="@/assets/icon/arrow_upward.svg" />
  </button>
</template>
<script lang="ts">
import { defineComponent, computed, onUnmounted, ref } from 'vue';
export default defineComponent({
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  name: 'ToTopBtn',
  components: {},
  setup(props) {
    const isVisible = ref(false);
    const isBottom = ref(false);
    const isFixed = computed(() => props.fixed);
    const windowWidth = ref(window.innerWidth);
    const isMobile = computed(() => windowWidth.value < 768);
    window.addEventListener('resize', resizeWindow);
    window.addEventListener('scroll', onScroll);
    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeWindow);
    });
    function resizeWindow() {
      windowWidth.value = window.innerWidth;
    }
    function onScroll(e: Event) {
      const { scrollTop, clientHeight, scrollHeight } = (e.target as Document).documentElement;
      if (scrollTop > 100) {
        isVisible.value = true;
      } else {
        isVisible.value = false;
      }
      const isAtTheBottom = scrollHeight <= scrollTop + clientHeight + 180;
      if (isAtTheBottom) {
        const target: HTMLElement | null = document.getElementById('toTop');
        if (target === null) return;
        const val = (scrollHeight - (scrollTop + clientHeight) - 210) * -1;
        target.style.bottom = isMobile.value ? val + 'px' : '20px';
      } else {
        isBottom.value = false;
      }
      // if(scrollTop >)
    }
    function clickToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return {
      clickToTop,
      isFixed,
      isVisible,
      isBottom,
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
