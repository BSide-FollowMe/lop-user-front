<template>
  <div>
    <div class="item" v-for="question in items" :key="question.id" @click="ROUTE_TO.QNABOARD_DETAIL(question.id)">
      <div>
        <div class="plantName">{{ question.plantName }}</div>
        <div class="content">{{ preview(question.content) }}</div>
        <section class="bottom">
          <div class="createdDateTime">{{ formatDate(question.createdDateTime) }}</div>
          <div class="commentCount">답변{{ question.commentCount }}</div>
          <div class="supportCount">도움돼요{{ question.supportCount }}</div>
        </section>
      </div>
      <img v-if="question.imageUrl" class="plantImage" :src="question.imageUrl" />
    </div>
    <div v-if="isEnd" class="is-end" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType, computed } from 'vue';
import { Question } from '@/api/model/memberModel';
import { debounce } from 'lodash';
import { handleInfiniteListScroll } from '@/utils/global';
import { useRouter } from 'vue-router';
import setMeta from '@/utils/setMeta';
import { ROUTE_TO } from '@/router/routing';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Question[]>,
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
      path: '/me/qna?list=questions',
    });
    const router = useRouter();
    const preview = (content: string) => {
      if (window.innerWidth > 767 && content.length > 184) {
        return content.slice(0, 102) + '...';
      }
      if (window.innerWidth <= 767 && content.length > 62) {
        return content.slice(0, 43) + '...';
      }
      return content;
    };
    const isEnd = computed(() => {
      return props.items.length >= props.totalElement;
    });
    const formatDate = (date: string) => {
      const d = new Date(date);
      return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')}`;
    };
    const onScroll = debounce(($event: Event) => {
      handleInfiniteListScroll($event, props.items, props.totalElement, () => emit('atBottom'));
    }, 500);
    document.addEventListener('scroll', onScroll);
    onUnmounted(() => {
      document.removeEventListener('scroll', onScroll);
    });

    return {
      preview,
      formatDate,
      ROUTE_TO,
      isEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.item {
  cursor: pointer;
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 10px;
  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 4px;
  }
}
.content {
  font-weight: var(--font-weight-normal);
  font-size: 18px;
  line-height: 26px;
  /* or 144% */

  letter-spacing: -0.01em;

  /* text/1 */

  color: var(--text-color-1);
  margin-bottom: 30px;
  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 18px;
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

.plantImage {
  display: inline-block;
  align-self: center;
  width: 140px;
  height: 140px;
  margin-left: 30px;
  vertical-align: middle;
  @include breakpoint-down-sm {
    width: 76px;
    height: 76px;
    margin-left: 10px;
  }
}

.is-end {
  width: 100%;
  height: 120px;
}
</style>
