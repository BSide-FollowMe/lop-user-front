<template>
  <div class="inner-container">
    <div class="plant" v-for="(plant, index) in newPlants" :key="index">
      <img class="image" :src="plant.imgUrl" />
      <div class="info">
        <span class="name">{{ plant.name }}</span>
        <div
          v-if="plant.like"
          class="icon heart-fill-icon"
          @click="
            toggleLike(index);
            requestChangeLike(index);
          "
        />
        <div
          v-else
          class="icon heart-empty-icon"
          @click="
            toggleLike(index);
            requestChangeLike(index);
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import EmptyHeartIcon from '@/assets/icon/heart-empty.svg';
import FullHeartIcon from '@/assets/icon/heart-fill.svg';
import { debounce } from 'lodash';
import { useStore } from 'vuex';
export default defineComponent({
  props: {
    plants: {
      type: Array as PropType<
        {
          imgUrl: string;
          name: string;
          like: boolean;
        }[]
      >,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    const newPlants = ref([...props.plants]);
    const toggleLike = (index: number) => {
      newPlants.value[index].like = !newPlants.value[index].like;
      if (newPlants.value[index].like) {
        store.dispatch('snack/openSnack', { text: '내가 저장한 식물에 추가했어요!', link: '/', color: '#C9704C' });
      } else {
        store.dispatch('snack/openSnack', { text: '내가 저장한 식물에서 삭제했어요!', color: '#C9704C' });
      }
    };
    const requestChangeLike = debounce((index: number) => {
      console.log('turned into ' + newPlants.value[index].like);
    }, 300);

    return {
      EmptyHeartIcon,
      FullHeartIcon,
      requestChangeLike,
      toggleLike,
      newPlants,
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
  min-width: 960px;
  display: flex;
  gap: 40px 32px;
  flex-wrap: wrap;
  @include breakpoint-down-sm {
    min-width: 320px;
    gap: 20px;
    justify-content: space-between;
    padding: 20px;
  }
}
.plant {
  display: inline-block;
}
.image {
  width: 186px;
  height: 186px;
  @include breakpoint-down-sm {
    width: 130px;
    height: 130px;
  }
}
.info {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.icon {
  cursor: pointer;
  &.heart-fill-icon {
    -webkit-mask-image: url('@/assets/icon/heart-fill.svg');
    mask-image: url('@/assets/icon/heart-fill.svg');
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    width: 18px;
    height: 20px;
    background-color: var(--secondray-color-3);
  }
  &.heart-empty-icon {
    -webkit-mask-image: url('@/assets/icon/heart-empty.svg');
    mask-image: url('@/assets/icon/heart-empty.svg');
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    width: 18px;
    height: 20px;
    background-color: var(--secondray-color-3);
  }
}
</style>
