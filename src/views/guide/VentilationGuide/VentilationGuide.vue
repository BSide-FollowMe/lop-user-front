<template>
  <section class="ventilation">
    <div class="main__title">실내 식물에게도 신선한 공기가 필요해요</div>
    <div class="main__content">
      실내에서 식물을 키울 때 간과하기 쉬운 것이 바로 통풍인데요. 집안에서 자라는 식물뿐만 아니라 베란다에 서 자라는 식물에게도 바람은 없어서는 안 될
      존재랍니다. 내 식물을 더 건강하게 키우려면 주기적으로 창문을 열어 환기해 주고,선풍기나 서큘레이 터를 이용해 공기가 잘 순환될 수 있도록 하는 것이
      정말 중요합니다.
    </div>

    <div class="main__title">통풍이 필요한 세 가지 이유</div>
    <section class="sub">
      <div class="sub__title">식물이 더 잘 숨 쉴 수 있게 해줘요.</div>
      <div class="sub__content">
        식물은 이산화탄소로 숨을 쉬고 산소를 배출해요. 그러니 공기가 정체된 실내에서는 식물 주위에 이산화탄소가 부족해 숨을 쉴 수가 없어요. 스스로
        움직일 수 없는 식물을 대신해 바람이 이산화탄소를 식물 가까이에 가져다주는 거죠.
      </div>
    </section>
    <section class="sub">
      <div class="sub__title">흙을 뽀송뽀송하게 만들어줘요.</div>
      <div class="sub__content">
        흙이 축축한 상태로 오래 유지되면 과습으로 뿌리가 썩거나 곰팡이가 생길 수 있어요. 바람으로 흙을 잘 말려주어야 뽀송뽀송한 흙에서 식물이 더
        건강히 자란답니다.
      </div>
    </section>
    <section class="sub">
      <div class="sub__title">증산작용을 도와줘요.</div>
      <div class="sub__content">
        식물도 사람처럼 먹은 것을 잘 배출해야 또다시 먹을 수 있어요. 이렇게 식물이 뿌리로 마신 물을 잎으로 내뱉는 것을 증산작용이라고 하는데요. 잎으로
        배출한 수분을 빠르게 말려줘야 식물의 몸속 순환이 잘 될 수 있어요.
      </div>
    </section>
  </section>
  <section class="tip">
    <div class="tip__title">
      <img src="@/assets/icon/lightbulb_black_24dp.svg" />
      Tip
    </div>
    <div class="tip__content">
      겨울에는 따뜻한 낮 시간에 10분 정도만 환기하면 충분해요!
      <br />
      선풍기나 서큘레이터를 사용할 때는 바람이 식물에 직접적으로 닿지 않도록 식물 주변을 향하게 해주세요.
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup(){
    return{}
  }
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
    margin-bottom: 16px;
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
.tip {
  width:100%;
  padding: 28px 44px 30px 44px;

  /* green/3-bg */

  background: var(--secondary-green-color-3);
  border-radius: 4px;
  display: flex;
  margin-bottom: 60px;
  @include breakpoint-down-sm {
    display: inline-block;
    padding: 10px 11px 10px 11px;
  }
  &__title {
    margin-right: 30px;
    img {
      margin-right: 7px;
      vertical-align: text-top;
      @include breakpoint-down-sm {
        width: 12px;
        height: 16px;
      }
    }
    font-weight: var(--font-weight-bold);
    font-size: 18px;
    line-height: 18px;
    /* or 100% */

    letter-spacing: -0.01em;

    /* deepgreen/1-main */

    color: var(--primary-color-1);
    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 10px;
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
      font-size: 12px;
      line-height: 18px;
    }
  }
}
</style>
