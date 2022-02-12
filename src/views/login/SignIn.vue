<template>
  <div class="container">
    <div class="inner-container">
      <section class="signin">
        <img src="@/assets/images/signin/login-image.png" />
        <h2 class="text-light">
          우리가 몰랐던 식물의언어,
          <br />
          <span class="text-bold">함께 들어볼까요?</span>
        </h2>
        <div class="signin-btn-group">
          <button class="kakao-login" @click="onClickLoginKakao">카카오로 시작하기</button>
          <button class="naver-login" @click="onClickLoginNaver">네이버로 시작하기</button>
          <span class="tos-and-pp-tip text-caption">
            회원가입 시 이용자는 식물의언어
            <a @click="OPEN_LINK.TOS">이용약관</a>
            및
            <a @click="OPEN_LINK.PP">개인정보처리방침</a>
            에
            <br />
            동의하게 됩니다.
          </span>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { OPEN_LINK } from '@/router/routing';
import { doKakaoLogin, doNaverLogin } from '@/api/account';

const CURRENT_URL = window.location.protocol + '//' + window.location.host;

export default defineComponent({
  name: 'Sign In',
  components: {},
  setup() {
    const store = useStore();
    const onSubmit = (id: string, pwd: string) => {
      store.dispatch('signIn', { id: id, password: pwd });
    };

    return { OPEN_LINK, doKakaoLogin, doNaverLogin };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';
.container {
  background-color: var(--background-color-5);
}
.inner-container {
  margin-left: auto;
  margin-right: auto;
  padding: var(--content-container-padding);
  max-width: var(--content-container-inner);
  min-height: 690px;
  height: calc(100vh - var(--topper-header-height) - var(--bottom-footer-height));
  background-color: #fff;
  text-align: left;
  @include breakpoint-down-sm {
    min-width: var(--m-content-container-inner);
    min-height: 602px;
  }
}
.signin {
  display: flex;
  align-content: center;
  margin: auto;
  margin-top: -60px;
  width: 360px;
  height: 100%;
  flex-wrap: wrap;
  @include breakpoint-down-sm {
    margin-top: -30px;
    width: 320px;
    justify-content: center;
    text-align: center;
  }
  & > * {
    display: block;
    width: 100%;
  }
  img {
    width: 168px;
    height: 156px;
    @include breakpoint-down-sm {
      width: 172px;
      height: 160px;
    }
  }
  h2 {
    line-height: 32px;
    @include breakpoint-down-sm {
      margin-top: 30px;
      font-size: 22px;
      line-height: 28px;
    }
  }
  .signin-btn-group {
    display: flex;
    margin: auto;
    flex-wrap: wrap;
    gap: 10px;
    button {
      display: block;
      width: 100%;
      height: 50px;
      cursor: pointer;
      border: none;
      font-size: var(--font-size-p-2);
      line-height: 50px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  .kakao-login {
    background-color: #fee500;
    background-image: url('@/assets/icon/sns-kakao.png');
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: 9px;
  }
  .naver-login {
    color: #fff;
    background-color: #03c75a;
    background-image: url('@/assets/icon/sns-naver.png');
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: 9px;
  }
  .tos-and-pp-tip {
    text-align: left;
    margin-top: 10px;
    color: var(--text-color-3);
    @include breakpoint-down-sm {
      margin-top: 0px;
    }
    a {
      cursor: pointer;
      color: var(--primary-color);
      border-bottom: var(--primary-color) 1px solid;
    }
  }
}
</style>
