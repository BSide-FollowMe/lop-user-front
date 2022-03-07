<template>
  <GuideLayout :bannerImage="bannerImage" title="식물이 아플 때">
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
    
    console.log(bannerImage)
    console.log(typeof bannerImage)
    return {
      bannerImage,
    }
  }
})
</script>