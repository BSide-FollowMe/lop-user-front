<template>
  <div class="inner-container">
    <div class="title">온도와 습도는 이렇게 맞추세요</div>
    <div class="temperature-humidity">
      <Card
        v-if="temperature!=null"
        :imgSrc="Temperature"
        title="적정온도"
        :content="`${temperature.split(',')[0]}℃ ~ ${temperature.split(',')[1]}℃`"
      ></Card>
      <Card v-if="winterTemperature!=null" :imgSrc="WinterTemperature" title="겨울철 온도" :content="`${winterTemperature}℃ ${translatedWinterTemperatureUpDown}`"></Card>
      <Card v-if="minHumidity!=null && maxHumidity!=null" :imgSrc="Humidity" title="습도" :content="`${minHumidity}% ~ ${maxHumidity}%`"></Card>
    </div>
    <p class="content" v-html="content" />
  </div>
</template>
<script lang="ts">
import { defineComponent,computed } from 'vue';
import Temperature from '@/assets/icon/적정온도.svg';
import WinterTemperature from '@/assets/icon/겨울철온도.svg';
import Humidity from '@/assets/icon/습도.svg';
import Card from '@/components/cards/Card.vue';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '온도 변화를 잘 견디는 편이에요. 건조한 공기를 더 좋아해요.',
    },
    temperature: {
      type: String,
      default: '15,25',
    },
    winterTemperature: {
      type: String,
      default: '',
    },
    minHumidity: {
      type: String,
      default: '',
    },
    maxHumidity: {
      type: String,
      default: '',
    },
    winterTemperatureUpDown: {
      type: String,
      default: '',
    },
  },
  components: {
    Card,
  },
  setup(props) {
    const translatedWinterTemperatureUpDown = computed(() => {
      return props.winterTemperatureUpDown === 'UP' ? '이상' : props.winterTemperatureUpDown === 'DOWN' ? '이하' : '';
    });
    return {
      Temperature,
      WinterTemperature,
      Humidity,
      translatedWinterTemperatureUpDown,
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
.temperature-humidity {
  display: flex;
  gap: 20px;
  > * {
    flex-grow: 0;
    flex-basis: 319px;
  }
  @include breakpoint-down-sm {
    flex-direction: column;
    > * {
      flex-grow:1;
      flex-basis:100%;
      height: 116px;
    }
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
</style>
