<template>
  <div class="header">
    <div class="profile">
      <span class="profile__level-icon">
        <img v-if="false && profile.memberImageUrl" :src="profile.memberImageUrl" />
        <img v-else src="@/assets/images/level/꽃집사.svg" />
      </span>
      <span class="profile__username">{{ profile.nickname }}</span>
      <span class="datetime">{{ getTimeDistanceWithNaturalStr(createdDate) }}</span>
    </div>
    <button class="action-modal-btn" @click="openContextMenu" ref="actionBtnRef">
      <img src="@/assets/icon/more.svg" />
      <ContextMenu
        ref="contextMenuRef"
        class="context-menu"
        :items="contextMenuItems()"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import { getTimeDistanceWithNaturalStr } from "@/utils/text";

import ContextMenu from "@/components/organisms/ContextMenu/Index.vue";
import { StoryWriter } from "@/types/api/story";
import { ROUTE_TO } from "@/router/routing";
import { useStore } from "vuex";
import { getImgUrl } from "@/utils/member";

export default defineComponent({
  components: {
    ContextMenu,
  },
  props: {
    profile: {
      type: Object as PropType<StoryWriter>,
      default: () => ({}),
    },
    createdDate: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    const contextMenuRef = ref(ContextMenu);
    const userInfo = computed(() => store.getters.getUserInfo);
    const openContextMenu = () => {
      contextMenuRef.value.toggleContextMenu();
    };

    const contextMenuItems = () =>
      props.profile?.id == userInfo.value.id
        ? [
            {
              text: "수정하기",
              func: () => ROUTE_TO.STORY_REGISTER(),
              icon: require("@/assets/icon/modify-pencil-gray.svg"),
            },
            {
              text: "삭제하기",
              func: () => {
                console.log("삭제하기");
              },
              icon: require("@/assets/icon/delete.svg"),
            },
          ]
        : [
            {
              text: "신고하기",
              func: () => {
                console.log("신고하기");
              },
              icon: require("@/assets/icon/report.svg"),
            },
          ];

    return {
      getImgUrl,
      contextMenuRef,
      openContextMenu,
      contextMenuItems,
      getTimeDistanceWithNaturalStr,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixin";

.header {
  display: flex;
  justify-content: space-between;
}
.profile {
  display: flex;
  align-items: center;
  font-weight: var(--font-weight-medium);
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
  &__level-icon {
    & > img {
      width: 26px;
      height: 26px;
    }
  }
  &__username {
    margin-left: 10px;
    margin-right: 10px;
  }
  .datetime {
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: -0.01em;

    /* text/3 */

    color: var(--text-color-3);
    &::before {
      content: "|";
      margin-right: 10px;
    }
  }
}

.action-modal-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
