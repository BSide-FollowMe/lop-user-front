<template>
  <div class="container">
    <router-view />
  </div>
</template>
<script lang="ts">

</script>

<style lang="scss" scoped>
@import '@/styles/';
.container{
  margin-left:auto;
  margin-right:auto;
  max-width:var(--content-container-max-width);
  padding: 81px var(--content-container-padding) 120px var(--content-container-padding);
  @include breakpoint-down-sm{
    padding: 60px var(--m-content-container-padding) 60px var(--m-content-container-padding);
    min-width:var(--m-content-container-max-width);
  }
}
</style>