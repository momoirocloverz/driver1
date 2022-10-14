<template>
  <div class="master">
    <div class="scrollCon">
      <div class="leftCon" key="1" v-show="active == '1'">
        <div ref="rightTopChart" class="firChild3ChartEchart"></div>
      </div>
      <div class="rightCon" key="2" v-show="active == '2'">
        <div ref="source" class="thiChild1ChartEchart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as APIS from '@/service/dtapi';
import * as echarts from 'echarts';
export default {
  components: {},
  props: {
    active: {
      type: String,
      default: '1',
    },
  },
  watch: {
    active: function(nval, val) {
      if (nval == '1') {
        this.destoryLeftBottom();
        this.initRightTopChart();
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
      leftSource: [],
      rightSource: [],
    };
  },
  mounted() {
    this.initRightTopChart();
  },
  beforeDestroy() {
    this.destoryChart();
  },
  methods: {
    destoryTopRight() {
      if (this.globalTopRightChart) {
        this.globalTopRightChart.dispose();
      }
      clearInterval(this.timer6);
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
      let countFarmSourceData = [];
      APIS.phAppSaleroom({})
        .then(res => {
          if (res.success) {
            this.rightSource = res.data;
            let source = res.data;
            //   let source = [
            //     {
            //       created: 1636341989000,
            //       id: 1,
            //       sourceCount: 3.033,
            //       sourceType: '大型农贸市场',
            //       year: 2021,
            //     },
            //     {
            //       created: 1636341991000,
            //       id: 2,
            //       sourceCount: 4.261,
            //       sourceType: '中型农贸市场',
            //       year: 2021,
            //     },
            //     {
            //       created: 1636341993000,
            //       id: 3,
            //       sourceCount: 2.706,
            //       sourceType: '小型农贸市场',
            //       year: 2021,
            //     },
            //   ];
            countFarmSourceData = source.map(ele => {
              return {
                value: ele.y,
                name: ele.s,
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
                  let value = '';
                  let total = 0;
                  countFarmSourceData.forEach(v => {
                    total += parseFloat(v.value);
                  });
                  const item = countFarmSourceData.filter(
                    item => item.name === name,
                  )[0];
                  if (!item) return;
                  countFarmSourceData.forEach(v => {
                    console.log(v);
                    if (v.name == name) {
                      //   if (data.all_reserve == 0) {
                      //     percent = 0;
                      //   } else {
                      //   percent = ((v.value / 10) * 100).toFixed(2);
                      //   }
                      value = v.value.toFixed(2);
                    }
                  });
                  return `${name} ${value}万元`;
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
                      formatter: ['{b|{b}}', '{a|{d}%}'].join('\n'),
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
                  roseType: 'radius',
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
    initRightTopChart() {
      APIS.phphOnlineDealUnion({})
        .then(res => {
          if (res.success) {
            this.leftSource = res.data;
            let source = this.leftSource.map(ele => {
              return {
                year: ele.x,
                actualOutput: ele.y,
                reduceProduction: ((ele.n * 10) / 100000).toFixed(2),
              };
            });
            //   let source = [
            //     {
            //       actualOutput: '3012',
            //       created: 1636529160000,
            //       estimateOutput: '140385',
            //       id: 1,
            //       predictOutput: '',
            //       reduceProduction: '1265.0',
            //       year: '10-1',
            //     },
            //     {
            //       actualOutput: '3148',
            //       created: 1636529160000,
            //       estimateOutput: '113576',
            //       id: 2,
            //       predictOutput: '',
            //       reduceProduction: '1322.2',
            //       year: '10-2',
            //     },
            //   ];
            let year = [];
            let historyData = [];
            let predictData = [];
            let actualOutput = [];
            let estimateOutput = [];
            source.forEach((item, index) => {
              if (item.reduceProduction && index !== 6) {
                historyData.push({
                  name: item.year,
                  value: item.reduceProduction,
                });
              }
              if (item.predictOutput) {
                predictData.push({
                  name: item.year,
                  value: item.predictOutput,
                });
              }
              year.push(item.year);
              actualOutput.push(item.actualOutput);
              estimateOutput.push(item.estimateOutput);
            });
            let myChart = echarts.init(this.$refs.rightTopChart);
            this.globalTopRightChart = myChart;
            let data1 = historyData.map(item => {
              return [item.name, item.value];
            });
            let data2 = predictData.map(item => {
              return [item.name, item.value];
            });
            data2.unshift([data1[data1.length - 1][0], 0]);
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
                  item.seriesName === '销售额(万元)' ? '#FCB749' : '#35FDDC'
                };"></div>
                <div style="margin-left:15px;">${item.seriesName}：${
                        item.seriesName === '销售额(万元)'
                          ? item.data[1]
                          : item.data
                      } ${
                        item.seriesName === '销售额(万元)' ? '万元' : '件'
                      }</div></li>`;
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
                data: ['销售额(万元)', '销售量(件)'],
                type: 'plain',
                icon: 'rect',
                itemHeight: 8,
                itemWidth: 8,
                textStyle: {
                  color: '#ffffff',
                  fontSize: 12,
                  fontFamily: 'Source Han Sans SC',
                  fontWeight: 400,
                },
              },
              xAxis: {
                type: 'category',
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  color: 'rgba(255, 255, 255, .5)',
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
                  name: '件',
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
                {
                  type: 'value',
                  name: '万元',
                  position: 'right',
                  axisTick: {
                    show: false,
                  },
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: 'rgba(255, 255, 255, .5)',
                    },
                  },
                  axisLabel: {
                    color: 'rgba(255, 255, 255, .5)',
                  },
                  splitLine: {
                    show: false,
                    lineStyle: {
                      type: 'dashed',
                      color: 'rgba(255, 255, 255, .5)',
                    },
                  },
                },
              ],
              series: [
                {
                  name: '销售额(万元)',
                  type: 'line',
                  data: data1,
                  yAxisIndex: 1,
                  itemStyle: {
                    normal: {
                      // color: '#DF6FF4',
                      color: '#FCB749',
                      lineStyle: {
                        shadowColor: '#000',
                        shadowBlur: 5,
                        shadowOffsetY: 2,
                      },
                    },
                  },
                  lineStyle: {
                    shadowColor: '#000',
                    shadowBlur: 5,
                    shadowOffsetY: 2,
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: '#FCB749',
                          },
                          {
                            offset: 0.8,
                            color: 'rgba(252,183,73,0)',
                          },
                        ],
                        false,
                      ),
                    },
                  },
                },
                {
                  name: '销售量(件)',
                  type: 'bar',
                  barWidth: 16,
                  data: actualOutput,
                  itemStyle: {
                    normal: {
                      barBorderRadius: [8, 8, 0, 0],
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: '#35FDDC',
                          },
                          {
                            offset: 0.8,
                            color: 'rgba(53, 253, 220, 0.3)',
                          },
                        ],
                        false,
                      ),
                    },
                  },
                },
              ],
            };
            myChart.setOption(option);
            myChart.resize();
            let len = 0;
            let timer = null;
            function timerAction() {
              if (len === year.length) {
                len = 0;
              }
              myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
              });
              len++;
            }
            function destoryTimer() {
              clearInterval(timer);
            }
            setTimeout(() => {
              destoryTimer();
              timer = setInterval(() => {
                timerAction();
              }, 3000);
            }, 100);
            myChart.on('mouseover', function(e) {
              console.log('mouseover', e);
              destoryTimer();
            });
            // myChart.on('highlight', function(e) {
            //   console.log('highlight', e);
            //   //   destoryTimer();
            // });
            myChart.on('globalout', function(e) {
              console.log('globalout', e);
              destoryTimer();
              timer = setInterval(() => {
                timerAction();
              }, 3000);
            });
            // myChart.getZr().on('click', function(e) {
            //   console.log('抓到了吗 ', e);
            // });
            // myChart.on('mouseover', function(e) {
            //   console.log('over', e);
            //   clearInterval(this.timer6);
            //   //   if (e.dataIndex != len) {
            //   //     year.forEach((item, index) => {
            //   //       myChart.dispatchAction({
            //   //         type: 'showTip',
            //   //         seriesIndex: 0,
            //   //         dataIndex: index,
            //   //       });
            //   //     });
            //   //     // myChart.dispatchAction({
            //   //     //   type: 'highlight',
            //   //     //   seriesIndex: 0,
            //   //     //   dataIndex: e.dataIndex,
            //   //     // });
            //   //   }
            // });
            // myChart.on('mouseout', function(e) {
            //   console.log('mouseout', e);
            //   //   year.forEach((item, index) => {
            //   //     myChart.dispatchAction({
            //   //       type: 'showTip',
            //   //       seriesIndex: 0,
            //   //       dataIndex: index,
            //   //     });
            //   //   });
            //   //   myChart.dispatchAction({
            //   //     type: 'highlight',
            //   //     seriesIndex: 0,
            //   //     dataIndex: len,
            //   //   });
            // });
            // }
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
  width: 100%;
  height: 100%;
}
</style>
