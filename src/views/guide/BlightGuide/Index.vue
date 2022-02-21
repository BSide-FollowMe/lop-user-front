<template>
  <GuideLayout :bannerImage="`url(${bannerImage})`" title="통풍이 중요한 이유">
    <BlightGuide/>
  </GuideLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import GuideLayout from '../Index.vue';
import bannerImage from '@/assets/images/guide/bg-blightguide.png';
import BlightGuide from './BlightGuide.vue';
export default defineComponent({
  components:{
    GuideLayout,
    BlightGuide,
  },
  setup(){
    return {
      bannerImage,
    }
  }
})
</script>