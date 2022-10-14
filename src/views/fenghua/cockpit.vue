<template>
  <div class="index_wrap">
    <!-- <div @click="backhome" class="back-home">
      <img src="../../assets/image/index/index09.png" alt="">
      <span>返回主页</span>
    </div> -->
    <iframe width="100%" style="height: 100%; margin: 0; padding: 0; border: 0;" :src="activeUrl" />
    <div class="menus">
      <div
        class="item"
        :class="{ active: item.name === activeMenu }"
        v-for="item in menus"
        :key="item.name"
        @click="toPage(item.child, item.name, item.webUrl)"
      >
        <div class="nav_name">{{ item.name }}</div>
        <div class="second_nav" v-if="item.child">
          <div class="border"></div>
          <div
            class="second_item"
            v-for="second in item.child"
            :key="second.name"
            @click.stop="toPage(second.child, item.name, second.webUrl, second.target)"
          >
            <img :src="require('../newCockpit/nav_icon.png')" alt="">
            {{ second.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: '奉化概况',
      activeUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NzYwfQ==',
      menus: [
        {
          name: '奉化概况',
          webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NzYwfQ=='
        },
        {
          name: '乡村产业',
          webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NzA2fQ=='
        },
        {
          name: '乡村服务',
          webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NzU2fQ==',
          // child: [
          //   {
          //     name: '乡村服务',
          //     webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NjE0fQ==',
          //   },
          //   {
          //     name: '垃圾分类数字化',
          //     webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NTcxfQ=='
          //   },
          //   {
          //     name: '肥药实名制数字化',
          //     webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NTcyfQ=='
          //   },
          // ]
        },
        {
          name: '乡村治理',
          webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NzIxfQ=='
          // child: [
          //   {
          //     name: '乡村治理',
          //     webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NTg5fQ=='
          //   },
          //   {
          //     name: '低收入农户帮扶促',
          //     webUrl: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6NTg1fQ=='
          //   }
          // ]
        }
      ]
    }
  },
  methods: {
    toPage(child, name, url, target) {
      if(target) {
        window.open(url);
      } else {
        if (!child) {
          this.activeMenu = name
          this.activeUrl = url
        }
      }
      
    },
    backhome() {
      this.$router.replace('/fenghua/data');
    }
  }
}
</script>

<style scoped lang="scss">
  .back-home {
      display: flex;
      align-items: center;
      margin-right: 50px;
      cursor: pointer;
      position: fixed;
      right: 30px;
      top: 90px;
      img {
        height: 50px;
        margin-right: 10px;
      }
      span {
        font-size: 44px;
        font-family: PingFang SC Regular, PingFang SC Regular-Regular;
        font-weight: 400;
        color: #75E3FF;
      }
      p {
        width: 15px;
        height: 15px;
        border-top: 2px solid #75E3FF;
        border-right: 2px solid #75E3FF;
        transform: rotate(135deg);
        margin: 0 10px;
        transition: all 0.3s;
      }
    }
  .index_wrap {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .menus {
      position: absolute;
      z-index: 9999;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 2vh;
      padding-bottom: 2.5vh;
      .item {
        transition: 1s;
        position: relative;
        aspect-ratio: 12.3/4.26;
        //height: 4.26vh;
        //font-size: 1.8vh;
        //line-height: 4.26vh;
        height: 110px;
        font-size: 44px;
        line-height: 110px;
        text-align: center;
        font-family: 'Microsoft YaHei';
        color: rgba(255, 255, 255, .56);
        background: url("../newCockpit/nav_bg.png");
        background-size: 100% 100%;
        font-weight: 700;
        cursor: pointer;
        animation-duration: .5s;
        &:after {
          content: ' ';
          position: absolute;
          display: none;
          width: 100%;
          top: -1.7vh;
          left: 0;
          height: 1.7vh;
          background: transparent;
          cursor: default;
        }
        &:hover {
          &:after {
            display: block;
          }
          .second_nav {
            display: block;
            height: auto;
            opacity: 1;
            overflow: initial;
          }
        }
        .second_nav {
          transition: .3s;
          display: none;
          opacity: 0;
          position: absolute;
          height: 0;
          padding: 1.6vh 0;
          overflow: hidden;
          white-space: nowrap;
          font-size: 1.5vh;
          line-height: 3vh;
          left: 50%;
          transform: translateX(-50%);
          bottom: 6vh;
          text-align: left;
          color: #fff;
          background: linear-gradient(-135deg, transparent 25px, rgba(82, 204, 255, .5)  0);
          &:after {
            content: ' ';
            position: absolute;
            z-index: -1;
            top: 2px;
            left: 2px;
            width: calc(100% - 4px);
            height: calc(100% - 4px);
            background: linear-gradient(-135deg, transparent 25px, rgba(1, 61, 99, .7) 0);
          }
          .second_item {
            padding: .2vh 0;
            padding-right: 2vh;
            border: 2px solid transparent;
            border-top: 0;
            border-bottom: 0;
            &:hover {
              background: rgba(1, 61, 99, 1);
              border-color: rgba(82, 204, 255, .5);
            }
          }
          img {
            padding: 0 .3vh 0 1vh;
          }
          .border {
            position: absolute;
            bottom: -1.5vh;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-top: 1.5vh solid rgba(82, 204, 255, .5);
            border-right: 2.5vh solid transparent;
            border-left: 2.5vh solid transparent;
            border-bottom: 0;
            &:before {
              content: ' ';
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: 2px;
              width: 0;
              height: 0;
              border-top: 1.5vh solid rgba(1, 61, 99, .7);
              border-right: 2.5vh solid transparent;
              border-left: 2.5vh solid transparent;
              border-bottom: 0;
            }
          }
        }
      }
      .active {
        background: url("../newCockpit/nav_bg_active.png") no-repeat;
        background-size: 100%;
        color: #fff;
      }
    }
  }
</style>
