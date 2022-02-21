<template>
  <GuideLayout :bannerImage="`url(${bannerImage})`" title="식물이 좋아하는 물 주기 방법" :bookmarks="bookmarks">
    <Inspect :bookmarks="bookmarks"></Inspect>
    <div class="dot-divider"><img src="@/assets/dot-divider.svg" /></div>
    <Know-how :bookmarks="bookmarks"></Know-how>
  </GuideLayout>
</template>
<script lang="ts">
import Inspect from './Inspect.vue';
import KnowHow from './KnowHow.vue';
import { defineComponent } from 'vue';
import GuideLayout from '../Index.vue';
import bannerImage from '@/assets/images/guide/bg-waterguide.png';
const bookmarks = [
  {
    text: '흙마름 확인하기',
    contents: [
      {
        text: '겉흑 마름',
        id: 'dry-outter_soil',
      },
      {
        text: '속흙 마름',
        id: 'dry-inner_soil',
      },
    ],
  },
  {
    text: '물주기 노하우',
    contents: [
      {
        text: '식물이 좋아하는 물',
        id: 'water-type',
      },
      {
        text: '물 주는 방법',
        id: 'water-method',
      },
      {
        text: '물 주기 시간',
        id: 'water-period',
      },
      {
        text: '저면관수',
        id: 'water-bottom_watering',
      },
    ],
  },
];
export default defineComponent({
  components: {
    GuideLayout,
    Inspect,
    KnowHow,
  },
  setup() {
    return {
      bannerImage,
      bookmarks,
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
