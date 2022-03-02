<template>
  <div class="inner-container">
    <section class="title">내가 저장한 식물</section>
    <List v-if="res.data?.length" :items="res.data" :totalElement="res.totalElement" @atBottom="loadMore" />
    <Empty v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getMyFavorite } from '@/api/member';
import Empty from './Empty.vue';
import List from './List.vue';
import { PlantListData } from '@/api/model/plantModel';
import { ListResponse } from '@/api/model/common';

export default defineComponent({
  setup() {
    const size = 8;
    const page = ref(0);
    const res = ref({} as ListResponse<PlantListData & { isAdded: boolean }>);
    const init = async () => {
      const favorites = await getMyFavorite({ size, page: page.value });
      res.value = { ...favorites, data: [...(res.value.data || []), ...favorites.data.map((item) => ({ ...item, isAdded: true }))] };
    };
    onMounted(() => {
      init();
    });
    const loadMore = () => {
      page.value++;
      init();
    };
    return {
      res,
      loadMore,
    };
  },
  components: { Empty, List },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.title {
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  letter-spacing: -0.0025em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
  margin-bottom: 50px;
  @include breakpoint-down-sm {
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.01em;
    margin-bottom: 40px;
  }
}
</style>
