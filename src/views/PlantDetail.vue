<template>
  <div class="container">
    <Summary
      :plantId="Number(plantDetail.id)"
      :isFavorite="plantDetail.isFavorite"
      :name="plantDetail.name"
      :scientificName="plantDetail.scientificName"
      :nickname="plantDetail.nickname"
      :growthEasy="calculatedGrowthEasy"
      :growthHard="calculatedGrowthHard"
      :currentPollGrowth="plantDetail.pollGrowth?.type"
      :category="plantDetail.category"
      :fileName="plantDetail.fileName"
      :fileUrl="plantDetail.fileUrl"
      :fileSource="plantDetail.fileSource"
      :fileSourceLink="plantDetail.fileSourceLink"
      @refresh="refresh"
    />
    <Water :content="plantDetail.waterPeriod" @openGuide="openGuide" />
    <Sunlight :content="plantDetail.sunlight" @openGuide="openGuide" :sunlightTypes="plantDetail.sunlightTypes || []" />
    <TemperatureHumidity :minHumidity="plantDetail.minHumidity" :maxHumidity="plantDetail.maxHumidity" :content="plantDetail.temperatureExtra" :temperature="plantDetail.properTemperature" :winterTemperature="plantDetail.winterTemperature" :winterTemperatureUpDown="plantDetail.winterTemperatureUpDown" @openGuide="openGuide" />
    <Ventilation @openGuide="openGuide" :blights="plantDetail.blights || []" />
    <Soil :content="plantDetail.soil" />
    <Report @openReport="openReport" />
    <Question :plantName="plantDetail.name" :plantId="Number(plantDetail.id)" :questions="questions" />
  </div>
  <GuideModal v-if="guideOpened" :options="guideOptions" @close="closeGuide()" />
  <RequestModal v-if="reportOpened" :options="reportOptions" @confirm="report" @close="closeReport()" />
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

import { getPlantDetail, registReport } from '@/api/plant';
import { getQnaBoardList } from '@/api/qnaboard';
import { PlantDetailRespModel } from '@/api/model/plantModel';
import { computed, onMounted, ref } from 'vue';
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
    const calculatedGrowthEasy = computed(() => {
      if (plantDetail.value?.growthEasy === undefined) return 0;
      const total = Number(
        plantDetail.value.growthEasy +
          plantDetail.value.pollGrowth.growthEasy +
          plantDetail.value.growthHard +
          plantDetail.value.pollGrowth.growthHard,
      );
      if (total == 0) {
        return 0;
      }
      return ((Number(plantDetail.value.growthEasy + plantDetail.value.pollGrowth.growthEasy) / total) * 100).toFixed(0);
    });
    const calculatedGrowthHard = computed(() => {
      if (plantDetail.value?.growthHard === undefined) return 0;
      const total = Number(
        plantDetail.value.growthEasy +
          plantDetail.value.pollGrowth.growthEasy +
          plantDetail.value.growthHard +
          plantDetail.value.pollGrowth.growthHard,
      );
      if (total == 0) {
        return 0;
      }
      return ((Number(plantDetail.value.growthHard + plantDetail.value.pollGrowth.growthHard) / total) * 100).toFixed(0);
    });
    async function report({ email, contents }: { email: string; contents: string }) {
      try {
        const payload = {
          content: contents,
          email: email,
          reportType: 'REPORT',
        };
        await registReport(payload);
        alert('요청이 제보 되었습니다. 확인 후 반영하도록 하겠습니다.');
        reportOpened.value = false;
      } catch (e) {
        console.error(e);
      }
    }
    return {
      calculatedGrowthEasy,
      calculatedGrowthHard,
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
      report
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
