<template>
  <div class="right-viewer">
    
    <div class="plate1">
      <Title text="近7年农业干旱监测分析" />
      <div class="content">
        <div ref="right1Chart" class="right-chart"></div>
      </div>
    </div>
    <div class="plate2">
      <Title text="近7年平湖水稻销售分析" />
      <div class="content">
        <div ref="right2Chart" class="right-chart"></div>
      </div>
    </div>
    <div class="plate3">
      <Title text="平湖水稻肥药售卖趋势" />
      <div class="content">
        <dv-scroll-board class="sale-trend" :config="config"/>
      </div>
    </div>
    <div class="plate4">
      <Title text="农事记录" />
      <div class="content">
        <div class="advice">水稻整地与施肥，稻田第一遍翻地时将肥料均匀撒施，后翻耕入田。</div>
        <div class="time">
          <span>平湖市陆正光家庭农场</span>
          <span> 2022年5月24号</span>
        </div>
        <div class="images">
          <img :src="item" alt="" v-for="item in images" :key="item">
        </div>
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
      right1Chart: null,
      timer1: null,
      right2Chart: null,
      timer2: null,
      config: {
        header: ['年份', '购买人总量', '农资销售总额', '总额环比'],
        // <img src="https://img.hzanchu.com/acimg/d7f31adcb0f36e1e80129ceac14c010b.png" />
        // <img src="https://img.hzanchu.com/acimg/9a10c4a4cbe8e7f8da0ef7547a8e3398.png" />
        data: [
          [
            '2021年',
            '1289人',
            '2467元',
            '<p class="up">31.29%</p>'
          ],
          [
            '2020年',
            '804人',
            '1879元',
            '<p class="down">-8.61%</p>'
          ],
          [
            '2019年',
            '1087人',
            '2056元',
            '<p class="up">6.42%</p>'
          ],
          [
            '2018年',
            '908人',
            '1932元',
            '<p class="up">12.05%</p>'
          ]
        ],
        headerBGC: 'transparent',
        oddRowBGC: 'rgba(1, 52, 70, 0.7)',
        evenRowBGC: 'transparent',
        rowNum: 2,
        align: ['center']
      },
      images: [
        'https://img.hzanchu.com/acimg/921848a648dedf48535ced70fb4730f9.png',
        'https://img.hzanchu.com/acimg/4845caabb292cf1a0876b41cfa7bb375.png',
        'https://img.hzanchu.com/acimg/1cc369436041d0f426bcb13684e5eded.png'
      ]
    }
  },
  mounted() {
    this.right1ChartInit();
    this.right2ChartInit();
  },
  methods: {
    right1ChartInit() {
      let myChart = echarts.init(this.$refs.right1Chart);
      let options = {
        color: ['#8074FF', '#26B4FC', '#EF9E4E', ],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderWidth: 0,
          textStyle: {
              color: '#ffffff',
              fontSize: '14',
          },
          axisPointer: {
              type: 'shadow'
          },
        },
        legend: {
            data: ['预估产量', '实际产量', '减产率'],
            textStyle:{
              color: "#90B6D2"
            }
        },
        grid: {
            right: '10%',
            top: '20%',
            bottom: '10%',
            left: '15%'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
                show: true,
                alignWithLabel: true,
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
                    color: "rgba(255, 255, 255, 0.5)",
                }
            },
            data: YEARS
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(吨)',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 0.4
              }
            },
          },
          {
            type: 'value',
            name: '(减产率.%)',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 0.4
              }
            },
          }
        ],
        series: [
          {
            name: '预估产量',
            type: 'bar',
            data: [128795, 128785, 129876, 129690, 132845, 127656, 136698],
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius:[3,3,0,0],
                    color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                      offset: 0,
                      color: "#26B4FC"
                    },{
                      offset: 0.8,
                      color: "rgba(38, 180, 252, 0.1)"
                    }],false)
                }
            },
          },
          {
            name: '实际产量',
            type: 'bar',
            data: [124696, 126573, 127881, 127695, 129500, 125600, 133100],
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [3,3,0,0],
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
            name: '减产率',
            type: 'line',
            data: [3.18, 1.72, 1.54, 1.54, 2.52, 1.61, 2.63],
            symbol: "none", // 空心/实心
            yAxisIndex: 1,
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
                  color: "#8074FB"
                },{
                  offset: 0.8,
                  color: "rgba(128, 116, 251, .1)"
                }],false)
              }
            },
          },
        ]
      }
      myChart.setOption(options);
      let len = 0
      clearInterval(this.timer1)
      this.timer1 = setInterval(() => {
        if (len === YEARS.length) {
            len = 0
        }
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: len,
        })
        len++
      }, 3800)
    },
    right2ChartInit() {
      let myChart = echarts.init(this.$refs.right2Chart);
      let options = {
        color: ['#1FC579', '#EF9E4E', '#26B4FC', '#B88BFC'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderWidth: 0,
          textStyle: {
              color: '#ffffff',
              fontSize: '14',
          },
          axisPointer: {
              type: 'shadow'
          },
        },
        legend: {
            data: ['肥料价格', '水稻价格', '产量', '库存'],
            textStyle:{
              color: "#90B6D2"
            }
        },
        grid: {
            right: '15%',
            top: '20%',
            bottom: '10%',
            left: '12%'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
                show: true,
                alignWithLabel: true,
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
                    color: "rgba(255, 255, 255, 0.5)",
                }
            },
            data: YEARS
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(元)',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 0.4
              }
            },
          },
          {
            type: 'value',
            name: '(吨)',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 0.4
              }
            },
          }
        ],
        series: [
          {
            name: '肥料价格',
            type: 'bar',
            data: [2300, 2500, 2450, 2500, 2580, 2850, 3050],
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius:[3,3,0,0],
                    color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                      offset: 0,
                      color: "#26B4FC"
                    },{
                      offset: 0.8,
                      color: "rgba(38, 180, 252, 0.1)"
                    }],false)
                }
            },
          },
          {
            name: '水稻价格',
            type: 'bar',
            data: [2.61, 2.64, 2.65, 2.65, 2.67, 2.68, 2.71],
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [3,3,0,0],
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
            name: '产量',
            type: 'line',
            data: [124696, 126573, 127881, 127695, 129500, 125600, 133100],
            symbol: "none", // 空心/实心
            yAxisIndex: 1,
            smooth: true,
            lineStyle: {
              shadowColor: '#000',
              shadowBlur: 5,
              shadowOffsetY: 2
            },
            
          },
          {
            name: '库存',
            type: 'line',
            data: [90654, 92475, 104560, 95640, 110760, 98345, 100345],
            symbol: "none", // 空心/实心
            yAxisIndex: 1,
            smooth: true,
            lineStyle: {
              shadowColor: '#000',
              shadowBlur: 5,
              shadowOffsetY: 2
            },
            
          },
        ]
      }
      myChart.setOption(options);
      let len = 0
      clearInterval(this.timer1)
      this.timer1 = setInterval(() => {
        if (len === YEARS.length) {
            len = 0
        }
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: len,
        })
        len++
      }, 3800)
    }
  }
}
</script>

