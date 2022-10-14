<template>
  <div class="_left1">
    <title-bar title="乡村善治" />
    <div class="_total">
      <div class="_total-item">
        <item
          title="注册用户数"
          src="https://img.hzanchu.com/acimg/3c37e12e2a2e23ee3227c4d8f9bb3743.png"
          width="30px"
          height="30px"
          :num="obj.total"
          unit="人"
        />
      </div>
      <div class="_total-item">
        <item
          title="用户活跃度"
          src="https://img.hzanchu.com/acimg/3c37e12e2a2e23ee3227c4d8f9bb3743.png"
          width="30px"
          height="30px"
          :num="obj.avarage"
          unit="人/月"
        />
      </div>
    </div>

    <div class="_sub">
      <div class="_left-sub">
        <item
          title="善治积分贷授信农户数"
          src="https://img.hzanchu.com/acimg/fb6a43764f4dd69ca9b7d23657f6109f.png"
          :show-bg="true"
          width="30px"
          height="30px"
          :num="parseInt(data[0][0])"
          :unit="data[0][1]"
        />
      </div>
      <div class="_left-sub">
        <item
          title="授信金额"
          src="https://img.hzanchu.com/acimg/6dfbabe9a02d2446a14ed7fc0788214b.png"
          :show-bg="true"
          width="30px"
          height="30px"
          :num="parseFloat(data[1][0]).toFixed(2)"
          :unit="data[1][1]"
          :decimals="2"
        />
      </div>
      <div class="_left-sub">
        <item
          title="积分分红总额"
          src="https://img.hzanchu.com/acimg/38533f660c9159e63ba014fd3140a5ce.png"
          :show-bg="true"
          width="30px"
          height="30px"
          :num="parseFloat(data[2][0]).toFixed(2)"
          :unit="data[2][1]"
          :decimals="2"
        />
      </div>
      <div class="_left-sub">
        <item
          title="股份分红金额"
          src="https://img.hzanchu.com/acimg/69a23d2aefebc1d64c147565ddc278a2.png"
          :show-bg="true"
          width="30px"
          height="30px"
          :num="parseFloat(data[3][0]).toFixed(2)"
          :unit="data[3][1]"
          :decimals="2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item.vue'
import TitleBar from '../titleBar.vue'
import {
  getBonusData,
  getActiveUserData,
  getNumberOfRegisteredFamilies
} from '@/service/dashboard'
export default {
  components: { Item, TitleBar },
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
  },
  beforeDestroy() {},
  methods: {
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
  ._total {
    width: 100%;
    height: 76px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    ._total-item {
      width: 200px;
      height: 76px;
      padding: 0 24px;
      box-sizing: border-box;
      background: url(https://img.hzanchu.com/acimg/374cdc394db6ee361f9cd9b99970714a.png)
        no-repeat;
      background-size: 100%;
      background-size: cover;
    }
  }

  ._sub {
    width: 100%;
    padding-left: 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ._left-sub {
      width: 210px;
      margin-top: 24px;
      margin-left: 24px;
    }
  }
}
</style>