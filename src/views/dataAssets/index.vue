<template>
  <div class="outer" ref="wrapper">
    <div class="back-home">
      <img src="../../assets/image/index/index09.png" alt="">
      <span v-show="!subPage" @click="backhome">返回主页</span>
    </div>
    <iframe 
      width="100%" 
      style="height: 100%; margin: 0; padding: 0; border: 0;" 
      src="https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mjc0M30=?ticket=88977e3025e86c3d96ff763ba739aef7"
    />
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize: _.debounce(function() {
      console.log(this.$route)
      switch (this.$route.query.mode) {
        case 'vertical':
          this.$refs.wrapper.style.transform = `scale(${window.innerHeight / 1080})`
          break
        default: this.$refs.wrapper.style.transform = `scaleX(${window.innerWidth / 1920}) scaleY(${window.innerHeight / 1080})`
      }
    }, 1000, {leading: true, trailing: true}),
    backhome() {
      this.$router.replace('/dataCenter');
    },
  }
}
</script>

<style scoped lang="scss">
.outer {
  position: relative;
  overflow: hidden;
  transform-origin: 0 0;
  box-sizing: border-box; 
  width: 1920px;
  height: 1080px;
}
.back-home {
  cursor: pointer;
  position: fixed;
  right: 2%;
  top: 4%;
  display: flex;
  align-items: flex-end;
  img {
    height: 20px;
    margin: 0 10px 0 0;
  }
  span {
    font-size: 20px;
    font-family: PingFang SC Regular, PingFang SC Regular-Regular;
    font-weight: 400;
    color: #75E3FF;
  }
}
</style>