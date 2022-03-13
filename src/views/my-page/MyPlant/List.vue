<template>
  <div class="inner-container">
    <div class="plant" v-for="(plant, index) in newItems" :key="index" @click="moveToPlantDetail(plant)">
      <img class="image" :src="plant.fileUrl || DummyImage" />
      <div class="info">
        <span class="name">{{ plant.name }}</span>
        <div
          v-if="plant.isAdded"
          class="icon heart-fill-icon"
          @click.stop="
            toggleLike(index);
            requestChangeLike(index);
          "
        />
        <div
          v-else
          class="icon heart-empty-icon"
          @click.stop="
            toggleLike(index);
            requestChangeLike(index);
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType, ref, watchEffect } from 'vue';
import EmptyHeartIcon from '@/assets/icon/heart-empty.svg';
import FullHeartIcon from '@/assets/icon/heart-fill.svg';
import { debounce } from 'lodash';
import { handleInfiniteListScroll } from '@/utils/global';
import { useStore } from 'vuex';
import { PlantListData } from '@/api/model/plantModel';
import { registerLike } from '@/api/plant';
import { useRouter } from 'vue-router';
import DummyImage from '@/assets/images/detail/dummy-image.png';
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<(PlantListData & { isAdded: boolean })[]>,
      default: () => [],
    },
    totalElement: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const newItems = ref([...props.items]);

    watchEffect(() => {
      newItems.value = [...props.items];
    });
    const onScroll = debounce(($event: Event) => {
      handleInfiniteListScroll($event, newItems.value, props.totalElement, () => emit('atBottom'));
    }, 500);
    document.addEventListener('scroll', onScroll);
    onUnmounted(() => {
      document.removeEventListener('scroll',onScroll);
    });
    const toggleLike = (index: number) => {
      newItems.value[index].isAdded = !newItems.value[index].isAdded;
      if (newItems.value[index].isAdded) {
        store.dispatch('snack/openSnack', { text: '내가 저장한 식물에 추가했어요!', link: '/', color: '#C9704C' });
      } else {
        store.dispatch('snack/openSnack', { text: '내가 저장한 식물에서 삭제했어요!', color: '#C9704C' });
      }
    };
    const requestChangeLike = debounce(async (index: number) => {
      try {
        await registerLike({ plantId: Number(newItems.value[index].id), memberId: store.state.user.id, isAdded: newItems.value[index].isAdded });
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert(e);
        }
      }
    }, 300);
    const moveToPlantDetail = (plant:PlantListData & { isAdded: boolean }) =>{
      router.push(`/plant/${plant.id}`);
    }
    return {
      EmptyHeartIcon,
      FullHeartIcon,
      requestChangeLike,
      toggleLike,
      newItems,
      moveToPlantDetail,
      DummyImage,
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
  gap: 40px 32px;
  flex-wrap: wrap;
  @include breakpoint-down-sm {
    min-width: 320px;
    gap: 20px;
    padding: 20px;
  }
}
.plant {
  cursor: pointer;
  display: inline-block;
  flex-basis:calc(25% - 24px);
  max-width:calc(25% - 24px);
  flex-shrink:1;
  max-height:230px;
  @include breakpoint-down-sm {
    flex-basis: calc(50% - 10px);
    max-width:calc(50% - 10px);
  }
}
.image {
  width:100%;
  height:calc(100% - 44px);
  @include breakpoint-down-sm {
    height:calc(100% - 38px);
  }
}
.info {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
    min-width: 18px;
    min-height: 20px;
    background-color: var(--secondray-color-3);
  }
  &.heart-empty-icon {
    -webkit-mask-image: url('@/assets/icon/heart-empty.svg');
    mask-image: url('@/assets/icon/heart-empty.svg');
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    min-width: 18px;
    min-height: 20px;
    background-color: var(--secondray-color-3);
  }
}
</style>
