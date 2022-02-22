<template>
  <div class="container">
    <div class="inner-container qna-detail">
      <section class="qna-detail__title">
        <h1>질문 · 답변</h1>
      </section>
      <section class="detail-form">
        <div class="detail-title">
          <div class="group">
            <span class="placeholder">식물명</span>
            <span class="title">녹영</span>
          </div>
          <div class="group">
            <span class="writer">방구석 식집사</span>
            <span class="separator">|</span>
            <span class="datetime">1시간 전</span>
            <span class="separator">|</span>
            <button class="action-modal-btn" @click="actionModal = true" ref="actionBtnRef">
              <img src="@/assets/icon/more.svg" />
              <ul class="action-list shadow" v-if="actionModal">
                <li>
                  <img src="@/assets/icon/modify-pencil.svg" />
                  <span>수정하기</span>
                </li>
                <hr />
                <li>
                  <img src="@/assets/icon/delete.svg" />
                  <span>삭제하기</span>
                </li>
              </ul>
            </button>
          </div>
        </div>
        <hr class="separate-content" />
        <div class="input-title">물은 얼마나 자주 주셨나요?</div>
        <div class="textarea-item">
          <textarea v-model="plantWaterCycle" readonly maxlength="500" @keyup="autoResize" />
        </div>
        <div class="input-title">식물은 어디에 두셨고 햇빛을 받는 시간은 얼마나 되나요?</div>
        <div class="textarea-item">
          <textarea v-model="plantLifeCycle" readonly maxlength="500" @keyup="autoResize" />
        </div>
        <div class="input-title">증상이 나타났을 때 어떻게 대처하셨나요?</div>
        <div class="textarea-item">
          <textarea v-model="plantCountermeasure" readonly maxlength="500" @keyup="autoResize" />
        </div>
        <div class="content-item">{{ content }}</div>
        <div class="img-item" v-for="index in 3" :key="`img-item-${index}`">
          <img src="@/assets/images/detail/sample-image.png" />
        </div>
        <div class="bottom-btn-group">
          <button>
            <img src="@/assets/icon/reply.svg" />
            답변 3
          </button>
          <span class="separator">|</span>
          <button>
            <img src="@/assets/icon/helpful.svg" />
            도움돼요 300
          </button>
          <span class="separator">|</span>
          <button>
            <img src="@/assets/icon/share-gray.svg" />
            공유하기
          </button>
        </div>
        <hr class="separate-content" />
        <Reply />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Reply from './_Reply.vue';
