<template>
  <div class="truck-map-container">
    <img
      :src="require('@/assets/waste-management/truck-map-thumbnail.webp')"
      class="truck-map"
      @click="isModalVisible = true"
    >
    <el-dialog
      :visible.sync="isModalVisible"
      width="80%"
      top="2vh"
      :show-close="false"
      custom-class="truck-map-modal"
    >
      <el-radio-group v-model="map">
        <el-radio-button label="林埭镇" />
        <el-radio-button label="其他地区" />
      </el-radio-group>
      <div class="frame-wrapper" ref="wrapper">
        <iframe :src="mapSrc" class="iframe" :style="iframeStyle"  />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TruckRouteMap',
  data() {
    return {
      map: '林埭镇',
      isModalVisible: false
    }
  },
  computed: {
    mapSrc() {
      if (this.map === '林埭镇') {
        return 'https://zhadmin.dxkeji.com/open/car/track?key=06eaf753b2101bef9eeb0ade0c33efa3'
      }
      if (this.map === '其他地区') {
        return 'https://service.zjinsl.com/noLogin/equpipLocation?encInfo=2mM0rlM5mmhNqX5JOWV6vu%2F5FBqErBkCUrU4BhpvXuifwzoIxzLU2nwztJNEq%2B3R'
      }
      return ''
    },
    iframeStyle() {
      if (this.map === '林埭镇') {
        return {
          width: '100%',
          height: '90vh',
        }
      }
      if (this.map === '其他地区') {
        const dims = this.$refs.wrapper.getBoundingClientRect()
        console.log(dims)
        const sourceHeight = 810;
        const sourceWidth = 1440;
        return {
          width: `${sourceWidth}px`,
          height: `${sourceHeight}px`,
          transformOrigin: 'top left',
          transform: `scaleY(${dims.height/sourceHeight}) scaleX(${dims.width /sourceWidth })`
        }
      }
      return ''
    }
  },
  watch() {
  },
  mounted() {
    // fetch('https://service.zjinsl.com/adminUtils/getLoginUser', { method: 'POST', mode: 'no-cors' })
  }
}
</script>

<style scoped lang="scss">
.truck-map-container {
  height: 100%;
  width: 100%;
  .truck-map {
    object-fit: cover;
    width: 100%;
  }
  .frame-wrapper {
    height: 90vh;
    overflow: hidden;
    .iframe {
      border: none;
      background: lightgrey;
    }
  }
  ::v-deep .el-radio-group {
    .el-radio-button {
      &:first-child {
        .el-radio-button__inner {
          border-radius: 4px 0 0 0;
        }
      }
      &:last-child {
        .el-radio-button__inner {
          border-radius: 0 4px 0 0;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.truck-map-container {
  .el-dialog.truck-map-modal {
    background: transparent none;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
      border-radius: 1%;
      overflow: hidden;
    }
  }
}
</style>
