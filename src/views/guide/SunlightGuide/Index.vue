<template>
  <GuideLayout :bannerImage="`url(${bannerImage})`" title="통풍이 중요한 이유">
    <SunlightGuide/>
  </GuideLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import GuideLayout from '../Index.vue';
import bannerImage from '@/assets/images/guide/bg-sunlightguide.png';
import SunlightGuide from './SunlightGuide.vue';
export default defineComponent({
  components:{
    GuideLayout,
    SunlightGuide,
  },
  setup(){
    return {
      bannerImage,
    }
  }
})
</script>