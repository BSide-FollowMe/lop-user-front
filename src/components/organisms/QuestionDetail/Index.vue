<template>
  <section class="detail-form" v-if="details">
    <div class="detail-title">
      <div class="group">
        <span class="title">{{ details.plantName }}</span>
        <LinkButton v-if="details.plantId" @click="ROUTE_TO.PLANT_DETAILS(details.plantId)">식물정보</LinkButton>
      </div>
      <div class="group">
        <span class="writer">{{ details.writer.nickname }}</span>
        <span class="separator">|</span>
        <span class="datetime">{{ getTimeDistanceWithNaturalStr(details.createdDateTime) }}</span>
        <template v-if="myId && details.writer.id == myId">
          <span class="separator md-up-only-inline"></span>
          <button class="action-modal-btn" @click="actionModal = true" ref="actionBtnRef">
            <img src="@/assets/icon/more.svg" />
            <ul class="action-list shadow" v-if="actionModal">
              <li @click="ROUTE_TO.QNABOARD_EDIT(details.id, details.type)">
                <img src="@/assets/icon/modify-pencil-gray.svg" />
                <span>수정하기</span>
              </li>
              <hr />
              <li @click="onRemove">
                <img src="@/assets/icon/delete.svg" />
                <span>삭제하기</span>
              </li>
            </ul>
          </button>
        </template>
      </div>
    </div>
    <hr class="separate-content" />
    <template v-if="details.type == 'SICK'">
      <div class="input-title">물은 얼마나 자주 주셨나요?</div>
      <div class="textarea-item">
        <ResizableTextArea class="sub-contents" :modelValue="details.plantWaterCycle" maxlength="500" readonly />
      </div>
      <div class="input-title">
        식물은 어디에 두셨고 햇빛을 받는 시간은
        <br class="md-down-only" />
        얼마나 되나요?
      </div>
      <div class="textarea-item">
        <ResizableTextArea class="sub-contents" :modelValue="details.plantLifeCycle" maxlength="500" readonly />
      </div>
      <div class="input-title">증상이 나타났을 때 어떻게 대처하셨나요?</div>
      <div class="textarea-item">
        <ResizableTextArea class="sub-contents" :modelValue="details.plantCountermeasure" maxlength="500" readonly />
      </div>
    </template>
    <VHtmlTextField class="content-item" :content="details.content" />
    <div class="img-item" v-for="(item, index) in details.images" :key="`img-item-${index}`">
      <img :src="item.imageUrl" @error="($event.target as HTMLImageElement).src = require('@/assets/images/search/img-error.svg')" />
    </div>
    <div class="bottom-btn-group">
      <button class="no-click">
        <img src="@/assets/icon/reply.svg" />
        <br class="md-down-only" />
        답변 {{ details.comments.totalElement }}
      </button>
      <span class="separator">|</span>
      <button class="helpful-btn-primary helpful-btn" v-if="details.isSupport" @click="toggleSupportBtn">
        <img src="@/assets/icon/helpful-primary.svg" />
        <br class="md-down-only" />
        도움돼요 {{ details.supportCount }}
      </button>
      <button class="helpful-btn" v-else @click="toggleSupportBtn">
        <img src="@/assets/icon/helpful.svg" />
        <br class="md-down-only" />
        도움돼요 {{ details.supportCount }}
      </button>
      <span class="separator">|</span>
      <button @click="openContextMenu" class="share-button">
        <ContextMenu ref="shareCotextRef" class="context-menu" :items="contextMenuItems" />
        <img src="@/assets/icon/share-gray.svg" />
        <br class="md-down-only" />
        공유하기
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount, PropType } from 'vue';
import VHtmlTextField from '@/components/atoms/textField/VHtmlTextField.vue';
import { useRoute } from 'vue-router';
import { getTimeDistanceWithNaturalStr } from '@/utils/text';
import { debounce, copyUrl } from '@/utils/global';
import store from '@/store';
import { ROUTE_TO } from '@/router/routing';
import ContextMenu from '@/components/ContextMenu.vue';
import { useKakao } from 'vue3-kakao-sdk';
import dummyImage from '@/assets/images/search/img-error.svg';
import type { BoardResponse } from '@/types/api/board';
import ResizableTextArea from '@/components/atoms/textarea/ResizableTextArea.vue';
import LinkButton from '../../atoms/buttons/LinkButton.vue';

