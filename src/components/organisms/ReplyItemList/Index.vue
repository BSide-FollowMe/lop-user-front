<template>
  <ReplyItem
    v-for="(item, index) in comments"
    :key="`reply-item-${index}`"
    :id="item.id"
    :boardId="boardId"
    :boardWriterId="boardWriterId"
    :myId="myId"
    :item="item"
    @refresh="refresh"
  />
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType } from 'vue';
import ReplyItem from '@/components/molecules/ReplyItem/Index.vue';

import { useRoute } from 'vue-router';
import router from '@/router';
import { CommentData } from '@/types/api/board';

export default defineComponent({
  name: 'Reply List',
  components: { ReplyItem },
  props: {
    comments: {
      type: Array as PropType<CommentData[]>,
      default: () => [],
    },
    boardId: {
      type: String,
      default: '',
    },
    boardWriterId: {
      type: String,
      default: '',
    },
    myId: {
      Type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const route = useRoute();

    function refresh() {
      emit('refresh');
    }

    const scrollFix = (hashbang: string) => {
      setTimeout(() => {
        location.hash = hashbang;
      }, 0);
    };

    if (route.hash) {
      router.replace(route.path);
      nextTick(() => {
        scrollFix(`${route.hash}`);
      });
    }

    return {
      refresh,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.reply-container {
  background-color: #fff;
  border-radius: 4px;
  padding: 0px 60px 60px;
  color: var(--text-color-2);

  @include breakpoint-down-sm {
    margin-left: 20px;
    margin-right: 20px;
    padding: 40px var(--m-content-container-padding);
  }
  .content-item {
    margin-top: 40px;
    font-size: 18px;
    line-height: 26px;
    @include breakpoint-down-sm {
      font-size: 16px;
    }
  }
}
.separate-content {
  border: none;
  border-bottom: 1px solid #e5e5e5;
  margin: 0px;
}
.reply-count {
  margin-top: 40px;
  font-size: 20px;
  line-height: 20px;
  font-weight: var(--font-weight-bold);
  .title {
    color: var(--text-color-1);
  }
  .count {
    color: var(--secondary-green-color-1);
  }
  @include breakpoint-down-sm {
    margin-top: 20px;
    font-size: 16px;
  }
}
.reply-list {
  margin-top: 10px;
}
</style>
