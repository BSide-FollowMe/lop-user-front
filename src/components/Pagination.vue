<template>
  <div class="pagination text-center">
    <img
      class="arrow-icon left"
      src="@/assets/images/pagination/arrow-left-icon.svg"
      @click="onClickPrevIcon"
    />
    <section class="number__wrapper">
      <div
        :class="{ number: true, current: currentPage === item }"
        v-for="(item, index) in pagination"
        :key="index"
        @click="onChangePage(item)"
      >
        {{ item }}
      </div>
    </section>

    <img
      class="arrow-icon right"
      src="@/assets/images/pagination/arrow-right-icon.svg"
      @click="onClickNextIcon"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  props: {
    page: {
      type: Number,
      default: 1,
    },
    length: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const currentPage = ref(props.page);
    const totalPageLength = ref(props.length);
    function onChangePage(to: number): void {
      emit("changePage", { page: to });
    }
    const startPage = computed(() => {
      return Math.floor((currentPage.value - 1) / 10) * 10 + 1;
    });
    const endPage = computed(() => {
      return Math.min(Math.ceil(currentPage.value / 10) * 10, props.length);
    });

    const pagination = computed(() => {
      return Array.from(
        { length: endPage.value - startPage.value + 1 },
        (_, i) => i + 1 + Math.floor((currentPage.value - 1) / 10) * 10
      );
    });

    const onClickPrevIcon = () => {
      if (currentPage.value == 1) return;
      currentPage.value = currentPage.value - 1;
    };

    const onClickNextIcon = () => {
      if (currentPage.value == props.length) return;
      currentPage.value = currentPage.value + 1;
    };

    return {
      currentPage,
      totalPageLength,
      onChangePage,
      pagination,
      onClickPrevIcon,
      onClickNextIcon,
    };
  },
  watch: {
    page(newval) {
      this.currentPage = newval;
    },
    length(newval) {
      this.totalPageLength = newval;
    },
    currentPage(newval) {
      this.onChangePage(newval);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/";
.arrow-icon {
  cursor: pointer;
  &.left {
    margin-right: 31.33px;
  }
  &.right {
    margin-left: 31.33px;
  }
}
.number {
  cursor: pointer;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  letter-spacing: -0.01em;

  /* text/4 */

  color: var(--text-color-4);
  &__wrapper {
    display: inline-flex;
    gap: 10px;
  }
  &.current {
    color: var(--secondray-color-2);
  }
}
.ellipsis {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* text/4 */

  color: var(--text-color-4);
}
</style>
