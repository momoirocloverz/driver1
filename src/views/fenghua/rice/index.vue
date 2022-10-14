<template>
  <div class="outer">
    <div ref="riceRef" class="rice">
      <div class="header">
        <img src="@/assets/image/fenghua/rice/top-bg.png">
        <div class="top-title">奉化粮食</div>
        <!-- <router-link to="/home" class="back">返回首页</router-link> -->
      </div>

      <div class="main">
        <left ref="leftRef" :location="location" />

        <right ref="rightRef" />
      </div>

      <center ref="centerRef" @changeTown="changeTown" />
    </div>
  </div>
</template>

<script>
import Left from './left.vue'
import Right from './right.vue'
import Center from './center.vue'
import _ from 'lodash'
export default {
  components: {
    Left,
    Right,
    Center
  },
  data() {
    return {
      leftRef: null,
      centerRef: null,
      rightRef: null,
      riceRef: null,
      location: [1]
    }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    changeTown: function(e) {
      // console.log(e)
      this.location = e
    },
    resize: _.debounce(
      function() {
        // console.log(this.$route)
        switch (this.$route.query.mode) {
          case 'vertical':
            this.$refs.riceRef.style.transform = `scale(${
              window.innerHeight / 1080
            })`
            break
          default:
            this.$refs.riceRef.style.transform = `scaleX(${
              window.innerWidth / 1920
            }) scaleY(${window.innerHeight / 1080})`
        }
      },
      1000,
      { leading: true, trailing: true }
    )
  }
}
</script>

<style scoped lang="scss">
.outer {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.rice {
  transform-origin: 0 0;
  width: 1920px;
  height: 1080px;
  background: url("~@/assets/image/fenghua/rice/bg.png") no-repeat;
  background-size: 100%;
  background-size: cover;

  .header {
    position: relative;
    width: 1920px;
    height: 90px;

    img {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 1920px;
      height: 90px;
    }
    .top-title {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 1920px;
      height: 90px;
      line-height: 90px;
      background-image: -webkit-linear-gradient(
        bottom,
        rgba(106, 203, 255, 1),
        rgba(222, 253, 255, 1)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      font-size: 36px;
      font-family: "HuXiaoBo-NanShenTi2.0";
      letter-spacing: 10px;
    }

    .back {
      position: absolute;
      z-index: 3;
      top: 17px;
      right: 11px;
      width: 150px;
      height: 56px;
      padding-left: 16px;
      background: url("~@/assets/image/fenghua/rice/back-bg.png") no-repeat;
      background-size: 100%;
      background-size: cover;
      font-size: 18px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.9);
      line-height: 56px;
      cursor: pointer;
    }
  }

  .main {
    width: 1920px;
    height: 967px;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
