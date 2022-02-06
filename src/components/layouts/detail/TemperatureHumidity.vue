<template>
  <div class="inner-container">
    <div class="title">온도와 습도는 이렇게 맞추세요</div>
    <div class="temperature-humidity">
      <div class="card">
        <div class="icon">
          <img :src="Temperature"/>
        </div>
        <div class="text">
          <div class="card-title">적정온도</div>
          <div class="card-content">{{ temperature.split(',')[0] }}℃ ~ {{ temperature.split(',')[1] }}℃</div>
        </div>
      </div>
      <div class="card">
        <div class="icon">
          <img :src="WinterTemperature"/>
        </div>
        <div class="text">
          <div class="card-title">겨울철 온도</div>
          <div class="card-content">{{ winterTemperature }}℃</div>
        </div>
      </div>
      <div class="card">
        <div class="icon">
          <img :src="Humidity"/>
        </div>
        <div class="text">
          <div class="card-title">습도</div>
          <div class="card-content">{{ humidity.split(',')[0] }}℃ ~ {{ humidity.split(',')[1] }}℃</div>
        </div>
      </div>
    </div>
    <p class="content" v-html="content" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Temperature from '@/assets/icon/적정온도.svg';
import WinterTemperature from '@/assets/icon/겨울철온도.svg';
import Humidity from '@/assets/icon/습도.svg';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '온도 변화를 잘 견디는 편이에요. 건조한 공기를 더 좋아해요.',
    },
    temperature: {
      type: String,
      default: '15,25',
    },
    winterTemperature: {
      type: String,
      default: '5',
    },
    humidity: {
      type: String,
      default: '40,70',
    },
  },
  setup(){
    return{
      Temperature,
      WinterTemperature,
      Humidity,
    }
  }
});

</script>

<style lang="scss" scoped>
.inner-container{
  >*{
    min-width:960px;
  }
}


.title {
  padding-bottom: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 20px;
  /* identical to box height */

  letter-spacing: -0.01em;

  /* text/1 */

  color: #444444;

  border-bottom: 1px solid #e5e5e5;
}
.temperature-humidity {
  .card{
    padding:25px 40px;
    width: 306px;
    height: 120px;
    background: #F8F8F8;
    border-radius: 4px;
    display:inline-flex;
    &:not(:first-child){
      margin-left: 21px;
    }
    .icon{
      display:inline-block;
      img{
        vertical-align: middle;
      }
      text-align: center;
      line-height: 70px;
      width: 70px;
      height: 70px;
      background: white;
      -moz-border-radius: 35px;
      -webkit-border-radius: 35px;
      border-radius: 35px;
    }
    .text{
      padding:9px 0 0 30px;
      // padding-left:30px;
      display:inline-block;
      .card-title{
        font-family: Pretendard;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        /* identical to box height */

        letter-spacing: -0.01em;

        /* text/1 */
        margin-bottom: 8px;
        color: #444444;
      }
      .card-content{
        font-family: Pretendard;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
        /* identical to box height, or 144% */

        letter-spacing: -0.01em;

        /* text/2 */

        color: #666666;
      }
    }
  }
}
.content {
  margin: 20px 0 36px 0;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  letter-spacing: -0.01em;

  /* text/2 */

  color: #666666;
}

.guide {
  min-width: 960px;
  .guide-box {
    cursor: pointer;
    &:first-child {
      margin-right: 20px;
    }
    display: inline-block;
    width: 470px;
    height: 56px;
    background: #f8f8f8;
    border-radius: 4px;
    padding: 15px 24.59px 15px 15px;
    .arrow-icon {
      display: inline-block;
      float: right;
      -webkit-mask-image: url('@/assets/icon/simple-arrow-right.svg');
      mask-image: url('@/assets/icon/simple-arrow-right.svg');
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      mask-position: center center;
      width: 20px;
      height: 18.35px;
      background-color: #365650;
    }
    &:hover {
      color: #c9704c;
      .arrow-icon {
        background-color: #c9704c;
      }
    }
  }
}
</style>
