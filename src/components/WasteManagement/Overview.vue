<template>
  <div class="data-grid">
    <Item
      label="总用户(户)"
      color="#30D6AD"
      :value="data.all_user_count"
      :loading="isLoading"
    />
    <Item
      label="常住户数(户)"
      color="#30D6AD"
      :value="data.user_ifres_count"
      :loading="isLoading"
    />
    <Item
      label="参与户数(户)"
      color="#30D6AD"
      :value="data.party_count"
      :loading="isLoading"
    />
    <Item
      label="投放总重量(吨)"
      color="#D5B828"
      :value="data.rubbish_all"
      :loading="isLoading"
    />
    <Item
      label="易腐垃圾(吨)"
      color="#D5B828"
      :value="data.rubbish_rot"
      :loading="isLoading"
    />
    <Item
      label="其他垃圾(吨)"
      color="#D5B828"
      :value="data.rubbish_other"
      :loading="isLoading"
    />
    <Item
      label="参与率(%)"
      color="#E9666D"
      :value="data.partake_rate"
      :loading="isLoading"
    />
    <Item
      label="准确率(%)"
      color="#E9666D"
      :value="data.ture_rate"
      :loading="isLoading"
    />
  </div>
</template>

<script>
import Item from '@/components/WasteManagement/SubComponents/Item'
import { getOverviewData } from '@/service/wasteManagement'
export default {
  name: 'Overview',
  components: { Item },
  props: {
    location: {
      type: Array,
      default: () => [1]
    },
    locationName: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      data: {},
      isLoading: false
    }
  },
  watch: {
    locationName(newLocation) {
      this.getData(newLocation)
    },
    date(newDate) {
      this.getData(this.locationName, newDate)
    }
  },
  mounted() {
    this.getData()
  },
  beforeDestroy() {
  },
  methods: {
    getData(location = this.locationName, date = this.date) {
      this.isLoading = true
      getOverviewData({ regionName: location, date }).then((result) => {
        if (result.code !== 0) {
          throw new Error(result.msg)
        }
        if (location !== this.locationName) {
          return
        }
        this.data = result.data
      }).catch((e) => {
        this.$message.error(`读取失败: ${e.message}`)
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.data-grid {
  display: grid;
  grid-template: repeat(3, minmax(0, 1fr)) / repeat(3, minmax(0, 1fr));
  row-gap: 2vh;
  column-gap: 0.5vw;
  padding: 1vh 0.5vw;
  height: 100%;
  width: 100%;
}
</style>
