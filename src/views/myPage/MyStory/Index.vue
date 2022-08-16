<template>
  <div class="inner-container">
    <section class="title">나의 스토리</section>
    <div v-if="totalLength">
      <List :items="storyImages" :totalElement="totalLength" @atBottom="loadMore" />
    </div>
    <Empty v-else />
  </div>
</template>

<script lang="ts">
import { getMyStories } from '@/api/member';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Story } from '@/types/api/story';
import { defineComponent, onMounted, ref } from 'vue';
import Empty from './Empty.vue';
import List from './List.vue';
export default defineComponent({
  components: {
    Empty,
    List,
  },
  setup() {
    const storyImages = ref<{ image: string; storyId: number; multi: boolean }[]>([]);
    const totalLength = ref(0);
    const page = ref(0);
    const bulk = window.matchMedia('(min-width: 767px)').matches ? 9 : 10;
    const getMyStoryImages = async () => {
      const payload: { size: number; plantId?: number; page: number } = {
        size: bulk,
        page: page.value,
      };
      console.log(page.value);
      const { totalElement, data: myStories } = await getMyStories(payload);
      storyImages.value.push(
        ...myStories.map((story) => ({ image: story.imageUrl[0], storyId: story.id, multi: story.imageUrl.length > 1 }))
      );
      if (page.value == 0) totalLength.value = totalElement;
    };
    const init = async () => {
      page.value = 0;
      totalLength.value = 0;
      getMyStoryImages();
    };
    onMounted(() => {
      init();
    });
    const loadMore = () => {
      page.value += 1;
      getMyStoryImages();
    };
    return {
      loadMore,
      totalLength,
      storyImages,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
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
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.01em;
    margin-bottom: 40px;
  }
}
</style>
