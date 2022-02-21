<template>
  <GuideLayout :bannerImage="`url(${bannerImage})`" title="통풍이 중요한 이유">
    <VentilationGuide/>
  </GuideLayout>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import GuideLayout from '../Index.vue';
import bannerImage from '@/assets/images/guide/bg-ventilationguide.png';
import VentilationGuide from './VentilationGuide.vue';
export default defineComponent({
  components:{
    GuideLayout,
    VentilationGuide,
  },
  setup(){
    return {
      bannerImage,
    }
  }
})
</script>