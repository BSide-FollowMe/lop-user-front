<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subTitle }}</div>
    <div class="description">{{ description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '404',
    },
    subTitle: {
      type: String,
      default: 'Not Found',
    },
    description: {
      type: String,
      default: 'The resource could not be found on the server',
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}
.title {
  font-size: 60px;
}
.subtitle {
  font-size: 20px;
  margin-bottom: 10px;
}
.description {
  font-size: 15px;
}
</style>
