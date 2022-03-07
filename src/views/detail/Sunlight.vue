<template>
  <div class="inner-container">
    <div class="title">이런 장소를 좋아해요</div>
    <span class="sunlight-type" v-for="(sunlightType, index) in translatedSunlightTypes" :key="index">{{ sunlightType }}</span>
    <p class="content" v-html="content" />
    <GuideBox
      @click="
        emitOpenGuide({
          componentName: 'Sunlight',
          modalTitle: '양지와 음지를 어떻게 구분하나요?',
        })
      "
      class="guide"
      content="양지와 음지는 어떻게 구분하나요?"
      hover-color="#C9704C"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import GuideBox from '@/components/detail/GuideBox.vue';
import { sunlightType } from 'plant';
import { translate } from '@/utils/text';

export default defineComponent({
  props: {
    sunlightTypes: {
      type: Array as PropType<sunlightType[]>,
      default: () => [],
    },
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
    const translatedSunlightTypes = computed(() =>
      props.sunlightTypes.map((sunlightType) => {
        return translate(
          [
            { value: 'DIRECT_SUN', label: '직사광선' },
            { value: 'SUN', label: '양지' },
            { value: 'HALF_SUN', label: '반양지' },
            { value: 'HALF_SHADE', label: '반음지' },
            { value: 'SHADE', label: '음지' },
          ],
          sunlightType,
        );
      }),
    );
    return {
      emitOpenGuide,
      translatedSunlightTypes,
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
  line-height: 29px;
  margin-bottom: 20px;
  @include breakpoint-down-sm {
    font-size: 18px;
    padding-bottom: 10px;
  }
  /* identical to box height */

  letter-spacing: -0.01em;

  /* text/1 */

  color: var(--text-color-1);

  border-bottom: 1px solid #e5e5e5;
}
.sunlight-type {
  font-weight: var(--font-weight-medium);
  font-size: 15px;
  line-height: 20px;
  /* identical to box height, or 133% */

  letter-spacing: -0.01em;

  /* text/2 */

  color: var(--text-color-2);
  padding: 2px 8px;
  margin-right: 10px;
  background: #e5f4eb;
  border-radius: 2px;
  @include breakpoint-down-sm {
    font-size: 15px;
    line-height: 20px;
  }
}
.content {
  margin: 20px 0 36px 0;
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  line-height: 26px;
  @include breakpoint-down-sm {
    font-size: 16px;
  }
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/2 */

  color: var(--text-color-2);
}

.guide {
  width: 470px;
  @include breakpoint-down-sm {
    width: 100%;
  }
}
</style>
