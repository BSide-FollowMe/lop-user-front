<template>
  <form class="ask-help">
    <div class="input-title">식물의 이름을 알려주세요</div>
    <VueAutocomplete v-model="plantName" :items="['1', '2', '3', '4', '5', '6']" @change="({ newVal }) => (plantName = newVal)"  />
    <div class="input-title">물은 얼마나 자주 주셨나요?</div>
    <div class="textarea-item">
      <textarea id="plant-water-cycle" v-model="plantWaterCycle" :class="{ 'is-empty': plantWaterCycle === '' }" />
      <label for="plant-water-cycle">내용을 입력하세요</label>
    </div>
    <div class="input-title">식물은 어디에 두셨고, 햇빛을 받는 시간은 얼마나 되나요?</div>
    <div class="textarea-item">
      <textarea id="plant-life-cycle" v-model="plantLifeCycle" :class="{ 'is-empty': plantLifeCycle === '' }" />
      <label for="plant-life-cycle">내용을 입력하세요</label>
    </div>
    <div class="input-title">증상이 나타났을 때 어떻게 대처하셨나요?</div>
    <div class="textarea-item">
      <textarea id="plant-countermeasure" v-model="plantCountermeasure" :class="{ 'is-empty': plantCountermeasure === '' }" />
      <label for="plant-countermeasure">내용을 입력하세요</label>
    </div>
    <div class="input-title">증상을 자세하게 알려주세요</div>
    <div class="textarea-item">
      <textarea id="content" v-model="content" :class="{ 'is-empty': content === '' }" />
      <label for="content">내용을 입력하세요</label>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueAutocomplete from '@/components/inputs/VueAutocomplete.vue';

export default defineComponent({
  name: 'Ask Help Form',
  components: {
    VueAutocomplete,
  },
  setup() {
    const plantName = ref('');
    const plantWaterCycle = ref('');
    const plantLifeCycle = ref('');
    const plantCountermeasure = ref('');
    const content = ref('');
    const onChange = (a: any, b: any, c: any) => {
      console.log(a, b, c);
    };
    // datalistStyleFactory();
    return {
      plantName,
      plantWaterCycle,
      plantLifeCycle,
      plantCountermeasure,
      content,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.plant-name {
  position: relative;
}

.input-title {
  margin-top: 30px;
}
.input-item {
  margin-top: 10px;
  position: relative;
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
  datalist {
    position: absolute;
    max-height: 20em;
    border: 0 none;
    overflow-x: hidden;
    overflow-y: auto;
  }

  datalist option {
    font-size: 0.8em;
    padding: 0.3em 1em;
    background-color: #ccc;
    cursor: pointer;
  }

  datalist option:hover,
  datalist option:focus {
    color: #fff;
    background-color: #036;
    outline: 0 none;
  }
}
.textarea-item {
  margin-top: 10px;
  position: relative;
  textarea {
    margin-top: 10px;
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
</style>
