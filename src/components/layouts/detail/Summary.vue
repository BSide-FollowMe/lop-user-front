<template>
  <div class="inner-container">
    <div class="plant-image">
      <img width="340" height="340" :src="fileUrl" />
      <div class="fileSource">{{ fileSource }}</div>
    </div>
      <section class="second-column">
        <div class="plant-category">
          <div class="inner-plant-category">{{ category }}</div>
        </div>
        <div class="plant-name">{{ name }}</div>
        <div class="plant-scientificName">{{ scientificName }}</div>
        <div class="plant-nickname">{{ nickname }}</div>
        <div class="plant-growthDifficulty">
          <p>저를 키우는 건 어떠셨어요?</p>
          <div class="growth-difficulty-bar">
            <img class="check-icon" :src="CheckIcon" />
            쉬워요
          </div>
          <div class="growth-difficulty-bar">
            <img class="check-icon" :src="CheckIcon" />
            어려워요
          </div>
        </div>
      </section>
      <section class="third-column">
        <ContextMenu ref="contextMenu" class="ContextMenu" :items="contextMenuItems" />
        <img class="icon" :src="ShareIcon" @click="openContextMenu"/>
        <img  class="icon heart-fill-icon" :src="FullHeartIcon" @click="unRegitserLike"/>
        <img  class="icon heart-empty-icon" :src="EmptyHeartIcon" @click="registerLike" />
      </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';
import { category } from 'plant';
import ContextMenu from '@/components/ContextMenu.vue';
import CheckIcon from '@/assets/icon/check.svg';
import ShareIcon from '@/assets/icon/share.svg';
import EmptyHeartIcon from '@/assets/icon/heart-empty.svg';
import FullHeartIcon from '@/assets/icon/heart-fill.svg';
import KakaoIcon from '@/assets/icon/logo_카카오톡.svg';
import LinkIcon from '@/assets/icon/icon_link.svg';
export default defineComponent({
  props: {
    name: {
      type: String,
      default: '몬스테라',
    },
    scientificName: {
      type: String,
      default: 'Senecio rowleyanus',
    },
    nickname: {
      type: String,
      default: '콩난, 콩란, 콩선인장',
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
      default: '다육식물',
    },
    fileName: {
      type: String,
      default: '',
    },
    fileUrl: {
      type: String,
      default:
        'https://api-storage.cloud.toast.com/lop/static/cfebdc09-73ff-4978-8123-040725e687c5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220203T172157Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=13dc6ffb2a4546c9b1adf9bb20362cb7%2F20220203%2FKR1%2Fs3%2Faws4_request&X-Amz-Signature=0f4d7c3d6427a4ba11e742c80414996924475ae6a459148fb75f60725f163c06',
    },
    fileSource: {
      type: String,
      default: '@plant_er1',
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
  setup() {
    const store = useStore();
    const contextMenu = ref(ContextMenu);
    const openContextMenu = () => {
      contextMenu.value.toggleContextMenu();
    };
    const shareKakao = () => {
      console.log('shareKakao');
    };
    const copyLink = () => {
      //some action
      console.log('copyLink');
      store.dispatch('snack/openSnack', { text: '링크가 복사되었어요!',color: '#48B57A'});
    };
    const contextMenuItems = [
      { text: '카카오톡 공유', func: shareKakao,icon:KakaoIcon },
      { text: '링크 복사', func: copyLink,icon:LinkIcon },
    ];

    const registerLike = () => {
      console.log('register like');
      store.dispatch('snack/openSnack', { text: '내가 저장한 식물에 추가했어요!',link:'/',color: '#C9704C'});
    };
    const unRegitserLike = () =>{
      console.log('unregister like');
      store.dispatch('snack/openSnack', { text: '내가 저장한 식물에서 삭제했어요!',color: '#C9704C'});
    }
    return {
      registerLike,
      unRegitserLike,
      openContextMenu,
      contextMenu,
      contextMenuItems,
      CheckIcon,
      ShareIcon,
      EmptyHeartIcon,
      FullHeartIcon,
    };
  },
  components: {
    ContextMenu,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/', '@/assets/fonts/pretendard/pretendard.css';
.inner-container {
  position:relative;
  display: flex;
  flex-wrap: nowrap;
  width:100%;
  max-width: var(--content-container-max-width);
  div.plant-image {
    margin-right:50px;
    position: relative;
    width: 340px;
    height: 340px;
    .fileSource {
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 0 0 12px 12px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 2px;
      padding: 3px 6px 3px 6px;
      color: white;
      font-family: Pretendard;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      /* identical to box height */

      letter-spacing: -0.005em;
    }
  }
  .second-column {
    .plant-category {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 3px 12px;
      margin-bottom: 20px;
      width: 73px;
      height: 23px;
      border: 1px solid #48b57a;
      box-sizing: border-box;
      border-radius: 12px;
      > .inner-plant-category {
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 0px 10px;
        font-family: Pretendard;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */
        text-align: center;
        letter-spacing: -0.005em;
        color: #48b57a;
      }
    }
    .plant-name {
      margin-bottom: 10px;
      font-family: Pretendard;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 38px;
      letter-spacing: -0.0025em;
      /* deepgreen/1-main */
      color: #365650;
    }
    .plant-scientificName {
      margin-bottom: 4px;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 300;
      font-size: 18px;
      line-height: 22px;
      /* identical to box height */
      letter-spacing: -0.01em;
      /* text/3 */
      color: #969696;
    }
    .plant-nickname {
      margin-bottom: 30px;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 300;
      font-size: 18px;
      line-height: 22px;
      /* identical to box height */
      letter-spacing: -0.01em;
      /* text/3 */
      color: #969696;
    }
    .plant-growthDifficulty {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px 80px 20px 30px;
      position: absolute;
      width: 570px;
      height: 171px;
      /* white */
      background: #ffffff;
      /* bg,line/2 */
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
      border-radius: 4px;
      > p {
        font-family: Pretendard;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: -0.01em;
        /* text/1 */
        color: #444444;
        margin: 0;
      }
      .growth-difficulty-bar {
        margin-top: 12px;
        .check-icon {
            padding: 0 16px;
        }
        width: 460px;
        height: 44px;
        background: #ffffff;
        /* bg,line/3 */
        border: 1px solid #ededed;
        border-radius: 4px;
        font-family: Pretendard;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 44px;
        /* identical to box height, or 162% */
        letter-spacing: -0.01em;
        /* text/3 */
        color: #969696;
      }
    }
  }
  .third-column {
    position:absolute;
    right:0;
    .ContextMenu{
      right:31px;
      width:172px;
    }
    .icon {
      display: block;
      cursor: pointer;
      margin-bottom: 25px;
    }
    .heart-empty-icon:hover {
      -webkit-mask-image: url("@/assets/icon/heart-fill.svg");
      mask-image: url("@/assets/icon/heart-fill.svg");
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      mask-position:center center;
      width: 20px;
      height: 18.35px;
      background-color: #365650;
    }
    .heart-fill-icon:hover {
      -webkit-mask-image: url("@/assets/icon/heart-empty.svg");
      mask-image: url("@/assets/icon/heart-empty.svg");
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      mask-position:center center;
      width: 20px;
      height: 18.35px;
      background-color: #365650;
    }
  }
}
</style>
