<template>
  <div class="modal">
    <div class="modal__wrapper">
      <slot />
      <button type="button" class="modal__close" @click="closeModal"><img src="@/assets/icon/close.svg" /></button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ModalTemplate',
  props: [],
  setup(props, { emit }) {
    window.document.body.style.overflow = 'hidden';
    function closeModal() {
      emit('close');
      window.document.body.style.overflow = 'auto';
    }
    return {
      closeModal,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.25);
  @include breakpoint-down-sm {
    padding: 20px;
  }

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include breakpoint-down-sm {
      position: relative;
      width: 100%;
      left: unset;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  &__close {
    cursor: pointer;
    position: absolute;
    top: 40px;
    right: 40px;
    background-color: transparent;
    border: none;
    @include breakpoint-down-sm {
      top: 30px;
      right: 20px;
    }
  }
}
</style>
