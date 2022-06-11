<template>
  <div class="container">
    <transition name="snack">
      <div class="snack" v-if="snack" @click="onClickSnackbar">
        {{ snack }}
        <InlineSvg class="link-arrow" v-if="link" :src="SimpleArrowRight" @loaded="setColor" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import SimpleArrowRight from '@/assets/icon/simple-arrow-right-pc.svg';
import InlineSvg from 'vue-inline-svg';
export default defineComponent({
  computed: {
    ...mapGetters('snack', ['snack', 'link', 'color']),
  },
  data() {
    return {
      SimpleArrowRight,
    };
  },
  components: {
    InlineSvg,
  },
  methods: {
    ...mapActions('snack', ['closeSnack']),
    setColor(svg: HTMLElement) {
      svg.getElementsByTagName('path')[0].setAttribute('fill', this.color);
    },
    onClickSnackbar() {
      const link = this.link;
      this.closeSnack();
      if (link) this.$router.push(link);
    },
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/';
.container {
  z-index: 100;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  > .snack {
    cursor: pointer;
    background: #ffffff;
    box-shadow: var(--snackbor-box-shadow);
    border-radius: 25px;
    color: v-bind(color);
    padding: var(--snackbar-padding);
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
  }
}

.snack-leave-active {
  transition: all 1.2s ease;
}
.snack-enter-active {
  transition: all 0.8s ease;
}
.snack-enter,
.snack-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.snack-enter-from {
  transform: translateY(-100%);
  opacity: 1;
}
.link-arrow {
  margin-left: 16px;
}
</style>
