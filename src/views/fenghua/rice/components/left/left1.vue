<template>
  <div class="_left1">
    <title-bar title="粮食预警" />
    <div class="main">
      <div class="top">
        <div class="target">目标</div>
        <div class="progress">进度</div>
        <div class="result">状态</div>
      </div>

      <left-1-item
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :value="item.value"
        :unit="item.unit"
        :percent="item.percent"
        :status="item.status"
      />
    </div>
  </div>
</template>

<script>
import TitleBar from '../titleBar.vue'
import {
  getBonusData,
  getActiveUserData,
  getNumberOfRegisteredFamilies
} from '@/service/dashboard'
import Left1Item from './left1Item.vue'
import bus from '@/utils/bus.js'
import { hxzb } from '../../data/data.js'
export default {
  components: { TitleBar, Left1Item },
  props: {
    location: {
      type: Array,
      default: () => [1]
    }
  },
  data() {
    return {
      obj: {
        avarage: 0,
        total: 0
      },
      list: [
        {
          title: '粮食种植面积',
          value: '',
          unit: '万亩',
          percent: 0,
          status: '正常'
        },
        {
          title: '粮食产量',
          value: '',
          unit: '万公斤',
          percent: 0,
          status: '正常'
        }
      ],

      data: [
        ['-', ''],
        ['-', ''],
        ['-', ''],
        ['-', '']
      ]
    }
  },
  watch: {
    location(newLocation) {
      this.reload(newLocation)
    }
  },

  mounted() {
    const date = new Date()
    const year = date.getFullYear() - 1
    // 请求4大块数据
    getBonusData(this.location, year).then((results) => {
      // console.log(results)
      this.data = results.map((r) => r.data)
      this.data[0][0] = 59387
    })
    this.init('奉化区')
    bus.$on('changeArea', (val) => {
      console.log(val)
      this.init(val)
    }) //
  },
  beforeDestroy() {
    bus.$off('changeArea') // 移除
  },
  methods: {
    init: function(address) {
      // this.currentLocation
      for (const item of hxzb) {
        if (item.address == address) {
          this.list[0].value = parseFloat(parseFloat(item.lsbzmj_mb) / 10000).toFixed(2)
          this.list[0].percent = item.lsbzmj_jd.substring(
            0,
            item.lsbzmj_jd.length - 1
          )
          this.list[0].status = item.lsbzmj_mbwczt

          this.list[1].value = parseFloat(parseFloat(item.lscl_mb) / 10000).toFixed(2)
          this.list[1].percent = item.lscl_jd.substring(
            0,
            item.lscl_jd.length - 1
          )
          this.list[1].status = item.lscl_mbwczt
          break
        }
      }
    },
    // 重新加载
    reload: function(location) {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      // 请求当前注册用户数量
      getNumberOfRegisteredFamilies(location, year).then((res) => {
        // console.log(res)
        this.obj.total = parseInt(res.data[0])
      })
      // 请求当前用户活跃度 并且求总和
      const from = year + '-' + (month < 10 ? '0' + month : month)
      var days = new Date(year, month, 0).getDate()
      getActiveUserData(location, from + '-01', from + '-' + days).then((e) => {
        console.log(e)
        if (e.code === 0) {
          let total = 0
          if (Array.isArray(e.data)) {
            for (const item of e.data) {
              total += parseInt(item.nums)
            }
          }
          // console.log(total)
          // this.obj.avarage = parseFloat(total / days).toFixed(0)
          this.obj.avarage = parseInt(total)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
._left1 {
  width: 100%;
  .main {
    width: 100%;
    padding-left: 37px;
    box-sizing: border-box;
    .top {
      width: 100%;
      margin-top: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      color: #cbe7ff;
      .target {
        width: 146px;
      }
      .progress {
        width: 166px;
        margin-left: 20px;
      }
      .result {
        width: 0;
        flex: 1;
        margin-left: 20px;
      }
    }
  }
}
</style>
