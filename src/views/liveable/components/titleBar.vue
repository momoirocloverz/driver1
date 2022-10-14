<template>
  <div
    class="_title-bar"
    :style="customStyle + (url || router ? ';cursor: pointer;' : '')"
    @click="goto"
  >
    <img
      src="https://img.hzanchu.com/acimg/fdcf0659b22e5dd3af8449a6cb40ca37.png"
      class="_bg"
    >

    <div class="_title">{{ title }}</div>

    <img
      :src="
        time % 3 == 0
          ? 'https://img.hzanchu.com/acimg/f8cea6a20ef2dd0672b1891965c63ba3.png'
          : 'https://img.hzanchu.com/acimg/c765a1527b342d424fae690852444303.png'
      "
      class="_icon1"
    >
    <img
      :src="
        time % 3 == 1
          ? 'https://img.hzanchu.com/acimg/f8cea6a20ef2dd0672b1891965c63ba3.png'
          : 'https://img.hzanchu.com/acimg/c765a1527b342d424fae690852444303.png'
      "
      class="_icon2"
    >
    <img
      :src="
        time % 3 == 2
          ? 'https://img.hzanchu.com/acimg/f8cea6a20ef2dd0672b1891965c63ba3.png'
          : 'https://img.hzanchu.com/acimg/c765a1527b342d424fae690852444303.png'
      "
      class="_icon3"
    >
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    customStyle: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }, // 当前配置可跳转url
    router: {
      type: String,
      default: ''
    } // 当前配置可跳转Router，上下两者按上者为准
  },
  data() {
    return {
      time: 0, // 当前滚动到的
      timer: null // 当前定时器
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    startTimer: function() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.time++
        // console.log(this.time)
      }, 1000)
    },
    // 跳转到相对应的详情页面
    goto: function() {
      if (this.url) {
      }
      if (this.router) {
      }
    }
  }
}
</script>

<style scoped lang="scss">
._title-bar {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;

  ._title {
    z-index: 2;
    position: absolute;
    top: 10px;
    left: 30px;
    font-size: 20px;
    font-weight: bold;
    // font-family: Microsoft YaHei;
    color: #fff;
  }
  ._bg {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 364px;
    height: 60px;
  }

  ._icon1 {
    z-index: 1;
    position: absolute;
    right: 45px;
    top: 16px;
    width: 13px;
    height: 13px;
  }
  ._icon2 {
    z-index: 1;
    position: absolute;
    right: 28px;
    top: 16px;
    width: 13px;
    height: 13px;
  }
  ._icon3 {
    z-index: 1;
    position: absolute;
    right: 11px;
    top: 16px;
    width: 13px;
    height: 13px;
  }
}
</style>
