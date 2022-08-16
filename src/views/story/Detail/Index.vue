<template>
  <div class="container">
    <StoryCard class="story-card">
      <Header class="header" :profile="story?.writer" :createdDate="story.createdDateTime" :storyId="story.id" />
      <Content
        :images="story.images"
        :content="story.content"
        :isSupport="story.isSupport"
        :supportCount="story.supportCount"
        :commentCount="story.comments.data.length"
        :plantList="story.plantList"
        @toggleSupport="() => supportStory(story.id)"
      />
      <RelatedPlantsVue :plantList="story.plantList" />
      <p>
        댓글<span>{{ story.comments.data.length }}</span>
      </p>
      <ReplyInput
        :myId="userInfo.id"
        placeholder="답변을 남겨주세요"
        v-model:modelValue="replyInput"
        @submit="({ input }) => registerComment(input)"
      />
      <ul class="reply-list">
        <ReplyItem
          v-for="(comment, index) in story.comments.data"
          :key="index"
          :id="comment.id"
          :item="comment"
          :boardWriterId="String(story.writer.id)"
          :myId="userInfo.id"
          :boardId="String(story.id)"
        />
      </ul>
    </StoryCard>
    <BackwardButton class="backward-button" @click="ROUTE_TO.STORY_FEED">목록으로</BackwardButton>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import StoryCard from '@/views/story/StoryCard/Index.vue';
import Header from '@/views/story/StoryCard/Header/Index.vue';
import Content from '@/views/story/StoryCard/Content/Index.vue';
import ReplyInput from '@/views/story/StoryCard/ReplyInput/Index.vue';
import ReplyItem from '@/views/story/StoryCard/ReplyItem/Index.vue';
import BackwardButton from '@/components/atoms/buttons/BackwardButton.vue';
import { ROUTE_TO } from '@/router/routing';
import { getStory, supportStory } from '@/api/story';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { StoryDetail } from '@/types/api/story';

export default defineComponent({
  components: {
    BackwardButton,
    StoryCard,
    Header,
    Content,
    ReplyItem,
    ReplyInput,
  },
  setup(_, { emit }) {
    const route = useRoute();
    const story = ref<StoryDetail>({} as StoryDetail);
    const store = useStore();
    const replyInput = ref('');
    const userInfo = computed(() => store.getters.getUserInfo);

    onMounted(async () => {
      const id = Number(route.path.split('/')[3]);
      if (isNaN(id)) throw new Error('id is not valid');
      story.value = await getStory({ storyId: id });
    });
    const registerComment = (input: string) => {
      emit('registerComment', input);
    };
    return {
      ROUTE_TO,
      story,
      userInfo,
      replyInput,
      registerComment,
      supportStory,
    };
  },
});
</script>
<style scoped lang="scss">
@import '@/styles/';
.container {
  max-width: var(--content-container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding: var(--m-content-container-padding) var(--content-container-padding);
  @include breakpoint-down-sm {
    min-width: 360px;
    padding: var(--m-content-container-padding) var(--m-content-container-padding);
  }
}
.story-card {
  margin-bottom: 26px;
}
.header {
  margin-bottom: 21px;
}
</style>
