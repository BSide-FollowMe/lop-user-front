<template>
  <div v-if="open" class="context-menu" v-click-outside="closeContextMenu">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="
          () => {
            item.func();
            closeContextMenu();
          }
        "
      >
        <img class="icon" :src="item?.icon" />
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<{ text: string; func: () => void; icon: string }[]>,
      default: () => [],
    },
  },
  setup() {
    const open = ref(false);
    const closeContextMenu = () => {
      if (open.value === true) {
        open.value = false;
      }
    };
    const toggleContextMenu = () => {
      if (open.value === false) {
        setTimeout(() => {
          open.value = !open.value;
        }, 0);
      }
    };
    return {
      open,
      closeContextMenu,
      toggleContextMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.context-menu {
  > ul {
    margin-block-start: 0;
    margin-block-end: 0;
    list-style-type: none;
    padding: 16px 17px;
    > li {
      > img {
        vertical-align: middle;
        margin-right: 20px;
      }
      cursor: pointer;
      height: 32px;
      font-weight: var(--font-weight-medium);
      font-size: 16px;
      line-height: 32px;
      letter-spacing: -0.01em;

      /* text/3 */

      color: var(--text-color-3);
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
  z-index: 10;
  position: absolute;
  // box-sizing: border-box;
  min-width: 100px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 0 1px 2px lightgrey;
}
</style>
