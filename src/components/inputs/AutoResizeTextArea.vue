<template>
  <textarea ref="textareaRef" row="1" :maxlength="maxlength" :readonly="readonly" v-model="inputText" />
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
