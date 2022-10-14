<template>
  <div
    class="dashPointsCon"
    :style="customStyle + (url || router ? ';cursor: pointer;' : '')"
    @click="goto"
  >
    <img
      :src="
        time % 3 == 0
          ? 'https://img.hzanchu.com/acimg/f8cea6a20ef2dd0672b1891965c63ba3.png'
          : 'https://img.hzanchu.com/acimg/c765a1527b342d424fae690852444303.png'
      "
      class="first"
    />
    <img
      :src="
        time % 3 == 1
          ? 'https://img.hzanchu.com/acimg/f8cea6a20ef2dd0672b1891965c63ba3.png'
          : 'https://img.hzanchu.com/acimg/c765a1527b342d424fae690852444303.png'
      "
      class="second"
    />
    <img
      :src="
        time % 3 == 2
          ? 'https://img.hzanchu.com/acimg/f8cea6a20ef2dd0672b1891965c63ba3.png'
          : 'https://img.hzanchu.com/acimg/c765a1527b342d424fae690852444303.png'
      "
      class="third"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    customStyle: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    }, // 当前配置可跳转url
    router: {
      type: String,
      default: '',
    }, // 当前配置可跳转Router，上下两者按上者为准
  },
  data() {
    return {
      time: 0, // 当前滚动到的
      timer: null, // 当前定时器
    };
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    startTimer: function() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.time++;
        // console.log(this.time)
      }, 1000);
    },
    // 跳转到相对应的详情页面
    goto: function() {
      if (this.url) {
      }
      if (this.router) {
      }
    },
  },
};
</script>

<style scoped lang="scss">
.dashPointsCon {
  width: 47px;
  height: 13px;

  .first {
    z-index: 1;
    width: 13px;
    height: 13px;
  }
  .second {
    z-index: 1;
    width: 13px;
    height: 13px;
  }
  .third {
    z-index: 1;
    width: 13px;
    height: 13px;
  }
}
</style>
