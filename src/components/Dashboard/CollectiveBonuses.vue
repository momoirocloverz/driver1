<template>
  <div class="container">
    <!--    <div class="title">{{locationName}}2020年集体分红</div>-->
    <new-header :title="`${locationName}${new Date().getFullYear() - 1}年股金分红`" />
    <div class="stats">
      <StatsItem
        :icon="Icons.Folder"
        label="分红户数"
        :value="data[0][0]"
        :unit="data[0][1]"
      />
      <StatsItem
        :icon="Icons.Offer"
        label="股金分红"
        :value="data[1][0]"
        :unit="data[1][1]"
      />
      <StatsItem
        :icon="Icons.Coin"
        label="积分分红"
        :value="data[2][0]"
        :unit="data[2][1]"
      />
      <StatsItem
        :icon="Icons.Stacks"
        label="股份分红"
        :value="data[3][0]"
        :unit="data[3][1]"
      />
    </div>
    <ScrollingBoardEV class="scrolling-board" title="分红排行TOP20" :column-widths="[90, 90]" :source="boardData" />
  </div>
</template>

<script>
import ScrollingBoardEV from '@/components/Dashboard/sub-components/ScrollingBoardEV'
import StatsItem from './sub-components/StatsItem'
import { Folder, Offer, Coin, Stacks } from './icons'
import { getBonusBoardData, getBonusData } from '@/service/dashboard'
import _ from 'lodash'
import NewHeader from '@/components/Dashboard/sub-components/NewHeader'

export default {
  name: 'CollectiveBonuses',
  components: { NewHeader, ScrollingBoardEV, StatsItem },
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
      data: [['-', ''], ['-', ''], ['-', ''], ['-', '']],
      boardData: []
    }
  },
  computed: {
    Icons() {
      return { Folder, Offer, Coin, Stacks }
    }
  },
  watch: {
    location(newLocation) {
      this.getData(newLocation)
    }
  },
  methods: {
    getData(location) {
      const year = new Date().getFullYear() - 1
      getBonusData(location, year).then(results => {
        this.data = results.map(r => r.data);
        // 修改假数据
        // if(location.length >= 2 && location[1] == 2) {
        //   if(location.length == 2) {
        //     this.data = [['5115', '户'], ['95', '万元'], ['18', '万元'], ['77', '万元']]
        //   } else {
        //     if(location[2] == 12) {
        //       this.data = [['1876', '户'], ['30', '万元'], ['6', '万元'], ['24', '万元']]
        //     } else if(location[2] === 9) {
        //       this.data = [['1508', '户'], ['30', '万元'], ['6', '万元'], ['24', '万元']]
        //     } else if(location[2] === 10) {
        //       this.data = [['1731', '户'], ['35', '万元'], ['6', '万元'], ['29', '万元']]
        //     }
        //   }
        // } else {
        //   this.data = results.map(r => r.data);
        // }
      })
      getBonusBoardData(location, year).then(result => {
        this.boardData =
          [{
            header: ['家庭户主', '地址', '积分分红', '股份分红', '总分红'],
            data: Array.isArray(result.data) ? result.data.map(e => ([e.owner_name,
              _.last(e.area_name.split('/')), e.integral_bonus, e.dividend, e.all_money])) : []
          }]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  flex: 1;
  display: flex;
  flex-flow: column;
  row-gap: 10px;
  //grid-template:  "title board" 50px
  //                "stats board" auto / 1fr 1fr;
  .title{
    grid-area: title;
    font-size: 50px;
    font-family: YouSheBiaoTiHei;
    //font-weight: bold;
    text-align: center;
    color: #54daf7;
    letter-spacing: 3px;
  }
  .stats{
    grid-area: stats;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    padding-left: 20px;
  }
  .scrolling-board{
    //grid-area: board;
    flex: 1;
  }
}
</style>
