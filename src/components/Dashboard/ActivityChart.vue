<template>
  <div class="container">
    <!--    <div class="title">{{locationName}}用户活跃</div>-->
    <new-header :title="`${locationName}用户活跃`" />
    <div ref="chart" class="chart" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import '@/assets/js/echart-custom-theme'
import { getActiveUserData } from '@/service/dashboard'
import _ from 'lodash'
import NewHeader from '@/components/Dashboard/sub-components/NewHeader'

export default {
  name: 'ActivityChart',
  components: { NewHeader },
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
      chart: null,
      interval: null
    }
  },
  watch: {
    location(newLocation) {
      this.getData(newLocation)
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart, 'custom-set')
    this.interval = setInterval(() => this.getData(this.location), 5000)
  },
  beforeDestroy() {
    this.chart?.dispose()
    this.chart = null
    clearInterval(this.interval)
  },
  methods: {
    getDateString(date) {
      const offset = date.getTimezoneOffset()
      return new Date(date.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0]
    },
    getData(location) {
      const to = this.getDateString(new Date())
      const length = 14
      const from = this.getDateString(new Date(new Date(to).getTime() - 3600000 * 24 * length))
      getActiveUserData(location, from, to).then(result => {
        const data = Array.isArray(result.data) ? result.data : []
        const option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.map(e => {
              const original = e.day.split('-')
              original.shift()
              return original.join('/')
            }),
            axisLabel: {
              fontSize: 14
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
              fontSize: 14
              // margin: 10
            },
            name: '用户数(人)',
            nameTextStyle: {
              fontSize: 17
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
              fontSize: 16
            },
            axisPointer: {
              type: 'line',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            bottom: '10%',
            right: '12%'
          },
          series: [{
            name: '人数',
            data: data.map(e => e.nums),
            type: 'line',
            endLabel: {
              show: true,
              textBorderColor: 'black',
              color: 'white',
              fontSize: 18,
              formatter: '{c}人'
            },
            // markPoint: {
            //   show: data.length > 0,
            //   label: {
            //     fontSize: 18,
            //     formatter: `${_.last(result.data)?.nums}人`
            //   },
            //   symbolSize: 50,
            //   symbolOffset: [0, -10],
            //   data: [{
            //     coord: [result.data.length - 1, _.last(result.data)?.nums]
            //   }]
            // },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#178DFA'
              }, {
                offset: 1,
                color: '#05448980'
              }])
            },
            label: {
              show: false,
              position: 'top',
              color: 'white'
            },
            animation: false
          }]
        }
        this.chart.setOption(option)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  //padding: 30px;
  width: 100%;
  .title{
    font-size: 50px;
    font-family: YouSheBiaoTiHei;
    //font-weight: bold;
    text-align: left;
    color: #54daf7;
    letter-spacing: 3px;
    //margin-bottom: 50px;
  }
  .chart{
    height: 200px;
    width: 100%;
  }
}
</style>
