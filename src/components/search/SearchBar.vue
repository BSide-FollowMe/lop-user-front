<template>
  <input id="searchText" type="text" v-model="searchText" :class="{ 'is-empty': searchText === '' }" @keyup.enter="emitSubmit" />
  <label for="searchText">{{ placeholder.content }}</label>
  <button @click="emitSubmit"></button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
    },
    placeholder: {
      type: Object as PropType<{ content: string; size: { pc: string; mobile: string } }>,
      default: () => ({ content: '식물의 이름 또는 궁금하신 점을 입력해주세요.', size: { pc: '25px', mobile: '16px' } }),
    },
  },
  setup(props, { emit }) {
    const searchText = computed({
      // Use computed to wrap the object
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    function emitSubmit() {
      emit('submit');
    }
    const searchTextPcSize = computed(() => props.placeholder.size.pc);
    const searchTextMobileSize = computed(() => props.placeholder.size.mobile);
    return {
      emitSubmit,
      searchText,
      searchTextPcSize,
      searchTextMobileSize,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
button {
  content: '';
  position: absolute;
  height: 50px;
  width: 50px;
  background-image: url('@/assets/icon/magnifier.svg');
  background-size: 100%;
  cursor: pointer;
  z-index: 2;
  border: none;
  background-color: transparent;
  transform: translateX(-100%);

  @include breakpoint-down-sm {
    width: 36px;
    height: 36px;
  }
}

input {
  position: relative;
  height: 40px;
  z-index: 1;
  border: 0;
  padding: 0;
  outline: 0;
  background-color: transparent;
  font-size: v-bind(searchTextPcSize);
  line-height: 35px;
  width: 100%;

  &:focus + label {
    display: none;
  }
  &:not(.is-empty) + label {
    display: none;
  }

  @include breakpoint-down-sm {
    height: 26px;
    font-size: v-bind(searchTextMobileSize);
  }
}

label {
  pointer-events: none;
  font-size: v-bind(searchTextPcSize);
  line-height: 35px;
  color: var(--background-color-1);
  position: absolute;
  bottom: 3px;
  left: 0;
  top: 11px;

  @include breakpoint-down-sm {
    height: 26px;
    font-size: v-bind(searchTextMobileSize);
  }
}
</style>
