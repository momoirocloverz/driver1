<template>
  <div class="outer">
    <div class="full" @click="fullScreen">全屏演示</div>
    <adaptive-box>
      <iframe id="map" :src="text_url" frameborder="0" width="100%" height="100%"></iframe>
    </adaptive-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text_url: ''
    }
  },
  mounted() {
    console.log(this.$route.query)
    let title = this.$route.query.title
    switch(title) {
      case '农产品线上交易':
        this.text_url = 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc0fQ=='
        break;

      case '食用菌产业链':
        this.text_url = 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc1fQ=='
        break;

      case '农开区数字化':
        this.text_url = 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc2fQ=='
        break;

      case '农业面源污染治理':
        this.text_url = 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc3fQ=='
        break;

      default: 
        this.text_url = 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc0fQ=='
    }
  },
  methods: {
    fullScreen() {
      var elem = document.getElementById("map"); 
      console.log(elem);
      this.requestFullScreen(elem);
    },
    requestFullScreen(element) { 
      var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen; 
      if (requestMethod) { 
        requestMethod.call(element); 
      } else if (typeof window.ActiveXObject !== "undefined") { 
        var wscript = new ActiveXObject("WScript.Shell"); 
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    } 
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    height: 100vh;
    background: rgba(24,27,25,1);
    overflow: hidden;
  }
  .full {
    color: #fff;
    margin: 60px 0 0 60px;
    font-size: 30px;
    font-weight: 600;
    cursor: pointer;
  }
  .map {
    width: 100%;
    height: 100%;
  }
  .handle {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
    }
    span {
      font-size: 16px;
      margin-left: 6px;
      color: #fff;
    }
  }
</style>