export default defineComponent({
  head() {
    return { script: [{ src: '//developers.kakao.com/sdk/js/kakao.min.js' }] };
  },
  name: 'Question Detail',
  props: {
    details: {
      type: Object as PropType<BoardResponse>,
      default: () => ({ plantWaterCycle: '', plantLifeCycle: '', plantCountermeasure: '' }),
    },
  },
  components: { ContextMenu, ResizableTextArea, VHtmlTextField, LinkButton },
  setup(props, { emit }) {
    const { kakao } = useKakao();
    const myUserInfo = computed(() => store.getters.getUserInfo);
    const myId = computed(() => myUserInfo.value?.id || null);
    const route = useRoute();
    const actionModal = ref(false);
    const boardId: any = computed(() => route.path.split('/')[3] || '');
    const actionBtnRef = ref(null);
    const shareCotextRef = ref(ContextMenu);

    async function onRemove() {
      if (!confirm('해당 글이 삭제됩니다. 계속할까요?')) return;
      emit('onRemove');
    }
    function documentClick(e: any) {
      let el: any = actionBtnRef.value;
      let target = e.target;
      if (el && el !== target && !el.contains(target)) {
        actionModal.value = false;
      }
    }

    async function toggleSupportBtn() {
      emit('onToggleSupport');
    }

    const openContextMenu = () => {
      shareCotextRef.value.toggleContextMenu();
    };
    const shareKakao = async () => {
      const item = props.details;
      let imageUrl = dummyImage;
      if (item?.images && item.images.length) {
        imageUrl = item.images[0].imageUrl;
      }
      kakao.value.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `식물의언어 - ${item.plantName}`,
          description: '식물을 키우며 궁금했던 점, 식물의언어에서 물어보세요.',
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: window.document.location.href,
            webUrl: window.document.location.href,
          },
        },
      });
      console.log('shareKakao');
    };
    const copyLink = () => {
      copyUrl();
      store.dispatch('snack/openSnack', {
        text: '링크가 복사되었어요!',
        color: '#48B57A',
      });
    };
    const contextMenuItems = [
      {
        text: '카카오톡 공유',
        func: shareKakao,
        icon: require('@/assets/icon/logo_카카오톡.svg'),
      },
      { text: '링크 복사', func: copyLink, icon: require('@/assets/icon/icon_link.svg') },
    ];
    return {
      documentClick,
      actionModal,
      actionBtnRef,
      getTimeDistanceWithNaturalStr,
      myId,
      onRemove,
      ROUTE_TO,
      boardId,
      copyUrl,
      toggleSupportBtn: debounce(toggleSupportBtn, 500),
      shareCotextRef,
      openContextMenu,
      contextMenuItems,
    };
  },
  unmounted() {
    document.removeEventListener('click', this.documentClick);
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.container {
  background-color: var(--background-color-5);
}
.inner-container {
  margin-left: auto;
  margin-right: auto;
  padding: 0px var(--content-container-padding);
  max-width: var(--content-container-max-width);
  overflow: visible;
  @include breakpoint-down-sm {
    padding: unset;
    min-width: var(--m-content-container-max-width);
  }
}
.qna-detail {
  padding-bottom: 120px;

  &__title {
    padding: 20px;
    text-align: center;
    h1 {
      display: block;
      margin-top: 60px;
      margin-bottom: 30px;
      color: var(--primary-color-1);
      @include breakpoint-down-sm {
        font-size: 18px;
        margin-top: 40px;
        margin-bottom: 22px;
      }
    }
  }
  @include breakpoint-down-sm {
    padding-bottom: 60px;
  }
}
.detail-form {
  background-color: #fff;
  border-radius: 4px;
  padding: 60px;
  padding-bottom: 10px;
  color: var(--text-color-2);

  @include breakpoint-down-sm {
    margin-left: 20px;
    margin-right: 20px;
    padding: 40px var(--m-content-container-padding);
  }
  .content-item {
    margin-top: 40px;
    font-size: 18px;
    line-height: 26px;
    word-break: break-all;
    @include breakpoint-down-sm {
      margin-top: 30px;
      font-size: 13px;
    }
  }
}
.page-btn-group {
  text-align: center;

  button {
    cursor: pointer;
    margin: 0px 5px;
    padding: 25px 30px;
    width: 240px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid var(--background-color-1);
    background-color: transparent;

    span {
      float: left;
      color: var(--text-color-3);
      line-height: 50px;
      font-size: var(--font-size-p);
      font-weight: var(--font-weight-medium);
    }
    img {
      float: right;
      width: 50px;
      height: 50px;
    }
    &.active {
      border: 1px solid var(--secondary-green-color-1);
      background-color: var(--secondary-green-color-3);
      span {
        color: var(--secondary-green-color-1);
        font-weight: var(--font-weight-bold);
      }
      &.ask-help > img {
        content: url('@/assets/icon/ask-help-primary.svg');
      }
      &.ask-question > img {
        content: url('@/assets/icon/ask-question-primary.svg');
      }
    }
    @include breakpoint-down-sm {
      position: relative;
      width: 135px;
      height: 85px;
      padding: 10px;
      text-align: center;
      margin: 0px 0px 10px;
      &.ask-help {
        margin-right: 5px;
      }
      &.ask-question {
        margin-left: 5px;
      }
      span {
        position: relative;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        line-height: 17px;
        // word-break:keep-all;
      }
      img {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
      }
    }
  }
}
.input-title {
  color: var(--text-color-1);
  margin-top: 40px;
  font-size: 18px;
  line-height: 26px;
  @include breakpoint-down-sm {
    margin-top: 30px;
    font-size: 13px;
    line-height: 16px;
  }
}

.textarea-item {
  margin-top: 10px;
  position: relative;
  textarea {
    margin-top: 10px;
    display: block;
    padding: 12px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: fit-content;
    font-size: 18px;
    line-height: 26px;
    color: var(--text-color2);
    overflow: hidden;
    @include breakpoint-down-sm {
      height: auto;
      min-height: 40px;
      font-size: 13px;
    }
  }
}
.img-item {
  margin-top: 30px;
  text-align: center;
  img {
    max-width: 100%;
  }
}
.bottom-btn-group {
  margin-top: 80px;
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
  button {
    width: 180px;
    color: var(--text-color-2);
    font-size: 16px;
    line-height: 19px;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
    @include breakpoint-down-sm {
      img {
        width: 12px;
        height: 12px;
      }
      font-size: 12px;
    }
    &.helpful-btn-primary {
      color: var(--secondary-green-color-1);
    }
  }
  @include breakpoint-down-sm {
    margin-bottom: 0px;
  }
}
.detail-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .group {
    display: block;
    > * {
      vertical-align: middle;
    }
    .placeholder {
      font-size: 18px;
      line-height: 22px;
      color: var(--text-color-2);
    }
    .title {
      font-size: 20px;
      line-height: 20px;
      color: var(--primary-color-1);
      font-weight: var(--font-weight-bold);
    }
    &:nth-child(2) {
      font-size: 16px;
      line-height: 19px;
      color: var(--text-color-3);
    }
  }
  img {
    vertical-align: middle;
  }
  .separator {
    margin-left: 10px;
    margin-right: 10px;
  }
  @include breakpoint-down-sm {
    flex-wrap: wrap;
    gap: 10px;
    .group {
      width: 100%;
      .placeholder {
        font-size: 14px;
        line-height: 17px;
      }
      .title {
        font-size: 16px;
      }
      &:nth-child(2) {
        font-size: 12px;
      }
      .link-button {
        height: 20px;
        font-size: 12px;
        line-height: 16px;
        padding: 2px 12px 2px 9px;
        vertical-align: middle;
        .arrow-icon {
          margin-left: 6.33px;

          width: 5.35px;
          height: 8.56px;
        }
      }
    }
  }
}
.action-modal-btn {
  position: relative;
  .action-list {
    position: absolute;
    animation-duration: 0.3s;
    background: #ffffff;
    width: 172px;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    right: 0px;
    z-index: 1;
    li {
      text-align: left;
      list-style-type: none;
      height: 48px;
      padding: 0px 15px;
      font-size: 16px;
      line-height: 48px;
      img {
        margin-right: 20px;
        width: 24px;
        height: 24px;
      }
      @include breakpoint-down-sm {
        font-size: 14px;
        img {
          margin-right: 4px;
          width: 12px;
          height: 12px;
          fill: var(--text-color-2);
        }
      }
    }
    li:not(.selected):hover {
      background: #f4f8f1;
    }
    hr {
      margin: 0px 10px;
      border: none;
      border-bottom: 1px solid var(--background-color-5);
    }
    span {
      color: var(--text-color-3);
    }
  }
  @include breakpoint-down-sm {
    float: right;
    vertical-align: top;
    > img {
      width: 20px;
      height: 20px;
    }
  }
}

.helpful-btn {
  img {
    width: 20px;
    height: 20px;
  }
}
.helpful-btn:hover {
  text-decoration: underline;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.separate-content {
  border: none;
  border-bottom: 1px solid #e5e5e5;
}
.separator {
  color: var(--background-color-1);
}
.share-button {
  position: relative;
}
.context-menu {
  position: absolute;
  bottom: -110px;
  text-align: left;
  width: 172px;
  // height: 96px;
  @include breakpoint-down-sm {
    right: 0px;
  }
}
</style>