<style scoped lang="scss">
  .right-viewer {
    width: 453px;
    margin: 59px 0 0 auto;

  }
  .plate1,.plate2 {
    overflow: hidden;
    .content {
      height: 211px;
      box-sizing: border-box;
      border: 1px solid rgba(41, 148, 255, 0.4);
      .right-chart {
        width: 100%;
        height: 100%;
      }
    }  
  }
  .plate3 {
    margin-top: 21px;
    .content {
      height: 119px;
      box-sizing: border-box;
      border: 1px solid rgba(41, 148, 255, 0.4);
      .sale-trend {
        height: 100%;
        width: 100%;
      }
    }
  }
  .plate4 {
    margin-top: 21px;
    .content {
      height: 192px;
      box-sizing: border-box;
      border: 1px solid rgba(41, 148, 255, 0.4);
      .advice {
        font-size: 14px;
        color: #fff;
        line-height: 22px;
        padding: 0 16px;
        margin-top: 12px;
      }
      .time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        padding: 0 16px;
        span {
          font-size: 14px;
          line-height: 22px;
          &:nth-of-type(1) {
            color: #A1CEEF;
          }
        }
      }
      .images {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        margin-top: 10px;
        img {
          width: 126px;
          height: 95px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .sale-trend {
    .header {
      height: 37px;
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
          .up {
            color: #FC6759;
          }
          .down {
            color: #71D964;
          }
        }
      }
    }
  }
</style>