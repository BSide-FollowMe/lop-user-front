<template>
  <div class="container">
    <section class="topper">
      <div>
        <div class="setting-icon" />
        <div class="title">설정</div>
      </div>
      <div class="resign">탈퇴하기</div>
    </section>
    <section class="main">
      <form @submit.prevent="submitNickName">
        <div class="label">닉네임 수정</div>
        <div>
          <input class="input" type="text" v-model="nickName" @input="checkValidation"/>
          <div v-if="error" class="error">
            {{error}}
          </div>
          <div v-if="success" class="success">
            <div>새로운 닉네임이 저장되었습니다.</div>
          </div>
        </div>
        <button class="button save" ><span>저장</span></button>
      </form>
      <div>
        <div class="label">문의하기</div>
        <div class="content">
          궁금한점이나 제안하고 싶은 사항이 있나요?
          <br />
          문의하기 버튼을 눌러 식물의언어 팀에 연락주세요
          <img :src="smile" />
        </div>
        <button class="button ask"><span>문의하기</span></button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import smile from '@/assets/icon/smile.svg';
import {getBytes} from '@/utils/text';
export default defineComponent({
  setup() {
    const nickName = ref('');
    const error = ref('');
    const success = ref(false);
    const submitNickName = () => {
      if(error.value){
        alert('error!');
        return;
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          alert(nickName.value + ' has been submitted!');
          success.value=true;
          // error.value='중복된 닉네임입니다. 다른 이름을 입력해주세요.'
          resolve(true);
        }, 500);
      });
    };
    const checkValidation = ()=>{
      error.value = '';
      error.value = getBytes(nickName.value)>20 ? '최대 10자 (20byte)까지 입력할 수 있어요.' : '';
    };
    return {
      smile,
      submitNickName,
      nickName,
      checkValidation,
      error,
      success
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
  min-width: 960px;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 56px;

  width: 140px;
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
  border: 1px solid #365650;
  box-sizing: border-box;
  border-radius: 2px;
}
.label {
  width: 82px;
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 11px 12px 10px;

  width: 508px;
  height: 40px;

  /* bg,line/2 */

  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 2px;
  margin-right: 7px;
  @include breakpoint-down-sm {
    width: 100%;
  }
  & ~ .error {
    font-weight: var(--font-weight-medium);
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    letter-spacing: -0.01em;

    /* orangebrown/1-main */

    color: var(--secondray-color-2);
    @include breakpoint-down-sm {
      font-size: 12px;
    }
  }
  & ~ .success {
    font-weight: var(--font-weight-medium);
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    letter-spacing: -0.01em;

    /* green/2 */
    color: var(--secondary-green-color-2);
    @include breakpoint-down-sm {
      font-size: 12px;
    }
  }
}
.content {
  width: 508px;
  font-weight: var(--font-weight-medium);
  font-size: 16px;
  line-height: 24px;
  /* or 150% */

  letter-spacing: -0.01em;

  /* text/2 */

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
