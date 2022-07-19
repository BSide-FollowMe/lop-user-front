<template>
  <div class="container">
    <StoryCard :story="story"></StoryCard>
    <BackwardButton class="backward-button" @click="ROUTE_TO.STORY_FEED"
      >목록으로</BackwardButton
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import StoryCard from "@/views/Story/Detail/StoryCard/Index.vue";
import BackwardButton from "@/components/atoms/buttons/BackwardButton.vue";
import { ROUTE_TO } from "@/router/routing";
import { getStory } from "@/api/story";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    BackwardButton,
    StoryCard,
  },
  setup() {
    const route = useRoute();
    const story = ref();
    onMounted(async () => {
      const id = Number(route.path.split("/")[3]);
      if (isNaN(id)) throw new Error("id is not valid");
      story.value = await getStory({ storyId: id });
    });
    return {
      ROUTE_TO,
      story,
    };
  },
});
</script>
<style scoped lang="scss">
@import "@/styles/";
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
</style>
