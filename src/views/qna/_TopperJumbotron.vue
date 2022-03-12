<template>
  <section class="jumbotron-container">
    <div class="inner-infinety-container">
      <div class="jumbtron">
        <h1>질문 · 답변</h1>
        <div class="intro-tip">
          식물을 키우면서 어려운 점이 있거나
          <br />
          돌봄 노하우를 공유하고 싶다면
          <br class="md-down-only" />
          이곳에서 함께 묻고 답하세요.
        </div>
        <VueButton color="primary" class="ask-question-btn" @click="ROUTE_TO.QNABOARD_REGIST">질문하기</VueButton>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import VueButton from '@/components/buttons/VueButton.vue';
import { ROUTE_TO } from '@/router/routing';
export default defineComponent({
  name: 'Topper Searcher',
  components: {
    VueButton,
  },
  setup(props, { emit }) {
    return {ROUTE_TO};
  },
  watch: {},
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';

.inner-infinety-container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  overflow: visible;
  padding: 0px var(--content-container-padding);
  @include breakpoint-down-sm {
    min-width: var(--m-content-container-max-width);
    padding: 0px var(--m-content-container-padding);
  }
}
.jumbotron-container {
  height: 356px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background-color: var(--secondary-green-color-3);

  @include breakpoint-down-sm {
    height: 276px;
  }
}
.jumbtron {
  color: var(--primary-color);
  text-align: center;
  height: 356px;
  padding: 80px;
  h1 {
    color:var(--primary-color);
    margin-top: 0px;
    margin-bottom: 0px;
  }
  @include breakpoint-down-sm {
    height: 276px;
    padding: 60px;

    h1 {
      font-size: var(--m-font-size-h-2);
    }
  }
}
.intro-tip {
  margin-top: 15px;
  font-size: 20px;
  line-height: 28px;
  color: var(--text-color-2);
  @include breakpoint-down-sm {
    font-size: var(--m-font-size-p-3);
    line-height: 18px;
  }
}
.ask-question-btn {
  margin-top: 40px;
  width: 168px;
  height: 48px;
  @include breakpoint-down-sm {
    margin-top:30px;
    width:140px;
    height:40px;
  }
}
</style>
