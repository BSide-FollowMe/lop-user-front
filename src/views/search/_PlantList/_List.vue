<template>
  <section class="plants-container">
    <ul class="plant-list">
      <li class="item" v-for="(item, index) in items" :key="`plant-item-${index}`"  @click="ROUTE_TO.PLANT_DETAILS(item.id)">
        <div v-if="item.hasImage && item.fileUrl != ''" class="preview">
          <img :src="item.fileUrl" @error="$event.target.src = require('@/assets/images/search/img-error.svg')" />
        </div>
        <div class="item__infomations">
          <span class="category" v-if="item.category">{{item.categoryTitle}}</span>
          <h2 class="title text-medium" v-html="stylizeBySearchTarget(searchTarget, item.name)"></h2>
          <p class="alias" v-html="stylizeBySearchTarget(searchTarget, item.nickname)"></p>
        </div>
        <button class="to-details" @click.prevent><img src="@/assets/icon/arrow_right.svg" /></button>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { getTimeDistanceWithNaturalStr } from '@/utils/text';
import { handleInfiniteListScroll } from '@/utils/global';
import { ROUTE_TO } from '@/router/routing';
import { debounce } from '@/utils/global';

export default defineComponent({
  props: ['text', 'items', 'totalLength'],
  setup(props, { emit }) {
    const searchTarget = computed(() => props.text);
    const items = computed(() => props.items);
    const totalLength = computed(() => props.totalLength);
    const onScroll = debounce(($event: any) => {
      handleInfiniteListScroll($event, items.value, totalLength.value, onAtTheBottom);
    }, 500);
    document.addEventListener('scroll', onScroll);
    function onAtTheBottom() {
      emit('atBottom');
    }
    function stylizeBySearchTarget(searchStr: string, targetStr: string) {
      try {
        return targetStr.replaceAll(searchStr, `<span style="color:var(--secondray-color-2)">${searchStr}</span>`);
      } catch (error) {
        return targetStr
      }
    }
    return {
      ROUTE_TO,
      getTimeDistanceWithNaturalStr,
      onAtTheBottom,
      onScroll,
      stylizeBySearchTarget,
      searchTarget,
    };
  },
  unmounted() {
    document.removeEventListener('scroll', this.onScroll);
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.plants-container{
  min-height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height));
}
.plant-list {
  list-style: none;
  .item {
    display: flex;
    align-items: center;
    height: 140px;
    padding: 20px;
    border-bottom: 1px solid var(--background-color-4);
    @include breakpoint-down-sm {
      height: 108px;
      padding: 16px 20px;
    }
    &:hover {
      background-color: var(--secondary-green-color-3);
      cursor: pointer;
    }
    .preview {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
      background-color: #c4c4c4;
      overflow:hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      @include breakpoint-down-sm {
        width: 76px;
        height: 76px;
      }
    }
    &__infomations {
      margin-left: 40px;
      flex-grow: 1;
      @include breakpoint-down-sm {
        margin-left: 20px;
      }
    }
    .category {
      padding: 3px 12px;
      border: 1px solid var(--text-color-3);
      border-radius: 12px;
      color: var(--text-color-3);
      font-size: var(--font-size-caption);
      letter-spacing: -0.005em;
      line-height: 17px;
      @include breakpoint-down-sm {
        font-size: var(--m-font-size-caption);
        line-height: 14px;
        padding: 2px 10px;
      }
    }
    .title {
      margin-top: 10px;
      margin-bottom: 0px;
      line-height: 29px;
      @include breakpoint-down-sm {
        margin-top: 6px;
        font-size: 16px;
        line-height: 26px;
      }
    }
    .alias {
      margin-top: 4px;
      margin-bottom: 0px;
      line-height: 26px;
      @include breakpoint-down-sm {
        margin-top: 0px;
        font-size: var(--m-font-size-caption);
        line-height: 18px;
      }
    }
    .to-details {
      width: 28px;
      height: 24px;
      // overflow:hidden;
      background-color: transparent;
      border: none;
      img {
        width: 24px;
        // height: 24px;
        object-fit:contain;
      }
      @include breakpoint-down-sm {
        width: 24px;
        height: 18px;
        img {
          width: 18px;
          height: 18px;
          object-fit:contain;
        }
      }
    }
  }
}
</style>
