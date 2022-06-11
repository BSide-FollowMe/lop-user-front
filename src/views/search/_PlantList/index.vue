<template>
  <EmptyPage v-if="isEmpty" class="is-empty" />
  <List v-else :text="searchTarget" :items="list" :totalLength="totalLength" @atBottom="loadMore" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import EmptyPage from './_EmptyPage.vue';
import List from './_List.vue';
import { getPlantList } from '@/api/plant';
import type { PlantListParam, Plant } from '@/types/api/plant';

export default defineComponent({
  name: 'Plant List',
  components: {
    EmptyPage,
    List,
  },
  props: ['text'],
  setup(props) {
    const searchTarget = computed(() => props.text);
    const isEmpty = ref(false);
    const page = ref(0);
    const list = ref([] as Plant[]);
    const totalLength = ref(0);

    async function getPlantsList() {
      try {
        const payload: PlantListParam = {
          size: 10,
          page: page.value,
        };
        if (searchTarget.value != '') payload.keyword = searchTarget.value;

        const { data: plants, totalElement } = await getPlantList(payload);
        const resList: Plant[] = plants;
        if (!resList.length) {
          isEmpty.value = true;
          return;
        }
        list.value.push(...resList);
        if (page.value == 0) totalLength.value = totalElement;
      } catch (e) {
        console.error(e);
      }
    }
    onMounted(() => {
      getPlantsList();
    });

    function loadMore() {
      page.value++;
      getPlantsList();
    }
    return {
      isEmpty,
      searchTarget,
      list,
      totalLength,
      loadMore,
    };
  },
});
</script>
