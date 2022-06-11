<template>
  <List :plantId="plantId" :items="list" :totalLength="totalLength" :isReady="isReady" @atBottom="loadMore" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import List from './_List.vue';
import { getQnaBoardList, getMyQnaBoardList } from '@/api/qnaboard';
import setMeta from '@/utils/setMeta';
import { BoardListParam, Question } from '@/types/api/board';
export default defineComponent({
  name: 'Question List',
  components: {
    List,
  },
  setup() {
    setMeta({
      title: `질문 · 답변 - 식물의언어`,
      description: '식물의언어 모든 식물 관련 질문 및 답변 리스트입니다.',
      keywords: '식물의언어, 식물의 언어, 질문, 답변, 질문 답변, 질문하기, 답변하기',
      path: '/qna',
    });
    const route = useRoute();
    const isReady = ref(false);
    const plantId = computed(() => (route.query.plantId as string) || '');
    const mine = computed(() => route.query.mine || '0');
    const page = ref(0);
    const list = ref([] as Question[]);
    const totalLength = ref(0);
    init();
    watch(mine, () => {
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
        const payload: BoardListParam = {
          size: 10,
          page: page.value,
        };
        if (plantId.value != '') payload.plantId = plantId.value;

        const { totalElement, data: questions } = await getQnaBoardList(payload);
        list.value.push(...questions);
        if (page.value == 0) totalLength.value = totalElement;
      } catch (e) {
        console.error(e);
      }
    }
    async function getMyQuestionsList() {
      try {
        const payload: BoardListParam = {
          size: 10,
          page: page.value,
        };
        if (plantId.value != '') payload.plantId = plantId.value;

        const { totalElement, data: myQuestions } = await getMyQnaBoardList(payload);
        list.value.push(...myQuestions);
        if (page.value == 0) totalLength.value = totalElement;
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
