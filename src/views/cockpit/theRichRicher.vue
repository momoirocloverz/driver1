<template>
  <div class="outer" ref="wrapper">
    <div class="title">
      <img src="../../assets/fyfz/title.png" alt="">
      <span>平湖数字乡村驾驶舱</span>
    </div>
    <div class="empty">
      <img src="../../assets/empty.png" alt="">
      <p>页面待开发，暂无数据</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize: _.debounce(function() {
      switch (this.$route.query.mode) {
        case 'vertical':
          this.$refs.wrapper.style.transform = `scale(${window.innerHeight / 1080})`
          break
        default: this.$refs.wrapper.style.transform = `scaleX(${window.innerWidth / 1920}) scaleY(${window.innerHeight / 1080})`
      }
    }, 1000, { leading: true, trailing: true })
  }
}
</script>

<style scoped lang="scss">
  .outer {
    background: url("../../assets/fyfz/bg.png") no-repeat;
    background-size: 100% 100%;
    transform-origin: 0 0;
    box-sizing: border-box;
    width: 1920px;
    height: 1080px;
    padding: 20px;
    .toggle-full-screen {
      position: absolute;
      right: 0;
      margin: 20px;
      color: white;
      background: transparent;
      width: max-content;
      font-size: 24px;
      font-family: Microsoft YaHei;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      full-screen-toggle-icon {
        min-width: 18px;
        min-height: 18px;
      }
    }
  }
  .title {
    width: 1536px;
    height: 70px;
    position: relative;
    margin: 30px auto 0;
    img {
      width: 100%;
      height: 100%;
    }
    span {
      font-size: 36px;
      font-family: HuXiaoBo-NanShen;
      font-weight: 400;
      line-height: 0px;
      color: #FFFFFF;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      letter-spacing: 5px;
    }
  }
  .empty {
    text-align: center;
    margin-top: 210px;
    img {
      width: 354px;
    }
    p {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #A8D3FF;
      margin-top: 16px;
    }
  }
</style>