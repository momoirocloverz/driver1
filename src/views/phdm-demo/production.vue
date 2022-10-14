<template>
  <div class="outer">
    <div class="globalGoback" @click="goBack"></div>
    <img src="https://img.hzanchu.com/acimg/5c9c04e8aee56588005b99672e911ad9.png" alt="">
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.replace('/phdm');
    }
  }
}
</script>

<style scoped lang="scss">
  .outer {
    width: 100vw;
    height: 100vh;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .globalGoback {
    position: absolute;
    z-index: 2;
    top: 51px;
    left: 24px;
    width: 60px;
    height: 40px;
    display: flex;
    cursor: pointer;
  }
</style>