<template>
  <EmptyPage v-if="isEmpty" class="is-empty" />
  <List v-else :text="searchTarget" />
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
    const isEmpty = ref(false);
    return {
      isEmpty,
    };
  },
});
</script>

