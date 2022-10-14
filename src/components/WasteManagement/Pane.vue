<template>
  <div class="waste-pane">
    <div class="title">
      <span class="text">{{ title }}</span>
      <slot name="header-row"></slot>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import { format, addDays, startOfTomorrow } from 'date-fns'

export default {
  name: 'Pane',
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
    }
  },
  watch: {
  },
  mounted() {
    // if (this.useDatepicker) {
    //   this.setAutoUpdateDate()
    // }
  },
  methods: {
    // setAutoUpdateDate() {
    //   const offset = 30000
    //   const timeToNextDay = startOfTomorrow().getTime() - Date.now() + offset
    //   setTimeout(() => {
    //     this.date = format(new Date(), 'yyyy-MM-dd')
    //     this.setAutoUpdateDate()
    //   }, timeToNextDay)
    //   console.log(timeToNextDay)
    // }
  }
}
</script>

<style scoped lang="scss">
.waste-pane {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  box-sizing: border-box;
  border-image: url("~@/assets/subsidies/border-right.webp");
  border-image-slice: 5% 10%;
  border-image-width: 3vh;
  border-width: 5px;
  border-style: solid;
  .title {
    //background: linear-gradient(to top, #006ac6ff, #006ac600);
    background: url('../../assets/dashboard/new-section-header-bg-no-arrow.webp') no-repeat;
    background-size: auto 150%;
    padding-left: 1.5vw;
    flex: 0 0 4.5vh;
    margin-bottom: 1vh;
    position: relative;
    display: flex;
    align-items: center;;
    .text {
      color: white;
      //background: linear-gradient(0deg,#b5f5ff 0%, #ffffff 100%);
      //-webkit-background-clip: text;
      //-webkit-text-fill-color: transparent;
      font-size: 1.8vh;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      letter-spacing: 2px;
    }
  }
  .content {
    flex: auto;
    position: relative;
  }
}
</style>
