<template>
  <div class="inner-container">
    <section class="title">내가 저장한 식물</section>
    <div v-if="plants.length > 0"></div>
    <Empty v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Empty from './Empty.vue';

export default defineComponent({
  props: {
    plants: {
      type: Array as PropType<
        {
          img: string;
          name: string;
        }[]
      >,
      default: () => [],
    },
  },
  components: { Empty },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.title{
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  letter-spacing: -0.0025em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
  margin-bottom:50px;
  @include breakpoint-down-sm{
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.01em;
    margin-bottom:40px;
  }

}

</style>
