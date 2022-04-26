<template>
  <div v-if="ventilation || toxicity || translatedBlights" class="inner-container">
    <div class="title">이런 부분은 더 신경 써주세요</div>
    <div class="main">
      <Card v-if="ventilation" :imgSrc="VentilationIcon" title="통풍" :content="'통풍이 잘되는 환경이 중요해요'">
        <template v-slot:action>
          <GuideBox
            class="inner-guide"
            @click="emitOpenGuide({ componentName: 'Ventilation', modalTitle: '통풍이 왜 중요한가요?' })"
            content="통풍이 왜 중요한가요?"
          />
        </template>
      </Card>
      <Card
        v-if="toxicity"
        :imgSrc="ToxicityIcon"
        title="독성"
        content="독성이 있으니 어린아이나 반려동물이 있다면 섭취하지 않도록 조심해주세요"
      ></Card>
      <Card v-if="translatedBlights" :imgSrc="BlightIcon" title="유의할 병충해" :content="translatedBlights">
        <template v-slot:action>
          <GuideBox
            class="inner-guide"
            @click="emitOpenGuide({ componentName: 'Blight', modalTitle: '병충해는 어떻게 관리하나요?' })"
            content="병충해는 어떻게 관리하나요?"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import VentilationIcon from '@/assets/icon/통풍.svg';
import ToxicityIcon from '@/assets/icon/독성.svg';
import BlightIcon from '@/assets/icon/병충해.svg';
import Card from '@/components/cards/Card.vue';
import GuideBox from '@/components/detail/GuideBox.vue';
import { blight } from 'plant';
import { translate } from '@/utils/text';

export default defineComponent({
  props: {
    ventilation: {
      type: Boolean,
      default: false,
    },
    toxicity: {
      type: Boolean,
      default: false,
    },
    blights: {
      type: Array as PropType<blight[]>,
      default: () => [],
    },
  },
  components: {
    Card,
    GuideBox,
  },
  setup(props, { emit }) {
    const emitOpenGuide = ({ componentName, modalTitle }: { componentName: string; modalTitle: string }) => {
      emit('openGuide', { componentName, modalTitle });
    };
    const translatedBlights = computed(() =>
      props.blights
        .map((blight) => {
          return translate(
            [
              { value: 'SCALE_INSECT', label: '깍지벌레' },
              { value: 'APHID', label: '진딧물' },
              { value: 'WHITEFLY', label: '가루이' },
              { value: 'PIDER_MITE', label: '응애' },
              { value: 'BRADYSIA', label: '뿌리파리' },
              { value: 'THYSANOPTERA', label: '총채벌레' },
              { value: 'SNAIL', label: '달팽이' },
              { value: 'ROOT_ROT', label: '뿌리썩음병' },
              { value: 'POWDERY_MILDEW', label: '흰가루병' },
            ],
            blight,
          );
        })
        .join(','),
    );
    return {
      VentilationIcon,
      ToxicityIcon,
      BlightIcon,
      emitOpenGuide,
      translatedBlights,
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

.main {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  > .card {
    max-width: 50%;
    flex-grow: 1;
    height: 176px;
    &:last-child {
      max-width: calc(50% - 20px);
    }

    @include breakpoint-down-sm {
      max-width: 100% !important;
      height: 136px;
    }
  }
}
.inner-guide:hover {
  background: #e5e5e5;
  color: #969696;
  .arrow-icon {
    color: #969696;
  }
}
</style>
