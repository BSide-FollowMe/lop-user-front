<template>
  <div class="content">
    <Carousel :images="images" :background="DummyImage" />
    <div class="content__icon__group">
      <span class="heart">
        <button :class="{ 'heart-button': true, active: isSupported }" @click="onClickHeartButton">
          <img :src="heartIcon" />
        </button>
        <span>{{ supportCount }}</span>
      </span>
      <span class="comment">
        <img class="speech-bubble-icon" :src="SpeechBubble" />
        <span>{{ commentCount }}</span>
      </span>
    </div>
    <p class="content__text">{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import Carousel from '@/components/molecules/Carousel/Index.vue';
import { StoryImage } from '@/types/api/story';
import { Plant } from '@/types/api/plant';
import EmptyHeartIcon from '@/assets/icon/heart-empty.svg';
import FullHeartIcon from '@/assets/icon/heart-fill.svg';
import SpeechBubble from '@/assets/icon/speech-bubble.svg';
import DummyImage from '@/assets/images/detail/dummy-image.svg';

export default defineComponent({
  components: {
    Carousel,
  },
  props: {
    images: {
      type: Array as PropType<StoryImage[]>,
      default: () => [],
    },
    plantList: {
      type: Array as PropType<Plant[]>,
      default: () => [],
    },
    content: {
      type: String,
      default: '',
    },
    isSupport: {
      type: Boolean,
      default: false,
    },
    supportCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    isSupported: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const imageUrls = computed(() => props.images);

    const imageNames = computed(() => props.images.map((image) => image.name));
    const heartIcon = computed(() => {
      return props.isSupport ? FullHeartIcon : EmptyHeartIcon;
    });
    const onClickHeartButton = () => {
      emit('toggleSupport');
    };

    return {
      imageUrls,
      imageNames,
      heartIcon,
      onClickHeartButton,
      SpeechBubble,
      DummyImage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.content {
  &__text {
    font-weight: var(--font-weight-medium);
    font-size: 18px;
    line-height: 26px;
    /* or 144% */

    letter-spacing: -0.01em;

    /* text/1 */

    color: #444444;
  }
}
.content__icon__group {
  margin-top: 25px;
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/1 */

  color: var(--text-color-1);
  .heart {
    margin-right: 27px;
    margin-bottom: 20px;
    &-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      margin-right: 12px;
      vertical-align: middle;
    }
  }
  .comment > img {
    vertical-align: middle;
    margin-right: 12px;
  }
}
</style>
