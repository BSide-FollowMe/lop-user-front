<template>
  <div class="inner-container">
    <div class="main">
      <div class="top">
        <span class="title">질문 · 답변</span>
        <span class="see-all-button">전체보기 <img :src="ArrowForward"/></span>
      </div>
      <div class="question">
        <div class="question-item" v-for="(question, index) in questions" :key="index">
          <div class="text">
            <div class="question-content">{{ question.text }}</div>
            <div>
              <div class="question-sub">
                <span class="question-comments">댓글 {{ formatNumber(question.comments) }}</span>
                <span class="question-likes">도움돼요 {{ formatNumber(question.likes) }}</span>
              </div>
            </div>
          </div>
          <img class="question-img" width="140" height="140" :src="question.fileUrl" />
          
        </div>
      </div>
      <div class="question-button">질문하기</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { formatNumber } from '@/utils/text';
import ArrowForward from '@/assets/icon/arrow_forward.svg';

export default defineComponent({
  props: {
    questions: {
      type: Array as PropType<{ text: string; comments: number; likes: number; fileUrl: string }[]>,
      default: () => [
        {
          text: '이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해...',
          comments: 1,
          likes: 1568,
          fileUrl:
            'https://api-storage.cloud.toast.com/lop/static/cfebdc09-73ff-4978-8123-040725e687c5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220203T172157Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=13dc6ffb2a4546c9b1adf9bb20362cb7%2F20220203%2FKR1%2Fs3%2Faws4_request&X-Amz-Signature=0f4d7c3d6427a4ba11e742c80414996924475ae6a459148fb75f60725f163c06',
        },
        {
          text: '잎이 노랗게 변하는데 과습인지 물부족인지 모르겠어요. 물은 일주일에 한번씩 주고 있고 베란다에서 키우고 있어요! 혹시 아시는 분...?',
          comments: 1,
          likes: 1568,
          fileUrl:
            'https://api-storage.cloud.toast.com/lop/static/cfebdc09-73ff-4978-8123-040725e687c5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220203T172157Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=13dc6ffb2a4546c9b1adf9bb20362cb7%2F20220203%2FKR1%2Fs3%2Faws4_request&X-Amz-Signature=0f4d7c3d6427a4ba11e742c80414996924475ae6a459148fb75f60725f163c06',
        },
        {
          text: '이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해...',
          comments: 1,
          likes: 1568,
          fileUrl:
            'https://api-storage.cloud.toast.com/lop/static/cfebdc09-73ff-4978-8123-040725e687c5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220203T172157Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=13dc6ffb2a4546c9b1adf9bb20362cb7%2F20220203%2FKR1%2Fs3%2Faws4_request&X-Amz-Signature=0f4d7c3d6427a4ba11e742c80414996924475ae6a459148fb75f60725f163c06',
        },
      ],
    },
  },
  setup() {
    return {
      formatNumber,
      ArrowForward,
    };
  },
});
</script>

<style lang="scss" scoped>
.inner-container {
  position: relative;
  left: -471.5px;
  min-width: 1920px;
  background-color: #f4f8f1;
  padding: 100px 0 120px 0;
  margin-bottom: 0px !important;
  .main{
    margin:0 480px;
    max-width:960px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  .top{
    position:relative;
    width:100%;
    text-align:center;
    flex:none;
  }
}

.title {
  text-align: center;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 38px;
  letter-spacing: -0.0025em;

  /* deepgreen/1-main */

  color: #365650;
  margin-bottom: 40px;
}

.see-all-button{
  cursor:pointer;
  position:absolute;
  right:0;
  width: 106px;
  height: 38px;

/* white */

  background: #FFFFFF;
  border-radius: 4px;
  display:inline-flex;
  align-items: center;
  justify-content: space-between;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: -0.01em;

  /* green/1 */

  color: #599270;

  padding: 0 13px 0 18px;
}


.question-item{
  cursor:pointer;
  display:flex;
  padding: 40px 0;
  &:not(:last-child){
    border-bottom: 1px solid #DDDDDD;
  }
  
  .text{
    width: 790px;
    margin-right:30px;
    .question-content{
      height: 78px;
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
    .question-sub{
      padding-top:44px;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 18px;
      /* identical to box height, or 112% */

      letter-spacing: -0.01em;

      /* text/3 */

      color: #969696;
      .question-comments{
        padding-right:10px;
        border-right: 1px solid #DDDDDD;
      }
      .question-likes{
        padding-left:10px;
      }
    }
  }
}

.question-button {
  margin-top:20px;
  cursor: pointer;
  width: 960px;
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  height: 56px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 56px;
  /* identical to box height, or 144% */

  text-align: center;
  letter-spacing: -0.01em;

  /* deepgreen/1-main */

  color: #365650;
}
</style>
