<template>
  <div class="inner-container">
    <div class="title">이런 장소를 좋아해요</div>
    <span class="sunlight-type" v-for="(sunlightType, index) in sunlightTypes" :key="index">{{ sunlightType }}</span>
    <p class="content" v-html="content"/>
    <div class="guide">
      <span class="guide-box">
        양지와 음지는 어떻게 구분하나요?
        <div class="arrow-icon" />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    sunlightTypes: {
      type: Array as PropType<string[]>,
      default: () => ['양지', '반양지'],
    },
    content: {
      type: String,
      default: '밝은 빛을 좋아해요. 어두운 환경에서는 느리게 자랄 수 있으니 창가 햇빛 드는 곳에서 키워주세요.',
    },
  },
});
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
.sunlight-type {
  padding: 2px 8px;
  margin-right: 10px;
  background: #e5f4eb;
  border-radius: 2px;
}
.content{
  margin:20px 0 36px 0;
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

.guide {
  min-width:960px;
  .guide-box{
    cursor:pointer;
    &:first-child{
      margin-right:20px;
    }
    display:inline-block;
    width: 470px;
    height: 56px;
    background: #F8F8F8;
    border-radius: 4px;
    padding: 15px 24.59px 15px 15px;
    .arrow-icon{
      display:inline-block;
      float:right;
      -webkit-mask-image: url("@/assets/icon/simple-arrow-right.svg");
      mask-image: url("@/assets/icon/simple-arrow-right.svg");
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      mask-position:center center;
      width: 20px;
      height: 18.35px;
      background-color: #365650;
    }
    &:hover{
      color: #C9704C;
      .arrow-icon{
        background-color: #C9704C;
      }
    }
  }

}

</style>
