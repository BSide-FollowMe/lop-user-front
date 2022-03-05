<template>
  <div class="container">
    {{ title }}
    <div class="row" v-for="(item, index) in items" :key="index">
      <div
        ref="guideBar"
        :class="['guide-bar', index === active ? 'hover' : '', index === chosen ? 'chosen' : '']"
        @mouseover="mouseOver(index)"
        @mouseleave="mouseLeave(index)"
        @click="poll(index)"
      >
        <div class="inner-guide-bar">
          <span class="check-icon" />
          {{ item.label }}
        </div>
        <span class="bar" :style="{ width: items[index].value }"></span>
      </div>
      <span class="value">{{ item.value }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<{ label: string; labelValue: string; activeColor: string; value: string; hoverColor: string; onClick: () => void }[]>,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    current: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      active: -1,
    };
  },
  computed: {
    hoverColor(): string {
      if (this.active == -1) return '';
      return this.items[this.active].hoverColor;
    },
    chosen(): number {
      return this.items.findIndex((item) => item.labelValue === this.current);
    },
    chosenBackgroundColor(): string {
      if (this.chosen == -1) return '';
      return this.items[this.chosen].activeColor;
    },
    chosenTextColor(): string{
      if (this.chosen == -1) return '';
      return this.items[this.chosen].hoverColor;
    },
    chosenBorderColor():string{
      if (this.chosen == -1) return '';
      return this.items[this.chosen].hoverColor;
    },
  },
  methods: {
    mouseOver: function (index: number) {
      this.active = index;
    },
    mouseLeave: function () {
      this.active = -1;
    },
    poll: function (index: number) {
      this.items[index].onClick();
      this.chosen = index;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.container {
  padding: 20px 25px 20px 30px;

  height: 171px;
  /* white */
  background: #ffffff;
  /* bg,line/2 */
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;

  font-weight: var(--font-weight-medium);
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;
  /* text/1 */
  color: var(--text-color-1);
  margin: 0;
  @include breakpoint-down-sm {
    border: none;
    padding: 30px 0 0 0;
    width: 100%;
  }
  .row {
    margin-top: 12px;
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-medium);
    font-size: 18px;
    @include breakpoint-down-sm {
      font-size: 14px;
    }
    line-height: 26px;
    /* identical to box height, or 144% */

    letter-spacing: -0.01em;
    justify-content: space-between;
    /* text/3 */

    color: var(--text-color-3);

    .guide-bar {
      margin-right: 20px;
      cursor: pointer;
      display: inline-block;
      position: relative;
      background: #ffffff;
      /* bg,line/3 */
      border: 1px solid #ededed;
      border-radius: 4px;
      font-weight: var(--font-weight-bold);
      line-height: 44px;
      /* identical to box height, or 162% */
      letter-spacing: -0.01em;
      /* text/3 */
      color: var(--text-color-3);
      width: 100%;
      height: 44px;
      &.hover {
        color: v-bind(hoverColor);
        border-color: v-bind(hoverColor);
        .check-icon {
          background-color: v-bind(hoverColor) !important;
        }
        + .value {
          color: v-bind(hoverColor);
        }
      }

      &.chosen {
        color: v-bind(chosenTextColor);
        border-color: v-bind(chosenBorderColor);
        .check-icon {
          background-color: v-bind(chosenTextColor) !important;
        }
        + .value {
          color: v-bind(chosenTextColor);
        }
        .bar {
          background-color: v-bind(chosenBackgroundColor);
        }
      }

      .inner-guide-bar {
        .check-icon {
          margin: 0 16px;
          display: inline-block;
          -webkit-mask-image: url('@/assets/icon/check.svg');
          mask-image: url('@/assets/icon/check.svg');
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center center;
          mask-position: center center;
          width: 20px;
          height: 18.35px;
          @include breakpoint-down-sm {
            width: 14.66px;
            height: 11.18px;
          }
          background-color: var(--primary-color-1);
        }
        position: absolute;
        z-index: 1;
      }
      .bar {
        position: absolute;
        display: inline-block;
        background-color: var(--background-color-3);
        height: 100%;
      }
    }
  }
}
</style>
