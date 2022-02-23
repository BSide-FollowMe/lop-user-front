<template>
  <div class="container">
    <div class="title">나의 질문 · 답변</div>
    <div class="inner-container">
      <RouterTabs class="router-tabs" />
      <div class="main">
        <QuestionList v-if="listType === 'questions'" :questions="list"></QuestionList>
        <AnswerList v-if="listType === 'answers'" :answers="list"></AnswerList>
        <Empty v-if="list.length==0" :type="listType"></Empty>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from 'vue';
import RouterTabs from './_RouterTabs.vue';
import QuestionList from './QuestionList.vue';
import AnswerList from './AnswerList.vue';
import Empty from './_Empty.vue'
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'Search Result',
  components: {
    RouterTabs,
    QuestionList,
    AnswerList,
    Empty,
  },
  setup() {
    const route = useRoute();
    const listType = computed(() => route.query.list);
    const getQuestions = () => {
      return [
        // {
        //   commentCount: 1,
        //   content:
        //     '이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요?  잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태...',
        //   createdDateTime: '2022-02-23T18:21:35.974Z',
        //   id: 0,
        //   imageUrl: 'string',
        //   plantName: '녹영',
        //   supportCount: 0,
        // },
        // {
        //   commentCount: 1,
        //   content:
        //     '이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요?  잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태...',
        //   createdDateTime: '2022-02-23T18:21:35.974Z',
        //   id: 1,
        //   imageUrl: 'string',
        //   plantName: '녹영',
        //   supportCount: 0,
        // },
        // {
        //   commentCount: 1,
        //   content:
        //     '이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요?  잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태...',
        //   createdDateTime: '2022-02-23T18:21:35.974Z',
        //   id: 2,
        //   imageUrl: '',
        //   plantName: '녹영',
        //   supportCount: 0,
        // },
        // {
        //   commentCount: 1,
        //   content:
        //     '이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요?  잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태...',
        //   createdDateTime: '2022-02-23T18:21:35.974Z',
        //   id: 3,
        //   imageUrl: '',
        //   plantName: '녹영',
        //   supportCount: 0,
        // },
      ];
    };
    const getAnswers = () => {
      return [
        // {
        //   commentContent:
        //     '겨울이라 과습일 가능성이 있습니다. 과습이 아니면 냉해일텐데 실내에서 키우셨다면 과습일 가능성이 높겠네요 . 물은 어느 정도의 양으로 주셨나요? 겨울이라 과습일 가능성이 있습니다 . 과습이 아니면 냉해일텐데 실내에서 키우셨다면 과습일 가...',
        //   createdDateTime: '2022-02-23T18:26:02.959Z',
        //   id: 4,
        //   plantName: '몬스테라',
        //   questionContent: '이거 해충인가요? 잎에 검은 반점이 생겼...',
        //   supportCount: 12,
        // },
        // {
        //   commentContent:
        //     '겨울이라 과습일 가능성이 있습니다. 과습이 아니면 냉해일텐데 실내에서 키우셨다면 과습일 가능성이 높겠네요 . 물은 어느 정도의 양으로 주셨나요? 겨울이라 과습일 가능성이 있습니다 . 과습이 아니면 냉해일텐데 실내에서 키우셨다면 과습일 가...',
        //   createdDateTime: '2022-02-23T18:26:02.959Z',
        //   id: 5,
        //   plantName: '몬스테라',
        //   questionContent: '이거 해충인가요? 잎에 검은 반점이 생겼...',
        //   supportCount: 0,
        // },
        // {
        //   commentContent:
        //     '겨울이라 과습일 가능성이 있습니다. 과습이 아니면 냉해일텐데 실내에서 키우셨다면 과습일 가능성이 높겠네요 . 물은 어느 정도의 양으로 주셨나요? 겨울이라 과습일 가능성이 있습니다 . 과습이 아니면 냉해일텐데 실내에서 키우셨다면 과습일 가...',
        //   createdDateTime: '2022-02-23T18:26:02.959Z',
        //   id: 6,
        //   plantName: '몬스테라',
        //   questionContent: '이거 해충인가요? 잎에 검은 반점이 생겼...',
        //   supportCount: 5,
        // },
        // {
        //   commentContent:
        //     '겨울이라 과습일 가능성이 있습니다. 과습이 아니면 냉해일텐데 실내에서 키우셨다면 과습일 가능성이 높겠네요 . 물은 어느 정도의 양으로 주셨나요? 겨울이라 과습일 가능성이 있습니다 . 과습이 아니면 냉해일텐데 실내에서 키우셨다면 과습일 가...',
        //   createdDateTime: '2022-02-23T18:26:02.959Z',
        //   id: 1,
        //   plantName: '몬스테라',
        //   questionContent: '이거 해충인가요? 잎에 검은 반점이 생겼...',
        //   supportCount: 1,
        // },
      ];
    };
    const list = ref(
      [] as
        | {
            commentCount: number;
            content: string;
            createdDateTime: string;
            id: number;
            imageUrl: string;
            plantName: string;
            supportCount: number;
          }[]
        | {
            commentContent: string;
            createdDateTime: string;
            id: number;
            plantName: string;
            questionContent: string;
            supportCount: number;
          }[],
    );
    watchEffect(() => {
      if (listType.value === 'questions') {
        list.value = getQuestions();
      } else {
        list.value = getAnswers();
      }
    });
    return {
      listType,
      list
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  padding: 0px;
  overflow: visible;

  @include breakpoint-down-sm {
    padding: unset;
    min-width: var(--m-content-container-max-width);
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
  }
  .router-tabs {
    margin-top: 40px;
    @include breakpoint-down-sm {
      margin-top: 0px;
    }
  }
}
</style>
