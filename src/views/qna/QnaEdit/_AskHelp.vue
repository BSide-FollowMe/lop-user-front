<template>
  <form class="ask-help" @submit.prevent>
    <div class="input-title">식물의 이름을 알려주세요</div>
    <VueAutocomplete
      label="식물명 검색"
      v-model="plantName"
      :is-loading="isLoading"
      :items="plantNameOptions.map((item) => item.name)"
      @change="({ newVal }) => (plantName = newVal)"
      @change-subjective="changeSubjective"
      @start-loading="isLoading = true"
    />
    <div class="input-item" v-if="plantName == '직접입력'">
      <input id="plant-water-cycle" v-model="plantNameSubjective" :class="{ 'is-empty': plantNameSubjective === '' }" maxlength="50" />
      <label for="plant-water-cycle">식물 이름을 직접 입력해주세요</label>
    </div>
    <div class="input-title">물은 얼마나 자주 주셨나요?</div>
    <div class="textarea-item">
      <textarea
        id="plant-water-cycle"
        v-model="plantWaterCycle"
        :class="{ 'is-empty': plantWaterCycle === '' }"
        maxlength="500"
        @keyup="autoResize"
      />
      <label for="plant-water-cycle">내용을 입력하세요</label>
    </div>
    <div class="input-title">
      식물은 어디에 두셨고,
      <br class="md-down-only" />
      햇빛을 받는 시간은 얼마나 되나요?
    </div>
    <div class="textarea-item">
      <textarea id="plant-life-cycle" v-model="plantLifeCycle" :class="{ 'is-empty': plantLifeCycle === '' }" maxlength="500" @keyup="autoResize" />
      <label for="plant-life-cycle">내용을 입력하세요</label>
    </div>
    <div class="input-title">증상이 나타났을 때 어떻게 대처하셨나요?</div>
    <div class="textarea-item">
      <textarea
        id="plant-countermeasure"
        v-model="plantCountermeasure"
        :class="{ 'is-empty': plantCountermeasure === '' }"
        maxlength="500"
        @keyup="autoResize"
      />
      <label for="plant-countermeasure">내용을 입력하세요</label>
    </div>
    <div class="input-title">증상을 자세하게 알려주세요</div>
    <div class="textarea-item">
      <textarea id="content" v-model="content" :class="{ 'is-empty': content === '' }" maxlength="500" @keyup="autoResize" />
      <label for="content">내용을 입력하세요</label>
    </div>
    <div class="input-title">
      사진 등록
      <br class="md-down-only" />
      <span class="input-tips">사진은 최대 3장까지 등록하실 수 있어요</span>
    </div>
    <PhotoUploader class="photo-uploader" v-model:value="images" />
    <div class="text-center submit-btn">
      <VueButton color="primary" @click="submit">등록하기</VueButton>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { debounce } from '@/utils/global';
import { getPlantList } from '@/api/plant';
import VueButton from '@/components/buttons/VueButton.vue';
import VueAutocomplete from '@/components/inputs/VueAutocomplete.vue';
import PhotoUploader from '@/components/inputs/PhotoUploader.vue';
import { registQnaBoard } from '@/api/qnaboard';
import { BoardParamModel } from '@/api/model/boardModel';

export default defineComponent({
  name: 'Ask Help Form',
  components: {
    VueButton,
    VueAutocomplete,
    PhotoUploader,
  },
  setup() {
    const plantName = ref('');
    const plantNameOptions: any = ref([]);
    const plantNameSubjective = ref('');
    const plantWaterCycle = ref('');
    const plantLifeCycle = ref('');
    const plantCountermeasure = ref('');
    const content = ref('');
    const images = ref([] as any);
    const isLoading = ref(false);

    async function getPlantNameList(searchStr: string) {
      try {
        isLoading.value = true;
        const payload = {
          size: '5',
          keyword: searchStr,
        };
        const { data }: any = await getPlantList(payload);
        plantNameOptions.value = await data.data.map((item: any) => {
          return { name: item.name, id: item.id };
        });
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    }
    function submit() {
      const selectedPlant = plantNameOptions.value.find((item: any) => plantName.value == item.name);
      const payload: BoardParamModel = {
        plantId: plantName.value != '직접입력' && selectedPlant ? selectedPlant.id : null,
        plantName: plantName.value == '직접입력' ? plantNameSubjective.value : plantName.value,
        plantWaterCycle: plantWaterCycle.value,
        plantLifeCycle: plantLifeCycle.value,
        plantCountermeasure: plantCountermeasure.value,
        content: content.value,
        images: images.value,
        type: 'SICK',
      };
      console.log(payload);
      if (!validatePayload(payload)) return;
      registQuestion(payload);
    }
    async function registQuestion(payload: BoardParamModel) {
      try {
        const res = await registQnaBoard(payload);
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    }
    function validatePayload({ plantName, plantWaterCycle, plantLifeCycle, plantCountermeasure, content }: any) {
      if (plantName == '') {
        alert('식물 이름이 선택되거나 입력되지 않았어요!');
        return;
      }

      if (plantWaterCycle == '') {
        alert('물을 얼마나 자주 주셨는지 입력해주세요!');
        return;
      }

      if (plantLifeCycle == '') {
        alert('식물은 어디에 두셨고, 햇빛을 받는 시간은 얼마나 되느지 입력해주세요!');
        return;
      }

      if (plantCountermeasure == '') {
        alert('증상이 나타났을 때 어떻게 대처하셨는지 알려주세요!');
        return;
      }

      if (content == '') {
        alert('증상을 자세하게 입력해주세요!');
        return;
      }

      return true;
    }
    const changeSubjective = debounce(getPlantNameList, 1000);

    function autoResize(e: any) {
      const obj = e.target;
      obj.style.height = '120px';
      obj.style.height = 2 + obj.scrollHeight + 'px';
    }
    return {
      plantName,
      plantNameOptions,
      plantWaterCycle,
      plantLifeCycle,
      plantCountermeasure,
      content,
      changeSubjective,
      debounce,
      getPlantNameList,
      isLoading,
      plantNameSubjective,
      images,
      submit,
      autoResize,
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
  @include breakpoint-down-sm {
    font-size: 16px;
  }
}
.input-tips {
  margin-left: 30px;
  font-size: 15px;
  line-height: 18px;
  color: var(--text-color-3);

  @include breakpoint-down-sm {
    margin-left: unset;
    font-size: 12px;
    line-height: 26px;
  }
}
.input-item {
  margin-top: 5px;
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
    &:focus {
      border: 1px solid var(--secondary-green-color-1);
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
      font-size: 14px;
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
    &:focus {
      border: 1px solid var(--secondary-green-color-1);
    }
    @include breakpoint-down-sm {
      height: 120px;
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
      font-size: 14px;
    }
  }
}
.photo-uploader {
  margin-top: 10px;
  @include breakpoint-down-sm {
    margin-top: 20px;
  }
}
.submit-btn {
  button {
    margin-top: 80px;
    width: 168px;
    height: 48px;
    @include breakpoint-down-sm {
      margin-top: 60px;
      width: 140px;
      height: 40px;
    }
  }
}
</style>
