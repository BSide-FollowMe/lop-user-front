<template>
  <div>
    <TopperHeader class="topper-header"/>
    <div class="page-container">
      <slot />
    </div>
    <BottomFooter />
    <Snack class="snack"></Snack>
    <ToTopButton class="to-top-btn" fixed />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import ToTopButton from '@/components/buttons/ToTop.vue';
import TopperHeader from './TopperHeader';
import BottomFooter from './BottomFooter';
import Snack from '../Snack'

export default defineComponent({
  components: {
    TopperHeader,
    BottomFooter,
    Snack,
        ToTopButton,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.topper-header{
  z-index:1000;
  position: sticky;
  top: 0;
  background: #FFF;
}
.snack{
  position:fixed;
  top:131px;
}
.page-container {
  height: 100%;
  overflow:hidden;

}
</style>
