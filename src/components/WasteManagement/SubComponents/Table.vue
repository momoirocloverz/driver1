<template>
  <div class="board-container">
    <div v-if="showHeader" class="board-header">
      <div class="header-title">
        {{ title }}
      </div>
    </div>
    <el-table
      ref="table"
      :data="datasetValues.data"
      class="custom-table"
      size="small"
      header-row-class-name="table-header"
      header-cell-class-name="header-cell"
      height="100%"
      :row-style="customRowStyles"
      fit
      resizable
    >
      <el-table-column
        v-for="(_,idx) in datasetValues.header"
        :key="datasetValues.header[idx]"
        :label="datasetValues.header[idx]"
        align="center"
        class-name="table-cell"
        :prop="`p${idx}`"
        :min-width="widthRatio[idx]"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    title: {
      type: String,
      default: ''
    },
    source: {
      type: Array,
      default: () => []
    },
    viewSize: {
      type: Number,
      default: 5
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    columnWidths: {
      type: Array,
      default: () => []
    },
    numbered: {
      type: Boolean,
      default: true
    },
    baseWidth: {
      type: Number,
      default: 1920
    },
    rowColors: {
      type: Array,
      default: () => ['#005AAA', '#022C60']
    }
  },
  data() {
    return {
      config: {
        header: [],
        headerBGC: 'transparent',
        oddRowBGC: 'transparent',
        evenRowBGC: 'rgba(1, 52, 70, 0.7)',
        data: [],
        index: this.numbered,
        columnWidth: [50],
        align: ['center']
      },
      timer: null,
      currentDataset: null,
      datasetValues: []
    }
  },
  computed: {
    computedDatasetIdx() {
      return this.source.map(e => e.title).indexOf(this.currentDataset)
    },
    widthRatio() {
      return [2,2,2,4,2,2,1,2]
    }
  },
  watch: {
    source(newSource) {
      clearTimeout(this.timer)
      this.currentDataset = newSource[0].title
      this.setDataset(newSource[0])
    },
    currentDataset() {
      this.setDataset(this.source[this.computedDatasetIdx])
    }
  },
  mounted() {
    if (this.source[0]?.title) {
      this.currentDataset = this.source[0].title
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    nextDataset() {
      let newIndex = this.computedDatasetIdx + 1
      if (newIndex >= this.source.length) {
        newIndex = 0
      }
      this.currentDataset = this.source[newIndex].title
    },
    createDataObj(dataArray, size) {
      const obj = {}
      Array(size).fill(0).forEach((_, idx) => {
        obj[`p${idx}`] = dataArray[idx] ?? '-'
      })
      console.log(dataArray, obj)
      return obj
    },
    setDataset(dataset) {
      this.datasetValues = Array.isArray(dataset?.data) ? {
        ...dataset,
        data: dataset.data.map(d => this.createDataObj(d, dataset.header.length))
      } : {
        header: ['镇街道', '常住户数', '参与户数', '垃圾重量', '参与率', '空桶率', '排名', '准确率'],
        data: this.createDataObj([], 8)
      }
      console.log(dataset, this.datasetValues)
    },
    customRowStyles({ row, rowIndex }) {
      return {
        background: this.rowColors[rowIndex % this.rowColors.length]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.board-container {
  display: flex;
  flex-flow: column nowrap;
  //background: white;
  color: white;
  min-width: 100px;
  width: 100%;
  height: 100%;
  row-gap: 20px;
  .board-header {
    display: flex;
    flex-flow: row nowrap;
    min-height: 45px;
    align-items: center;
    background: linear-gradient(to right, #006ac6ff, #006ac600);
    border-radius: 6px;
    padding-left: 30px;
    .header-title {
      margin-right: auto;
      font-size: 28px;
      font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
      font-weight: bold;
      text-align: left;
      color: #fefefe;
      //text-shadow: 0px 0px 29px rgba(19,128,255,0.50);
    }
  }
  ::v-deep .table-header {
    font-size: 1.5vh;
    text-align: left;
    background: linear-gradient(180deg, #1486da, #04346B);
    .header-cell {
      text-align: center;
      font-weight: bold;
      background: transparent;
      color: white;
      .cell {
        padding: 0;
      }
    }
  }
  ::v-deep .custom-table {
    ::-webkit-scrollbar {
      width: 0.4vw;
      height: 0.5vw;
    }
    ::-webkit-scrollbar-track {
      border-radius: 10em;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #49b6e9;
      border-radius: 10em;
    }
    background: transparent;
    th, td {
      border-color: transparent;
    }
    .gutter {
      background: transparent;
      width: 0.4vw !important;
    }
    tr {
      height: 3vh;
      &:hover {
        td {
          background: transparent;
        }
      }
    }
    col[name="gutter"] {
      width: 0.4vw;
    }
    .el-table__body-wrapper {
      .el-table__body {
        width: 100% !important;
      }
    }
    //@media (-webkit-device-pixel-ratio: 1.25) {
    //  tr {
    //    height: 2vh;
    //  }
    //}
    .table-cell {
      font-size: 1.4vh;
      line-height: 1vh;
      padding: 0;
      color: white;
      .cell {
        text-align: center;
        //text-overflow: ellipsis;
        //white-space: nowrap;
        //overflow: hidden;
        word-break: break-all;
        display: flex;
        justify-content: center;
        padding: 0;
      }
    }
  }
}
</style>

