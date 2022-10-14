<template>
  <div class="subsidy-pane">
    <div class="title">
      <span class="text">{{ title }}</span>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Pane',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.subsidy-pane {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  .title {
    //border-image: url('../../assets/subsidies/section-header-bg.webp') 0 0 100 / 2vh;
    //border-bottom-width: 2vh;
    //border-style: solid;
    background: url('../../assets/subsidies/section-header-bg.webp') no-repeat ;
    background-position: 0 200%;
    background-size: 100% 90%;
    padding: 0 1vw;
    flex: 0 0 4.5vh;
    position: relative;
    display: flex;
    align-items: center;
    .text {
      color: white;
      //background: linear-gradient(0deg,#b5f5ff 0%, #ffffff 100%);
      //-webkit-background-clip: text;
      //-webkit-text-fill-color: transparent;
      font-size: 1.8vh;
      font-family: Microsoft YaHei;
      font-weight: 700;
      letter-spacing: 2px;
    }
  }
  .content {
    flex: auto;
    position: relative;
    //padding: 0 1vw;
  }
}
</style>
