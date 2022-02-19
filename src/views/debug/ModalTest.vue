<template>
  <div class="text-center">
    <h1>모달 테스트</h1>
    <button @click="openModal('ReportModal')">제보하기 모달</button>
    <br />
    <button @click="openModal('RegistPlantModal')">식물 등록 요청하기 모달</button>
    <br />
    <button @click="openModal('ContactUsModal')">문의하기 모달</button>
    <br />
    <button @click="openModal('GradeGuideModal')">등급안내 모달</button>
    <br />
    <RequestModal v-if="isShow && options.type === 'Request'" :options="options" @close="isShow = false" />
    <GradeGuideModal v-if="isShow && options.type === 'GradeGuide'" :options="options" @close="isShow = false" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import RequestModal from '@/components/modals/RequestModal.vue';
import GradeGuideModal from '@/components/modals/GradeGuideModal.vue';
interface ModalOption {
  modalTitle: string;
  objective?: string;
  contentsLabel?: string;
  type: string;
}
const optionsSampleList: {
  ReportModal: ModalOption;
  RegistPlantModal: ModalOption;
  ContactUsModal: ModalOption;
  GradeGuideModal: ModalOption; // todo: typescript Pick option 공부 후 세분화...
} = {
  ReportModal: {
    modalTitle: '제보하기',
    objective: '녹영',
    contentsLabel: '잘못된 정보나 건의하고 싶으신 내용을 작성해주세요.',
    type: 'Request',
  },
  RegistPlantModal: {
    modalTitle: '식물 등록 요청하기',
    contentsLabel: '더 자세히 알고 싶은 식물명을 알려주세요. ',
    type: 'Request',
  },
  ContactUsModal: {
    modalTitle: '문의하기',
    contentsLabel: '궁금한 점이나 제안하고 싶은 사항을 작성해주세요.',
    type: 'Request',
  },
  GradeGuideModal: {
    modalTitle: '등급안내',
    type: 'GradeGuide',
  },
};
export default defineComponent({
  name: 'ModalTest',
  components: {
    RequestModal,
    GradeGuideModal,
  },
  setup() {
    const targetModal = ref('DefaultModal');
    const isShow = ref(false);
    const options = ref({} as ModalOption);
    function openModal(targetComponentName: 'ReportModal' | 'RegistPlantModal' | 'ContactUsModal' | 'GradeGuideModal') {
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
