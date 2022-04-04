<template>
  <section class="container">
    <section class="header">
      <div class="header__title">모든 식물</div>
      <div class="header__content">내게 맞는 식물을 <br />식물의언어에서 만나보세요.</div>
      <div class="header__button" @click="ROUTE_TO.HOME">홈에서 검색하기</div>
    </section>
    <div class="main">
      <List
        v-if="totalCount > 0"
        :totalCount="totalCount"
        :plants="plants"
        @onChangePage="getOtherPage"
      ></List>
      <Empty v-else></Empty>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getPlantList } from "@/api/plant";
import { PlantListRespModel, PlantListData } from "@/api/model/plantModel";
import List from "./List.vue";
import Empty from "./Empty.vue";
import { ROUTE_TO } from "@/router/routing";

export default defineComponent({
  setup() {
    const plants = ref([] as PlantListData[]);
    const totalCount = ref(0);
    const pageNumber = ref(0);
    const pageLength = ref(0);
    async function getPlantsList(page: number) {
      try {
        const payload = {
          size: "20",
          page: page.toString(),
        };

        const { data }: { data: PlantListRespModel } = await getPlantList(payload);
        plants.value = data.data;
        totalCount.value = Number(data.totalElement);
        pageLength.value = Number(data.totalPage);
      } catch (e) {
        console.error(e);
      }
    }
    onMounted(() => {
      getPlantsList(0);
    });
    const getOtherPage = (payload: { page: number }) => {
      getPlantsList(payload.page);
    };

    return {
      totalCount,
      plants,
      pageNumber,
      pageLength,
      getOtherPage,
      ROUTE_TO,
    };
  },
  components: {
    List,
    Empty,
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/";
.header {
  width: 100%;
  height: 356px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--secondary-green-color-3);
  @include breakpoint-down-sm {
    height: 258px;
  }
  &__title {
    font-weight: var(--font-weight-bold);
    font-size: 32px;
    line-height: 38px;
    letter-spacing: -0.0025em;

    color: var(--primary-color-1);
    margin-bottom: 15px;
    @include breakpoint-down-sm {
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 10px;
    }
  }
  &__content {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */

    text-align: center;
    letter-spacing: -0.01em;

    /* text/2 */

    color: var(--text-color-2);
    margin-bottom: 40px;
    @include breakpoint-down-sm {
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0025em;
      margin-bottom: 30px;
    }
  }
  &__button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14.5px 38.5px;
    width: 180px;
    height: 48px;

    /* deepgreen/1-main */

    background: var(--primary-color-1);
    border-radius: 2px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    letter-spacing: -0.02em;

    /* white */

    color: #ffffff;
    @include breakpoint-down-sm {
      width: 140px;
      height: 40px;
      padding: 11.5px 24.5px;
      font-size: 14px;
      line-height: 17px;
    }
  }
}

.main {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-inner);
  padding: 50px 0 120px 0;
  @include breakpoint-down-sm {
    min-width: var(--m-content-container-inner);
    padding: 30px 20px 90px 20px;
  }
}
</style>
