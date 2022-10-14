<template>
  <div class="outer">
    <div class="viewer" ref="viewer">
      <header>
        <img src="./img/header.png" alt="">
      </header>
      <div class="center">
        <left-viewer />
        <center-viewer />
        <right-viewer />
      </div>
      <footer>
        <div
          v-for="item in navList" 
          :key="item.id"
          @click="selectNav(item)"
        >
          {{ item.text }}
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import LeftViewer from './modules/LeftViewer.vue'
import CenterViewer from './modules/CeterViewer.vue'
import RightViewer from './modules/RightViewer.vue'
export default {
  components: {
    LeftViewer,
    CenterViewer,
    RightViewer
  },
  data() {
    return {
      navList: [
        {
          id: 1,
          text: '生产端分析',
          path: '/phdm/production'
        },
        {
          id: 2,
          text: '病虫害预警',
          path: '/phdm/warning'
        },
        {
          id: 3,
          text: '稻米流通',
          path: '/phdm/circulate'
        },
        {
          id: 4,
          text: '质量监管',
          path: '/phdm/regulatory'
        }
      ]
    }
  },
  mounted() {
    /**
     * 页面尺寸发生变化时，缩放页面
     */
    this.resize();
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    /** 底部导航切换 */
    selectNav(item) {
      this.$router.replace(item.path);
    },
    resize: _.debounce(function() {
      switch (this.$route.query.mode) {
        case 'vertical':
          this.$refs.viewer.style.transform = `scale(${window.innerHeight / 1080})`
          break
        default: this.$refs.viewer.style.transform = `scaleX(${window.innerWidth / 1920}) scaleY(${window.innerHeight / 1080})`
      }
    }, 1000, { leading: true, trailing: true })
  }
}
</script>


<style scoped lang="scss">
  /** 依照设计稿1920px * 1080px进行开发 */
  .outer {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .viewer {
    transform-origin: 0 0;
    box-sizing: border-box;
    width: 1920px;
    height: 1080px;
    background: url('./img/bg.png') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
  header {
    width: 100%;
    position: absolute;
    top: 0;
    img {
      width: 100%;
    }
  }

  .center {
    overflow: hidden;
    padding: 0 24px;
    display: flex;
  }

  footer {
    width: 100%;
    height: 63px;
    background: url('./img/footer.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    div {
      width: 180px;
      height: 100%;
      font-size: 28px;
      font-family: PangMenZhengDao-Regular, PangMenZhengDao;
      font-weight: 400;
      color: #94C9E8;
      line-height: 63px;
      letter-spacing: 3px;
      text-align: center;
      cursor: pointer;
    }
    div:hover {
      color: #fff;
      background: url('./img/tab-selected.png') no-repeat;
      background-size: 100% 100%;
    }
  }
</style>