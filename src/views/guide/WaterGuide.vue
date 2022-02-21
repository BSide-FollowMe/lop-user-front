<template>
  <GuideLayout :bannerImage="`url(${bannerImage})`" title="식물이 좋아하는 물 주기 방법">
    <section class="soil">
      <div class="main__title">내 식물, 정말 목이 마른 걸까요?</div>
      <div class="main__content">
        식물에게 정말 필요한 만큼의 물을 주기 위해서는 흙이 얼마나 말랐는지를 확인해야 해요. 같은 식물이라도 계절이나, 자라는 환경에 따라 필요한 물의
        양이 다르기 때문입니다. ‘며칠에 한 번’처럼 주기적으로 물을 주는 방식에 익숙할 수 있겠지만, 이제는 흙의 상태를 확인해 내 식물이 정말로 목마르다
        말하고 있는지를 들어보세요. 흙이 너무 마르면 뿌리까지 말라버리고, 흙이 계속 축축하면 흙 속에 산소가 머무를 공간이 없어 뿌리가 썩어버리거든요.
      </div>

      <div class="main__title">흙 마름을 확인하려면 이렇게 하세요.</div>
      <div class="main__content">
        겉흙이 말랐을 때 물을 주어야 하는 식물이 있고, 속흙이 말랐을 때 물을 주어야 하는 식물이 있어요. 내 식물이 언제 목말라하는지를 알았다면
        가이드에 따라 흙이 마른 정도를 확인해 보세요.
      </div>
      <section class="sub">
        <div class="sub__title">겉흙 마름 : 손가락으로 확인하기</div>
        <div class="sub__content">
          겉흙이 마른 것은 눈으로도 확인할 수 있지만, 손가락으로 흙 윗부분을 살짝 팠을 때 촉촉한 느낌이 없고, 손가락에 흙이 묻어나지 않는다면 겉흙이
          마른 거예요. 흙 윗부분이 마사(입자가 굵은 모래), 자갈 등으로 덮여있다면 걷어내고 손가락으로 확인하는 것을 추천해요.
        </div>
        <img class="outter_soil-image" src="@/assets/images/guide/겉흙마름1.png" />
      </section>
      <section class="sub">
        <div class="sub__title">속흙 마름 : 나무젓가락으로 확인하기</div>
        <div class="sub__content">
          화분 가장자리에 나무젓가락을 깊숙이 꽂고 어느 정도 기다렸다 빼보세요. 젓가락 끝부분에만 흙이 묻어 나오면 속흙이 마른 거예요.
          <br />
          흙이 아직 마르지 않았다면 젓가락이 젖어 색이 변하고, 흙이 전체적으로 묻어 나올 거랍니다.
        </div>

        <img class="inner_soil-image" src="@/assets/images/guide/속흙마름1.png" />
      </section>
    </section>
    <div class="dot-divider"><img src="@/assets/dot-divider.svg" /></div>
    <section class="know-how">
      <div class="main__title">물을 주는 것에도 노하우가 있다고요?</div>
      <div class="main__content">
        필요한 만큼 물을 주는 것도 중요하지만, 식물이 좋아하는 방식으로 물을 주는 것도 중요해요. 초보 식집사라면 놓치기 쉬운 물 주기 팁! 내 식물이 더
        건강하게 자랄 수 있도록 꼭 기억해두세요.
      </div>
      <section class="sub-group">
        <section class="sub">
          <div class="sub__title">
            어떤 물을 줘야 하나요?
          </div>
          <div class="sub__content">
            1~2일 전에 받아 실내에 둔 수돗물을 주는 게 가장 좋아요.그 과정에서 수돗물의 염소 성분이 휘발되고, 물 온도도 실온과 비슷해지거든요. 식물의
            뿌리는 예민해서 물이 너무 차가우면 뿌리가 영양분을 흡수하기 힘들고, 물의 온도가 높으면 물속의 산소가 부족해 식물이 아플 수 있어요. 정수된
            물은 식물에게 도움이 되는 성분까지 걸러지기 때문에 식물에 좋지 않아요. 같은 원리로 가끔은 깨끗한 용기에 받은 빗물을 주는 것도 좋아요.
            빗물에는 인위적인 환경에서 얻기 힘든 영양소가 많이 들어있답니다.
          </div>
        </section>
        <section class="sub">
          <div class="sub__title">
            물을 주기 적절한 시간이 있나요?
          </div>
          <div class="sub__content">
            오전에 물을 주는게 좋아요.대체로 식물은 햇빛이 있을 때 물을 더 필요로 하기 때문이에요. 밤에는 물이 잘 마르지 않아 과습이 될 위험도 있고요.
            여름철에는 햇빛이 뜨거운 정오를 피해서 이른 아침 또는 저녁에 물을 주는 게 좋아요. 잎에 맺힌 물방울이 돋보기 역할을 해서 잎이 화상을 입을
            수 있거든요. 겨울철에는 이른 아침부터 정오 사이가 물주기 가장 좋은 시간입니다. 너무 추울 때 물을 주면 냉해를 입을 수 있어요.
          </div>
        </section>
        <section class="sub">
          <div class="sub__title">
            물을 어떻게 줘야 하나요?
          </div>
          <div class="sub__content">
            약한 물줄기로 화분 전체에 골고루 천천히 주세요. 물은 화분 밑으로 빠져나올 때까지 흠뻑 주는 게 좋고, 빠져나온 물은 고여있지 않도록 신경
            써주세요. 화분 받침에 물이 고여 있으면 뿌리가 상할 수 있거든요. 배수가 잘 되지 않아 흙 위에 물이 고여있다면, 나무젓가락으로 흙을 여러 번
            찔러주세요. 흙 속에 산소도 공급하고 배수에도 도움이 될 거예요.
          </div>
          <img src="@/assets/images/guide/물주기1_1.png" />
        </section>
        <section class="sub">
          <div class="sub__title">
            저면관수는 어떻게 하나요?
          </div>
          <div class="sub__content">
            저면관수는 아래로부터 물을 줘서 식물의 뿌리가 스스로 물을 빨아들이게 만드는 물주기 방식이에요. 큰 용기나 욕조에 화분이 1/3 정도 잠기도록
            물을 채워서, 식물의 겉흙이 촉촉해지면 꺼내주세요. 가끔 저면관수로 물을 주면 뿌리가 골고루 물을 머금어서 더 건강하게 자랄 수 있는데요.
            위에서 물을 뿌리는 방식으로만 물을 주면 화분 안에 물길이 생겨 물이 닿지 않는 곳이 생길 수 있기 때문이에요.
          </div>
          <img src="@/assets/images/guide/물주기1_2.png" />
        </section>
      </section>
    </section>
    <section class="tip">
      <div class="tip__title">
        <img src="@/assets/icon/lightbulb_black_24dp.svg" />
        Tip
      </div>
      <ul class="tip__list">
        <li>저면관수로만 물을 주는 것은 좋지 않아요. 물이 위에서 아래로 흐르지 않아 흙 속의 노폐물을 내보낼 수 없거든요.</li>
        <li>저면관수로 물을 준 후에는 뿌리가 썩지 않도록 꼭 통풍이 잘 되는 곳에 화분을 놓아주세요.</li>
        <li>습도가 높을 때나 겨울에는 과습의 위험이 있으니 저면관수를 피해주세요.</li>
      </ul>
    </section>
  </GuideLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import GuideLayout from './Index.vue';
