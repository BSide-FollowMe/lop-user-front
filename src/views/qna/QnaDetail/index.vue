<template>
  <div class="container">
    <div class="inner-container qna-detail">
      <section class="qna-detail__title">
        <h1>질문 · 답변</h1>
      </section>
      <section class="detail-form" v-if="details">
        <QuestionDetail :details="details" @onToggleSupport="toggleSupportBtn" @onRemove="removeBoard" />
      </section>
      <section class="reply-container">
        <hr class="separate-content" />
        <div class="reply-count">
          <span class="title">댓글</span>
          <span class="count">{{ ' ' + replyCount }}</span>
        </div>
        <ReplyRegisterInput
          :myId="myId"
          placeholder="답변을 남겨주세요"
          v-model:modelValue="replyInput"
          @submit="({ input }) => registerComment(input)"
        />
        <ul class="reply-list">
          <ReplyItemList
            v-if="details"
            :myId="myId"
            :comments="details.comments.data"
            :boardId="boardId"
            :boardWriterId="details.writer.id"
            @refresh="refresh"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { getQnaBoardDetail, removeQnaBoard, toggleSupportQuestions } from '@/api/qnaboard';
import ReplyItemList from '@/components/organisms/ReplyItemList/Index.vue';
import ReplyRegisterInput from '@/components/molecules/ReplyInput/ReplyRegisterInput.vue';
import QuestionDetail from '@/components/organisms/QuestionDetail/Index.vue';
import { registQnaBoardComment } from '@/api/qnaboard';
import { debounce } from '@/utils/global';
import { ROUTE_TO } from '@/router/routing';
import setMeta from '@/utils/setMeta';
import type { BoardResponse } from '@/types/api/board';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  head() {
    return { script: [{ src: '//developers.kakao.com/sdk/js/kakao.min.js' }] };
  },
  name: 'Question Detail',
  components: { ReplyItemList, QuestionDetail, ReplyRegisterInput },
  setup() {
    const store = useStore();
    const replyInput = ref('');
    const myId = computed(() => store.getters.getUserInfo?.id || null);
    const route = useRoute();
    const details = ref({ plantWaterCycle: '', plantLifeCycle: '', plantCountermeasure: '' } as BoardResponse);
    const replyCount = computed(() => {
      return details.value.comments.size;
    });
    const boardId = computed(() => route.path.split('/')[3] || '');
    const computedMeta = computed(() => ({
      title: `${details.value.plantName} : 질문·답변 - 식물의언어`,
      description: `${details.value.content}`,
      keywords: `질문, 답변, 질문답변, 질문 답변, ${details.value.plantName}`,
      path: `/qna/detail/${boardId.value}`,
    }));
    setMeta(computedMeta);
    onMounted(async () => {
      getDetails();
    });
    async function getDetails() {
      try {
        const id: string = boardId.value;
        details.value = await getQnaBoardDetail(id);
      } catch (e) {
        console.log(e);
      }
    }
    async function removeBoard() {
      try {
        const id: string = boardId.value;
        const res = await removeQnaBoard(id);
        console.log(res);
        ROUTE_TO.QNABOARD();
      } catch (e) {
        console.log(e);
      }
    }

    async function toggleSupportBtn() {
      try {
        await toggleSupportQuestions(boardId.value);
      } catch (e) {
        console.error(e);
      } finally {
        getDetails();
      }
    }
    async function registerComment(text: string, boardId: string) {
      try {
        if (!text.length) {
          alert('내용을 입력해주세요!');
          return;
        }
        const payload = {
          content: text,
        };
        await registQnaBoardComment(payload, boardId);
        refresh();
      } catch (e) {
        console.error(e);
      }
    }
    const refresh = () => {
      replyInput.value = '';
      getDetails();
    };
    return {
      replyInput,
      replyCount,
      myId,
      details,
      removeBoard,
      ROUTE_TO,
      boardId,
      refresh,
      toggleSupportBtn: debounce(toggleSupportBtn, 500),
      registerComment: debounce((input: string) => {
        registerComment(input, boardId.value);
      }, 500),
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.container {
  background-color: var(--background-color-5);
}
.inner-container {
  margin-left: auto;
  margin-right: auto;
  padding: 0px var(--content-container-padding);
  max-width: var(--content-container-max-width);
  overflow: visible;
  @include breakpoint-down-sm {
    padding: unset;
    min-width: var(--m-content-container-max-width);
  }
}
.qna-detail {
  padding-bottom: 120px;

  &__title {
    padding: 20px;
    text-align: center;
    h1 {
      display: block;
      margin-top: 60px;
      margin-bottom: 30px;
      color: var(--primary-color-1);
      @include breakpoint-down-sm {
        font-size: 18px;
        margin-top: 40px;
        margin-bottom: 22px;
      }
    }
  }
  @include breakpoint-down-sm {
    padding-bottom: 60px;
  }
}

.content-item {
  margin-top: 40px;
  font-size: 18px;
  line-height: 26px;
  word-break: break-all;
  @include breakpoint-down-sm {
    margin-top: 30px;
    font-size: 13px;
  }
}

.page-btn-group {
  text-align: center;

  button {
    cursor: pointer;
    margin: 0px 5px;
    padding: 25px 30px;
    width: 240px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid var(--background-color-1);
    background-color: transparent;

    span {
      float: left;
      color: var(--text-color-3);
      line-height: 50px;
      font-size: var(--font-size-p);
      font-weight: var(--font-weight-medium);
    }
    img {
      float: right;
      width: 50px;
      height: 50px;
    }
    &.active {
      border: 1px solid var(--secondary-green-color-1);
      background-color: var(--secondary-green-color-3);
      span {
        color: var(--secondary-green-color-1);
        font-weight: var(--font-weight-bold);
      }
      &.ask-help > img {
        content: url('@/assets/icon/ask-help-primary.svg');
      }
      &.ask-question > img {
        content: url('@/assets/icon/ask-question-primary.svg');
      }
    }
    @include breakpoint-down-sm {
      position: relative;
      width: 135px;
      height: 85px;
      padding: 10px;
      text-align: center;
      margin: 0px 0px 10px;
      &.ask-help {
        margin-right: 5px;
      }
      &.ask-question {
        margin-left: 5px;
      }
      span {
        position: relative;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        line-height: 17px;
        // word-break:keep-all;
      }
      img {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
      }
    }
  }
}
.input-title {
  color: var(--text-color-1);
  margin-top: 40px;
  font-size: 18px;
  line-height: 26px;
  @include breakpoint-down-sm {
    margin-top: 30px;
    font-size: 13px;
    line-height: 16px;
  }
}

.textarea-item {
  margin-top: 10px;
  position: relative;
  textarea {
    margin-top: 10px;
    display: block;
    padding: 12px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: fit-content;
    font-size: 18px;
    line-height: 26px;
    color: var(--text-color2);
    overflow: hidden;
    @include breakpoint-down-sm {
      height: auto;
      min-height: 40px;
      font-size: 13px;
    }
  }
}
.img-item {
  margin-top: 30px;
  text-align: center;
  img {
    max-width: 100%;
  }
}
.bottom-btn-group {
  margin-top: 80px;
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
  button {
    width: 180px;
    color: var(--text-color-2);
    font-size: 16px;
    line-height: 19px;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
    @include breakpoint-down-sm {
      img {
        width: 12px;
        height: 12px;
      }
      font-size: 12px;
    }
    &.helpful-btn-primary {
      color: var(--secondary-green-color-1);
    }
  }
  @include breakpoint-down-sm {
    margin-bottom: 0px;
  }
}
.detail-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .group {
    display: block;
    > * {
      vertical-align: middle;
    }
    .placeholder {
      font-size: 18px;
      line-height: 22px;
      color: var(--text-color-2);
    }
    .title {
      font-size: 20px;
      line-height: 20px;
      color: var(--primary-color-1);
      font-weight: var(--font-weight-bold);
    }
    &:nth-child(2) {
      font-size: 16px;
      line-height: 19px;
      color: var(--text-color-3);
    }
  }
  img {
    vertical-align: middle;
  }
  .separator {
    margin-left: 10px;
    margin-right: 10px;
  }
  @include breakpoint-down-sm {
    flex-wrap: wrap;
    gap: 10px;
    .group {
      width: 100%;
      .placeholder {
        font-size: 14px;
        line-height: 17px;
      }
      .title {
        font-size: 16px;
      }
      &:nth-child(2) {
        font-size: 12px;
      }
      .link-button {
        height: 20px;
        font-size: 12px;
        line-height: 16px;
        padding: 2px 12px 2px 9px;
        vertical-align: middle;
        .arrow-icon {
          margin-left: 6.33px;

          width: 5.35px;
          height: 8.56px;
        }
      }
    }
  }
}
.action-modal-btn {
  position: relative;
  .action-list {
    position: absolute;
    animation-duration: 0.3s;
    background: #ffffff;
    width: 172px;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    right: 0px;
    z-index: 1;
    li {
      text-align: left;
      list-style-type: none;
      height: 48px;
      padding: 0px 15px;
      font-size: 16px;
      line-height: 48px;
      img {
        margin-right: 20px;
        width: 24px;
        height: 24px;
      }
      @include breakpoint-down-sm {
        font-size: 14px;
        img {
          margin-right: 4px;
          width: 12px;
          height: 12px;
          fill: var(--text-color-2);
        }
      }
    }
    li:not(.selected):hover {
      background: #f4f8f1;
    }
    hr {
      margin: 0px 10px;
      border: none;
      border-bottom: 1px solid var(--background-color-5);
    }
    span {
      color: var(--text-color-3);
    }
  }
  @include breakpoint-down-sm {
    float: right;
    vertical-align: top;
    > img {
      width: 20px;
      height: 20px;
    }
  }
}

.helpful-btn {
  img {
    width: 20px;
    height: 20px;
  }
}
.helpful-btn:hover {
  text-decoration: underline;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.separate-content {
  border: none;
  border-bottom: 1px solid #e5e5e5;
}
.separator {
  color: var(--background-color-1);
}
.share-button {
  position: relative;
}
.context-menu {
  position: absolute;
  bottom: -110px;
  text-align: left;
  width: 172px;
  // height: 96px;
  @include breakpoint-down-sm {
    right: 0px;
  }
}
.reply-container {
  background-color: #fff;
  border-radius: 4px;
  padding: 0px 60px 60px;
  color: var(--text-color-2);

  @include breakpoint-down-sm {
    margin-left: 20px;
    margin-right: 20px;
    padding: 0 var(--m-content-container-padding);
  }
  .content-item {
    margin-top: 40px;
    font-size: 18px;
    line-height: 26px;
    @include breakpoint-down-sm {
      font-size: 16px;
    }
  }
}
.separate-content {
  border: none;
  border-bottom: 1px solid #e5e5e5;
  margin: 0px;
}
.reply-count {
  margin-top: 40px;
  font-size: 20px;
  line-height: 20px;
  font-weight: var(--font-weight-bold);
  .title {
    color: var(--text-color-1);
  }
  .count {
    color: var(--secondary-green-color-1);
  }
  @include breakpoint-down-sm {
    margin-top: 20px;
    font-size: 16px;
  }
}

.detail-form {
  background-color: #fff;
  border-radius: 4px;
  padding: 60px 60px 20.5px 60px;
  color: var(--text-color-2);

  @include breakpoint-down-sm {
    margin-left: 20px;
    margin-right: 20px;
    padding: 21px var(--m-content-container-padding);
  }
}

.reply-list {
  margin-top: 10px;
}
</style>