export default defineComponent({
  name: 'Question Detail',
  components: {Reply},
  setup() {
    const plantName = ref('');
    const writer = ref('방구석 식집사');
    const plantWaterCycle = ref('매주 1회');
    const plantLifeCycle = ref('실내, 오후에 3시간 정도');
    const plantCountermeasure = ref(
      '물을 듬뿍 주고 가습기를 틀어줬어요.물을 듬뿍 주고 가습기를 틀어줬어요.물을 듬뿍 주고 가습기를 틀어줬어요.물을 듬뿍 주고 가습기를 틀어줬어요.물을 듬뿍 주고 가습기를 틀어줬어요.물을 듬뿍 주고 가습기를 틀어줬어요.물을 듬뿍 주고 가습기를 틀어줬어요.물을 듬뿍 주고 가습기를 틀어줬어요.물을 듬뿍 주고 가습기를 틀어줬어요.',
    );
    const content = ref(
      '잎 끝이 노랗게 변했어요. 분갈이를 2주 전에 해주긴 했는데, 뿌리 몸살 증상인가요? 환경이 좀 건조하긴 한데 건조해서 나타나는 증상인지 모르겠어요',
    );
    const actionModal = ref(false);

    document.addEventListener('click', documentClick);
    const actionBtnRef = ref(null);
    function documentClick(e: any) {
      let el: any = actionBtnRef.value;
      let target = e.target;
      if (el !== target && !el.contains(target)) {
        actionModal.value = false;
      }
    }
    return {
      plantName,
      plantWaterCycle,
      plantLifeCycle,
      plantCountermeasure,
      content,
      actionModal,
      actionBtnRef,
    };
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
  padding: 0px var(--content-container-padding);
  max-width: var(--content-container-max-width);
  overflow: visible;
  @include breakpoint-down-sm {
    padding: unset;
    min-width: var(--m-content-container-max-width);
  }
}
.qna-detail {
  padding-bottom: 120px;

  &__title {
    padding: 20px;
    text-align: center;
    h1 {
      display: block;
      margin-top: 60px;
      margin-bottom: 30px;
      color: var(--primary-color-1);
      @include breakpoint-down-sm {
        font-size: 18px;
        margin-top: 40px;
        margin-bottom: 22px;
      }
    }
  }
  @include breakpoint-down-sm {
    padding-bottom: 60px;
  }
}
.detail-form {
  background-color: #fff;
  border-radius: 4px;
  padding: 60px;
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
.page-btn-group {
  text-align: center;

  button {
    cursor: pointer;
    margin: 0px 5px;
    padding: 25px 30px;
    width: 240px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid var(--background-color-1);
    background-color: transparent;

    span {
      float: left;
      color: var(--text-color-3);
      line-height: 50px;
      font-size: var(--font-size-p);
      font-weight: var(--font-weight-medium);
    }
    img {
      float: right;
      width: 50px;
      height: 50px;
    }
    &.active {
      border: 1px solid var(--secondary-green-color-1);
      background-color: var(--secondary-green-color-3);
      span {
        color: var(--secondary-green-color-1);
        font-weight: var(--font-weight-bold);
      }
      &.ask-help > img {
        content: url('@/assets/icon/ask-help-primary.svg');
      }
      &.ask-question > img {
        content: url('@/assets/icon/ask-question-primary.svg');
      }
    }
    @include breakpoint-down-sm {
      position: relative;
      width: 135px;
      height: 85px;
      padding: 10px;
      text-align: center;
      margin: 0px 0px 10px;
      &.ask-help {
        margin-right: 5px;
      }
      &.ask-question {
        margin-left: 5px;
      }
      span {
        position: relative;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        line-height: 17px;
        // word-break:keep-all;
      }
      img {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
      }
    }
  }
}
.input-title {
  color: var(--text-color-1);
  margin-top: 40px;
  font-size: 18px;
  line-height: 26px;
  @include breakpoint-down-sm {
    font-size: 16px;
  }
}

.textarea-item {
  margin-top: 10px;
  position: relative;
  textarea {
    margin-top: 10px;
    display: block;
    padding: 12px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: 200px;
    font-size: 18px;
    line-height: 26px;
    color:var(--text-color2);
    @include breakpoint-down-sm {
      height: 120px;
    }
  }
}
.img-item {
  margin-top: 30px;
}
.bottom-btn-group {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  button {
    width: 180px;
    color: var(--text-color-2);
    font-size: 16px;
    line-height: 19px;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
.detail-title {
  display: flex;
  justify-content: space-between;
  .group {
    display: block;
    .placeholder {
      font-size: 18px;
      line-height: 22px;
      color: var(--text-color-2);
    }
    .title {
      font-size: 20px;
      line-height: 20px;
      color: var(--primary-color-1);
      font-weight: var(--font-weight-bold);
      margin-left: 16px;
    }
    &:nth-child(2) {
      font-size: 16px;
      line-height: 19px;
      color: var(--text-color-3);
    }
  }
  img {
    vertical-align: middle;
  }
  .separator {
    margin-left: 10px;
    margin-right: 10px;
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
      }
      @include breakpoint-down-sm {
        font-size: 14px;
        img {
          margin-right: 4px;
          width: 12px;
          height: 12px;
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
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.separate-content {
  border: none;
  border-bottom: 1px solid #e5e5e5;
}
.separator {
  color: var(--background-color-1);
}
</style>
