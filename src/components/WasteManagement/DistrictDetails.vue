<template>
  <div
    v-loading="isLoading"
    element-loading-background="#0006"
    class="district-detail-container"
  >
    <Unavailable v-if="dataUnavailable" />
    <Table
      v-else
      :source="boardWithImage"
      :column-widths="[100]"
      :show-header="false"
      :view-size="8"
      :numbered="false"
    />
  </div>
</template>

<script>
import ScrollingBoardEV from '@/components/WasteManagement/SubComponents/ScrollingBoardEV'
import { getDistrictDetails } from '@/service/wasteManagement'
import Unavailable from '@/components/WasteManagement/SubComponents/Unavailable'
import Table from "@/components/WasteManagement/SubComponents/Table";

export default {
  name: 'DistrictDetails',
  components: {
    Table,
    Unavailable,
    ScrollingBoardEV
  },
  props: {
    locationName: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: undefined
    },
    locationPath: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      boardWithImage: [{
        header: ['镇街道', '常住户数', '参与户数', '垃圾重量', '参与率', '空桶率', '排名', '准确率'],
        data: []
      }],
      isLoading: false
    }
  },
  computed: {
    dataUnavailable() {
      return !this.isLoading && !(this.boardWithImage[0]?.data.length > 0)
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
    this.getData(this.locationName)
  },
  methods: {
    getData(location = this.locationName, date = this.date) {
      this.isLoading = true
      const path = this.locationPath
      getDistrictDetails({ regionName: location, date }).then(result => {
        if (result.code !== 0) {
          throw new Error(result.msg)
        }
        const accuracies = Array.isArray(result.data) ? result.data.filter(e => e.region_name) : []
        this.$emit('update:accuracies', { data: accuracies, path })
        if (location !== this.locationName) {
          return
        }
        const data = Array.isArray(result.data)
          ? result.data.filter(e => e.region_name).sort((a, b) => (b.ture_rate - a.ture_rate))
            .map((d, idx) => ([d.region_name, d.user_ifres_count, d.party_count,
              `${d.weight ?? '-'}kg`, `${d.partake_rate ?? '-'}%`, `${d.empty_rate ?? '-'}%`, idx + 1, `${d.ture_rate ?? '-'}%`])) : []
        this.boardWithImage = [{
          title: location,
          header: ['地区', '常住户数', '参与户数', '垃圾重量', '参与率', '空桶率', '排名', '准确率'],
          data
        }]
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
.district-detail-container {
  position: relative;
  height: 100%
}
</style>

<style lang="scss">
.district-detail-container {
  .el-loading-spinner {
    .path {
      stroke: white;
    }
  }
}
</style>
