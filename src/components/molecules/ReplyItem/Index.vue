<template>
  <li :id="`${id}`" class="item" :class="{ 'is-dependent': !!item.refId }">
    <div class="item__topper">
      <div class="group">
        <span class="nickname">{{ item.writer.nickname }}</span>
        <span class="is-writer" v-if="item.writer.id == boardWriterId">작성자</span>
      </div>
      <div class="group">
        <template v-if="myId && item.writer.id == myId && !isDeleted">
          <button class="action-modal-btn" @click="actionModal = true" ref="actionBtnRef">
            <img src="@/assets/icon/more.svg" />
            <ul class="action-list shadow" v-if="actionModal">
              <li @click="startEditMode">
                <img src="@/assets/icon/modify-pencil-gray.svg" />
                <span>수정하기</span>
              </li>
              <hr />
              <li @click="removeReply(boardId, item.id)">
                <img src="@/assets/icon/delete.svg" />
                <span>삭제하기</span>
              </li>
            </ul>
          </button>
        </template>
      </div>
    </div>
    <section>
      <v-switch :case="mode">
        <template #edit>
          <ReplyUpdateInput
            :modelValue="item.content"
            @cancel="endEditMode"
            @submit="({ input }) => modifyReply(boardId, item.id, item.refId, input)"
          />
        </template>
        <template #deleted>
          <DeletedReplyItem />
        </template>
        <template #default>
          <VHtmlTextField :content="item.content" />
        </template>
      </v-switch>
    </section>
    <div class="bottom-btn-group">
      <button class="no-click">
        {{ getTimeDistanceWithNaturalStr(item.createdDateTime) }}
      </button>
      <span class="separator">|</span>
      <button :class="{ 'helpful-btn': true, 'helpful-btn-primary': item.isSupport }" @click="toggleSupportBtn">
        <img :src="item.isSupport ? helpfulPrimaryIcon : helpfulIcon" />
        도움돼요 {{ item.supportCount }}
      </button>
      <template v-if="(!item.refId || item.refId == String(0)) && !isDeleted">
        <span class="separator">|</span>
        <button @click="() => openNestedReplyItem()">답글</button>
      </template>
    </div>
  </li>
  <ReplyRegisterInput
    v-if="dependentMode"
    placeholder="대댓글을 남겨주세요"
    :isDependent="true"
    @submit="({ input }) => registDependentReply(boardId, id, input)"
    @clickTextarea="() => (myId ? false : toLogin())"
  ></ReplyRegisterInput>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue';

import { deleteQnaBoardComment, modifyQnaBoardComment, registQnaBoardComment, toggleSupportComments } from '@/api/qnaboard';
import { debounce } from '@/utils/global';
import VHtmlTextField from '@/components/atoms/textField/VHtmlTextField.vue';
import { CommentData } from '@/types/api/board';
import ReplyUpdateInput from '@/components/molecules/ReplyInput/ReplyUpdateInput.vue';
import DeletedReplyItem from '@/components/molecules/ReplyItem/DeletedReplyItem.vue';
import ReplyRegisterInput from '@/components/molecules/ReplyInput/ReplyRegisterInput.vue';
import VSwitch from '@lmiller1990/v-switch';
import helpfulPrimaryIcon from '@/assets/icon/helpful-primary.svg';
import helpfulIcon from '@/assets/icon/helpful.svg';
import { getTimeDistanceWithNaturalStr } from '@/utils/text';
import { ROUTE_TO } from '@/router/routing';

