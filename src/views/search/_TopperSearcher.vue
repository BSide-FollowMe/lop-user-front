<template>
  <section class="searcher-container">
    <div class="inner-infinety-container">
      <div class="searcher">
        <input id="searchText" type="text" v-model="searchText" :class="{ 'is-empty': searchText === '' }"  @keyup.enter="onClickSubmit(searchText)" />
        <label for="searchText">식물명 또는 카테고리를 입력하세요.</label>
        <button @click="onClickSubmit(searchText)"></button>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { validateSearchStr } from '@/utils/validation';
import { ROUTE_TO } from '@/router/routing';

export default defineComponent({
  name: 'Topper Searcher',
  props: ['text'],
  setup(props) {
    const searchText = ref(props.text);
    function onClickSubmit(newVal: string) {
      const validateMsg = validateSearchStr(newVal);
      if (validateMsg) {
        alert(validateMsg);
        return;
      }
      ROUTE_TO.SEARCH_RESULT(newVal);
    }
    return {
      searchText,
      onClickSubmit,
    };
  },
  watch: {},
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';

.inner-infinety-container {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-container-max-width);
  overflow: visible;
  padding: 62px var(--content-container-padding);
  @include breakpoint-down-sm {
    min-width: var(--m-content-container-max-width);
    padding: 20px var(--m-content-container-padding);
  }
}
.searcher-container {
  height: 180px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background-color: var(--background-color-5);

  @include breakpoint-down-sm {
    height: 100px;
  }
}
.searcher {
  margin-left: auto;
  margin-right: auto;
  max-width: 665px;
  position: relative;
  padding: 10px 0 11px;
  border-bottom: 1px solid var(--text-color-1);
  font-weight: var(--font-weight-medium);
  font-size: 16px;
  vertical-align: baseline;
  word-break: keep-all;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @include breakpoint-down-sm {
    width: 100%;
  }
  button {
    content: '';
    position: absolute;
    height: 50px;
    width: 50px;
    background-image: url('@/assets/icon/magnifier.png');
    background-size: 100%;
    cursor: pointer;
    z-index: 2;
    border: none;
    background-color: transparent;
    transform: translateX(-100%);

    @include breakpoint-down-sm {
      width: 36px;
      height: 36px;
    }
  }

  &:focus-within {
    border-color: var(--secondary-green-color-1);
  }
  input {
    position: relative;
    height: 40px;
    z-index: 1;
    border: 0;
    padding: 0;
    outline: 0;
    background-color: transparent;
    font-size: 25px;
    line-height: 35px;
    width: 100%;

    &:focus + label {
      display: none;
    }
    &:not(.is-empty) + label {
      display: none;
    }

    @include breakpoint-down-sm {
      height: 26px;
      font-size: var(--font-size-p);
    }
  }

  label {
    pointer-events: none;
    font-size: 25px;
    line-height: 35px;
    color: var(--background-color-1);
    position: absolute;
    bottom: 3px;
    left: 0;
    top: 11px;

    @include breakpoint-down-sm {
      height: 26px;
      font-size: var(--font-size-p);
    }
  }
}
</style>
