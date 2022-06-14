<template>
  <div>
    <TopperHeader class="topper-header" />
    <div class="page-container">
      <slot />
    </div>
    <BottomFooter />
    <Snack class="snack"></Snack>
    <ToTopButton class="to-top-btn" :visible="isVisible" :isAtBottom="isBottom" fixed @click="clickToTop" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onUnmounted, ref } from 'vue';
import ToTopButton from '@/components/atoms/buttons/ToTop.vue';
import TopperHeader from './TopperHeader.vue';
import BottomFooter from './BottomFooter.vue';
import Snack from '../Snack.vue';

export default defineComponent({
  components: {
    TopperHeader,
    BottomFooter,
    Snack,
    ToTopButton,
  },
  setup() {
    const isVisible = ref(false);
    const isBottom = ref(false);
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
      isVisible,
      isBottom,
      clickToTop,
    };
  },
});
</script>
<style lang="scss" scoped>
.topper-header {
  z-index: 1000;
  position: sticky;
  top: 0;
  background: #fff;
}
.snack {
  position: fixed;
  top: 131px;
}
.page-container {
  height: 100%;
  overflow: hidden;
}
</style>
