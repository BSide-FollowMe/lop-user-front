<template>
  <div class="container search-result">
    <TopperSearcher :text="searchStr" />
    <RouterTabs class="router-tabs" :text="searchStr" />
    <PlantList v-if="listType == 'plants'" :text="searchStr" :key="searchStr" />
    <QuestionList v-if="listType == 'questions'" :text="searchStr" :key="searchStr" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed,watch } from 'vue';
import TopperSearcher from './_TopperSearcher.vue';
import PlantList from './_PlantList/index.vue';
import QuestionList from './_QuestionList/index.vue';
import RouterTabs from './_RouterTabs.vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { PageEnum } from '@/enums/PageEnum';
import { getPlantList } from '@/api/plant';
import { getQnaBoardList } from '@/api/qnaboard';

export default defineComponent({
  name: 'Search Result',
  components: {
    TopperSearcher,
    RouterTabs,
    PlantList,
    QuestionList,
  },
  setup() {
    const route = useRoute();
    const searchStr: any = computed(() => route.query.q);
    const listType: any = computed(() => route.query.list);

    queryController(searchStr.value, listType.value);
    getPlantsList();


    watch(searchStr, () => {
      queryController(searchStr.value, listType.value);
      getPlantsList();
    });

    function queryController(text?: string, list?: string) {
      const isInputted: boolean = isNotInputtedQuery(text);
      if (!isInputted) {
        router.push(PageEnum.HOME);
      }
      if (!list) {
        const query = { ...route.query };
        query.list = 'plants';
        router.push({ query: query });
      }
    }
    function isNotInputtedQuery(text?: string): boolean {
      if (!text || text == '') {
        return false;
      }
      return true;
    }

    async function getPlantsList() {
      try {
        const payload: any = {
          size: 1,
          page: 0,
        };
        if (searchStr.value != '') payload.keyword = searchStr.value;

        const { data }: any = await getPlantList(payload);
        const resList: any = data.data;
        if (!resList.length) {
          if (await getQuestionsList()) {
            const query = { ...route.query };
            query.list = 'questions';
            router.push({ query: query });
          }
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    async function getQuestionsList() {
      try {
        const payload: any = {
          size: 1,
          page: 0,
        };
        if (searchStr.value != '') payload.keyword = searchStr.value;
        const { data }: any = await getQnaBoardList(payload);
        const resList: any = data.data;
        if (!resList.length) {
          return false;
        }
        return true;
      } catch (e) {
        console.error(e);
      }
    }
    return {
      searchStr,
      listType,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  padding: 0px var(--content-container-padding);
  overflow: visible;
  @include breakpoint-down-sm {
    padding: unset;
    min-width: var(--m-content-container-max-width);
  }
}
.search-result {
  .router-tabs {
    margin-top: 40px;
    @include breakpoint-down-sm {
      margin-top: 0px;
    }
  }
}
</style>
