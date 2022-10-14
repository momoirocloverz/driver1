<template>
  <div class="makeUp" id="makeUp" style="width:303px;height:226px;background:#fff;box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);margin-left:13px;"></div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'makeUp',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('makeUp'),'macarons')
      myChart.setOption({
        title: {
          text: '已采集数据构成（GB）',
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
          data: ['结构化数据', '矢量、栅格数据', '图片、视频数据', 'Word文档数据'],
          textStyle: {
            fontSize: 10,
            color: '#333'
          },
          padding: [
            10, 10, 0, 0
          ],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['40%', '64%'],
            data: [
              {value: 591.3, name: '图片、视频数据'},
              {value: 9.5, name: '结构化数据'},
              {value: 100, name: '矢量、栅格数据'},
              
              {value: 1.5, name: 'Word文档数据'},
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