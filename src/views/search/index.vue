<template>
  <div class="container search-result">
    <TopperSearcher :text="searchStr" />
    <RouterTabs class="router-tabs" />
    <PlantList v-if="listType == 'plants'" />
    <QuestionList v-if="listType == 'questions'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,computed } from 'vue';
import TopperSearcher from './_TopperSearcher.vue';
import PlantList from './_PlantList.vue';
import QuestionList from './_QuestionList.vue';
import RouterTabs from './_RouterTabs.vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { PageEnum } from '@/enums/PageEnum';
export default defineComponent({
  name: 'Search result',
  components: {
    TopperSearcher,
    RouterTabs,
    PlantList,
    QuestionList,
  },
  setup() {
    const route = useRoute();
    const searchStr: any = ref(route.query.q);
    const listType: any = computed(()=>route.query.list);

    queryController(searchStr, listType);

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
  overflow: visible;
  @include breakpoint-down-sm {
    min-width: var(--m-content-container-max-width);
  }
}
.search-result {
    .router-tabs{
        margin-top:40px;
    }
}
</style>
