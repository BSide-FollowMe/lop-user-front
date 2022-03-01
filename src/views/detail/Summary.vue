<template>
  <div class="inner-container">
    <div class="plant-image">
      <img v-if="!fileUrl" class="fileImage" src="@/assets/images/detail/sample-plant.png" />
      <img v-else class="fileImage" :src="fileUrl" />
      <div v-if="fileSource" class="fileSource">{{ fileSource }}</div>
    </div>
    <div class="plant-content">
      <div class="upper-content">
        <div class="content">
          <div class="category-icon">
            <div class="inner-category-icon">{{ translatedCategory }}</div>
          </div>
          <div class="plant-name">{{ name }}</div>
          <div class="plant-scientificName">{{ scientificName }}</div>
          <div class="plant-nickname">{{ nickname }}</div>
        </div>
        <div class="icon-menu">
          <ContextMenu ref="contextMenu" class="ContextMenu" :items="contextMenuItems" />
          <div class="icon-group">
            <img class="icon" :src="ShareIcon" @click="openContextMenu" />
            <img
              v-if="isLoggedIn && currentLike"
              class="icon heart-fill-icon"
              :src="FullHeartIcon"
              @click="
                toggleLike();
                requestChangeLike(false);
              "
            />
            <img
              v-if="isLoggedIn && !currentLike"
              class="icon heart-empty-icon"
              :src="EmptyHeartIcon"
              @click="
                toggleLike();
                requestChangeLike(true);
              "
            />
          </div>
        </div>
      </div>
      <Poll class="poll" title="저를 키우는 건 어떠셨어요?" :items="pollItems"></Poll>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, nextTick, onMounted, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { category } from 'plant';
import { translate } from '@/utils/text';
import { registerLike, pollDifficulty } from '@/api/plant';
import { debounce } from 'lodash';
import ContextMenu from '@/components/ContextMenu.vue';
import ShareIcon from '@/assets/icon/share.svg';
import EmptyHeartIcon from '@/assets/icon/heart-empty.svg';
import FullHeartIcon from '@/assets/icon/heart-fill.svg';
import KakaoIcon from '@/assets/icon/logo_카카오톡.svg';
import LinkIcon from '@/assets/icon/icon_link.svg';
import Poll from '@/components/detail/Poll.vue';
import { useKakao } from 'vue3-kakao-sdk';

