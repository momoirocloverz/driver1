<template>
  <div
    v-loading="isLoading"
    class="waste-categories-container"
    element-loading-background="#0006"
  >
    <Unavailable v-if="dataUnavailable" />
    <template v-else>
      <ScrollingBoardEV
        class="board"
        :source="boardWithImage"
        :column-widths="columnWidths"
        :show-header="false"
        :numbered="false"
        @click="onClick"
      />
      <el-button class="download-btn" v-if="showDownloadBtn && !live && !dataUnavailable" @click="downloadData">下载</el-button>
    </template>
    <el-dialog
      :visible.sync="modalVisible"
      title="收集实时详情"
      :show-close="false"
    >
      <div class="modal-container">
        <div class="modal-info">
          <div class="label">姓名: {{ rowData.name }}</div>
          <!--            <div class="value">{{ rowData.name }}</div>-->
          <div class="label">地区: {{ rowData.region }}</div>
          <!--            <div class="value">{{ rowData.region }}</div>-->
          <div class="label">垃圾类型: {{ rowData.type }}</div>
          <!--            <div class="value">{{ rowData.type }}</div>-->
          <div class="label">分类结果: {{ rowData.grade }}</div>
          <!--            <div class="value">{{ rowData.grade }}</div>-->
          <div class="label">重量: {{ rowData.weight }}</div>
          <!--            <div class="value">{{ rowData.weight }}</div>-->
          <div class="label">时间: {{ rowData.date }}</div>
          <!--            <div class="value">{{ rowData.date }}</div>-->
        </div>
        <div class="modal-image-container">
          <img :src="rowData.url" class="modal-image">
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ScrollingBoardEV from '@/components/WasteManagement/SubComponents/ScrollingBoardEV'
import { getFailedSortingData, getSortingData } from '@/service/wasteManagement'
import Unavailable from '@/components/WasteManagement/SubComponents/Unavailable'
import { format } from 'date-fns'
import XLSX from 'xlsx'

