<template>
  <div class="container">
    <div class="stats-row">
<!--      <new-stat-item-->
<!--        label="覆盖行政村"-->
<!--        :value="processedData[0][0][0]"-->
<!--        :unit="processedData[0][0][1]"-->
<!--        :sub-items="[{label: '总行政村', value:processedData[1][0][0], unit: processedData[1][0][1]}]"-->
<!--      />-->
      <new-stat-item
        label="覆盖家庭"
        :value="processedData[0][1][0]"
        :unit="processedData[0][1][1]"
        :sub-items="[{label: '总户数', value:processedData[1][1][0], unit: processedData[1][1][1]}]"
      />
      <new-stat-item
        label="注册用户数"
        :value="processedData[0][2][0]"
        :unit="processedData[0][2][1]"
        :sub-items="[{label: '农村常住人口', value:processedData[1][2][0], unit: processedData[1][2][1]}]"
      />
      <new-stat-item
        label="累计股金分红总额"
        :value="processedData[1][3][0][0]"
        :unit="processedData[0][3][1]"
        :sub-items="[
          // {label: '累计股份分红', value: Number(processedData[1][3][0][0]) - Number(processedData[1][3][1][0]), unit: processedData[1][3][0][1]},
        {label: '累计积分分红', value:processedData[1][3][1][0], unit: processedData[1][3][1][1]}]"
      />
      <new-stat-item
        label="善治贷授信总额"
        :value="115.93"
        :unit="processedData[0][4][1]"
        :sub-items="[{label: '村覆盖率', value:processedData[1][4][0], unit: processedData[1][4][1]}]"
      />
      <!--      <KeyStatsItem-->
      <!--        key="1"-->
      <!--        label="覆盖行政村"-->
      <!--        :value="processedData[0][0][0]"-->
      <!--        :unit="processedData[0][0][1]"-->
      <!--      />-->
      <!--      <KeyStatsItem-->
      <!--        key="2"-->
      <!--        label="覆盖家庭"-->
      <!--        :value="processedData[0][1][0]"-->
      <!--        :unit="processedData[0][1][1]"-->
      <!--      />-->
      <!--      <KeyStatsItem-->
      <!--        key="3"-->
      <!--        label="注册用户数"-->
      <!--        :value="processedData[0][2][0]"-->
      <!--        :unit="processedData[0][2][1]"-->
      <!--      />-->
      <!--      <KeyStatsItem-->
      <!--        key="4"-->
      <!--        :label="`2020年股金分红总额`"-->
      <!--        :value="processedData[0][3][0]"-->
      <!--        :unit="processedData[0][3][1]"-->
      <!--      />-->
      <!--      <KeyStatsItem-->
      <!--        key="5"-->
      <!--        label="善治积分贷总授信金额"-->
      <!--        :value="processedData[0][4][0]"-->
      <!--        :unit="processedData[0][4][1]"-->
      <!--      />-->
    </div>
    <!--    <div class="stats-row">-->
    <!--      <MinorStatItem-->
    <!--        key="1"-->
    <!--        label="总行政村"-->
    <!--        :value="processedData[1][0][0]"-->
    <!--        :unit="processedData[1][0][1]"-->
    <!--      />-->
    <!--      <MinorStatItem-->
    <!--        key="2"-->
    <!--        label="总户数"-->
    <!--        :value="processedData[1][1][0]"-->
    <!--        :unit="processedData[1][1][1]"-->
    <!--      />-->
    <!--      <MinorStatItem-->
    <!--        key="3"-->
    <!--        label="农村常住人口"-->
    <!--        :value="processedData[1][2][0]"-->
    <!--        :unit="processedData[1][2][1]"-->
    <!--      />-->
    <!--      <div class="special-minor-item-container">-->
    <!--        <div class="special-minor-item">-->
    <!--          <div class="label">累计股份分红</div>-->
    <!--          <div class="value">-->
    <!--            <div class="number">{{ processedData[1][3][0][0] }}</div>-->
    <!--            <div class="unit">{{ processedData[1][3][0][1] }}</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="special-minor-item">-->
    <!--          <div class="label">累计积分分红</div>-->
    <!--          <div class="value">-->
    <!--            <div class="number">{{ processedData[1][3][1][0] }}</div>-->
    <!--            <div class="unit">{{ processedData[1][3][1][1] }}</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <MinorStatItem-->
    <!--        key="5"-->
    <!--        label="覆盖面"-->
    <!--        :value="processedData[1][4][0]"-->
    <!--        :unit="processedData[1][4][1]"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script>
import KeyStatsItem from '@/components/Dashboard/sub-components/KeyStatsItem'
import MinorStatItem from '@/components/Dashboard/sub-components/MinorStatsItem'
import NewStatItem from '@/components/Dashboard/sub-components/NewStatItem'
export default {
  name: 'OverviewSection',
  components: { NewStatItem, MinorStatItem, KeyStatsItem },
  props: {
    data: {
      type: Array,
      default: () => [[], []]
    }
  },
  computed: {
    processedData() {
      return this.data.map((row, rIdx) => {
        if (row.length < 5) {
          const empty = Array(5).fill([])
          if (rIdx === 1) {
            empty[3] = [['-'], ['-']]
          }
          return empty
        } else return row.map((e, i) => (e ?? (rIdx === 1 ? [['-'], ['-']] : [])))
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  row-gap: 5px;
  .stats-row {
    //display: grid;
    //grid-template-columns: 260px 260px 260px 1fr 260px;
    //column-gap: 15px;
    display: flex;
    justify-content: space-around;
    column-gap: 5px;
  }
  .special-minor-item-container {
    display: flex;
    width: 100%;
    overflow: hidden;
    padding: 15px 30px;
    justify-content: space-between;
    background-image: url("../../assets/dashboard/border.png");
    background-size: 100% 100%;
    .special-minor-item{
      display: flex;
      flex-flow: column nowrap;
      row-gap: 5px;
      .label {
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        text-align: left;
        color: #ffffff;
      }
      .value {
        display: flex;
        .number {
          font-size: 30px;
          font-family: YouSheBiaoTiHei;
          font-weight: bold;
          text-align: left;
          color: #ffffff;
          //text-shadow: 0px 2px 18px 0px rgba(19,128,255,0.84);
        }
        .unit {
          align-self: flex-end;
          opacity: 0.8;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          text-align: left;
          color: #f9fbfe;
          margin-left: 9px;
          margin-bottom: 5px;
        }
      }
    }

  }
}
</style>
