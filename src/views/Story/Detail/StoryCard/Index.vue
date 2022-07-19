<template>
  <div class="inner-container">
    <Header :profile="story?.writer" />
    <Content
      :images="story.images"
      :content="story.content"
      :isSupport="story.isSupport"
      :supportCount="story.supportCount"
      :commentCount="story.comments.data.length"
      :plantList="story.plantList"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import Header from "./Header/Index.vue";
import Content from "./Content/Index.vue";
import ReplyItem from "./ReplyItem/Index.vue";
import { StoryDetail } from "@/types/api/story";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    story: {
      type: Object as PropType<StoryDetail>,
      default: () => ({}),
    },
  },
  components: {
    Header,
    Content,
    ReplyItem,
  },
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.getters.getUserInfo);

    return {
      userInfo,
    };
  },
});
</script>
<style lang="scss" scoped>
.inner-container {
  background: #ffffff;
  /* list-shadow */
  padding: 35px 60.5px 60px 60.5px;

  box-shadow: 2px 2px 15px 3px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
</style>
