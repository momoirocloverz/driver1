<template>
  <div
    v-loading="isLoading"
    element-loading-background="#0006"
    class="accuracy-chart-container"
  >
    <Unavailable v-if="dataUnavailable" />
    <div v-else ref="chart" class="chart" />
  </div>
</template>
<script>
import { getAccuracyData } from '@/service/wasteManagement'
import * as echarts from 'echarts'
import Unavailable from '@/components/WasteManagement/SubComponents/Unavailable'
const townOrder = ['当湖街道', '钟埭街道', '曹桥街道', '新仓镇', '新埭镇', '独山港镇', '广陈镇', '林埭镇']

function translateDateType(type) {
  const dict = {
    'date': 1,
    'month': 2
  }
  return dict[type]
}

export default {
  name: 'AccuracyChart',
  components: {
    Unavailable
  },
  props: {
    location: {
      type: Array,
      default: () => [1]
    },
    locationName: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      required: true
    },
    dateType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: null,
      chart: null,
      isLoading: false
    }
  },
  computed: {
    dataUnavailable() {
      return !this.isLoading && !(this.data?.length > 0)
    }
  },
  watch: {
    locationName(newLocation) {
      this.getData(newLocation)
    },
    date() {
      this.getData()
    }
  },
  mounted() {
    // this.chart = echarts.init(this.$refs.chart, 'custom-set')
    this.getData(this.locationName)
    window.addEventListener('resize', this.$_resizeChart)
  },
  beforeDestroy() {
    this.chart?.dispose()
    this.chart = null
    window.removeEventListener('resize', this.$_resizeChart)
  },
  methods: {
    getData(location = this.locationName, date = this.date, dateType = this.dateType) {
      this.isLoading = true
      const path = this.location
      getAccuracyData({ regionName: location, date, dateType: translateDateType(dateType) }).then(result => {
        if (result.code !== 0) {
          throw new Error(result.msg)
        }
        if (location !== this.locationName) {
          return
        }
        let data = Array.isArray(result.data) ? result.data : []
        this.data = result.data
        if (data.length === 0) {
          return
        }
        if (path.length === 1) {
          data = data.sort((a, b) => (townOrder.indexOf(a.region_name) - townOrder.indexOf(b.region_name)))
        }
        data = data.filter(d => (path.length >= 3 || d.region_name !== location))
        const dpi = window.devicePixelRatio
        const avg = data.reduce((prev, cur) => (prev + cur.ture_rate), 0) / data.length
        const option = {
          xAxis: {
            type: 'category',
            data: data.map((d) => (d.region_name)),
            axisLabel: {
              fontSize: 14 / dpi,
              color: 'white',
              rotate: -45
            },
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                opacity: 0.5
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              // formatter: '{value} 人',
              fontSize: 14 / dpi,
              color: 'white'
            },
            name: '准确率(%)',
            min: Math.max(Math.floor(Math.min(...(data.map((d) => (d.ture_rate)))) - 5), 0),
            nameTextStyle: {
              fontSize: 14 / dpi,
              color: 'white'
            },
            splitLine: {
              lineStyle: {
                opacity: 0.5
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            textStyle: {
              // fontSize: 20
            },
            axisPointer: {
              type: 'line',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            top: '20%',
            bottom: '30%',
            right: '12%'
          },
          series: [{
            name: '准确率',
            data: data.map((d) => (d.ture_rate)),
            type: 'bar',
            color: '#00e3ff',
            label: {
              show: false,
              position: 'top',
              formatter: '{c}%',
              color: 'white'
            },
            itemStyle: {
              shadowColor: '#00E3FF80',
              shadowBlur: 10 / dpi
            },
            markLine: {
              symbol: 'none',
              data: [
                {
                  type: 'average',
                  name: '平均值',
                  label: {
                    color: 'white',
                    textBorderColor: 'black',
                    position: 'end',
                    formatter: '平均值\n{c}%'
                  },
                  lineStyle: {
                    color: 'rgb(233, 102, 109)'
                  }
                }
              ]
            }
          }
          // {
          //   name: '平均温度',
          //   data: data.map((e) => (avg)),
          //   type: 'line',
          //   color: 'red',
          //   label: {
          //     show: false,
          //     position: 'top',
          //     color: 'white'
          //   }
          // }
          ]
        }
        this.isLoading = false
        if (this.chart) {
          this.chart?.dispose()
        }
        this.chart = echarts.init(this.$refs.chart, 'custom-set')
        this.chart.setOption(option)
      }).catch((e) => {
        this.$message.error(`读取失败: ${e.message}`)
      }).finally(() => {
        this.isLoading = false
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
.accuracy-chart-container {
  height: 100%;
  width: 100%;
  //@media (-webkit-device-pixel-ratio: 1.25) {
  //  .chart {
  //    zoom: 0.8;
  //  }
  //}
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>

<style lang="scss">
.accuracy-chart-container {
  .el-loading-spinner {
    .path {
      stroke: white;
    }
  }
}
</style>
