<template>
  <DefaultModal class="modal" @close="closeModal">
    <div class="conatiner">
      <div class="title">
        <span class="text-bold">{{ options?.modalTitle }}</span>
      </div>
      <hr class="divider" />
      <component :is="options.componentName" isModal="true" />
    </div>
  </DefaultModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DefaultModal from './DefaultModal.vue';
import WaterInspect from '@/views/guide/WaterGuide/Inspect.vue';
import WaterKnowHow from '@/views/guide/WaterGuide/KnowHow.vue';
import Ventilation from '@/views/guide/VentilationGuide/VentilationGuide.vue';
import Sunlight from '@/views/guide/SunlightGuide/SunlightGuide.vue';
import Blight from '@/views/guide/BlightGuide/BlightGuide.vue';
export default defineComponent({
  name: 'Report Modal',
  components: {
    DefaultModal,
    WaterInspect,
    WaterKnowHow,
    Ventilation,
    Sunlight,
    Blight,
  },
  props: ['options'],
  setup(props, { emit }) {
    const email = ref('');
    const contents = ref('');
    function closeModal() {
      emit('close');
    }
    return { closeModal, email, contents, props };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/';

.conatiner {
  text-align: left;
  overflow: auto;
  position: relative;
  width: 750px;
  height: calc(100vh - 320px);
  background-color: #fff;
  border-radius: 4px;
  padding: 40px;
  @include breakpoint-down-sm {
    width: 100%;
    padding: 26px 20px;
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  .title {
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    span {
      font-size: 20px;
      line-height: 20px;
      @include breakpoint-down-sm {
        font-size: 18px;
      }
      color: var(--secondary-green-color-1);
    }
  }
  .divider {
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid var(--background-color);
  }
  .objective {
    @include breakpoint-down-sm {
      font-size: 14px;
    }
  }
  .target-name {
    color: var(--text-color-2);
    margin-left: 34px;
    @include breakpoint-down-sm {
      margin-left: 20px;
      font-size: 14px;
    }
  }
  .bottom {
    margin-top: 40px;
    text-align: center;
  }
  .confirm-btn {
    width: 140px;
    height: 40px;
  }
}
.contents-input {
  position: relative;
  margin-top: 10px;
  margin-bottom: 20px;
  textarea {
    display: block;
    padding: 12px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: 200px;
    &:focus + label {
      display: none;
    }
    &:not(.is-empty) + label {
      display: none;
    }
  }
  label {
    pointer-events: none;
    font-size: var(--font-size-p-2);
    line-height: 19px;
    color: var(--text-color-3);
    position: absolute;
    top: 11px;
    left: 12px;
    word-break: keep-all;

    @include breakpoint-down-sm {
    }
  }
}
.email-input {
  position: relative;
  margin-top: 10px;
  margin-bottom: 15px;
  input {
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: 40px;
    padding-left: 12px;
    &:focus + label {
      display: none;
    }
    &:not(.is-empty) + label {
      display: none;
    }
    @include breakpoint-down-sm {
      height: 38px;
    }
  }
  label {
    pointer-events: none;
    font-size: var(--font-size-p-2);
    line-height: 19px;
    color: var(--text-color-3);
    position: absolute;
    top: 11px;
    left: 12px;

    @include breakpoint-down-sm {
    }
  }
}
.description {
  img {
    vertical-align: text-top;
  }
  font-size: var(--font-size-caption);
  line-height: 20px;
  @include breakpoint-down-sm {
    font-size: var(--m-font-size-caption);
    line-height: 18px;
  }
}
</style>