export default defineComponent({
  props: {
    plantId: {
      type: Number,
      default: 0,
    },
    isFavorite: {
      type: Boolean || null,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    scientificName: {
      type: String,
      default: '',
    },
    nickname: {
      type: String,
      default: '',
    },
    growthEasy: {
      type: Number,
      default: 0,
    },
    growthHard: {
      type: Number,
      default: 0,
    },
    category: {
      type: String as PropType<category>,
      default: '',
    },
    fileName: {
      type: String,
      default: '',
    },
    fileUrl: {
      type: String,
      default: '',
    },
    fileSource: {
      type: String,
      default: '',
    },
    fileSourceLink: {
      type: String,
      default: '',
    },
    like: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { kakao } = useKakao();
    const store = useStore();
    const contextMenu = ref(ContextMenu);
    const openContextMenu = () => {
      contextMenu.value.toggleContextMenu();
    };

    const translatedCategory = computed(
      () =>
        translate(
          [
            { value: 'FERNS', label: '양치식물' },
            { value: 'BULBOUS', label: '구근식물' },
            { value: 'AQUATIC', label: '수생식물' },
            { value: 'CACTUS', label: '선인장류' },
            { value: 'SUCCULENTS', label: '다육식물' },
            { value: 'CARNIVOROUS', label: '식충식물' },
            { value: 'HOUSEPLANT', label: '관엽식물' },
          ],
          props.category,
        ) || '미등록',
    );

    const shareKakao = async () => {
      kakao.value.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `식물의 언어 - ${props.name}`,
          imageUrl: props.fileUrl || 'https://plantslang.com/img/sample-plant.7e3b4dd0..png',
          link: {
            mobileWebUrl: window.document.location.href,
            webUrl: window.document.location.href,
          },
        },
      });
      console.log('shareKakao');
    };
    const copyLink = () => {
      //copy url
      const currentUrl = window.document.location.href;
      const t = document.createElement('textarea');
      document.body.appendChild(t);
      t.value = currentUrl;
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
      store.dispatch('snack/openSnack', { text: '링크가 복사되었어요!', color: '#48B57A' });
    };
    const contextMenuItems = [
      { text: '카카오톡 공유', func: shareKakao, icon: KakaoIcon },
      { text: '링크 복사', func: copyLink, icon: LinkIcon },
    ];

    const currentLike = ref(null as null | boolean);
    watchEffect(() => {
      if (props.isFavorite != null) {
        currentLike.value = props.isFavorite;
      }
    });

    const toggleLike = () => {
      currentLike.value = !currentLike.value;
      if (currentLike.value) {
        store.dispatch('snack/openSnack', { text: '내가 저장한 식물에 추가했어요!', link: '/', color: '#C9704C' });
      } else {
        store.dispatch('snack/openSnack', { text: '내가 저장한 식물에서 삭제했어요!', color: '#C9704C' });
      }
    };
    const requestChangeLike = debounce(async (isAdded: boolean) => {
      try {
        await registerLike({ plantId: props.plantId, memberId: store.state.user.id, isAdded });
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert(e);
        }
      }
    }, 300);

    const requestPollDifficulty = async (type: string) => {
      try {
        await pollDifficulty({ memberId: store.state.user.id, plantId: props.plantId, type }); //todo 한번만 투표하실 수 있습니다 error message 추가
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert(e);
        }
      }
    };

    const pollItems = computed(() => {
      return [
        { text: '쉬워요', value: props.growthEasy + '%', hoverColor: '#48B57A', onClick: () => requestPollDifficulty('EASY') },
        { text: '어려워요', value: props.growthHard + '%', hoverColor: '#C9704C', onClick: () => requestPollDifficulty('HARD') },
      ];
    });

    const isLoggedIn = computed(() => !!store.state.user.token);

    return {
      currentLike,
      toggleLike,
      requestChangeLike,
      openContextMenu,
      contextMenu,
      contextMenuItems,
      ShareIcon,
      EmptyHeartIcon,
      FullHeartIcon,
      pollItems,
      translatedCategory,
      isLoggedIn,
    };
  },
  components: {
    ContextMenu,
    Poll,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.inner-container {
  display: flex;
  @include breakpoint-down-sm {
    display: inline-block;
    padding: 0 20px;
    width: 100%;
  }
  .plant-image {
    margin-right: 50px;
    position: relative;
    width: 340px;
    height: 340px;

    @include breakpoint-down-sm {
      margin-left: -20px;
      width: 100vw;
      margin-bottom: 46px;
    }
  }
  .plant-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 340px;
    @include breakpoint-down-sm {
      height: auto;
    }
  }
}
.fileImage {
  width: 340px;
  height: 340px;
  @include breakpoint-down-sm {
    width: 100%;
  }
}
.fileSource {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0 0 12px 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  padding: 3px 6px 3px 6px;
  color: white;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: -0.005em;
}
.upper-content {
  display: flex;
  justify-content: space-between;
  @include breakpoint-down-sm {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--background-color-2);
  }
}
.category-icon {
  @include breakpoint-down-sm {
    display: none;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 12px;
  margin-bottom: 20px;
  width: 73px;
  height: 23px;
  border: 1px solid var(--secondary-green-color-2);
  box-sizing: border-box;
  border-radius: 12px;
  > .inner-category-icon {
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 10px;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    text-align: center;
    letter-spacing: -0.005em;
    color: var(--secondary-green-color-2);
  }
}
.plant-name {
  margin-bottom: 10px;
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 38px;
  letter-spacing: -0.0025em;
  /* deepgreen/1-main */
  color: var(--primary-color-1);
  @include breakpoint-down-sm {
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    letter-spacing: -0.01em;

    /* deepgreen/1-main */
  }
}
.plant-scientificName {
  margin-bottom: 4px;
  font-weight: var(--font-weight-light);
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  letter-spacing: -0.01em;
  /* text/3 */
  color: var(--text-color-3);
  @include breakpoint-down-sm {
    font-size: 13px;
    line-height: 16px;
    /* identical to box height */

    letter-spacing: -0.01em;
  }
}
.plant-nickname {
  margin-bottom: 30px;
  font-weight: var(--font-weight-light);
  font-size: 18px;
  line-height: 22px;
  @include breakpoint-down-sm {
    font-size: 13px;
    line-height: 16px;
  }
  /* identical to box height */
  letter-spacing: -0.01em;
  /* text/3 */
  color: var(--text-color-3);
}
.icon-menu {
  position: relative;
  display: flex;
  .ContextMenu {
    position: absolute;
    right: 25px;
    width: 172px;
    height: 96px;
    @include breakpoint-down-sm {
      right: 110px;
    }
  }
}
.icon-group {
  display: flex;
  flex-direction: column;
  @include breakpoint-down-sm {
    flex-direction: row;
    gap: 21px;
  }
  .icon {
    cursor: pointer;
    margin-bottom: 25px;
    width: 18px;
    height: 20px;
  }
}
</style>
