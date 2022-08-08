<template>
  <div class="tag">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 12px;
  height: 28px;

  /* bg,line/1 */

  border: 1px solid #dddddd;
  border-radius: 50px;
}
</style>
