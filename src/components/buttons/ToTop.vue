<template>
  <button id="toTop" class="to-top-btn" @click="clickToTop" :style="{position:isFixed?'fixed':''}"><img src="@/assets/icon/arrow_upward.svg" /></button>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
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
    const isFixed = computed(()=>props.fixed);
    function clickToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return {
      clickToTop,
      isFixed,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.to-top-btn {
  right: 50%;
  bottom: 20px;
  cursor: pointer;
  background-color: #ebf1f1;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 4px 6px 2px rgba(0, 0, 0, 0.04);
}
</style>
