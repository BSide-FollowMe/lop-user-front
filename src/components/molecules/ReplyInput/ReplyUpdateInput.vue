<template>
  <div class="textarea-item">
    <ResizableTextArea
      id="comment-edit"
      placeholder="내용을 입력하세요"
      v-model="input"
      :class="{ 'is-empty': input === '' }"
      maxlength="500"
    />
    <div class="edit-btn-group">
      <button class="cancel" @click="closeEditReplyItem">취소</button>
      <span class="separator">|</span>
      <button class="regist-btn" @click="requestCommentUpdate()">수정</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ResizableTextArea from '@/components/atoms/textarea/ResizableTextArea.vue';
export default defineComponent({
  components: {
    ResizableTextArea,
  },
  props: {
    modelValue: {
      type: String,
    },
    isDependent: {
      type: Boolean,
      default: false,
    },
    myId: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const input = ref(props.modelValue);
    const closeEditReplyItem = () => {
      emit('cancel');
    };
    const requestCommentUpdate = () => {
      emit('submit', { input: input.value });
    };
    return {
      input,
      closeEditReplyItem,
      requestCommentUpdate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.textarea-item {
  margin-top: 10px;
  position: relative;

  @include breakpoint-down-sm {
    margin-top: 6px;
  }
}
.edit-btn-group {
  right: 8px;
  bottom: 8px;
  position: absolute;
  .cancel {
    font-size: 16px;
    line-height: 19px;
    color: var(--text-color-4);
    font-weight: var(--font-weight-bold);
    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 17px;
    }
  }
  .separator {
    color: var(--background-color-1);
  }
  .regist-btn {
    font-size: 16px;
    line-height: 19px;
    font-weight: var(--font-weight-bold);
    color: var(--secondary-green-color-1);

    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 17px;
    }
  }
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
