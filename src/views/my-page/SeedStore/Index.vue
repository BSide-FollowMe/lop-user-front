<template>
  <div class="inner-container">
    <PageTitle class="page-title"><template>씨앗 보관함</template></PageTitle>
    <BackwardButton class="backward-button" />
    <div class="main">
      <CenterAlignCard class="card" color="#E5F4EB">
        <template v-slot:title>
          <div class="card-title__wrapper">
            <span class="card-title">모은 씨앗</span>
            <img
              src="@/assets/icon/Info-empty.svg"
              @mouseover="SeedDescriptionPopoverRef.openPopover"
              @touchend="SeedDescriptionPopoverRef.openPopover"
              @mouseleave="SeedDescriptionPopoverRef.closePopover"
              @touchcancel="SeedDescriptionPopoverRef.closePopover"
            />
            <!-- @mouseleave="SeedDescriptionPopoverRef.closePopover" -->
            <SeedDescriptionPopover ref="SeedDescriptionPopoverRef" class="popover" />
          </div>
        </template>
        <template v-slot:content>
          <span class="card-value">{{ seedCount }}</span>
          <span> 씨앗</span>
        </template>
      </CenterAlignCard>
      <div class="seed-acquisition-notice" @click="SeedAcquisitionNoticeModalRef.openModal">
        <img src="@/assets/icon/Info-empty.svg" /> <span>씨앗적립 유의사항</span>
      </div>
      <SeedStoreTable class="seed-store-table" :items="items" />
      <SeedAcquisitionNoticeModal ref="SeedAcquisitionNoticeModalRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PageTitle from '@/components/atoms/Typography/PageTitle.vue';
import BackwardButton from '@/components/atoms/buttons/BackwardButton.vue';
import SeedStoreTable from '@/components/organisms/Tables/SeedStoreTable.vue';
import CenterAlignCard from '@/components/molecules/Cards/CenterAlignCard.vue';
import SeedAcquisitionNoticeModal from '@/components/organisms/Modals/SeedAcquisitionNoticeModal.vue';
import SeedDescriptionPopover from '@/components/organisms/Popovers/SeedDescriptionPopover.vue';
export default defineComponent({
  components: {
    PageTitle,
    BackwardButton,
    SeedStoreTable,
    CenterAlignCard,
    SeedAcquisitionNoticeModal,
    SeedDescriptionPopover,
  },
  setup() {
    const SeedAcquisitionNoticeModalRef = ref({} as typeof SeedAcquisitionNoticeModal);
    const SeedDescriptionPopoverRef = ref({} as typeof SeedDescriptionPopover);
    return {
      SeedAcquisitionNoticeModalRef,
      SeedDescriptionPopoverRef,
      currentPage: 0,
      totalCount: 1,
      seedCount: 320,
      items: [
        {
          date: '2022.06.06',
          action: '출석(로그인)',
          value: 2,
        },
        {
          date: '2022.06.06',
          action: '질문∙답변 댓글 삭제',
          value: -10,
        },
        {
          date: '2022.06.06',
          action: '출석(로그인)',
          value: 2,
        },
        {
          date: '2022.06.06',
          action: '질문∙답변 댓글 삭제',
          value: -10,
        },
        {
          date: '2022.06.06',
          action: '출석(로그인)',
          value: 2,
        },
        {
          date: '2022.06.06',
          action: '질문∙답변 댓글 삭제',
          value: -10,
        },
        {
          date: '2022.06.06',
          action: '출석(로그인)',
          value: 2,
        },
        {
          date: '2022.06.06',
          action: '질문∙답변 댓글 삭제',
          value: -10,
        },
        {
          date: '2022.06.06',
          action: '출석(로그인)',
          value: 2,
        },
        {
          date: '2022.06.06',
          action: '질문∙답변 댓글 삭제',
          value: -10,
        },
        {
          date: '2022.06.06',
          action: '출석(로그인)',
          value: 2,
        },
        {
          date: '2022.06.06',
          action: '질문∙답변 댓글 삭제',
          value: -10,
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.inner-container {
  max-width: 840px;
  margin-left: auto;
  margin-right: auto;
  @include breakpoint-down-sm {
    width: 100%;
  }
}
.page-title {
  margin-bottom: 4px;
  @include breakpoint-down-sm {
    margin-bottom: 3px;
  }
}
.backward-button {
  margin-bottom: 20px;
  @include breakpoint-down-sm {
    margin-bottom: 10px;
  }
}

.seed-acquisition-notice {
  float: right;
  cursor: pointer;
  > img {
    vertical-align: middle;
  }
  > span {
    font-size: 15px;
    line-height: 18px;
    /* identical to box height */

    letter-spacing: -0.0025em;
    text-decoration-line: underline;
    color: var(--text-color-3);
  }

  @include breakpoint-down-sm {
    font-size: 12px;
    line-height: 14px;
  }
}

.card {
  position: relative;
  left: -60px;
  width: calc(100% + 120px);
  padding: 50px 0;
  margin-bottom: 102px;
  @include breakpoint-down-sm {
    left: -20px;
    margin-bottom: 60px;
    width: calc(100% + 40px);
    padding: 30px 0;
  }
  &-title {
    + img {
      cursor: pointer;
    }
    &__wrapper {
      position: relative;
    }
  }
  &-value {
    font-weight: var(--font-weight-bold);
    font-size: 34px;
    line-height: 41px;
    /* identical to box height */

    letter-spacing: -0.01em;

    /* deepgreen/2 */

    color: var(--primary-color-2);
    @include breakpoint-down-sm {
      font-size: 24px;
      line-height: 24px;
    }
    + span {
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      letter-spacing: -0.01em;

      /* text/3 */

      color: var(--text-color-3);
      @include breakpoint-down-sm {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
}
.popover {
  position: relative;
  left: 75px;
  top: -25px;
  @include breakpoint-down-sm {
    position: absolute;
    top: 20px;
    left: calc(50% - 152px);
  }
}
.main {
  position: relative;
  background-color: #fff;
  padding: 0 60px 55px 60px;
  @include breakpoint-down-sm {
    padding: 0 20px 47px 20px;
  }
}
</style>
