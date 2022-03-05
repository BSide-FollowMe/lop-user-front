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
  name: 'Vue Tabs',
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
@import '@/styles/mixin';
.tabs {
  display: flex;
  & > div.tab {
    display: block;
    flex-grow: 1;
    height: 56px;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid var(--background-color-2);
    color: var(--text-color-3);

    @include breakpoint-down-sm {
      height:46px;
    }

    &.tab-active {
      color: var(--text-color-1);
      border-bottom: 2px solid var(--text-color);
    }
    span {
      line-height: 60px;
      @include breakpoint-down-sm {
        line-height:46px;
        font-size:14px;
      }
    }
  }
}
</style>
