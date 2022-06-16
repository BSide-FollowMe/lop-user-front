<template>
  <div class="container">
    <PageTitle><template>씨앗 보관함</template></PageTitle>
    <BackwardButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageTitle from '@/components/atoms/Typography/PageTitle.vue';
import BackwardButton from '@/components/molecules/Buttons/BackwardButton.vue';
export default defineComponent({
  components: {
    PageTitle,
    BackwardButton,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
</style>
