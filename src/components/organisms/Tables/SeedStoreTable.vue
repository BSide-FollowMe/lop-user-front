<template>
  <div class="title">씨앗 지급 내역</div>
  <div class="table"><SeedStoreRow v-for="(item, index) in items" :key="index" :item="item"></SeedStoreRow></div>
  <Pagination :page="currentPage + 1" :length="Math.ceil(totalCount / 20)" @changePage="onChangePage" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SeedStoreRow from '@/components/molecules/TableRows/SeedStoreRow.vue';
import Pagination from '@/components/molecules/Pagination/Index.vue';
export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    totalCount: {
      type: Number,
      default: 1,
    },
    items: {
      type: Array as PropType<{ date: string; action: string; value: number }[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const onChangePage = ({ page }: { page: number }) => {
      const payload = {
        size: '20',
        page: (page - 1).toString(),
      };
      emit('onChangePage', payload);
    };
    return {
      onChangePage,
    };
  },
  components: {
    SeedStoreRow,
    Pagination,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.title {
  font-weight: var(--font-weight-bold);
  font-size: 20px;
  line-height: 20px;
  letter-spacing: -0.01em;

  color: var(--text-color-1);
  margin-bottom: 20px;
  @include breakpoint-down-sm {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 10px;
  }
}
.table {
  width: 100%;
  max-width: 840px;
  border-top: 1px solid var(--text-color-4);
  border-bottom: 1px solid var(--text-color-4);
  margin-bottom: 60px;
  @include breakpoint-down-sm {
    width: 100%;
    margin-bottom: 40px;
  }

  > *:not(:last-child) {
    border-bottom: 1px solid var(--background-color-2);
  }
}
</style>
