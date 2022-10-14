<template>
  <div class="center">
    <div class="top">
      <div v-for="(item, index) in list" :key="index" class="top-item">
        <img
          src="https://img.hzanchu.com/acimg/936f2066dfd9ae4602f3cccf40c8af4c.png"
          class="bg"
        >
        <div class="_num">
          <div class="_title">{{ item.title }}</div>
          <div class="_main">
            <countTo
              class="_value"
              :start-val="0"
              :end-val="item.num"
              :duration="1000"
              :decimals="item.decimals ? item.decimals : 0"
            />
            <span class="_unit">{{ item.unit }}</span>
          </div>
        </div>

        <!--
        <item
          :title="item.title"
          :num="item.num"
          :unit="item.unit"
          :size="1.4"
          custom-style="height: 85%"
        />
        -->

        <div v-if="item.slot" class="slot">
          <img
            :src="
              item.slot.value > 0
                ? 'https://img.hzanchu.com/acimg/a065ccdb4df70fb7b0d45057db605d4a.png'
                : 'https://img.hzanchu.com/acimg/1e8ce02409a3f4c00dd8de018749e6bb.png'
            "
            class="up"
          >
          <span>{{ item.slot.value }}%</span>
        </div>
      </div>
    </div>

    <LeafletMap
      class="map"
      :disable="true"
      :overview-data="overviewData"
      :location-name="currentLocationName"
      :special-villages="specialVillages"
      @loc-change="currentLocation = $event"
    />
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import Item from './components/left/item.vue'
import LeafletMap from '@/components/Dashboard/LeafletMap'
import _ from 'lodash'
import towns from '@/assets/dashboard/pinghu.json'
import villages from '@/assets/dashboard/points.json'
import {
  getNumberOfVillages,
  getOverviewInfo,
  getAppCoverage
} from '@/service/dashboard'
import { livableProfessionalPerIncome } from '@/service/liveable'
export default {
  components: { Item, LeafletMap, countTo },
  data() {
    return {
      list: [
        { title: '行政村', num: 0, unit: '个' },
        { title: '常驻人口', num: 0, unit: '万人', decimals: 2 },
        {
          title: '农村人均可支配收入',
          num: 0,
          unit: '元',
          slot: {
            value: 0
          }
        }
      ],
      // overviewData: [[[0]], []],
      overviewData: null,
      currentLocation: [1],
      locationList: new Map()
    }
  },
  computed: {
    currentLocationName() {
      if (Array.isArray(this.currentLocation)) {
        if (this.currentLocation.length === 1) {
          return ''
        } else {
          const prefix = this.currentLocation.length === 2 ? 't' : 'v'
          return this.locationList.get(
            `${prefix}${_.last(this.currentLocation)}`
          )
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
      console.debug(
        `switching to ${JSON.stringify(n)} --- ${JSON.stringify(o)}`
      )
      console.log(this.locationList)
      this.$emit('changeTown', this.currentLocation)
      this.getVillage()
    }
  },
  mounted() {
    this.locationList.set('c1', '平湖市')
    towns.features.forEach((feat) => {
      this.locationList.set(`t${feat.properties.id}`, feat.properties.name)
    })
    villages.features.forEach((feat) => {
      this.locationList.set(
        `v${_.last(feat.properties.ids)}`,
        feat.properties.village
      )
    })
    this.init()
  },
  destroyed() {},
  methods: {
    init: function() {
      const date = new Date()
      const year = date.getFullYear() + ''
      getNumberOfVillages(this.currentLocation, year).then((res) => {
        this.list[0].num = parseInt(res.data[0])
        this.overviewData = [[[res.data[0]]], []]
      })
      // 请求当前农村常住用户数量
      getOverviewInfo(this.currentLocation, year).then((res) => {
        // console.log(res)
        this.list[1].num = parseFloat(res.data.permanent_population[0])
      })

      livableProfessionalPerIncome({
        app_id: '4473180',
        app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO'
      }).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.list[2].num = parseInt(res.data[0].income)
          this.list[2].slot.value = res.data[0].percent
        }
      })
    },
    // 请求当前行政村数量
    getVillage: function() {
      const date = new Date()
      const year = date.getFullYear() + ''
      getAppCoverage(this.currentLocation, year).then((res) => {
        // console.log(res)
        this.overviewData = [[[res.data[0]]], []]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.center {
  // width: 1820px;
  flex: 1;
  height: 100%;
  margin-left: 50px;
  margin-right: 50px;
  overflow: hidden;

  .top {
    width: 100%;
    // padding: 0 20px;
    // box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .top-item {
      position: relative;
      width: 240px;
      height: 136px;
      padding-left: 10px;

      .bg {
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 0px;
        width: 240px;
        height: 136px;
      }

      .slot {
        position: absolute;
        z-index: 1;
        bottom: 16px;
        left: 24px;
        img {
          width: 9px;
          height: 12px;
        }
        span {
          margin-left: 8px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }

  ._num {
    flex: 1;
    margin-left: 11px;
    margin-top: 20px;

    ._title {
      max-width: 45px; // 暂时给一个45px宽度
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
    }

    ._main {
      margin-top: 16px;
       display: flex;
      flex-direction: row;
      align-items: center;
      ._value {
        font-size: 36px;
        font-family: YouSheBiaoTiHei;
        color: #65dcff;
        white-space: nowrap;
      }
      ._unit {
        margin-left: 10px;
        margin-top: 6px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        color: #fff;
      }
    }
  }

  .map {
    width: 100%;
    margin-top: 60px;
    height: 680px;
  }
}
</style>