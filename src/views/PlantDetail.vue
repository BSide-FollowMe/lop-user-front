<template>
  <div class="container">
    <Summary
      :plantId="Number(plantDetail.id)"
      :isFavorite="plantDetail.isFavorite"
      :name="plantDetail.name"
      :scientificName="plantDetail.scientificName"
      :nickname="plantDetail.nickname"
      :growthEasy="Number(plantDetail.growthEasy)"
      :growthHard="Number(plantDetail.growthHard)"
      :category="plantDetail.category"
      :fileName="plantDetail.fileName"
      :fileUrl="plantDetail.fileUrl"
      :fileSource="plantDetail.fileSource"
      :fileSourceLink="plantDetail.fileSourceLink"
    />
    <Water @openGuide="openGuide" />
    <Sunlight @openGuide="openGuide" :sunlightTypes="plantDetail.sunlightTypes"/>
    <TemperatureHumidity @openGuide="openGuide" />
    <Ventilation @openGuide="openGuide" :blights="plantDetail.blights"/>
    <Soil />
    <Report @openReport="openReport" />
    <Question />
  </div>
  <GuideModal v-if="guideOpened" :options="guideOptions" @close="closeGuide()" />
  <RequestModal v-if="reportOpened" :options="reportOptions" @close="closeReport()" />
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Summary from '@/views/detail/Summary.vue';
import Water from '@/views/detail/Water.vue';
import Sunlight from '@/views/detail/Sunlight.vue';
import TemperatureHumidity from '@/views/detail/TemperatureHumidity.vue';
import Ventilation from '@/views/detail/Ventilation.vue';
import Soil from '@/views/detail/Soil.vue';
import Report from '@/views/detail/Report.vue';
import Question from '@/views/detail/Question.vue';
import GuideModal from '@/components/modals/GuideModal.vue';
import RequestModal from '@/components/modals/RequestModal.vue';

import { getPlantDetail } from '@/api/plant';
import { PlantDetailRespModel } from '@/api/model/plantModel';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const plantDetail = ref({} as PlantDetailRespModel);
    const guideOpened = ref(false);
    const reportOpened = ref(false);
    const guideOptions = ref({} as { componentName: string; modalTitle: string });
    const reportOptions = ref({} as { modalTitle: string; objective: string; contentsLabel: string });
    const openGuide = ({ componentName, modalTitle }: { componentName: string; modalTitle: string }) => {
      guideOpened.value = true;
      guideOptions.value = {
        componentName,
        modalTitle,
      };
    };
    const openReport = ({ modalTitle, contentsLabel }: { modalTitle: string; contentsLabel: string }) => {
      reportOpened.value = true;
      reportOptions.value = { modalTitle, objective:plantDetail.value.name, contentsLabel };
    };
    const closeGuide = () => {
      guideOpened.value = false;
    };
    const closeReport = () => {
      reportOpened.value = false;
    };
    onMounted(async () => {
      try {
        plantDetail.value = await getPlantDetail({ plantId: route.path.split('/')[2] });
      } catch (e) {
        router.push('/not-found');
      }
    });
    return {
      plantDetail,
      guideOpened,
      openGuide,
      closeGuide,
      guideOptions,
      reportOpened,
      openReport,
      closeReport,
      reportOptions,
    };
  },
  components: {
    Summary,
    Water,
    Sunlight,
    TemperatureHumidity,
    Ventilation,
    Soil,
    Report,
    Question,
    GuideModal,
    RequestModal,
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/';
.container {
  margin-top: 83px;
  max-width: var(--content-container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding: var(--m-content-container-padding) var(--content-container-padding) 0 var(--content-container-padding);
  @include breakpoint-down-sm {
    margin-top: 0;
    padding: 0 var(--m-content-container-padding);
    min-width: var(--m-content-container-max-width);
  }
  > * {
    margin-bottom: 100px;
    @include breakpoint-down-sm {
      margin-bottom: 80px;
      padding: 0;
    }
  }
}
</style>

<!-- WaterInspectGuideModal: {
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
  },-->
