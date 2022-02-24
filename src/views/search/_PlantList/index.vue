<template>
  <EmptyPage v-if="isEmpty" class="is-empty" />
  <List v-else :text="searchTarget" :items="list" :totalLength="totalLength" @atBottom="loadMore" />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import EmptyPage from './_EmptyPage.vue';
import List from './_List.vue';
import { getPlantList } from '@/api/plant';
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
    const list = ref([] as any);
    const totalLength = ref(0);
    init();
    function init() {
      getPlantsList();
    }

    async function getPlantsList() {
      try {
        const payload: any = {
          size: 10,
          page: page.value,
        };
        if (searchTarget.value != '') payload.keyword = searchTarget.value;

        const { data }: any = await getPlantList(payload);
        const resList: any = data.data;
        if(!resList.length){
          isEmpty.value = true;
          return;
        }
        list.value.push(...resList);
        if (page.value == 0) totalLength.value = data.totalElement;
      } catch (e) {
        console.error(e);
      }
    }
    function loadMore(){
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
