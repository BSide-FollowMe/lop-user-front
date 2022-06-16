<template>
  <div class="list-item">
    <div class="column-date"></div>
    <div class="column-action"></div>
    <div class="column-value"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    date: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.list-item {
  display: flex;
  width: 100%;
  height: 67px;
  padding: 21px 0 20px 20px;
  @include breakpoint-down-sm {
    height: 46px;
  }
}

.column {
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;
  &-date {
    font-weight: var(--font-weight-light);
    color: var(--text-color-3);
  }
  &-action {
    font-weight: var(--font-weight-base);
    color: var(--text-color-1);
  }
  &-value {
  }
}
</style>
