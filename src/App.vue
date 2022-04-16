<template>
  <metainfo />
  <LayoutController />
</template>
<script lang="ts">
import setMeta from "@/utils/setMeta";
import { defineComponent } from "vue";
import LayoutController from "@/components/layouts/LayoutController.vue";
export default defineComponent({
  setup() {
    setMeta({});
  },
  components: {
    LayoutController,
  },
});
</script>
