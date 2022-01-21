<template>
  <component :is="`${layoutName}Layout`">
    <router-view />
  </component>
</template>
<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { LayoutEnum } from '@/enums/PageEnum';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import FilledLayout from '@/components/layouts/FilledLayout.vue';
export default defineComponent({
  components: {
    DefaultLayout,
    FilledLayout,
  },
  setup() {
    const route = useRoute();
    const layoutName = computed(() => (route.meta?.layout as string | undefined));
    return { layoutName };
  },
});
</script>
