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
  name: "MinorStatItem",
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
  }
}
</script>

<style scoped lang="scss">

.container {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 15px 30px;
  background-image: url("../../../assets/dashboard/border.png");
  background-size: 100% 100%;
  .label {
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
  }
  .value {
    display: flex;
    align-items: baseline;
    .number {
      font-size: 30px;
      font-family: YouSheBiaoTiHei;
      text-align: left;
      color: #ffffff;
      //text-shadow: 0px 2px 18px 0px rgba(19,128,255,0.84);
    }
    .unit {
      font-size: 20px;
      font-family: Microsoft YaHei;
      text-align: left;
      color: #f9fbfe;
      margin-left: 9px;
      margin-bottom: 6px;
    }
  }
}
</style>
