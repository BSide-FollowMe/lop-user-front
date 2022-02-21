<template>
  <GuideLayout :bannerImage="`url(${bannerImage})`" title="식물이 아플 때">
    <section>
      <div class="main__title">아픈 식물을 위한 병충해 처방전</div>
      <div class="main__content">
        정성을 다해 돌봐주어도 식물이 병들거나 해충이 생길 수 있어요. 식물이 자주 걸리는 병의 원인에 따라 어떻게 대처하면 좋을지 알려드릴게요.
      </div>
      <div v-for="(blight, index) in blights" :key="`blight_${index}`" class="dropdown" @click="openDetail(index)">
        <div :class="`dropdown__title ${index===openedIndex ? 'active':''}` ">{{ blight.title }}<img class="dropdown__arrow" src="@/assets/icon/dropdown-arrow.svg"/></div>
        
        <div v-if="index===openedIndex" class="dropdown__detail">
          <div class="description">
            {{ blight.description }}
          </div>
          <section>
            <div class="sub__title">확인법</div>
            <div class="sub__content">
              {{ blight.inspect }}
            </div>
          </section>
          <section>
            <div class="sub__title">이렇게 치료하세요</div>
            <div class="sub__content">
              {{ blight.therapy }}
            </div>
          </section>
        </div>
      </div>
    </section>
  </GuideLayout>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import GuideLayout from './Index.vue';
import bannerImage from '@/assets/images/guide/bg-blightguide.png';

