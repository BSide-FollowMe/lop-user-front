<template>
  <div class="inner-container">
    <div class="main">
      <div class="top">
        <span class="title">질문 · 답변</span>
        <span v-if="questions.length" class="see-all-button" @click="moveToQuestionList">
          전체보기
          <img :src="ArrowForward" />
        </span>
      </div>
      <div v-if="questions.length" class="question">
        <div class="question-item" v-for="(question, index) in questions" :key="index" @click="moveToQuestionDetail(question.id)">
          <div class="text">
            <div class="question-content" v-html="preview(question.content)"></div>
            <div>
              <div class="question-sub">
                <span class="question-comments">댓글 {{ formatNumber(question.commentCount) }}</span>
                <span class="question-likes">도움돼요 {{ formatNumber(question.supportCount) }}</span>
              </div>
            </div>
          </div>
          <img v-show="question.imageUrl" class="question-img" :src="question.imageUrl" />
        </div>
        <div class="question-button" @click="moveToQuestionPost()">질문하기</div>
      </div>
      <div v-else class="no-question">
        <img class="question-box" :src="QuestionBox" />
        <div class="text">
          식물이 아프거나 키우기 어렵다면
          <br />
          다른 식집사 분들의 도움을 받아보세요
        </div>
        <div class="question-button" @click="moveToQuestionPost()">질문하기</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { formatNumber, preview } from '@/utils/text';
import ArrowForward from '@/assets/icon/arrow_forward.svg';
import QuestionBox from '@/assets/images/detail/질문하기.svg';
import { useRouter } from 'vue-router';
import { Question as QuestionModel } from '@/api/model/boardModel';

export default defineComponent({
  props: {
    plantName: {
      type: String,
      default: '',
    },
    questions: {
      type: Array as PropType<QuestionModel[]>,
      default: () => [],
    },
    plantId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const router = useRouter();
    const moveToQuestionDetail = (id: number) => {
      router.push(`/qna/detail/${id}`);
    };
    const moveToQuestionList = () => {
      router.push(`/qna?plantId=${props.plantId}`);
    };
    const moveToQuestionPost = () => {
      router.push(`/qna/edit?name=${props.plantName}`);
    };
    return {
      formatNumber,
      ArrowForward,
      QuestionBox,
      preview,
      moveToQuestionDetail,
      moveToQuestionList,
      moveToQuestionPost,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.inner-container {
  width: 100vw;
  margin-left: calc(-50vw + 50%);

  background-color: var(--secondary-green-color-3);
  padding: 100px 0 120px 0;
  margin-bottom: 0px !important;
  @include breakpoint-down-sm {
    padding: 60px 20px 100px 20px !important;
    margin-left: -20px;
    width: calc(100% + 40px);
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
    line-height: 38px;
    @include breakpoint-down-sm {
      font-size: 14px;
      width: 76px;
      height: 26px;
      line-height: 26px;
      padding: 3px 2px 3px 8px;
    }
    /* identical to box height, or 143% */

    letter-spacing: -0.01em;

    /* green/1 */

    color: var(--secondary-green-color-1);

    padding: 9px 13px 9px 18px;
  }
}

.question {
  width: 100%;
  .question-item {
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 40px 0;

    &:not(:first-of-type) {
      border-top: 1px solid var(--background-color-1);
    }

    .text {
      margin-right: 30px;
      @include breakpoint-down-sm {
        margin-right: 12px;
      }
      .question-content {
        height: 78px;
        font-weight: var(--font-weight-medium);
        font-size: 18px;
        line-height: 26px;
        word-break: break-all;
        @include textOverflow(2);
        @include breakpoint-down-sm {
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
        @include breakpoint-down-sm {
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
    .question-img {
      width: 140px;
      height: 140px;
      @include breakpoint-down-sm {
        width: 108px;
        height: 108px;
      }
    }
    @include breakpoint-down-sm {
      padding: 20px 0;
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
    @include breakpoint-down-sm {
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
