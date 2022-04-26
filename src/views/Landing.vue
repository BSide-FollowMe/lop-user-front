<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { REPLACE_TO } from '@/router/routing';
export default defineComponent({
  name: 'Landing',
  setup() {
    REPLACE_TO.HOME();
    return {};
  },
});
</script>
