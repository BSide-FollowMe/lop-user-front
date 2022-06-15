import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

const useLoadMore = ({ init, page }: { init: () => void; page: Ref<number> }): (() => void) => {
  const listRef = ref<HTMLElement>({} as HTMLElement);
  listRef.value.
  onMounted(() => {
    init();
  });
  const loadMore = () => {
    page.value++;
    init();
  };
  return loadMore;
};

export default useLoadMore;
