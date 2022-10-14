<template>
  <div
    v-loading="isLoading"
    element-loading-background="#0006"
    class="trash-tonnage-chart-container"
  >
    <Unavailable v-if="dataUnavailable" />
    <div v-else ref="chart" class="chart" />
  </div>
</template>
<script>
import { getAccuracyData, getWasteTonnageData } from '@/service/wasteManagement'
import * as echarts from 'echarts'
import Unavailable from "@/components/WasteManagement/SubComponents/Unavailable";

export default {
  name: 'TrashTonnageChart',
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
    }
  },
  data() {
    return {
      data: null,
      chart: null,
      isLoading: false,
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
    }
  },
  mounted() {
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
      this.isLoading = true
      getWasteTonnageData({ regionName: location }).then(result => {
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
        const option = {
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: data.map((d) => (parseInt(d.statistics_date, 10))),
            axisLabel: {
              fontSize: 14,
              color: 'white',
              formatter: '{value}月'
            },
            splitLine: {
              show: false,
              lineStyle: {
                opacity: 0.5
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              // formatter: '{value} 人',
              fontSize: 14,
              // margin: 10
              color: 'white'
            },
            name: '重量(吨)',
            nameTextStyle: {
              fontSize: 14,
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
              fontSize: 14,
            },
            axisPointer: {
              type: 'line',
              label: {
                formatter: '{value}月',
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            top: '15%',
            bottom: '15%',
            left: '15%',
            right: '5%'
          },
          series: [{
            data: data.map((d) => (d.weight)),
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
.trash-tonnage-chart-container {
  height: 100%;
  width: 100%;
  @media (-webkit-device-pixel-ratio: 1.25) {
    .chart {
      zoom: 0.8;
    }
  }
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>

<style lang="scss">
.trash-tonnage-chart-container {
  .el-loading-spinner {
    .path {
      stroke: white;
    }
  }
}
</style>
