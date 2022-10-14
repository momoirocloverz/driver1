<template>
  <div class="alert-container">
    <dashboard-gauge-chart title="市场储备额" value="4.04" unit="万吨" max="5" />
    <dashboard-gauge-chart title="成品粮储备" value="1100" unit="吨" max="1500" />
    <dashboard-gauge-chart title="应急加工能力" value="370" unit="吨" max="500" />
    <dashboard-gauge-chart title="应急运输能力" value="300" unit="吨" max="500" />
  </div>
</template>

<script>
import DashboardGaugeChart from '@/components/Subsidies/dashboard-gauge-chart'
export default {
  name: 'AlertSection',
  components: { DashboardGaugeChart }
}
</script>

<style scoped lang="scss">
.alert-container {
  display: grid;
  column-gap: 2vw;
  grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr));
}
</style>
