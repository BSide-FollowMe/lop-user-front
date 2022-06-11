<template>
  <component :is="`${layoutName}Layout`" class="layout" :class="{ loading: isLoading }">
    <router-view />
    <transition name="fade">
      <LoadingProgress v-if="isLoading" />
    </transition>
  </component>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import store from '@/store';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import FilledLayout from '@/components/layouts/FilledLayout.vue';
import LoadingProgress from '@/components/LoadingProgress.vue';
export default defineComponent({
  components: {
    DefaultLayout,
    FilledLayout,
    LoadingProgress,
  },
  setup() {
    const isLoading = computed(() => store.getters.isLoading);
    const route = useRoute();
    const layoutName = computed(() => route.meta?.layout as string | undefined);
    const backgroundColor = computed(() => route.meta?.backgroundColor || 'transparent');
    return { layoutName, backgroundColor, isLoading };
  },
});
</script>
<style lang="scss" scoped>
.layout::v-deep .page-container {
  background-color: v-bind(backgroundColor) !important;
}
</style>
