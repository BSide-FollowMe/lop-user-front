<template>
  <section class="container">
    <div class="header">
      <div class="header__title">모든 식물</div>
      <div class="header__content">
        내게 맞는 식물을
        <br />
        식물의언어에서 만나보세요.
      </div>
      <div class="searcher">
        <SearchBar
          v-model:modelValue="searchText"
          :placeholder="{ content: '식물의 이름 또는 궁금하신 점을 입력해주세요.', size: { pc: '20px', mobile: '15px' } }"
          @submit="
            () => {
              onSubmit(searchText);
            }
          "
        />
      </div>
    </div>
    <div class="main">
      <List v-if="totalCount > 0" :currentPage="currentPage" :totalCount="totalCount" :plants="plants" @onChangePage="getOtherPage"></List>
      <Empty v-else></Empty>
    </div>
  </section>
</template>

<script lang="ts">
import setMeta from '@/utils/setMeta';
import { defineComponent, ref, watchEffect } from 'vue';
import { getPlantList } from '@/api/plant';
import { PlantListRespModel, PlantListData } from '@/api/model/plantModel';
import List from './List.vue';
import Empty from './Empty.vue';
import { ROUTE_TO } from '@/router/routing';
import { useRoute, useRouter } from 'vue-router';
import SearchBar from '@/components/search/SearchBar.vue';
import { validateSearchStr } from '@/utils/validation';

export default defineComponent({
  setup() {
    setMeta({
      title: '모든 식물 - 식물의언어',
      description: '식물의언어 모든 식물 리스트입니다.',
      keywords: '식물의언어, 식물의 언어, 모든식물, 모든 식물',
      path: '/plants',
    });
    const router = useRouter();
    const route = useRoute();
    const plants = ref([] as PlantListData[]);
    const currentPage = ref(0);
    const totalCount = ref(0);
    const pageNumber = ref(0);
    const pageLength = ref(0);
    const searchText = ref('');
    async function getPlantsList(page: number) {
      try {
        const payload = {
          size: '20',
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
    watchEffect(() => {
      getPlantsList(Number(route.query.page) - 1);
      currentPage.value = Number(route.query.page) - 1;
    });
    const getOtherPage = (payload: { page: number }) => {
      router.push(`${route.path}?page=${Number(payload.page) + 1}`);
    };
    function onSubmit(newVal: string) {
      const validateMsg = validateSearchStr(newVal);
      if (validateMsg) {
        alert(validateMsg);
        return;
      }
      ROUTE_TO.SEARCH_RESULT(newVal);
    }

    return {
      currentPage,
      totalCount,
      plants,
      pageNumber,
      pageLength,
      getOtherPage,
      ROUTE_TO,
      searchText,
      onSubmit,
    };
  },
  components: {
    List,
    Empty,
    SearchBar,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.header {
  width: 100%;
  height: 356px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--secondary-green-color-3);
  padding: 80px 21px 70px 21px;
  @include breakpoint-down-sm {
    padding: 60px 21px 50px 21px;
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
    @include breakpoint-down-sm {
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0025em;
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

.searcher {
  width: 500px;
  margin-top: 41px;
  position: relative;
  padding: 10px 0 11px;
  border-bottom: 1px solid var(--text-color-1);
  font-weight: var(--font-weight-medium);
  font-size: 16px;
  vertical-align: baseline;
  word-break: keep-all;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @include breakpoint-down-sm {
    width: 100%;
    margin-top: 41px;
  }
  &:focus-within {
    border-color: var(--secondary-green-color-1);
  }
}
</style>
