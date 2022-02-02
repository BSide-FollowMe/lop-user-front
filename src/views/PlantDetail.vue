<template>
  <div class="container">
    <Summary class="summary" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Summary from '@/components/layouts/detail/Summary.vue';
import { onMounted, ref } from 'vue';
import { getPlant } from '@/api/admin';
import { PlantResponse } from '@/api/model/adminModel';
export default defineComponent({
  setup() {
    // not implemented yet
  },
  components: {
    Summary,
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
}
</style>
