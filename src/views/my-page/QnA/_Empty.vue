<template>
  <div class="inner-container">
    <img src="@/assets/icon/question_bubble.svg" />
    <div class="content">{{ option.content }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'questions' | 'answers'>,
      default: 'questions',
    },
  },
  setup(props) {
    const option = computed(
      () =>
        ({
          questions: {
            content: '아직 등록된 질문이 없어요',
          },
          answers: {
            content: '아직 등록된 답변이 없어요',
          },
        }[props.type]),
    );
    return {
      option,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles';
.inner-container {
  min-height: 583px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 44px;
  @include breakpoint-down-sm {
    min-height: 340px;
    gap: 18px;
    img {
      width: 43px;
      height: 36px;
    }
  }
}
.content {
  font-weight: var(--font-weight-medium);
  font-size: 24px;
  line-height: 34px;
  /* identical to box height, or 142% */

  letter-spacing: -0.01em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
  @include breakpoint-down-sm {
    font-size: 16px;
    line-height: 26px;
  }
}
</style>
