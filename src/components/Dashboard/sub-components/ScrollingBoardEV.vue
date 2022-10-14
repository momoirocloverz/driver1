<template>
  <div class="board-container">
    <new-header v-if="showHeader" :title="title" :no-background="noTitleBackground">
    </new-header>
    <div v-if="source.length > 1" class="header-menu">
      <el-radio-group v-model="currentDataset" class="scrolling-board-menu-wrapper--scale">
        <el-radio-button v-for="dataset in source" :key="dataset.title" class="scrolling-board-dataset-button" :label="dataset.title" />
      </el-radio-group>
    </div>
    <dv-scroll-board class="dashboard-custom-ev-board--scale" :config="config" @click="e=>this.$emit('click', e)" />
  </div>
</template>

<script>
import NewHeader from '@/components/Dashboard/sub-components/NewHeader'
export default {
  name: 'ScrollingBoardEV',
  components: { NewHeader },
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
    noTitleBackground: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      config: {
        rowNum: this.viewSize,
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
        rowNum: this.viewSize,
        header: dataset?.header ?? [],
        headerBGC: 'transparent',
        oddRowBGC: 'transparent',
        evenRowBGC: 'rgb(84 218 247 / 10%)',
        data: Array.isArray(dataset?.data) ? dataset.data : [],
        index: this.numbered,
        waitTime: this.wait,
        columnWidth: [60, ...this.columnWidths],
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
  min-height: 200px;
  width: 100%;
  height: 100%;
  row-gap: 10px;
  .header-menu {
    margin-left: auto;
    margin-right: 6%;
    position: absolute;
    z-index: 999;
  }
  .board-header {
    display: flex;
    flex-flow: row nowrap;
    min-height: 45px;
    align-items: center;
    //background: linear-gradient(to right, #006ac6ff, #006ac600);
    background: url("~@/assets/subsidies/header-bg.webp");
    background-size: 100% 150%;
    border-radius: 6px;
    padding-left: 30px;
    .header-title {
      margin-right: auto;
      font-size: 28px;
      font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
      font-weight: bold;
      text-align: left;
      color: #fff;
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
.scrolling-board-menu-wrapper--scale {
  visibility: hidden;
  .scrolling-board-dataset-button{
    background: #092546;
    color: #9EA1A5;
    border-color: #6a7386;
    font-size: 16px;
    .el-radio-button__inner{
      background: inherit;
      color: inherit;
      border-color: inherit;
      padding: 8px 12px;
    }
  }
  .is-active {
    border-color: #167FE2;
    background: #1890FF20;
    color: white;
    .el-radio-button__inner{
      font-weight: bold;
    }
  }
}

.dashboard-custom-ev-board--scale {
  .header {
    font-size: 20px;
    text-shadow: #0f396f 1px 0 0, #0f396f 0 1px 0, #0f396f -1px 0 0, #0f396f 0 -1px 0;
    .header-item {
      text-align: center;
      overflow: visible;
    }
  }
  .rows {
    .row-item {
      font-size: 16px;
      color: #fff;
      text-shadow: #0f396f 1px 0 0, #0f396f 0 1px 0, #0f396f -1px 0 0, #0f396f 0 -1px 0;
      .ceil {
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
