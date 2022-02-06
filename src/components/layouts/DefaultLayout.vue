<template>
  <div>
    <TopperHeader />
    <div class="page-container">
      <slot />
    </div>
    <BottomFooter />
    <Snack class="snack"></Snack>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import TopperHeader from './TopperHeader';
import BottomFooter from './BottomFooter';
import Snack from '../Snack'

export default defineComponent({
  components: {
    TopperHeader,
    BottomFooter,
    Snack,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.snack{
  position:fixed;
  top:131px;
}
.page-container {
  height: 100%;
  overflow:hidden;

}
</style>
