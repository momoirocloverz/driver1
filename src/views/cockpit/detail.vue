<template>
  <div class="outer">
    <div v-if="type === 'jsc'">
      <iframe src="https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MTc5OX0=" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <div v-else>
      <iframe src="https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjMxOH0=" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <!-- <div class="content" id="map">
      <div class="change-screen" @click="changeScreen()" v-if="url_4560">
        <img src="../../assets/change.png" alt="">
        <span>切换视图</span>
      </div>
      <div class="full-button" @click="enterFull()" v-show="is_1920_screen === '2'">
        <img src="../../assets/fullscreen01.png" alt="">
        <span>大屏模式</span>
      </div>
      
      <div class="full-button" @click="outFull()" v-show="is_1920_screen === '3'">
        <img src="../../assets/fullscreen01.png" alt="">
        <span>退出大屏</span>
      </div>
      <div style="height: 100%;" v-if="is_1920_screen === '1'">
        <iframe :src="url_1920" frameborder="0" width="100%" height="100%" @dblclick="fullScreen"></iframe>
      </div>
      <adaptive-box v-if="is_1920_screen === '2'" :width="screen_width" :height="screen_height">
        <iframe :src="url_4560" frameborder="0" width="100%" height="100%" @dblclick="fullScreen"></iframe>
      </adaptive-box>
      <div style="height: 100%;" v-if="is_1920_screen === '3'">
        <iframe :src="url_4560" frameborder="0" width="100%" height="100%" @dblclick="fullScreen"></iframe>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: '',
    }
  },
  created() {
    this.type = this.$route.query.type;
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    height: 100vh;
    background: rgba(24,27,25,1);
    position: relative;
    div {
      height: 100%;
    }
  }
</style>