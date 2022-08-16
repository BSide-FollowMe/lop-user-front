<template>
  <div class="inner-container">
    <div class="story" v-for="(story, index) in newItems" :key="index" @click="() => ROUTE_TO.STORY_DETAIL(String(story.storyId))">
      <section class="image__wrapper">
        <div v-if="story.multi" class="multi-image-icon" />
        <img
          :class="{
            image: true,
            'fit-height': imageSize[index]?.height < imageSize[index]?.width,
          }"
          :src="story.image"
          alt=""
          @load="(e) => setImageSize(index, e)"
        />
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { debounce, handleInfiniteListScroll } from '@/utils/global';
import { computed, defineComponent, onUnmounted, PropType, ref, watchEffect } from 'vue';
import { ROUTE_TO } from '@/router/routing';
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<{ image: string; storyId: number; multi: boolean }[]>,
      default: () => [],
    },
    totalElement: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const newItems = ref([...props.items]);
    const isEnd = computed(() => {
      return props.items.length >= props.totalElement;
    });
    watchEffect(() => {
      newItems.value = [...props.items];
    });
    const onScroll = debounce(($event: Event) => {
      handleInfiniteListScroll($event, newItems.value, props.totalElement, () => emit('atBottom'));
    }, 500);
    document.addEventListener('scroll', onScroll);
    onUnmounted(() => {
      document.removeEventListener('scroll', onScroll);
    });
    const imageSize = ref([] as { width: number; height: number }[]);
    const setImageSize = (index: number, e: any) => {
      const { width, height } = e.target;
      imageSize.value[index] = { width, height };
    };
    return {
      isEnd,
      newItems,
      ROUTE_TO,
      setImageSize,
      imageSize,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/';
.inner-container {
  background: #ffffff;
  border-radius: 4px;
  padding: 60px;
  display: flex;
  gap: 21px 20px;
  flex-wrap: wrap;
  @include breakpoint-down-sm {
    gap: 10px;
    padding: 30px 20px;
    justify-content: space-between;
    min-width: 320px;
  }
}
.story {
  position: relative;
  flex-basis: calc(33.3% - 13.5px);
  flex-grow: 0;
  flex-shrink: 1;
  padding-top: calc(33.3% - 13.5px);
  @include breakpoint-down-sm {
    flex-basis: calc(50% - 5px);
    padding-top: calc(50% - 5px);
  }
}
.image {
  width: 100%;
  height: auto;
  position: absolute;
  top: 100%;
  transform: translateY(calc(-100%));
  &.fit-height {
    height: 100%;
    width: auto;
  }
  &__wrapper {
    position: absolute;
    top: 0;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
.multi-image-icon {
  position: absolute;
  -webkit-mask-image: url('@/assets/images/story/empty.svg');
  mask-image: url('@/assets/images/story/empty.svg');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
</style>
