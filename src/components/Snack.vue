<template>
  <div class="container" >
    <transition name="snack" >
      <div class="snack" v-if="snack" @click="onClickSnackbar">
        {{ snack }}
        <InlineSvg v-if="link" ref="linkIcon" :src="SimpleArrowRight" @loaded="setColor"/>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import SimpleArrowRight from '@/assets/icon/simple-arrow-right.svg';
// const icons= require(SimpleArrowRight);
import InlineSvg from "vue-inline-svg";
export default defineComponent({
  computed: {
    ...mapGetters('snack', ['snack', 'link','color']),
  },
  data(){
    return{
      SimpleArrowRight,
    }
  },
  components:{
    InlineSvg,
  },
  methods:{
    setColor(svg:HTMLElement){
      svg.getElementsByTagName('path')[0].setAttribute('fill',this.color);
    },
    onClickSnackbar(){
      if(!this.link) return;
      this.$router.push(this.link);
    }
  }
});
</script>
<style lang="scss" scoped>
@import '@/styles/', '@/assets/fonts/pretendard/pretendard.css';
.container {
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
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
  }
}

.snack-leave-active {
  transition: all 1.2s ease;
}
.snack-enter-active {
  transition: all .8s ease;
}
.snack-enter, .snack-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.snack-enter-from {
  transform: translateY(-100%);
  opacity: 1;
}
</style>
