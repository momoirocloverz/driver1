<template>
  <div class="right-two" id="rightTwo" style="width:620px;height:168px;background:#fff;box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);"></div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'rightTwo',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('rightTwo'),'macarons')
      myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}'
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['政务涉密数据', '公网一般数据'],
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
                radius: ['60%', '80%'],
                center: ['45%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 225, name: '政务涉密数据'},
                    {value: 296, name: '公网一般数据'}
                ]
            }
        ]
      })
    }
  }
}
</script>