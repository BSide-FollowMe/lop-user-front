<template>
  <div class="carousel">
    <button v-if="images.length" class="carousel__button prev" @click="onClickPrev">
      <img :src="arrowLeft" />
    </button>
    <button v-if="images.length" class="carousel__button next" @click="onClickNext">
      <img :src="arrowRight" />
    </button>
    <div class="carousel__navigation__wrapper">
      <ul class="carousel__navigation">
        <li
          v-for="(_, index) in images"
          :key="index"
          class="carousel__navigation__item"
          @click="() => onClickNavButton(index)"
          :nav-active="index === activeIndex"
        ></li>
      </ul>
    </div>
    <ul class="carousel__slide__wrapper">
      <li ref="slideRef" class="carousel__slide" v-for="(image, index) in images" :key="index" :data-active="index === activeIndex">
        <img :src="image.imageUrl" :alt="image.name" @load="(e) => setImageSize(e)" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, PropType, computed } from 'vue';
import arrowLeft from '@/assets/icon/carousel/carousel-arrow-left.svg';
import arrowRight from '@/assets/icon/carousel/carousel-arrow-right.svg';
import { StoryImage } from '@/types/api/story';
export default defineComponent({
  props: {
    images: {
      type: Array as PropType<StoryImage[]>,
      default: () => [],
    },
  },
  setup(props) {
    const activeIndex = ref(0);
    const slideRef = ref('');
    const onClickPrev = () => {
      if (activeIndex.value == 0) activeIndex.value = props.images.length - 1;
      else activeIndex.value -= 1;
    };
    const onClickNext = () => {
      if (activeIndex.value == props.images.length - 1) activeIndex.value = 0;
      else activeIndex.value += 1;
    };
    const onClickNavButton = (index: number) => {
      activeIndex.value = index;
    };
    const imageSize = ref<string[]>(props.images.length ? [] : ['100%']);
    const setImageSize = (e: any) => {
      const { width, height } = e.target;
      imageSize.value.push((height / width) * 100 + '%');
    };
    //object type은 css v-bind 안먹는 현상으로 primitive type으로 선언
    const resizedImageWidth = computed(() => {
      return imageSize.value[activeIndex.value] ?? '100%';
    });

    return {
      arrowLeft,
      arrowRight,
      onClickPrev,
      onClickNext,
      onClickNavButton,
      activeIndex,
      slideRef,
      setImageSize,
      imageSize,
      resizedImageWidth,
    };
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.carousel {
  width: 100%;
  position: relative;
}
.carousel::after {
  content: '';
  display: block;
  padding-bottom: v-bind(imageSize[activeIndex]);
  background-color: #bababa !important;
}
.carousel > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  width: 100%;

  position: absolute;
  opacity: 0;
  transition: all 0.8s ease-in;
}
.carousel__slide > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.carousel__slide[data-active='true'] {
  opacity: 1;
}
.carousel__button {
  position: absolute;
  background-color: transparent;
  border: none;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.carousel__button.prev {
  left: 0;
  margin-left: 20px;
}
.carousel__button.next {
  right: 0;
  margin-right: 20px;
}

.carousel__navigation__wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 3;
}
.carousel__navigation {
  display: inline-block;
  padding: 0;
}
.carousel__navigation__item {
  cursor: pointer;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #fff;
  background-clip: content-box;
  border: 0.25rem solid transparent;
  border-radius: 50%;
  font-size: 0;
}
.carousel__navigation__item[nav-active='true'] {
  background-color: orange;
}
</style>
