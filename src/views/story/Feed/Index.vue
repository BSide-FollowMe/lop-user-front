<template>
  <div class="container">
    <div class="container-header">
      <div class="background flower"></div>
      <div class="background plant"></div>
      <div class="container-header__title">식물 스토리</div>
      <div class="container-header__content">
        우리 집 식물 성장일기부터 식집사 맞춤 핫플레이스까지.
        <br />
        나만 알기 아까운 식물 이야기, 함께 나눠볼까요?
      </div>
    </div>
    <div class="card__wrapper">
      <CheckButton v-if="isLoggedIn" class="toggle-my-question" @toggle="toggleIsMyList">내 질문 보기</CheckButton>
      <StoryCard v-for="story in stories" :key="story.id">
        <Header class="header" :createdDate="story.createdDateTime"></Header>
        <Content
          :images="story.imageUrl ? [{ imageUrl: story.imageUrl, name: 'asdf' }] : []"
          :content="story.content"
          :isSupport="false"
          :supportCount="story.supportCount"
          :commentCount="story.commentCount"
        />
      </StoryCard>
    </div>
  </div>
</template>

<script lang="ts">
import { getStories } from '@/api/story';
import { Story } from '@/types/api/story';
import { computed, defineComponent, ref, watch } from 'vue';
import CheckButton from '@/components/atoms/buttons/CheckButton.vue';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import StoryCard from '@/views/story/StoryCard/Index.vue';
import { getMyStories } from '@/api/member';
import Header from '@/views/story/StoryCard/Header/Index.vue';
import Content from '@/views/story/StoryCard/Content/Index.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { min } from 'lodash';
export default defineComponent({
  components: {
    StoryCard,
    Header,
    Content,
    CheckButton,
  },
  setup() {
    const stories = ref<Story[]>([]);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const page = ref(0);
    const totalLength = ref(0);
    const plantId = computed(() => (route.query.plantId as string) || '');
    const isReady = ref(false);
    const mine = ref(false);
    const isLoggedIn = computed(() => store.getters.isAuthenticated);
    // const lastRef = useInfiniteScroll(() => fetchStories({ page: currentPage.value }));
    const getStoryList = async () => {
      const payload: { size: number; plantId?: number; page: number } = {
        size: 10,
        page: page.value,
      };
      if (plantId.value != '') payload.plantId = Number(plantId.value);
      const { totalElement, data: _stories } = await getStories(payload);
      stories.value.push(..._stories);
      if (page.value == 0) totalLength.value = totalElement;
    };
    const geyMyStoryList = async () => {
      const payload: { size: number; plantId?: number; page: number } = {
        size: 10,
        page: page.value,
      };
      if (plantId.value != '') payload.plantId = Number(plantId.value);

      const { totalElement, data: myStories } = await getMyStories(payload);
      stories.value.push(...myStories);
      if (page.value == 0) totalLength.value = totalElement;
    };
    const init = async () => {
      isReady.value = false;
      mine.value ? await geyMyStoryList() : await getStoryList();
      isReady.value = true;
    };
    init();
    watch(mine, () => {
      stories.value = [];
      page.value = 0;
      totalLength.value = 0;
      isReady.value = false;
      init();
    });

    function toggleIsMyList(checked: boolean) {
      mine.value = !mine.value;
    }

    return {
      stories,
      isLoggedIn,
      mine,
      toggleIsMyList,
      // lastRef,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';
.container-header {
  width: 100%;
  position: relative;
  height: 356px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  @include breakpoint-down-sm {
    padding: 60px 21px 50px 21px;
    height: 258px;
  }
  &__title {
    font-weight: var(--font-weight-bold);
    font-size: 32px;
    line-height: 38px;
    letter-spacing: -0.0025em;

    color: var(--primary-color-1);
    margin-bottom: 15px;
    @include breakpoint-down-sm {
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 10px;
    }
  }
  &__content {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */

    text-align: center;
    letter-spacing: -0.01em;

    /* text/2 */

    color: var(--text-color-2);
    @include breakpoint-down-sm {
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0025em;
    }
  }
  &__button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14.5px 38.5px;
    width: 180px;
    height: 48px;

    /* deepgreen/1-main */

    background: var(--primary-color-1);
    border-radius: 2px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    letter-spacing: -0.02em;

    /* white */

    color: #ffffff;
    @include breakpoint-down-sm {
      width: 140px;
      height: 40px;
      padding: 11.5px 24.5px;
      font-size: 14px;
      line-height: 17px;
    }
  }

  .background {
    position: absolute;

    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    -webkit-mask-size: 94px 171px;
    background-color: #61b34c;
    mask-size: 94px 171px;
    min-width: 94px;
    min-height: 171px;
    bottom: 0;
    &.plant {
      right: 12px;
      -webkit-mask-image: url('@/assets/images/story/FlowerBackground2.svg');
      mask-image: url('@/assets/images/story/FlowerBackground2.svg');
    }
    &.flower {
      right: 133px;
      -webkit-mask-image: url('@/assets/images/story/FlowerBackground1.svg');
      mask-image: url('@/assets/images/story/FlowerBackground1.svg');
    }
  }
}
.container {
  background-color: var(--background-color-5);
}
.card__wrapper {
  padding: 85px 20px 132px 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  @include breakpoint-down-sm {
    padding: 67px 20px 114px 20px;
  }
  > * {
    margin-bottom: 30px;
    @include breakpoint-down-sm {
      margin-bottom: 20px;
    }
  }
}
</style>