const blights = [
  {
    title: '깍지벌레(개각충)',
    description:
      '깍지벌레는 줄기나 가지, 잎에 기생하는 해충으로, 식물의 즙액을 빨아먹어요. 줄기나 가지와 비슷한 보호색을 띠고, 딱딱하고 반들반들한 껍질을 가졌어요. 크기가 3~5mm로 작고 움직임이 없어 얼핏 봐서는 벌레라고 인식하지 못할 수 있어요.',
    inspect:
      '잎 또는 줄기 군데군데가 검게 변하거나 잎이 노랗게 변해 떨어진다면 깍지벌레를 의심해 보세요. 끈적이는 설탕물 같은 액체가 잎이나 화분 근처에 묻어있기도 해요.',
    therapy:
      '깍지벌레를 발견하면 식물에 붙은 벌레를 다 잡아주신 후에 약을 뿌려주세요. 손으로 다 제거하기가 어렵다면 이미 깍지벌레가 퍼져있는 줄기나 잎을 잘라주시는 것도 도움이 돼요.',
  },
  {
    title: '응애',
    description:
      '응애는 식물의 줄기나 잎에서 세포액을 빨아들여 식물의 생장을 방해하는 해충이에요. 거미처럼 생겼지만 아주 작아서 우리 눈에는 흰 점처럼 보여요.',
    inspect: '잎과 줄기에 작은 거미줄을 치는 특징이 있어요. 작은 거미줄이 잎 주변에 보인다면 응애를 의심해 보세요.',
    therapy:
      '응애가 확인되면 식물 곳곳을 세심하게 닦아 깨끗하게 만들어주신 후에 약을 뿌려주세요. 살비제는 5일에 한 번, 3~4회 정도 식물 전체가 흠뻑 젖을 정도로 골고루 뿌려주세요. 약에 내성이 생기기 쉬우니 두세 종류의 살비제를 번갈아 가며 뿌려주시는 것이 좋아요.',
  },
  {
    title: '진딧물',
    description:
      '진딧물은 2~4mm의 작은 크기로, 식물의 즙액을 빨아들이고 병해를 유발하는 해충이에요. 주로 새순이나 여린 잎의 뒷면에 붙어사는 경우가 많습니다. 번식력이 높아서 초기에 발견해 박멸하는 것이 중요해요.',
    inspect: '식물의 즙액을 빨아먹고 끈적끈적한 진액을 배출해요. 이파리에 끈적한 액체가 묻어있고, 흰 가루가 보이면 진딧물을 의심해 볼 수 있어요.',
    therapy:
      '증상이 심하지 않다면 우유, 은행잎을 갈아 만든 액체 등을 진딧물이 있는 곳에 뿌려 주세요. 진딧물이 많이 번식한 경우는 농약 두세 개를 번갈아 가며 뿌려 주시는 것이 좋아요.',
  },
  {
    title: '온실가루이',
    description: '온실가루이는 하얗고 작은 날벌레예요. 잎의 즙액을 빨아들여 생장을 방해하고, 배설물은 그을음병을 유발합니다.',
    inspect: '주로 잎의 뒷면에 서식하기 때문에 잎을 흔들어 하얀 성충이 날아가는지 확인해 보는 것이 좋아요.',
    therapy: '온실가루이를 발견했다면 친환경 관리제와 농약을 7~10일 간격으로 살포해 주세요. 이때 약제가 잎의 뒷면에도 골고루 묻도록 신경 써주세요.',
  },
  {
    title: '뿌리파리',
    description:
      '뿌리파리는 1~2mm 크기로 아주 작은 파리류에 속하는 해충이에요. 수분이 많은 곳을 좋아해서 습도가 높은 곳에서 잘 번식해요. 뿌리에 알을 낳는데, 유충이 뿌리 부분에 서식하면서 피해를 주기 때문에 뿌리의 발달에 좋지 않고, 생장에 방해가 될 수 있어요.',
    inspect:
      '손이 스쳐도 멀리 날아가지 않고 모기처럼 가는 벌레가 있다면 뿌리파리를 의심해 보세요. 흙 속에 몸이 투명한 애벌레가 있다면 뿌리파리의 유충일 가능성이 커요.',
    therapy:
      '뿌리파리가 생기지 않게 하려면 통풍에 신경 써주시고, 곰팡이가 생기지 않게 주의해 주세요. 이미 발견했다면 노란색 끈끈이 트랩과 농약으로 제거할 수 있어요.',
  },
  {
    title: '총채벌레',
    description:
      '총채벌레는 갈색을 띠는 1~2mm 크기의 아주 작고 길쭉한 해충이에요. 주로 잎 뒷면에서 떼를 지어 다니며 잎을 갉아먹어요. 흙 속에 번데기와 유충이 있어서 완전히 박멸하기가 어려운 해충이에요.',
    inspect:
      '유충은 반투명한 흰색인데 화분에 물을 주면 흙 위로 떠 오르거나 화분 받침에서 발견할 수 있어요. 꽃이나 잎 아래에 하얀색 종이를 놓고 툭툭 털어 벌레가 있는지 확인해 보세요.',
    therapy: '번식력이 높아서 성충을 발견하면 빠르게 농약을 뿌려줘야 해요. 농약 두세 개를 번갈아 가며 살포해 주는 것이 좋아요.',
  },
  {
    title: '흰가루병',
    description: '흰가루병은 식물의 잎과 줄기에 밀가루를 뿌린 것 같은 증상이 나타나는 병이에요.',
    inspect: '광합성을 하지 못해 잎이 노랗게 변하거나 말라버리고, 잎에 회색의 점무늬나 가루 모양의 곰팡이가 생기는 것으로 확인할 수 있어요.',
    therapy:
      '통풍이 잘 안되거나 습한 곳에서 발생하기 쉬우니 통풍에 신경 써주세요. 흰가루병을 없애려면 살균제를 써야 하는데, 살균제에 내성이 잘 생기기 때문에 효과 있는 살균제 두세 개를 번갈아 가며 사용하는 것이 좋아요.',
  },
  {
    title: '뿌리썩음병',
    description:
      '뿌리썩음병은 말 그대로 식물의 뿌리가 썩어 서서히 죽게 되는 병이에요. 고온다습한 환경 또는 여름과 겨울에 자주 발병하는 특징이 있어요.',
    inspect: '잎이 노랗게 변하거나 떨어지고 서서히 말라가고 있다면 뿌리썩음병을 의심해 보세요.',
    therapy:
      '병의 진행 속도가 빨라서 증상이 발현되면 병든 식물을 빨리 제거해 주어야 해요. 이때 감염된 식물의 화분, 흙, 원예 도구를 통해 다른 식물에 병이 옮지 않도록 주의해 주세요.',
  },
];
export default defineComponent({
  components: {
    GuideLayout,
  },
  setup() {
    // console.log(bannerImage);
    const openedIndex = ref(-1);
    const openDetail = (index:number) =>{
      openedIndex.value = openedIndex.value===index ? -1 : index;
    }
    return {
      blights,
      bannerImage,
      openDetail,
      openedIndex,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/';
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
.blight {
  padding: 60px 0 60px 0;
  border-bottom: 1px solid #e5e5e5;
  &__title {
    font-weight: var(--font-weight-bold);
    font-size: 20px;
    line-height: 26px;
    /* identical to box height, or 130% */
    letter-spacing: -0.01em;
    /* text/1 */
    color: var(--text-color-1);
    margin-bottom: 16px;
    @include breakpoint-down-sm {
      font-size: 16px;
      margin-bottom: 6px;
    }
  }
  &__description {
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    line-height: 26px;
    /* or 162% */
    letter-spacing: -0.01em;
    /* text/2 */
    color: var(--text-color-2);
    margin-bottom: 30px;
    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 30px;
    }
  }
  .sub {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
    > section {
      flex-basis: 460px;
      flex-grow: 1;
    }
    @include breakpoint-down-sm {
      > section {
        flex-basis: auto;
      }
      flex-direction: column;
      gap: 20px;
    }
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
  }
}
.dropdown{
  cursor:pointer;
  &__title{
    display:flex;
    justify-content:space-between;
    padding: 20px 0 20px 0;
    border-top:1px solid #BABABA;
    font-weight: var(--font-weight-meidum);
    font-size: 18px;
    line-height: 26px;
    /* identical to box height, or 144% */

    letter-spacing: -0.01em;

    /* text/1 */

    color: var(--text-color-1);
    &.active{
      font-weight: var(--font-weight-bold);
      .dropdown__arrow{
         transform: rotate(180deg);
      }
    }
  }
  
  &__detail{
    >*:not(:last-child){
      margin-bottom:20px;
    }
    padding: 40px 20px 40px 20px;
    background-color: var(--background-color-5);
    .description{
      font-weight: var(--font-weight-medium);
      font-size: 16px;
      line-height: 26px;
      /* or 162% */

      text-align: justify;
      letter-spacing: -0.01em;

      /* text/2 */

      color: var(--text-color-2);
    }
    .sub{
      &__title{
        font-weight: var(--font-weight-bold);
        margin-bottom:8px;
      }
      &__content{
        font-weight: var(--font-weight-medium)
      }
      
      font-size: 16px;
      line-height: 26px;
      /* or 162% */

      letter-spacing: -0.01em;

      /* text/2 */

      color: var(--text-color-2);
    }

  }
}
</style>
