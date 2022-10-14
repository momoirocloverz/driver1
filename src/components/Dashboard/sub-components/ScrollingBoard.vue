<template>
  <div class="board-container" :style="cssVars">
    <div v-if="showHeader" class="board-header">
      <div class="header-title">
        {{ title }}
      </div>
      <div class="header-menu" />
    </div>
    <div class="table">
      <div v-if="data[viewIndex]" class="table-header" ref="tableHeader">
        <span class=""/>
        <span v-for="(field, idx) in data[viewIndex].columns" :key="idx" class="item-col">
          {{ field }}
        </span>
      </div>
<!--      <transition-group name="scrolling-rows" tag="div">-->
<!--        <div v-for="item in dataInView" :key="item.name" class="item-row">-->
<!--&lt;!&ndash;          <span v-for="([field, value]) in Object.entries(item)" class="item-col">&ndash;&gt;-->
<!--&lt;!&ndash;            {{ value }}&ndash;&gt;-->
<!--&lt;!&ndash;          </span>&ndash;&gt;-->
<!--        </div>-->
<!--      </transition-group>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollingBoard',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    viewSize: {
      type: Number,
      default: 4
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dataInView: [],
      viewIndex: 0,
      scrollIndex: 0,
      intervalTracker: null
    }
  },
  computed: {
    cssVars() {
      return {
        /* variables you want to pass to css */
        '--window-size': this.viewSize
      }
    }
  },
  watch: {
    viewIndex(newIndex){
      this.$refs.tableHeader.style.gridTemplateColumns = `repeat(${this.data[newIndex].columns.length + 1}, minmax(0, 1fr))`
    }
  },
  mounted() {
    this.dataInView = this.data[0]?.data ?? []
    this.intervalTracker = setInterval(() => (this.next()), 3000)
    this.$refs.tableHeader.style.gridTemplateColumns = `repeat(${this.data[0].columns.length + 1}, minmax(0, 1fr))`
  },
  beforeDestroy() {
    clearInterval(this.intervalTracker)
  },
  methods: {
    next() {
      console.log('next')
    }
  }
}
</script>

<style scoped lang="scss">
$row-height: 52px;
$window-size: var(--window-size);
.board-container {
  display: flex;
  flex-flow: column nowrap;
  //background: white;
  color: white;
  min-width: 100px;
  width: 100%;
  .board-header {
    display: flex;
    flex-flow: row nowrap;
    height: 45px;
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
  .table {
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
    min-height: calc(var(--window-size) * 52px);
    .table-header{
      display: grid;
    }
    .item-row {
      //display: table-row;
      flex-flow: row nowrap;
      transition: all 1s ease-in-out;
      .item-col{
        //display: table-cell;
      }
      &:first-child {
        background: #409EFF;
      }
    }
    .marked-for-deletion {
      opacity: 0;
    }
  }

  .scrolling-rows-enter, .scrolling-rows-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  .scrolling-rows-move {
    transition: transform 1s;
  }
}
</style>
