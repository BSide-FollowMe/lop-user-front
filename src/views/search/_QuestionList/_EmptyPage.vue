<template>
  <div class="is-empty">
    <section class="request-container">
      <img src="@/assets/icon/question-request.svg" />
      <h2 class="text-medium">등록된 질문 · 답변이 없어요</h2>
      <div class="search-tip">
        식물이 아프거나 키우기 어렵다면
        <br />
        다른 식집사 분들의 도움을 받아보세요.
      </div>
      <VueButton color="primary" class="question-request-btn" @click="ROUTE_TO.QNABOARD_REGIST">질문하기</VueButton>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import VueButton from '@/components/buttons/VueButton.vue';
import { ROUTE_TO } from '@/router/routing';
export default defineComponent({
  components: {
    VueButton,
  },
  props: ['text'],
  setup(props) {
    const searchTarget = computed(() => props.text);
    return {
      searchTarget,
      ROUTE_TO,
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
    min-height: 530px;
    height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height) - 270px);
    padding: 80px;
    img {
      width: 116px;
      height: 116px;
    }
    @include breakpoint-down-sm {
      min-height: 378px;
      height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height) - 146px);
      padding: 60px;
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
  .question-request-btn {
    margin-top: 50px;
    width: 180px;
    height: 48px;
    @include breakpoint-down-sm {
      width: 147px;
      margin-top: 40px;
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
</style>
