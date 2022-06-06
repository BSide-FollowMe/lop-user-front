import { tokenSvc } from '@/api/token-service';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const useValidateToken = (): void => {
  const route = useRoute();
  const currentPath = computed(() => route.path);
  watch(currentPath, () => {
    tokenSvc.isValidToken();
  });
  tokenSvc.isValidToken();
};

export default useValidateToken;
