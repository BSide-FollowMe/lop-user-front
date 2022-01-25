<template>
  <div>
    <div class="fill-height">
      <slot />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.fill-height {
  height: 100%;
  overflow:hidden;
}
</style>
