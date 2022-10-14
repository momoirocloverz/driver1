<template>
  <div class="_left3">
    <title-bar title="浙农码" />
    <div class="_sub">
      <div class="_left-sub">
        <img
          class="_bg"
          src="https://img.hzanchu.com/acimg/649214c80f2d1653b8890325b7e9efd2.png"
        >
        <div class="_main">
          <div>371806</div>
          <div>总赋码量</div>
          <img
            src="https://img.hzanchu.com/acimg/36b267f027a04865e2adce83041d805f.png"
          >
        </div>

        <div v-if="finish" class="_animation">
          <star
            v-for="(item, index) in list"
            :key="index"
            :time="item.time"
            :type="item.type"
            :left="item.left"
            :bottom1="item.bottom1"
            :bottom2="item.bottom2"
            :opacity="item.opacity"
          />
        </div>
      </div>

      <div class="_left-sub">
        <img
          class="_bg"
          src="https://img.hzanchu.com/acimg/649214c80f2d1653b8890325b7e9efd2.png"
        >
        <div class="_main">
          <div>198723</div>
          <div>累计用码次数</div>
          <img
            src="https://img.hzanchu.com/acimg/36b267f027a04865e2adce83041d805f.png"
          >
        </div>
        <div v-if="finish1" class="_animation">
          <star
            v-for="(item, index) in list1"
            :key="index"
            :time="item.time"
            :type="item.type"
            :left="item.left"
            :bottom1="item.bottom1"
            :bottom2="item.bottom2"
            :opacity="item.opacity"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item.vue'
import TitleBar from '../titleBar.vue'
import Star from './star.vue'
export default {
  components: { Item, TitleBar, Star },
  props: {
    villageId: {
      type: Number,
      default: 0
    },
    townId: {
      type: Number,
      default: 0
    },
    cityId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      obj: {},
      timer: null,
      list: [],
      finish: false,
      timer1: null,
      list1: [],
      finish1: false
    }
  },
  mounted() {
    // linear、ease、ease-in、ease-out、ease-in-out、
    //
    //
    this.init()
    this.init1()
  },
  beforeDestroy() {},
  methods: {
    // 重新加载
    reload: function() {},

    // 初始化动画效果数据
    init: function() {
      for (let index = 0; index < 20; index++) {
        this.list.push({
          index: index,
          time: '',
          times: '',
          type: '',
          left: '',
          bottom1: '',
          bottom2: '',
          opacity: ''
        })
        this.set(index, 0)
      }

      this.finish = true

      this.startCheck()
      // console.log(this.list)
    },
    // 初始化动画效果数据
    init1: function() {
      for (let index = 0; index < 20; index++) {
        this.list1.push({
          index: index,
          time: '',
          times: '',
          type: '',
          left: '',
          bottom1: '',
          bottom2: '',
          opacity: ''
        })
        this.set(index, 1)
      }
      this.finish1 = true
      this.startCheck1()
      // console.log(this.list)
    },
    // 每隔500ms进行检测是否需要删除当前的数据
    startCheck: function() {
      // console.log("ds");
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        for (const item of this.list) {
          item.times -= 500
          if (item.times <= 0) {
            this.set(item.index, 0)
          }
        }
      }, 500)
    },
    // 每隔500ms进行检测是否需要删除当前的数据
    startCheck1: function() {
      // console.log("ds");
      if (this.timer1) {
        clearInterval(this.timer1)
      }
      this.timer1 = setInterval(() => {
        for (const item of this.list1) {
          item.times -= 500
          if (item.times <= 0) {
            this.set(item.index, 1)
          }
        }
      }, 500)
    },
    // 重新创建一条数据
    set: function(index, type) {
      // console.log(index)
      const list = type == 0 ? this.list : this.list1
      list[index].index = index
      list[index].time = parseFloat(4 + Math.random() * 2) + 's'
      list[index].times = 4000 + parseInt(Math.random() * 2000)
      list[index].type = 'linear'
      list[index].left = parseInt(Math.random() * 230) + 'px'
      list[index].bottom1 = parseInt(0 + Math.random() * 70) + 'px'
      list[index].bottom2 = parseInt(70 + Math.random() * 210) + 'px'
      list[index].opacity = Math.random()
    }
  }
}
</script>

<style scoped lang="scss">
._left3 {
  width: 100%;
  margin-top: 24px;
  ._sub {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ._left-sub {
      position: relative;
      width: 50%;
      height: 213px;
      margin-top: 44px;
      padding-left: 6px;
      ._bg {
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 6px;
        width: 230px;
        height: 213px;
      }

      ._main {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-of-type(1) {
          font-size: 30px;
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          color: #65dcff;
        }

        div:nth-of-type(2) {
          margin-top: 39px;
          font-size: 24px;
          font-weight: bold;
          color: #fff;
        }

        img {
          width: 48px;
          height: 48px;
          margin-top: 24px;
        }
      }

      ._animation {
        position: absolute;
        z-index: -1;
        top: -60px;
        left: 6px;
        width: 230px;
        height: 273px;
        // background-color: rgba($color: #fff, $alpha: 0.3);
        overflow: hidden;

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>