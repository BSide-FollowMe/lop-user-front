<template>
  <div class="toggle-my-question">
    <input id="my-question" type="checkbox" v-model="value" :class="{ 'is-active': value }" class="cursor-pointer" />
    <label for="my-question">
      <img src="@/assets/icon/check.png" />
      <span>내 질문 보기</span>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(false);
    return { value };
  },
});
</script>
<style lang="scss" scoped>
.toggle-my-question {
    display:inline-block;
  position: relative;
}
input[type='checkbox'] {
  width: 130px;
  height: 37px;
  background: transparent;
  border: 1px solid var(--background-color);
  -webkit-appearance: none;
  -webkit-border-radius: 4px;
  &.is-active {
    color: #599270;
    border: 1px solid #599270;
  }
  &.is-active + label {
    color: #599270;
    img {
      content: url('@/assets/icon/check-active.png');
    }
  }
}

label {
  pointer-events: none;
  font-size: var(--font-size-p-2);
  line-height: 19px;
  color: var(--text-color-3);
  position: absolute;
  top: 12px;
  left: 18px;
  word-break: keep-all;
  img {
    vertical-align: text-top;
  }
  span {
    margin-left: 6px;
  }
}
</style>
