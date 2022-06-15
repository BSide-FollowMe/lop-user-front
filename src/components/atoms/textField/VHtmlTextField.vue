<template>
  <div class="item__content" v-html="content.replace(/(?:\r\n|\r|\n)/g, '<br />')"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
  },
});
</script>
