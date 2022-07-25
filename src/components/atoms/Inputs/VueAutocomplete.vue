<template>
  <div class="autocomplete" ref="selector">
    <input
      id="autocomplete-input"
      class="selected-item select"
      @click="showSelect = true"
      v-model="localVal"
      @keyup="onChangeSubjective"
      @keydown.enter.prevent
      :class="{ 'is-empty': localVal === '' }"
      autocomplete="off"
    />
    <label for="autocomplete-input">{{ label || '' }}</label>
    <slot name="appendIcon">
      <button v-if="isSelected" class="clear-btn" @click="resetSelectedItem">
        <img :src="closeIcon" />
      </button>
    </slot>
    <transition name="slide-fade">
      <ul class="item-list shadow pull-right" v-if="showSelect">
        <li class="text-ellipsis" v-if="isLoading && localVal !== ''">
          <span>해당 이름의 식물을 불러오는 중입니다...</span>
        </li>
        <li
          v-else
          class="text-ellipsis"
          :class="{ selected: item === val }"
          v-for="(item, index) in localVal == '' ? '' : items"
          :key="`select-item-${index}`"
          @click="onSelect(item)"
        >
          <span v-html="stylizeBySearchTarget(localVal, item + '')"></span>
        </li>
        <hr />
        <li class="text-ellipsis text-center" @click="onSelect('직접입력')" v-if="enableCutomInput && !isLoading && localVal !== ''">
          <img src="@/assets/icon/modify-pencil.svg" />
          <span>직접입력</span>
        </li>
        <li class="text-ellipsis" v-if="localVal == ''">
          <span>검색할 식물을 입력해주세요</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import closeIcon from '@/assets/icon/close.svg';
export default defineComponent({
  name: 'Selector',
  props: {
    enableCutomInput: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const val = ref(props.value);
    const showSelect = ref(false);
    const selector = ref(null);
    const localVal = computed({
      get: () => props.value || '',
      set: (value) => {
        emit('update:value', value);
      },
    });
    const isSelected = ref(false);
    document.addEventListener('click', documentClick);

    function documentClick(e: any) {
      let el: any = selector.value;
      let target = e.target;
      if (el !== target && !el.contains(target)) {
        showSelect.value = false;
      }
    }

    function onSelect(item: any) {
      showSelect.value = false;
      emit('change', { oldVal: val.value, newVal: item });
      val.value = item;
      localVal.value = item;
      isSelected.value = true;
    }

    function onChangeSubjective() {
      if (!localVal.value || localVal.value == '') return;
      emit('changeSubjective', localVal.value);
      emit('start-loading');
    }

    function stylizeBySearchTarget(searchStr: string, targetStr: string) {
      return targetStr.replaceAll(searchStr, `<span style="color:var(--secondary-green-color)">${searchStr}</span>`);
    }

    function resetSelectedItem() {
      emit('change', { oldVal: val.value, newVal: '' });
      val.value = '';
      localVal.value = '';
      isSelected.value = false;
    }
    return {
      closeIcon,
      documentClick,
      onSelect,
      val,
      showSelect,
      selector,
      stylizeBySearchTarget,
      localVal,
      onChangeSubjective,
      isSelected,
      resetSelectedItem,
    };
  },
  unmounted() {
    document.removeEventListener('click', this.documentClick);
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.autocomplete {
  position: relative;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  input {
    margin: 10px 0px 0px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 2px;
    resize: none;
    width: 100%;
    height: 40px;
    padding-left: 12px;
    font-size: 16px;
    &:focus + label {
      display: none;
    }
    &:not(.is-empty) + label {
      display: none;
    }
    &:focus {
      border: 1px solid var(--secondary-green-color-1);
    }
    &:disabled {
      background: #fff;
      color: var(--secondary-green-color-1);
    }
    @include breakpoint-down-sm {
      font-size: 14px;
    }
  }
  button.clear-btn {
    top: 50%;
    right: 8px;
    position: absolute;
    transform: translateY(-50%);
    border: none;
    background: none;
    filter: brightness(0);
    cursor: pointer;
  }
  label {
    pointer-events: none;
    font-size: 16px;
    line-height: 19px;
    color: var(--text-color-3);
    position: absolute;
    top: 11px;
    left: 12px;
    @include breakpoint-down-sm {
      font-size: 14px;
    }
  }
  .item-list {
    position: absolute;
    animation-duration: 0.3s;
    margin: 0;
    margin-top: 5px;
    padding: 0;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    z-index: 1;
    min-width: 100%;
    max-width: 200%;
    li {
      list-style-type: none;
      height: 40px;
      padding: 0px 15px;
      font-size: 16px;
      line-height: 40px;
      img {
        margin-right: 6px;
        width: 16px;
        height: 16px;
      }
      @include breakpoint-down-sm {
        font-size: 14px;
        img {
          margin-right: 4px;
          width: 12px;
          height: 12px;
        }
      }
    }
    li:not(.selected):hover {
      background: #f4f8f1;
    }
    hr {
      margin: 0px 10px;
      border: none;
      border-bottom: 1px solid #eee;
    }
  }
  .selected-item {
    width: 100%;
    display: block;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 4px 8px 4px 8px;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s;
  }
  .slide-fade-enter-from, .slide-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-5px);
    opacity: 0;
  }
}
</style>
