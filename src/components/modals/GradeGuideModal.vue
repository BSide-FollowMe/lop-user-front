<template>
  <DefaultModal @close="closeModal">
    <div class="conatiner">
      <div class="title">
        <span class="text-bold">{{ options?.modalTitle }}</span>
      </div>
      <hr class="divider" />
      <div class="mygrade">
        <span class="bold">{{ options.nickname }}</span>
        님은
        <span class="bold">{{ options.memberLevel?.grade }}</span>
        입니다.
      </div>
      <div class="myexcercise">지금까지 난이도 투표 {{options.memberLevel?.pollCount}}회, 글 {{options.memberLevel?.postingContentCount}}개, 받은 좋아요 {{options.memberLevel?.likeCount}}개를 기록했어요.</div>
      <table>
        <tr v-for="grade in gradeInfo" :key="grade.grade">
          <td class="grade">{{ grade.grade }}</td>
          <td class="description">{{ grade.description }}</td>
        </tr>
      </table>
      <div class="guide">
        <img :src="checkIcon" />
        위의 조건을 모두 달성하면 해당하는 등급으로 올라갈 수 있어요.
      </div>
      <div class="guide">
        <img :src="checkIcon" />
        질문, 답변, 댓글 각각을 1개의 글로 정의해요.
      </div>
      <div class="guide">
        <img :src="checkIcon" />
        질문 답변 댓글에 달린 좋아요를 합산해 받은 좋아요 수를 계산해요.
      </div>
    </div>
  </DefaultModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DefaultModal from './DefaultModal.vue';
import checkIcon from '@/assets/icon/task_alt_black_24dp.svg';

export default defineComponent({
  name: 'Report Modal',
  components: {
    DefaultModal,
  },
  props: ['options'],
  setup(props, { emit }) {
    const gradeInfo: { grade: string; description: string }[] = [
      { grade: '씨앗집사', description: '최초 가입 시' },
      { grade: '새싹집사', description: '난이도 투표 3회 이상, 글 10개 이상' },
      { grade: '줄기집사', description: '난이도 투표 10회 이상, 글 20개 이상, 받은 좋아요 10개 이상' },
      { grade: '꽃집사', description: '난이도 투표 30회 이상, 글 60개 이상, 받은 좋아요 30개 이상' },
      { grade: '열매집사', description: '난이도 투표 50회 이상, 글 100개 이상, 받은 좋아요 100개 이상' },
    ];
    function closeModal() {
      emit('close');
    }
    return { closeModal, gradeInfo, checkIcon };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
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
  .bottom {
    margin-top: 40px;
    text-align: center;
  }
}
.mygrade {
  font-weight: var(--font-weight-bold);
  font-size: 20px;
  line-height: 20px;
  /* identical to box height, or 100% */

  letter-spacing: -0.01em;
  .bold {
    color: var(--secondary-green-color-1);
  }
  @include breakpoint-down-sm {
    font-size: 16px;
    line-height: 26px;
  }
}
.myexcercise {
  font-weight: var(--font-weight-medium);
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: -0.0025em;

  /* text/3 */

  color: var(--text-color-3);
  @include breakpoint-down-sm {
    font-size: 14px;
    line-height: 20px;
  }
}
table {
  margin: 20px 0;
  width: 670px;
  height: 235px;

  /* bg,line/2 */

  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 2px;
  border-collapse: collapse;
  @include breakpoint-down-sm {
    width: 100%;
    min-width: 280px;
  }
  tr {
    border-bottom: 1px solid #e5e5e5;
    td.grade {
      padding: 0 65px 0 20px;
      font-weight: var(--font-weight-medium);
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.01em;

      /* green/1 */

      color: var(--secondary-green-color-1);
      @include breakpoint-down-sm {
        font-size: 12px;
        line-height: 18px;
        padding: 0 20px 0 16px;
        width: 28%;
      }
    }
    td.description {
      font-weight: var(--font-weight-light);
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.01em;

      /* text/1 */

      color: var(--text-color-1);
      @include breakpoint-down-sm {
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
}
.guide {
  img {
    vertical-align: text-top;
  }
  margin-left: 8.49px;
  font-weight: var(--font-weight-medium);
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: -0.01em;

  /* text/3 */

  color: var(--text-color-3);
  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
