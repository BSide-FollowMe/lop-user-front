<template>
  <div class="inner-container">
    <section class="title">마이페이지</section>
    <section class="form">
      <div class="level">
        <div class="level-icon">
          <img :src="getImgUrl(myAccountInfo.memberLevel?.grade)" />
        </div>
        <div>
          <div class="level-text">
            <div class="inner-level-text">
              {{ myAccountInfo.memberLevel?.grade }}
            </div>
          </div>
          <img class="help icon" :src="helpIcon" @click="openGradeGuideModal()" />
        </div>
      </div>
      <div class="username">
        {{ myAccountInfo.nickname }}
        <span>님</span>
        <img class="setting icon" :src="settingIcon" @click="moveToSetting()" />
      </div>
      <div class="email">{{ myAccountInfo.email }}</div>
      <section class="button-group">
        <div class="button" @click="moveToMyPlant()">
          <div class="button-icon heart-fill-icon" />
          <span>내가 저장한 식물</span>
        </div>
        <div class="button" @click="moveToMyQuestion()">
          <div class="button-icon question-answer-icon" />
          <span>나의 질문 · 답변</span>
        </div>
        <div class="button" @click="OPEN_LINK.INTRODUCTION">
          <div class="button-icon info-icon" />
          <span>서비스 소개</span>
        </div>
      </section>
      <div class="logout" @click="logout()">
        <div class="logout-icon" />
        로그아웃
      </div>
    </section>
  </div>
  <GradeGuideModal
    v-if="gradeGuideOpened"
    :options="{
      nickname: myAccountInfo.nickname,
      memberLevel: myAccountInfo.memberLevel,
    }"
    @close="gradeGuideOpened = false"
  />
</template>

<script lang="ts">
import setMeta from "@/utils/setMeta";
import { defineComponent, onMounted, ref } from "vue";
import { Member } from "@/types/api/member";
import { getMyAccountInfo, updateMyAccount } from "@/api/member";
import helpIcon from "@/assets/icon/help.svg";
import settingIcon from "@/assets/icon/setting.svg";
import { getImgUrl } from "@/utils/member";
import { useRouter } from "vue-router";
import { tokenSvc } from "@/api/token-service";
import GradeGuideModal from "@/components/organisms/Modals/GradeGuideModal.vue";
import { OPEN_LINK } from "@/router/routing";

