<template>
  <div
    v-loading="isLoading"
    element-loading-background="#0006"
    class="live-waste-generation-chart-container"
  >
    <Unavailable v-if="dataUnavailable" />
    <div v-else ref="chart" class="chart" />
  </div>
</template>
<script>
import { getWasteGenerationData } from '@/service/wasteManagement'
import * as echarts from 'echarts'
import Unavailable from '@/components/WasteManagement/SubComponents/Unavailable'
import {format, startOfDay, startOfMonth, endOfDay, endOfMonth, startOfYear, endOfYear} from 'date-fns'


function translateDateType(type) {
  const dict = {
    'date': 1,
    'month': 2,
    'year': 3
  }
  return dict[type]
}
export default {
  name: 'LiveWasteGenerationChart',
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
    dateRange: {
      type: Array,
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
      timer: null,
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
    dateRange(newRange) {
      this.getData(this.locationName, newRange)
    }
  },
  mounted() {
    // this.chart = echarts.init(this.$refs.chart, 'custom-set')
    this.getData(this.locationName)
    // this.timer = setInterval(() => (this.getData(this.locationName)), 60 * 60 * 1000)
    window.addEventListener('resize', this.$_resizeChart)
  },
  beforeDestroy() {
    this.chart?.dispose()
    this.chart = null
    if (this.timer) {
      clearInterval(this.timer)
    }
    window.removeEventListener('resize', this.$_resizeChart)
  },
  methods: {
    getData(location = this.locationName, range = this.dateRange, dateType = this.dateType) {
      this.isLoading = true
      let dateRange = range
      if (dateType === 'month') {
        dateRange = [
          format(startOfDay(startOfMonth(new Date(dateRange[0]))), 'yyyy-MM-dd HH:mm:ss'),
          format(endOfDay(endOfMonth(new Date(dateRange[1]))), 'yyyy-MM-dd HH:mm:ss')
        ]
      }
      if (dateType === 'date') {
        dateRange = [
          format(startOfDay(new Date(dateRange[0])), 'yyyy-MM-dd HH:mm:ss'),
          format(endOfDay(new Date(dateRange[1])), 'yyyy-MM-dd HH:mm:ss')
        ]
      }
      if (dateType === 'year') {
        dateRange = [
          format(startOfYear(new Date(dateRange[0])), 'yyyy-MM-dd HH:mm:ss'),
          format(endOfYear(new Date(dateRange[1])), 'yyyy-MM-dd HH:mm:ss')
        ]
      }

      getWasteGenerationData({ regionName: location, range: dateRange, dateType: translateDateType(dateType) }).then(result => {
        if (result.code !== 0) {
          throw new Error(result.msg)
        }
        if (location !== this.locationName) {
          return
        }
        const data = Array.isArray(result.data) ? result.data : []
        this.data = result.data
        if (data.length === 0) {
          return
        }
        const dpi = window.devicePixelRatio
        const option = {
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: data.map((e) => (`${e.statistics_date}`)),
            axisLabel: {
              fontSize: 14 / dpi,
              color: 'white'
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
              // margin: 10
              color: 'white'
            },
            name: '重量(吨)',
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
            bottom: '15%',
            left: '16%',
            right: '5%'
          },
          // legend: {
          //   data: ['吨'],
          //   textStyle: {
          //     fontSize: 24
          //   }
          // },
          series: [{
            name: '重量',
            data: data.map((e) => (e.weight)),
            type: 'bar',
            barWidth: '40%',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#3DC6FB'
            }, {
              offset: 1,
              color: '#1B94FF'
            }]),
            label: {
              show: false,
              position: 'top',
              color: 'white'
            }
          }]
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
.live-waste-generation-chart-container {
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
.live-waste-generation-chart-container {
  .el-loading-spinner {
    .path {
      stroke: white;
    }
  }
}
</style>
