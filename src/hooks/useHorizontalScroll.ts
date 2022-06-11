import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

const useHorizontalMouseScroll = (): Ref<HTMLElement> | null => {
  const slider = ref<HTMLElement>({} as HTMLElement);
  onMounted(() => {
    if (!slider.value) return null;
    let isDown = false;
    let startX: number, scrollLeft: number;
    slider.value.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      slider.value.classList.add('active');
      startX = e.pageX - slider.value.offsetLeft;
      scrollLeft = slider.value.scrollLeft;
    });
    slider.value.addEventListener('mouseleave', () => {
      isDown = false;
      slider.value.classList.remove('active');
    });
    slider.value.addEventListener('mouseup', () => {
      isDown = false;
      slider.value.classList.remove('active');
    });
    slider.value.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.value.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.value.scrollLeft = scrollLeft - walk;
    });
  });

  return slider;
};

export default useHorizontalMouseScroll;
