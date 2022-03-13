<template>
  <div class="inner-container">
    <div class="title">물은 이렇게 주세요</div>
    <p class="content" v-html="content"></p>
    <div class="guide">
      <GuideBox
        @click="emitOpenGuide({ componentName: 'WaterInspect', modalTitle: '흙이 마른 건 이렇게 알 수 있어요' })"
        content="흙이 마른 건 이렇게 알 수 있어요"
        hover-color="#48B57A"
      />
      <GuideBox
        @click="
          emitOpenGuide({
            componentName: 'WaterKnowHow',
            modalTitle: '물을 잘 주려면 이렇게 하세요',
          })
        "
        content="물을 잘 주는 TIP"
        hover-color="#48B57A"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GuideBox from '@/components/detail/GuideBox.vue';
export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  components: {
    GuideBox,
  },
  setup(props, { emit }) {
    const emitOpenGuide = ({ componentName, modalTitle }: { componentName: string; modalTitle: string }) => {
      emit('openGuide', { componentName, modalTitle });
    };
    return {
      emitOpenGuide,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.title {
  padding-bottom: 14px;
  font-weight: var(--font-weight-bold);
  font-size: 24px;
  @include breakpoint-down-sm {
    font-size: 18px;
    padding-bottom: 10px;
  }
  line-height: 29px;
  /* identical to box height */

  letter-spacing: -0.01em;

  /* text/1 */

  color: var(--text-color-1);

  border-bottom: 1px solid #e5e5e5;
}
.content {
  margin: 20px 0 40px 0;
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  line-height: 26px;
  /* or 144% */

  letter-spacing: -0.01em;

  /* text/2 */

  color: var(--text-color-2);

  @include breakpoint-down-sm {
    font-size: 16px;
    margin: 14px 0 20px 0;
  }
}
.guide {
  > * {
    width: 100%;
    &:first-child {
      margin-right: 20px;
    }
  }
  display: flex;
  justify-content: space-between;
  @include breakpoint-down-sm {
    display: block;

    > * {
      &:first-child {
        margin: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
