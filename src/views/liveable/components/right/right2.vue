<template>
  <div class="_right2">
    <right-title title="全域秀美" />
    <!-- 当前季度选择 -->
    <div class="select">
      <div
        v-for="(item, index) in season"
        :key="index"
        :class="item.select ? 'ed' : 'ed o-34'"
        @click="changeSeason(index)"
      >
        {{ item.title }}
      </div>
    </div>

    <list ref="listRef" :quarter="current + 1" />
  </div>
</template>

<script>
import 'echarts/theme/macarons.js'
import RightTitle from './title.vue'
import List from './list.vue'
export default {
  components: {
    RightTitle,
    List
  },
  data() {
    return {
      season: [
        {
          title: '一季度',
          select: true
        },
        {
          title: '二季度',
          select: false
        },
        {
          title: '三季度',
          select: false
        },
        {
          title: '四季度',
          select: false
        }
      ],
      current: 0, // 当前选择项
      listRef: null
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    changeSeason: function(pos) {
      if (pos == this.current) {
        // 如果当前季度相等，那么则不请求新的数据
        return
      }
      const season = this.season
      for (const index in season) {
        if (index == pos) {
          season[index].select = true
          this.current = parseInt(index)
        } else {
          season[index].select = false
        }
      }
      // this.reload()
    },
    // 重新加载数据
    reload: function() {
      this.$refs.listRef.reload()
    }
  }
}
</script>

<style scoped lang="scss">
._right2 {
  width: 100%;
  margin-top: 24px;

  .select {
    width: 100%;
    margin-top: 6px;
    padding-right: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    .ed {
      width: 66px;
      height: 28px;
      line-height: 24px;
      margin-right: 10px;
      box-sizing: border-box;
      background: rgba(48, 97, 177, 0.34);
      border: 1px solid #5fafff;
      border-radius: 5px;
      text-align: center;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }

    .o-34 {
      opacity: 0.44;
    }
  }
}
</style>
