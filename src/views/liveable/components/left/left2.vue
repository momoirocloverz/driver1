<template>
  <div class="_left2">
    <title-bar title="农村垃圾分类" />

    <div class="_sub">
      <div class="_left-sub">
        <item
          title="垃圾分类总用户数"
          src="https://img.hzanchu.com/acimg/0e5e65c2fde6d68a694c2f74e47ba52e.png"
          width="28px"
          height="30px"
          :num="obj.all_user_count"
          unit="户"
        />
        <img
          src="https://img.hzanchu.com/acimg/715d1a011280f58c0ddc2ff730ade721.png"
          class="bg"
        >
      </div>
      <div class="_left-sub">
        <item
          title="垃圾收集量"
          src="https://img.hzanchu.com/acimg/0e5e65c2fde6d68a694c2f74e47ba52e.png"
          width="28px"
          height="30px"
          :num="obj.rubbish_all"
          unit="吨"
          :decimals="1"
        />
        <img
          src="https://img.hzanchu.com/acimg/715d1a011280f58c0ddc2ff730ade721.png"
          class="bg"
        >
      </div>
      <div class="_left-sub">
        <item
          title="垃圾分类收集率"
          src="https://img.hzanchu.com/acimg/0e5e65c2fde6d68a694c2f74e47ba52e.png"
          width="28px"
          height="30px"
          :num="obj.partake_rate"
          unit="%"
          :decimals="2"
        />
        <img
          src="https://img.hzanchu.com/acimg/715d1a011280f58c0ddc2ff730ade721.png"
          class="bg"
        >
      </div>
      <div class="_left-sub">
        <item
          title="垃圾分类准确率"
          src="https://img.hzanchu.com/acimg/0e5e65c2fde6d68a694c2f74e47ba52e.png"
          width="28px"
          height="30px"
          :num="obj.ture_rate"
          unit="%"
          :decimals="2"
        />
        <img
          src="https://img.hzanchu.com/acimg/715d1a011280f58c0ddc2ff730ade721.png"
          class="bg"
        >
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item.vue'
import TitleBar from '../titleBar.vue'
import { getOverviewData } from '@/service/wasteManagement'
import { format } from 'date-fns'
export default {
  components: { Item, TitleBar },
  props: {
    locationName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      obj: {
        all_user_count: 0,
        rubbish_all: 0,
        partake_rate: 0.0,
        ture_rate: 0.0
      }
    }
  },
  watch: {
    locationName(newLocationName) {
      // console.log('newLocationName' + newLocationName)
      this.reload(newLocationName)
    }
  },

  mounted() {
    this.reload('')
  },
  beforeDestroy() {},
  methods: {
    // 重新加载
    reload: function(name) {
      // this.isLoading = true;
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDay()
      console.log(day)
      getOverviewData({
        regionName: name,
        date: format(new Date(), 'yyyy-MM-dd')
        // date: year + '-' + month + '-' + day
      })
        .then((result) => {
          if (result.code !== 0) {
            throw new Error(result.msg)
          }
          if (name !== this.locationName) {
            return
          }
          // console.log(result)
          if (result.data.all_user_count) {
            this.obj = {
              all_user_count: parseInt(result.data.all_user_count),
              rubbish_all: parseFloat(result.data.rubbish_all).toFixed(1),
              partake_rate: parseFloat(result.data.partake_rate).toFixed(2),
              ture_rate: parseFloat(result.data.ture_rate).toFixed(2)
            }
            console.log(parseFloat(result.data.rubbish_all).toFixed(1))
          } else {
            this.obj = {
              all_user_count: 0,
              rubbish_all: 0.0,
              partake_rate: 0.0,
              ture_rate: 0.0
            }
          }
        })
        .catch((e) => {
          this.$message.error(`读取失败: ${e.message}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
._left2 {
  width: 100%;
  margin-top: 24px;
  ._sub {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ._left-sub {
      position: relative;
      width: 50%;
      height: 66px;
      padding-left: 24px;
      // margin-top: 10px;
      margin-bottom: 24px;

      .bg {
        position: absolute;
        z-index: 1;
        top: 15px;
        left: 2%;
        width: 96%;
        height: 66px;
      }
    }
  }
}
</style>