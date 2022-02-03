<template>
  <EmptyPage v-if="isEmpty" class="is-empty" />
  <List v-else :text="searchTarget"/>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import EmptyPage from './_EmptyPage.vue';
import List from './_List.vue';
export default defineComponent({
  name: 'Question List',
  components: {
    EmptyPage,
    List,
  },
  props: ['text'],
  setup(props) {
    const searchTarget = computed(() => props.text);
    const isEmpty = ref(false);
    // TODO: empty 퍼블 확인을 위한 샘플내용 추후 제거 필요
    if (searchTarget.value == 'EMPTY_SAMPLE') {
      isEmpty.value = true;
    }
    return {
      searchTarget,
      isEmpty,
    };
  },
});
</script>

