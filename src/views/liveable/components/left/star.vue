<template>
  <img
    class="_ani-item-img"
    :style="
      '--time: ' +
        time +
        ';--type: ' +
        type +
        ';--left: ' +
        left +
        ';--bottom1: ' +
        bottom1 +
        ';--bottom2: ' +
        bottom2 +
        ';--opacity: ' +
        opacity
    "
    src="https://img.hzanchu.com/acimg/9a1e311cda71aed176e6088f18561fbf.png"
  >
  <!--

<div
    class="_ani-item"
    :style="
      '--time: ' +
        time +
        ';--type: ' +
        type +
        ';--left: ' +
        left +
        ';--bottom1: ' +
        bottom1 +
        ';--bottom2: ' +
        bottom2 +
        ';--opacity: ' +
        opacity
    "
  />
  -->
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    left: {
      type: String,
      default: ''
    },
    bottom1: {
      type: String,
      default: ''
    },
    bottom2: {
      type: String,
      default: ''
    },
    opacity: {
      type: String,
      default: ''
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
._ani-item {
  width: 2px;
  height: 34px;
  background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0));
  animation: _ani var(--time) var(--type) infinite normal;
  opacity: 0;
}

._ani-item-img {
  width: 20px;
  height: 20px;
  animation: _ani var(--time) var(--type) infinite normal;
  opacity: 0;
}
@keyframes _ani {
  0% {
    position: absolute;
    z-index: -1;
    left: var(--left);
    bottom: var(--bottom1);
    opacity: 0;
  }

  50% {
    position: absolute;
    z-index: -1;
    left: var(--left);
    bottom: var(--bottom2/2);
    opacity: 1;
  }
  100% {
    position: absolute;
    z-index: -1;
    left: var(--left);
    bottom: var(--bottom2);
    opacity: var(--opacity);
  }
}
</style>