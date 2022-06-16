<template>
  <ModalTemplate ref="modalTemplate">
    <div class="conatiner">
      <div class="title">씨앗 적립 유의사항</div>
      <hr class="divider" />
      <ul class="content">
        <li>매달 식물의언어 활동을 활발히 하신 다섯분께 토분/식물/원예도구 등의 소정의 선물을 드려요.</li>
        <li>출석(로그인) 씨앗은 하루 최대 3회까지 받을 수 있어요.</li>
        <li>댓글 작성 씨앗은 한 게시글 당 하나씩만 적립돼요.</li>
        <li>올린 글을 직접 삭제하시거나 부적절한 게시글로 글이 삭제되면 씨앗이 차감됩니다.</li>
      </ul>
    </div>
  </ModalTemplate>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ModalTemplate from '@/components/layouts/ModalTemplate.vue';
export default defineComponent({
  components: {
    ModalTemplate,
  },
  setup() {
    const modalTemplate = ref();
    const closeModal = () => {
      modalTemplate.value.closeModal();
    };
    const openModal = () => {
      modalTemplate.value.openModal();
    };
    return {
      closeModal,
      openModal,
      modalTemplate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.conatiner {
  text-align: left;
  overflow: auto;
  position: relative;
  width: 750px;
  background-color: #fff;
  border-radius: 4px;
  padding: 42px 40px 60px 40px;
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

    color: var(--text-color-1);
    @include breakpoint-down-sm {
      font-size: 18px;
      line-height: 22px;
    }
  }
  .divider {
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid var(--background-color);
  }
}
.content {
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.01em;
  color: var(--text-color-2);
  margin-top: 40px;
  padding-left: 15px;
  @include breakpoint-down-sm {
    margin-top: 24px;
    font-size: 14px;
    line-height: 22px;
  }
  li {
    list-style: disc;
    margin-top: 20px;
    list-style-position: outside;
    &::marker {
      font-size: 10px;
    }
  }
}
</style>
