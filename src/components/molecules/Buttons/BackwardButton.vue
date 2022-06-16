<template>
  <button class="backward-button" @click="goBackward">
    <img src="@/assets/icon/arrow-left.svg" />
    <span class="backward-button__text">이전으로</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const goBackward = () => {
      router.back();
    };
    return {
      goBackward,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.backward-button {
  cursor: pointer;
  background: #ffffff;
  width: 96px;
  height: 32px;
  border: 1px solid #dddddd;
  border-radius: 2px;
  display: flex;
  gap: 6px;
  padding: 6px 13px;
  align-items: center;
  &__text {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: var(--text-color-2);
    @include breakpoint-down-sm {
      display: none;
    }
  }
  @include breakpoint-down-sm {
    width: 42px;
    height: 28px;
  }
}
</style>
