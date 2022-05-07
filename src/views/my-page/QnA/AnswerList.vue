<template>
  <div>
    <div class="item" v-for="answer in items" :key="answer.id" @click="moveToAnswer(answer.questionId, answer.id)">
      <div>
        <span class="plantName">{{ answer.plantName }}</span>
        <span class="questionContent">{{ answer.questionContent }}</span>
        <div class="content" v-html="preview(answer.commentContent)"></div>
        <section class="bottom">
          <div class="createdDateTime">
            {{ getTimeDistanceWithNaturalStr(answer.createdDateTime) }}
          </div>
          <div class="supportCount">도움돼요{{ answer.supportCount }}</div>
        </section>
      </div>
    </div>
    <div v-if="isEnd" class="is-end" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType, computed } from 'vue';
import { Answer } from '@/api/model/memberModel';
import { debounce } from 'lodash';
import { handleInfiniteListScroll } from '@/utils/global';
import { useRouter } from 'vue-router';
import { getTimeDistanceWithNaturalStr, preview } from '@/utils/text';
import setMeta from '@/utils/setMeta';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Answer[]>,
      default: () => [],
    },
    totalElement: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    setMeta({
      title: '나의 질문 답변 - 식물의언어',
      description: '내가 작성한 질문 답변 리스트입니다.',
      path: '/me/qna?list=answers',
    });
    const router = useRouter();
    const isEnd = computed(() => {
      return props.items.length >= props.totalElement;
    });
    const onScroll = debounce(($event: Event) => {
      handleInfiniteListScroll($event, props.items, props.totalElement, () => emit('atBottom'));
    }, 500);
    document.addEventListener('scroll', onScroll);
    onUnmounted(() => {
      document.removeEventListener('scroll', onScroll);
    });
    const moveToAnswer = (questionId: number, answerId: number) => {
      router.push({
        path: `/qna/detail/${questionId}`,
        hash: `#${answerId}`,
      });
    };
    return {
      preview,
      moveToAnswer,
      getTimeDistanceWithNaturalStr,
      isEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.item {
  padding: 20px 0 20px 0;
  cursor: pointer;

  border-bottom: 1px solid #f3f3f3;
}
.plantName {
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/3 */

  color: var(--text-color-3);
  margin-right: 5px;
  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 18px;
  }
  &:before {
    content: '[';
  }
  &:after {
    content: ']';
  }
}
.questionContent {
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/3 */

  color: var(--text-color-3);
  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 18px;
  }
}
.content {
  font-weight: var(--font-weight-normal);
  font-size: 18px;
  line-height: 26px;
  /* or 144% */

  letter-spacing: -0.015em;

  /* text/1 */

  color: var(--text-color-1);
  margin: 10px 0 30px 0;
  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.01em;
    margin: 4px 0 18px 0;
  }
}
.bottom div {
  display: inline-block;
  font-weight: var(--font-weight-medium);
  font-size: 16px;
  line-height: 18px;
  /* identical to box height, or 112% */

  letter-spacing: -0.01em;

  /* text/3 */

  color: var(--text-color-3);

  padding: 0 10px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
  &:not(:last-child) {
    border-right: 1px solid #dddddd;
  }
  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 18px;
    padding: 0 6px;
  }
}
.is-end {
  width: 100%;
  height: 120px;
}
</style>
