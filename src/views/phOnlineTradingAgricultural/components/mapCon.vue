<template>
  <div class="mapConMaster">
    <iframe
      id="gisI2frame"
      src="./mapModule/PHJSC_final.html"
      style="width:100%;height:100%;background-color:transparent;border:rgba(255,255,255,0);"
      key="12"
    ></iframe>
    <el-select
      v-model="value"
      filterable
      clearable
      remote
      class="cusSelect"
      reserve-keyword
      placeholder="请输入商家名称"
      :remote-method="remoteMethod"
      :loading="loading"
      popper-class="phSelectPopperHere"
      @change="optionChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div id="toolbar">
      <div class="">
        <div class="toobarItemCon">
          <img
            src="https://img.hzanchu.com/acimg/a3c3dffd537b5ad05a28c532a0ff6daf.png"
            class="brandLogo"
          />
          <label style="padding-left:0px;"> 本家鲜 </label>
          <input
            class="rawInput"
            type="checkbox"
            value="BJX"
            v-model="rawInpu1"
            @change="rawInpuChange('BJX')"
          />
        </div>
        <div class="toobarItemCon">
          <img
            src="https://img.hzanchu.com/acimg/fc2bbdb0a2c90c9c6635822e5b537d08.png"
            class="brandLogo"
          />
          <label style="padding-left:0px;"> 网上农博 </label>
          <input
            class="rawInput"
            type="checkbox"
            value="WSNB"
            v-model="rawInpu2"
            @change="rawInpuChange('WSNB')"
          />
        </div>
      </div>
    </div>
    <div class="bottomCon" v-show="showBottom">
      <div class="bottomLeft">
        <div class="leftFirTitleCon">
          <div class="leftFirTitleBg">
            <div
              class="leftFirTitleText"
              :title="currentItem.suppliers_name + '商家实时订单'"
            >
              {{ currentItem.suppliers_name }}商家实时订单
            </div>
          </div>
        </div>
        <div class="scrollCon">
          <div v-if="trendCompData && trendCompData.length">
            <el-row class="scrollHeader">
              <el-col :span="3">序号</el-col>
              <el-col :span="4">商品名称</el-col>
              <el-col :span="4">价格(元)</el-col>
              <el-col :span="4">平台</el-col>
              <el-col :span="9">订单时间</el-col>
            </el-row>
            <vue-seamless-scroll
              :data="trendCompData"
              class="mainAgriCon seamless-warp"
              :class-option="classOption"
            >
              <el-row
                v-for="(item, index) in trendCompData"
                :key="index"
                :class="['normalScrollItemHeight']"
              >
                <el-col :span="3">
                  <div class="centerCon">
                    <div class="indexBg">{{ index + 1 }}</div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="hidden">
                    <!-- <MarqueeText> {{ item.goods_name }}</MarqueeText> -->
                    <span class="animateItem">{{ item.goods_name }}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <span>{{ item.amount }}</span>
                </el-col>
                <el-col :span="4">
                  <span>
                    {{
                      currentItem.type == 'BJX' ? '本家鲜' : '网上农博'
                    }}</span
                  >
                </el-col>
                <el-col :span="9">
                  <span>
                    <span> {{ item.created_at }}</span>
                  </span>
                </el-col>
              </el-row>
            </vue-seamless-scroll>
          </div>
          <div class="nothingAlert" v-else>
            <div class="describe">商家近期暂无交易数据</div>
          </div>
        </div>
      </div>
      <div class="bottomRight">
        <div class="leftFirTitleCon">
          <div class="leftFirTitleBg">
            <div
              class="leftFirTitleText"
              :title="currentItem.suppliers_name + '商家近七日销售额'"
            >
              {{ currentItem.suppliers_name }}商家近七日销售额
            </div>
          </div>
          <div class="opeartionArea">
            <img
              class="fullIcon"
              @click="fullScreenTrigger"
              src="https://img.hzanchu.com/acimg/adc2c83f4c228d0e429c6269519bfa4f.png"
            />
            <div @click="fullScreenTrigger">全屏</div>
            <i class="el-icon-close shutIcon" @click="shutBottom"></i>
          </div>
        </div>
        <div class="chartCon">
          <div v-show="rightISOK">
            <div ref="rightTopChart" class="firChild3ChartEchart"></div>
          </div>
          <div class="nothingAlert" v-show="!rightISOK">
            <div class="describe">商家近期暂无交易数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
