<template>
  <div ref="chart" class="chart" />
</template>

<script>
import * as echarts from 'echarts'
import {sum} from 'lodash'

export default {
  name: 'SubsidySection',
  data() {
    return {
      chart: null,
      data: [
        { value: 62, name: '订单粮种奖励' },
        { value: 73, name: '旱粮种植补贴' },
        { value: 162, name: '粮食生产贴息' },
        { value: 327, name: '市级储备晚稻补贴' },
        { value: 662, name: '省级储备粮食订单' },
        { value: 3895, name: '耕地地力保护补贴' },
        { value: 3956, name: '规模种粮补贴' }
      ]
    }
  },
  mounted() {
    const chart = echarts.init(this.$refs.chart)
    const options = {
      legend: {
        orient: 'vertical',
        right: 'right',
        top: 'center',
        textStyle: {
          color: 'white',
          fontSize: 1.8 * window.innerHeight / 100
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `
            <span style="display: inline-block; background: ${params.color}; margin-right: 0.5vh; border-radius: 50%; width: 1.2vh; height: 1.2vh" /></span>${params.name}
            <br />金额: ${params.value}万元
            <br />占比: ${params.percent}%`
        }
      },
      color: ['#24D409', '#65E0F9', '#E38BF0', '#F76C27', '#0CA5F2', '#9CEB90', '#F7FF00'],
      series: [
        {
          type: 'pie',
          center: ['25%', '50%'],
          radius: ['40%', '60%'],
          data: this.data,
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#6666',
            borderWidth: 1
          },
          label: {
            show: true,
            position: 'center',
            formatter: `合计\n${sum(this.data.map(e=>e.value))}万元`,
            fontSize: 1.8 * window.innerHeight / 100,
            color: 'white',
            textBorderColor: 'black',
            textBorderWidth: 2,
            shadowColor: 'black'
          },
          labelLine: {
            show: false
          },
          // emphasis: {
          //   label: {
          //     show: false,
          //     fontSize: '15',
          //     formatter: '{b}\n{c}万元\n{d}%',
          //     color: 'white',
          //     textBorderColor: 'black',
          //     textBorderWidth: 4,
          //     shadowColor: 'black'
          //   }
          // }
        }
      ]
    }
    chart.setOption(options)
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
