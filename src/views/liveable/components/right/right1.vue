<template>
  <div class="_right1">
    <right-title title="三大革命" />
    <div class="total">
      <left-item
        custom-style="width: 50%;padding-left: 46px;"
        title="规范化公厕总数"
        src="https://img.hzanchu.com/acimg/90669ab7e7930e001a25c178159e43b1.png"
        :show-bg="true"
        width="30px"
        height="30px"
        :num="parseInt(sdgm.tolite)"
        unit="个"
      />
      <left-item
        custom-style="width: 50%;padding-left: 26px;"
        title="建设总面积"
        src="https://img.hzanchu.com/acimg/22a0fe649955752ef9c5906914dc2457.png"
        :show-bg="true"
        width="30px"
        height="30px"
        :num="parseFloat(sdgm.area).toFixed(2)"
        unit="㎡"
        :decimals="2"
      />
    </div>

    <div ref="echarts1" class="map" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import RightTitle from './title.vue'
import LeftItem from '../left/item.vue'
import * as api from '@/service/liveable'
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
      echarts1: null,
      chart: null,
      sdgm: {
        area: 0,
        tolite: 0
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
        .livableProfessionalRevolution({
          app_id: '4473180',
          app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO'
        })
        .then((e) => {
          // console.log(e)
          if (e.code === 0) {
            this.sdgm = {
              area: e.data.sdgm[2].y + '',
              tolite: e.data.sdgm[1].y + ''
            }
            this.initChart(e.data.ljqx)
          } else {
            this.initChart([])
          }
        })
    },
    initChart: function(arr) {
      const year = new Date().getFullYear() + ''
      const dataX = []
      const dataY = []
      for (const item of arr) {
        if (item.z.indexOf(year) !== -1) {
          dataX.push(item.x)
          dataY.push(item.y)
        }
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
          name: '%',
          nameTextStyle: {
            color: 'rgba(255,255,255,1)'
          },
          splitNumber: 2,
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
          top: 'bottom',
          itemWidth: 30,
          itemHeight: 4,
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
            name: '垃圾分类暗访率（本年度）',
            data: dataY,
            type: 'line',
            color: '#35FDDC'
          }
        ]
      }

      this.chart = echarts.init(this.$refs.echarts1, 'custom-set')
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
._right1 {
  width: 100%;

  .total {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .map {
    width: 94%;
    margin-top: 24px;
    height: 149px;
    margin-left: 3%;
  }
}
</style>
