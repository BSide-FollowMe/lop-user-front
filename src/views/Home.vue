<template>
  <div class="container">
    <section class="search-plant">
      <div class="inner-infinety-container">
        <img src="@/assets/images/home/quotes.png" />
        <h1>
          <span class="accent text-bold">식집사님</span>
          환영합니다.
          <br />
          어떤
          <span class="accent text-bold">식물의 언어</span>
          가
          <br class="md-down-only" />
          궁금하신가요?
        </h1>
        <div class="searcher">
          <input id="searchText" type="text" v-model="searchText" :class="{ 'is-empty': searchText === '' }" />
          <label for="searchText">식물명 또는 카테고리를 입력하세요.</label>
          <button @click="onClickSubmit(searchText)"></button>
        </div>
      </div>
    </section>
    <section class="recommend-plant">
      <div class="inner-infinety-container">
        <h1 class="text-light">
          꽃 피는 봄에 함께하면
          <br class="md-down-only" />
          <span class="text-bold">좋을 식물</span>
        </h1>
        <ul class="plant-list">
          <li class="item" v-for="count in 5" :key="`item-${count}`">
            <img src="@/assets/images/home/sample-plant.png" />
            <span class="category">관엽식물</span>
            <hr />
            <span class="plant-name text-light">보로니아</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="guide-plant">
      <ToTopButton class="to-top-btn" />
      <h1 class="text-light">
        초보 식집사를 위한
        <br />
        <span class="text-bold">돌봄 가이드</span>
      </h1>
      <div class="btn-group">
        <button>
          <img src="@/assets/icon/water-fall.png" alt="" />
          <div>물 주기</div>
        </button>
        <button>
          <img src="@/assets/icon/sunrise.png" alt="" />
          <div>햇빛</div>
        </button>
        <button>
          <img src="@/assets/icon/wind.png" alt="" />
          <div>통풍</div>
        </button>
        <button>
          <img src="@/assets/icon/bug-eatting.png" alt="" />
          <div>병충해</div>
        </button>
        <button class="large-button">
          <span>직접 질문하기</span>
          <img src="@/assets/icon/question-feedback.png" alt="" />
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ToTopButton from '@/components/buttons/ToTop.vue';
import { validateSearchStr } from '@/utils/validation';
import router from '@/router';
export default defineComponent({
  name: 'Home',

  components: {
    ToTopButton,
  },
  setup() {
    const searchText = ref('');

    onMounted(() => {
      horizontalMouseScroll();
    });
    function horizontalMouseScroll() {
      const slider: any = document.querySelector('.plant-list');
      if (!slider) return;
      let isDown = false;
      let startX: any, scrollLeft: any;
      slider.addEventListener('mousedown', (e: any) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
      });
    }
    function clickToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function onClickSubmit(newVal: string) {
      const validateMsg = validateSearchStr(newVal);
      if (validateMsg) {
        alert(validateMsg);
        return;
      }
      router.push('/search?q=' + newVal);
    }
    return {
      searchText,
      clickToTop,
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
  background: url('@/assets/images/home/bg-sun.png') no-repeat 80% -20%;

  @include breakpoint-down-sm {
    height: 362px;
    background: url('@/assets/images/home/bg-sun.png') no-repeat calc(100% + 30px) -20%;
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
    button {
      content: '';
    position: absolute;
    height: 50px;
    width: 50px;
    background-image: url('@/assets/icon/magnifier.png');
    background-size: 100%;
    cursor:pointer;
    z-index:2;
    border:none;
    background-color:transparent;
    transform: translateX(-100%);

      @include breakpoint-down-sm {
        width: 36px;
        height: 36px;
      }
    }

    &:focus-within {
      border-color: var(--secondary-green-color-1);
    }
    input {
      position: relative;
      height: 40px;
      z-index: 1;
      border: 0;
      padding: 0;
      outline: 0;
      background-color: transparent;
      font-size: 25px;
      line-height: 35px;
      width: 100%;

      &:focus + label {
        display: none;
      }
      &:not(.is-empty) + label {
        display: none;
      }

      @include breakpoint-down-sm {
        height: 26px;
        font-size: var(--font-size-p);
      }
    }

    label {
      pointer-events: none;
      font-size: 25px;
      line-height: 35px;
      color: var(--background-color-1);
      position: absolute;
      bottom: 3px;
      left: 0;
      top: 11px;

      @include breakpoint-down-sm {
        height: 26px;
        font-size: var(--font-size-p);
      }
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
      margin: 40px calc(var(--content-container-padding) * -1) 0 calc(var(--content-container-padding) * -1);
      padding: 0 var(--m-content-container-padding);
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
      @include breakpoint-down-sm {
        margin: 0 15px 0 0;
        &:first-child {
          margin-left: 20px;
        }
        &:last-child {
          margin-right: 20px;
        }
      }

      img {
        height: 176px;
        width: 176px;
        border-radius: 4px;
        -webkit-user-drag: none;
        @include breakpoint-down-sm {
          height: 144px;
          width: 144px;
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
        border-bottom: 1px solid #599270;
      }
      .plant-name {
        display: block;
        margin-top: 5px;
        color: #323232;
        font-size: 20px;
        line-height: 24px;
        @include breakpoint-down-sm {
          font-size: 18px;
          line-height: 22px;
        }
      }
      &:hover hr {
        border-bottom: 2px solid #599270;
      }
    }
  }
}
.guide-plant {
  position: relative;
  height: 681px;
  padding: var(--content-container-padding);
  background: url('@/assets/images/home/guide-banner-image.png') no-repeat 90% 45%;

  @include breakpoint-down-sm {
    height: 574px;
    padding: var(--m-content-container-padding);
    background: url('@/assets/images/home/guide-banner-image.png') no-repeat 0 0;
    background-size: 260px 170px;
    background-position: bottom right;
  }

  h1 {
    color: #000;
    margin-top: 60px;
  }

  .btn-group {
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
  .to-top-btn {
    position: absolute;
    bottom: 50px;
    right: -50px;

    @media (max-width: 1200px) {
      right: 20px;
      top: -25px;
    }
  }
}
</style>
