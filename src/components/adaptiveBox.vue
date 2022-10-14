<template>
  <div class="adaptive-box" id="adaptive_box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'adaptiveBox',
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      Height: 0
    }
  },
  mounted() {
    // if(document.body.clientWidth >= 3000) {
    //   this.Height = '100%'
    // } else {
    //   this.Height = document.body.clientWidth / ( 4560 / 1330 ) + 'px'
    // }
    console.log(this.width, 'width')
    document.getElementById('adaptive_box').style.height = 'calc(100vw / ( ' + this.width + '/' + this.height + ' ))'
  }
}
</script>

<style lang="scss" scoped>
  .adaptive-box {
    width: 100vw;
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>