<template>
  <div class="container">
    <Summary />
    <Water />
    <Sunlight />
    <TemperatureHumidity />
    <Ventilation />
    <Soil />
    <Report />
    <Question />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Summary from '@/views/detail/Summary.vue';
import Water from '@/views/detail//Water.vue';
import Sunlight from '@/views/detail//Sunlight.vue';
import TemperatureHumidity from '@/views/detail//TemperatureHumidity.vue';
import Ventilation from '@/views/detail//Ventilation.vue';
import Soil from '@/views/detail//Soil.vue';
import Report from '@/views/detail//Report.vue';
import Question from '@/views/detail//Question.vue';

export default defineComponent({
  setup() {
    // not implemented yet
  },
  components: {
    Summary,
    Water,
    Sunlight,
    TemperatureHumidity,
    Ventilation,
    Soil,
    Report,
    Question,
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/';
.container {
  margin-top: 83px;
  min-width: var(--content-container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding: var(--m-content-container-padding) var(--content-container-padding) 0 var(--content-container-padding);
  @include breakpoint-down-sm{
    margin-top:0;
    padding: 0 var(--m-content-container-padding);
    min-width: var(--m-content-container-max-width);
  }
  > * {
    margin-bottom: 100px;
    @include breakpoint-down-sm {
      margin-bottom: 80px;
      padding: 0;
    }
  }
}
</style>
