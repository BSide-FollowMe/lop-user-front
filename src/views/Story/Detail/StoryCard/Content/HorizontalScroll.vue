<template>
  <ul ref="slider" class="plant-list">
    <li
      class="item"
      v-for="(item, index) in plantList"
      :key="`item-${index}`"
      @click="ROUTE_TO.PLANT_DETAILS(item.id)"
    >
      <div class="img-container">
        <img
          :src="item.fileUrl"
          @error="($event.target as HTMLImageElement).src = require('@/assets/images/search/img-error.svg')"
        />
      </div>
      <span class="category" v-if="item.categoryTitle && item.categoryTitle != ''">
        {{ item.categoryTitle }}
      </span>
      <hr />
      <span class="plant-name text-light">{{ item.name }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from "vue";
import { ROUTE_TO } from "@/router/routing";
import useHorizontalMouseScroll from "@/hooks/useHorizontalScroll";
import { Plant } from "@/types/api/plant";
export default defineComponent({
  props: {
    plantList: {
      type: Array as PropType<Plant[]>,
      default: () => [],
    },
  },
  setup() {
    const slider = useHorizontalMouseScroll();

    return {
      slider,
      ROUTE_TO,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixin";
.plant-list {
  margin-top: 50px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;

  &.active {
    background: rgba(255, 255, 255, 0.3);
    cursor: grabbing;
    cursor: -webkit-grabbing;
    transform: scale(1);
  }
  @include breakpoint-down-md {
    margin-left: calc(var(--content-container-padding) * -1);
    margin-right: calc(var(--content-container-padding) * -1);
    padding: 0 var(--m-content-container-padding);
    &::-webkit-scrollbar {
      display: none;
    }
  }
  @include breakpoint-down-sm {
    margin-top: 40px;
    margin-left: calc(var(--content-container-padding) * -1);
    margin-right: calc(var(--content-container-padding) * -1);

    padding: 0 var(--m-content-container-padding);
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .item {
    position: relative;
    text-align: center;
    cursor: pointer;
    margin: 0 10px;
    padding-bottom: 10px;
    border-radius: 4px;

    &:first-child {
      margin-left: 0px;
    }
    &:last-child {
      margin-right: 0px;
    }
    @include breakpoint-down-md {
      margin: 0 15px 0 0;
      &:first-child {
        margin-left: 20px;
      }
      &:last-child {
        margin-right: 20px;
      }
      &:last-child:after {
        content: "";
        top: 0px;
        display: block;
        position: absolute;
        right: -40px;
        width: 40px;
        height: 1px;
      }
    }
    @include breakpoint-down-sm {
      margin: 0 15px 0 0;
      &:first-child {
        margin-left: 20px;
      }
      &:last-child {
        margin-right: 20px;
      }
      &:last-child:after {
        content: "";
        top: 0px;
        display: block;
        position: absolute;
        right: -40px;
        width: 40px;
        height: 40px;
      }
    }
    .img-container {
      height: 176px;
      width: 176px;
      overflow: hidden;
      border-radius: 4px;
      -webkit-user-drag: none;
      @include breakpoint-down-sm {
        height: 144px;
        width: 144px;
      }
      img {
        width: 100%;
        height: 100%;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
    .category {
      display: block;
      margin-top: 12px;
      color: var(--secondary-green-color-1);
      font-size: var(--font-size-caption);
      font-weight: 700;
    }
    hr {
      margin-top: 10px;
      margin-bottom: 0px;
      width: 12px;
      border: none;
      border-bottom: 1px solid var(--secondary-green-color-1);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .plant-name {
      display: block;
      margin-top: 5px;
      color: #323232;
      font-size: 20px;
      line-height: 24px;
      word-break: break-all;
      @include textOverflow(1);
      @include breakpoint-down-sm {
        font-size: 18px;
        line-height: 22px;
      }
    }
    &:hover hr {
      transform: scaleY(2);
      // border-bottom: 2px solid var(--secondary-green-color-1);
    }
  }
}
</style>