export default defineComponent({
  components: {
    GradeGuideModal,
  },
  setup() {
    setMeta({
      title: "마이페이지 - 식물의언어",
      description: "",
      path: "/me",
    });
    const myAccountInfo = ref({} as Member);
    const router = useRouter();
    const gradeGuideOpened = ref(false);

    onMounted(async () => {
      myAccountInfo.value = await getMyAccountInfo();
    });
    const moveToMyPlant = () => {
      router.push("/me/my-plant");
    };
    const moveToMyQuestion = () => {
      router.push("/me/qna?list=questions");
    };
    const logout = () => {
      tokenSvc.removeToken();
      router.push("/home");
    };
    const openGradeGuideModal = () => {
      gradeGuideOpened.value = true;
    };
    const moveToSetting = () => {
      router.push("/me/setting");
    };

    return {
      myAccountInfo,
      settingIcon,
      helpIcon,
      logout,
      moveToMyPlant,
      openGradeGuideModal,
      gradeGuideOpened,
      moveToSetting,
      moveToMyQuestion,
      OPEN_LINK,
      getImgUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/";
.title {
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: -0.0025em;
  color: var(--primary-color-1);

  margin-bottom: 50px;
  @include breakpoint-down-sm {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 40px;
  }
}
.form {
  background: #ffffff;
  border-radius: 4px;
  width: 100%;
  height: 607px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 78px 0 60px 0;
  @include breakpoint-down-sm {
    padding: 40px 0 40px 0;
    height: 499px;
  }
}
.level {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  .level-icon {
    padding: 18px;
    background-color: var(--secondary-green-color-3);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    @include breakpoint-down-sm {
      padding: 12px;
      border-radius: 40px;
    }
  }
  .help {
    vertical-align: middle;
    margin-left: 5.57px;
    width: 16px;
    height: 16px;
  }
  .level-text {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 73px;
    height: 23px;

    /* white */

    background: #ffffff;
    /* green/1 */

    border: 1px solid #599270;
    box-sizing: border-box;
    border-radius: 12px;
    margin-left: 25px;
    .inner-level-text {
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      text-align: center;
      letter-spacing: -0.005em;

      /* green/1 */

      color: var(--secondary-green-color-1);

      /* Inside auto layout */

      flex: none;
      order: 0;
      flex-grow: 0;
      margin: 0px 10px;
      padding: 3px 12px;
    }
  }
}

.username {
  font-weight: var(--font-weight-bold);
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  text-align: center;
  letter-spacing: -0.01em;

  /* text/1 */

  color: var(--text-color-1);
  margin-left: 26px;
  margin-bottom: 4px;
  > span {
    font-weight: normal;
  }
  .setting {
    vertical-align: middle;
    margin-left: 6.57px;
    width: 18px;
    height: 19px;
    @include breakpoint-down-sm {
      width: 15px;
      height: 16px;
    }
  }

  @include breakpoint-down-sm {
    font-size: 16px;
    margin-bottom: 2px;
  }
}

.email {
  font-weight: var(--font-weight-medium);
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.0025em;

  /* text/3 */

  color: var(--text-color-3);
  margin-bottom: 38px;
  @include breakpoint-down-sm {
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 22px;
  }
}

.button-group {
  > .button {
    > * {
      vertical-align: middle;
    }
    cursor: pointer;
    width: 360px;
    height: 60px;

    background: #fff;
    &:hover {
      background-color: var(--secondary-green-color-3);
    }
    /* bg,line/1 */

    border: 1px solid #dddddd;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 14px;
    font-weight: var(--font-weight-medium);
    font-size: 18px;
    line-height: 26px;
    padding: 17px 0 17px 103px;
    /* identical to box height, or 144% */

    letter-spacing: -0.01em;

    /* text/3 */

    color: var(--text-color-3);
    @include breakpoint-down-sm {
      width: 280px;
      height: 56px;
      font-size: 16px;
      line-height: 26px;
      padding: 15px 0 15px 71.33px;
      margin-bottom: 10px;
    }
  }
  .button-icon {
    margin-right: 21px;
    display: inline-block;
    width: 20px;
    height: 20px;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    mask-size: 20px;
    background-color: var(--secondary-green-color-1);
    @include breakpoint-down-sm {
      width: 16px;
      height: 16px;
      mask-size: 16px;
    }
  }
  margin-bottom: 20px;
}

.logout {
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.0025em;
  text-decoration-line: underline;

  /* text/4 */

  color: var(--text-color-4);
  @include breakpoint-down-sm {
    font-size: 13px;
    line-height: 16px;
  }
}

.icon {
  display: inline !important;
  cursor: pointer;
}

.heart-fill-icon {
  -webkit-mask-image: url("@/assets/icon/heart-fill.svg");
  mask-image: url("@/assets/icon/heart-fill.svg");
}
.question-answer-icon {
  -webkit-mask-image: url("@/assets/icon/question_answer.svg");
  mask-image: url("@/assets/icon/question_answer.svg");
}
.info-icon {
  -webkit-mask-image: url("@/assets/icon/info.svg");
  mask-image: url("@/assets/icon/info.svg");
}
.logout-icon {
  display: inline-block;
  -webkit-mask-image: url("@/assets/icon/logout.svg");
  mask-image: url("@/assets/icon/logout.svg");
  width: 13px;
  height: 12px;
  mask-size: 13px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center center;
  mask-position: center center;
  background-color: var(--text-color-4);
  margin-right: 7.3px;
}
</style>
