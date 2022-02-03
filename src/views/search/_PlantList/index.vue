<template>
  <EmptyPage v-if="isEmpty" class="is-empty" />
  <section v-else class="plants-container">
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
import EmptyPage from './_EmptyPage.vue';
import List from './_List.vue';
export default defineComponent({
  components: {
    EmptyPage,
  },
  props: ['text'],
  setup(props) {
    const searchTarget = computed(() => props.text);
    const isEmpty = ref(false);
    // TODO: empty 퍼블 확인을 위한 샘플내용 추후 제거 필요
    if (searchTarget.value == 'EMPTY_SAMPLE') {
      isEmpty.value = true;
    }
    function stylizeBySearchTarget(searchStr:string, targetStr:string){
      const arr = targetStr.split(searchStr);
      return `${arr[0]}<span style="color:var(--secondray-color-2)">${searchStr}</span>${arr[1]}`;
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
.is-empty {
  .request-container {
    color: var(--primary-color);
    text-align: center;
    height: 530px;
    padding: 80px;
    img {
      width: 116px;
      height: 116px;
    }
    @include breakpoint-down-sm {
      height: 378px;
      img {
        width: 60px;
        height: 60px;
      }
      h2 {
        font-size: var(--m-font-size-p);
      }
    }
  }
  .search-tip {
    margin-top: 15px;
    font-size: var(--font-size-p);
    line-height: 26px;
    color: var(--text-color-4);
    @include breakpoint-down-sm {
      margin-top: 6px;
      font-size: var(--m-font-size-p-3);
      line-height: 18px;
    }
  }
  .plnat-request-btn {
    margin-top: 50px;
    width: 180px;
    height: 48px;
    @include breakpoint-down-sm {
      margin-top: 40px;
    }
  }
  .recommend-container {
    height: 513px;
    background-color: var(--secondary-green-color-3);
    width: 100vw;
    padding-top: 20px;
    margin-left: calc(-50vw + 50%);
    @include breakpoint-down-sm {
      height: 405px;
    }
  }
  h1 {
    color: #000;
    margin-top: 80px;
    @include breakpoint-down-sm {
      margin-top: 40px;
      line-height: 34px;
    }
  }
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
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
      margin: 40px calc(var(--content-container-padding) * -1) 0 calc(var(--content-container-padding) * -1);
      padding: 0 var(--m-content-container-padding);
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
      @include breakpoint-down-sm {
        margin: 0 15px 0 0;
        &:first-child {
          margin-left: 20px;
        }
        &:last-child {
          margin-right: 20px;
        }
      }

      img {
        height: 176px;
        width: 176px;
        border-radius: 4px;
        -webkit-user-drag: none;
        @include breakpoint-down-sm {
          height: 144px;
          width: 144px;
        }
      }
      .plant-name {
        display: block;
        margin-top: 20px;
        color: #323232;
        font-size: 20px;
        line-height: 24px;
        @include breakpoint-down-sm {
          font-size: 18px;
          line-height: 22px;
        }
      }
      &:hover hr {
        border-bottom: 2px solid #599270;
      }
    }
  }
}
.inner-infinety-container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  overflow: visible;
  padding: 0 var(--content-container-padding);
  @include breakpoint-down-sm {
    min-width: var(--m-content-container-max-width);
    padding: 0 var(--m-content-container-padding);
  }
}
.plant-list {
  list-style: none;
  .item {
    display: flex;
    align-items: center;
    height: 140px;
    padding: 20px;
    border-bottom: 1px solid var(--background-color-4);

    &:hover {
      background-color: var(--secondary-green-color-3);
          cursor:pointer;
    }
    .preview {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
      background-color: #c4c4c4;
    }
    &__infomations {
      margin-left: 40px;
      flex-grow: 1;
    }
    .category {
      padding: 3px 12px;
      border: 1px solid var(--text-color-3);
      border-radius: 12px;
      color: var(--text-color-3);
      font-size: var(--font-size-caption);
      letter-spacing: -0.005em;
      line-height: 17px;
    }
    .title {
      margin-top: 10px;
      margin-bottom: 0px;
      line-height: 29px;
    }
    .alias {
      margin-top: 4px;
      margin-bottom: 0px;
      line-height: 26px;
    }
    .to-details {
      width:24px;
      height:24px;
      background-color:transparent;
      border:none;
      img{
        width:24px;
        height:24px;
      }
    }
  }
}

</style>
