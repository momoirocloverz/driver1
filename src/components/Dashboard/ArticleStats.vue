<template>
  <div class="container">
    <new-header :title="`${locationName}三务公开`" />
    <div class="content">
      <StatsItem :icon="require('@/assets/dashboard/single_stack.png')" label="村务" :value="processedData[0]" unit="篇" />
      <StatsItem :icon="require('@/assets/dashboard/single_stack.png')" label="党务" :value="processedData[1]" unit="篇" />
      <StatsItem :icon="require('@/assets/dashboard/single_stack.png')" label="财务" :value="processedData[2]" unit="篇" />
    </div>
<!--    &lt;!&ndash;    <div class="title">{{ locationName }}三务公开发布量</div>&ndash;&gt;-->
<!--    <div ref="chart" class="chart" />-->
  </div>
</template>

<script>
// import * as echarts from 'echarts'
import '@/assets/js/echart-custom-theme'
import { getArticleStats } from '@/service/dashboard'
import _ from 'lodash'
import NewHeader from '@/components/Dashboard/sub-components/NewHeader'
import StatsItem from "@/components/Dashboard/sub-components/StatsItem";

export default {
  name: 'ArticleStats',
  components: {StatsItem, NewHeader },
  props: {
    location: {
      type: Array,
      default: () => [1]
    },
    locationName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      data: {}
    }
  },
  watch: {
    location(newLocation) {
      this.getData(newLocation)
    }
  },
  mounted() {
    // this.chart = echarts.init(this.$refs.chart, 'custom-set')
    this.getData(this.location)
  },
  beforeDestroy() {
    // this.chart?.dispose()
    // this.chart = null
  },
  computed: {
    processedData() {
      return [this.data?.village_affairs ?? '-', this.data?.party_affairs ?? '-', this.data?.finance_affairs ?? '-']
    }
  },
  methods: {
    getData(location) {
      getArticleStats(location).then(result => {
        this.data = result.data
        // const { data } = result
        // const option = {
        //   tooltip: {
        //     textStyle: {
        //       fontSize: 20
        //     }
        //   },
        //   grid: {
        //     bottom: '10%'
        //   },
        //   xAxis: {
        //     type: 'category',
        //     data: ['村务', '党务', '财务'],
        //     splitLine: {
        //       show: true,
        //       lineStyle: {
        //         opacity: 0.5
        //       }
        //     },
        //     axisLabel: {
        //       // formatter: '{value} 次',
        //       fontSize: 16
        //     }
        //   },
        //   yAxis: [
        //     {
        //       type: 'value',
        //       name: '篇',
        //       nameTextStyle: {
        //         fontSize: 20
        //       },
        //       position: 'left',
        //       splitNumber: 4,
        //       splitLine: {
        //         show: false
        //       },
        //       axisLabel: {
        //         // formatter: '{value} 分',
        //         fontSize: 17
        //       }
        //     }
        //   ],
        //   series: [
        //     {
        //       name: '打分次数',
        //       type: 'bar',
        //       data: [
        //         { value: data.village_affairs, itemStyle: { color: '#1890ff' }},
        //         { value: data.party_affairs, itemStyle: { color: '#18bea3' }},
        //         { value: data.finance_affairs, itemStyle: { color: '#ffec3b' }}],
        //       label: {
        //         show: true,
        //         position: 'top',
        //         valueAnimation: true,
        //         color: 'white',
        //         fontSize: 18
        //       }
        //     }
        //   ]
        // }
        // this.chart.setOption(option)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  row-gap: 10px;
  .title{
    font-size: 50px;
    font-family: YouSheBiaoTiHei;
    //font-weight: bold;
    text-align: left;
    color: #54daf7;
    letter-spacing: 3px;
    white-space: nowrap;
    //margin-bottom: 50px;
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
  }
  .chart{
    height: 600px;
    width: 100%;
  }
}
</style>
