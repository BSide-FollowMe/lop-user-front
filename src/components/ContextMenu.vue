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
        <div class="icon__wrapper"><img v-if="!!item?.icon" class="icon" :src="item?.icon" /></div>
        <span>{{ item.text }}</span>
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
      > span {
        vertical-align: middle;
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
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.06);
  border-radius: 2px;
}
.icon {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  &__wrapper {
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 20px;
  }
}
</style>
