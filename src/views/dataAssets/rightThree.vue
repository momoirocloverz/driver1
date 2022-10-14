<template>
  <div class="right-three" id="rightThree" style="width:620px;height:168px;background:#fff;box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);"></div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'rightThree',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('rightThree'),'macarons')
      myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}'
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['已经采集', '正在采集', '预估未采集'],
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
                radius: '70%',
                center: ['45%', '50%'],
                data: [
                    {value: 347, name: '已经采集'},
                    {value: 468, name: '正在采集'},
                    {value: 1000, name: '预估未采集'}
                ],
                roseType: 'radius',
                label: {
                    color: '#333'
                },
                labelLine: {
                    lineStyle: {
                        color: '#333'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
      })
    }
  }
}
</script>