import bannerImage from '@/assets/images/guide/bg-waterguide.png';

export default defineComponent({
  components: {
    GuideLayout,
  },
  setup() {
    // console.log(bannerImage);
    return {
      bannerImage,
    };
  },
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
    @include breakpoint-down-sm{
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
    @include breakpoint-down-sm{
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 20px;
    }
  }
}
.sub-group {
  margin: 40px 0 60px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  @include breakpoint-down-sm{
    gap:40px;
  }
  .sub {
    width: 450px;
    position: relative;
    margin-bottom: 0;
    @include breakpoint-up-md {
      /* line between flex gap */
      &:first-child {
        &:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -30px;
          height: 0;
          width: 450px; /* or 100px */
          border-bottom: 1px solid #e5e5e5;
        }
        &:after {
          content: '';
          position: absolute;
          right: -30px;
          top: 0px;
          height: 207px;
          width: 0; /* or 100px */
          border-right: 1px solid #e5e5e5;
        }
      }
      &:last-child {
        &:before {
          content: '';
          position: absolute;
          right: 0;
          top: -30px;
          height: 0;
          width: 450px; /* or 100px */
          border-top: 1px solid #e5e5e5;
        }
        &:after {
          content: '';
          position: absolute;
          left: -30px;
          bottom: 0px;
          height: 490px;
          width: 0; /* or 100px */
          border-left: 1px solid #e5e5e5;
        }
      }
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
    @include breakpoint-down-sm{
      font-size: 14px;
      line-height: 17px;
      padding-bottom: 6px;
    }
    &:before{
      content:"";
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
      @include breakpoint-down-sm{
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
    @include breakpoint-down-sm{
      font-size: 14px;
      line-height: 22px;
    }
  }

  margin-bottom: 40px;
}
.tip {
  max-width: 959px;
  padding: 28px 44px 30px 44px;

  /* green/3-bg */

  background: var(--secondary-green-color-3);
  border-radius: 4px;
  display: flex;
  margin-bottom: 60px;
  @include breakpoint-down-sm{
    display:inline-block;
    padding: 10px 11px 10px 21px;
  }
  &__title {
    margin-right: 38px;
    img {
      margin-right: 7px;
      vertical-align: text-top;
      @include breakpoint-down-sm{
        width:12px;
        height:16px;
      }
    }
    font-weight: var(--font-weight-bold);
    font-size: 18px;
    line-height: 18px;
    /* or 100% */

    letter-spacing: -0.01em;

    /* deepgreen/1-main */

    color: var(--primary-color-1);
    @include breakpoint-down-sm{
      font-size: 14px;
      line-height: 16px;
      margin-left:-7px;
      margin-bottom:10px;
    }
  }
  &__list {
    li {
      list-style: disc;
      font-weight: var(--font-weight-medium);
      font-size: 16px;
      line-height: 24px;
      /* identical to box height, or 150% */

      letter-spacing: -0.01em;

      /* text/2 */

      color: var(--text-color-2);
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      @include breakpoint-down-sm{
        font-size: 12px;
        line-height: 18px;
        margin-bottom:4px;
        &:not(:last-child) {
          margin-bottom: 4px;
        }
      }
    }
  }
}
.task_alt-icon {
  
}
.dot-divider {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  @include breakpoint-down-sm{
    height:130px;
  }
}
.outter_soil-image,
.inner_soil-image {
  width: fill-available;
  width: -webkit-fill-available;
}
</style>
