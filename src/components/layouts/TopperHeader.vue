<template>
  <div>Topper</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup(props, { emit }) {
    const onToggleDrawer = () => {
      emit('toggleDrawer');
    };
    return {
      onToggleDrawer,
    };
  },
});
</script>

<style></style>
