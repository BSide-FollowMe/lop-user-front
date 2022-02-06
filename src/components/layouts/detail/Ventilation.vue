<template>
  <div class="inner-container">
    <div class="title">이런 부분은 더 신경 써주세요</div>
    <div class="main">
      <div class="card">
        <div class="card-main">
          <div class="icon">
            <img :src="VentilationIcon" />
          </div>
          <div class="text">
            <div class="card-title">통풍</div>
            <div class="card-content">{{ ventilation }}</div>
          </div>
        </div>
        
        <div class="guide-box">통풍이 왜 중요한가요? <div class="arrow-icon" ></div></div>
      </div>
      <div class="card">
        <div class="card-main">
          <div class="icon">
            <img :src="ToxicityIcon" />
          </div>
          <div class="text">
            <div class="card-title">독성</div>
            <div class="card-content">{{ toxicity }}</div>
          </div>
        </div>
        
      </div>
      <div class="card">
        <div class="card-main">
          <div class="icon">
            <img :src="VentilationIcon" />
          </div>
          <div class="text">
            <div class="card-title">유의할 병충해</div>
            <div class="card-content">{{ blights.join(', ') }}</div>
          </div>
        </div>
        
        <div class="guide-box">병충해는 어떻게 관리하나요? <div class="arrow-icon" ></div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VentilationIcon from '@/assets/icon/통풍.svg';
import ToxicityIcon from '@/assets/icon/독성.svg';
import BlightIcon from '@/assets/icon/병충해.svg';

export default defineComponent({
  props: {
    ventilation: {
      type: String,
      default: '통풍이 잘되는 환경이 중요해요',
    },
    toxicity: {
      type: String,
      default: '독성이 있으니 어린아이나 반려동물이 있다면 섭취하지 않도록 조심해주세요',
    },
    blights: {
      type: Array as PropType<string[]>,
      default: () => ['깍지벌레', '응애'],
    },
  },
  setup() {
    return {
      VentilationIcon,
      ToxicityIcon,
      BlightIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.inner-container {
  > * {
    min-width: 960px;
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

.main {
  display: flex;
  flex-wrap:wrap;
  .card{
    &:first-child{
      margin:0 20px 20px 0;
    }
    width: 470px;
    height: 176px;
    background: #F8F8F8;
    border-radius: 4px 4px 0px 0px;
    display:inline-flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    

    .card-main{
      display:flex;
      align-items: center;
      justify-content: stretch;
      padding: 0 40px;
      min-height:120px;
      .icon{
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
        margin-left:30px;
        width:280px;
        .card-title{
          font-family: Pretendard;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 26px;
          /* identical to box height, or 144% */

          letter-spacing: -0.01em;

          /* text/1 */

          color: #444444;
          margin-bottom:4px;
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
    .guide-box{
      width:100%;
      background: #F3F3F3;
      border-radius: 0px 0px 4px 4px;
      height:56px;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      /* identical to box height, or 144% */

      letter-spacing: -0.01em;

      /* text/3 */

      color: #969696;
      display:flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px 0 22.5px;
      .arrow-icon{
        display:inline-block;
        float:right;
        -webkit-mask-image: url("@/assets/icon/simple-arrow-right.svg");
        mask-image: url("@/assets/icon/simple-arrow-right.svg");
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center center;
        mask-position:center center;
        width: 20px;
        height: 18.35px;
        background-color: #365650;
      }
      &:hover{
        color: #C9704C;
        .arrow-icon{
          background-color: #C9704C;
        }
      }
    }
  }
}
</style>
