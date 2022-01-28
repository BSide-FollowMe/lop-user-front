<template>
  <div>
    <TopperHeader />
    <div class="page-container">
      <slot />
    </div>
    <BottomFooter />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import TopperHeader from './TopperHeader';
import BottomFooter from './BottomFooter';

export default defineComponent({
  components: {
    TopperHeader,
    BottomFooter,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.page-container {
  height: 100%;
  overflow:hidden;

}
</style>
