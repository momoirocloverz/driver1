<template>
  <div class="_right1">
    <title-bar title="种植产能" />
    <select-c :list="selectList" @reload="reload" />
    <right-2-item
      title="晚稻亩产"
      :value="total.value1"
      unit="万亩"
      custom-style="margin-left: 37px"
    />
    <div class="flex-row">
      <right-2-item
        title="种植大户亩产"
        :value="total.value2"
        unit="斤/亩"
        custom-style="margin-left: 37px"
      />
      <right-2-item title="种植散户亩产" :value="total.value3" unit="斤/亩" />
    </div>

    <list v-if="list.length > 0 && isLoad" ref="listRef" :data="list" />
    <list-empty v-else custom-style="height: 300px;" />
  </div>
</template>

<script>
import 'echarts/theme/macarons.js'
import List from './list.vue'
import SelectC from '../left/select.vue'
import TitleBar from '../titleBar.vue'
import Right2Item from './right2Item.vue'
import { zzmc, cl } from '../../data/data.js'
import bus from '@/utils/bus.js'
import ListEmpty from '@/components/listEmpty.vue'
export default {
  components: {
    List,
    SelectC,
    TitleBar,
    Right2Item,
    ListEmpty
  },
  data() {
    return {
      selectList: [
        { text: '晚稻', select: true },
        { text: '早稻', select: false },
        { text: '小麦', select: false },
        { text: '油菜', select: false }
      ],
      total: {
        value1: '',
        value2: '',
        value3: ''
      },
      curPos: 0, // 当前选择的位置
      listRef: null,
      curArea: '奉化区',
      curType: '晚稻',
      list: [],
      isLoad: false // 是否已经加载
    }
  },
  mounted() {
    this.init()
    bus.$on('changeArea', (val) => {
      console.log(val)
      this.curArea = val
      this.init()
    }) //
  },
  beforeDestroy() {
    bus.$off('changeArea') // 移除
  },
  methods: {
    // 重新加载数据
    reload: function(item) {
      this.curType = item.text
      this.init()
    },
    init: function() {
      this.isLoad = false
      const list = []
      for (const item of zzmc) {
        if (item.address == this.curArea && item.type == this.curType) {
          if (item.user_type == '行政区划总计') {
            this.total.value1 = parseFloat(item.average).toFixed(2)
          } else if (item.user_type == '大户') {
            this.total.value2 = parseFloat(item.average).toFixed(2)
          } else if (item.user_type == '散户') {
            this.total.value3 = parseFloat(item.average).toFixed(2)
          }
        }
      }
      for (const item of cl) {
        if (item.address == this.curArea && item.type == this.curType) {
          list.push({
            text: item.sub_type,
            value: parseFloat(item.average).toFixed(2)
          })
        }
      }
      this.list = list
      setTimeout(() => {
        this.isLoad = true
        setTimeout(() => {
          this.$refs.listRef.reload()
        }, 0)
      }, 200)
    }
  }
}
</script>

<style scoped lang="scss">
._right1 {
  width: 100%;
  margin-top: 24px;

  .flex-row {
    display: flex;
    flex-direction: row;
  }
}
</style>
