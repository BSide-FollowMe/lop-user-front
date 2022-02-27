<template>
  <div class="inner-container">
    <div class="main">
      <div
        class="report-button"
        @click="
          openReport({
            modalTitle: '제보하기',
            contentsLabel: '잘못된 정보나 건의하고 싶으신 내용을 작성해주세요.',
          })
        "
      >
        <img class="icon" :src="Feedback" />
        제보하기
      </div>
      <div class="text">잘못된 정보를 발견하셨나요? 식물의언어 팀에 제보해주세요. 보다 정확한 식물의언어를 전할 수 있도록 노력하겠습니다.</div>
    </div>
  </div>
</template>

<script lang="ts">
import Feedback from '@/assets/icon/feedback.svg';
import { defineComponent } from 'vue';
export default defineComponent({
  setup(props, { emit }) {
    const openReport = ({ modalTitle, contentsLabel }: { modalTitle: string; contentsLabel: string }) => {
      emit('openReport', { modalTitle, contentsLabel });
    };
    return {
      Feedback,
      openReport,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.inner-container {
  margin-bottom: 80px;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.report-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border: 1px solid var(--secondray-color-2);
  box-sizing: border-box;
  border-radius: 4px;
  width: 130px;
  height: 37px;
  margin-bottom: 20px;
  .icon {
    margin-right: 7.5px;
  }
  font-weight: var(--font-weight-medium);
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* orangebrown/1-main */

  color: var(--secondy-color-2);
  @include breakpoint-down-sm {
    width: 104px;
    height: 32px;
    font-size: 13px;
    line-height: 16px;
  }
}
.text {
  width: 326px;
  font-weight: var(--font-weight-medium);
  font-size: 14px;
  line-height: 20px;
  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 18px;
  }
  /* or 143% */

  text-align: center;
  letter-spacing: -0.01em;

  /* text/3 */

  color: var(--text-color-3);
}
</style>
