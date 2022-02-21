<template>
  <section class="soil">
    <div class="main__title">내 식물, 정말 목이 마른 걸까요?</div>
    <div class="main__content">
      식물에게 정말 필요한 만큼의 물을 주기 위해서는 흙이 얼마나 말랐는지를 확인해야 해요. 같은 식물이라도 계절이나, 자라는 환경에 따라 필요한 물의
      양이 다르기 때문입니다. ‘며칠에 한 번’처럼 주기적으로 물을 주는 방식에 익숙할 수 있겠지만, 이제는 흙의 상태를 확인해 내 식물이 정말로 목마르다
      말하고 있는지를 들어보세요. 흙이 너무 마르면 뿌리까지 말라버리고, 흙이 계속 축축하면 흙 속에 산소가 머무를 공간이 없어 뿌리가 썩어버리거든요.
    </div>
    <div class="main__title">흙 마름을 확인하려면 이렇게 하세요.</div>
    <div class="main__content">
      겉흙이 말랐을 때 물을 주어야 하는 식물이 있고, 속흙이 말랐을 때 물을 주어야 하는 식물이 있어요. 내 식물이 언제 목말라하는지를 알았다면 가이드에
      따라 흙이 마른 정도를 확인해 보세요.
    </div>
    <section class="sub">
      <div class="sub__title">겉흙 마름 : 손가락으로 확인하기</div>
      <div class="sub__content">
        겉흙이 마른 것은 눈으로도 확인할 수 있지만, 손가락으로 흙 윗부분을 살짝 팠을 때 촉촉한 느낌이 없고, 손가락에 흙이 묻어나지 않는다면 겉흙이
        마른 거예요. 흙 윗부분이 마사(입자가 굵은 모래), 자갈 등으로 덮여있다면 걷어내고 손가락으로 확인하는 것을 추천해요.
      </div>
      <img class="responsive" src="@/assets/images/guide/겉흙마름1.png" />
    </section>
    <section class="sub">
      <div class="sub__title">속흙 마름 : 나무젓가락으로 확인하기</div>
      <div class="sub__content">
        화분 가장자리에 나무젓가락을 깊숙이 꽂고 어느 정도 기다렸다 빼보세요. 젓가락 끝부분에만 흙이 묻어 나오면 속흙이 마른 거예요.
        <br />
        흙이 아직 마르지 않았다면 젓가락이 젖어 색이 변하고, 흙이 전체적으로 묻어 나올 거랍니다.
      </div>
      <img class="responsive" src="@/assets/images/guide/속흙마름1.png" />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  
});
</script>
<style lang="scss" scoped>
@import '@/styles';
.main {
  &__title {
    font-weight: var(--font-weight-bold);
    font-size: 18px;
    line-height: 26px;
    /* identical to box height, or 144% */
    letter-spacing: -0.01em;
    /* text/1 */
    color: var(--text-color-1);
    margin: 70px 0 16px 0;
    @include breakpoint-down-sm {
      font-size: 16px;
      margin: 20px 0 8px 0;
    }
  }
  &__content {
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    line-height: 26px;
    /* or 162% */
    letter-spacing: -0.01em;
    /* text/2 */
    color: var(--text-color-2);
    margin-bottom: 40px;
    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 20px;
    }
  }
}
.sub {
  &__title {
    font-weight: var(--font-weight-bold);
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    /* green/1 */
    color: var(--secondary-green-color-1);
    padding-bottom: 10px;
    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 17px;
      padding-bottom: 6px;
    }
    &:before {
      content: '';
      display: inline-block;
      -webkit-mask-image: url('@/assets/icon/task_alt_black_24dp.svg');
      mask-image: url('@/assets/icon/task_alt_black_24dp.svg');
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      mask-position: center center;
      width: 15px;
      height: 15px;
      mask-size: 15px;
      background-color: var(--secondary-green-color-1);
      margin-right: 7px;
      @include breakpoint-down-sm {
        width: 13px;
        height: 13px;
        mask-size: 13px;
        margin-right: 4px;
      }
    }
  }
  &__content {
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    line-height: 26px;
    /* or 162% */
    letter-spacing: -0.01em;
    /* text/2 */
    color: var(--text-color-2);
    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 22px;
    }
  }
  margin-bottom: 40px;
}
img.responsive {
  width: fill-available;
  width: -webkit-fill-available;
}
</style>
