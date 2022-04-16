<template>
  <div class="container">
    <div class="title">나의 질문 · 답변</div>
    <div class="inner-container">
      <RouterTabs class="router-tabs" />
      <div class="main">
        <QuestionList
          v-if="listType === 'questions'"
          :items="list"
          :totalElement="totalElement"
          @atBottom="loadMore"
        ></QuestionList>
        <AnswerList
          v-if="listType === 'answers'"
          :items="list"
          :totalElement="totalElement"
          @atBottom="loadMore"
        ></AnswerList>
        <Empty v-if="list.length == 0" :type="listType"></Empty>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, onMounted } from "vue";
import RouterTabs from "./_RouterTabs.vue";
import QuestionList from "./QuestionList.vue";
import AnswerList from "./AnswerList.vue";
import Empty from "./_Empty.vue";
import { useRoute } from "vue-router";
import { getMyQuestions, getMyAnswers } from "@/api/member";
import { ListResponse } from "@/api/model/common";
import { Question, Answer } from "@/api/model/memberModel";
import setMeta from "@/utils/setMeta";

export default defineComponent({
  name: "Search Result",
  components: {
    RouterTabs,
    QuestionList,
    AnswerList,
    Empty,
  },
  setup() {
    const route = useRoute();
    const listType = computed(() => route.query.list);
    const size = 5;
    const page = ref(0);
    const totalElement = ref(0);

    const list = ref([] as (Question | Answer)[]);
    const init = async () => {
      let res = {} as ListResponse<Question | Answer>;
      if (listType.value === "questions") {
        res = await getMyQuestions({ size, page: page.value });
      } else {
        res = await getMyAnswers({ size, page: page.value });
      }
      totalElement.value = res.totalElement;
      list.value.push(...res.data);
    };
    watch(listType, () => {
      list.value = [];
      totalElement.value = 0;
      init();
    });
    onMounted(() => {
      init();
    });
    const loadMore = () => {
      page.value++;
      init();
    };
    return {
      listType,
      list,
      totalElement,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/";
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  padding: 0px;
  overflow: visible;

  @include breakpoint-down-sm {
    padding: unset;
    min-width: 320px;
  }
}
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
    margin-bottom: 40px;
    font-size: 18px;
    line-height: 22px;
  }
}

.inner-container {
  background-color: #fff;
  .main {
    padding: 20px 60px 40px 60px;
    @include breakpoint-down-sm {
      padding: 20px 20px 40px 20px;
    }
  }
  .router-tabs {
    margin-top: 40px;
    @include breakpoint-down-sm {
      margin-top: 0px;
    }
  }
}
</style>
