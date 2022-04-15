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
    setMeta({
      title: "식물의언어",
      description: "식집사를 위한 식물 정보 플랫폼, 식물의언어를 찾아오세요",
      keywords: "식물의언어, 식물의 언어, 식물, plantslang",
      path: "",
    });
  },
  components: {
    LayoutController,
  },
});
</script>
