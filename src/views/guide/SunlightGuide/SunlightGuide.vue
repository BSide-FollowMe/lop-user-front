<template>
  <section class="sunlight">
    <div class="main__title">식물마다 선호하는 빛의 양이 다르다구요?</div>
    <div class="main__content">
      식물마다 건강하게 자라는데 필요한 햇빛의 양이 있어요. 어떤 식물은 강한 햇빛을 좋아해서, 빛이 부족하면 햇빛을 찾아서 키만 커지기도 하고요. 또
      어떤 식물은 부드러운 빛을 좋아해서, 너무 강한 빛을 비추면 잎이 타버리기도 해요. 그렇기 때문에 내 식물이 원하는 빛의 양을 잘 알고 적당한 위치에
      놓아주는 것이 중요합니다.
    </div>
    <div class="main__title">우리 집의 양지와 음지 알아보기</div>
    <div class="main__content">
      안에서도 공간에 따라 햇빛의 양이 다른데요.
      <br />
      흔히 양지, 반양지, 반음지로 나눠 구분하고 있어요. 우리 집의 양지와 음지는 어디인지 알아볼 수 있는 구별법을 알려 드릴게요.
      <br />
      설명을 읽어봐도 판단하기 어렵다면 조도계 앱의 도움을 받아보세요. 식물을 놓을 장소를 카메라로 비춰보면 그 장소의 조도를 Lux 수치로 알려준답니다.
    </div>
    <img class="responsive measure-image" src="@/assets/images/guide/양지음지1.png" />
  </section>
  <div class="warning">햇빛이 잘 들어오는 오후 시간대에 측정한 수치를 기준으로 하세요</div>
  <section class="sub-group">
    <section class="sub">
      <div class="icon direct-sunlight" />
      <div>
        <div class="sub__title">직사광선</div>
        <div class="sub__content">
          유리창을 포함한 어떤 것도 거치지 않고 바로 쬐는 빛이에요. 식물을 실외에서 키우는 경우에 해당돼요.
          <div class="sub__content__detail">
            <div class="label">조도계 기준</div>
            <div class="value">30,000 ~ 100,000 Lux</div>
          </div>
        </div>
      </div>
    </section>
    <section class="sub">
      <div class="icon sunny-spot" />
      <div>
        <div class="sub__title">양지</div>
        <div class="sub__content">
          하루에 5시간 이상 빛을 받을 수 있는 곳으로, 유리창을 거친 햇빛이 집 안에서 가장 강하게 내리쬐는 곳이에요. 식물을 베란다 창쪽 또는 창가에
          두시면 좋아요.
          <div class="sub__content__detail">
            <div class="label">조도계 기준</div>
            <div class="value">10,000 ~ 30,000 Lux</div>
          </div>
        </div>
      </div>
    </section>
    <section class="sub">
      <div class="icon semi-sunny-spot" />
      <div>
        <div class="sub__title">반양지</div>
        <div class="sub__content">
          겨울에도 하루에 2시간 이상의 빛을 받을 수 있는 곳이에요. 식물을 베란다 안쪽 또는 거실 창쪽에 두시면 좋아요.
          <div class="sub__content__detail">
            <div class="label">조도계 기준</div>
            <div class="value">5,000 ~ 10,000 Lux</div>
          </div>
        </div>
      </div>
    </section>
    <section class="sub">
      <div class="icon semi-shady-spot" />
      <div>
        <div class="sub__title">반음지</div>
        <div class="sub__content">
          햇빛이 직접 닿지는 않지만, 간접적인 빛을 하루에 3시간 정도 받을 수 있는 밝은 곳이에요. 커튼이나 다른 식물을 거쳐 들어오는 햇빛을 받는
          곳이기도 해요. 식물을 거실 창 쪽이나 안쪽에 두시면 좋아요.
          <div class="sub__content__detail">
            <div class="label">조도계 기준</div>
            <div class="value">2,000 ~ 5,000 Lux</div>
          </div>
        </div>
      </div>
    </section>
    <section class="sub">
      <div class="icon shady-spot" />
      <div>
        <div class="sub__title">음지</div>
        <div class="sub__content">
          옅은 빛이 하루에 2시간 이하로 들어오는 그늘진 곳이에요. 음지라도 연한 그림자가 지는 정도의 빛은 꼭 필요해요.
          <br />
          가끔은 반음지에서 빛을 쬐여주면 좋아요.
          <div class="sub__content__detail">
            <div class="label">조도계 기준</div>
            <div class="value">2,000 ~ 5,000 Lux</div>
          </div>
        </div>
      </div>
    </section>
  </section>
  <section class="tip">
    <div class="tip__title">
      <img src="@/assets/icon/lightbulb_black_24dp.svg" />
      Tip
    </div>
    <div class="tip__content">‘식물생장등’을 이용한다면 햇빛이 오래 들지 않는 집이더라도 식물을 건강하게 키울 수 있어요.</div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style lang="scss" scoped>
