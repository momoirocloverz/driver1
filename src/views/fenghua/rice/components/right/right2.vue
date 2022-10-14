<template>
  <div class="_right2">
    <title-bar title="价格行情" />
    <select-c :list="selectList" @reload="reload" />

    <div class="chart">
      <div class="total">
        <right-2-item
          title="最低价"
          value="3.56"
          unit="元/斤"
          custom-style="margin-left: 37px"
        />
        <right-2-item
          title="最高价"
          value="14.40"
          unit="元/斤"
          custom-style="margin-left: 37px"
        />
      </div>
      <div id="right2-chart" ref="echarts1" class="map" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import TitleBar from '../titleBar.vue'
import SelectC from '../left/select.vue'
import Right2Item from './right2Item.vue'
import { xmjg } from '../../data/data.js'
export default {
  components: {
    TitleBar,
    SelectC,
    Right2Item
  },
  data() {
    return {
      list: [],
      selectList: [
        { text: '近7日', select: true },
        { text: '近1个月', select: false },
        { text: '今年', select: false }
      ],
      echarts1: null,
      chart: null,
      lowPrice: 0.0,
      highPrice: 0.0,
      chartInstance: null,
      timers: null,
      pos: 0,

      start: 0,
      end: 4,
      roomTimers: null
    }
  },
  mounted() {
    this.reload({
      text: '近7日'
    })
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    this.chartInstance.dispose()
    window.removeEventListener('resize', this.resizeHandler)
  },

  methods: {
    // 初始化数据
    reload: function(item) {
      console.log(item)
      const list = []

      for (const index in xmjg) {
        if (item.text == '近7日' && xmjg[index].type == 'average') {
          list.push({
            text: this.getDay(index - 7).substring(5, 10),
            value: xmjg[index].price
          })
        } else if (
          item.text == '近1个月' &&
          xmjg[index].type == 'month_average'
        ) {
          list.push({
            text: this.getDay(index - 30).substring(5, 10),
            value: xmjg[index].price
          })
        } else if (item.text == '今年' && xmjg[index].type == 'year_average') {
          list.push({
            text: xmjg[index].date,
            value: xmjg[index].price
          })
        }
      }
      this.list = list
      this.initChart(list)
    },
    initChart: function(list) {
      this.start = 0
      this.end = 4
      const data1 = []
      const dataX = []
      for (const index in list) {
        data1.push({
          name: list[index].text,
          value: list[index].value
        }) //
        dataX.push(list[index].text)
      }
      const chart = echarts.init(document.getElementById('right2-chart'))
      const option = {
        color: ['#00D1FF'],
        legend: {
          show: false,
          top: '5%',
          right: '5%',
          // icon: "rect",
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          borderColor: '#278BFF',
          borderWidth: 1,
          backgroundColor: '#07266C',
          formatter: function(params) {
            return (
              "<div style='width: 100%; font-size: 14px;font-weight: bold;color: #fff;'>" +
              params[0].name +
              '</div>' +
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>价格：" +
              "<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              params[0].value +
              '元/斤</span>' +
              '</div>'
            )
          }
        },
        xAxis: {
          type: 'category',
          data: dataX,
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.14)',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#90B6D2'
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '元',
            nameLocation: 'end',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255, 255, 255, 0.14)'
              }
            },
            splitNumber: 5,
            axisLabel: {
              color: '#90B6D2',
              fontSize: 12
            },
            nameTextStyle: {
              color: '#90B6D2',
              fontSize: 12
            }
          }
        ],
        dataZoom: {
          type: 'inside',
          startValue: this.start,
          endValue: this.end
        },
        grid: {
          top: '18%',
          left: '3%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        series: [
          {
            name: '产量',
            data: data1,
            barWidth: '20px',
            type: 'line',
            symbol:
              'image://' +
              require('@/assets/image/fenghua/rice/price-icon.png'),
            symbolSize: 18,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                fontSize: 14,
                color: '#34E8FF'
              }
            }
          }
        ]
      }
      chart.setOption(option)
      this.chartInstance = chart
      // this.initTimer()
      this.initZoomTimer()
    },
    // 自动滚动
    initTimer: function() {
      if (this.timers) {
        clearInterval(this.timers)
      }
      this.timers = setInterval(() => {
        if (this.pos > 0) {
          this.chartInstance.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.pos - 1
          })
        } else {
          this.chartInstance.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.list.length - 1
          })
        }
        this.chartInstance.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.pos
        })
        // tooltip 跟随显示
        this.chartInstance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.pos
        })
        this.pos++

        if (this.pos > this.list.length - 1) {
          this.pos = 0
        }
      }, 2000)
    },
    //  开启柱状图滚动展示
    initZoomTimer: function() {
      if (this.roomTimers) {
        clearInterval(this.roomTimers)
      }

      this.roomTimers = setInterval(() => {
        ++this.start
        ++this.end

        if (this.start > this.list.length - 4) {
          this.start = 0
          this.end = 4
        }
        setTimeout(() => {
          this.chartInstance.setOption({
            dataZoom: {
              type: 'inside',
              startValue: this.start,
              endValue: this.end
            }
          })
        }, 0)
      }, 2000)
    },
    resizeHandler: function() {
      this.chartInstance?.resize()
    },
    // 获取日期
    getDay: function(day) {
      var today = new Date()
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetday_milliseconds) // 注意，这行是关键代码
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      return tYear + '-' + tMonth + '-' + tDate
    },

    // 处理0的问题
    doHandleMonth: function(month) {
      var m = month
      if (month.toString().length == 1) {
        m = '0' + month
      }
      return m
    }
  }
}
</script>

<style scoped lang="scss">
._right2 {
  width: 100%;

  .chart {
    width: 100%;
    display: flex;
    flex-direction: row;
    .total {
      width: 30%;
    }
    .map {
      width: 70%;
      margin-top: 24px;
      height: 200px;
    }
  }
}
</style>
