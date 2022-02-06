<template>
  <div class="inner-container">
    <div class="main">
      <div class="report-button">
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
  setup() {
    return {
      Feedback,
    };
  },
});
</script>

<style lang="scss" scoped>
.inner-container {
  > * {
    min-width: 960px;
  }
  margin-bottom:80px;
  .main{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.report-button {
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border: 1px solid #c9704c;
  box-sizing: border-box;
  border-radius: 4px;
  width: 130px;
  height: 37px;
  margin-bottom: 20px;
  .icon {
    margin-right: 7.5px;
  }
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* orangebrown/1-main */

  color: #c9704c;
}
.text {
  width: 326px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  text-align: center;
  letter-spacing: -0.01em;

  /* text/3 */

  color: #969696;
}
</style>
