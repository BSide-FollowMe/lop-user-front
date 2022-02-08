<template>
  <section class="plants-container">
    <ul class="question-list">
      <div class="list-summary paragraph-2">
        녹영&nbsp;
        <span class="list-summary__count">21</span>
        <CheckButton class="toggle-my-question" />
      </div>
      <li class="item" v-for="index in 10" :key="`plant-item-${index}`">
        <div class="item__infomations">
          <p class="target-plant">녹영</p>
          <p
            class="details text-medium"
            v-html="
              stylizeBySearchTarget(
                searchTarget,
                '이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요?이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요?이거 해충인가요? 잎에 검은 반점이 생겼는데요 화원에서 데려올 때부터 이상태여서 크게 신경 안쓰고 있었는데 이거 해충인가요?',
              )
            "
          ></p>
          <p class="status">
            <span class="reg-date">1분 전</span>
            <span class="reply-count">댓글 1</span>
            <span class="like-count">도움돼요 1,568</span>
          </p>
        </div>
        <img class="preview" src="@/assets/images/search/plant-sample.png" />
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import CheckButton from '@/components/buttons/CheckButton.vue';
export default defineComponent({
  components: {
    CheckButton,
  },
  props: ['text'],
  setup(props) {
    const searchTarget = computed(() => props.text);
    const isEmpty = ref(false);
    // TODO: empty 퍼블 확인을 위한 샘플내용 추후 제거 필요
    if (searchTarget.value == 'EMPTY_SAMPLE') {
      isEmpty.value = true;
    }
    function stylizeBySearchTarget(searchStr: string, targetStr: string) {
      if (!targetStr.includes(searchStr)) return targetStr;
      const arr = targetStr.split(searchStr);
      return `${arr[0]}<span style="color:var(--secondray-color-2)">${searchStr}</span>${arr[1]}`;
    }
    return {
      searchTarget,
      isEmpty,
      stylizeBySearchTarget,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.question-list {
  list-style: none;
  .item {
    display: flex;
    height: 180px;
    padding: 20px;
    border-bottom: 1px solid var(--background-color-4);
    @include breakpoint-down-sm {
      height: 130px;
      padding: 16px 20px;
    }
    &:hover {
      background-color: var(--secondary-green-color-3);
      cursor: pointer;
    }
    .preview {
      width: 140px;
      height: 140px;
      object-fit: cover;
      border-radius: 4px;
      background-color: #c4c4c4;
      @include breakpoint-down-sm {
        margin: auto;
        width: 76px;
        height: 76px;
      }
    }
    &__infomations {
      display: flex;
      flex-direction: column;
      margin-right: 60px;
      flex-grow: 1;
      // @include breakpoint-down-sm {
      //   margin-left: 20px;
      //   margin-right: 20px;
      // }
    }
    .target-plant {
      margin: 0px;
      color: var(--text-color-3);
      @include breakpoint-down-sm {
        font-size: 12px;
      }
    }
    .details {
      margin-top: 10px;
      margin-bottom: 0px;
      line-height: 26px;
      @include textOverflow(2);
      @include breakpoint-down-sm {
        margin-top: 6px;
        font-size: 13px;
        line-height: 20px;
      }
    }
    .status {
      margin-top: auto;
      margin-bottom: 0px;
      color: var(--text-color-3);

      @include breakpoint-down-sm {
        margin-bottom: 0px;
        font-size: var(--m-font-size-caption);
      }
      span:first-child::before {
        content: unset;
        margin: unset;
        color: unset;
      }
      span::before {
        content: '|';
        margin: 0px 10px;
        color: var(--background-color);
      }
    }
    .to-details {
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: none;
      img {
        width: 24px;
        height: 24px;
      }
      @include breakpoint-down-sm {
        width: 18px;
        height: 18px;
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
.list-summary {
  display: flex;
  align-items: center;
  margin: 40px 0px 20px 0px;
  padding:0px 20px;
  color: var(--text-color-2);
  &__count {
    color: var(--secondray-color-2);
  }
  @include breakpoint-down-sm {
    margin: 20px 0px 20px 20px;
    font-size: 13px;
  }
  .toggle-my-question {
    width:130px;
    height:37px;
    margin-left: auto;
    display: block;
    transform:scale(0.9);
    &:active{
      transform:scale(0.91);
    }
    @include breakpoint-down-sm {
      transform:scale(0.8);
      &:active{
        transform:scale(0.81);
      }
    }
  }
}
</style>
