import { ref, onUnmounted } from 'vue';
const useInfiniteScroll = (func: () => unknown) => {
  const last = ref<Element>({} as Element);
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (!entries[0]) return;
      func();
    }
  });
  observer.observe(last.value);
  onUnmounted(() => {
    observer.unobserve(last.value);
  });
  return last;
};
export default useInfiniteScroll;
