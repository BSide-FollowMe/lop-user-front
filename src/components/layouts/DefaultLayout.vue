<template>
  <div>
    <TopperHeader />
    <div class="page-container">
      <slot />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import TopperHeader from './TopperHeader';

export default defineComponent({
  components: {
    TopperHeader,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.page-container {
  max-width: var(--content-container-max-width);
}
</style>
