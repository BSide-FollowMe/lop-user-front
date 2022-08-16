import { onMounted, ref } from 'vue';

const useSticky = () => {
  const elementRef = ref<HTMLElement>({} as HTMLElement);
  onMounted(() => {
    elementRef.value.style.position = 'sticky';
  });

  return elementRef;
};

export default useSticky;
