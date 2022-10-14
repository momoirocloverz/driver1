<template>
  <div class="item">
    <div class="title">{{ title }}<slot name="after-title"></slot></div>
    <div class="value">
      <span class="number">{{ value }}</span>
      <span class="unit">{{ unit }}</span>
      <slot name="interactive-elem"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  flex-flow: column;
  text-align: center;
  .title {
    font-size: 1.7vh;
    margin-bottom: 1.5vh;
    letter-spacing: 0.15vh;
    white-space: nowrap;
  }
  .value {
    vertical-align: baseline;
    white-space: nowrap;
    .number {
      font-size: 2.1vh;
      margin-right: 0.5vh;
      font-weight: 700;
    }
    .unit {
      font-size: 1.4vh;
    }
  }
}
</style>
