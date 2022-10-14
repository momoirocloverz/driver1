<template>
  <div class="hierarchical-item">
    <div class="stat-label">{{ label }}</div>
    <div class="stat-value">
      <span class="number">{{ value }}</span>
      <span class="unit">{{ unit }}</span>
    </div>
    <img class="bracket" :src="require('@/assets/subsidies/bracket.webp')">
    <div class="subsections">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HierarchicalStatItem',
  props: {
    label: {
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
.hierarchical-item {
  display: flex;
  flex: 0 0 100%;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: white;
  row-gap: 1vh;
  .stat-label {
    font-size: 1.8vh;
    letter-spacing: 0.2vh;
    padding: 1vh 1vw;
    background-image: url("~@/assets/subsidies/label-bg.webp");
    background-size: 100% 100%;
  }
  .stat-value {
    vertical-align: baseline;
    .number {
      font-size: 2.3vh;
      margin-right: 0.5vh;
      font-weight: 700;
      color: #ef7e32;
    }
    .unit {
      font-size: 1.6vh;
    }
  }
  .bracket {
    width: 55%;
  }
  .subsections {
    display: flex;
    width: 90%;
    justify-content: space-between;
    //grid-auto-columns: minmax(0, 1fr);
    //grid-auto-flow: column;
  }
}
</style>
