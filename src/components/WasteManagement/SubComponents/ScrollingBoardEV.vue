<template>
  <div class="board-container">
    <div v-if="showHeader" class="board-header">
      <div class="header-title">
        {{ title }}
      </div>
      <div v-if="source.length > 1" class="header-menu">
        <el-radio-group v-model="currentDataset" class="scrolling-board-menu-wrapper">
          <el-radio-button v-for="dataset in source" :key="dataset.title" class="scrolling-board-dataset-button" :label="dataset.title" />
        </el-radio-group>
      </div>
    </div>
    <dv-scroll-board class="dashboard-custom-ev-board" :config="config" @click="e=>this.$emit('click', e)" />
  </div>
</template>

<script>
export default {
  name: 'ScrollingBoardEV',
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
      wait: 2000,
      minWait: 3000
    }
  },
  computed: {
    computedDatasetIdx() {
      return this.source.map(e => e.title).indexOf(this.currentDataset)
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
    setDataset(dataset) {
      clearTimeout(this.timer)
      this.config = {
        header: dataset?.header ?? [],
        headerBGC: 'transparent',
        oddRowBGC: '#005AAA',
        evenRowBGC: '#022C60',
        data: Array.isArray(dataset?.data) ? dataset.data : [],
        index: this.numbered,
        rowNum: this.viewSize,
        waitTime: this.wait,
        // waitTime: 11111111,
        columnWidth: [...(this.numbered ? [60] : []), ...this.columnWidths],
        indexHeader: '',
        align: ['center']
      }
      if (this.source.length > 1) {
        const timeout = (Array.isArray(dataset?.data) ? Math.max(dataset.data.length - this.viewSize, 0) : 0) * this.wait + this.minWait
        this.timer = setTimeout(() => this.nextDataset(), timeout)
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
  .table-header {
    font-size: 24px;
    font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
    font-weight: 700;
    text-align: left;
    color: #e1f5ff;
  }
}
</style>
<style lang="scss">
.scrolling-board-menu-wrapper {
  .scrolling-board-dataset-button{
    background: #092546;
    color: #9EA1A5;
    border-color: #6a7386;
    font-size: 16px;
    .el-radio-button__inner{
      background: inherit;
      color: inherit;
      border-color: inherit;
      padding: 10px 12px;
    }
  }
  .is-active {
    border-color: #1890FF;
    background: #1890FF80;
    color: white;
    .el-radio-button__inner{
      font-weight: bold;
    }
  }
}

.dashboard-custom-ev-board {
  .header {
    font-size: 1.5vh;
    background: linear-gradient(180deg, #1486da, #04346B);
    .header-item {
      text-align: center;
      font-weight: bold;
    }
  }
  .rows {
    .row-item {
      font-size: 1.4vh;
      .ceil {
        text-align: center;
        //text-overflow: ellipsis;
        //white-space: nowrap;
        //overflow: hidden;
        word-break: break-all;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
