<template>
  <div id="outer" class="outer">
    <div class="content">
      <header-handle @changeView="changeView" />
      <transition name="fade">
        <div v-show="showView01 && !show_screen" class="view01">
          <swiper v-show="List.length" ref="mySwiper" :options="swiperOption" class="swiper-container">
            <swiper-slide v-for="(item, index) in List" :key="index" class="swiper-slide">
              <img class="thumbnail" :src="item.img" @click="toDetail(item)">
              <img class="border" src="https://img.hzanchu.com/acimg/160fe3ebc8b351582719954715bee35e.png">
            </swiper-slide>
          </swiper>
          <img v-show="List.length" class="disk" src="https://img.hzanchu.com/acimg/c795bdda90a5dbd35c7ec157d2480579.png">
          <img v-show="List.length" id="prev" class="prev" src="https://img.hzanchu.com/acimg/08672af9ca9cd95fce01d4e95d3235f3.png" alt="" @click="toPrev()">
          <img v-show="List.length" id="next" class="next" src="https://img.hzanchu.com/acimg/1db577955facff34c78c2843f3738ff1.png" alt="" @click="toNext()">
          <div v-show="!List.length" class="empty">暂无看板</div>
        </div>
      </transition>

      <transition name="fade">
        <div v-show="showView02" class="view02">
          <div v-for="(item, index2) in List" v-show="List.length" :key="index2" class="item">
            <img :src="item.img" alt="" @click="toDetail(item)">
            <div>{{ item.title }}</div>
          </div>
          <div v-show="!List.length" class="empty">暂无看板</div>
        </div>
      </transition>

      <!-- 底部导航栏 -->
      <div class="bottom">
        <div
          v-for="(item, nav) in navList"
          :key="nav"
          :style="{color: select_id === item.value ? '#FFE745': '#84F2FF'}"
          @click="select(item)"
        >{{ item.title }}</div>
      </div>
    </div>
    <div v-show="show_screen" id="screen_box" class="screen-box">
      <!-- 全屏组件 -->
      <adaptive-box v-if="is_1920_screen === '2'" :width="screen_width" :height="screen_height">
        <iframe :src="screen_url" frameborder="0" width="100%" height="100%" @dblclick="fullScreen" />
      </adaptive-box>
      <div v-if="is_1920_screen === '3'" style="height: 100%;">
        <iframe :src="screen_url" frameborder="0" width="100%" height="100%" @dblclick="fullScreen" />
      </div>
      <!-- <div class="change-screen" @click="changeScreen()" v-show="is_1920_screen === '2'">
        <img src="../../assets/change.png" alt="">
        <span>大屏模式</span>
      </div>
      <div class="change-screen" @click="enterFull()" v-show="is_1920_screen === '3'">
        <img src="../../assets/change.png" alt="">
        <span>桌面模式</span>
      </div> -->
      <!-- 退出全屏按钮 -->
      <div v-show="show_screen" class="full-button" @click="outFull()">
        <img src="../../assets/fullscreen01.png" alt="">
        <span>退出全屏</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    const that = this
    return {
      List: [],
      is_1920_screen: '1',
      screen_width: '',
      screen_height: '',
      shujuzichan: [
        {
          img: 'https://img.hzanchu.com/acimg/299b47b6b0e6912571ba099aa3023881.png',
          title: '数据资产',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NDI3fQ==',
          value: '6'
        }
        // {
        //   img: 'https://img.hzanchu.com/acimg/66aac8570d6b479877d3d6d74620abfe.png',
        //   title: '平湖农业产业数字化',
        //   url: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6OTExfQ==',
        //   value: '10'
        // },
        // {
        //   img: 'https://img.hzanchu.com/acimg/5f7713b18b3dbf50981d82a5bd155150.png',
        //   title: '平湖农产品线上交易',
        //   url: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc0fQ==',
        //   value: '3'
        // },
        // {
        //   img: 'https://img.hzanchu.com/acimg/7ed5cd8595fb116578d2e204fb072862.png',
        //   title: '生态宜居数字化',
        //   url: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc1fQ==',
        //   value: '9'
        // },
        // {
        //   img: 'https://img.hzanchu.com/acimg/04abe500a918687a19ea666331035870.png',
        //   title: '乡村善治数字化',
        //   url: 'http://jsc.wsnf.cn/cockpit/xcsz',
        //   value: '8'
        // },
        // {
        //   img: 'https://img.hzanchu.com/acimg/ac45c1fa31f8b6b8e529f0ea7bf8ba0b.png',
        //   title: '平湖农村疫情防控监管',
        //   url: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTA4Mn0=',
        //   value: '11'
        // },
        // {
        //   img: 'https://img.hzanchu.com/acimg/e99f8a54fa514249bb6c0621278f2f48.png',
        //   title: '肥药实名制数字化监管',
        //   url: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjAzNX0=',
        //   value: '7'
        // },
        // {
        //   img: 'https://img.hzanchu.com/acimg/0cd162af8d8f580215f3913990876390.png',
        //   title: '渔船数字化监管',
        //   url: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTM5N30=',
        //   value: '12'
        // },
        // {
        //   img: 'https://img.hzanchu.com/acimg/5e65fe4c14a08a7a63917133d01a6fc6.png',
        //   title: '浙农补',
        //   url: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTg2OX0=',
        //   value: '13'
        // },
        // {
        //   img: 'https://img.hzanchu.com/acimg/d34272be564b4e660687393affbe1359.png',
        //   title: '低收入农户帮促',
        //   url: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTgwOH0=',
        //   value: '14'
        // }
      ],
      shuzinongkai: [
        {
          img: 'https://img.hzanchu.com/acimg/3157596fca192c4def129b77a019253c.png',
          title: '农开区数字化',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc2fQ==',
          value: '4'
        }
      ],
      chanyexingwang: [
        {
          img: 'https://img.hzanchu.com/acimg/66aac8570d6b479877d3d6d74620abfe.png',
          title: '平湖农业产业数字化',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6OTExfQ==',
          value: '10'
        },
        {
          img: 'https://img.hzanchu.com/acimg/5f7713b18b3dbf50981d82a5bd155150.png',
          title: '平湖农产品线上交易数据',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc0fQ==',
          value: '3'
        }
      ],
      shengtaiyiju: [
        {
          img: 'https://img.hzanchu.com/acimg/7ed5cd8595fb116578d2e204fb072862.png',
          title: '生态宜居数字化',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc1fQ==',
          value: '9'
        }
      ],
      xiangfengwenming: [

      ],
      zhiliyouxiao: [
        {
          img: 'https://img.hzanchu.com/acimg/04abe500a918687a19ea666331035870.png',
          title: '乡村善治数字化',
          url: 'https://jsc.wsnf.cn/cockpit/xcsz',
          value: '8'
        },
        {
          img: 'https://img.hzanchu.com/acimg/ac45c1fa31f8b6b8e529f0ea7bf8ba0b.png',
          title: '平湖农村疫情防控监管中心',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTA4Mn0=',
          value: '11'
        },
        {
          img: 'https://img.hzanchu.com/acimg/b700ae85454894f1b2d0abf2c36e8d73.png',
          title: '肥药实名制数字化监管',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjE3MX0=',
          value: '7'
        },
        {
          img: 'https://img.hzanchu.com/acimg/0cd162af8d8f580215f3913990876390.png',
          title: '渔船数字化监管',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTM5N30=',
          value: '12'
        },
        {
          img: 'https://img.hzanchu.com/acimg/c358a6752c4bff9d219caffd30083b8d.webp',
          title: '垃圾分类数字化',
          url: 'https://jsc.wsnf.cn/cockpit/waste-management',
          value: '15'
        },
        {
          img: 'https://img.hzanchu.com/acimg/3acd8034520798833f8ccba7649ab2be.png',
          title: '浙农码',
          url: 'https://znm.zjagri.cn/norm/dataBoard/#/',
          value: '16'
        }
      ],
      shenghuofuyu: [
        {
          img: 'https://img.hzanchu.com/acimg/5e65fe4c14a08a7a63917133d01a6fc6.png',
          title: '浙农补',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTg2OX0=',
          value: '13'
        },
        {
          img: 'https://img.hzanchu.com/acimg/d34272be564b4e660687393affbe1359.png',
          title: '低收入农户帮促板块',
          url: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTgwOH0=',
          value: '14'
        }
      ],

      navList: [
        { title: '首页', value: '0' },
        // {title: '数字农开', value: '1'},
        { title: '产业兴旺', value: '2' },
        { title: '生态宜居', value: '3' },
        { title: '乡风文明', value: '4' },
        { title: '治理有效', value: '5' },
        { title: '生活富裕', value: '6' }
      ],
      current_title: '',
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: -20,
        centeredSlides: true,
        // loop: true,
        // autoplay: true,
        on: {
          slideChangeTransitionStart: function(swiper, event) {
            that.cur_index = this.activeIndex
            that.current_title = that.List[this.activeIndex].title
            if (this.activeIndex == 0) {
              document.getElementById('prev').style.opacity = '0.5'
              if (that.List.length === 1) {
                document.getElementById('next').style.opacity = '0.5'
              } else {
                document.getElementById('next').style.opacity = '1'
              }
            } else if (this.activeIndex === that.List.length - 1) {
              document.getElementById('prev').style.opacity = '1'
              document.getElementById('next').style.opacity = '0.5'
            } else {
              document.getElementById('prev').style.opacity = '1'
              document.getElementById('next').style.opacity = '1'
            }
            console.log(that.cur_index, 'cur_index')
          }
        }
      },
      select_id: '0',
      showView01: false,
      showView02: true,
      swiper: '',
      cur_index: 0,
      screen_url: '',
      show_screen: false,
      screen_list: [
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NzgyfQ==',
          url_4560: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NTMzfQ==',
          title: '芦笋产业链分析',
          value: '1'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NTMyfQ==',
          url_4560: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6OTQ2fQ==',
          title: '食用菌产业链分析',
          value: '2'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NDU1fQ==',
          url_4560: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc0fQ==',
          title: '平湖农产品线上交易数据',
          value: '3'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6ODU4fQ==',
          url_4560: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6ODU2fQ==',
          title: '农开区数字化',
          value: '4'
        },
        // {
        //   url_1920: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NDQzfQ==',
        //   url_4560: 'http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mzc3fQ==',
        //   title: '农业面源污染治理数字化',
        //   value: '5'
        // },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NDI3fQ==',
          url_4560: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NDcwfQ==',
          title: '数据资产',
          value: '6'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjE3MX0=',
          url_4560: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjE3MX0=',
          title: '肥药实名制数字化监管',
          value: '7'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6ODYxfQ==',
          url_4560: 'https://jsc.wsnf.cn/cockpit/xcsz',
          title: '乡村善治数字化',
          value: '8'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6ODQ2fQ==',
          url_4560: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6NzY5fQ==',
          title: '生态宜居数字化',
          value: '9'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6OTExfQ==',
          url_4560: '',
          title: '平湖农业产业数字化',
          value: '10'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTA4Mn0=',
          url_4560: '',
          title: '平湖农村疫情防控监管中心',
          value: '11'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTM5N30=',
          url_4560: '',
          title: '渔船数字化监管',
          value: '12'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTg2OX0=',
          url_4560: '',
          title: '浙农补',
          value: '13'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTgwOH0=',
          url_4560: '',
          title: '低收入农户帮促板块',
          value: '14'
        },
        {
          url_1920: 'https://jsc.wsnf.cn/cockpit/waste-management',
          url_4560: '',
          title: '垃圾分类数字化',
          value: '15'
        },
        {
          url_1920: 'https://znm.zjagri.cn/norm/dataBoard/#/',
          url_4560: '',
          title: '浙农码',
          value: '16'
        },
        {
          url_1920: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6ODg4fQ==',
          url_4560: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6OTkwfQ==',
          title: '常山大屏',
          value: '101',
          width: 8256,
          height: 1806
        }
      ]
    }
  },
  mounted() {
    // 初始数据
    this.init()
    this.swiper = this.$refs.mySwiper.$swiper
  },
  methods: {
    init() {
      const val = this.$route.query.value
      if (val) {
        this.select_id = val
        if (val == 1) {
          this.List = this.chanyexingwang
        } else if (val == 2) {
          this.List = this.shengtaiyiju
        } else if (val == 3) {
          this.List = this.xiangfengwenming
        } else if (val == 4) {
          this.List = this.zhiliyouxiao
        } else {
          this.List = this.shenghuofuyu
        }
      } else {
        this.List = [...this.shujuzichan, ...this.chanyexingwang, ...this.shengtaiyiju, ...this.xiangfengwenming, ...this.zhiliyouxiao, ...this.shenghuofuyu]
      }
      // if(this.List.length) {
      //   this.current_title = this.List[0].title
      // }

      // if(this.List.length === 1) {
      //   document.getElementById('prev').style.opacity = '0.5'
      //   document.getElementById('next').style.opacity = '0.5'
      // } else {
      //   document.getElementById('prev').style.opacity = '0.5'
      // }
    },
    select(item) {
      this.select_id = item.value
      switch (this.select_id) {
        case '0':
          this.List = [...this.shujuzichan, ...this.chanyexingwang, ...this.shengtaiyiju, ...this.xiangfengwenming, ...this.zhiliyouxiao, ...this.shenghuofuyu]
          break

        case '1':
          this.List = this.shuzinongkai
          break

        case '2':
          this.List = this.chanyexingwang
          break

        case '3':
          this.List = this.shengtaiyiju
          break

        case '4':
          this.List = this.xiangfengwenming
          break

        case '5':
          this.List = this.zhiliyouxiao
          break

        case '6':
          this.List = this.shenghuofuyu
          break

        default:
          this.List = this.shujuzichan
      }
      this.swiper.slideTo(0, 500, false)
      this.current_title = this.List[0].title
      if (this.List.length === 1) {
        document.getElementById('prev').style.opacity = '0.5'
        document.getElementById('next').style.opacity = '0.5'
      } else {
        document.getElementById('prev').style.opacity = '0.5'
        document.getElementById('next').style.opacity = '1'
      }
    },
    changeView() {
      if (this.showView01) {
        this.showView01 = false
        this.showView02 = true
      } else {
        this.showView01 = true
        this.showView02 = false
      }
    },
    toNext() {
      this.swiper.slideTo(this.cur_index + 1, 500, false)
      this.cur_index = this.swiper.activeIndex
      this.current_title = this.List[this.cur_index].title
      console.log(this.cur_index, 'index')
      if (this.cur_index == this.List.length - 1) {
        document.getElementById('next').style.opacity = '0.5'
      }
      if (this.cur_index != 0) {
        document.getElementById('prev').style.opacity = '1'
      }
    },
    toPrev() {
      this.swiper.slideTo(this.cur_index - 1, 500, false)
      this.cur_index = this.swiper.activeIndex
      this.current_title = this.List[this.cur_index].title
      if (this.cur_index == 0) {
        document.getElementById('prev').style.opacity = '0.5'
        if (this.List.length === 1) {
          document.getElementById('next').style.opacity = '0.5'
        } else {
          document.getElementById('next').style.opacity = '1'
        }
      } else {
        document.getElementById('prev').style.opacity = '1'
        document.getElementById('next').style.opacity = '1'
      }
    },
    toDetail(item) {
      if (item.width) {
        this.screen_width = this.list[i].width
        this.screen_height = this.list[i].height
      } else {
        this.screen_width = 4560
        this.screen_height = 1330
      }
      this.show_screen = true
      this.is_1920_screen = '3'
      var elem = document.getElementById('screen_box')
      this.requestFullScreen(elem)
      for (let i = 0; i < this.screen_list.length; i++) {
        if (this.screen_list[i].value === item.value) {
          this.screen_url = this.screen_list[i].url_4560 ? this.screen_list[i].url_4560 : this.screen_list[i].url_1920
        }
      }
    },
    // 全屏效果处理
    fullScreen() {
      var elem = document.getElementById('outer')
      this.requestFullScreen(elem)
    },
    outFull() {
      this.outFullScreen()
      this.screen_url = ''
      this.show_screen = false
    },
    requestFullScreen(element) {
      var ele = element
      if (ele.requestFullscreen) {
        ele.requestFullscreen()
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen()
      } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen()
      } else {
        console.log('request Fullscreen API is not supported')
      }
    },
    outFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else {
        console.log('exit Fullscreen API is not supported')
      }
    },
    changeScreen() {
      this.is_1920_screen = '3'
    },
    enterFull() {
      this.is_1920_screen = '2'
    }
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    background: rgba(11,34,54,1);
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .content {
    width: 100%;
    height: 100%;
    background: url(https://img.hzanchu.com/acimg/e7fbf2b92cc0342f8a4d928906eccdf3.png) no-repeat;
    background-size: 100%;
    overflow: hidden;
  }

  .swiper-container {
    width: 3230px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    height: 60%;
    .swiper-slide {
      text-align: center;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      transition: 300ms;
      transform: scale(0.8);
      position: relative;
      width: 1279px;
      height: 649px;
      margin-top: 2%;
      .border {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .thumbnail {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 99%;
        height: 100%;
        z-index: 9;
        cursor: pointer;
      }
    }
    .swiper-slide-active,.swiper-slide-duplicate-active{
        transform: scale(1.2);
        z-index: 99;
        margin-top: 2%;
    }
  }
  .disk {
    width: 40%;
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
  }
  .current {
    position: fixed;
    top: 66%;
    left: 50%;
    font-size: 44px;
    color: #FFE745;
    transform: translateX(-50%);
  }
  .prev {
    width: 4%;
    position: absolute;
    left: 10%;
    top: 44%;
    cursor: pointer;
  }
  .next {
    width: 4%;
    position: absolute;
    right: 10%;
    top: 44%;
    cursor: pointer;
  }
  .bottom {
    width: 2492px;
    height: 120px;
    background: url(https://img.hzanchu.com/acimg/870dd01cc82de075181f1d3388cb142e.png) no-repeat;
    background-size: 100%;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    div {
      height: 90px;
      line-height: 110px;
      font-size: 40px;
      overflow: hidden;
      text-align: center;
      color: #84F2FF;
      margin-left: 240px;
      transition: all 0.3s;
      cursor: pointer;
    }
    div:nth-of-type(2) {
      margin-left: 280px;
    }
    div:nth-of-type(3) {
      margin-left: 240px;
    }
    div:nth-of-type(4) {
      margin-left: 220px;
    }
    div:nth-of-type(5) {
      margin-left: 225px;
    }
    div:nth-of-type(6) {
      margin-left: 220px;
    }
  }
  .empty {
    font-size: 60px;
    color: #fff;
    font-weight: 600;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%, -50%);
  }

  .view02 {
    width: 4156px;
    overflow: hidden;
    height: 70%;
    overflow-y: scroll;
    margin: 400px auto 0;
    .item {
      width: 1352px;
      height: 760px;
      background: url(https://img.hzanchu.com/acimg/aad6dc6630087f11636ad98e2dd25e77.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      margin-right: 20px;
      margin-bottom: 20px;
      overflow: hidden;
      float: left;
      img {
        width: 86%;
        margin-top: 5%;
        cursor: pointer;
      }
      div {
        font-size: 38px;
        color: #58B7FE;
        margin-top: 20px;
      }
    }
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .screen-box {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 999;
  }
  .full-button {
    position: absolute;
    top: 3%;
    right: 3%;
    display: flex;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
    img {
      width: 50px;
    }
    span {
      font-size: 40px;
      font-weight: 600;
      color: #fff;
      margin-left: 20px;
    }
  }
  .change-screen {
    position: absolute;
    top: 3%;
    right: 10%;
    display: flex;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
    img {
      width: 50px;
    }
    span {
      font-size: 40px;
      font-weight: 600;
      color: #fff;
      margin-left: 20px;
    }
  }
</style>
