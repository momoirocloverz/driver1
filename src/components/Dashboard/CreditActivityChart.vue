<template>
  <div class="container">
    <!--    <div class="title">{{locationName}}2021年善治积分贷授信情况</div>-->
<!--    <new-header :title="`${locationName}2021年善治积分贷授信情况`" />-->
    <!-- 目前不做联动 -->
    <new-header :title="`善治贷用信`" />
    <div class="content">
      <div class="stats">
<!--        <StatsItem-->
<!--          label="可贷总额"-->
<!--          :value="91.789"-->
<!--          :unit="'亿元'"-->
<!--        />-->
        <StatsItem
          label="授信农户"
          :value="59387"
          :unit="'户'"
        />
        <StatsItem
          label="用信农户"
          :value="4594"
          unit="户"
        />
        <StatsItem
          label="用信金额"
          :value="5.28"
          unit="亿元"
        />
        <StatsItem
          label="用信农户占比"
          :value="percentage"
          :unit="'%'"
        />
      </div>
      <div ref="chart" class="chart" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import StatsItem from '@/components/Dashboard/sub-components/StatsItem'
import { Gold, People, Pie, Savings, PeopleWithGold } from './icons'
import {getCreditChartData, getCreditData, getLoanChartData} from '@/service/dashboard'
import NewHeader from '@/components/Dashboard/sub-components/NewHeader'

export default {
  name: 'CreditActivityChart',
  components: { NewHeader, StatsItem },
  props: {
    location: {
      type: Array,
      default: () => [1]
    },
    locationName: {
      type: String,
      default: ''
    },
    registeredUserCount: {
      type: Number,
    }
  },
  data() {
    return {
      data: [['-', ''], ['-', ''], ['-', '']]
    }
  },
  computed: {
    Icons() {
      return { Gold, People, Pie, Savings, PeopleWithGold }
    },
    percentage() {
      return (4594 /59387 * 100).toFixed(2);
      // return (!isNaN(this.registeredUserCount) && this.registeredUserCount > 0) ? (59387 / this.registeredUserCount * 100).toFixed(2) : '-'
    }
  },
  watch: {
    location(newLocation) {
      // 目前取消联动
      // this.getData(newLocation)
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart, 'custom-set')
    // 目前取消联动
    this.getData(this.location)
  },
  beforeDestroy() {
    this.chart?.dispose()
    this.chart = null
  },
  methods: {
    getData(location) {
      getCreditData(location).then(result => {
        this.data = result.map(e => e.data)
      })
      getLoanChartData(location, new Date().getFullYear() - 1).then(result => {
        const newData = Array.isArray(result.data) ? result.data.map(e => ({ name: e.leve, value: e.num })) : []
        const option = {
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 20
            }
          },
          legend: {
            orient: 'horizontal',
            // left: '50%',
            // itemGap: 60,
            top: 'bottom',
            textStyle: {
              fontSize: 16
            }
          },
          series: [
            {
              name: '善治积分贷授信额度',
              type: 'pie',
              data: newData,
              label: {
                show: false
              },
              // label: {
              //   color: 'white',
              //   fontSize: 16,
              //   formatter: '{b}: {d}%'
              // },
              center: ['50%', '35%'],
              radius: '50%'
              // emphasis: {
              //   itemStyle: {
              //     shadowBlur: 10,
              //     shadowOffsetX: 0,
              //     shadowColor: 'rgba(0, 0, 0, 0.5)'
              //   }
              // }
            }
          ]
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
  width: 100%;
  .title{
    font-size: 50px;
    font-family: YouSheBiaoTiHei;
    //font-weight: bold;
    text-align: left;
    color: #54daf7;
    letter-spacing: 3px;
    margin-bottom: 50px;
  }
  .content {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    .stats{
      flex: 0 0 auto;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      row-gap: 10px;
      margin-top: 24px;
      //margin-bottom: 30px;
    }
    .chart{
      flex: 1;
      height: 200px;
    }
  }
}
</style>
