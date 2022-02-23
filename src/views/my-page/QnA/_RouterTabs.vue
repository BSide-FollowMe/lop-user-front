<template>
  <vue-tabs :items="tabLabels" :value="activeTab" @changeTab="activeTab = $event" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import VueTabs from '@/components/VueTabs.vue';
import { useRoute } from 'vue-router';
import router from '@/router';
const tabs = [
  { label: '질문', listParam: 'questions' },
  { label: '답변', listParam: 'answers' },
];
interface tab {
  label: string;
  listParam: string;
}
export default defineComponent({
  name: 'Router Tabs',
  components: {
    VueTabs,
  },
  setup() {
    const route = useRoute();
    const listType: any = computed(() => route.query.list);
    const activeTab = ref(tabs.findIndex((item) => item.listParam === listType.value));
    watch(listType, (newVal: string) => {
      if (newVal) {
        activeTab.value = tabs.findIndex((item) => item.listParam === newVal);
      }
    });
    watch(activeTab, (newVal) => {
      return routeToPathWithParam(tabs, newVal);
    });
    const routeToPathWithParam = (tabs: Array<tab>, currentTab: number) => {
      const query = { ...route.query };
      query.list = tabs[currentTab]['listParam'];
      router.push({ query: query });
    };
    return {
      activeTab,
      tabs,
      tabLabels: tabs.map((t) => t.label),
    };
  },
});
</script>