export default defineComponent({
  name: 'Reply Item',
  props: {
    id: {
      type: String,
      required: true,
    },
    item: {
      type: Object as PropType<CommentData>,
      default: () => ({}),
    },
    boardId: {
      type: String,
      default: '',
    },
    myId: {
      type: String,
      default: '',
    },
    boardWriterId: {
      type: String,
      default: '',
    },
  },
  components: {
    ReplyUpdateInput,
    DeletedReplyItem,
    VHtmlTextField,
    ReplyRegisterInput,
    VSwitch,
  },
  setup(props, { emit }) {
    const isDeleted = computed(() => props.item.deletedDateTime || false);
    const actionBtnRef = ref(null);
    const actionModal = ref(false);
    const mode = ref(isDeleted.value ? 'deleted' : '');
    const dependentMode = ref(false);
    document.addEventListener('click', documentClick);

    const openNestedReplyItem = () => {
      dependentMode.value = !dependentMode.value;
    };

    function documentClick(e: any) {
      let el: any = actionBtnRef.value;
      let target = e.target;
      if (el && el !== target && !el.contains(target)) {
        actionModal.value = false;
      }
    }
    async function registDependentReply(bId: string, cId: string, cont: string) {
      try {
        if (!cont.length) {
          alert('내용을 입력해주세요!');
          return;
        }
        const payload = {
          refId: cId,
          content: cont,
        };
        await registQnaBoardComment(payload, bId);
        dependentMode.value = false;
        emit('refresh');
      } catch (e) {
        console.error(e);
      }
    }
    async function modifyReply(bId: string, cId: string, refId: string, cont: string) {
      try {
        if (!cont.length) {
          alert('내용을 입력해주세요!');
          return;
        }
        const payload = {
          refId: refId,
          content: cont,
        };
        const res = await modifyQnaBoardComment(payload, bId, cId);
        mode.value = '';
        dependentMode.value = false;
        emit('refresh');
      } catch (e) {
        console.error(e);
      }
    }
    async function removeReply(bId: string, rId: string) {
      try {
        await deleteQnaBoardComment(bId, rId);
        mode.value = '';
        emit('refresh');
      } catch (e) {
        console.error(e);
      }
    }
    function startEditMode() {
      mode.value = 'edit';
      actionModal.value = false;
    }
    function endEditMode() {
      mode.value = '';
    }
    async function toggleSupportBtn() {
      try {
        if (isDeleted.value) return;
        await toggleSupportComments(props.item.id);
        emit('refresh');
      } catch (e) {
        console.error(e);
        emit('refresh');
      }
    }
    const toLogin = () => {
      alert('로그인이 필요합니다.');
      ROUTE_TO.LOGIN();
    };
    return {
      actionModal,
      actionBtnRef,
      documentClick,
      startEditMode,
      removeReply,
      endEditMode,
      modifyReply,
      dependentMode,
      registDependentReply,
      toggleSupportBtn: debounce(toggleSupportBtn, 500),
      isDeleted,
      openNestedReplyItem,
      helpfulIcon,
      helpfulPrimaryIcon,
      getTimeDistanceWithNaturalStr,
      mode,
      toLogin,
    };
  },
  unmounted() {
    document.removeEventListener('click', this.documentClick);
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';
.item {
  padding: 20px 14px 20px;
  border-bottom: 1px solid var(--background-color-2);
  &__topper {
    color: var(--primary-color-1);
    font-weight: var(--font-weight-bold);
    display: flex;
    justify-content: space-between;
    .group {
      display: block;
    }
    .nickname {
      @include breakpoint-down-sm {
        font-size: 12px;
      }
    }
    .is-writer {
      margin-left: 8px;
      padding: 4px 10px;
      border: 1px solid var(--text-color-4);
      border-radius: 50px;
      color: var(--text-color-3);
      font-weight: var(--font-weight-medium);
      font-size: 12px;
      vertical-align: middle;
      @include breakpoint-down-sm {
        font-size: var(--m-font-size-caption);
        font-size: 10px;
        padding: 2px 5px;
      }
    }
  }
  &__content {
    color: var(--text-color-1);
    margin-top: 10px;
    word-break: break-all;
    &.deleted {
      img {
        vertical-align: middle;
      }
      color: var(--text-color-3);
    }
    @include breakpoint-down-sm {
      font-size: 13px;
      line-height: 20px;
    }
  }
}
.is-dependent {
  padding-left: 40px;
  background-color: var(--background-color-5);
  @include breakpoint-down-sm {
    padding-left: 20px;
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
        vertical-align: middle;
      }
      @include breakpoint-down-sm {
        font-size: 14px;
        img {
          margin-right: 30px;
          width: 20px;
          height: 20px;
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
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
}

.helpful-btn:hover {
  text-decoration: underline;
}

button {
  padding: 0px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
}
.separator {
  margin-left: 10px;
  margin-right: 10px;
  color: var(--background-color-1);
  font-weight: var(--font-weight-light);
}
.bottom-btn-group {
  margin-top: 20px;
  font-size: 16px;
  line-height: 18px;
  img {
    width: 16px;
    height: 16px;
    vertical-align: top;
    @include breakpoint-down-sm {
      width: 14px;
      height: 14px;
    }
  }
  button {
    color: var(--text-color-3);
    @include breakpoint-down-sm {
      font-size: 12px;
    }
    &.helpful-btn-primary {
      color: var(--secondary-green-color-1);
    }
  }
}
</style>
