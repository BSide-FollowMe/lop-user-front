<template>
  <section class="reply-container">
    <hr class="separate-content" />
    <div class="reply-count">
      <span class="title">댓글</span>
      <span class="count">{{ ' ' + replyCount }}</span>
    </div>
    <div class="input-item" @click="myId ? false : toLogin()">
      <AutoResizeTextArea id="reply" v-model="replyInput" :class="{ 'is-empty': replyInput === '' }" maxlength="500" />
      <label for="reply">답변을 남겨주세요</label>
      <div class="edit-btn-group">
        <button class="regist-btn" @click="registComment">등록</button>
      </div>
    </div>
    <div class="length-counter">({{ replyInput.length }}/500)</div>
    <ul class="reply-list">
      <ReplyItem
        v-for="(item, index) in comments.data"
        :key="`reply-item-${index}`"
        :id="item.id"
        :boardId="boardId"
        :boardWriterId="boardWriterId"
        :myId="myId"
        :item="item"
        @refresh="refresh"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, nextTick } from 'vue';
import store from '@/store';
import { debounce } from '@/utils/global';
import ReplyItem from './_ReplyItem.vue';
import { registQnaBoardComment } from '@/api/qnaboard';
import { useRoute } from 'vue-router';
import { ROUTE_TO } from '@/router/routing';
import router from '@/router';
import AutoResizeTextArea from '@/components/inputs/AutoResizeTextArea.vue';

export default defineComponent({
  name: 'Reply List',
  components: { ReplyItem, AutoResizeTextArea },
  props: ['comments', 'boardId', 'boardWriterId'],
  setup(props, { emit }) {
    const route = useRoute();
    const myUserInfo = computed(() => store.getters.getUserInfo);
    const myId = computed(() => myUserInfo.value?.id || null);
    const replyCount = computed(() => {
      return props.comments.size;
    });
    const boardId = computed(() => props.boardId);
    const replyInput = ref('');
    async function registComment(text: string, boardId: string) {
      try {
        if (!text.length) {
          alert('내용을 입력해주세요!');
          return;
        }
        const payload = {
          content: text,
        };
        const res = await registQnaBoardComment(payload, boardId);
        refresh();
      } catch (e) {
        console.error(e);
      }
    }
    function refresh() {
      replyInput.value = '';
      emit('refresh');
    }

    function toLogin() {
      alert('로그인이 필요합니다.');
      ROUTE_TO.LOGIN();
    }
    const scrollFix = (hashbang: string) => {
      setTimeout(() => {
        location.hash = hashbang;
      }, 0);
    };

    if (route.hash) {
      router.replace(route.path);
      nextTick(() => {
        scrollFix(`${route.hash}`);
      });
    }

    return {
      replyCount,
      replyInput,
      myId,
      registComment: debounce(($event: any) => {
        registComment(replyInput.value, boardId.value);
      }, 500),
      refresh,
      debounce,
      toLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.reply-container {
  background-color: #fff;
  border-radius: 4px;
  padding: 0px 60px 60px;
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
    @include breakpoint-down-sm {
      font-size: 16px;
    }
  }
}
.separate-content {
  border: none;
  border-bottom: 1px solid #e5e5e5;
  margin: 0px;
}
.reply-count {
  margin-top: 40px;
  font-size: 20px;
  line-height: 20px;
  font-weight: var(--font-weight-bold);
  .title {
    color: var(--text-color-1);
  }
  .count {
    color: var(--secondary-green-color-1);
  }
  @include breakpoint-down-sm {
    margin-top: 20px;
    font-size: 16px;
  }
}
.input-item {
  margin-top: 20px;
  position: relative;
  textarea {
    margin-top: 10px;
    display: block;
    padding: 16px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: 118px;
    min-height: 100px;
    overflow: hidden;
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
      height: 118px;
      min-height: 100px;
    }
  }
  label {
    pointer-events: none;
    font-size: var(--font-size-p-2);
    line-height: 19px;
    color: var(--text-color-3);
    position: absolute;
    top: 16px;
    left: 12px;
    word-break: keep-all;

    @include breakpoint-down-sm {
      font-size: 14px;
    }
  }
  @include breakpoint-down-sm {
    margin-top: 6px;
  }
}
.edit-btn-group {
  right: 8px;
  bottom: -4px;
  position: absolute;
  button.regist-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    line-height: 50px;
    font-weight: var(--font-weight-bold);
    color: var(--secondary-green-color-1);
    @include breakpoint-down-sm {
      font-size: 14px;
    }
  }
}
.length-counter {
  margin-top: 8px;
  text-align: right;
  font-size: 12px;
  line-height: 14px;
  color: var(--text-color-3);
}
.reply-list {
  margin-top: 10px;
}
</style>
