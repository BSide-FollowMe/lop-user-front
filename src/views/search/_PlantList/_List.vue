<template>
  <section class="plants-container">
    <ul class="plant-list">
      <li class="item" v-for="index in 10" :key="`plant-item-${index}`">
        <img class="preview" src="@/assets/images/search/plant-sample.png" />
        <div class="item__infomations">
          <span class="category">다육식물</span>
          <h2 class="title text-medium" v-html="stylizeBySearchTarget(searchTarget, '콩난')"></h2>
          <p class="alias" v-html="stylizeBySearchTarget(searchTarget, '콩난, 콩란, 콩선인장')"></p>
        </div>
        <button class="to-details" @click.prevent><img src="@/assets/icon/arrow_right.png" /></button>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  props: ['text'],
  setup(props) {
    const searchTarget = computed(() => props.text);
    const isEmpty = ref(false);
    // TODO: empty 퍼블 확인을 위한 샘플내용 추후 제거 필요
    if (searchTarget.value == 'EMPTY_SAMPLE') {
      isEmpty.value = true;
    }
    function stylizeBySearchTarget(searchStr: string, targetStr: string) {
      return targetStr.replaceAll(searchStr, `<span style="color:var(--secondray-color-2)">${searchStr}</span>`);
    }
    return {
      searchTarget,
      isEmpty,
      stylizeBySearchTarget,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

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
</style>
