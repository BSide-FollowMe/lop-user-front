<template>
  <div class="list-item">
    <div class="column date">{{ item.date }}</div>
    <div class="column action">{{ item.action }}</div>
    <div :class="{ column: true, value: true, minus: item.value < 0 }">
      {{ item.value > 0 ? '+' : '-' }} {{ Math.abs(item.value) }}
      <img src="@/assets/icon/씨앗.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<{ date: string; action: string; value: number }>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.list-item {
  display: flex;
  width: 100%;
  height: 67px;
  padding: 21px 20px 20px 20px;
  gap: 20px;
  @include breakpoint-down-sm {
    height: 46px;
    padding: 10px 0;
  }
}

.column {
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;
  @include breakpoint-down-sm {
    font-size: 14px;
  }
  &.date {
    flex-basis: 160px;
    flex-shrink: 1;
    line-height: 26px;
    vertical-align: middle;
    font-weight: var(--font-weight-light);
    color: var(--text-color-3);
  }
  &.action {
    flex-basis: 520px;
    flex-shrink: 1;
    line-height: 26px;
    vertical-align: middle;
    font-weight: var(--font-weight-base);
    color: var(--text-color-1);
  }
  &.value {
    flex-basis: 160px;
    flex-shrink: 1;
    line-height: 26px;
    vertical-align: middle;
    font-weight: var(--font-weight-bold);
    font-size: 20px;
    text-align: right;
    letter-spacing: -0.01em;
    color: var(--secondary-green-color-2);
    &.minus {
      color: var(--secondray-color-3);
    }
    > img {
      margin-left: 4px;
      @include breakpoint-down-sm {
        width: 10px;
        height: 12px;
      }
    }
    @include breakpoint-down-sm {
      font-size: 16px;
    }
  }
}
</style>
