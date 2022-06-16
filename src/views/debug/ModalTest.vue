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
    <button @click="openModal('ConfirmDeleteAccountModal')">회원탈퇴 재확인 모달</button>
    <br />
    <button @click="openModal('CompleteDeleteAccountModal')">회원탈퇴 완료 모달</button>
    <br />
    <button @click="openModal('WaterInspectGuideModal')">물주기-검사 가이드 모달</button>
    <br />
    <button @click="openModal('WaterKnowHowGuideModal')">물주기-노하우 가이드 모달</button>
    <br />
    <button @click="openModal('VentilationGuideModal')">통풍 가이드 모달</button>
    <br />
    <button @click="openModal('SunlightGuideModal')">음지/양지 가이드 모달</button>
    <br />
    <button @click="openModal('BlightGuideModal')">병충해 가이드 모달</button>
    <br />
    <RequestModal v-if="isShow && options.type === 'Request'" :options="options" @close="isShow = false" />
    <GradeGuideModal v-if="isShow && options.type === 'GradeGuide'" :options="options" @close="isShow = false" />
    <!-- :options="options as {type:'complete'|'confirm'}" -->
    <DeleteAccountModal v-if="isShow && (options.type === 'confirm' || options.type === 'complete')" @close="isShow = false" />
    <GuideModal v-if="isShow && options.type === 'Guide'" :options="options" @close="isShow = false" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import RequestModal from '@/components/organisms/Modals/RequestModal.vue';
import GradeGuideModal from '@/components/organisms/Modals/GradeGuideModal.vue';
import DeleteAccountModal from '@/components/organisms/Modals/DeleteAccountModal.vue';
import GuideModal from '@/components/organisms/Modals/GuideModal.vue';
interface ModalOption {
  modalTitle?: string;
  objective?: string;
  contentsLabel?: string;
  type: string;
  componentName?: string;
}
const optionsSampleList: {
  ReportModal: ModalOption;
  RegistPlantModal: ModalOption;
  ContactUsModal: ModalOption;
  GradeGuideModal: ModalOption;
  ConfirmDeleteAccountModal: ModalOption;
  CompleteDeleteAccountModal: ModalOption;
  WaterInspectGuideModal: ModalOption;
  WaterKnowHowGuideModal: ModalOption;
  VentilationGuideModal: ModalOption;
  SunlightGuideModal: ModalOption;
  BlightGuideModal: ModalOption; // todo: typescript Pick option 공부 후 세분화...
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
  ConfirmDeleteAccountModal: {
    type: 'confirm',
  },
  CompleteDeleteAccountModal: {
    type: 'complete',
  },
  WaterInspectGuideModal: {
    type: 'Guide',
    componentName: 'WaterInspect',
    modalTitle: '흙이 마른 건 이렇게 알 수 있어요',
  },
  WaterKnowHowGuideModal: {
    type: 'Guide',
    componentName: 'WaterKnowHow',
    modalTitle: '물을 잘 주려면 이렇게 하세요',
  },
  VentilationGuideModal: {
    type: 'Guide',
    componentName: 'Ventilation',
    modalTitle: '통풍이 왜 중요한가요?',
  },
  SunlightGuideModal: {
    type: 'Guide',
    componentName: 'Sunlight',
    modalTitle: '양지와 음지를 어떻게 구분하나요?',
  },
  BlightGuideModal: {
    type: 'Guide',
    componentName: 'Blight',
    modalTitle: '병충해는 어떻게 관리하나요?',
  },
};
export default defineComponent({
  name: 'ModalTest',
  components: {
    RequestModal,
    GradeGuideModal,
    DeleteAccountModal,
    GuideModal,
  },
  setup() {
    const targetModal = ref('ModalTemplate');
    const isShow = ref(false);
    const options = ref({} as ModalOption);
    function openModal(
      targetComponentName:
        | 'ReportModal'
        | 'RegistPlantModal'
        | 'ContactUsModal'
        | 'GradeGuideModal'
        | 'ConfirmDeleteAccountModal'
        | 'CompleteDeleteAccountModal'
        | 'WaterInspectGuideModal'
        | 'WaterKnowHowGuideModal'
        | 'VentilationGuideModal'
        | 'SunlightGuideModal'
        | 'BlightGuideModal'
    ) {
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
