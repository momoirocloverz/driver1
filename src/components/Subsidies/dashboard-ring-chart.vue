<template>
  <div class="element">
    <div class="chart-container">
      <div ref="chart" class="chart" />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'DashboardRingChart',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    color: {
      type: Array,
      default: ()=>['#3DC6FB20', '#1B94FF']
    }
  },
  data() {
    return {
      data: {
        series: [{
          type: 'gauge',
          center: ['50%', '50%'],
          radius: '70%',
          progress: {
            show: true,
            width: 30,
            itemStyle: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: this.color[0] // color at 0% position
                }, {
                  offset: 1, color: this.color[1] // color at 100% position
                }],
                global: false // false by default
              }
            }
          },
          startAngle: 90,
          endAngle: -270,
          axisLine: {
            show: true,
            lineStyle: {
              width: 30,
              color: [[1, '#eee2']]
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            show: true,
            valueAnimation: true,
            fontSize: 1.6 * 5 * window.innerHeight / 100,
            color: 'white',
            formatter: '{value}%',
            offsetCenter: ['0%', '10%']
          },
          pointer: {
            show: false
          },
          data: [{
            value: this.value,
          }]
        }]
      },
      chart: null
    }
  },
  watch: {
    chartData() {
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
.element {
  display: flex;
  flex-flow: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  .chart-container {
    height: 10vh;
    flex: auto;
    .chart {
      width: 500%;
      height: 50vh;
      transform: scale(0.2);
      transform-origin: top left;
    }
  }
  .title {
    flex: 1 1 3vh;
    color: white;
    text-align: center;
    font-size: 1.7vh;
    letter-spacing: 0.1vh;
  }
}
</style>
