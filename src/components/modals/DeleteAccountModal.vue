<template>
  <DefaultModal @close="closeModal">
    <div class="conatiner">
      <div class="title">{{ option.title }}</div>
      <div class="content" v-html="option.content" />
      <div v-for="(button, index) in option.buttons" :key="index" :class="['button', button.class]" @click="button.action">
        <span>{{ button.content }}</span>
      </div>
    </div>
  </DefaultModal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import DefaultModal from './DefaultModal.vue';
import { withdrawal } from '@/api/member';
import { useRouter } from 'vue-router';
import { tokenSvc } from '@/api/token-service';

export default defineComponent({
  name: 'Report Modal',
  components: {
    DefaultModal,
  },
  setup(props, { emit }) {
    const router = useRouter();
    function closeModal() {
      emit('close');
    }
    const type = ref('confirm' as 'confirm' | 'complete');
    const options = {
      confirm: {
        title: '정말 탈퇴하시겠습니까?',
        content: `탈퇴후에는 계정을 복구할 수 없어요<br />이미 남겨주신 글, 좋아요, 난이도 투표 등은 탈퇴 후에도 삭제되지 않습니다.`,
        buttons: [
          {
            class: 'fill',
            content: `다시 한 번 생각해볼게요`,
            action: () => {
              closeModal();
            },
          },
          {
            class: 'empty',
            content: `네, 탈퇴하겠습니다`,
            action: async () => {
              await withdrawal();
              type.value = 'complete';
            },
          },
        ],
      },
      complete: {
        title: '탈퇴가 완료되었습니다.',
        content: `이용해주셔서 감사합니다.<br/>더 만족스러운 서비스를 제공할 수 있도록 노력하겠습니다.`,
        buttons: [
          {
            class: 'fill',
            content: `홈으로`,
            action: () => {
              tokenSvc.removeToken();
              router.push('/home');
            },
          },
        ],
      },
    };
    const option = computed(() => options[type.value]);
    return { closeModal, option };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.conatiner {
  text-align: left;
  overflow: hidden;
  position: relative;
  width: 400px;
  background-color: #fff;
  border-radius: 4px;
  padding: 60px;
  @include breakpoint-down-sm {
    width: 100%;
    padding: 26px 20px;
  }
  .title {
    font-weight: var(--font-weight-bold);
    font-size: 20px;
    line-height: 20px;
    /* or 100% */

    letter-spacing: -0.01em;

    /* text/1 */

    color: var(--text-color-1);
    margin-bottom: 15px;
    @include breakpoint-down-sm {
      font-size: 18px;
      line-height: 22px;
    }
  }

  .content {
    font-weight: var(--font-weight-medium);
    font-size: 18px;
    line-height: 26px;
    /* or 144% */

    letter-spacing: -0.01em;

    /* text/3 */

    color: var(--text-color-3);
    margin-bottom: 40px;
    @include breakpoint-down-sm {
      font-size: 16px;
      line-height: 24px;
    }
  }

  .button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;

    width: 280px;
    height: 40px;

    /* deepgreen/1-main */

    border-radius: 2px;
    @include breakpoint-down-sm {
      width: 100%;
    }
    span {
      font-weight: var(--font-weight-medium);
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      letter-spacing: 0.02em;

      /* Inside auto layout */

      flex: none;
      order: 0;
      flex-grow: 0;
      margin: 0px 10px;
      @include breakpoint-down-sm {
        font-size: 14px;
        line-height: 17px;
      }
    }

    &.fill {
      background: var(--primary-color-1);
      color: #ffffff;
    }

    &.empty {
      border: 1px solid #365650;
      box-sizing: border-box;
      background: #ffffff;
      color: var(--primary-color-1);
      margin-top: 12px;
    }
  }
}
</style>
