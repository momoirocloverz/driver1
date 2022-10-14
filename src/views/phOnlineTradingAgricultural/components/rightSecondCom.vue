<template>
  <div class="master">
    <div class="scrollCon">
      <div class="leftCon" key="1" v-show="active == '1'">
        <div ref="source" class="thiChild1ChartEchart"></div>
      </div>
      <div class="rightCon" key="2" v-if="active == '2'">
        <el-row class="scrollHeader">
          <el-col :span="4">排名</el-col>
          <el-col :span="8">主体名称</el-col>
          <el-col :span="8">销售额(元)</el-col>
          <el-col :span="4">平台</el-col>
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
            <el-col :span="4">
              <div class="centerCon">
                <div class="indexBg">{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <!-- <div class="hidden">
                <span class="animateItem">{{ item.supplier_name }}</span>
              </div> -->
              <div class="hidden">
                <span v-if="item.supplier_name.length < 10">{{
                  item.supplier_name
                }}</span>
                <span class="animateItem" v-else>{{ item.supplier_name }}</span>
                <!-- <MarqueeText v-else> {{ item.supplier_name }}</MarqueeText> -->
              </div>
            </el-col>
            <el-col :span="8">
              <span>{{ item.y }}</span>
            </el-col>
            <el-col :span="4">
              <span>{{ item.s }}</span>
            </el-col>
          </el-row>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import * as AGRICULTURALAPIS from '@/service/agriculturalOnline';
import vueSeamlessScroll from 'vue-seamless-scroll';
import MarqueeText from 'vue-marquee-text-component';
import * as APIS from '@/service/dtapi';
export default {
  components: {
    vueSeamlessScroll,
    MarqueeText,
  },
  props: {
    active: {
      type: String,
      default: '1',
    },
  },
  watch: {
    active: function(nval, val) {
      if (nval == '2') {
        this.destoryLeftBottom();
        this.fetchRight();
      } else {
        this.destoryTopRight();
        this.initLeftBottomChart();
      }
    },
  },
  data() {
    return {
      timer6: null,
      globalTopRightChart: null,
      source: null,
      timer3: null,
      trendCompData: [
        // {
        //   title: '金平湖',
        //   price: '7.4元/kg',
        //   last: '7',
        //   compare: '3',
        // },
      ],
      classOption: {
        singleHeight: 42,
        waitTime: 4000,
        // step: 0.2,
        // limitMoveNum: 6,
      },
      classInnerOption: {
        limitMoveNum: 2,
        direction: 2,
        step: 0.2,
      },
    };
  },
  mounted() {
    this.initLeftBottomChart();
  },
  beforeDestroy() {
    this.destoryChart();
  },
  methods: {
    destoryTopRight() {
      //   if (this.globalTopRightChart) {
      //     this.globalTopRightChart.dispose();
      //   }
      //   clearInterval(this.timer6);
    },
    fetchRight() {
      APIS.phZtSalesRank({})
        .then(res => {
          if (res.success) {
            this.trendCompData = res.data;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    destoryLeftBottom() {
      if (this.globalLeftBottomChart) {
        this.globalLeftBottomChart.dispose();
      }
      clearInterval(this.timer3);
    },
    destoryChart() {
      this.destoryLeftBottom();
      this.destoryTopRight();
    },
    initLeftBottomChart() {
      AGRICULTURALAPIS.dispatchTargetProportion({})
        .then(res => {
          if (res.code == 0) {
            //   this.trendCompData = res.data;
            let countFarmSourceData = [];
            let source = res.data;
            // let source = [
            //   {
            //     created: 1636341989000,
            //     id: 1,
            //     sourceCount: 3.033,
            //     sourceType: '大型农贸市场',
            //     year: 2021,
            //   },
            // ];
            countFarmSourceData = source.map(ele => {
              return {
                value: ele.num,
                name: ele.city,
              };
            });
            let chart = echarts.init(this.$refs.source);
            this.globalLeftBottomChart = chart;
            let option = {
              color: ['#71D964', '#ED9D1A', '#17C4EB', '#DED92D', '#ED9D1A'],
              // tooltip: {
              //   trigger: 'item',
              // },
              legend: {
                //   top: '5%',
                //   left: 'center',
                selectedMode: false,
                orient: 'vertical',
                top: 'center',
                right: 0,
                type: 'plain',
                icon: 'rect',
                itemHeight: 8,
                itemWidth: 8,
                textStyle: {
                  color: '#ffffff',
                  fontSize: 14,
                  fontFamily: 'Source Han Sans SC',
                  fontWeight: 400,
                },
                formatter: name => {
                  let percent = '';
                  let total = 0;
                  countFarmSourceData.forEach(v => {
                    total += parseFloat(v.value);
                  });
                  const item = countFarmSourceData.filter(
                    item => item.name === name,
                  )[0];
                  if (!item) return;
                  let filter = countFarmSourceData.map(ele => {
                    return ele.value;
                  });
                  const totalCount = filter.reduce((acc, current) => {
                    return acc + current;
                  }, 0);
                  countFarmSourceData.forEach(v => {
                    if (v.name == name) {
                      //   if (data.all_reserve == 0) {
                      //     percent = 0;
                      //   } else {
                      percent = ((v.value / totalCount) * 100).toFixed(2);
                      //   }
                    }
                  });
                  return `${name} ${percent}%`;
                },
              },
              series: [
                {
                  name: '区域分布Top5',
                  type: 'pie',
                  radius: ['60%', '80%'],
                  center: ['25%', '45%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center',
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '20',
                      fontWeight: 'bold',
                      formatter: ['{b|{b}}', '{a|{c}件}'].join('\n'),
                      rich: {
                        b: {
                          fontSize: 14,
                          // fontFamily: 'YouSheBiaoTiHei-2',
                          fontWeight: 400,
                          color: '#FFFFFF',
                        },
                        a: {
                          fontSize: 24,
                          fontFamily: 'YouSheBiaoTiHei-2',
                          fontWeight: 400,
                          color: '#26E3FF',
                        },
                      },
                    },
                  },
                  labelLine: {
                    show: true,
                    //   lineStyle: {
                    //     color: '#ffffff',
                    //   },
                  },
                  //   roseType: 'radius',
                  data: countFarmSourceData,
                },
              ],
            };
            this.$nextTick(() => {
              chart.setOption(option);
              chart.resize();
              if (!this.timer3) {
                let len = 0;
                this.timer3 = setInterval(() => {
                  if (len === countFarmSourceData.length) {
                    len = 0;
                  }
                  countFarmSourceData.forEach((item, index) => {
                    if (index !== len) {
                      chart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: index,
                      });
                    }
                  });
                  chart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: len,
                  }); //设置默认选中高亮部分

                  chart.on('mouseover', function(e) {
                    if (e.dataIndex != len) {
                      countFarmSourceData.forEach((item, index) => {
                        chart.dispatchAction({
                          type: 'downplay',
                          seriesIndex: 0,
                          dataIndex: index,
                        });
                      });
                      chart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: e.dataIndex,
                      });
                    }
                  });
                  chart.on('mouseout', function(e) {
                    countFarmSourceData.forEach((item, index) => {
                      chart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: index,
                      });
                    });
                    chart.dispatchAction({
                      type: 'highlight',
                      seriesIndex: 0,
                      dataIndex: len,
                    });
                  });
                  len++;
                }, 3000);
              }
            });
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.hidden {
  height: 42px;
  width: 180px;
  overflow: hidden;
}
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
.opacityHidden {
  opacity: 0;
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
.firChild3ChartEchart {
  width: 470px;
  height: 246px;
}
.thiChild1ChartEchart {
  width: 470px;
  height: 246px;
}
.master {
  width: 100%;
  height: 100%;
}
.scrollCon {
  width: 100%;
  height: 100%;
}
.leftCon {
  width: 100%;
  height: 100%;
}
.rightCon {
  //   width: 100%;
  //   height: 100%;
  color: #fff;
  height: 200px;
}
.scrollHeader {
  text-align: center;
  height: 30px;
  font-size: 16px;
  color: #76b9fc;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.seamless-warp {
  text-align: center;

  &.mainAgriCon {
    height: 210px;
    font-size: 16px;
  }
  &.hrainAgriCon {
    width: 200px;
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
</style>
