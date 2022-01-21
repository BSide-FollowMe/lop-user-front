<template>
  <div>
    <TopperHeader @toggleDrawer="toggleDrawer" />
    <SideDrawer :isShow="drawer" @toggleDrawer="toggleDrawer" />
    <div>
      <slot />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import SideDrawer from './SideDrawer';
import TopperHeader from './TopperHeader';

export default defineComponent({
  components: {
    SideDrawer,
    TopperHeader,
  },
  setup() {
    const drawer = ref(false);
    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };
    return {
      drawer,
      toggleDrawer,
    };
  },
});
</script>
