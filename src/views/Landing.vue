<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ROUTE_TO } from "@/router/routing";
export default defineComponent({
  name: "Landing",
  setup() {
    ROUTE_TO.HOME();
    return {};
  },
});
</script>
