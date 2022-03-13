<template>
  <DefaultModal @close="closeModal">
    <div class="conatiner">
      <div class="title">
        <img src="@/assets/icon/feedback.svg" />
        <span class="text-bold">{{ options?.modalTitle }}</span>
      </div>
      <hr class="divider" />
      <span class="objective" v-if="options?.objective">제보할 식물</span>
      <span class="target-name" v-if="options?.objective">{{ options?.objective }}</span>
      <div class="contents-input">
        <textarea id="contents" v-model="contents" :class="{ 'is-empty': contents === '' }" />
        <label for="contents">{{ options?.contentsLabel }}</label>
      </div>
      <span class="objective">연락받을 이메일</span>
      <div class="email-input">
        <input id="email" v-model="email" type="text" :class="{ 'is-empty': email === '' }" />
        <label for="email">ex) plantslang@naver.com</label>
      </div>
      <span class="description">
        <img src="@/assets/icon/task_alt_black_24dp.svg" />
        보내주신 내용은 식물의언어 팀에서 확인 후 이메일로 빠르게 답변 드리겠습니다.
      </span>
      <div class="bottom">
        <VueButton color="primary" class="confirm-btn" @click="confirm">등록하기</VueButton>
      </div>
    </div>
  </DefaultModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DefaultModal from './DefaultModal.vue';
import VueButton from '@/components/buttons/VueButton.vue';
export default defineComponent({
  name: 'Report Modal',
  components: {
    DefaultModal,
    VueButton,
  },
  props: ['options'],
  setup(props, { emit }) {
    const email = ref('');
    const contents = ref('');
    function closeModal() {
      emit('close');
    }
    function confirm() {
      emit('confirm', {
        email: email.value,
        contents: contents.value,
      });
      window.document.body.style.overflow = "auto";
    }
    return { closeModal, email, contents, props, confirm };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.conatiner {
  text-align: left;
  overflow: hidden;
  position: relative;
  width: 750px;
  background-color: #fff;
  border-radius: 4px;
  padding: 40px;
  @include breakpoint-down-sm {
    width: 100%;
    padding: 26px 20px;
  }
  .title {
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    span {
      font-size: 20px;
      line-height: 20px;
      margin-left: 12px;
      @include breakpoint-down-sm {
        font-size: 18px;
      }
    }
  }
  .divider {
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid var(--background-color);
  }
  .objective {
    @include breakpoint-down-sm {
      font-size: 14px;
    }
  }
  .target-name {
    color: var(--text-color-2);
    margin-left: 34px;
    @include breakpoint-down-sm {
      margin-left: 20px;
      font-size: 14px;
    }
  }
  .bottom {
    margin-top: 40px;
    text-align: center;
  }
  .confirm-btn {
    width: 140px;
    height: 40px;
  }
}
.contents-input {
  position: relative;
  margin-top: 10px;
  margin-bottom: 20px;
  textarea {
    display: block;
    padding: 12px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: 200px;
    &:focus + label {
      display: none;
    }
    &:not(.is-empty) + label {
      display: none;
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
    }
  }
}
.email-input {
  position: relative;
  margin-top: 10px;
  margin-bottom: 15px;
  input {
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: 40px;
    padding-left: 12px;
    &:focus + label {
      display: none;
    }
    &:not(.is-empty) + label {
      display: none;
    }
    @include breakpoint-down-sm {
      height: 38px;
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

    @include breakpoint-down-sm {
    }
  }
}
.description {
  img {
    vertical-align: text-top;
  }
  font-size: var(--font-size-caption);
  line-height: 20px;
  @include breakpoint-down-sm {
    font-size: var(--m-font-size-caption);
    line-height: 18px;
  }
}
</style>
