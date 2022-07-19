<template>
  <div class="header">
    <div class="profile">
      <span class="profile__level-icon">{{ profile?.memberImageUrl }}</span>
      <span class="profile__username">{{ profile?.nickname }}</span>
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
import { MemberLevel, Member } from "@/types/api/member";
import { getTimeDistanceWithNaturalStr } from "@/utils/text";

import ContextMenu from "@/components/organisms/ContextMenu/Index.vue";
import { StoryWriter } from "@/types/api/story";
import { ROUTE_TO } from "@/router/routing";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    ContextMenu,
  },
  props: {
    profile: Object as PropType<StoryWriter>,
    createdDate: Date,
  },
  setup(props) {
    const store = useStore();
    const contextMenuRef = ref(ContextMenu);
    const openContextMenu = () => {
      contextMenuRef.value.toggleContextMenu();
    };
    //     {
    //   "email": "string",
    //   "id": 0,
    //   "memberLevel": {
    //     "grade": "string",
    //     "likeCount": 0,
    //     "pollCount": 0,
    //     "postingContentCount": 0
    //   },
    //   "nickname": "string"
    // }
    const userInfo = computed(() => store.getters.getUserInfo);
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
      contextMenuRef,
      openContextMenu,
      contextMenuItems,
      getTimeDistanceWithNaturalStr,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.level-icon {
  width: 26px;
  height: 26px;
}
</style>
