<template>
  <div class="page">
    <div class="header">
<!--      <a href="http://zrzy.phxmgl.cn/pinghu-web/index.html" class="header-link&#45;&#45;left">地域信息一张图</a>-->
      <span class="header-text">平湖市农村生活垃圾数字化监管云平台</span>
<!--      <a href="http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjI5Nn0=" class="header-link&#45;&#45;right">数据资产</a>-->
    </div>
    <Pane
      class="pane-1"
      :title="`${currentLocationName}今日数据`"
      use-datepicker
      @change-date="(value)=>date=value"
    >
      <template>
        <Overview :date="date" :location-name="currentLocationName" />
      </template>
      <template #header-row>
        <custom-datepicker
          :date.sync="date"
          :show-options="false"
        />
      </template>
    </Pane>
    <Pane class="pane-2" :title="`${currentLocationName}准确率`">
      <AccuracyChart :location-name="currentLocationName" :location="currentLocation" :date="accuracyDate" :date-type="accuracyDateType" />
      <template #header-row>
        <custom-datepicker
          :date.sync="accuracyDate"
          :value-type.sync="accuracyDateType"
          :datepicker-options="[{ label: '单日', value: 'date', valueFormat: 'yyyy-MM-dd' }, { label: '单月', value: 'month', valueFormat: 'yyyy-MM' }]"
        />
      </template>
    </Pane>
    <Pane class="pane-3" :title="`${currentLocationName}分时投放情况`">
      <template #header-row>
        <custom-rangepicker
          :date.sync="aggregationDate"
          :value-type.sync="aggregationDateType"
          :datepicker-options="[{ label: '日', value: 'date', valueFormat: 'yyyy-MM-dd' },
                                { label: '月', value: 'month', valueFormat: 'yyyy-MM' },
                                { label: '年', value: 'year', valueFormat: 'yyyy' }]"
        />
      </template>
      <template>
        <LiveWasteGenerationChart :date-range="aggregationDate" :date-type="aggregationDateType" :location-name="currentLocationName" />
      </template>
    </Pane>
    <!-- =================== -->
    <LeafletMap
      class="pane-4"
      :location-name="currentLocationName"
      :special-villages="this.specialVillages"
      :marker-scale="0.8"
      :text-scale="0.5"
      :marker-icon="{icon:icons.Settlement, size: [26, 32]}"
      :accuracy-list="accuracyList"
      @loc-change="currentLocation = $event"
    />
    <Pane class="pane-5" :title="`${currentLocationName || '各镇街道'}垃圾分类情况`">
      <template>
        <DistrictDetails :date="date" :location-name="currentLocationName" :location-path="currentLocation" @update:accuracies="accuracyList = $event" />
      </template>
    </Pane>
    <!-- =================== -->
    <Pane class="pane-6" title="垃圾车辆轨迹">
      <truck-route-map />
    </Pane>
    <Pane class="pane-7" :title="`${currentLocationName}当日预警`">
      <WasteCategories :date="date" :location-name="currentLocationName" show-failed-only />
    </Pane>
    <Pane class="pane-8" :title="`${currentLocationName}七日预警`">
      <template v-slot:header-row>
        <el-checkbox-button v-model="showLiveData" class="toggle-failing-ones" label="实时垃圾分类" />
        <el-popover
          placement="top"
          title="计算规则"
          popper-class="toggle-popover"
          trigger="click"
          content="7天内垃圾分类不合格次数超过2次的人员"
        >
          <i slot="reference" class="el-icon-question popover-icon" />
        </el-popover>
      </template>
      <template>
        <WasteCategories :date="date" :location-name="currentLocationName" :live="showLiveData" show-download-btn />
      </template>
    </Pane>
  </div>
</template>

<script>
import LeafletMap from '@/components/WasteManagement/LeafletMap'
import { Gift, Minus, Pie, Plus, SingleStack, Star, Transfer } from '@/components/Dashboard/icons'
import Settlement from '@/assets/waste-management/settlement.png'
import _ from 'lodash'
import towns from '@/assets/dashboard/pinghu.json'
import villages from '@/assets/dashboard/points.json'
import Pane from '@/components/WasteManagement/Pane'
import DistrictDetails from '@/components/WasteManagement/DistrictDetails'
import Overview from '@/components/WasteManagement/Overview'
import AccuracyChart from '@/components/WasteManagement/AccuracyChart'
import LiveWasteGenerationChart from '@/components/WasteManagement/LiveWasteGenerationChart'
import WasteCategories from '@/components/WasteManagement/WasteCategories'
import TruckRouteMap from '@/components/WasteManagement/SubComponents/truckRouteMap'
import CustomDatepicker from '@/components/WasteManagement/SubComponents/CustomDatepicker'
import { format, subDays } from 'date-fns'
import CustomRangepicker from '@/components/WasteManagement/SubComponents/CustomRangepicker'

