<template>
  <button :class="classGenerator(color)">
    <slot />
  </button>
</template>

<script>
export default {
  props: ['color'],
  methods: {
    classGenerator(color) {
      if (color == 'primary') {
        return 'btn btn-primary';
      }
      if (color == 'secondary') {
        return 'btn btn-secondary';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
button {
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: var(--font-size-p-2);
  @include breakpoint-down-sm {
    font-size: var(--m-font-size-p-2);
  }
}
.btn-primary {
  background-color: var(--primary-color);
  color: #fff;
  &:hover {
    background-color: var(--primary-color-2);
  }
  &[disabled] {
    color: var(--text-color-4);
    background-color: var(--background-color-3);
    cursor: not-allowed;
  }
}
.btn-secondary {
  background-color: #fff;
  border: 1px solid var(--primary-color);
  &:hover {
    background-color: var(--secondary-green-color-3);
  }
  &[disabled] {
    color: var(--text-color-4);
    background-color: var(--background-color-3);
    cursor: not-allowed;
  }
}
.sub {
}
</style>
