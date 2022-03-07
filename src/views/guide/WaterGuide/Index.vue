<template>
  <GuideLayout :bannerImage="bannerImage" title="식물이 좋아하는 물 주기 방법">
    <Inspect></Inspect>
    <div class="dot-divider"><img src="@/assets/dot-divider.svg" /></div>
    <Know-how></Know-how>
  </GuideLayout>
</template>
<script lang="ts">
import Inspect from './Inspect.vue';
import KnowHow from './KnowHow.vue';
import { defineComponent } from 'vue';
import GuideLayout from '../Index.vue';
import bannerImage from '@/assets/images/guide/bg-waterguide.png';

export default defineComponent({
  components: {
    GuideLayout,
    Inspect,
    KnowHow,
  },
  setup() {
    return {
      bannerImage,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/';
.dot-divider {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  @include breakpoint-down-sm {
    height: 130px;
  }
}
</style>
