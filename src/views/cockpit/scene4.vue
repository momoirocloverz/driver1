<template>
  <div class="outer">
    <div class="header">
      <div @click="fullScreen">
        <img src="../../assets/fullscreen.png" />
        <span>全屏展示</span>
      </div>
    </div>
    <div class="content" id="full">
      <iframe width="100%" style="height: 100%;" src="http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6OTR9" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fullScreen() {
      console.log(1)
      var elem = document.getElementById("full"); 
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
    padding: 20px;
  }
  .header {
    height: 60px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    div {
      display: flex;
      align-items: center;
      margin-left: auto;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
      }
      span {
        font-size: 16px;
        margin-left: 6px;
        color: #333;
      }
    }
  }
  .content {
    height: calc(100vh - 180px);
    margin-top: 20px;
  }
</style>