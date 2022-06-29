<template>
  <div class="is-empty">
    <section class="request-container">
      <img src="@/assets/icon/exclamation.svg" />
      <h2 class="text-medium">검색하신 식물을 찾지 못했어요</h2>
      <div class="search-tip">
        찾고 계신 식물을 알려주시면
        <br />
        새로운 식물의언어를 빠르게 들려드릴게요.
      </div>
      <VueButton color="primary" class="plant-request-btn" @click="checkIsLoggedIn">식물 등록 요청하기</VueButton>
    </section>
    <section class="recommend-container">
      <div class="inner-infinety-container">
        <h1 class="text-light">
          <span class="text-medium">이런 식물</span>
          은 어때요?
        </h1>
        <ul ref="slider" class="plant-list">
          <li class="item" v-for="(item, index) in recommended" :key="`item-${index}`" @click="ROUTE_TO.PLANT_DETAILS(item.id)">
            <div class="img-container">
              <img :src="item.fileUrl" @error="$event.target.src = require('@/assets/images/search/img-error.svg')" />
            </div>
            <span class="plant-name text-light">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </section>
    <RequestModal
      v-if="showModal"
      :options="{
        modalTitle: '식물 등록 요청하기',
        contentsLabel: '더 자세히 알고 싶은 식물명을 알려주세요. ',
        type: 'Request',
      }"
      @close="showModal = false"
      @confirm="registPlant"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import VueButton from '@/components/atoms/buttons/VueButton.vue';
import RequestModal from '@/components/organisms/Modals/RequestModal.vue';
import { registReport } from '@/api/plant';
import { tokenSvc } from '@/api/token-service';
import { ROUTE_TO } from '@/router/routing';
import { getRecommendPlants } from '@/api/plant';
import type { Plant } from '@/types/api/plant';
import useHorizontalMouseScroll from '@/hooks/useHorizontalScroll';
export default defineComponent({
  components: {
    VueButton,
    RequestModal,
  },
  props: ['text'],
  setup(props) {
    const searchTarget = computed(() => props.text);
    const showModal = ref(false);
    const isLoggedIn = ref(false);
    checkLoggedIn();
    const recommended = ref([] as Plant[]);

    const slider = useHorizontalMouseScroll();

    async function registPlant({ email, contents }: { email: string; contents: string }) {
      try {
        const payload = {
          content: contents,
          email: email,
          reportType: 'REQUEST_PLANT' as const,
        };
        await registReport(payload);
        await alert('식물 등록 요청이 접수되었습니다. 관리자가 식물을 등록해드릴 예정입니다.');
        showModal.value = false;
      } catch (e) {
        console.error(e);
      }
    }
    async function checkLoggedIn() {
      isLoggedIn.value = await tokenSvc.isValidToken();
    }
    function checkIsLoggedIn() {
      if (!isLoggedIn.value) {
        alert('먼저 로그인해주세요!');
        ROUTE_TO.LOGIN();
        return;
      }
      showModal.value = true;
    }
    async function getRecommended() {
      try {
        const recommendedPlants = await getRecommendPlants();
        recommended.value = recommendedPlants;
      } catch (e) {
        console.error(e);
      }
    }

    onMounted(() => {
      getRecommended();
    });

    return {
      searchTarget,
      showModal,
      registPlant,
      checkIsLoggedIn,
      recommended,
      ROUTE_TO,
      slider,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';
.is-empty {
  .request-container {
    color: var(--primary-color);
    text-align: center;
    height: 530px;
    padding: 80px;
    img {
      width: 116px;
      height: 116px;
    }
    @include breakpoint-down-sm {
      padding: 60px;
      height: 378px;
      img {
        width: 60px;
        height: 60px;
      }
      h2 {
        font-size: var(--m-font-size-p);
      }
    }
  }
  .search-tip {
    margin-top: 15px;
    font-size: var(--font-size-p);
    line-height: 26px;
    color: var(--text-color-4);
    @include breakpoint-down-sm {
      margin-top: 6px;
      font-size: var(--m-font-size-p-3);
      line-height: 18px;
    }
  }
  .plant-request-btn {
    margin-top: 50px;
    width: 180px;
    height: 48px;
    @include breakpoint-down-sm {
      width: 147px;
      margin-top: 40px;
    }
  }
  .recommend-container {
    height: 513px;
    background-color: var(--secondary-green-color-3);
    width: 100vw;
    padding-top: 20px;
    margin-left: calc(-50vw + 50%);
    @include breakpoint-down-sm {
      height: 405px;
    }
  }
  h1 {
    color: #000;
    margin-top: 80px;
    @include breakpoint-down-sm {
      margin-top: 40px;
      line-height: 34px;
    }
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
      .plant-name {
        display: block;
        margin-top: 20px;
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
.inner-infinety-container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  overflow: visible;
  padding: 0 var(--content-container-padding);
  @include breakpoint-down-sm {
    min-width: var(--m-content-container-max-width);
    padding: 0 var(--m-content-container-padding);
  }
}
</style>
