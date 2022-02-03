<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="(item, index) in items"
      :key="`tab-${index}`"
      :class="`${activeTab == index ? 'tab-active' : ''}`"
      @click="activeTab = index"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items', 'value'],
  data() {
    return {
      activeTab: null,
    };
  },
  created() {
    this.activeTab = this.value;
  },
  watch: {
    activeTab(newval) {
      this.onChangeEvt(newval);
    },
    value(newval){
      this.activeTab = newval;
    }
  },
  methods: {
    onChangeEvt(newval) {
      this.$emit('changeTab', newval);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
    display:flex;
  & > div.tab {
    display: block;
    flex-grow:1;
    height: 56px;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid var(--background-color-2);
    &.tab-active {
      border-bottom: 2px solid var(--text-color);
    }
    span {
      line-height: 60px;
    }
  }
}
</style>
