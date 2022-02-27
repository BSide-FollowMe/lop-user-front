<template>
  <div class="container">
    <div class="inner-container qna-edit">
      <section class="qna-edit__title">
        <h1>질문하기</h1>
      </section>
      <section class="edit-form">
        <div class="page-btn-group">
          <button class="ask-help" :class="{ active: page == 'SICK' }" @click="page = 'SICK'">
            <span>식물이 아파요</span>
            <img src="@/assets/icon/ask-help-secondary.svg" alt="" />
          </button>
          <button class="ask-question" :class="{ active: page == 'WONDER' }" @click="page = 'WONDER'">
            <span>식물이 궁금해요</span>
            <img src="@/assets/icon/ask-question-secondary.svg" alt="" />
          </button>
        </div>
        <AskHelp v-if="page == 'SICK'" :boardId="boardId" />
        <AskQuestion v-if="page == 'WONDER'" :boardId="boardId" />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AskHelp from './_AskSick.vue';
import AskQuestion from './_AskWonder.vue';
import { useRoute } from 'vue-router';
import { tokenSvc } from '@/api/token-service';
import { ROUTE_TO } from '@/router/routing';
export default defineComponent({
  name: 'Question Edit',
  components: {
    AskHelp,
    AskQuestion,
  },
  setup() {
    const route = useRoute();
    const page = ref(route.query['type']=='WONDER' ? 'WONDER' : 'SICK');
    const boardId = ref(route.query['id'] || null);

    checkIsLoggedIn();
    async function checkIsLoggedIn() {
      const isLoggedIn = await tokenSvc.isValidToken();
      if (!isLoggedIn) {
        alert('먼저 로그인해주세요!');
        ROUTE_TO.LOGIN();
        return;
      }
    }
    return { page,boardId };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.container {
  background-color: var(--background-color-5);
}
.inner-container {
  margin-left: auto;
  margin-right: auto;
  padding: 0px var(--content-container-padding);
  max-width: var(--content-container-max-width);
  overflow: visible;
  @include breakpoint-down-sm {
    padding: unset;
    min-width: var(--m-content-container-max-width);
  }
}
.qna-edit {
  padding-bottom: 120px;

  &__title {
    padding: 20px;
    text-align: center;
    h1 {
      display: block;
      margin-top: 60px;
      margin-bottom: 30px;
      color:var(--primary-color-1);
      @include breakpoint-down-sm {
        font-size:18px;
        margin-top: 40px;
        margin-bottom: 22px;
      }
    }
  }
  @include breakpoint-down-sm {
    padding-bottom:60px;
  }
}
.edit-form {
  background-color: #fff;
  border-radius: 4px;
  padding: 60px;

  @include breakpoint-down-sm {
    margin-left:20px;
    margin-right:20px;
    padding: 40px var(--m-content-container-padding);
  }
}
.page-btn-group {
  text-align: center;

  button {
    cursor: pointer;
    margin: 0px 5px;
    padding: 25px 30px;
    width: 240px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid var(--background-color-1);
    background-color: transparent;

    span {
      float: left;
      color: var(--text-color-3);
      line-height: 50px;
      font-size: var(--font-size-p);
      font-weight: var(--font-weight-medium);
    }
    img {
      float: right;
      width: 50px;
      height: 50px;
    }
    &.active {
      border: 1px solid var(--secondary-green-color-1);
      background-color: var(--secondary-green-color-3);
      span {
        color: var(--secondary-green-color-1);
        font-weight: var(--font-weight-bold);
      }
      &.ask-help > img {
        content: url('@/assets/icon/ask-help-primary.svg');
      }
      &.ask-question > img {
        content: url('@/assets/icon/ask-question-primary.svg');
      }
    }
    @include breakpoint-down-sm {
      position:relative;
      width: 135px;
      height: 85px;
      padding:10px;
      text-align:center;
      margin: 0px 0px 10px;
      &.ask-help{
        margin-right:5px;
      }
      &.ask-question{
        margin-left:5px;
      }
      span{
        position:relative;
        top:20px;
        left:50%;
        transform:translateX(-50%);
        font-size: 14px;
        line-height: 17px;
        // word-break:keep-all;
      }
      img {
        position:absolute;
        top:10px;
        left:50%;
        transform:translateX(-50%);
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
