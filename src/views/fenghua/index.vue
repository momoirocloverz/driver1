<!--
<template>
  <div>
    <iframe src="https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NzAwfQ==" frameborder="0" style="width:100vw;height:100vh;"></iframe>
  </div>
</template>
-->
<template>
  <div class="fenghua">
    <div class="circle1">
      <img
        v-for="(item, index) in list1"
        :key="index"
        :src="
          item.select
            ? 'https://img.hzanchu.com/acimg/a2a313c39922c6a11ee33f9bcfca96a5.png'
            : 'https://img.hzanchu.com/acimg/3dd35148887592ac25725ae12577d650.png'
        "
        :class="item.select ? 'radius' : ''"
      >
    </div>

    <div class="circle2">
      <img
        v-for="(item, index) in list2"
        :key="index"
        :src="
          item.select
            ? 'https://img.hzanchu.com/acimg/a2a313c39922c6a11ee33f9bcfca96a5.png'
            : 'https://img.hzanchu.com/acimg/3dd35148887592ac25725ae12577d650.png'
        "
        :class="item.select ? 'radius' : ''"
      >
    </div>

    <div class="pos1" @click="openLink(1)">
      <div class="bg">
        <img src="@/assets/image/fenghua/bg.png" class="big">
        <img src="@/assets/image/fenghua/pos1-img.png" class="small">
      </div>
      <img src="@/assets/image/fenghua/pos1-text.png" class="text">
    </div>
    <div class="pos2" @click="openLink(2)">
      <div class="bg">
        <img src="@/assets/image/fenghua/bg.png" class="big">
        <img src="@/assets/image/fenghua/pos2-img.png" class="small">
      </div>
      <img src="@/assets/image/fenghua/pos2-text.png" class="text">
    </div>
    <div class="pos3" @click="openLink(3)">
      <div class="bg">
        <img src="@/assets/image/fenghua/bg.png" class="big">
        <img src="@/assets/image/fenghua/pos3-img.png" class="small">
      </div>
      <img src="@/assets/image/fenghua/pos3-text.png" class="text">
    </div>
    <div class="pos4" @click="openLink(4)">
      <div class="bg">
        <img src="@/assets/image/fenghua/bg.png" class="big">
        <img src="@/assets/image/fenghua/pos4-img.png" class="small">
      </div>
      <img src="@/assets/image/fenghua/pos4-text.png" class="text">
    </div>

    <img class="route1" src="@/assets/image/fenghua/route.png">
    <img class="route2" src="@/assets/image/fenghua/route.png">
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: 1, // 当前times数量
      list1: [
        { select: true },
        { select: false },
        { select: false },
        { select: false }
      ],
      list2: [
        { select: false },
        { select: false },
        { select: false },
        { select: true }
      ],
      timer: null
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    openLink: function(type) {
      const url = ''
      if (type === 1) {
        this.$router.push('/fenghua/data/page?type=1')
      } else if (type === 2) {
        this.$router.push('/fenghua/data/page?type=2')
      } else if (type === 3) {
        this.$router.push('/fenghua/data/page?type=3')
      } else if (type === 4) {
        this.$router.push('/fenghua/data/page?type=4')
      }
    },
    init: function() {
      this.timer = setInterval(() => {
        for (const index in this.list1) {
          if (index == this.times % 4) {
            this.list1[index].select = true
          } else {
            this.list1[index].select = false
          }
        }
        for (const index in this.list2) {
          if (index == 3 - (this.times % 4)) {
            this.list2[index].select = true
          } else {
            this.list2[index].select = false
          }
        }
        this.times++
      }, 3000)
    }
    // toPage(child, name, url, target) {
    //   if (target) {
    //     window.open(url)
    //   } else {
    //     if (!child) {
    //       this.activeMenu = name
    //       this.activeUrl = url
    //     }
    //   }
    // },
    // backhome() {
    //   this.$router.replace('/fenghua/data')
    // }
  }
}
</script>

<style scoped lang="scss">
.fenghua {
  width: 100%;
  min-height: 100%;
  background: url(https://img.hzanchu.com/acimg/4a6c764e96eb8de083d3ad53d4ec7cb4.png)
    no-repeat;
  background-size: 100%;
  // background-position: 50% 50%;
  background-size: cover;

  .circle1 {
    position: absolute;
    top: 123px;
    left: 1400px;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
  }

  .circle2 {
    position: absolute;
    top: 123px;
    right: 1370px;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
  }

  .radius {
    box-shadow: 0px 0px 4px rgba(34, 203, 253, 0.7);
    border-radius: 50%;
  }

  .route1 {
    position: absolute;
    bottom: 285px;
    left: 205px;
    width: 160px;
    height: 160px;
    animation: _rotate 3s linear infinite;
  }

  .route2 {
    position: absolute;
    bottom: 285px;
    right: 205px;
    width: 160px;
    height: 160px;
    animation: _rotate 3s linear infinite;
  }
  @keyframes _rotate {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes _rotate {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .pos1 {
    position: absolute;
    left: 909px;
    top: 385px;
    width: 490px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .pos2 {
    position: absolute;
    left: 1660px;
    top: 500px;
    width: 490px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .pos3 {
    position: absolute;
    left: 2400px;
    top: 500px;
    width: 490px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .pos4 {
    position: absolute;
    left: 3160px;
    top: 385px;
    width: 490px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .bg {
    position: relative;
    width: 490px;
    width: 490px;
    .big {
      width: 490px;
      width: 490px;
    }
    .small {
      position: absolute;
      left: 125px;
      top: 20px;
      width: 240px;
      height: 240px;
      animation: _up 2s linear infinite;
    }
  }

  .text {
    width: 490px;
  }

  @keyframes _up {
    0% {
      top: 20px;
    }
    50% {
      top: -20px;
    }
    100% {
      top: 20px;
    }
  }
}
</style>
