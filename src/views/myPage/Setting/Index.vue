<template>
  <div class="inner-container">
    <section class="title">마이페이지</section>
    <Setting></Setting>
  </div>
</template>
<script lang="ts">
import Setting from './Setting.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Setting,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.title {
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  letter-spacing: -0.0025em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
  margin-bottom: 50px;
  @include breakpoint-down-sm {
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.01em;
    margin-bottom: 40px;
  }
}
</style>
