<template>
  <div>Logging out...</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ROUTE_TO } from '@/router/routing';
import { tokenSvc } from '@/api/token-service';

export default defineComponent({
  setup() {
    ROUTE_TO.HOME();
    logouted();

    async function logouted() {
        tokenSvc.removeToken();
    }
    return {
    };
  },
});
</script>
