<template>
  <div class="container">
    <div class="stats">
      <StatItem title="主导品种" value="10" unit="个" />
      <StatItem title="主推技术" value="15" unit="项" />
    </div>
    <div class="charts">
      <dashboard-ring-chart title="农机覆盖率" value="100" :color="['#7affff10','#32ffff']" />
      <dashboard-ring-chart title="综合机械化率" value="90" :color="['#7affd010','#32ffc5']" />
      <dashboard-ring-chart title="统防统治率" value="72" :color="['#7aa0ff10','#3254ff']" />
    </div>
  </div>
</template>

<script>
import DashboardRingChart from '@/components/Subsidies/dashboard-ring-chart'
import StatItem from '@/components/Subsidies/stat-item'
export default {
  name: 'ProductionCapacitySection',
  components: { StatItem, DashboardRingChart }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  .stats {
    display: flex;
    width: 20%;
    height: 100%;
    flex-flow: column;
    padding: 1.5vh 0 0 0;
    row-gap: 1.5vh;
  }
  .charts {
    display: grid;
    width: 80%;
    height: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    overflow: hidden;
  }
}
</style>
