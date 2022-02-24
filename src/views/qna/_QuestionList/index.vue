<template>
  <EmptyPage v-if="isEmpty" class="is-empty" />
  <List v-else :text="searchTarget" :search-target="searchStr" :items="list" :totalLength="totalLength" @atBottom="loadMore"/>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import EmptyPage from './_EmptyPage.vue';
import List from './_List.vue';
import { getQnaBoardList } from '@/api/qnaboard';
export default defineComponent({
  name: 'Question List',
  components: {
    EmptyPage,
    List,
  },
  props: ['text'],
  setup(props) {
    const route = useRoute();
    const isEmpty = ref(false);
    const searchStr: any = computed(() => route.query.plantName || '');
    const page = ref(0);
    const list = ref([] as any);
    const totalLength = ref(0);
    init();
    function init() {
      getQuestionsList();
    }

    async function getQuestionsList() {
      try {
        const payload: any = {
          size: 10,
          page: page.value,
        };
        if (searchStr.value != '') payload.keyword = searchStr.value;

        const { data }: any = await getQnaBoardList(payload);
        const resList: any = data.data;
        list.value.push(...resList);
        if (page.value == 0) totalLength.value = data.totalElement;
      } catch (e) {
        console.error(e);
      }
    }
    function loadMore(){
      page.value++;
      getQuestionsList();
    }
    return {
      isEmpty,
      searchStr,
      list,
      totalLength,
      loadMore,
    };
  },
});
</script>
