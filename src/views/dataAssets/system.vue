<template>
  <div class="system" id="system" style="width:303px;height:226px;background:#fff;box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);margin-left:13px;"></div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'system',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('system'),'macarons')
      myChart.setOption({
        title: {
          text: '数据采集系统（个）',
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
        legend: {
          orient: 'vertical',
          left: 'right',
          textStyle: {
            fontSize: 10,
            color: '#333'
          },
          padding: [
            10, 10, 0, 0
          ],
        },
        grid: {
          width: '80%',
          right: 15,
          bottom: 40
        },
        tooltip: {},
        dataset: {
            source: [
                ['product', '新建系统数量', '原有系统数量'],
                ['已经采集', 6, 6],
                ['正在采集', 3, 20],
                ['预估未采集', 24, 33]
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {
              type: 'bar',
              itemStyle: {
                barBorderRadius: [10, 10, 0, 0]
              },
              barWidth: '20%'
            },
            {
              type: 'bar',
              itemStyle: {
                barBorderRadius: [10, 10, 0, 0]
              },
              barWidth: '20%'
            },
        ]
      })
    }
  }
}
</script>