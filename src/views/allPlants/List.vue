<template>
  <div class="inner-container">
    <div class="count">
      전체
      <span class="count__value">{{ totalCount }}</span>
    </div>
    <div class="content__wrapper">
      <div
        class="content"
        v-for="(item, index) in plants"
        :key="index"
        @click="moveToPlantDetail(item.id)"
      >
        <section :class="{ image__wrapper: true, dummy__wrapper: !item.fileUrl }">
          <img
            :class="{
              image: true,
              dummy: !item.fileUrl,
              'fit-height': imageSize[index]?.height < imageSize[index]?.width,
            }"
            :src="item.fileUrl || DummyImage"
            @load="(e) => setImageSize(index, e)"
          />
        </section>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <Pagination
      :page="currentPage + 1"
      :length="Math.ceil(totalCount / 20)"
      @changePage="onChangePageEvt"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import DummyImage from "@/assets/images/detail/dummy-image.svg";
import { PlantListData } from "@/api/model/plantModel";
import Pagination from "@/components/Pagination.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    plants: {
      type: Array as PropType<PlantListData[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const pageLength = computed(() => {
      return Math.ceil(props.totalCount / 20);
    });
    const router = useRouter();
    const onChangePageEvt = ({ page }: { page: number }) => {
      const payload = {
        size: "20",
        page: (page - 1).toString(),
      };
      emit("onChangePage", payload);
    };
    const moveToPlantDetail = (id: string) => {
      router.push(`/plant/${id}`);
    };

    const imageSize = ref([] as { width: number; height: number }[]);
    const setImageSize = (index: number, e: any) => {
      const { width, height } = e.target;
      imageSize.value[index] = { width, height };
    };
    //object type은 css v-bind 안먹는 현상으로 primitive type으로 선언

    return {
      pageLength,
      DummyImage,
      onChangePageEvt,
      moveToPlantDetail,
      setImageSize,
      imageSize,
    };
  },
  components: {
    Pagination,
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/";

.count {
  margin-bottom: 40px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  color: var(--text-color-2);
  &__value {
    color: var(--secondray-color-3);
  }
  @include breakpoint-down-sm {
    font-size: 13px;
    line-height: 16px;
    /* identical to box height */

    letter-spacing: -0.0025em;
    margin-bottom: 20px;
  }
}

.content {
  cursor: pointer;
  flex-basis: 176px;

  @include breakpoint-down-sm {
    flex-basis: calc(33.33% - 6.7px);
    flex-grow: 0;
  }
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 52px 20px;
    margin-bottom: 60px;
    @include breakpoint-down-sm {
      gap: 50px 10px;
      margin-bottom: 40px;
    }

    img {
      border-radius: 4px;
    }
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
    position: relative;
    overflow: hidden;
    width: 176px;
    height: 176px;
    @include breakpoint-down-sm {
      width: 100%;
      height: calc((100vw - 75px) / 3);
    }
  }
}
.name {
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.01em;
  font-weight: var(--font-weight-light);
  margin-top: 10px;

  color: var(--text-color-2);
  @include breakpoint-down-sm {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    margin-top: 6px;
  }
}
.dummy {
  position: static;
  transform: unset;
  width: 70.4px;
  height: 93.23px;
  @include breakpoint-down-sm {
    width: 40px;
    height: 60px;
  }
  &__wrapper {
    background-color: var(--background-color-5);
    border-radius: 4px;
    display: grid;
    place-items: center;
  }
}
</style>
