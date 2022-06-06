<template>
  <metainfo />
  <LayoutController />
</template>
<script lang="ts">
import setMeta from '@/utils/setMeta';
import { defineComponent } from 'vue';
import LayoutController from '@/components/layouts/LayoutController.vue';
import useValidateToken from '@/hooks/useValidateToken';
export default defineComponent({
  setup() {
    useValidateToken();
    setMeta({});
  },
  components: {
    LayoutController,
  },
});
</script>
