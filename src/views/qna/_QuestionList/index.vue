<template>
  <EmptyPage v-if="isEmpty" class="is-empty" />
  <List v-else :text="searchTarget" :plantId="plantId" :items="list" :totalLength="totalLength" @atBottom="loadMore"/>
</template>

<script lang="ts">
import { defineComponent, ref, computed,watch } from 'vue';
import { useRoute } from 'vue-router';
import EmptyPage from './_EmptyPage.vue';
import List from './_List.vue';
import { getQnaBoardList,getMyQnaBoardList } from '@/api/qnaboard';
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
    const plantId: any = computed(() => route.query.plantId || '');
    const mine: any = computed(() => route.query.mine || '0');
    const page = ref(0);
    const list = ref([] as any);
    const totalLength = ref(0);
    init();
    watch(mine, (newVal: string) => {
      list.value = [];
      init();
    });
    function init() {
      if(mine.value == '1'){
        getMyQuestionsList();
        return
      }
      getQuestionsList();
    }

    async function getQuestionsList() {
      try {
        const payload: any = {
          size: 10,
          page: page.value,
        };
        if (plantId.value != '') payload.plantId = plantId.value;

        const { data }: any = await getQnaBoardList(payload);
        const resList: any = data.data;
        list.value.push(...resList);
        if (page.value == 0) totalLength.value = data.totalElement;
      } catch (e) {
        console.error(e);
      }
    }
    async function getMyQuestionsList() {
      try {
        const payload: any = {
        };
        if (plantId.value != '') payload.plantId = plantId.value;

        const { data }: any = await getMyQnaBoardList(payload);
        const resList: any = data.data;
        list.value.push(...resList);
        if (page.value == 0) totalLength.value = data.totalElement;
      } catch (e) {
        console.error(e);
      }
    }
    function loadMore(){
      page.value++;
      init();
    }
    return {
      isEmpty,
      list,
      totalLength,
      loadMore,
      plantId,
    };
  },
});
</script>
