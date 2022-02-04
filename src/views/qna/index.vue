<template>
  <div class="container">
    <TopperJumbotron />
    <QuestionList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopperJumbotron from './_TopperJumbotron.vue';
import QuestionList from './_QuestionList/index.vue';
export default defineComponent({
  name: 'Question And Answers',
  components: {
    QuestionList,
    TopperJumbotron,
  },
  setup() {
    return {};
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
</style>