export default {
  name: 'WasteManagement',
  components: {
    CustomRangepicker,
    CustomDatepicker,
    TruckRouteMap,
    WasteCategories,
    LiveWasteGenerationChart,
    AccuracyChart,
    Overview,
    DistrictDetails,
    LeafletMap,
    Pane
  },
  data() {
    return {
      currentLocation: [1],
      locationList: new Map(),
      systemDate: format(new Date(), 'yyyy-MM-dd'),
      date: format(new Date(), 'yyyy-MM-dd'),
      accuracyDate: format(new Date(), 'yyyy-MM-dd'),
      accuracyDateType: 'date',
      aggregationDate: [format(subDays(new Date(), 7), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd')],
      aggregationDateType: 'date',
      showLiveData: false,
      accuracyList: { path: [1], data: [] },
      timer: null
    }
  },
  computed: {
    icons() {
      return { Plus, Minus, Star, Gift, Transfer, Pie, Settlement }
    },
    currentLocationName() {
      if (Array.isArray(this.currentLocation)) {
        if (this.currentLocation.length === 1) {
          return ''
        } else {
          const prefix = this.currentLocation.length === 2 ? 't' : 'v'
          return this.locationList.get(`${prefix}${_.last(this.currentLocation)}`)
        }
      } else {
        return ''
      }
    },
    specialVillages() {
      if (this.currentLocation.length === 3) {
        return [this.currentLocationName]
      }
      return []
    }
  },
  watch: {
    currentLocation(n, o) {
      // console.debug(`switching to ${JSON.stringify(n)}`)
    }
  },
  mounted() {
    this.locationList.set('c1', '平湖市')
    towns.features.forEach(feat => {
      this.locationList.set(`t${feat.properties.id}`, feat.properties.name)
    })
    villages.features.forEach(feat => {
      this.locationList.set(`v${_.last(feat.properties.ids)}`, feat.properties.village)
    })
    this.timer = setInterval(this.checkSystemDate, 60 * 60 * 1000)
  },
  beforeDestroy() {
  },
  methods: {
    async getData() {
    },
    checkSystemDate() {
      const currentSystemDate = format(new Date(), 'yyyy-MM-dd')
      if (currentSystemDate !== this.systemDate) {
        this.systemDate = currentSystemDate
        this.date = currentSystemDate
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  display: grid;
  width: 100vw;
  height: 100vh;
  background: url("../../assets/subsidies/bg.webp") no-repeat;
  background-size: 100% 100%;
  padding: 2vh 2vw;
  overflow: hidden;
  grid-template:  "header header header" 6vh
                  "left-1 mid-1 right-1" 29vh
                  "left-2 mid-1 right-2" 18vh
                  "left-2 mid-2 right-2" 10vh
                  "left-3 mid-2 right-3" 29vh / 27vw 38vw 25vw;
  row-gap: 1vh;
  column-gap: 2vw;
  .header {
    background: url('../../assets/subsidies/header-bg.webp') no-repeat;
    background-size: 140% 100%;
    background-position-x: center;
    height: 100%;
    display: flex;
    align-items: center;
    grid-area: header;
    font-family: "HuXiaoBo-NanShenTi2.0";
    .header-text {
      flex: 1;
      color: white;
      background: linear-gradient(0deg,#b5f5ff 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 3.6vh;
      line-height: 6vh;
      text-align: center;
      font-weight: 700;
      letter-spacing: 3px;
    }
    .header-link--left {
      width: 20vw;
      color: white;
      font-size: 2vh;
      text-align: right;
      letter-spacing: 0.25em;
      padding-bottom: 0.75vh;
    }
    .header-link--right {
      width: 20vw;
      color: white;
      font-size: 2vh;
      letter-spacing: 0.25em;
      padding-bottom: 0.75vh;
    }
  }
  .pane-1 {
    grid-area: left-1;
  }
  .pane-2 {
    grid-area: left-2;
  }
  .pane-3 {
    grid-area: left-3;
  }
  .pane-4 {
    grid-area: mid-1;
  }
  .pane-5 {
    grid-area: mid-2;
    height: calc(100% - 4.26vh - 1vh);
  }
  .pane-6 {
    grid-area: right-1;
  }
  .pane-7 {
    grid-area: right-2;
  }
  .pane-8 {
    grid-area: right-3;
  }
}
</style>

<style lang="scss">
.page {
  .pane-8 {
    .el-checkbox-button.toggle-failing-ones {
      transition: color 1s ease-in-out;
      margin-left: auto;

      .el-checkbox-button__inner {
        font-size: 1.8vh;
        box-shadow: none;
        background: transparent;
        border: none;
        color: white;
        text-shadow: 2px 0 0 black, -2px 0 0 black, 0 2px 0 black, 0 -2px 0 black;
      }

      &.is-checked {
        .el-checkbox-button__inner {
          color: white;
          text-shadow: 2px 0 0 red, -2px 0 0 red, 0 2px 0 red, 0 -2px 0 red;
        }
      }
    }
    .popover-icon {
      color: white;
      font-size: 1.8vh;
      margin-right: 1vw;
    }
  }
}
.toggle-popover{
  font-size: 1.5vh;
  .el-popover__title{
    font-size: 1.8vh;
  }
}
</style>
