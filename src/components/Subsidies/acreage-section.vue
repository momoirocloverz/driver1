<template>
  <div ref="chart" class="chart" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'AcerageSection',
  data() {
    return {
      chart: null,
      data: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '20%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: [2016, 2017, 2018, 2019, 2020, 2021],
          splitLine: {
            show: false
          },
          axisLabel: {
            color: 'white',
            formatter: '{value}年',
            fontSize: 1.6 * window.innerHeight / 100,
          }
        },
        yAxis: {
          type: 'value',
          name: '万亩',
          min: 40,
          nameTextStyle: {
            color: 'white'
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: 'white',
            fontSize: 1.6 * window.innerHeight / 100,
          }
        },
        color: ['#0692B8'],
        series: [
          {
            type: 'line',
            data: [44.07, 44.61, 46.3, 41.9, 42.68, 42.61],
            itemStyle: {
              borderColor: '#6666',
              borderWidth: 1
            },
            label: {
              show: true,
              position: 'top',
              valueAnimation: true,
              color: 'white',
              fontSize: 1.8 * window.innerHeight / 100,
            },
            labelLine: {
              show: false
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#0692B8'
              }, {
                offset: 1,
                color: '#05448980'
              }])
            },
            markLine: {
              symbol: 'none',
              data: [
                {
                  name: '警戒线',
                  yAxis: 42,
                  label: {
                    color: 'white',
                    textBorderColor: 'black',
                    position: 'end',
                    formatter: '警戒线\n42万亩',
                    fontSize: 1.6 * window.innerHeight / 100,
                    distance: [window.innerWidth / (-150), 0]
                  },
                  lineStyle: {
                    width: 2,
                    color: 'rgb(255,24,35)'
                  }
                }
              ]
            }
          }
        ]
      }
    }
  },
  mounted() {
    const chart = echarts.init(this.$refs.chart)
    chart.setOption(this.data)
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>

<style scoped lang="scss">
.chart {
  height: 100%;
  width: 100%;
}
</style>
