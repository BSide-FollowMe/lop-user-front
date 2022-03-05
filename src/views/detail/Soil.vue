<template>
  <div class="inner-container">
    <div class="title">이런 흙을 좋아해요</div>
    <p class="content" v-html="content"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props:{
    content:{
      type:String,
      default:'',
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/';
.title {
  padding-bottom: 14px;
  font-weight: var(--font-weight-bold);
  font-size: 24px;
  line-height: 29px;
  margin-bottom:20px;
  @include breakpoint-down-sm{
    font-size:18px;
    padding-bottom: 10px;
  }
  /* identical to box height */

  letter-spacing: -0.01em;

  /* text/1 */

  color: var(--text-color-1);

  border-bottom: 1px solid #e5e5e5;
}

.content{
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  line-height: 26px;
  @include breakpoint-down-sm{
    font-size: 16px;
    line-height: 26px;
  }
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/2 */

  color: var(--text-color-2);
}
</style>