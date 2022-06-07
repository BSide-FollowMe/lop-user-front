<template>
  <section class="questions-container">
    <ul class="question-list">
      <div class="list-summary paragraph-2">
        <span v-if="plantName != ''">
          {{ plantName }}&nbsp;
          <span class="list-summary__count">{{ totalLength }}</span>
        </span>
        <CheckButton v-if="isLoggedIn" :value="mine == '1'" class="toggle-my-question" @toggle="toggleIsMyList" />
      </div>
      <li class="item" v-for="(item, index) in items" :key="`plant-item-${index}`" @click="ROUTE_TO.QNABOARD_DETAIL(String(item.id))">
        <div class="item__infomations">
          <p class="target-plant">{{ item.plantName }}</p>
          <p class="details text-medium" v-html="preview(item.content)"></p>
          <p class="status">
            <span class="reg-date">{{ getTimeDistanceWithNaturalStr(item.createdDateTime) }}</span>
            <span class="reply-count">댓글 {{ item.commentCount }}</span>
            <span class="like-count">도움돼요 {{ item.supportCount }}</span>
          </p>
        </div>
        <div v-if="item.imageUrl && item.imageUrl.length" class="preview">
          <img
            :src="item.imageUrl"
            :class="{ 'fit-height': imageSize[index]?.height < imageSize[index]?.width }"
            @load="(e) => setImageSize(index, e)"
            @error="($event.target as HTMLImageElement).src = require('@/assets/images/search/img-error.svg')"
          />
        </div>
      </li>
      <div v-if="isEnd" class="is-end" />
    </ul>
    <div class="is-empty" v-if="isReady && !items.length">
      <section class="request-container" v-if="mine == '1'">
        <img src="@/assets/icon/question-request.svg" />
        <h2 class="text-medium">등록된 내 질문이 없어요</h2>
      </section>
      <section class="request-container" v-else>
        <img src="@/assets/icon/question-request.svg" />
        <h2 class="text-medium">등록된 질문 · 답변이 없어요</h2>
      </section>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CheckButton from '@/components/buttons/CheckButton.vue';
import { getTimeDistanceWithNaturalStr, preview } from '@/utils/text';
import { handleInfiniteListScroll } from '@/utils/global';
import { ROUTE_TO } from '@/router/routing';
import { debounce } from '@/utils/global';
import { getPlantDetail } from '@/api/plant';
import useValidateToken from '@/hooks/useValidateToken';
import { Question } from '@/types/api/board';

