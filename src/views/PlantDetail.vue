<template>
  <div class="container">
    <Summary/>
    <Water />
    <Sunlight/>
    <TemperatureHumidity/>
    <Ventilation/>
    <Soil/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Summary from '@/components/layouts/detail/Summary.vue';
import Water from '@/components/layouts/detail/Water.vue';
import Sunlight from '@/components/layouts/detail/Sunlight.vue';
import TemperatureHumidity from '@/components/layouts/detail/TemperatureHumidity.vue';
import Ventilation from '@/components/layouts/detail/Ventilation.vue';
import Soil from '@/components/layouts/detail/Soil.vue';

import { onMounted, ref } from 'vue';
import { getPlant } from '@/api/admin';
import { PlantResponse } from '@/api/model/adminModel';
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
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/', '@/assets/fonts/pretendard/pretendard.css';
.container {
  margin-top: 83px;
  max-width: var(--content-container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding: var(--m-content-container-padding) var(--content-container-padding);
  *{
    margin-bottom:100px;
  }
}
</style>