@import '@/styles';
.sunlight {
  margin-bottom: 50px;
  @include breakpoint-down-sm {
    margin-bottom: 21px;
  }
}
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
.warning {
  font-weight: var(--font-weight-medium);
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */
  letter-spacing: -0.01em;
  /* green/1 */
  color: var(--secondary-green-color-1);
  &:before {
    content: '※';
  }
}
.sub-group {
  margin: 40px 0 60px 0;
  @include breakpoint-down-sm {
    margin: 20px 0 30px 0;
  }
  .sub {
    display: flex;
    margin-bottom: 31px;
    gap: 40px;
    font-size: 16px;
    line-height: 26px;
    @include breakpoint-down-sm {
      gap: 10px;
      font-size: 13px;
      line-height: 18px;
    }
    .icon {
      align-self: center;
      min-width: 84px;
      height: 84px;
      @include breakpoint-down-sm {
        align-self: start;
        min-width: 48px;
        height: 48px;
        border-radius: 15px;
      }
      /* bg,line/4 */
      background: var(--background-color-4);
      border-radius: 25px;
      &.direct-sunlight {
        background-image: url('@/assets/images/guide/direct-sunlight.svg');
        background-repeat: no-repeat;
        background-position: center center;
      }
      &.sunny-spot {
        background-image: url('@/assets/images/guide/sunny-spot.svg');
        background-repeat: no-repeat;
        background-position: center center;
      }
      &.semi-sunny-spot {
        background-image: url('@/assets/images/guide/semi-sunny-spot.svg');
        background-repeat: no-repeat;
        background-position: center center;
      }
      &.semi-shady-spot {
        background-image: url('@/assets/images/guide/semi-shady-spot.svg');
        background-repeat: no-repeat;
        background-position: center center;
      }
      &.shady-spot {
        background-image: url('@/assets/images/guide/shady-spot.svg');
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    &__title {
      font-weight: var(--font-weight-bold);
      letter-spacing: -0.01em;
      color: var(--text-color-1);
      @include breakpoint-down-sm {
        font-size: 13px;
        line-height: 13px;
        padding-bottom: 4px;
      }
    }
    &__content {
      font-weight: var(--font-weight-medium);
      color: var(--text-color-2);
      @include breakpoint-down-sm {
        font-size: 14px;
        line-height: 22px;
      }
      &__detail {
        display: flex;
        .label {
          font-weight: var(--font-weight-medium);
          line-height: 30px;
          color: var(--text-color-2);
          flex: none;
          order: 0;
          flex-grow: 0;
          &:after {
            content: '';
            margin-left: 10px;
            height: 12px;
            border-right: 1px solid #dddddd;
          }
        }
        .value {
          font-weight: var(--font-weight-medium);
          line-height: 30px;
          color: var(--secondary-green-color-1);
          flex: none;
          order: 2;
          flex-grow: 0;
          margin: 0px 10px;
        }
      }
    }
  }
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
img.responsive {
  width: fill-available;
  width: -webkit-fill-available;
}
</style>