export default defineComponent({
  components: {
    CheckButton,
  },
  props: {
    plantId: {
      type: String,
      default: '',
    },
    items: {
      type: Array as PropType<Question[]>,
      default: () => [],
    },
    totalLength: {
      type: Number,
      default: 0,
    },
    isReady: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const mine = computed(() => route.query.mine || '0');
    const plantName = ref('');
    const isLoggedIn = computed(() => store.getters.isAuthenticated);
    const isEnd = computed(() => {
      return props.items.length >= props.totalLength;
    });
    useValidateToken();
    if (props.plantId != '') {
      getPlantName();
    }

    const onScroll = debounce(($event: MouseEvent) => {
      handleInfiniteListScroll($event, props.items, props.totalLength, onAtTheBottom);
    }, 500);
    document.addEventListener('scroll', onScroll);

    async function getPlantName() {
      try {
        const res = await getPlantDetail({ plantId: props.plantId });
        plantName.value = res.name;
      } catch (e) {
        router.push('/not-found');
      }
    }

    function onAtTheBottom() {
      emit('atBottom');
    }
    const routeToPathWithParam = (key: string, value: string) => {
      const query = { ...route.query };
      query[key] = value;
      router.push({ query: query });
    };
    function toggleIsMyList(checked: boolean) {
      routeToPathWithParam('mine', checked ? '1' : '0');
    }
    const imageSize = ref([] as { width: number; height: number }[]);
    const setImageSize = (index: number, e: Event) => {
      const { width, height } = e.target as HTMLImageElement;
      imageSize.value[index] = { width, height };
    };
    return {
      preview,
      ROUTE_TO,
      getTimeDistanceWithNaturalStr,
      onAtTheBottom,
      onScroll,
      routeToPathWithParam,
      toggleIsMyList,
      isLoggedIn,
      plantName,
      mine,
      isEnd,
      imageSize,
      setImageSize,
    };
  },
  unmounted() {
    document.removeEventListener('scroll', this.onScroll);
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.questions-container {
  min-height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height));
}
.question-list {
  list-style: none;
  .item {
    display: flex;
    height: 180px;
    padding: 20px;
    border-bottom: 1px solid var(--background-color-4);
    @include breakpoint-down-sm {
      height: 130px;
      padding: 16px 20px;
    }
    &:hover {
      background-color: var(--secondary-green-color-3);
      cursor: pointer;
    }
    .preview {
      align-self: center;
      flex-shrink: 0;
      position: relative;
      width: 140px;
      height: 140px;
      margin-left: 60px;
      border-radius: 4px;
      overflow: hidden;
      @include breakpoint-down-sm {
        margin-left: 20px;
        width: 76px;
        height: 76px;
      }
      img {
        position: absolute;
        top: 100%;
        transform: translateY(calc(-100%));
        width: 100%;
        height: auto;
        &.fit-height {
          height: 100%;
          width: auto;
        }
      }
    }
    &__infomations {
      display: flex;
      flex-direction: column;
      // margin-right: 60px;
      flex-grow: 1;
      flex-basis: 720px;
      @include breakpoint-down-sm {
        flex-basis: calc(100% - 76px);
      }
    }
    .target-plant {
      margin: 0px;
      color: var(--text-color-3);
      @include breakpoint-down-sm {
        font-size: 12px;
      }
    }
    .details {
      margin-top: 10px;
      margin-bottom: 0px;
      line-height: 26px;
      word-break: break-all;
      @include textOverflow(2);
      @include breakpoint-down-sm {
        margin-top: 6px;
        font-size: 13px;
        line-height: 20px;
      }
    }
    .status {
      margin-top: auto;
      margin-bottom: 0px;
      color: var(--text-color-3);
      font-size: 16px;
      line-height: 18px;
      span {
        color: var(--text-color-3);
      }
      @include breakpoint-down-sm {
        margin-bottom: 0px;
        font-size: var(--m-font-size-caption);
      }
      span:first-child::before {
        content: unset;
        margin: unset;
        color: unset;
      }
      span::before {
        content: '|';
        margin: 0px 10px;
        color: var(--background-color);
      }
    }
    .to-details {
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: none;
      img {
        width: 24px;
        height: 24px;
      }
      @include breakpoint-down-sm {
        width: 18px;
        height: 18px;
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
.list-summary {
  display: flex;
  align-items: center;
  margin: 40px 0px 20px 0px;
  color: var(--text-color-2);
  &__count {
    color: var(--secondray-color-2);
  }
  @include breakpoint-down-sm {
    padding: 0px 10px 0px 20px;
    margin: 20px 0px 20px 0px;
    font-size: 13px;
  }
  .toggle-my-question {
    width: 130px;
    height: 37px;
    margin-left: auto;
    display: block;
    transform: scale(0.9);
    &:active {
      transform: scale(0.91);
    }
    @include breakpoint-down-sm {
      transform: scale(0.8);
      &:active {
        transform: scale(0.81);
      }
    }
  }
}
.is-empty {
  .request-container {
    color: var(--primary-color);
    text-align: center;
    min-height: 530px;
    height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height) - 400px);
    padding: 80px;
    img {
      width: 116px;
      height: 116px;
    }
    @include breakpoint-down-sm {
      min-height: 378px;
      height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height) - 146px);
      padding: 60px;
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
  .question-request-btn {
    margin-top: 50px;
    width: 180px;
    height: 48px;
    @include breakpoint-down-sm {
      width: 147px;
      margin-top: 40px;
    }
  }
}
.is-end {
  width: 100%;
  height: 120px;
}
</style>
