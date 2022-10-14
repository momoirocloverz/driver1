<template>
  <div class="gather" id="gather" style="width:303px;height:226px;background:#fff;box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);margin-left:13px;"></div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'gather',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('gather'),'macarons')
      myChart.setOption({
        tooltip: {},
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
            center: ['50%', '80%'],
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
        }]
      })
    }
  }
}
</script>