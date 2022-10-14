<template>
  <div :class="isHide ? 'right right-hide' : 'right right-show'">
    <div class="hide-right" @click="showHide">
      <img
        class="icon"
        :src="
          !isHide
            ? require('@/assets/image/fenghua/rice/hide-left-icon.png')
            : require('@/assets/image/fenghua/rice/hide-right-icon.png')
        "
      >
      <div class="text">{{ isHide ? "展开右侧" : "收起右侧" }}</div>
    </div>
    <right-1 />
    <right-2 />
  </div>
</template>

<script>
import Right1 from './components/right/right1.vue'
import Right2 from './components/right/right2.vue'
export default {
  components: { Right1, Right2 },
  data() {
    return {
      isHide: false // 是否隐藏
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    showHide: function() {
      this.isHide = !this.isHide
    }
  }
}
</script>

<style scoped lang="scss">
.right {
  position: relative;
  z-index: 3;
  width: 25.88%;
  height: 100%;
  margin-right: 11px;
  background: url("~@/assets/image/fenghua/rice/right-bg.png") no-repeat;
  background-size: 100% 100%;
   background-color: rgba(26, 60, 114, 0.5);
  overflow: hidden;

  .hide-right {
    position: fixed;
    z-index: 10;
    right: 0px;
    top: 50px;
    width: 26px;
    height: 105px;
    background: url("~@/assets/image/fenghua/rice/hide-right-s.png") no-repeat;
    background-size: 100%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon {
      width: 16px;
      height: 16px;
    }
    .text {
      width: 0px;
      height: 0px;
      opacity: 0;
    }
  }
  .hide-right:hover {
    top: 37px;
    width: 65px;
    height: 131px;
    background: url("~@/assets/image/fenghua/rice/hide-right-l.png") no-repeat;
    background-size: 100%;
    background-size: cover;
    animation: _hide-right 200ms ease-in 1;
    .icon {
      width: 16px;
      height: 16px;
      animation: _hide-right-icon 1000ms ease-in infinite;
    }
    .text {
      width: 20px;
      height: auto;
      margin-top: 4px;
      font-size: 14px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 18px;
      writing-mode: lr-tb;
      opacity: 1;
    }
  }
  @keyframes _hide-right {
    0% {
      right: -10px;
    }
    100% {
      right: 0px;
    }
  }
  @keyframes _hide-right-icon {
    0% {
      margin-right: 0px;
    }
    25% {
      margin-right: -10px;
    }
    50% {
      margin-right: 0px;
    }
    75% {
      margin-right: 10px;
    }
    100% {
      margin-right: 0px;
    }
  }
}

.right-hide {
  margin-right: calc(-25.88% + 11px);
  animation: _right-hide 400ms linear 1;
}

.right-show {
  animation: _right-show 400ms linear 1;
}
@keyframes _right-hide {
  0% {
    margin-right: 11px;
  }
  100% {
    margin-right: calc(-25.88% + 11px);
  }
}
@keyframes _right-show {
  0% {
    margin-right: calc(-25.88% + 11px);
  }
  100% {
    margin-right: 11px;
  }
}
</style>
