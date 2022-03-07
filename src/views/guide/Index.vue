<template>
  <div class="container">
    <div class="banner" :style="backgroundImage(bannerImage)">
      <div class="banner__common__title">식물의언어 가이드</div>
      <hr />
      <div class="banner__title">{{ title }}</div>
    </div>

    <section class="content">
      <slot />
      <GuideLinkBox class="guide-link-box"/>
    </section>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GuideLinkBox from './GuideLinkBox.vue';
export default defineComponent({
  props: {
    bannerImage: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(){
    const backgroundImage=(image:string)=>{
      return {
        'background': `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
      }
    };
    return {
      backgroundImage,
    }
  },
  components: { GuideLinkBox },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.banner {
  // background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(v-bind(bannerImage));
  width: 100%;
  height: 520px;
  text-align: center;
  padding: 213px 0 215px 0;
  background-size: cover;
  margin-bottom: 70px;
  @include breakpoint-down-sm {
    height: 260px;
    padding: 94px 56px 102px 56px;
  }
  &__common__title {
    font-weight: var(--font-weight-medium);
    font-size: 18px;
    line-height: 26px;
    /* identical to box height, or 144% */

    letter-spacing: -0.01em;

    color: #ffffff;
    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 17px;
    }
  }
  hr {
    width: 16px;
  }
  &__title {
    font-size: 32px;
    line-height: 38px;
    text-align: center;
    letter-spacing: -0.0025em;

    color: #ffffff;
    @include breakpoint-down-sm {
      font-size: 22px;
      line-height: 26px;
    }
  }
}
.bookmark {
  @include breakpoint-down-sm {
    display: none;
  }
  max-width: var(--content-container-inner);
  margin-left: auto;
  margin-right: auto;
  padding: 19px 20px 20px 20px;
  &__wrapper {
    display: inline-block;
    &:first-child {
      margin-right: 40px;
    }
    .bookmark__group {
      font-weight: var(--font-weight-bold);
      font-size: 15px;
      line-height: 18px;
      /* identical to box height */

      letter-spacing: -0.025em;

      /* text/2 */

      color: var(--text-color-2);
    }
    .bookmark__anchor {
      font-weight: var(--font-weight-medium);
      font-size: 15px;
      line-height: 18px;
      /* identical to box height, or 120% */

      letter-spacing: -0.01em;
      text-decoration-line: underline;

      /* text/3 */

      color: var(--text-color-3);

      /* Inside auto layout */

      flex: none;
      order: 0;
      flex-grow: 0;
      margin: 0px 10px;
    }
  }
}
.content {
  padding: 0 20px 0 20px;
  max-width: calc(var(--content-container-inner) + 40px);
  margin-left: auto;
  margin-right: auto;
}
hr.bookmark-content {
  @include breakpoint-down-sm {
    display: none;
  }
  border: 1px solid #e5e5e5;
  margin: 0;
}
.guide-link-box{
  margin-bottom:120px;
}
</style>
