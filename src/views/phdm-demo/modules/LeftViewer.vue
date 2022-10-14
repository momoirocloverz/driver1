<template>
  <div class="left-viewer">
    <div class="plate1">
      <Title text="平湖水稻种植概况" />
      <div class="content">
        <dv-scroll-board class="dashboard-custom-ev-board--scale" :config="config" @click="e=>this.$emit('click', e)" />
      </div>
    </div>
    <div class="plate2">
      <Title text="近7年平湖水稻种植情况" />
      <div class="content">
        <div ref="left1Chart" class="left-1-chart"></div>
      </div>
      
    </div>
    <div class="plate3">
      <Title text="近7年长势监测分析" />
      <div class="content">
        <div ref="left2Chart" class="left-2-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from './Title.vue'
import * as echarts from 'echarts'
import colors from '../consts'
import { charts } from '@jiaminghi/data-view'
import { YEARS  } from '../consts'
export default {
  components: {
    Title
  },
  data() {
    return {
      config: {},
      left1Chart: null,
      left2Chart: null
    }
  },
  mounted() {
    this.left1ChartInit();
    this.left2ChartInit();
    this.$nextTick(() => {
      this.config = {
        header: ['品种名称', '种植面积', '耕地面积', '日平均日照', '日平均温度', '月降水量'],
        headerBGC: 'transparent',
        oddRowBGC: 'transparent',
        evenRowBGC: 'rgba(1, 52, 70, 0.7)',
        data: [
          ['嘉58', '2.3万亩', '2.3万亩', '5.53h', '20.71℃', '134.4mm'],
          ['嘉禾218', '1.2万亩', '1.2万亩', '5.43h', '21.36℃', '118.6mm'],
          ['嘉67', '1.9万亩', '1.9万亩', '5.69h', '22.43℃', '120.5mm'],
          ['嘉丰优2号', '2.5万亩', '2.5万亩', '5.39h', '19.87℃', '131.5mm'],
          ['甬优1540', '3.2万亩', '3.2万亩', '5.87h', '20.52℃', '159.8mm'],
          ['甬优538', '3.3万亩', '3.3万亩', '5.26h', '22.36℃', '206.2mm'],
          ['软香2号', '0.56万亩', '0.56万亩', '5.13h', '20.35℃', '219.6mm'],
          ['秀水121', '2.2万亩', '2.2万亩', '5.26h', '23.14℃', '169.5mm']
        ],
        rowNum: 5,
        columnWidth: [50],
        align: ['center']
      }
    })
  },
  methods: {
    left1ChartInit() {
      let myChart = echarts.init(this.$refs.left1Chart);
      const config = {
        color: ['#24D8F0', '#EF9E4E'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.3)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
          axisPointer: {
              type: 'shadow'
          },
          
        },
        grid: {
          right: '15%',
          top: '20%',
          left: '12%',
          bottom: '10%'
        },
        legend: {
          data: ['产量', '产值'],
          textStyle: {
            color: '#90B6D2'
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              textStyle: {
                color: '#90B6D2'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#90B6D2'
              }
            },
            // prettier-ignore
            data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(产值.万元)',
            position: 'left',
            alignTicks: true,
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine:{
              show: true,
              lineStyle:{
                type: 'dashed',
                color: '#fff',
                opacity: 0.4
              }
            },
          },
          {
            type: 'value',
            name: '(产量.万吨)',
            position: 'right',
            alignTicks: true,
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine:{
              show:false,
            },
          },
          // 展示面积所需
          // {
          //   type: 'value',
          //   name: 'Precipitation',
          //   position: 'right',
          //   alignTicks: true,
          //   offset: 80,
          //   axisLine: {
          //     show: true,
          //   },
          //   axisLabel: {
          //     formatter: '{value} ml'
          //   }
          // },
          
        ],
        series: [
          {
            name: '产值',
            type: 'line',
            yAxisIndex: 1,
            data: [31136.3, 30050.2, 31721.2, 31122.4, 32222.5, 32807.3, 33275.0],
            lineStyle: {
              shadowColor: '#000',
              shadowBlur: 5,
              shadowOffsetY: 2
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                  offset: 0,
                  color: "#24D8F0"
                },{
                  offset: 0.8,
                  color: "hsla(187, 87%, 54%, .1)"
                }],false)
              }
            },
          },
          {
            name: '产量',
            type: 'line',
            data: [12.45, 12.02, 12.69, 12.45, 12.89, 13.12, 13.31],
            lineStyle: {
              shadowColor: '#000',
              shadowBlur: 5,
              shadowOffsetY: 2
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                  offset: 0,
                  color: "#EF9E4E"
                },{
                  offset: 0.8,
                  color: "rgba(239, 158, 78, .1)"
                }],false)
              }
            },
          },
          // {
          //   name: 'Precipitation',
          //   type: 'bar',
          //   yAxisIndex: 1,
          //   data: [
          //     2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          //   ]
          // },
          
        ]
      }

      myChart.setOption(config);
    },
    left2ChartInit() {
      let myChart = echarts.init(this.$refs.left2Chart);
      myChart.hideLoading();
      let options = {
        color: ['#EF9E4E', '#26B4FC', '#8074FB' ],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (value) => {
                    let str = ''
                    let data = ''
                    value.forEach((item) => {
                        if (item.seriesName==='长势') {
                            if (item.data===1) {
                                data = '低'
                            } else if(item.data===2) {
                                data = '中'
                            } else if(item.data===3) {
                                data = '高'
                            }
                        } else if(item.seriesName==='土壤能力等级') {
                            data = item.data
                        } else if(item.seriesName==='年降水量') {
                            data = -item.data
                        }
                        str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                <div style="margin-left:15px;">${item.seriesName}：${data}</div>
                            </li>`
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .3);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                }
            },
            legend: {
                data: ['长势', '土壤能力等级', '年降水量'],
                textStyle:{
                    color:"#fff"
                }
            },
            grid: {
                right: '5%',
                top: '20%',
                bottom: '10%',
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#90B6D2'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#90B6D2",
                        }
                    },
                    data: YEARS
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    position: 'left',
                    max: (value) => {
                        const { max, min } = value;
                        const absMax = Math.max(Math.abs(max), Math.abs(min));
                        return Math.floor(absMax * 1);
                    },
                    min: (value) => {
                        const { max, min } = value;
                        const absMax = Math.max(Math.abs(max), Math.abs(min));
                        return Math.floor(-absMax * 1);
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            type: 'dashed',
                            color: '#fff',
                            opacity: 0.4
                        }
                    },
                    axisLabel: {
                        formatter: (value) => {
                            if (value===1) {
                                return '低'
                            } else if (value===2) {
                                return '中'
                            } else if (value===3) {
                                return '高'
                            } else {
                                return ''
                            }
                        }
                    }
                },
                
                {
                    type: 'value',
                    position: 'left',
                    max: (value) => {
                        const { max, min } = value;
                        const absMax = Math.max(Math.abs(max), Math.abs(min));
                        return Math.floor(absMax * 1);
                    },
                    min: (value) => {
                        const { max, min } = value;
                        const absMax = Math.max(Math.abs(max), Math.abs(min));
                        return Math.floor(-absMax * 1);
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#90B6D2"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show: false,
                        lineStyle:{
                          type: 'dashed',
                          color: '#fff',
                          opacity: 0.4
                        }
                    },
                    nameTextStyle: {
                        padding: [0,9999,0,0],
                    },
                    axisLabel: {
                        formatter: (value) => {
                            if (value<=0) {
                                return -value
                            } else {
                                return ''
                            }
                        }
                    }
                },
            ],
            series: [
                {
                  name: '长势',
                  type: 'line',
                  data: [3, 3, 1, 2, 2, 1, 1],
                  symbol: "none", // 空心/实心
                  smooth: true,
                  lineStyle: {
                    shadowColor: '#000',
                    shadowBlur: 5,
                    shadowOffsetY: 2
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                        offset: 0,
                        color: "#EF9E4E"
                      },{
                        offset: 0.8,
                        color: "rgba(239, 158, 78, 0.1)"
                      }],false)
                    }
                  },
                },
                {
                    name: '土壤能力等级',
                    type: 'bar',
                    barWidth : 20,
                    stack: 'Total',
                    itemStyle: {
                      normal:{
                        barBorderRadius:[5,5,0,0]
                      }
                    },
                    data: [2, 3, 2, 1, 3, 2, 3]
                },
                {
                    name: '年降水量',
                    type: 'bar',
                    barWidth: 20,
                    yAxisIndex: 1,
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            barBorderRadius:[0,0,5,5]
                        }
                    },
                    data: [-2, -7, -3, -4, -6, -8, -4]
                }
            ]
      }
      myChart.setOption(options);
    }
  }
}
</script>

<style scoped lang="scss">
  .left-viewer {
    width: 453px;
    margin-top: 59px;
  }
  .plate1 {
    overflow: hidden;
    .content {
      height: 263px;
      box-sizing: border-box;
      border: 1px solid rgba(41, 148, 255, 0.4);
    }
  }
  .plate2 {
    margin-top: 21px;
    .content {
      height: 251px;
      box-sizing: border-box;
      border: 1px solid rgba(41, 148, 255, 0.4);
      .left-1-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
  .plate3 {
    margin-top: 21px;
    .content {
      height: 259px;
      box-sizing: border-box;
      border: 1px solid rgba(41, 148, 255, 0.4);
      .left-2-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

<style lang="scss">
  .dashboard-custom-ev-board--scale {
  .header {
    height: 62px;
    align-items: center;
    .header-item {
      height: auto!important;
      text-align: center;
      font-size: 14px;
      color: #A1CEEF;
      line-height: 19px!important;
      white-space: normal;
    }
  }
  .rows {
    .row-item {
      font-size: 16px;
      color: #fff;
      .ceil {
        text-align: center;
        white-space: normal;
        font-size: 14px;
      }
    }
  }
}
</style>

