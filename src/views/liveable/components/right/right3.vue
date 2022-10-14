<template>
  <div class="_right1">
    <right-title title="美丽经济" />
    <div class="total">
      <left-item
        custom-style="width: 50%;padding-left: 46px;"
        title="农家乐总数"
        src="https://img.hzanchu.com/acimg/f352cb4cb5d6b8d64ade4f48509d2ace.png"
        :show-bg="true"
        width="30px"
        height="30px"
        :num="parseInt(total.njl)"
        unit="家"
      />
      <left-item
        custom-style="width: 50%;padding-left: 26px;"
        title="民宿总数"
        src="https://img.hzanchu.com/acimg/f352cb4cb5d6b8d64ade4f48509d2ace.png"
        :show-bg="true"
        width="30px"
        height="30px"
        :num="parseInt(total.ms)"
        unit="家"
      />
    </div>

    <div class="title">优美庭院示范村</div>
    <div ref="echarts3" class="map" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import * as api from '@/service/liveable'
import RightTitle from './title.vue'
import LeftItem from '../left/item.vue'
export default {
  components: {
    RightTitle,
    LeftItem
  },
  data() {
    return {
      list: [
        { month: '1月', value: 88 },
        { month: '2月', value: 88 },
        { month: '3月', value: 88 },
        { month: '4月', value: 88 }
      ],
      echarts3: null,
      chart: null,
      total: {
        njl: '0',
        ms: '0'
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化数据
    init: function() {
      api
        .livableProfessionalBeautifulEconomy({
          app_id: '4473180',
          app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO'
        })
        .then((e) => {
          // console.log(e)
          if (e.code === 0) {
            this.total = {
              njl: e.data.njlsCount[0].x + '',
              ms: e.data.mssCount[0].y + ''
            }
            this.initChart(e.data.ymtyjx, e.data.ymtyph)
          } else {
            this.initChart([], [])
          }
        })
    },
    // arr1 嘉兴级 、 arr2 平湖级
    initChart: function(arr1, arr2) {
      const dataX = []
      const dataY1 = []
      const dataY2 = []
      for (const item of arr1) {
        dataX.push(item.year)
        dataY1.push(item.y)
      }
      for (const item of arr2) {
        dataY2.push(item.y)
      }
      const option = {
        xAxis: {
          type: 'category',
          data: dataX,
          axisLabel: {
            color: 'rgba(255,255,255,1)'
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '村',
          nameTextStyle: {
            color: 'rgba(255,255,255,1)'
          },
          splitNumber: 3,
          axisLabel: {
            color: 'rgba(255,255,255,1)'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(204,204,204,0.5)',
              type: 'dashed'
            }
          }
        },
        legend: {
          orient: 'horizontal',
          top: 'top',
          right: '10%',
          itemWidth: 10,
          itemHeight: 10,
          icon: 'roundRect',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '20%',
          bottom: '30%',
          right: '12%'
        },
        series: [
          {
            name: '嘉兴级',
            data: dataY1,
            type: 'bar',
            color: '#3995E6',
            barWidth: 20
          },
          {
            name: '平湖级',
            data: dataY2,
            type: 'bar',
            color: '#32EDD1',
            barWidth: 20
          }
        ]
      }

      this.chart = echarts.init(this.$refs.echarts3, 'custom-set')
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
._right1 {
  width: 100%;
  margin-top: 24px;

  .total {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .title {
    width: 100%;
    margin-top: 24px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
  }

  .map {
    width: 94%;
    // margin-top: 24px;
    height: 149px;
    margin-left: 3%;
  }
}
</style>
