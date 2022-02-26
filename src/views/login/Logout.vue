<template>
  <div>Logging out...</div>
</template>

<script>
import { defineComponent } from 'vue';
import { ROUTE_TO } from '@/router/routing';
import { tokenSvc } from '@/api/token-service';

export default defineComponent({
  setup() {
    logout();
    async function logout() {
      await tokenSvc.removeToken();
      ROUTE_TO.HOME();

    }
    return {};
  },
});
</script>
