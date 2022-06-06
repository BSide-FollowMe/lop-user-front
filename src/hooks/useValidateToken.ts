import { tokenSvc } from '@/api/token-service';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const useValidateToken = (): void => {
  const route = useRoute();
  const currentPath = computed(() => route.path);
  async function checkLoggedIn() {
    isLoggedIn.value = await tokenSvc.isValidToken();
  }
  watch(currentPath, () => {
    checkLoggedIn();
  });
  const isLoggedIn = ref(false);
  checkLoggedIn();
};

export default useValidateToken;