const wasteType = ['易腐垃圾', '其他垃圾']
const grade = ['空桶', '不合格', '合格', '良好', '优秀']
export default {
  name: 'WasteCategories',
  components: {
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
    live: {
      type: Boolean,
      default: false
    },
    showFailedOnly: {
      type: Boolean,
      default: false
    },
    showDownloadBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      boardWithImage: [{
        header: ['地区', '姓名', '不合格次数'],
        data: []
      }],
      modalVisible: false,
      rowData: {},
      isLoading: false
    }
  },
  computed: {
    columnWidths() {
      const dpi = window.devicePixelRatio
      return this.live ? [70, 70, 70, 70, 60, 70].map((e) => (e * (window.innerWidth / 1920))) : undefined
    },
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
    },
    live() {
      this.getData()
    }
  },
  mounted() {
    this.getData(this.locationName)
  },
  methods: {
    onClick(e) {
      const url = e.ceil.match(/(?:src=")(?<url>.*)(?:")/)?.groups.url
      if (url) {
        this.rowData = {
          name: e.row[1],
          region: e.row[0],
          type: e.row[2],
          grade: e.row[3],
          weight: e.row[4],
          date: e.row[6],
          url
        }
        this.modalVisible = true
      }
    },
    getData(location = this.locationName, date = this.date, live = this.live) {
      this.isLoading = true
      if (this.showFailedOnly) {
        getFailedSortingData({ regionName: location, date }).then(result => {
          if (result.code !== 0) {
            throw new Error(result.msg)
          }
          if (location !== this.locationName) {
            return
          }
          this.boardWithImage = [{
            title: location,
            header: ['地区', '姓名', '垃圾类型', '分类结果', '重量', '图片', '时间'],
            data: Array.isArray(result.data) ? result.data.sort((a, b) => (a.user_name.localeCompare(b.user_name, 'zh-CN'))).map((d) => ([d.region_name, d.user_name,
              wasteType[d.rubbish_type] ?? '-', grade[d.collect_type] ?? '-', `${d.weight ?? '-'}kg`,
              `<img style="object-fit: cover; width: 100%;" src="${d.img_path}" />`,
              format(new Date(d.put_time), 'HH:mm:SS')])) : []
          }]
        }).catch((e) => {
          this.$message.error(`读取失败: ${e.message}`)
        }).finally(() => {
          this.isLoading = false
        })
      } else {
        getSortingData({ regionName: location, date, live }).then(result => {
          if (result.code !== 0) {
            throw new Error(result.msg)
          }
          if (location !== this.locationName) {
            return
          }
          if (!live) {
            this.boardWithImage = [{
              title: location,
              header: ['地区', '姓名', '不合格次数'],
              data: Array.isArray(result.data) ? result.data.map((d) => ([d.village, d.user_name, d.count])) : []
            }]
          } else {
            this.boardWithImage = [{
              title: location,
              header: ['地区', '姓名', '垃圾类型', '分类结果', '重量', '图片', '时间'],
              data: Array.isArray(result.data) ? result.data.sort((a, b) => (a.user_name.localeCompare(b.user_name, 'zh-CN'))).map((d) => ([d.region_name, d.user_name,
                wasteType[d.rubbish_type] ?? '-', grade[d.collect_type] ?? '-', `${d.weight ?? '-'}kg`,
                `<img style="object-fit: cover; width: 100%;" src="${d.img_path}" />`,
                format(new Date(d.put_time), 'HH:mm:SS')])) : []
            }]
          }
        }).catch((e) => {
          this.$message.error(`读取失败: ${e.message}`)
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    downloadData() {
      const workbook = XLSX.utils.book_new();
      const sheet1 = XLSX.utils.json_to_sheet(
        this.boardWithImage[0]?.data.map(e=>{
          const obj = {}
          e.forEach((value, idx)=>{
            obj[this.boardWithImage[0].header[idx]] = value
          })
          return obj
        })
        , { header: this.boardWithImage[0]?.header })
      XLSX.utils.book_append_sheet(workbook, sheet1, '七日预警');
      XLSX.writeFile(workbook, '七日预警.xlsx')
    }
  }
}
</script>

<style scoped lang="scss">
.modal-container {
  display: grid;
  grid-template-rows: 6vh 1fr;
  width: fit-content;
  overflow: hidden;
  row-gap: 1vh;
  column-gap: 1vw;
  .modal-info {
    width: 100%;
    position: relative;
    display: grid;
    grid-template: repeat(2, minmax(0, 1fr)) / repeat(3, minmax(0, 1fr));
    color: white;
    font-size: 2vh;
    .label {
      display: flex;
      align-items: center;
    }
    .value {

    }
  }
  .modal-image-container {
    position: relative;
    max-height: 50vh;
    max-width: 40vw;
    width: fit-content;
    display: flex;
    .modal-image {
      object-fit: contain;
      max-height: 100%;
      max-width: 100%;
    }
  }
}
.waste-categories-container {
  //flex: 1 1 auto;
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: column;
  .board {
    flex: 1;
  }
  .download-btn {
    display: block;
    padding: 0.5vh 0;
    background: #1175c3;
    border-color: #29a0fa;
    font-size: 1.6vh;
    color: white;
  }
}
</style>

<style lang="scss">
.waste-categories-container {
  .el-dialog {
    //background-color: #132d4380;
    //backdrop-filter: blur(1vh);
    background-color: transparent;
    background-image: url("../../assets/waste-management/modal-bg.png");
    background-size: 100% 100%;
    border-radius: 1vh;
    width: fit-content;
    padding: 0 2vw 4vh 2vw;
    .el-dialog__header {
      display: flex;
      justify-content: center;
      .el-dialog__title {
        color: white;
        font-size: 3vh;
        padding: 1vh 8vw;
        background-image: url("../../assets/waste-management/modal-title-bg.png");
        background-size: 100% 100%;
      }
    }
    .el-dialog__body {
      display: flex;
      justify-content: center;
      width: fit-content;
      padding: 1vh 2vw;
    }
  }
  .el-loading-spinner {
    .path {
      stroke: white;
    }
  }

  .dashboard-custom-ev-board {
    .header {
      font-size: 1.3vh;
      .header-item {
        padding: 0;
      }
    }
    .rows {
      .row-item {
        font-size: 1.2vh;
      }
    }
  }
}
</style>
