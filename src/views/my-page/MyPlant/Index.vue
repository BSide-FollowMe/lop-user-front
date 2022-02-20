<template>
  <div class="inner-container">
    <section class="title">내가 저장한 식물</section>
    <List v-if="plants.length > 0" :plants="plants" />
    <Empty v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Empty from './Empty.vue';
import List from './List.vue';

export default defineComponent({
  props: {
    plants: {
      type: Array as PropType<
        {
          imgUrl: string;
          name: string;
          like: boolean;
        }[]
      >,
      default: () => [{
        imgUrl:'',
        name:'1',
        like:true
      },{
        imgUrl:'',
        name:'2',
        like:true
      },{
        imgUrl:'',
        name:'3',
        like:true
      },{
        imgUrl:'',
        name:'4',
        like:true
      },{
        imgUrl:'',
        name:'5',
        like:true
      },{
        imgUrl:'',
        name:'6',
        like:true
      },{
        imgUrl:'',
        name:'7',
        like:true
      },{
        imgUrl:'',
        name:'8',
        like:true
      },{
        imgUrl:'',
        name:'9',
        like:true
      },{
        imgUrl:'',
        name:'10',
        like:true
      },{
        imgUrl:'',
        name:'11',
        like:true
      }],
    },
  },
  components: { Empty, List },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.title {
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  letter-spacing: -0.0025em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
  margin-bottom: 50px;
  @include breakpoint-down-sm {
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.01em;
    margin-bottom: 40px;
  }
}
</style>
