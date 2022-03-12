<template>
  <section class="questions-container">
    <ul class="question-list">
      <div class="list-summary paragraph-2">
        검색결과
        <span class="list-summary__count">{{ totalLength }}</span>
      </div>
      <li class="item" v-for="(item, index) in items" :key="`plant-item-${index}`" @click="ROUTE_TO.QNABOARD_DETAIL(item.id)">
        <div class="item__infomations">
          <p class="target-plant" v-html="stylizeBySearchTarget(searchTarget,  item.plantName)"></p>
          <p class="details text-medium" v-html="stylizeBySearchTarget(searchTarget, item.content)"></p>
          <p class="status">
            <span class="reg-date">{{ getTimeDistanceWithNaturalStr(item.createdDateTime) }}</span>
            <span class="reply-count">댓글 {{ item.commentCount }}</span>
            <span class="like-count">도움돼요 {{ item.supportCount }}</span>
          </p>
        </div>
        <div v-if="item.imageUrl && item.imageUrl.length" class="preview">
          <img :src="item.imageUrl" @error="$event.target.src = require('@/assets/images/search/img-error.svg')" />
        </div>
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

.questions-container{
  min-height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height));
}

.question-list {
  list-style: none;
  .item {
    display: flex;
    height: 180px;
    padding: 20px;
    border-bottom: 1px solid var(--background-color-4);
    @include breakpoint-down-sm {
      height: 130px;
      padding: 16px 20px;
    }
    &:hover {
      background-color: var(--secondary-green-color-3);
      cursor: pointer;
    }
    .preview {
      width: 140px;
      height: 140px;
      object-fit: cover;
      border-radius: 4px;
      background-color: #c4c4c4;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      @include breakpoint-down-sm {
        margin: auto;
        width: 76px;
        height: 76px;
      }
    }
    &__infomations {
      display: flex;
      flex-direction: column;
      margin-right: 60px;
      flex-grow: 1;
      // @include breakpoint-down-sm {
      //   margin-left: 20px;
      //   margin-right: 20px;
      // }
    }
    .target-plant {
      margin: 0px;
      color: var(--text-color-3);
      @include breakpoint-down-sm {
        font-size: 12px;
      }
    }
    .details {
      margin-top: 10px;
      margin-bottom: 0px;
      line-height: 26px;
      @include textOverflow(2);
      @include breakpoint-down-sm {
        margin-top: 6px;
        font-size: 13px;
        line-height: 20px;
      }
    }
    .status {
      margin-top: auto;
      margin-bottom: 0px;
      color: var(--text-color-3);
      font-size: 16px;
      line-height: 18px;
      span{
        color:var(--text-color-3);
      }

      @include breakpoint-down-sm {
        margin-bottom: 0px;
        font-size: var(--m-font-size-caption);
      }
      span:first-child::before {
        content: unset;
        margin: unset;
        color: unset;
      }
      span::before {
        content: '|';
        margin: 0px 10px;
        color: var(--background-color);
      }
    }
    .to-details {
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: none;
      img {
        width: 24px;
        height: 24px;
      }
      @include breakpoint-down-sm {
        width: 18px;
        height: 18px;
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
.list-summary {
  margin: 40px 0px 20px 0px;
  color: var(--text-color-2);
  &__count {
    color: var(--secondray-color-2);
  }
  @include breakpoint-down-sm {
    margin: 20px;
    font-size: 13px;
  }
}
</style>
