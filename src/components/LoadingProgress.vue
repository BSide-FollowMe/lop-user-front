<template>
  <div class="loading">
    <div class="loading__wrapper">
      <Vue3Lottie ref="lottie" :animationData="LoadingJSON" :height="120" :width="120" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';
import LoadingJSON from '@/assets/lottie/loading.json';
export default defineComponent({
  components: {
    Vue3Lottie,
  },
  setup() {
    const lottie = ref();
    return {
      lottie,
      LoadingJSON,
    };
  },
});
</script>
<style lang="scss" scoped>
.loading {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.7);

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 140px;
    height: 140px;
    transform: translate(-50%, -50%);
  }
}
</style>
