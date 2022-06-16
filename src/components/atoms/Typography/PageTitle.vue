<template>
  <h1 class="page-title"><span>씨앗 저장소</span></h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.page-title {
  margin: 0;
  font-weight: var(--font-weight-head);
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  letter-spacing: -0.0025em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
}
</style>
