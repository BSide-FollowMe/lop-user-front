<template>
  <div class="container">
    <section class="search-plant">
      <div class="inner-infinety-container">
        <img src="@/assets/images/home/quotes.svg" />
        <h1>
          <span class="accent text-bold">{{ nickname }}님,</span>
          <br />
          어떤
          <span class="accent text-bold">식물의 언어</span>
          가
          <br class="md-down-only" />
          궁금하신가요?
        </h1>
        <div class="searcher">
          <SearchBar
            v-model:modelValue="searchText"
            placeholder="식물의 이름 또는 궁금하신 점을 입력해주세요."
            :fontSize="{ pc: '25px', mobile: '16px' }"
            @submit="
              () => {
                onSubmit(searchText);
              }
            "
          />
        </div>
      </div>
    </section>
    <section class="recommend-plant">
      <div class="inner-infinety-container">
        <h1 class="text-light">
          NASA 선정🚀
          <br class="md-down-only" />
          <span class="text-bold">공기정화식물</span>
        </h1>
        <ul ref="slider" class="plant-list">
          <li class="item" v-for="(item, index) in recommended" :key="`item-${index}`" @click="ROUTE_TO.PLANT_DETAILS(item.id)">
            <div class="img-container">
              <img :src="item.fileUrl" @error="$event.target.src = require('@/assets/images/search/img-error.svg')" />
            </div>
            <span class="category" v-if="item.categoryTitle && item.categoryTitle != ''">
              {{ item.categoryTitle }}
            </span>
            <hr />
            <span class="plant-name text-light">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="guide-plant">
      <h1 class="text-light">
        초보 식집사를 위한
        <br />
        <span class="text-bold">돌봄 가이드</span>
      </h1>
      <div className="btn-group">
        <button @click="ROUTE_TO.GUIDE_WATTER">
          <img src="@/assets/icon/water-fall.svg" alt="" />
          <div>물 주기</div>
        </button>
        <button @click="ROUTE_TO.GUIDE_SUNLIGHT">
          <img src="@/assets/icon/sunrise.svg" alt="" />
          <div>햇빛</div>
        </button>
        <button @click="ROUTE_TO.GUIDE_VENTILATION">
          <img src="@/assets/icon/wind.svg" alt="" />
          <div>통풍</div>
        </button>
        <button @click="ROUTE_TO.GUIDE_BLIGHT">
          <img src="@/assets/icon/bug-eatting.svg" alt="" />
          <div>병충해</div>
        </button>
        <button class="large-button" @click="ROUTE_TO.QNABOARD">
          <span>직접 질문하기</span>
          <img src="@/assets/icon/question-feedback.svg" alt="" />
        </button>
      </div>
    </section>
    <!-- <ToTopButton class="to-top-btn" fixed /> -->
  </div>
</template>

<script lang="ts">
import setMeta from '@/utils/setMeta';
import { defineComponent, ref, computed } from 'vue';
// import ToTopButton from '@/components/buttons/ToTop.vue';
import { validateSearchStr } from '@/utils/validation';
import SearchBar from '@/components/search/SearchBar.vue';
import store from '@/store';
import { ROUTE_TO } from '@/router/routing';
import useHorizontalMouseScroll from '@/hooks/useHorizontalScroll';

