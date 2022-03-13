<template>
  <div class="container">
    <object class="image" />
    <section class="link">
      <div class="title">식물의 언어 가이드</div>
      <ul class="link__items">
        <li :class="currentGuide === 'water' ? 'active' : ''" @click="moveGuide('water')">식물이 좋아하는 물 주기 방법</li>
        <li :class="currentGuide === 'ventilation' ? 'active' : ''" @click="moveGuide('ventilation')">통풍이 중요한 이유</li>
        <li :class="currentGuide === 'sunlight' ? 'active' : ''" @click="moveGuide('sunlight')">양지와 음지 구분하기</li>
        <li :class="currentGuide === 'blight' ? 'active' : ''" @click="moveGuide('blight')">식물이 아플 때</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentGuide = route.fullPath.split('/')[2];
    const moveGuide = (guide: string) => {
      if (currentGuide === guide) return;
      router.push(`/guide/${guide}`);
    };
    return {
      currentGuide,
      moveGuide,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles';
.container {
  max-width: 444px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  @include breakpoint-down-sm {
    max-width: 226px;
    display: block;
    img {
      height: 140px;
      width: 100%;
    }
  }
  .link {
    padding: 40px;
    @include breakpoint-down-sm {
      padding: 30px;
    }
  }
}
.image {
  background: url('@/assets/images/guide/unsplash_eA2z1JSzZFI.png');
  width: 183px;
  height: 224px;
  @include breakpoint-down-sm {
    width: 226px;
    height: 140px;
    background: url('@/assets/images/guide/unsplash_eA2z1JSzZFI_mobile.png');
  }
}
.title {
  width: 200px;
  // align-self:baseline;
  font-weight: var(--font-weight-bold);
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: -0.025em;

  /* text/2 */

  color: var(--text-color-2);
  margin-bottom: 20px;
  @include breakpoint-down-sm {
    font-size: 14px;
    line-height: 17px;
  }
}
.link__items {
  > li {
    &:before{
      content: '•';
      font-size: 16px;
      vertical-align: middle;
      line-height: 20px;
      margin-right: 8px;
      @include breakpoint-down-sm {
        font-size: 15px;
        line-height: 18px;
        margin-right: 6px;
      }
    }
    cursor: pointer;
    list-style: none;
    font-weight: var(--font-weight-medium);
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    letter-spacing: -0.01em;

    /* text/3 */

    color: var(--text-color-3);
    @include breakpoint-down-sm {
      font-size: 12px;
      line-height: 18px;
    }
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    &.active {
      cursor: default;
      font-weight: var(--font-weight-bold);
      color: var(--primary-color-1);
    }
  }
}
</style>
