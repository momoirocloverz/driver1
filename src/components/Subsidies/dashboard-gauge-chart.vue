<template>
  <div class="element">
    <div class="chart-container">
      <div ref="chart" class="chart" />
    </div>
    <div class="value">
      <span class="number">{{ value }}</span>
      <span class="unit">{{ unit }}</span>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'DashboardGaugeChart',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: '100'
    }
  },
  data() {
    return {
      data: {
        series: [{
          type: 'gauge',
          center: ['50%', '90%'],
          radius: '120%',
          progress: {
            show: true,
            width: 30
          },
          startAngle: 180,
          endAngle: 0,
          max: this.max,
          color: ['#ff6868'],
          axisLine: {
            lineStyle: {
              width: 30,
              color: [[1, '#2ed0d6']]
            }
          },
          axisTick: {
            show: false,
            distance: -35,
            color: 'white'
          },
          splitLine: {
            length: 15,
            distance: -52,
            lineStyle: {
              width: 2,
              color: 'white'
            }
          },
          axisLabel: {
            distance: -120,
            color: 'white',
            fontSize: 70
          },
          splitNumber: 5,
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10
            }
          },
          title: {
            show: false
          },
          detail: {
            show: false,
            valueAnimation: true,
          },
          data: [{
            value: this.value
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
  width: 100%;
  .chart-container {
    height: 10vh;
    flex: auto;
    width: 100%;
    overflow: hidden;
    .chart {
      width: 500%;
      height: 50vh;
      transform: scale(0.2);
      transform-origin: top left;
    }
  }
  .value {
    flex: 1 1 3vh;
    color: white;
    text-align: center;
    font-size: 1.4vh;
    vertical-align: baseline;
    .number {
      font-weight: 700;
      font-size: 2.2vh;
      margin-right: 0.5vh;
    }
  }
  .title {
    flex: 1 1 1.6vh;
    font-size: 1.6vh;
    color: #f2ee28;
    text-align: center;
  }
}
</style>
