<template>
  <div class="_right-title" :style="customStyle">
    <img
      src="https://img.hzanchu.com/acimg/70713bbf7586667e0618231489d10abd.png"
      class="_bg"
    >

    <div class="_title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    customStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {},

  methods: {}
}
</script>

<style scoped lang="scss">
._right-title {
  position: relative;
  width: 308px;
  height: 16px;
  margin-left: 20px;

  ._title {
    z-index: 2;
    position: absolute;
    top: -8px;
    left: 26px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
  ._bg {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 308px;
    height: 16px;
  }
}
</style>
