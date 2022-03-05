<template>
  <div class="container">
    <Summary
      :plantId="Number(plantDetail.id)"
      :isFavorite="plantDetail.isFavorite"
      :name="plantDetail.name"
      :scientificName="plantDetail.scientificName"
      :nickname="plantDetail.nickname"
      :growthEasy="
        plantDetail.pollGrowth?.growthEasy + plantDetail.pollGrowth?.growthHard
          ? (Number(plantDetail.pollGrowth?.growthEasy / (plantDetail.pollGrowth?.growthEasy + plantDetail.pollGrowth?.growthHard)) * 100).toFixed(0)
          : 0
      "
      :growthHard="
        plantDetail.pollGrowth?.growthEasy + plantDetail.pollGrowth?.growthHard
          ? (Number(plantDetail.pollGrowth?.growthHard / (plantDetail.pollGrowth?.growthEasy + plantDetail.pollGrowth?.growthHard)) * 100).toFixed(0)
          : 0
      "
      :currentPollGrowth="plantDetail.pollGrowth?.type"
      :category="plantDetail.category"
      :fileName="plantDetail.fileName"
      :fileUrl="plantDetail.fileUrl"
      :fileSource="plantDetail.fileSource"
      :fileSourceLink="plantDetail.fileSourceLink"
      @refresh="refresh"
    />
    <Water @openGuide="openGuide" />
    <Sunlight @openGuide="openGuide" :sunlightTypes="plantDetail.sunlightTypes || []" />
    <TemperatureHumidity @openGuide="openGuide" />
    <Ventilation @openGuide="openGuide" :blights="plantDetail.blights || []" />
    <Soil />
    <Report @openReport="openReport" />
    <Question :plantName="plantDetail.name" :plantId="Number(plantDetail.id)" :questions="questions" />
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
import { getQnaBoardList } from '@/api/qnaboard';
import { PlantDetailRespModel } from '@/api/model/plantModel';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Question as QuestionModel } from '@/api/model/boardModel';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const plantDetail = ref({} as PlantDetailRespModel);
    const questions = ref([] as QuestionModel[]);
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
      reportOptions.value = { modalTitle, objective: plantDetail.value.name, contentsLabel };
    };
    const closeGuide = () => {
      guideOpened.value = false;
    };
    const closeReport = () => {
      reportOpened.value = false;
    };
    const init = async () => {
      try {
        plantDetail.value = await getPlantDetail({ plantId: route.path.split('/')[2] });
        const {
          data: { data },
        }: any = await getQnaBoardList({
          plantId: Number(plantDetail.value.id),
          size: 3,
          page: 0,
        });
        questions.value = data as QuestionModel[];
      } catch (e) {
        router.push('/not-found');
      }
    };
    onMounted(async () => {
      init();
    });
    const refresh = () => {
      init();
    };
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
      questions,
      refresh,
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
