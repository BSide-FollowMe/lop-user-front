<template>
  <div  app absolute>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PageEnum, PageNameEnum } from '@/enums/PageEnum';
import router from '@/router';
export default defineComponent({
  props: {
    isShow: Boolean,
  },
  setup(props) {
    const localDrawer = ref(props.isShow);
    const routeToPath = (path: string) => {
      router.push(path);
    };
    return {
      localDrawer,
      routeToPath,
      navigations: [
        { name: PageNameEnum.HOME, path: PageEnum.HOME },
        { name: PageNameEnum.PLANTS, path: PageEnum.PLANTS },
      ],
    };
  },
  watch: {
    isShow(newval) {
      this.localDrawer = newval;
    },
  },
});
</script>

<style></style>
