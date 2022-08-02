<template>
  <div class="container">
    <div class="inner-container">
      <h1 class="title">스토리 작성</h1>
      <form @submit.prevent="submit">
        <div class="photo-upload-container">
          <div class="input-title">
            사진 등록
            <br class="md-down-only" />
            <span class="input-tips">사진은 최대 5장까지 등록하실 수 있어요</span>
          </div>
          <PhotoUploader ref="photoUploader" :max="5" class="photo-uploader" v-model:value="images" />
          <small v-if="validationError.images" class="error">{{ validationError.images }}</small>
        </div>
        <div class="text-upload-container">
          <ResizableTextArea
            placeholder="다른 식집사들과 공유하고 싶은 식물 이야기를 남겨주세요."
            id="content"
            v-model="content"
            :class="{ 'is-empty': content === '' }"
            maxlength="1000"
            minHeight="160"
          />
          <small v-if="validationError.content" class="error">{{ validationError.content }}</small>
        </div>
        <div class="plant-upload-container">
          <div class="input-title">식물의 이름을 알려주세요<span class="input-restriction">최대 10개</span></div>
          <VueAutocomplete
            ref="plantSelector"
            label="식물명 검색"
            :appendIcon="{ iconSrc: magnifierIcon }"
            v-model:value="plantName"
            :is-loading="isLoading"
            :items="plantNameOptions.map((item) => item.name)"
            @change="({ newVal }) => addPlantTag(newVal)"
            @change-subjective="changeSubjective"
            @start-loading="isLoading = true"
          >
            <template v-slot:appendIcon>
              <button class="append-btn">
                <img :src="magnifierIcon" />
              </button>
            </template>
          </VueAutocomplete>
          <div class="tag-wrapper">
            <Tag v-for="(item, index) in selectedPlants" :key="index">
              <div class="inner-tag">
                {{ item.name }}
                <img :src="close" @click="removePlantTag(index)" />
              </div>
            </Tag>
            <small v-if="validationError.plantIdList" class="error">{{ validationError.plantIdList }}</small>
          </div>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PhotoUploader from '@/components/atoms/Inputs/PhotoUploader.vue';
import ResizableTextArea from '@/components/atoms/textarea/ResizableTextArea.vue';
import VueAutocomplete from '@/components/atoms/Inputs/VueAutocomplete.vue';
import { debounce } from '@/utils/global';
import { Plant, PlantListParam } from '@/types/api/plant';
import { getPlantList } from '@/api/plant';
import magnifierIcon from '@/assets/icon/magnifier.svg';
import close from '@/assets/icon/close.svg';
import Tag from '@/components/atoms/tag/Index.vue';
import { postStory } from '@/api/story';
import { ROUTE_TO } from '@/router/routing';

export default defineComponent({
  components: {
    PhotoUploader,
    ResizableTextArea,
    VueAutocomplete,
    Tag,
  },
  setup() {
    const images = ref([] as string[]);
    const photoUploader = ref<typeof PhotoUploader>();
    const content = ref('');
    const isLoading = ref(false);
    const plantName = ref('');
    const plantNameOptions = ref([] as { name: string; id: string }[]);
    const selectedPlants = ref([] as { name: string; id: string }[]);
    const validationError = ref({
      images: '',
      content: '',
      plantIdList: '',
    });
    async function getPlantNameList(searchStr: string) {
      try {
        isLoading.value = true;
        const payload: PlantListParam = {
          size: 5,
          keyword: searchStr,
        };
        const { data: plants } = await getPlantList(payload);
        plantNameOptions.value = plants.map((item: Plant) => {
          return { name: item.name, id: item.id };
        });
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    }
    const changeSubjective = debounce(getPlantNameList, 1000);
    const validate = () => {
      validationError.value = {
        images: '',
        content: '',
        plantIdList: '',
      };
      let error = false;
      if (!images.value.length) {
        validationError.value.images = '이미지를 등록해주세요';
        error = true;
      }
      if (!content.value) {
        validationError.value.content = '내용을 입력해주세요';
        error = true;
      }
      if (!selectedPlants.value.length) {
        validationError.value.plantIdList = '관련 식물 테그를 입력해주세요';
        error = true;
      }
      return !error;
    };
    const submit = async (e: Event) => {
      if (!validate()) return;

      try {
        await postStory({ content: content.value, images: images.value, plantIdList: selectedPlants.value.map((item) => Number(item.id)) });
        ROUTE_TO.STORY_FEED();
      } catch (e) {
        alert(e);
      }
    };
    const addPlantTag = (name: string) => {
      if (!name) return;
      setTimeout(() => {
        plantName.value = '';
      }, 0);
      if (selectedPlants.value.length == 10) {
        alert(`식물 태그는 10개까지만 등록하실 수 있습니다.`);
        return;
      }

      selectedPlants.value = [...selectedPlants.value, plantNameOptions.value.find((item) => name == item.name)!];
    };
    const removePlantTag = (index: number) => {
      selectedPlants.value = selectedPlants.value.filter((item, _index) => _index != index);
    };
    return {
      images,
      content,
      photoUploader,
      isLoading,
      plantName,
      plantNameOptions,
      changeSubjective,
      submit,
      addPlantTag,
      removePlantTag,
      magnifierIcon,
      selectedPlants,
      close,
      validationError,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
.container {
  background-color: var(--background-color-5);
}
.inner-container {
  max-width: var(--content-container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding: 80px 0 120px 0;
  form {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: white;
    padding: 60px;
  }
}
.title {
  margin: 0;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  letter-spacing: -0.0025em;

  /* deepgreen/1-main */

  color: var(--primary-color-1);
}
.input-title {
  font-weight: var(--font-weight-medium);
  margin-top: 30px;
  @include breakpoint-down-sm {
    font-size: 16px;
  }
}
.input-tips {
  margin-left: 30px;
  font-size: 14px;
  line-height: 18px;
  color: var(--text-color-3);

  @include breakpoint-down-sm {
    margin-left: unset;
    font-size: 12px;
    line-height: 26px;
  }
  &-danger {
    font-size: 15px;
    // line-height: 19px;
    color: var(--secondray-color-2);
  }
}
.photo-uploader {
  margin-top: 10px;
  @include breakpoint-down-sm {
    margin-top: 20px;
  }
}
.photo-upload-container {
  margin-bottom: 20px;
}
.plant-upload-container {
  margin-bottom: 80px;
  @include breakpoint-down-sm {
    margin-bottom: 60px;
  }
}
button[type='submit'] {
  align-self: center;
  cursor: pointer;
  width: 140px;
  height: 40px;
  color: white;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  border: none;
  background: var(--primary-color-1);
  border-radius: 2px;
}
.input-restriction {
  margin-left: 6px;
  font-size: 14px;
  letter-spacing: -0.01em;
  color: var(--secondray-color-2);
}

.append-btn {
  top: 50%;
  right: 8px;
  position: absolute;
  transform: translateY(-50%);
  border: none;
  background: none;
  filter: brightness(0);
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
  }
}
.tag-wrapper {
  margin-top: 11px;
  display: flex;
  gap: 6px 10px;
}
.inner-tag {
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: -0.0025em;

  /* text/3 */

  color: #969696;
  img {
    cursor: pointer;
    margin-left: 10px;
    width: 8px;
    height: 8px;
  }
}

.error {
  color: red;
}
</style>
