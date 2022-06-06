import { ROUTE_TO } from '@/router/routing';
import { validateSearchStr } from '@/utils/validation';
import { ref } from 'vue';
import type { Ref } from 'vue';

const useSearch = (): [Ref<string>, () => void] => {
  const searchText = ref('');
  const onSearch = () => {
    const validateMsg = validateSearchStr(searchText.value);
    if (validateMsg) {
      alert(validateMsg);
      return;
    }
    ROUTE_TO.SEARCH_RESULT(searchText.value);
  };
  return [searchText, onSearch];
};

export default useSearch;
