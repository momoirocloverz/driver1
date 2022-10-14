<template>
  <div class="item-container">
    <div class="label">{{label}}</div>
    <div class="value">
      <span class="number">{{value}}</span>
      <span class="unit">{{unit}}</span>
    </div>
    <div class="sub-item-row">
      <div class="sub-item-container" v-for="item in subItems" :key="item.label">
        <div class="sub-item-label">{{item.label}}</div>
        <div class="sub-item-value">
          <span class="sub-item-number">{{item.value}}</span>
          <span class="sub-item-unit">{{item.unit}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewStatItem',
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
    },
    subItems: {
      type: Array,
      default: ()=>[]
    }
  },
}
</script>

<style scoped lang="scss">
$content-padding-left: 0px;
.item-container {
  display: flex;
  flex-flow: column nowrap;
  padding: 14px 16px;
  //width: 100%;
  background-image: url("../../../assets/dashboard/new-stat-item-bg.webp");
  background-size: 100% 100%;
  .label {
    font-size: 18px;
    // font-family: YouSheBiaoTiHei;
    //font-weight: bold;
    text-align: left;
    color: #ffffff;
    width: max-content;
    white-space: nowrap;
  }
  .value {
    padding: 5px 00px 10px $content-padding-left;
    display: flex;
    align-items: baseline;
    .number {
      font-size: 32px;
      font-family: YouSheBiaoTiHei;
      text-align: left;
      color: #f6d72f;
    }
    .unit {
      opacity: 0.8;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      text-align: left;
      color: #f6d72f;
      margin-left: 8px;
    }
  }
  .sub-item-row {
    display: flex;
    padding-left: $content-padding-left;
    column-gap: 10px;
    .sub-item-container {
      display: flex;
      flex: auto;
      flex-flow: column nowrap;
      .sub-item-label {
        font-size: 16px;
        font-family: Microsoft YaHei;
        text-align: left;
        margin-bottom: 5px;
        color: #ffffff;
      }
      .sub-item-value {
        //display: flex;
        //align-items: baseline;
        .sub-item-number {
          font-size: 18px;
          font-family: YouSheBiaoTiHei;
          color: #ffffff;
          //text-shadow: 0px 2px 18px rgba(19,128,255,0.84);
          vertical-align: text-bottom;
        }
        .sub-item-unit {
          font-size: 12px;
          line-height: 18px;
          font-family: Microsoft YaHei;
          margin-left: 6px;
          color: #f9fbfe;
          vertical-align: text-bottom;
        }
      }
    }
  }
}
</style>
