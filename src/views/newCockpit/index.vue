<template>
  <div class="outer">
    <div class="index_wrap" ref="wrapper">
      <div class="back-home">
        <img src="../../assets/image/index/index09.png" alt="">
        <span v-show="!subPage" @click="backhome">返回主页</span>
        <span v-show="subPage" @click="toBack">返回上一页</span>
      </div>

      <iframe width="100%" style="height: 100%; margin: 0; padding: 0; border: 0;" :src="activeUrl"/>
      <div class="menus" v-show="!subPage">
        <div
          class="item"
          :class="{ active: item.webUrl === activeUrl }"
          v-for="item in menus"
          :key="item.name"
          @click="toPage(item.child, item.name, item.webUrl)"
        >
          <div class="nav_name">{{ item.name }}</div>
        </div>
      </div>
      <!-- 定点跳转区 -->
      <template v-for="item in boxList">
        <div 
          :key="item.id" 
          class="po-box"
          :style="{
            width: item.width,
            height: item.height,
            position: 'absolute',
            top: item.top,
            left: item.left,
            cursor: 'pointer'
          }"
          @click="toTarget(item)"
          v-show="item.showPage === activeUrl"
        >
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {createOpenTicket} from '@/service/user.js';
import _ from 'lodash';
export default {
  data() {
    return {
      subPage: 0,
      activeUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjU5Nn0=',  // 当前地址
      fromUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjU5Nn0=',  // 来源地址
      menus: [
        {
          name: '农业高质高效',
          webUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjU5Nn0=',
          child: [
            {
              name: '农业产业数字化',
              webUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjU5Nn0='
            },
            {
              name: '农产品线上交易',
              webUrl: 'https://jsc.wsnf.cn/phOnlineTradingOfAgricultural'
            }
          ]
        },
        {
          name: '农村宜居宜业',
          webUrl: 'https://jsc.wsnf.cn/liveable',
          child: [
            {
              name: '农村资源一张图',
              webUrl: 'https://zrzy.phxmgl.cn/pinghu-web/index.html',
              target: 1
            },
            {
              name: '乡村善治数字化',
              webUrl: 'https://jsc.wsnf.cn/cockpit/xcsz'
            },
            {
              name: '垃圾分类数字化',
              webUrl: 'https://jsc.wsnf.cn/cockpit/waste-management'
            },
            {
              name: '生态宜居数字化',
              webUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjMwOX0='
            },
            {
              name: '肥药实名制监管',
              webUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjI3Nn0='
            },
            {
              name: '渔船数字化',
              webUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjIzNH0='
            },
            {
              name: '农村疫情防控监管中心',
              webUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjI0MX0='
            },
            {
              name: '浙农码',
              webUrl: 'https://znm.zjagri.cn/norm/dataBoard/#/'
            }
          ]
        },
        {
          name: '农民富裕富足',
          webUrl: 'https://jsc.wsnf.cn/theRichRicher',
          child: [
            {
              name: '浙农补',
              webUrl: 'https://jsc.wsnf.cn/cockpit/agriculture-subsidies'
            },
            {
              name: '低收入农户帮扶促',
              webUrl: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjIzM30='
            }
          ]
        }
      ],
      boxList: [
        { id: 1, width: '60px', height: '30px', left: '78px', top: '264px', target: '2_0', showPage: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjU5Nn0=' },
        { id: 2, width: '480px', height: '40px', left: '1400px', top: '120px', target: '0_1', showPage: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjU5Nn0=' },
        { id: 3, width: '70px', height: '78px', left: '1790px', top: '630px', target: '1_4', showPage: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjU5Nn0=' },
        { id: 4, width: '100px', height: '100px', left: '1510px', top: '540px', target: '1_5', showPage: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjU5Nn0=' },
        { id: 5, width: '480px', height: '40px', left: '50px', top: '120px', target: '1_1', showPage: 'https://jsc.wsnf.cn/liveable' },
        { id: 6, width: '480px', height: '40px', left: '50px', top: '430px', target: '1_2', showPage: 'https://jsc.wsnf.cn/liveable' },
        { id: 7, width: '480px', height: '40px', left: '50px', top: '700px', target: '1_7', showPage: 'https://jsc.wsnf.cn/liveable' },
        { id: 8, width: '480px', height: '40px', left: '1400px', top: '140px', target: '1_3', showPage: 'https://jsc.wsnf.cn/liveable' }
      ]
    }
  },
  mounted() {
    this.resize();
    if(this.$route.query.indexs) {
      this.resetIframe(this.$route.query.indexs);
    }
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  watch: {
    activeUrl(newVal, oldVal) {
      let arr = this.menus.map(item => {
        return item.webUrl;
      })
      if(!arr.includes(newVal)) {
        this.subPage = 1;
      } else {
        this.subPage = 0;
      }
    }
  },
  methods: {
    resetIframe(indexs) {
      this.fromUrl = this.activeUrl;
      let indexsArr = [];
      indexsArr = indexs.split('_');
      // this.activeMenu = this.menus[indexsArr[0]].name;
      this.activeUrl = this.menus[indexsArr[0]]?.child[indexsArr[1]]?.webUrl;
    },
    toPage(child, name, url, target) {
      if (target) {
        createOpenTicket().then(res => {
          if (res.code === 0) {
            window.open(url + '?ticket=' + res.data.ticket);
          } else {
            console.warn('请登录')
          }
        })
      } else {
        // if (!child) {
          // this.activeMenu = name;
          
          this.activeUrl = url;
        // }
        this.$router.replace('/newcockpit')
      }
    },
    backhome() {
      this.$router.replace('/dataCenter');
    },
    toBack() {
      this.activeUrl = this.fromUrl;
    },
    showForm() {
      this.$router.push('/iframe/popup-form');
    },
    resize: _.debounce(function() {
      console.log(this.$route)
      switch (this.$route.query.mode) {
        case 'vertical':
          this.$refs.wrapper.style.transform = `scale(${window.innerHeight / 1080})`
          break
        default: this.$refs.wrapper.style.transform = `scaleX(${window.innerWidth / 1920}) scaleY(${window.innerHeight / 1080})`
      }
    }, 1000, {leading: true, trailing: true}),
    toTarget(item) {
      this.resetIframe(item.target);
    }
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
.show-form{
  width: 100px;
  height: 80px;
  background: red;
  position: fixed;
  right: 350px;
  top: 90px;
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

.index_wrap {
  transform-origin: 0 0;
  box-sizing: border-box; 
  width: 1920px;
  height: 1080px;
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
      height: 46px;
      font-size: 20px;
      line-height: 46px;
      text-align: center;
      font-family: 'Microsoft YaHei';
      color: rgba(255, 255, 255, .56);
      background: url("./nav_bg.png");
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
        background: linear-gradient(-135deg, transparent 25px, rgba(82, 204, 255, .5) 0);

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
      background: url("./nav_bg_active.png") no-repeat;
      background-size: 100%;
      color: #fff;
    }
  }
}
</style>
