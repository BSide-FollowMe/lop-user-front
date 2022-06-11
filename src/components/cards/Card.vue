<template>
  <div class="card">
    <div class="card-main">
      <div class="icon">
        <img :src="imgSrc" />
      </div>
      <div class="text">
        <div class="card-title">{{ title }}</div>
        <div class="card-content">{{ content }}</div>
      </div>
    </div>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';
.card {
  background: #f8f8f8;
  border-radius: 4px 4px 0px 0px;
  display: inline-flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  .card-main {
    display: flex;
    align-items: center;
    padding: 0 40px;
    min-height: 120px;
    @include breakpoint-down-sm {
      min-height: 90px;
      padding: 0 30px 0 25px;
    }
    .icon {
      img {
        vertical-align: middle;
        @include breakpoint-down-sm {
          width: 35.71px;
          height: 35.71px;
        }
      }
      text-align: center;
      line-height: 70px;
      min-width: 70px;
      height: 70px;
      @include breakpoint-down-sm {
        line-height: 50px;
        min-width: 50px;
        height: 50px;
      }
      background: white;
      -moz-border-radius: 35px;
      -webkit-border-radius: 35px;
      border-radius: 35px;
    }
    .text {
      margin-left: 30px;
      width: 100%;
      @include breakpoint-down-sm {
        margin-left: 25px;
      }
      .card-title {
        font-family: Pretendard;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        @include breakpoint-down-sm {
          font-size: 16px;
        }
        /* identical to box height, or 144% */

        letter-spacing: -0.01em;

        /* text/1 */

        color: var(--text-color-1);
        margin-bottom: 4px;
      }
      .card-content {
        font-weight: var(--font-weight-medium);
        font-size: 18px;
        line-height: 26px;
        /* identical to box height, or 144% */

        letter-spacing: -0.01em;
        @include breakpoint-down-sm {
          font-size: 16px;
          line-height: 19px;
        }

        /* text/2 */

        color: var(--text-color-2);
      }
    }
  }
  div[name='action'] {
    width: 100%;
  }
}
</style>
