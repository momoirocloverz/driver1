<template>
  <div class="page">
    <div class="header">
<!--      <a href="http://zrzy.phxmgl.cn/pinghu-web/index.html" class="header-link&#45;&#45;left">地域信息一张图</a>-->
      <span class="header-text">浙农补</span>
<!--      <a href="http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjI5Nn0=" class="header-link&#45;&#45;right">数据资产</a>-->
    </div>
    <div class="left-section">
      <pane title="保供能力预警">
        <alert-section />
      </pane>
      <pane title="规模生产">
        <production-section />
      </pane>
      <pane title="补贴情况">
        <subsidy-section />
      </pane>
    </div>
    <div class="mid-section">
      <top-section />
      <iframe frameborder="none" src="https://m.wsnf.cn/iframe?version=2.0.0" class="map" />
      <div class="map-legend">
        <div class="legend"><span class="color-block" :style="{backgroundColor: 'red' }" />已申报</div>
        <div class="legend"><span class="color-block" :style="{backgroundColor: '#ff8400' }" />公示中</div>
        <div class="legend"><span class="color-block" :style="{backgroundColor: '#ffe400' }" />待公示</div>
        <div class="legend"><span class="color-block" :style="{backgroundColor: '#00d417' }" />未申报</div>
      </div>
    </div>
    <div class="right-section">
      <pane title="政策支持">
        <policy-section />
      </pane>
      <pane title="粮食生产基础">
        <industrial-base-section />
      </pane>
      <pane title="稳产能力">
        <production-capacity-section />
      </pane>
      <pane title="近五年粮食生产面积">
        <acreage-section />
      </pane>
    </div>
  </div>
</template>

<script>
import Pane from '@/components/Subsidies/Pane'
import AlertSection from '@/components/Subsidies/alert-section'
import ProductionCapacitySection from '@/components/Subsidies/production-capacity-section'
import IndustrialBaseSection from '@/components/Subsidies/industrial-base-section'
import SubsidySection from '@/components/Subsidies/subsidy-section'
import AcreageSection from '@/components/Subsidies/acreage-section'
import TopSection from '@/components/Subsidies/top-section'
import ProductionSection from '@/components/Subsidies/production-section'
import PolicySection from '@/components/Subsidies/policy-section'
export default {
  name: 'Subsidies',
  components: {
    PolicySection,
    ProductionSection,
    TopSection,
    AcreageSection, SubsidySection, IndustrialBaseSection, ProductionCapacitySection, AlertSection, Pane }
}
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;
  display: grid;
  background: url("../../assets/subsidies/bg.webp") no-repeat;
  background-size: 100% 100%;
  padding: 2vh 2vw;
  overflow: hidden;
  grid-template:  "header header header" 6vh
                  "left   mid    right"  90vh/ 25vw 46vw 25vw;
  .header {
    background: url('../../assets/subsidies/header-bg.webp') no-repeat;
    background-size: 100% 100%;
    background-position-x: center;
    height: 100%;
    display: flex;
    align-items: center;
    grid-area: header;
    font-family: "HuXiaoBo-NanShenTi2.0";
    .header-text {
      flex: 1;
      text-align: center;
      color: white;
      background: linear-gradient(0deg,#b5f5ff 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 3.6vh;
      line-height: 6vh;
      text-align: center;
      font-weight: 700;
      letter-spacing: 3px;
    }
    .header-link--left {
      width: 28vw;
      color: white;
      font-size: 2vh;
      text-align: right;
      letter-spacing: 0.25em;
      padding-bottom: 0.75vh;
    }
    .header-link--right {
      width: 28vw;
      color: white;
      font-size: 2vh;
      letter-spacing: 0.25em;
      padding-bottom: 0.75vh;
    }
  }
  .left-section {
    grid-area: left;
    display: grid;
    grid-template-rows: 33vh 23vh 30vh;
    padding: 0.5vh 0.5vw;
    box-sizing: border-box;
    border-image: url("~@/assets/subsidies/border-left.webp") 30;
    border-width: 1vh 0.5vw;
    border-style: solid;
  }
  .mid-section {
    grid-area: mid;
    display: grid;
    height: calc(100% - 4.26vh);
    grid-template-rows: 20vh 68vh;
    padding: 2vh 1vw;
    position: relative;
    .map {
      width: 100%;
      height: calc(68vh - 4.25vh - 2vh);
    }
    .map-legend {
      position: absolute;
      bottom: 4vh;
      right: 2vw;
      display: flex;
      flex-flow: column;
      padding: 1vh 1vw;
      border-radius: 10%;
      background-color: #fffd;
      row-gap: 0.5vh;
      .legend {
        display: flex;
        font-size: 1.6vh;
        .color-block {
          width: 1.2vw;
          margin-right: 1vh;
        }
      }
    }
  }
  .right-section {
    grid-area: right;
    display: grid;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5vh 0.5vw;
    grid-template-rows: 21vh 14vh 19vh 32vh;
    border-image: url("~@/assets/subsidies/border-right.webp") 30;
    border-width: 1vh 0.5vw;
    border-style: solid;
  }
}
</style>
