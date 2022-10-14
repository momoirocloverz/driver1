<template>
  <div class="container">
<!--    <div class="header">-->
<!--      善治积分高分户兑换福利-->
<!--    </div>-->
    <new-header title="善治积分高分户兑换福利" />
    <div class="content">
      <StatsItem v-for="item in data" :key="item.id" :icon="item.icon" :label="item.label" :value="item.value" :unit="item.unit" />
    </div>
  </div>
</template>

<script>
import StatsItem from '@/components/Dashboard/sub-components/StatsItem'
import { Gift, Pie, Transfer } from '@/components/Dashboard/icons'
import {getPointBoardData, getPointChartData, getPointRewardData} from "@/service/dashboard";
import NewHeader from "@/components/Dashboard/sub-components/NewHeader";
// import Transfer from '@/assets/dashboard/transfer.png'
// import Gift from '@/assets/dashboard/gift.png'
// import Pie from '@/assets/dashboard/pie.png'

export default {
  name: 'PointRewardProgram',
  components: {NewHeader, StatsItem },
  props: {
    location: {
      type: Array,
      default: () => [1]
    }
  },
  data() {
    return {
      data: [
        { id: 1, icon: Gift, label: '已兑换福利数量', value: '-', unit: '个' },
        { id: 2, icon: Transfer, label: '已兑换福利家庭', value: '-', unit: '户' },
        { id: 3, icon: Pie, label: '已兑换福利家庭占比', value: '-', unit: '%' }
      ]
    }
  },
  watch: {
    location(newLocation) {
      this.getData(newLocation)
    }
  },
  mounted() {
    this.getData(this.location);
  },
  methods: {
    getData(location) {
      getPointRewardData(location).then(result => {
        this.data = [
          { id: 1, icon: Gift, label: '已兑换福利数量', value: result[0].data[0], unit: result[0].data[1] },
          { id: 2, icon: Transfer, label: '已兑换福利家庭', value: result[1].data[0], unit: result[1].data[1] },
          { id: 3, icon: Pie, label: '已兑换福利家庭占比', value: result[2].data[0], unit: result[2].data[1] }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 30px 15px;
  row-gap: 40px;
  .header{
    font-size: 50px;
    font-family: YouSheBiaoTiHei;
    //font-weight: bold;
    text-align: left;
    color: #54daf7;
    letter-spacing: 3px;
    margin-bottom: 45px;
  }
  .content{
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 50px;
  }
}
</style>
