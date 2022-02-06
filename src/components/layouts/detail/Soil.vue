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
      default:'토양은 배양토보다 마사토를 좀 더 많이 해서 4:6으로 하고, 흙이 콩알에 직접 안 닿도록 위에는 마사토를 꼼꼼하게 채워주세요.',
    }
  }
})
</script>

<style lang="scss" scoped>
.inner-container{
  >*{
    min-width:960px;
  }
}
.title {
  padding-bottom: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-bottom:20px;
  /* identical to box height */

  letter-spacing: -0.01em;

  /* text/1 */

  color: #444444;

  border-bottom: 1px solid #e5e5e5;
}

.content{
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/2 */

  color: #666666;
}
</style>