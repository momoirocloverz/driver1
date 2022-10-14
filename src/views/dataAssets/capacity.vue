<template>
  <div class="capacity" id="capacity"></div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'capacity',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('capacity'), 'macarons')
      myChart.setOption({
        title: {
          text: '数据采集容量（GB）',
          left: 'left',
          textStyle: {
            color: '#3c3c3c',
            fontSize: 12,
            fontWeight: 400
          },
          padding: [
            10, 0, 0, 10
          ],
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          padding: [
            10, 10, 0, 0
          ],
          data: ['已经采集', '正在采集', '预估未采集'],
          textStyle: {
            fontSize: 10,
            color: '#333'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '65%'],
            data: [
              {value: 1000, name: '预估未采集'},
              {value: 705.8, name: '正在采集'},
              {value: 200, name: '已经采集'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .capacity {
    width: 1081px;
    height: 663px;
    background:#fff;
    box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);
  }
</style>