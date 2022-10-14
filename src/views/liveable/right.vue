<template>
  <div class="right">
    <title-bar title="生态宜居" custom-style="width: 97%;margin-top: 15px; " />

    <right-1 />
    <right-2 />
    <right-3 />

  </div>
</template>

<script>
import Right1 from './components/right/right1.vue'
import Right2 from './components/right/right2.vue'
import Right3 from './components/right/right3.vue'
import TitleBar from './components/titleBar.vue'
export default {
  components: { TitleBar, Right1, Right2, Right3 },
  data() {
    return {}
  },
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.right {
  width: 25.88%;
  height: 100%;
  margin-right: 30px;
  background: url(https://img.hzanchu.com/acimg/c95ba183f9f90eb85a3d9c2be27e684f.png)
    no-repeat;
  background-size: 100%;
  background-size: cover;
  overflow: hidden;
}
</style>