import * as echarts from 'echarts';
import * as AGRICULTURALAPIS from '@/service/agriculturalOnline';
import MarqueeText from 'vue-marquee-text-component';
import dayjs from 'dayjs';
export default {
  components: {
    vueSeamlessScroll,
    MarqueeText,
  },
  props: {
    pointsObj: {},
    title: {
      type: String,
      default: '',
    },
    customStyle: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    }, // 当前配置可跳转url
    router: {
      type: String,
      default: '',
    }, // 当前配置可跳转Router，上下两者按上者为准
  },
  data() {
    return {
      rightISOK: false,
      rawInpu1: true,
      rawInpu2: true,
      showIframe: false,
      time: 0, // 当前滚动到的
      timer: null, // 当前定时器
      BJXDATA: [],
      WSNBDATA: [],
      showBottom: false,
      trendCompData: [],
      currentItem: {},
      chartData: [],
      classOption: {
        singleHeight: 42,
        waitTime: 4000,
        // step: 0.2,
        // limitMoveNum: 5,
      },
      classInnerOption: {
        limitMoveNum: 1,
        direction: 2,
        step: 0.2,
      },
      value: '',
      loading: false,
      options: [],
      list: [],
    };
  },
  mounted() {
    this.showIframe = true;
    this.fetchData();
    let hi = this.pointsObj.BJX.concat(this.pointsObj.WSNB);
    hi.forEach(ele => {
      ele.value = ele.from + '-' + ele.store_id;
      ele.label = ele.suppliers_name;
    });
    this.list = hi;
  },
  beforeDestroy() {
    this.showIframe = false;
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    optionChange() {
      let track = this.list.find(ele => {
        return ele.value == this.value;
      });
      if (track) {
        //捕捉到
        let message = {
          key: 'searchFeature',
          value: { pointObj: track },
        };
        this.sendMessage('gisLayerMessage', message);
      } else {
        //清空
        this.options = [];
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    rawInpuChange(val) {
      this.list = [];
      let array = [];
      let temp = [];
      if (this.rawInpu1) {
        array.push('BJX');
        temp.push(...this.pointsObj.BJX);
      }
      if (this.rawInpu2) {
        array.push('WSNB');
        temp.push(...this.pointsObj.WSNB);
      }
      temp.forEach(ele => {
        ele.value = ele.from + '-' + ele.store_id;
        ele.label = ele.suppliers_name;
      });
      this.list = temp;
      this.options = [];
      this.changeLayerByType(array);
    },
    changeLayerByType(type) {
      let message = { key: 'changeLayerByType', value: { type: type } };
      this.sendMessage('gisLayerMessage', message);
    },
    initRightTopChart() {
      let source = this.chartData;
      let year = [];
      let historyData = [];
      let predictData = [];
      let actualOutput = [];
      let estimateOutput = [];
      source &&
        source.length &&
        source.forEach((item, index) => {
          historyData.push({
            name: item.date,
            value: item.amount,
          });
          predictData.push({
            name: item.date,
            // value: item.predictOutput,
          });
          year.push(item.date);
          actualOutput.push(item.actualOutput);
          estimateOutput.push(item.estimateOutput);
        });
      let ok = historyData.filter(ele => {
        return ele.value > 0;
      });
      if (ok.length) {
        this.rightISOK = true;
        let myChart = echarts.init(this.$refs.rightTopChart);
        this.globalTopRightChart = myChart;
        let data1 = historyData.map(item => {
          return [item.name, item.value];
        });
        const option = {
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(3,3,3,0)',
            borderWidth: 0,
            textStyle: {
              color: '#ffffff',
              fontSize: '14',
            },
            axisPointer: {
              type: 'shadow',
            },
            formatter: value => {
              let str = '';
              value.forEach(item => {
                if (item.data) {
                  str += `<li style="position: relative;display:flex;height:20px;line-height:20px;">
                  <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${
                    item.seriesName === '日销售额' ? '#0E9CFF' : '#35FDDC'
                  };"></div>
                  <div style="margin-left:15px;">${item.seriesName}：${
                    item.seriesName === '日销售额' ? item.data[1] : item.data
                  } ${item.seriesName === '日销售额' ? '元' : '吨'}</div></li>`;
                }
              });
              let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                          <span>${value[0].name}</span>
                          <ul style="margin-top:10px;">
                          ${str}
                          <ul>
                      </div>`;
              return res;
            },
          },
          grid: {
            right: '2%',
            bottom: '0',
            left: '2%',
            top: '48px',
            containLabel: true,
          },
          legend: {
            align: 'left',
            right: '7%',
            top: '2%',
            type: 'plain',
            data: [{ name: '日销售额', textStyle: { color: '#FFFFFF' } }],
            icon:
              'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
            itemWidth: 12,
            itemHeight: 2,
            itemStyle: {
              borderColor: '#0E9BFE',
            },
          },
          xAxis: {
            type: 'category',
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, .5)',
              rotate: 20,
              interval: 0,
              // interval: (index, value) => {
              // //   return index % 8 == 0;
              //   return index % 1 == 0;
              // },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, .5)',
              },
            },
            data: year,
          },
          yAxis: [
            {
              type: 'value',
              name: '元',
              position: 'left',
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                color: 'rgba(255, 255, 255, .5)',
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: 'rgba(255, 255, 255, .5)',
                },
              },
            },
          ],
          //   dataZoom: {
          //     type: 'inside',
          //     minValueSpan:6,
          //     maxValueSpan: 6,
          //     //   zoomLock: true,
          //     //   type: 'slider',
          //     //   start: 0,
          //     //   bottom: 0,
          //     //   height: 5,
          //     //   end: 10,
          //     //   // zoomLock: true,
          //     //   // width: 10,
          //     //   // height: '80%',
          //     //   handleSize: 0,
          //     //   showDetail: false,
          //     //   handleStyle: {
          //     //     color: '#345',
          //     //   },
          //   },

          series: [
            {
              name: '日销售额',
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 6,
              data: data1,
              yAxisIndex: 0,
              itemStyle: {
                normal: {
                  color: '#0E9CFF',
                  lineStyle: {
                    shadowColor: '#000',
                    shadowBlur: 5,
                    shadowOffsetY: 2,
                  },
                  borderColor: '#fff',
                  // borderColor:'#0E9CFF',
                  borderWidth: 1,
                  shadowColor: 'rgba(0, 0, 0, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 2,
                  shadowOffsetX: 2,
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#fff',
                  fontFamily: 'PangMenZhengDao',
                },
                formatter: val => {
                  // if (val.dataIndex % 7 == 0) {
                  return val.value[1] + '元';
                  // } else {
                  //   return '';
                  // }
                },
              },
              lineStyle: {
                shadowColor: '#000',
                shadowBlur: 5,
                shadowOffsetY: 2,
              },
              areaStyle: {
                normal: {
                  color: 'rgba(14,156,255,0.3)',
                },
              },
            },
          ],
        };
        myChart.setOption(option);
        myChart.resize();
        let len = 0;
        // clearInterval(this.timer6);
        // this.timer6 = setInterval(() => {
        //   if (len === year.length) {
        //     len = 0;
        //   }
        //   myChart.dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: len,
        //   });
        //   len++;
        // }, 3000);
      } else {
        this.rightISOK = false;
      }
    },
    shutBottom() {
      this.showBottom = false;
      this.closePopup();
    },
    fullScreenTrigger() {
      this.$emit('showScreen', this.currentItem);
    },
    fetchData() {
      this.mapInit();
    },
    mapInit() {
      if (window.addEventListener) {
        window.addEventListener('message', this.receiveMsg, false);
      } else {
        window.attachEvent('message', this.receiveMsg);
      }
    },
    closePopup() {
      // 后续实现
      let message = { key: 'popupDisplay', value: { popupDisplay: false } };
      this.sendMessage('gisLayerMessage', message);
    },
    sendMessage(type, data) {
      // 向子页面传递消息
      let iframe = document.getElementById('gisI2frame');
      iframe.contentWindow.postMessage({ type: type, data: data }, '*');
    },
    receiveMsg(e) {
      let obj = e.data;
      // 地图交互消息监听
      if (obj.type == 'gisMapMessage') {
        if (obj.data.key == 'initInfo' && obj.data.value) {
          // initType为true时，map初始化成功
          console.log('initInfo交互---地图加载完成', obj.data.value.initType);
          // 此监听内执行地图打点交互，只执行一次
          let pointsObj = this.pointsObj;
          let message = {
            key: 'clusterLayerByInit',
            value: { pointsObj: pointsObj },
          };
          this.sendMessage('gisLayerMessage', message);
        }
      }
      // 要素消息交互
      if (obj.type == 'gisFeatureMessage') {
        if (obj.data.key == 'featureInfo' && obj.data.value) {
          console.log(
            'featureInfo交互---要素消息交互',
            obj.data.value.featureInfo,
          );
          if (obj.data.value.featureInfo) {
            let shorter = obj.data.value.featureInfo;
            this.showBottom = true;
            this.currentItem = shorter;
            this.trendCompData = [];
            AGRICULTURALAPIS.orderList({
              store_id: shorter.store_id,
              from: shorter.from,
            })
              .then(res => {
                if (res.code == 0) {
                  this.$forceUpdate();
                  this.trendCompData = res.data.data;
                  //   this.showBottom = true;
                }
              })
              .catch(err => {
                console.log('err', err);
              });
            let start = Date.now();
            let startFormat = dayjs(start).format('YYYY-MM-DD');
            let end = start - 3600 * 1000 * 24 * 6;
            let endFormat = dayjs(end).format('YYYY-MM-DD');
            AGRICULTURALAPIS.dateAmountList({
              store_id: shorter.store_id,
              from: shorter.from,
              start_date: endFormat,
              end_date: startFormat,
            })
              .then(res => {
                console.log('res', res);
                if (res.code == 0) {
                  this.chartData = res.data;
                  //   this.showBottom = true;
                  setTimeout(() => {
                    this.initRightTopChart();
                  }, 100);
                }
              })
              .catch(err => {
                console.log('err', err);
              });
          }
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.nothingAlert {
  box-sizing: border-box;
  font-size: 16px;
  padding-top: 160px;
  text-align: center;
  width: 190px;
  height: 200px;
  margin: 0 auto;
  margin-top: 10px;
  background-image: url(https://img.hzanchu.com/acimg/ab22c36ffb394acc13280737238e498b.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  .describe {
    color: #bbd7fa;
  }
}
.cusSelect {
  position: absolute;
  top: 30px;
  right: 35px;
  width: 230px;
  height: 44px;
  //   line-height: 32px;
  background-image: url(https://img.hzanchu.com/acimg/bec3f22df2f711d4651865e0c3768e2a.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  ::v-deep .el-input__inner {
    background-color: transparent !important;
    border: none !important;
    color: #fff !important;
  }
  ::v-deep .el-select__input {
    color: #fff !important;
  }
}
#toolbar {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 164px;
  height: 95px;
  text-align: center;
  z-index: 100;
  color: #fff;
  border-radius: 4px;
  background-image: url(https://img.hzanchu.com/acimg/41499eb8908fd19fb4e7b8ca53eaa0ba.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 21px 16px;
  box-sizing: border-box;
  font-size: 16px;
}
.toobarItemCon {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  &:nth-child(1) {
    margin-bottom: 14px;
  }
  label {
    font-size: 16px;
    color: #cceaff;
  }
}
.brandLogo {
  width: 16px;
  height: 16px;
}
.rawInput {
  width: 16px;
  height: 16px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -moz-appearance: none;
  background: url(https://img.hzanchu.com/acimg/729d6813193a373394dcd63da884978f.png)
    no-repeat center;
  background-size: 100% 100%;
  outline: none; //取消外边框
  border: none;

  &:checked {
    background: url(https://img.hzanchu.com/acimg/ecc1c3e36482393d1c968f2fb1c22a9e.png)
      no-repeat center;
    background-size: 100% 100%;
    outline: none; //取消外边框
    border: none;
  }
}
.noWrap {
  white-space: nowrap;
}
// .hidden {
//   width: 65px;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   -o-text-overflow: ellipsis;
// }
@keyframes roll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
.animateItem {
  display: inline-block;
  white-space: nowrap;
  animation: 10s roll linear infinite normal;
}
.hidden {
  width: 65px;
  height: 42px;
  overflow: hidden;
}
.chartCon {
  padding-left: 10px;
  box-sizing: border-box;
}
.firChild3ChartEchart {
  width: 380px;
  height: 210px;
}
.centerCon {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-top: 10px;
  box-sizing: border-box;
}
.indexBg {
  width: 22px;
  height: 22px;
  line-height: 22px;
  background-image: url(https://img.hzanchu.com/acimg/ff2b4229a7b4c30a9712f6b72cb9ffe3.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.scrollCon {
  width: 100%;
  color: #fff;
  height: 180px;
}
.scrollHeader {
  text-align: center;
  height: 24px;
  font-size: 16px;
  color: #76b9fc;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.seamless-warp {
  text-align: center;
  &.mainAgriCon {
    height: 170px;
    font-size: 16px;
  }
  &.hrainAgriCon {
    width: 100px;
    height: 42px;
  }
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
}
.normalScrollItemHeight {
  height: 42px;
  line-height: 42px;
  &:nth-child(odd) {
    background-color: rgba(25, 152, 248, 0.1);
  }
}
.mapConMaster {
  position: relative;
  width: 100%;
  height: 100%;
}
.bottomCon {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 101;
  height: 299px;
  border: 2px solid #243c84;
  box-sizing: border-box;
  background-color: rgba(12, 37, 73, 0.9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.bottomLeft {
  width: 406px;
  height: 100%;
}
.bottomRight {
  width: 406px;
  height: 100%;
}
.leftFirTitleCon {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  position: relative;
}
.fullIcon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin-right: 5px;
}
.opeartionArea {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  height: 40px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  right: 10px;
  top: 0;
  div {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #fff;
    width: 33px;
    cursor: pointer;
  }
}
.shutIcon {
  font-size: 16px;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
}
.leftFirTitleBg {
  width: 364px;
  height: 60px;
  background-image: url(https://img.hzanchu.com/acimg/1e6de8a6afcfde0110b750db30a0bb61.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.leftFirTitleText {
  font-size: 20px;
  box-sizing: border-box;
  padding-left: 30px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 9px;
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>

<style lang="scss">
.phSelectPopperHere {
  width: 230px;
  background: linear-gradient(
    rgba(46, 130, 226, 0.1),
    rgba(46, 130, 226, 0.8)
  ) !important;
  border: none !important;
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: transparent !important;
  }
  .el-select-dropdown__item {
    color: aliceblue !important;
    &.selected {
      color: #fff !important;
    }
  }
  .popper__arrow {
    display: none !important;
  }
  .el-scrollbar__wrap {
    height: 230px !important;
  }
  .el-select-dropdown__empty {
    color: #fff;
  }
}
</style>
