<template>
  <div class="inner-container">
    <div class="title">물은 이렇게 주세요</div>
    <p class="content" v-html="content"></p>
    <div class="guide">
      <span class="guide-box">흙이 마른 건 이렇게 알 수 있어요<div class="arrow-icon"/></span>
      <span class="guide-box">물을 잘 주는 TIP<div class="arrow-icon"/></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    content: {
      type: String,
      default: '겉 흑의 표면이 마르면 2일 정도 기다린 후 물주세요.<br/> 겨울철에는 공기중의 습도를 유지해주는 정도로 분무해주세요.',
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
  /* identical to box height */

  letter-spacing: -0.01em;

  /* text/1 */

  color: #444444;

  border-bottom: 1px solid #E5E5E5;
}
.content{
  margin: 20px 0 40px 0;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* or 144% */

  letter-spacing: -0.01em;

  /* text/2 */

  color: #666666;
}
.guide {
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
      color: #48B57A;
      .arrow-icon{
        background-color: #48B57A;
      }
    }
  }

}

</style>
