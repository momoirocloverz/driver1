<template>
  <div ref="chart" class="chart" />
</template>

<script>
import * as echarts from 'echarts'
import { getRecyclingData } from '@/service/wasteManagement'
// import Circle from '@/assets/waste-management/circle.png'
export default {
  name: 'RecyclingChart',
  components: { },
  props: {
    location: {
      type: Array,
      default: () => [1]
    },
    locationName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: []
    }
  },
  computed: {
    // icons() {
    //   return {Circle}
    // }
  },
  watch: {
    locationName(newLocation) {
      this.getData(newLocation)
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart, 'custom-set')
    this.getData(this.locationName)
    window.addEventListener('resize', this.$_resizeChart)
  },
  beforeDestroy() {
    this.chart?.dispose()
    this.chart = null
    window.removeEventListener('resize', this.$_resizeChart)
  },
  methods: {
    getData(location) {
      getRecyclingData({ regionName: location }).then(result => {
        if (result.code !== 0) {
          throw new Error(result.msg)
        }
        if (location !== this.locationName) {
          return
        }
        // const newData = Array.isArray(result.data) ? result.data.map(e => ({ name: e.name, value: e.value })) : []
        const cats = ['纸张', '金属', '塑料', '玻璃', '纺织品', '其他']
        const newData = Array.isArray(result.data) ? result.data.map((e, i) => ({ name: cats[i], value: e })) : []
        const option = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 14
            }
          },
          legend: {
            orient: 'vertical',
            right: '5%',
            top: 'middle',
            textStyle: {
              color: 'white',
              fontSize: 14
            }
          },
          grid: {
            bottom: '10%'
          },
          series: [
            {
              name: '垃圾回收情况',
              type: 'pie',
              data: newData,
              label: {
                color: 'white',
                fontSize: 14,
                formatter: '{b}: {d}%'
              },
              right: '20%',
              radius: '50%',
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.chart.setOption(option)
      }).catch((e) => {
        this.$message.error(`读取失败: ${e.message}`)
      })
    },
    $_resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@media (-webkit-device-pixel-ratio: 1.25) {
  .chart {
    zoom: 0.8;
  }
}
.chart{
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
