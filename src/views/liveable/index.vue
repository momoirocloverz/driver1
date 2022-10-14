<template>
  <div class="outer">
    <div ref="liveableRef" class="liveable">
      <div class="header">
        <img
          src="https://img.hzanchu.com/acimg/da178cd7d12d47e91e9a42b78684b29f.png"
        >
        <div class="top-title">平湖数字乡村驾驶舱</div>
      </div>

      <div class="main">
        <left ref="leftRef" :location="location" />
        <center ref="centerRef" @changeTown="changeTown" />
        <right ref="rightRef" />
      </div>
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
      liveableRef: null,
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
        console.log(this.$route)
        switch (this.$route.query.mode) {
          case 'vertical':
            this.$refs.liveableRef.style.transform = `scale(${
              window.innerHeight / 1080
            })`
            break
          default:
            this.$refs.liveableRef.style.transform = `scaleX(${
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
.liveable {
  transform-origin: 0 0;
  width: 1920px;
  height: 1080px;
  background: url(https://img.hzanchu.com/acimg/d140d77c1f024ba38e423d891efd6663.png)
    no-repeat;
  background-size: 100%;
  // background-position: 50% 50%;
  background-size: cover;

  .header {
    position: relative;
    width: 1920px;
    height: 100px;

    img {
      position: absolute;
      bottom: 0px;
      left: 192px;
      width: 1536px;
      height: 70px;
    }
    .top-title {
      position: absolute;
      // top: 110px;
      // left: 456px;
      top: 46px;
      left: 192px;
      width: 1536px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 36px;
      font-family: "HuXiaoBo-NanShenTi2.0";
      color: #fff;
      letter-spacing: 10px;
    }
  }

  .main {
    display: flex;
    flex-direction: row;
    width: 1920px;
    height: 925px;
    margin-top: 22px;
  }
}
</style>