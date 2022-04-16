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
import setMeta from '@/utils/setMeta';

export default defineComponent({
  components: {
    GuideLayout,
    Inspect,
    KnowHow,
  },
  setup() {
    setMeta({
      title:'물주기 가이드 - 식물의언어',
      description:'식물에게 정말 필요한 만큼의 물을 주기 위해서는 흙이 얼마나 말랐는지를 확인해야 해요. 같은 식물이라도 계절이나, 자라는 환경에 따라 필요한 물의 양이 다르기 때문입니다. ‘며칠에 한 번’처럼 주기적으로 물을 주는 방식에 익숙할 수 있겠지만, 이제는 흙의 상태를 확인해 내 식물이 정말로 목마르다 말하고 있는지를 들어보세요. 흙이 너무 마르면 뿌리까지 말라버리고, 흙이 계속 축축하면 흙 속에 산소가 머무를 공간이 없어 뿌리가 썩어버리거든요.',
      keywords:'가이즈, 물주기, 물',
      path:'/guide/water'
    })
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
