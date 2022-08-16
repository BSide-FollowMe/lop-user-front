<template>
  <div class="container">
    <div class="container-header" ref="titleWrapper">
      <div class="background flower"></div>
      <div class="background plant"></div>
      <div class="container-header__title">식물 스토리</div>
      <div class="container-header__content">
        우리 집 식물 성장일기부터 식집사 맞춤 핫플레이스까지.
        <br />
        나만 알기 아까운 식물 이야기, 함께 나눠볼까요?
      </div>
      <button class="container-header__button" @click="ROUTE_TO.STORY_REGISTER">스토리 작성하기</button>
    </div>
    <div class="card__wrapper">
      <CheckButton v-if="isLoggedIn" :value="mine" class="toggle-my-story" @toggle="toggleIsMyList">내 스토리</CheckButton>
      <div v-if="stories.length > 0">
        <button ref="registerBtn" class="register-button" @click="ROUTE_TO.STORY_REGISTER">
          <div />
        </button>
        <StoryCard v-for="story in stories" :key="story.id">
          <Header
            class="header"
            :profile="{ id: story?.writer.id, nickname: story?.writer.nickname, memberImageUrl: story.writer.memberImageIUrl }"
            :createdDate="story.createdDateTime"
            :storyId="story.id"
          ></Header>
          <div style="position: relative">
            <div class="content__wrapper" @click="() => ROUTE_TO.STORY_DETAIL(String(story.id))"></div>
            <Content
              :images="story.imageUrl.map((item) => ({ name: item, imageUrl: item }))"
              :content="story.content"
              :isSupport="false"
              :supportCount="story.supportCount"
              :commentCount="story.commentCount"
            />
          </div>
        </StoryCard>
      </div>
      <Empty v-else />
      <div ref="lastRef"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { getStories } from '@/api/story';
import { Story } from '@/types/api/story';
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import CheckButton from '@/components/atoms/buttons/CheckButton.vue';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import StoryCard from '@/views/story/StoryCard/Index.vue';
import { getMyStories } from '@/api/member';
import Header from '@/views/story/StoryCard/Header/Index.vue';
import Content from '@/views/story/StoryCard/Content/Index.vue';
import Empty from '@/views/story/Feed/Empty.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ROUTE_TO } from '@/router/routing';
import useSticky from '@/hooks/useSticky';

export default defineComponent({
  components: {
    StoryCard,
    Header,
    Content,
    CheckButton,
    Empty,
  },
  setup() {
    const stories = ref<Story[]>([]);
    const store = useStore();
    const route = useRoute();
    const page = ref(0);
    const totalLength = ref(0);
    const mounted = ref(false);
    const plantId = computed(() => (route.query.plantId as string) || '');
    const mine = ref(false);
    const isLoggedIn = computed(() => store.getters.isAuthenticated);
    const lastRef = useInfiniteScroll(() => (mine.value ? geyMyStoryList() : getStoryList()));
    const registerBtn = useSticky();
    const titleWrapper = ref<HTMLElement>({} as HTMLElement);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log(entries[0]);
          if (!entries[0]) return;
          registerBtn.value.style.opacity = '0';
          console.log(registerBtn.value);
        } else {
          registerBtn.value.style.opacity = '1';
        }
      },
      {
        threshold: 0.2,
      }
    );
    onMounted(() => {
      observer.observe(titleWrapper.value);
    });
    onUnmounted(() => {
      observer.unobserve(titleWrapper.value);
    });
    const getStoryList = async () => {
      if ((mounted.value == true && totalLength.value == 0) || (totalLength.value != 0 && totalLength.value === stories.value.length))
        return;
      const payload: { size: number; plantId?: number; page: number } = {
        size: 10,
        page: page.value,
      };
      if (plantId.value != '') payload.plantId = Number(plantId.value);
      const { totalElement, data: _stories } = await getStories(payload);
      stories.value.push(..._stories);
      if (page.value == 0) totalLength.value = totalElement;
      page.value += 1;
    };
    const geyMyStoryList = async () => {
      if ((mounted.value == true && totalLength.value == 0) || (totalLength.value != 0 && totalLength.value === stories.value.length))
        return;
      const payload: { size: number; plantId?: number; page: number } = {
        size: 10,
        page: page.value,
      };
      if (plantId.value != '') payload.plantId = Number(plantId.value);

      const { totalElement, data: myStories } = await getMyStories(payload);
      stories.value.push(...myStories);
      if (page.value == 0) totalLength.value = totalElement;
      page.value += 1;
    };
    const init = async () => {
      page.value = 0;
      totalLength.value = 0;
      mine.value ? await geyMyStoryList() : await getStoryList();
      mounted.value = true;
    };
    init();
    watch(mine, () => {
      stories.value = [];
      page.value = 0;
      totalLength.value = 0;
      mounted.value = false;
      init();
    });

    function toggleIsMyList(checked: boolean) {
      mine.value = !mine.value;
    }

    return {
      registerBtn,
      titleWrapper,
      ROUTE_TO,
      stories,
      isLoggedIn,
      mine,
      toggleIsMyList,
      lastRef,
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
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    line-height: 28px;
    /* or 140% */

    text-align: center;
    letter-spacing: -0.01em;

    /* text/2 */

    color: var(--text-color-2);
    margin-bottom: 40px;
    @include breakpoint-down-sm {
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0025em;
      margin-bottom: 30px;
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
  > div > *,
  > * {
    margin-bottom: 30px;
    @include breakpoint-down-sm {
      margin-bottom: 20px;
    }
  }
}
.toggle-my-story {
  width: 117px;
  margin-left: auto;
  margin-right: 0;
  display: table !important;
}
.content__wrapper {
  transform: translateX(-60.5px);
  width: calc(100% + 120px);
  cursor: pointer;
  height: calc(100% + 80px);
  position: absolute;
}
.register-button {
  position: fixed;
  top: 100px;
  left: calc(50% + 520px);
  transition: opacity 0.5s;
  opacity: 0;
  border-radius: 100%;
  > div {
    width: 100%;
    height: 100%;
    background: url('@/assets/icon/write-green.svg');
    background-repeat: no-repeat;
    background-position: center center;
  }

  width: 50px;
  height: 50px;

  background: #ffffff;
  /* list-shadow */

  box-shadow: 2px 2px 15px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background: var(--primary-color-2);
    > div {
      width: 100%;
      height: 100%;
      background: url('@/assets/icon/write.svg');
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}

.header {
  margin-bottom: 21px;
}
</style>
