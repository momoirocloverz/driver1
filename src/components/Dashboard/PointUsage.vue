<template>
  <div class="container">
    <!--    <div class="stats-header">-->
    <!--      {{locationName}}积分治理-->
    <!--    </div>-->
    <NewHeader :title="`${locationName}积分治理`" />
    <div class="stats-content">
      <StatsItem v-for="item in data" :key="item.id" :icon="item.icon" :label="item.label" :value="item.value" :unit="item.unit" />
    </div>
    <div class="extra-content">
      <div>
        <NewHeader>
          <el-radio-group v-model="contentType" class="custom-selector">
            <el-radio label="总次数和总积分情况" />
            <el-radio label="常用打分项目" />
          </el-radio-group>
        </NewHeader>
        <div v-if="contentType==='总次数和总积分情况'" ref="chart" class="chart" />
        <ScrollingBoardEV
          no-title-background
          v-if="contentType==='常用打分项目'"
          class="div1-scrolling-board"
          :show-header="false"
          :column-widths="[200]"
          :source="boardData"
        />
      </div>
      <!--      <ScrollingBoard-->
      <!--        class="div1-scrolling-board"-->
      <!--        title="常用打分项目TOP10"-->
      <!--        :data="boardData"-->
      <!--      />-->
    </div>
  </div>
</template>

<script>
import StatsItem from '@/components/Dashboard/sub-components/StatsItem'
// import ScrollingBoard from '@/components/Dashboard/ScrollingBoard'
import * as echarts from 'echarts'
import '@/assets/js/echart-custom-theme'
import ScrollingBoardEV from '@/components/Dashboard/sub-components/ScrollingBoardEV'
import { getPointBoardData, getPointChartData } from '@/service/dashboard'
import NewHeader from '@/components/Dashboard/sub-components/NewHeader'

export default {
  name: 'PointUsage',
  components: { NewHeader, ScrollingBoardEV, StatsItem },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array,
      default: () => []
    },
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
      boardData: [],
      contentType: '总次数和总积分情况'
      // boardIndex: 0
      // timer: null
    }
  },
  watch: {
    location(newLocation) {
      this.getData(newLocation)
    },
    contentType(value) {
      if (value === '总次数和总积分情况') {
        if (!this.chart) {
          this.$nextTick(()=>{
            this.chart = echarts.init(this.$refs.chart, 'custom-set')
            this.getData()
          })
        }
      } else {
        this.chart?.dispose()
        this.chart = null
      }
    }
    // boardData(){
    //   clearInterval(this.timer);
    //   this.timer = setInterval(()=>this.switchDataset(), 6 * 2000)
    // }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart, 'custom-set')
  },
  beforeDestroy() {
    this.chart?.dispose()
    this.chart = null
    // clearInterval(this.timer)
  },
  methods: {
    getData(location = this.location) {
      getPointChartData(location).then(result => {
        const option = {
          legend: {
            top: 0,
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            textStyle: {
              fontSize: 14
            },
            axisPointer: {
              type: 'line',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '12%',
            right: '12%',
            bottom: '10%'
          },
          xAxis: {
            type: 'category',
            data: location[2] ? [result.data.village_name] : Array.isArray(result.data) ? (result.data.map(e => {
              return location[1] ? e.village_name : e.town_name
            })) : [],
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              show: false,
              lineStyle: {
                opacity: 0.5
              }
            },
            axisLabel: {
              color: 'white',
              fontSize: 14
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '打分次数(次)',
              nameTextStyle: {
                fontSize: 14
              },
              position: 'left',
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  opacity: 0.5
                }
              },
              axisLabel: {
                color: 'white',
                fontSize: 12
              }
            },
            {
              type: 'value',
              name: '总积分数(分)',
              nameTextStyle: {
                fontSize: 12
              },
              position: 'right',
              splitNumber: 4,
              splitLine: {
                show: false
              },
              axisLabel: {
                // formatter: '{value} 分',
                color: 'white',
                fontSize: 12
              }
            }
          ],
          series: [
            {
              name: '打分次数',
              type: 'bar',
              data: location[2] ? [result.data.nums] : Array.isArray(result.data) ? result.data.map(e => e.nums) : [],
              label: {
                show: false,
                position: 'top',
                valueAnimation: true,
                color: 'white',
                fontSize: 18
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#178DFA'
              }, {
                offset: 1,
                color: '#1890FF80'
              }])
            },
            {
              name: '总积分数',
              type: 'bar',
              yAxisIndex: 1,
              data: location[2] ? [result.data.integral] : Array.isArray(result.data) ? result.data.map(e => e.integral) : [],
              label: {
                show: false,
                position: 'top',
                valueAnimation: true,
                color: 'white',
                fontSize: 18
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FD9C0B'
              }, {
                offset: 1,
                color: '#F4ED3180'
              }])
            }
          ]
        }
        this.chart?.setOption(option)
        // this.chart.resize({width: '600px'});
      })
      getPointBoardData(location).then(result => {
        this.boardData = [
          {
            title: '加分项目',
            header: ['加分项名称', '次数'],
            data: Array.isArray(result[0].data) ? result[0].data.map((e) => ([e.item_name, e.num])) : []
          },
          {
            title: '减分项目',
            header: ['减分项名称', '次数'],
            data: Array.isArray(result[1].data) ? result[1].data.map((e) => ([e.item_name, e.num])) : []
          }
        ]
      })
    }
    // switchDataset() {
    //   let newIndex = this.boardIndex + 1
    //   if (newIndex >= this.boardData.length) {
    //     newIndex = 0
    //   }
    //   this.boardIndex = newIndex
    // }
  }
}
</script>

<style scoped lang="scss">

.container{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0px 15px 10px 0px;
  row-gap: 10px;
  .stats-header {
    font-size: 28px;
    font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
    font-weight: bold;
    text-align: left;
    color: #fefefe;
    width: 100%;
    padding: 13px 40px;
    background: url("~@/assets/dashboard/new-section-header-bg.webp");
    background-size: 100% 150%;
  }
  .stats-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    row-gap: 10px;
  }
  .extra-content {
    width: 100%;
    column-gap: 20px;
    .chart-header{
      display: flex;
      flex-flow: row nowrap;
      height: 45px;
      align-items: center;
      background: url("~@/assets/dashboard/new-section-header-bg.webp");
      background-size: 100% 100%;
      border-radius: 6px;
      padding-left: 30px;
      // text
      font-size: 28px;
      font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
      font-weight: bold;
      text-align: left;
      color: #fefefe;
      //text-shadow: 0px 0px 29px rgba(19,128,255,0.50);
    }
    .chart {
      height: 200px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .div1-scrolling-board {
      height: 200px;
    }
  }

  ::v-deep .el-radio-group.custom-selector {
    .el-radio__inner {
      display: none;
    }
    .el-radio {
      font-size: 20px;
      color: #fefefe;
      margin-right: 0;
      &:not(:last-of-type) {
        &::after {
          content: '/';
          opacity: 0.5;
          margin-inline: 3px;
        }
      }
      .el-radio__label {
        font-size: 20px;
        padding-left: 0;
        opacity: 0.5;
      }
      &.is-checked {
        .el-radio__label {
          opacity: 1;
          color: white;
        }
      }
    }
  }
}
</style>
