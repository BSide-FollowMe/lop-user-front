<template>
  <div class="toggle-my-question" @click="() => onToggleEvent()">
    <input id="my-question" type="checkbox" v-model="localVal" :class="{ 'is-active': value }" class="cursor-pointer" />
    <label for="my-question">
      <img src="@/assets/icon/check-secondary.svg" />
      <span><slot></slot></span>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: ['value'],
  setup(props, { emit }) {
    const localVal = ref(props.value || false);

    function onToggleEvent() {
      localVal.value = !localVal.value;
      emit('toggle', localVal.value);
    }
    return { localVal, onToggleEvent };
  },
});
</script>
<style lang="scss" scoped>
.toggle-my-question {
  display: inline-block;
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
    color: var(--secondary-green-color-1);
    border: 1px solid var(--secondary-green-color-1);
  }
  &.is-active + label {
    color: var(--secondary-green-color-1);
    img {
      content: url('@/assets/icon/check-active.svg');
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
    vertical-align: middle;
    width: 16px;
  }
  span {
    margin-left: 6px;
  }
}
</style>
