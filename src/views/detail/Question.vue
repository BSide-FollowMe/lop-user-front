<template>
  <div class="inner-container">
    <div class="main">
      <div class="top">
        <span class="title">질문 · 답변</span>
        <span v-if="questions.length" class="see-all-button">
          전체보기
          <img :src="ArrowForward" />
        </span>
      </div>
      <div v-if="questions.length" class="question">
        <div class="question-item" v-for="(question, index) in questions" :key="index">
          <div class="text">
            <div class="question-content">{{ preview(question.text) }}</div>
            <div>
              <div class="question-sub">
                <span class="question-comments">댓글 {{ formatNumber(question.comments) }}</span>
                <span class="question-likes">도움돼요 {{ formatNumber(question.likes) }}</span>
              </div>
            </div>
          </div>
          <img class="question-img" :src="question.fileUrl" />
        </div>
        <div class="question-button">질문하기</div>
      </div>
      <div v-else class="no-question">
        <img class="question-box" :src="QuestionBox" />
        <div class="text">
          식물이 아프거나 키우기 어렵다면
          <br />
          다른 식집사 분들의 도움을 받아보세요
        </div>
        <div class="question-button">질문하기</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { formatNumber } from '@/utils/text';
import ArrowForward from '@/assets/icon/arrow_forward.svg';
import QuestionBox from '@/assets/images/detail/질문하기.svg';

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
            'https://api-storage.cloud.toast.com/lop/static/cfebdc09-73ff-4978-8123-040725e687c5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220206T113438Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=13dc6ffb2a4546c9b1adf9bb20362cb7%2F20220206%2FKR1%2Fs3%2Faws4_request&X-Amz-Signature=d0802c605a9ff75a0cc99094368c5fefd976643335803a9f3a785b046fc73be0',
        },
        {
          text: '잎이 노랗게 변하는데 과습인지 물부족인지 모르겠어요. 물은 일주일에 한번씩 주고 있고 베란다에서 키우고 있어요! 혹시 아시는 분...?',
          comments: 1,
          likes: 1568,
          fileUrl:
            'https://api-storage.cloud.toast.com/lop/static/cfebdc09-73ff-4978-8123-040725e687c5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220206T113438Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=13dc6ffb2a4546c9b1adf9bb20362cb7%2F20220206%2FKR1%2Fs3%2Faws4_request&X-Amz-Signature=d0802c605a9ff75a0cc99094368c5fefd976643335803a9f3a785b046fc73be0',
        },
        {
          text: '이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해...',
          comments: 1,
          likes: 1568,
          fileUrl:
            'https://api-storage.cloud.toast.com/lop/static/cfebdc09-73ff-4978-8123-040725e687c5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220206T113438Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=13dc6ffb2a4546c9b1adf9bb20362cb7%2F20220206%2FKR1%2Fs3%2Faws4_request&X-Amz-Signature=d0802c605a9ff75a0cc99094368c5fefd976643335803a9f3a785b046fc73be0',
        },
      ],
    },
  },
  setup() {
    const preview = (content:string) =>{
      console.log(window.innerWidth)
      console.log( content.slice(0,184) + '...');

      if(window.innerWidth > 767 && content.length > 184){
        return content.slice(0,184) + '...'
      }
      if(window.innerWidth <= 767 && content.length > 62){
        return content.slice(0,62) + '...'
      }
      return content;
    }
    return {
      formatNumber,
      ArrowForward,
      QuestionBox,
      preview,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.inner-container {
  margin-left: calc(-50vw + 50%);
  width: 100vw;

  background-color: var(--secondary-green-color-3);
  padding: 100px 0 120px 0;
  margin-bottom: 0px !important;
  @include breakpoint-down-sm {
    padding: 60px 20px 100px 20px !important;
  }
  .main {
    margin-left: auto;
    margin-right: auto;
    max-width: 960px;
    @include breakpoint-down-sm {
      min-width: 320px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.top {
  position: relative;
  width: 100%;
  text-align: center;
  flex: none;
  @include breakpoint-down-sm {
    text-align: left;
  }
  .title {
    text-align: center;
    font-weight: var(--font-weight-bold);
    font-size: 32px;
    line-height: 38px;
    @include breakpoint-down-sm {
      font-size: 18px;
      line-height: 22px;
      letter-spacing: -0.01em;
    }
    letter-spacing: -0.0025em;

    /* deepgreen/1-main */

    color: var(--primary-color-1);
    margin-bottom: 40px;
  }

  .see-all-button {
    cursor: pointer;
    position: absolute;
    right: 0;
    width: 106px;
    height: 38px;

    /* white */

    background: #ffffff;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    font-weight: var(--font-weight-medium);
    font-size: 14px;
    line-height: 20px;
    @include breakpoint-down-sm{
      font-size: 14px;
      width:76px;
      height:26px;
      padding: 0 2px 0 8px;
    }
    /* identical to box height, or 143% */

    letter-spacing: -0.01em;

    /* green/1 */

    color: var(--secondary-green-color-1);

    padding: 0 13px 0 18px;
  }
}

.question {
  width:100%;
  .question-item {
    cursor: pointer;
    display: flex;
    padding: 40px 0;

    &:not(:first-of-type) {
      border-top: 1px solid var(--background-color-1);
    }

    .text {
      margin-right: 30px;
      @include breakpoint-down-sm{
        margin-right:12px;
      }
      .question-content {
        height: 78px;
        font-weight: var(--font-weight-medium);
        font-size: 18px;
        line-height: 26px;
        @include breakpoint-down-sm{
          height: 60px;
          font-size: 13px;
          line-height: 20px;
        }
        /* or 144% */

        letter-spacing: -0.01em;

        /* text/2 */

        color: var(--text-color-2);
      }
      .question-sub {
        padding-top: 44px;
        font-weight: var(--font-weight-medium);
        font-size: 16px;
        line-height: 18px;
        /* identical to box height, or 112% */

        letter-spacing: -0.01em;

        /* text/3 */

        color: var(--text-color-3);
        @include breakpoint-down-sm{
          padding-top: 30px;
          font-size: 12px;
          line-height: 18px;
        }
        .question-comments {
          padding-right: 10px;
          border-right: 1px solid #dddddd;
        }
        .question-likes {
          padding-left: 10px;
        }
      }
    }
    .question-img{
      width:140px;
      height:140px;
      @include breakpoint-down-sm{
        width:108px;
        height:108px;
      }
    }
  }
  .question-button {
    margin-top: 20px;
    cursor: pointer;
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    text-align: center;
    height: 56px;

    font-weight: var(--font-weight-medium);
    font-size: 18px;
    line-height: 56px;
    /* identical to box height, or 144% */

    text-align: center;
    letter-spacing: -0.01em;

    /* deepgreen/1-main */
    @include breakpoint-down-sm{
      height: 40px;
      font-size: 15px;
      line-height: 40px;
      letter-spacing: 0.02em;
    }

    color: var(--primary-color-1);
  }
}
.no-question {
  background-color: #ffffff;
  border-radius: 4px;
  width: 960px;
  height: 412px;

  margin-top: 60px;
  @include breakpoint-down-sm {
    margin-top: 40px;
  }
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 60px 333px 80px 334px;

  @include breakpoint-down-sm {
    > img {
      width: 60px;
      height: 60px;
    }
    width: 100%;
    height: 280px;
    padding: 43px 43px 60px 43px;
  }

  .text {
    padding: 20px 0 22px 0;
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    line-height: 28px;
    @include breakpoint-down-sm {
      font-size: 16px;
      line-height: 24px;
    }
    /* or 140% */

    text-align: center;
    letter-spacing: -0.01em;

    /* text/4 */

    color: var(--text-color-4);
  }

  .question-button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 140px;
    min-height: 40px;

    /* deepgreen/1-main */

    background: var(--primary-color-1);
    border-radius: 2px;

    font-weight: var(--font-weight-medium);
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.02em;

    color: #ffffff;
  }
}
</style>
