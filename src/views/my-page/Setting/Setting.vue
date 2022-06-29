<template>
  <div class="container">
    <section class="topper">
      <div>
        <div class="setting-icon" />
        <div class="title">설정</div>
      </div>
      <div class="resign" @click="oepnWithdrawl">탈퇴하기</div>
    </section>
    <section class="main">
      <form @submit.prevent="submitNickName">
        <div class="label">닉네임 수정</div>
        <div class="input">
          <input type="text" v-model="nickName" @input="checkValidation" />
          <div v-if="error" class="validation-message error">
            {{ error }}
          </div>
          <div v-if="success" class="validation-message success">
            <div>새로운 닉네임이 저장되었습니다.</div>
          </div>
        </div>
        <button :disabled="!!error" class="button save"><span>저장</span></button>
      </form>
      <div>
        <div class="label">문의하기</div>
        <div class="content">
          궁금한점이나 제안하고 싶은 사항이 있나요?
          <br />
          문의하기 버튼을 눌러 식물의언어 팀에 연락주세요<img :src="smile" />
        </div>
        <button
          class="button ask"
          @click="
            openReport({
              modalTitle: '문의하기',
              contentsLabel: '잘못된 정보나 건의하고 싶으신 내용을 작성해주세요.',
            })
          "
        >
          <span>문의하기</span>
        </button>
      </div>
    </section>
  </div>
  <RequestModal v-if="reportOpened" :options="reportOptions" @confirm="report" @close="reportOpened = false" />
  <DeleteAccountModal v-if="withdrawalOpened" @close="withdrawalOpened = false"></DeleteAccountModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { getBytes } from '@/utils/text';
import { updateMyAccount } from '@/api/member';
import RequestModal from '@/components/organisms/Modals/RequestModal.vue';
import { registReport } from '@/api/plant';
import DeleteAccountModal from '@/components/organisms/Modals/DeleteAccountModal.vue';
import axios from 'axios';
import { useStore } from 'vuex';
import smile from '@/assets/icon/smile.svg';

export default defineComponent({
  components: {
    RequestModal,
    DeleteAccountModal,
  },
  setup() {
    const store = useStore();
    const nickName = ref('');
    const error = ref('');
    const success = ref(false);
    const reportOpened = ref(false);
    const withdrawalOpened = ref(false);
    const reportOptions = ref({} as { modalTitle: string; contentsLabel: string });
    watchEffect(() => {
      nickName.value = store.getters.getUserInfo.nickname;
    });
    const submitNickName = async () => {
      if (error.value) {
        alert('error!');
        return;
      }
      try {
        await updateMyAccount({ nickname: nickName.value });
        success.value = true;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          error.value = e.response?.data.message;
        } else if (e instanceof Error) {
          error.value = e.message;
        }
      }
    };
    const checkValidation = () => {
      success.value = false;
      error.value = '';
      error.value = getBytes(nickName.value) > 20 ? '최대 10자 (20byte)까지 입력할 수 있어요.' : '';
    };
    const openReport = ({ modalTitle, contentsLabel }: { modalTitle: string; contentsLabel: string }) => {
      reportOpened.value = true;
      reportOptions.value = { modalTitle, contentsLabel };
    };

    const oepnWithdrawl = () => {
      withdrawalOpened.value = true;
    };

    async function report({ email, contents }: { email: string; contents: string }) {
      try {
        const payload = {
          content: contents,
          email: email,
          reportType: 'INQUIRE' as const,
        };
        await registReport(payload);
        alert('질문이 등록되었습니다. 입력한 메일 주소로 답변드리겠습니다.');
        reportOpened.value = false;
      } catch (e) {
        console.error(e);
      }
    }

    return {
      smile,
      submitNickName,
      nickName,
      checkValidation,
      error,
      success,
      openReport,
      reportOpened,
      oepnWithdrawl,
      withdrawalOpened,
      reportOptions,
      report,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.container {
  background: #ffffff;
  border-radius: 4px;
  padding: 60px 60px 25px 60px;
  max-width: 960px;
  @include breakpoint-down-sm {
    min-width: 320px;
    padding: 30px 20px 0px 20px;
  }

  .topper {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #ededed;
    .title {
      margin-left: 10px;
      display: inline-block;
      font-weight: var(--font-weight-bold);
      font-size: 18px;
      line-height: 26px;
      /* identical to box height, or 144% */

      text-align: center;
      letter-spacing: -0.01em;

      /* text/1 */

      color: var(--text-color-1);
    }
    .resign {
      cursor: pointer;
      font-weight: var(--font-weight-medium);
      font-size: 15px;
      line-height: 26px;
      /* identical to box height */

      text-align: center;
      letter-spacing: -0.0025em;
      text-decoration-line: underline;

      /* text/3 */

      color: var(--text-color-2);
    }
  }
  .main > div,
  .main > form {
    display: flex;
    justify-content: space-between;
    padding: 50px 0;
    &:first-child {
      border-bottom: 1px solid #ededed;
    }
    @include breakpoint-down-sm {
      display: block;
      padding: 40px 0 60px 0;
      > * {
        margin-bottom: 20px;
      }
    }
  }
}
.button {
  cursor: pointer;
  text-align: center;

  min-width: 140px;
  height: 40px;
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

  &.save {
    background: #ffffff;
    color: var(--primary-color-1);
  }
  &.ask {
    background: var(--primary-color-1);
    color: #ffffff;
  }
  &[disabled] {
    cursor: default;
    border: 1px solid #999999 !important;
    background: #cccccc !important;
    color: var(--text-color-2) !important;
  }
  border: 1px solid #365650;
  box-sizing: border-box;
  border-radius: 2px;
}
.label {
  min-width: 82px;
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/3 */

  color: var(--text-color-3);
  margin-right: 100px;
  @include breakpoint-down-sm {
    font-size: 16px;
    margin-right: 0;
  }
}
.input {
  width: 508px;
  margin-right: 7px;
  @include breakpoint-down-sm {
    width: 100%;
  }
  > input {
    padding: 11px 12px 10px;
    width: 100%;
    height: 40px;

    /* bg,line/2 */

    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
  }
}
.validation-message {
  font-weight: var(--font-weight-medium);
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: -0.01em;
  margin-top: 6px;
  &:first-of-type {
    margin-top: 10px;
  }

  @include breakpoint-down-sm {
    font-size: 12px;
  }
  &.error {
    /* orangebrown/1-main */
    color: var(--secondray-color-2);
  }
  &.success {
    /* green/2 */
    color: var(--secondary-green-color-2);
  }
}
.content {
  width: 508px;
  font-weight: var(--font-weight-medium);
  font-size: 16px;
  line-height: 24px;
  /* or 150% */

  letter-spacing: -0.01em;
  color: var(--text-color-2);
  img {
    width: 16px;
    height: 16px;
    vertical-align: text-top;
    margin-left: 5px;
    @include breakpoint-down-sm {
      width: 12px;
      height: 12px;
      vertical-align: baseline;
      margin-left: 3px;
    }
  }
  @include breakpoint-down-sm {
    width: 100%;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0025em;
  }
}

.setting-icon {
  display: inline-block;
  -webkit-mask-image: url('@/assets/icon/setting.svg');
  mask-image: url('@/assets/icon/setting.svg');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center center;
  mask-position: center center;
  width: 24px;
  height: 24px;
  mask-size: 24px;
  background-color: var(--primary-color-1);
  vertical-align: text-top;
}
</style>
