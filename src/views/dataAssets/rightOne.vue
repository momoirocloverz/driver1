<template>
  <div class="right-one" id="rightOne" style="width:620px;height:180px;background:#fff;box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);"></div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'rightOne',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('rightOne'),'macarons')
      myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}"
        },
        
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['待进行','已完成','正在进行'],
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
                name:'漏斗图',
                type:'funnel',
                left: '15%',
                top: 20,
                //x2: 80,
                bottom: 60,
                width: '60%',
                height: '85%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                // label: {
                //     show: true,
                //     position: 'inside'
                // },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 12
                    }
                },
                data: [
                    {value: 282, name: '待进行'},
                    {value: 45, name: '已完成'},
                    {value: 20, name: '正在进行'}
                ]
            }
        ]
      })
    }
  }
}
</script>