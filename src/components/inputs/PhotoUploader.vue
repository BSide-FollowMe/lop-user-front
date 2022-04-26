<template>
  <div class="photo-uploader">
    <div class="upload-input">
      <label for="photo-uploader">
        <img src="@/assets/icon/camera-alt.svg" />
        <span class="counter">
          <span class="active">{{ imageList.length || 0 }}</span>
          /3
        </span>
      </label>
      <input type="file" accept="image/*" multiple="multiple" @change="previewMultiImage" class="form-control-file" id="photo-uploader" />
    </div>
    <div class="photo-preview">
      <div class="item" v-for="(item, index) in previewList" :key="`preview-item-${index}`">
        <img :src="item" />
        <button @click="removePhoto(index, previewList, imageList)"><img src="@/assets/icon/close-bold.svg" /></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { dataURLtoFile } from '@/utils/global';
export default defineComponent({
  name: 'PhotoUpload',
  props: ['value'],
  setup(props, { emit }) {
    const imageList = ref(props.value);
    const previewList = ref([] as any);

    watch(
      imageList,
      (newVal, oldVal) => {
        emit('input', { newVal: newVal });
      },
      { deep: true },
    );
    function previewMultiImage(event: any) {
      if (imageList.value.length > 2) {
        alert('이미지는 3개까지만 등록하실 수 있습니다.');
        return;
      }
      let input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const currentFile = input.files[index];
          const fileName = currentFile.name;
          resizeImage({ file: currentFile, maxSize: 1200 }).then((resized: any) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              const target: any = e.target;
              previewList.value.push(target.result);
            };
            imageList.value.push(new File([resized], fileName));
            reader.readAsDataURL(resized);
          });
          index++;
        }
      }
    }
    function removePhoto(index: number, previewList: any, imageList: any) {
      previewList.splice(index, 1);
      imageList.splice(index, 1);
    }
    function setImageFromUrls(images: any) {
      console.log(images);
      let count = images.length;
      let index = 0;
      if (images) {
        while (count--) {
          const name = images[index]['name'];
          const nameSplit = name.split('.');
          const ext = nameSplit[nameSplit.length - 1];
          const blob = images[index]['imageBinary'];
          const file = dataURLtoFile(`data:image/${ext};base64,${blob}`, name);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const target: any = e.target;
            previewList.value.push(target.result);
          };
          imageList.value.push(file);
          reader.readAsDataURL(file);
          index++;
        }
      }
    }

    function resizeImage(settings: any) {
      let file = settings.file;
      let maxSize = settings.maxSize;
      let reader = new FileReader();
      let image: any = new Image();
      let canvas: any = document.createElement('canvas');
      let dataURItoBlob = function (dataURI: any) {
        let bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ? atob(dataURI.split(',')[1]) : unescape(dataURI.split(',')[1]);
        let mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let max = bytes.length;
        let ia = new Uint8Array(max);
        for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
      };
      let resize = function () {
        var width = image.width;
        var height = image.height;
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataURItoBlob(dataUrl);
      };
      return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
          no(new Error('Not an image'));
          return;
        }
        reader.onload = function (readerEvent: any) {
          image.onload = function () {
            return ok(resize());
          };
          image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    return {
      imageList,
      previewList,
      previewMultiImage,
      removePhoto,
      setImageFromUrls,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';

.photo-uploader {
  display: flex;
  .upload-input {
    display: block;
    input[type='file'] {
      display: none;
    }
  }
  .photo-preview {
    margin-left: 20px;
    display: flex;
    gap: 10px;

    @include breakpoint-down-sm {
      margin-left: 12px;
      gap: 12px;
    }
    .item {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 4px 0px 4px 4px;
      overflow: hidden;
      @include breakpoint-down-sm {
        width: 60px;
        height: 60px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    button {
      cursor: pointer;
      position: absolute;
      top: 0px;
      right: 0px;
      background-color: rgba(68, 68, 68, 0.7);
      border: none;
    }
  }

  label {
    cursor: pointer;
    display: block;
    flex-direction: column;
    gap: 10px;
    width: 120px;
    height: 120px;
    border: 1px solid #bababa;
    border-radius: 4px;
    text-align: center;

    @include breakpoint-down-sm {
      width: 60px;
      height: 60px;
    }

    &:hover,
    &:active {
      background-color: var(--background-color-5);
    }
    img {
      width: 24px;
      height: 24px;
      margin-top: 35%;

      @include breakpoint-down-sm {
        margin-top: 20%;
        width: 17px;
        height: 17px;
      }
    }
    .counter {
      display: block;
      font-size: 15px;
      color: var(--text-color-3);
      .active {
        color: var(--secondary-green-color);
      }
      @include breakpoint-down-sm {
        line-height: 15px;
      }
    }
  }
}
</style>
