<template>
  <div class="inner-container">
    <div class="title">이런 부분은 더 신경 써주세요</div>
    <div class="main">
      <Card :imgSrc="VentilationIcon" title="통풍" :content="ventilation">
        <template v-slot:action>
          <GuideBox content="통풍이 왜 중요한가요?" />
        </template>
      </Card>
      <Card :imgSrc="ToxicityIcon" title="독성" :content="toxicity"></Card>
      <Card :imgSrc="BlightIcon" title="유의할 병충해" :content="blights.join(',')">
        <template v-slot:action>
          <GuideBox content="병충해는 어떻게 관리하나요?" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VentilationIcon from '@/assets/icon/통풍.svg';
import ToxicityIcon from '@/assets/icon/독성.svg';
import BlightIcon from '@/assets/icon/병충해.svg';
import Card from '@/components/cards/Card.vue';
import GuideBox from '@/components/detail/GuideBox.vue';

export default defineComponent({
  props: {
    ventilation: {
      type: String,
      default: '통풍이 잘되는 환경이 중요해요',
    },
    toxicity: {
      type: String,
      default: '독성이 있으니 어린아이나 반려동물이 있다면 섭취하지 않도록 조심해주세요',
    },
    blights: {
      type: Array as PropType<string[]>,
      default: () => ['깍지벌레', '응애'],
    },
  },
  components: {
    Card,
    GuideBox,
  },
  setup() {
    return {
      VentilationIcon,
      ToxicityIcon,
      BlightIcon,
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
  @include breakpoint-down-sm{
    font-size:18px;
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
  .card {
    &:first-child{
      margin:0 20px 20px 0;
    }
    width:470px;
    height:176px;
    @include breakpoint-down-sm{
      &:first-child{
        margin:0;
      }
      margin-right:0;
      margin-bottom:10px !important;
      width:100%;
      height:136px !important;
    }
  }
  
}
</style>
