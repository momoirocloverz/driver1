<template>
  <div class="container">
    <hierarchical-stat-item label="粮食完成率" :value="compPct" unit="%">
      <stat-item title="任务数" :value="completionPct.target" unit="万亩" />
      <stat-item title="实际面积" :value="completionPct.actual" unit="万亩" />
    </hierarchical-stat-item>
    <hierarchical-stat-item label="规模种粮占比" :value="sizePct" unit="%">
      <stat-item title="实际面积" :value="proportionPct.total" unit="万亩" />
      <stat-item title="规模种植面积" :value="proportionPct.actual" unit="万亩" />
    </hierarchical-stat-item>
  </div>
</template>

<script>
import HierarchicalStatItem from '@/components/Subsidies/hierarchical-stat-item'
import StatItem from '@/components/Subsidies/stat-item'
import round from 'lodash/round'

export default {
  name: 'ProductionSection',
  components: { StatItem, HierarchicalStatItem },
  data() {
    return {
        completionPct: {
          target: 42.00,
          actual: 42.61
        },
        proportionPct: {
          total: 42.61,
          actual: 32.30
        }
    }
  },
  computed: {
    compPct() {
      return round(100 * this.completionPct.actual / this.completionPct.target, 2)
    },
    sizePct() {
      return round(100 * this.proportionPct.actual / this.proportionPct.total, 2)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding-top: 2vh;
}
</style>
