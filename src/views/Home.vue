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
          가 궁금하신가요?
        </h1>
        <div class="searcher">
          <input id="searchText" type="text" v-model="searchText" :class="{ 'is-empty': searchText === '' }" />
          <label for="searchText">식물명 또는 카테고리를 입력하세요.</label>
        </div>
      </div>
    </section>
    <section class="recommend-plant">
      <div class="inner-infinety-container">
        <h1 class="text-light">
          꽃 피는 봄에 함께하면
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
    <button id="toTop" class="to-top-btn" @click="clickToTop"><img src="@/assets/icon/arrow_upward.png"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Home',

  components: {},
  setup() {
    const searchText = ref('');
    function clickToTop(){
      window.scrollTo({top:0, behavior:'smooth'})
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

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  // padding: var(--content-container-padding);
  overflow: visible;
}
.inner-infinety-container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  padding-top: 20px;
}
.search-plant {
  height: 617px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background: url('@/assets/images/home/bg-sun.png') no-repeat 80% -20%;


  img {
    margin-top: 138px;
  }
  h1 {
    margin-top: 20px;
    font-size: 50px;
    font-weight: var(--font-weight-light);
    line-height: 65px;
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

    &:after {
      content: '';
      position: absolute;
      height: 50px;
      width: 50px;
      background-image: url('@/assets/icon/magnifier.png');
      background-size: 100%;
      pointer-events: none;
      transform: translateX(-100%);
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
        transform: scale(0.75) translateY(-54px);
        color: var(--secondary-green-color-1);
      }
      &:not(.is-empty) + label {
        transform: scale(0.75) translateY(-54px);
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
      transform-origin: bottom left;
      transition: bottom, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
}
.recommend-plant {
  height: 531px;
  background-color: var(--secondary-green-color-3);
  width: 100vw;
  margin-left: calc(-50vw + 50%);

  h1 {
    color: #000;
    margin-top: 80px;
  }
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .plant-list {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    overflow: auto;
    padding: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      position: relative;
      text-align: center;
      cursor: pointer;
      padding-bottom: 10px;
      border-radius: 4px;

      transition: box-shadow 0.7s;
      &:hover {
        box-shadow: 5px 5px 10px rgba(114, 138, 106, 0.05);
      }
      img {
        height: 176px;
        width: 176px;
        border-radius: 4px;
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
      }
    }
  }
}
.guide-plant {
  height: 681px;
  background: url('@/assets/images/home/guide-banner-image.png') no-repeat 100% 20%;

  h1 {
    color: #000;
    margin-top: 100px;
  }

  .btn-group {
    display: flex;
    // justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    width: 390px;
    color: var(--text-color-2);
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
      img {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
    }
  }
}
.to-top-btn{
  position:fixed;
  right:50%;
  bottom:20px;
  cursor:pointer;
  background-color:#EBF1F1;
  width:50px;
  height:50px;
  border-radius:50%;
  border:none;
}
</style>