import { getRecommendPlantList } from '@/api/plant';
export default defineComponent({
  name: 'Home',
  components: { SearchBar },
  setup() {
    const userInfo = computed(() => store.getters.getUserInfo);
    const nickname = computed(() => userInfo.value?.nickname || '식집사');
    const searchText = ref('');
    const recommended = ref([]);
    const slider = useHorizontalMouseScroll();
    setMeta({
      title: '식물의언어 : 식집사를 위한 식물 정보 플랫폼',
      description:
        '식물의언어는 식물을 더 건강하게 키우기 위한 정보를 제공하는 커뮤니티형 식물 정보 플랫폼입니다. 식물의언어를 통해 내 식물을 더 잘 이해하고, 수많은 식물집사들을 만나 서로의 노하우를 주고받아보세요.',
      path: '/home',
    });
    
    getRecommended();

    function clickToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function onSubmit(newVal: string) {
      const validateMsg = validateSearchStr(newVal);
      if (validateMsg) {
        alert(validateMsg);
        return;
      }
      ROUTE_TO.SEARCH_RESULT(newVal);
    }
    async function getRecommended() {
      try {
        const { data }: any = await getRecommendPlantList();
        recommended.value = data;
      } catch (e) {
        console.error(e);
      }
    }
    return {
      searchText,
      clickToTop,
      onSubmit,
      nickname,
      ROUTE_TO,
      recommended,
      slider,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.container,
.inner-infinety-container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  overflow: visible;
  @include breakpoint-down-sm {
    min-width: var(--m-content-container-max-width);
  }
}
.inner-infinety-container {
  padding: 0 var(--content-container-padding);
  @include breakpoint-down-sm {
    padding: 0 var(--m-content-container-padding);
  }
}
.search-plant {
  height: 617px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background: url('@/assets/images/home/bg-sun.svg') no-repeat 80% -70%;

  @include breakpoint-down-sm {
    height: 362px;
    background: url('@/assets/images/home/bg-sun.svg') no-repeat calc(100% + 30px) -20%;
    background-size: 215px;
  }

  img {
    width: 40px;
    height: 23px;
    margin-top: 138px;

    @include breakpoint-down-sm {
      width: 25px;
      height: 14px;
      margin-top: 70px;
    }
  }
  h1 {
    @include breakpoint-up-sm {
      margin-top: 20px;
      font-size: 50px;
      line-height: 65px;
    }
    margin-top: 10px;
    font-weight: var(--font-weight-light);
    line-height: 32px;
  }
  .accent {
    color: var(--secondary-green-color);
  }
  .searcher {
    width: 665px;
    margin-top: 106px;
    position: relative;
    padding: 10px 0 11px;
    border-bottom: 1px solid var(--text-color-1);
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    vertical-align: baseline;
    word-break: keep-all;
    transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @include breakpoint-down-sm {
      width: 100%;
      margin-top: 80px;
    }
    &:focus-within {
      border-color: var(--secondary-green-color-1);
    }
  }
}
.recommend-plant {
  height: 531px;
  background-color: var(--secondary-green-color-3);
  width: 100vw;
  padding-top: 20px;
  margin-left: calc(-50vw + 50%);

  @include breakpoint-down-sm {
    height: 438px;
  }
  h1 {
    color: #000;
    margin-top: 80px;
    @include breakpoint-down-sm {
      margin-top: 40px;
      line-height: 34px;
    }
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
      margin-top: 40px;
      margin-left: calc(var(--content-container-padding) * -1);
      margin-right: calc(var(--content-container-padding) * -1);

      padding: 0 var(--m-content-container-padding);
      &::-webkit-scrollbar {
        display: none;
      }
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
      @include breakpoint-down-md {
        margin: 0 15px 0 0;
        &:first-child {
          margin-left: 20px;
        }
        &:last-child {
          margin-right: 20px;
        }
        &:last-child:after {
          content: '';
          top: 0px;
          display: block;
          position: absolute;
          right: -40px;
          width: 40px;
          height: 1px;
        }
      }
      @include breakpoint-down-sm {
        margin: 0 15px 0 0;
        &:first-child {
          margin-left: 20px;
        }
        &:last-child {
          margin-right: 20px;
        }
        &:last-child:after {
          content: '';
          top: 0px;
          display: block;
          position: absolute;
          right: -40px;
          width: 40px;
          height: 40px;
        }
      }
      .img-container {
        height: 176px;
        width: 176px;
        overflow: hidden;
        border-radius: 4px;
        -webkit-user-drag: none;
        @include breakpoint-down-sm {
          height: 144px;
          width: 144px;
        }
        img {
          width: 100%;
          height: 100%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
      &:hover {
        img {
          transform: scale(1.1);
        }
      }
      .category {
        display: block;
        margin-top: 12px;
        color: var(--secondary-green-color-1);
        font-size: var(--font-size-caption);
        font-weight: 700;
      }
      hr {
        margin-top: 10px;
        margin-bottom: 0px;
        width: 12px;
        border: none;
        border-bottom: 1px solid var(--secondary-green-color-1);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .plant-name {
        display: block;
        margin-top: 5px;
        color: #323232;
        font-size: 20px;
        line-height: 24px;
        word-break: break-all;
        @include textOverflow(1);
        @include breakpoint-down-sm {
          font-size: 18px;
          line-height: 22px;
        }
      }
      &:hover hr {
        transform: scaleY(2);
        // border-bottom: 2px solid var(--secondary-green-color-1);
      }
    }
  }
}
.guide-plant {
  position: relative;
  height: 681px;
  padding: var(--content-container-padding);
  background: url('@/assets/images/home/guide-banner-image.svg') no-repeat 90% 45%;

  @include breakpoint-down-sm {
    height: 574px;
    padding: var(--m-content-container-padding);
    background: url('@/assets/images/home/guide-banner-image.svg') no-repeat 0 0;
    background-size: 260px 170px;
    background-position: bottom right;
  }

  h1 {
    color: #000;
    margin-top: 60px;
  }

  .btn-group {
    margin-top: 40px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 390px;
    margin-top: 66px;
    color: var(--text-color-2);

    @include breakpoint-down-sm {
      margin-top: 40px;
      margin-left: auto;
      margin-right: auto;
      gap: 16px;
      width: 320px;
    }

    button {
      cursor: pointer;
      height: 110px;
      width: 110px;
      border-radius: 25px;
      background-color: #f5f5f5;
      border: none;
      div {
        font-size: var(--font-size-p);
        font-weight: var(--font-weight-medium);
      }
      @include breakpoint-down-sm {
        height: 96px;
        width: 96px;
        border-radius: 20px;
        div {
          font-size: var(--m-font-size-p-2);
          line-height: 17px;
        }
      }
      img {
        width: 50px;
        transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        @include breakpoint-down-sm {
          width: 40px;
        }
      }
      transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      &:hover {
        background-color: var(--secondary-green-color);
        color: #fff;
        box-shadow: 5px 5px 20px rgba(114, 138, 106, 0.15);
        img {
          filter: brightness(0) invert(1);
        }
      }
    }
    .large-button {
      height: 110px;
      width: 240px;
      padding: 30px;
      border-radius: 25px;
      background-color: #f5f5f5;
      border: none;
      span {
        float: left;
        line-height: 50px;
        font-size: var(--font-size-p);
        font-weight: var(--font-weight-medium);
      }
      img {
        float: right;
      }
      @include breakpoint-down-sm {
        width: 208px;
        height: 96px;
        padding: 28px;
        span {
          font-size: var(--m-font-size-p-2);
          line-height: 40px;
        }
      }
    }
  }
}
.to-top-btn {
  // position: absolute;
  // bottom: 50px;
  // right: -50px;

  // @media (max-width: 1200px) {
  //   position:fixed;
  //   right: 20px;
  //   bottom: 20px;
  // }
}
</style>
