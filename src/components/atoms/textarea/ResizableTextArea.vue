<template>
  <div style="position: relative">
    <textarea
      id="textarea"
      ref="textareaRef"
      row="1"
      :class="{ 'is-empty': inputText === '' }"
      :maxlength="maxlength"
      :readonly="readonly"
      v-model="inputText"
    />
    <label for="textarea">{{ placeholder }}</label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    maxlength: {
      type: String || Number,
      default: 0,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const textareaRef = ref<HTMLTextAreaElement>({} as HTMLTextAreaElement);
    const setHeight = () => {
      textareaRef.value.style.height = 'auto';
      textareaRef.value.style.height = 20 + textareaRef.value.scrollHeight + 'px';
    };
    const inputText = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
        setHeight();
      },
    });
    onMounted(() => {
      setHeight();
    });
    // setHeight();
    return {
      textareaRef,
      inputText,
      setHeight,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
textarea {
  margin-top: 10px;
  display: block;
  padding: 16px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 2px;
  resize: none;
  width: 100%;
  min-height: 90px;
  overflow: hidden;
  &:focus + label {
    display: none;
  }
  &:not(.is-empty) + label {
    display: none;
  }
  &:focus {
    border: 1px solid var(--secondary-green-color-1);
  }
  @include breakpoint-down-sm {
    height: 118px;
    min-height: 100px;
  }
}
label {
  pointer-events: none;
  font-size: var(--font-size-p-2);
  line-height: 19px;
  color: var(--text-color-3);
  position: absolute;
  top: 16px;
  left: 12px;
  word-break: keep-all;

  @include breakpoint-down-sm {
    font-size: 14px;
  }
}
</style>
