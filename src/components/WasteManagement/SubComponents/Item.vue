<template>
  <div class="item">
    <div class="label" :style="{color}">{{ label }}</div>
    <div
      class="value"
      v-loading="loading"
      element-loading-background="transparent"
      :style="{'--scale': spinnerScale}"
    >
      {{ processedValue }}
    </div>
  </div>
</template>

<script>
import { round } from 'lodash'

export default {
  name: 'Item',
  props: {
    label: {
      type: String,
      default: '-'
    },
    value: {
      type: [String, Number],
      default: '-'
    },
    color: {
      type: String,
      default: 'white'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    processedValue() {
      const val = typeof this.value === 'string' ? parseInt(this.value, 10) : this.value
      return this.loading ? '' : isNaN(val) ? '暂无数据' : round(val, 2)
    },
    spinnerScale(){
      return 0.5/(window.innerHeight/1080)
    }
  },
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  flex-flow: column;
  row-gap: 1vh;
  .label {
    font-size: 1.6vh;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
  }
  .value {
    height: 2vh;
    font-size: 2vh;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    color: #feffff;
    letter-spacing: 2px;
    margin-top: auto;
  }
}
</style>

<style lang="scss">
.item {
  .value{
    --scale: 1;
    .el-loading-spinner {
      transform: scale(var(--scale));
      .path {
        stroke: white;
      }
    }
  }
}
</style>
