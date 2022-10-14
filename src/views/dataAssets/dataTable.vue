<template>
  <div class="dataTable" id="dataTable" style="width:303px;height:226px;background:#fff;box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);margin-left:13px;"></div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'dataTable',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('dataTable'),'macarons')
      myChart.setOption({
        title: {
          text: '数据表个数（个）',
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
        tooltip: {},
        grid: {
          width: '80%',
          right: 15,
          bottom: 40
        },
        xAxis: {
            type: 'category',
            data: ['已采集', '正在采集', '预估未采集']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [347, 468, 1000],
            type: 'bar',
            itemStyle: {
              barBorderRadius: [10, 10, 0, 0]
            },
            barWidth: '20%'
        }]
      })
    }
  }
}
</script>