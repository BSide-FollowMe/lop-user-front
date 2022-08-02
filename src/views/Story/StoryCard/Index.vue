<template>
  <div class="inner-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="scss" scoped>
.inner-container {
  background: #ffffff;
  /* list-shadow */
  padding: 35px 60.5px 60px 60.5px;

  box-shadow: 2px 2px 15px 3px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
</style>
