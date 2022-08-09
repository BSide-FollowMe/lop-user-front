<template>
  <div class="empty">
    <div class="background-image"></div>
    <p class="statement">등록된 내 스토리가 없어요</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style lang="scss" scoped>
.empty {
  max-width: 960px;
  height: 400px;
  background: #ffffff;

  box-shadow: 2px 2px 15px 3px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding-bottom: 80px;
}
.background-image {
  width: 100%;
  height: 236px;
  background: url('@/assets/images/story/empty.svg');
  background-repeat: no-repeat;
  background-position: center 123px;
}
.statement {
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  /* identical to box height, or 142% */

  text-align: center;
  letter-spacing: -0.01em;

  /* deepgreen/1-main */

  color: #365650;
}
</style>
