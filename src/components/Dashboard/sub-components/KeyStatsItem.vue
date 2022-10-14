<template>
  <div class="container">
    <div class="label">{{label}}</div>
    <div class="value">
      <div class="number">{{value}}</div>
      <div class="unit">{{unit}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'KeyStatsItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: '-'
    },
    unit: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  .label {
    font-size: 28px;
    // font-family: YouSheBiaoTiHei;
    //font-weight: bold;
    text-align: left;
    color: #ffffff;
    width: max-content;
    white-space: nowrap;
    // padding-left: 10px;
  }
  .value {
    padding: 25px;
    background-image: url("../../../assets/dashboard/border.png");
    background-size: 100% 100%;
    display: flex;
    .number {
      font-size: 50px;
      font-family: YouSheBiaoTiHei;
      font-weight: bold;
      text-align: left;
      color: #f6d72f;
    }
    .unit {
      align-self: flex-end;
      opacity: 0.8;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      text-align: left;
      color: #f6d72f;
      margin-left: 8px;
      margin-bottom: 11px;
    }
  }
}
</style>
