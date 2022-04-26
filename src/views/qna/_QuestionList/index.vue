<template>
  <List :text="searchTarget" :plantId="plantId" :items="list" :totalLength="totalLength" :isReady="isReady" @atBottom="loadMore" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import List from './_List.vue';
import { getQnaBoardList, getMyQnaBoardList } from '@/api/qnaboard';
import setMeta from '@/utils/setMeta';
export default defineComponent({
  name: 'Question List',
  components: {
    List,
  },
  props: ['text'],
  setup(props) {
    setMeta({
      title: `질문 · 답변 - 식물의언어`,
      description: '식물의언어 모든 식물 관련 질문 및 답변 리스트입니다.',
      keywords: '식물의언어, 식물의 언어, 질문, 답변, 질문 답변, 질문하기, 답변하기',
      path: '/qna',
    });
    const route = useRoute();
    const isReady = ref(false);
    const plantId: any = computed(() => route.query.plantId || '');
    const mine: any = computed(() => route.query.mine || '0');
    const page = ref(0);
    const list = ref([] as any);
    const totalLength = ref(0);
    init();
    watch(mine, (newVal: string) => {
      list.value = [];
      page.value = 0;
      totalLength.value = 0;
      isReady.value = false;
      init();
    });
    async function init() {
      isReady.value = false;
      if (mine.value == '1') {
        await getMyQuestionsList();
        isReady.value = true;
        return;
      }
      await getQuestionsList();
      isReady.value = true;
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
          size: 10,
          page: page.value,
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
    function loadMore() {
      page.value++;
      init();
    }
    return {
      isReady,
      list,
      totalLength,
      loadMore,
      plantId,
    };
  },
});
</script>
