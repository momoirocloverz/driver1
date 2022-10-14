<template>
  <div class="_item" :style="customStyle">
    <div
      v-if="src"
      :style="'--width:' + width + ';--height: ' + height"
      class="_icon"
    >
      <img :src="src">
      <!-- 背景图 -->
      <img
        v-if="showBg"
        src="https://img.hzanchu.com/acimg/9b45dd53244bb13ff97d790e9069e3e6.png"
      >
    </div>

    <div class="_num">
      <div class="_title">{{ title }}</div>

      <div class="_main">
        <countTo
          class="_value"
          :start-val="0"
          :end-val="num"
          :duration="2000"
          :decimals="decimals"
        />
        <span class="_unit">{{ unit }}</span>
      </div>
      <!--
        <div class="_main">
          {{ num }}<span>{{ unit }}</span>
        </div>
      -->

      <!--
      -->
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  components: {
    countTo
  },
  props: {
    customStyle: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    title: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 1
    },
    decimals: {
      type: Number,
      default: 0
    },
    showBg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 重新加载
    reload: function() {}
  }
}
</script>

<style scoped lang="scss">
._item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ._icon {
    position: relative;
    width: var(--width);
    height: var(--height);
    img:nth-of-type(1) {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: var(--width);
      height: var(--height);
    }
    img:nth-of-type(2) {
      position: absolute;
      z-index: 1;
      top: -10px;
      left: -10px;
      width: calc(var(--width) + 20px);
      height: calc(var(--height) + 20px);
      animation: _rotate 2s linear infinite;
    }
    @keyframes _rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(180deg);
      }
    }
  }
  ._num {
    flex: 1;
    margin-left: 15px;

    ._title {
      max-width: 45px; // 暂时给一个45px宽度
      font-size: 16px;
      color: #fff;
      white-space: nowrap;
    }

    ._main {
      margin-top: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      ._value {
        font-size: 24px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #65dcff;
        white-space: nowrap;
      }
      ._unit {
        margin-left: 8px;
        margin-top: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        color: #fff;
        white-space: nowrap;
      }
    }
  }
}
</style>