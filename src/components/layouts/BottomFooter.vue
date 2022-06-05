<template>
  <div class="container">
    <div class="inner-container">
      <div class="title">
        <img id="logo" src="@/assets/footer-logo.svg" @click="ROUTE_TO.HOME" />
        <img id="logo-title" src="@/assets/footer-title.svg" @click="ROUTE_TO.HOME" />
      </div>
      <div class="tab" style="z-index: 1">
        <span @click="OPEN_LINK.INTRODUCTION">서비스 소개</span>
        <span @click="OPEN_LINK.TOS">이용 약관</span>
        <span @click="OPEN_LINK.PP">개인정보 처리방침</span>
        <div class="tab__icon__wrapper">
          <span @click="OPEN_LINK.NAVER_BLOG"><img src="@/assets/icon/blog.svg" /></span>
          <span @click="OPEN_LINK.INSTAGRAM"><img src="@/assets/icon/instagram.svg" /></span>
        </div>
      </div>
      <div class="tab tab-filled">
        <span class="cursor-pointer" @click="OPEN_LINK.MAIL">
          Contact.
          <span style="text-decoration: underline">plantslang@gmail.com</span>
        </span>
        <br />
        <span @click.prevent>Copyright. 식물의언어 All rights reserved.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ROUTE_TO, OPEN_LINK } from '@/router/routing';

export default defineComponent({
  setup() {
    return {
      OPEN_LINK,
      ROUTE_TO,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/', '@/assets/fonts/pretendard/pretendard.css';
.container {
  background-color: var(--primary-color);
  .inner-container {
    margin-left: auto;
    margin-right: auto;
    padding: 30px var(--content-container-padding);
    // align-items: center;
    height: 180px;
    max-width: var(--content-container-max-width);
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;

    @include breakpoint-down-sm {
      min-width: 360px;
      height: 220px;
      padding: 0 var(--m-content-container-padding);
    }
  }
  .title {
    cursor: pointer;
    img#logo-title {
      padding-left: 12px;
    }
    filter: brightness(0) invert(1);
    display: flex;
    align-items: center;
  }
  .tab {
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-base);
    font-size: var(--font-size-caption);
    line-height: 18px;
    justify-content: flex-end;
    text-align: right;
    color: #fff;
    opacity: 0.5;

    letter-spacing: -0.0025em;
    > span {
      cursor: pointer;
    }
    > span:not(:last-of-type):after {
      cursor: default;
      content: '|';
      margin: 0 20px;
    }
    &-filled {
      display: block;
      margin-top: 30px;
      text-align: left;
      width: 100%;
      line-height: 21px;
      > span {
        cursor: unset;
      }
      span:not(:last-child):after {
        all: unset;
      }
    }
    @include breakpoint-down-sm {
      justify-content: start;
      width: 100%;
    }
    &__icon__wrapper {
      display: flex;
      margin-left: 33px;
      gap: 13px;
      justify-content: center;
      align-items: center;
      > span {
        cursor: pointer;
      }
      @include breakpoint-down-sm {
        position: relative;
        top: 90px;
        flex-grow: 1;
        justify-content: end;
      }
    }
  }
}
</style>
