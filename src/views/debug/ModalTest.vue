<template>
  <div class="text-center">
    <h1>모달 테스트</h1>
    <button @click="openModal('ReportModal')">제보하기 모달</button>
    <br />
    <button @click="openModal('RegistPlantModal')">식물 등록 요청하기 모달</button>
    <br />
    <button @click="openModal('ContactUsModal')">문의하기 모달</button>
    <br />
    <RequestModal v-if="isShow" :options="options" @close="isShow = false" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import RequestModal from '@/components/modals/RequestModal.vue';
const optionsSampleList: any = {
  ReportModal: {
    modalTitle: '제보하기',
    objective: '녹영',
    contentsLabel: '잘못된 정보나 건의하고 싶으신 내용을 작성해주세요.',
  },
  RegistPlantModal: {
    modalTitle: '식물 등록 요청하기',
    contentsLabel: '더 자세히 알고 싶은 식물명을 알려주세요. ',
  },
  ContactUsModal: {
    modalTitle: '문의하기',
    contentsLabel: '궁금한 점이나 제안하고 싶은 사항을 작성해주세요.',
  },
};
export default defineComponent({
  name: 'ModalTest',
  components: {
    RequestModal,
  },
  setup() {
    const targetModal = ref('DefaultModal');
    const isShow = ref(false);
    const options = ref({});
    function openModal(targetComponentName: string) {
      isShow.value = true;
      options.value = optionsSampleList[targetComponentName];
    }

    // TODO: 해당파일 삭제
    return {
      isShow,
      targetModal,
      openModal,
      options,
    };
  },
});
</script>
