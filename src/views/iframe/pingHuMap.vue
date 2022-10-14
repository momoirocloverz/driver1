<template>
  <div class="outer">
    <!-- <div @click="fullScreen" class="handle">
      <img src="../../assets/fullscreen.png" />
      <span>全屏展示</span>
    </div> -->
    <!-- <dv-border-box-13 style="overflow:hidden;padding:15px;"> -->
      <adaptive-box>
        <iframe src="http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTc0fQ==" frameborder="0" width="100%" height="100%" @dblclick="fullScreen"></iframe>
      </adaptive-box>

    <!-- </dv-border-box-13> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      Width: 0,
      Height: 0,
      mapList: [
        {
          src: 'https://img.hzanchu.com/acimg/10735f27ec775b441372e3316b6f8a3d.png',
          show: '1',
          title: '曹桥街道'
        },
        {
          src: 'https://img.hzanchu.com/acimg/9626985d520f1ebff5cab9d9c0a468d9.png',
          show: '1',
          title: '当湖街道'
        },
        {
          src: 'https://img.hzanchu.com/acimg/02ab38d16d86ecfc1219cb4f5e3d6069.png',
          show: '1',
          title: '独山港镇'
        },
        {
          src: 'https://img.hzanchu.com/acimg/4dc0d59e54afee10e7a2b597a0fc309f.png',
          show: '1',
          title: '广陈镇'
        },
        {
          src: 'https://img.hzanchu.com/acimg/cf569476cb91b13597d8913870e878e0.png',
          show: '1',
          title: '林埭镇'
        },
        {
          src: 'https://img.hzanchu.com/acimg/83430dcb6eed783e9728a0b97078a744.png',
          show: '1',
          title: '新仓镇'
        },
        {
          src: 'https://img.hzanchu.com/acimg/ae2adbbfed84b94c5fe010950a1a5167.png',
          show: '1',
          title: '新埭镇'
        },
        {
          src: 'https://img.hzanchu.com/acimg/b17bca105957cadff7230b41b59767c5.png',
          show: '1',
          title: '乍浦镇'
        },
        {
          src: 'https://img.hzanchu.com/acimg/dc0e39f257478f0a195ed1a27a3f9f2a.png',
          show: '1',
          title: '钟埭街道'
        },
      ]
    }

  },
  mounted() {
    console.log(document.body.clientWidth, 'width')
    console.log(4560 / 1330, 'hahaha')
    this.Height = document.body.clientWidth / ( 4560 / 1330 )
  },
  methods: {
    fullScreen() {
      console.log(1)
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
    padding: 60px;
    position: relative;
  }
  .map {
    position: fixed;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
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
