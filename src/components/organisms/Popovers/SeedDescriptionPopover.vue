<template>
  <PopoverTemplate ref="popoverTemplate">
    <div class="conatiner">
      <div class="title">모은 씨앗이란?</div>
      <div class="content">
        식물의언어에서 활동하신 내역에 따라 씨앗을 지급합니다. 모은 씨앗의 개수로 식집사 레벨이 부여되고, 매월 모은 씨앗을 기준으로 ‘Best
        식집사’를 선정해요.
      </div>
    </div>
  </PopoverTemplate>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import PopoverTemplate from '@/components/layouts/PopoverTemplate.vue';
export default defineComponent({
  components: {
    PopoverTemplate,
  },
  setup() {
    const popoverTemplate = ref();
    const closePopover = () => {
      popoverTemplate.value.closePopover();
    };
    const openPopover = () => {
      popoverTemplate.value.openPopover();
    };
    return {
      closePopover,
      openPopover,
      popoverTemplate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.conatiner {
  text-align: left;
  overflow: auto;
  position: relative;
  width: 304px;
  background-color: #fff;
  border-radius: 2px;
  padding: 24px 20px 26px 18px;
  @include breakpoint-down-sm {
    width: 304px;
    padding: 26px 20px;
  }
  .title {
    font-weight: var(--font-weight-bold);
    font-size: 20px;
    line-height: 20px;
    /* or 100% */

    letter-spacing: -0.01em;

    color: var(--text-color-1);
    margin-bottom: 10px;
    @include breakpoint-down-sm {
      font-size: 18px;
      line-height: 22px;
    }
  }
}
</style>
