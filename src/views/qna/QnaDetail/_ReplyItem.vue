<template>
  <li
    :id="`${id}`"
    class="item"
    :class="{ 'is-dependent': item.refId && item.refId != 0 }"
  >
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
    <template v-if="editMode">
      <div class="textarea-item">
        <textarea
          id="comment-edit"
          v-model="editInput"
          :class="{ 'is-empty': editInput === '' }"
          maxlength="500"
          @keydown="autoResize"
          @keydown.enter.exact.prevent
        />
        <label for="comment-edit">내용을 입력하세요</label>
        <div class="edit-btn-group">
          <button class="cancle" @click="endEditMode">취소</button>
          <span class="separator">|</span>
          <button
            class="regist-btn"
            @click="modifyReply(boardId, item.id, item.refId, editInput)"
          >
            수정
          </button>
        </div>
      </div>
    </template>
    <template v-if="!editMode">
      <div class="item__content deleted" v-if="isDeleted">
        <img src="@/assets/icon/error-outline.svg" />
        작성자가 삭제한 댓글입니다
      </div>
      <div
        class="item__content"
        v-else
        v-html="item.content.replace(/(?:\r\n|\r|\n)/g, '<br />')"
      ></div>
    </template>
    <div class="bottom-btn-group">
      <button class="no-click">
        {{ getTimeDistanceWithNaturalStr(item.createdDateTime) }}
      </button>
      <span class="separator">|</span>
      <button
        class="helpful-btn helpful-btn-primary"
        v-if="item.isSupport"
        @click="toggleSupportBtn"
      >
        <img src="@/assets/icon/helpful-primary.svg" />
        도움돼요 {{ item.supportCount }}
      </button>
      <button class="helpful-btn" v-else @click="toggleSupportBtn">
        <img src="@/assets/icon/helpful.svg" />
        도움돼요 {{ item.supportCount }}
      </button>
      <template v-if="(!item.refId || item.refId == 0) && !isDeleted">
        <span class="separator">|</span>
        <button @click="dependentMode = !dependentMode">답글</button>
      </template>
    </div>
  </li>
  <div class="dependent-input is-dependent" v-if="dependentMode">
    <div class="textarea-item">
      <textarea
        id="comment-edit"
        v-model="dependentInput"
        :class="{ 'is-empty': dependentInput === '' }"
        maxlength="500"
        @keydown="autoResize"
        @keydown.enter.exact.prevent
      />
      <label for="comment-edit">대댓글을 남겨주세요</label>
      <div class="edit-btn-group">
        <button
          class="regist-btn"
          @click="registDependentReply(boardId, item.id, dependentInput)"
        >
          등록
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { getTimeDistanceWithNaturalStr } from "@/utils/text";
import {
  deleteQnaBoardComment,
  modifyQnaBoardComment,
  registQnaBoardComment,
  toggleSupportComments,
} from "@/api/qnaboard";
import { debounce } from "@/utils/global";
export default defineComponent({
  name: "Reply Item",
  props: ["id", "item", "boardId", "myId", "boardWriterId"],
  setup(props, { emit }) {
    const boardId = computed(() => props.boardId || null);
    const myId = computed(() => props.myId || null);
    const content = computed(() => props.item.content || null);
    const isDeleted = computed(
      () => props.item.content == "작성자가 삭제한 댓글입니다" || false
    );
    const commentId = computed(() => props.item.id || null);
    const actionBtnRef = ref(null);
    const actionModal = ref(false);
    const editMode = ref(false);
    const editInput = ref(content.value);
    const dependentMode = ref(false);
    const dependentInput = ref("");
    document.addEventListener("click", documentClick);

    function documentClick(e: any) {
      let el: any = actionBtnRef.value;
      let target = e.target;
      if (el && el !== target && !el.contains(target)) {
        actionModal.value = false;
      }
    }
    function autoResize(e: any) {
      const obj = e.target;
      obj.style.height = "auto";
      obj.style.height = 20 + obj.scrollHeight + "px";
    }
    async function registDependentReply(bId: string, cId: string, cont: string) {
      try {
        if (!cont.length) {
          alert("내용을 입력해주세요!");
          return;
        }
        const payload = {
          refId: cId,
          content: cont,
        };
        const res = await registQnaBoardComment(payload, bId);
        dependentMode.value = false;
        dependentInput.value = "";
        emit("refresh");
      } catch (e) {
        console.error(e);
      }
    }
    async function modifyReply(bId: string, cId: string, refId: string, cont: string) {
      try {
        if (!cont.length) {
          alert("내용을 입력해주세요!");
          return;
        }
        const payload = {
          refId: refId,
          content: cont,
        };
        const res = await modifyQnaBoardComment(payload, bId, cId);
        editMode.value = false;
        dependentMode.value = false;
        editInput.value = "";
        emit("refresh");
      } catch (e) {
        console.error(e);
      }
    }
    async function removeReply(bId: string, rId: string) {
      try {
        const res = await deleteQnaBoardComment(bId, rId);
        editMode.value = false;
        emit("refresh");
      } catch (e) {
        console.error(e);
      }
    }
    function startEditMode() {
      editMode.value = true;
      editInput.value = content.value;
      actionModal.value = false;
      setTimeout(() => {
        const obj: any = document.getElementById("comment-edit");
        obj.focus();
        autoResize({ target: obj });
      }, 10);
    }
    function endEditMode() {
      editMode.value = false;
    }
    async function toggleSupportBtn() {
      try {
        if (isDeleted.value) return;
        await toggleSupportComments(commentId.value);
        emit("refresh");
      } catch (e) {
        console.error(e);
        emit("refresh");
      }
    }
    return {
      actionModal,
      actionBtnRef,
      getTimeDistanceWithNaturalStr,
      documentClick,
      editMode,
      autoResize,
      startEditMode,
      editInput,
      removeReply,
      endEditMode,
      modifyReply,
      dependentMode,
      registDependentReply,
      dependentInput,
      toggleSupportBtn: debounce(toggleSupportBtn, 500),
      isDeleted,
    };
  },
  unmounted() {
    document.removeEventListener("click", this.documentClick);
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/mixin";
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
.dependent-input {
  padding-top: 20px;
  padding-bottom: 40px;
  &.is-dependent {
    padding-right: 20px;
  }
}
.edit-btn-group {
  right: 8px;
  bottom: 8px;
  position: absolute;
  .cancle {
    font-size: 16px;
    line-height: 19px;
    color: var(--text-color-4);
    font-weight: var(--font-weight-bold);
    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 17px;
    }
  }
  .separator {
    color: var(--background-color-1);
  }
  .regist-btn {
    font-size: 16px;
    line-height: 19px;
    font-weight: var(--font-weight-bold);
    color: var(--secondary-green-color-1);

    @include breakpoint-down-sm {
      font-size: 14px;
      line-height: 17px;
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
.textarea-item {
  margin-top: 10px;
  position: relative;
  textarea {
    margin-top: 10px;
    display: block;
    padding: 16px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    font-size: 16px;
    border-radius: 2px;
    resize: none;
    font-size: 16px;
    overflow: hidden;
    width: 100%;
    height: auto;
    &:focus + label {
      display: none;
    }
    &:not(.is-empty) + label {
      display: none;
    }
    &:focus {
      border: 1px solid var(--secondary-green-color-1);
    }
    @include breakpoint-down-sm {
      height: 120px;
      font-size: 14px;
    }
  }
  label {
    pointer-events: none;
    font-size: var(--font-size-p-2);
    line-height: 19px;
    color: var(--text-color-3);
    position: absolute;
    top: 11px;
    left: 12px;
    word-break: keep-all;

    @include breakpoint-down-sm {
      font-size: 14px;
    }
  }
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
</style>
