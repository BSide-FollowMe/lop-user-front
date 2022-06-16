<template>
  <div class="popover" v-if="showModal">
    <div class="popover__wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ModalTemplate',
  props: [],
  setup(props, { emit }) {
    const showModal = ref(false);
    // window.document.body.style.overflow = 'hidden'; // todo
    function closePopover() {
      showModal.value = false;
    }
    function openPopover() {
      showModal.value = true;
    }
    return {
      closePopover,
      openPopover,
      showModal,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';
.popover {
  z-index: 200;

  &__wrapper {
    border: 1px solid #e5e5e5;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.06);
    background: #ffffff;
    position: absolute;

    @include breakpoint-down-sm {
      width: 100%;
    }
  }
}
</style>
