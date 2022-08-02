<template>
  <div :class="isDependent ? 'dependent-input' : 'input-item'">
    <section style="position: relative">
      <ResizableTextArea
        :placeholder="placeholder"
        v-model="input"
        maxlength="500"
        @click="onClickTextarea"
      />
      <div class="edit-btn-group">
        <button class="regist-btn" @click="() => registerComment()">등록</button>
      </div>
    </section>
    <div class="length-counter">({{ input.length }}/500)</div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import ResizableTextArea from "@/components/atoms/textarea/ResizableTextArea.vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    isDependent: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  components: { ResizableTextArea },
  setup(props, { emit }) {
    const input = ref("");
    const registerComment = () => {
      emit("submit", { input: input.value });
    };
    const onClickTextarea = () => {
      emit("clickTextArea");
    };
    return {
      registerComment,
      input,
      onClickTextarea,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixin";

.input-item {
  margin-top: 20px;
  position: relative;

  @include breakpoint-down-sm {
    margin-top: 6px;
  }
}

.dependent-input {
  padding: 20px 20px 40px 40px;
  background-color: var(--background-color-5);
  @include breakpoint-down-sm {
    padding-left: 20px;
  }
}

.length-counter {
  margin-top: 8px;
  text-align: right;
  font-size: 12px;
  line-height: 14px;
  color: var(--text-color-3);
}
.edit-btn-group {
  right: 8px;
  bottom: -4px;
  position: absolute;
  button.regist-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    line-height: 50px;
    font-weight: var(--font-weight-bold);
    color: var(--secondary-green-color-1);
    @include breakpoint-down-sm {
      font-size: 14px;
    }
  }
}
</style>
