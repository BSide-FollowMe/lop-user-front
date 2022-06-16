<template>
  <div class="center-align-card">
    <div class="center-align-card__title"><slot name="title"></slot></div>
    <div class="center-align-card__content"><slot name="content"></slot></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'transparent',
    },
  },
  setup(props) {
    const backgroundColor = computed(() => props.color);
    return {
      backgroundColor,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.center-align-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: v-bind(backgroundColor);
  &__title {
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: -0.01em;

    /* text/1 */

    color: var(--text-color-1);
    font-weight: var(--font-weight-base);
    margin-bottom: 5px;

    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 17px;

      text-align: center;
      margin-bottom: 10px;
    }
  }
  &__content {
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: -0.01em;

    /* text/1 */

    color: var(--text-color-1);
    font-weight: var(--font-weight-base);
    margin-bottom: 5px;

    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 17px;

      text-align: center;
      margin-bottom: 10px;
    }
  }
}
</style>
