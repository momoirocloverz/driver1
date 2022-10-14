<template>
  <div class="container">
    <StatItem title="粮食生产功能区" value="19.01" unit="万亩"/>
    <StatItem title="高标准农田" value="30.4" unit="万亩" />
    <StatItem title="永久基本农田" value="37.9" unit="万亩" />
  </div>
</template>

<script>
import StatItem from '@/components/Subsidies/stat-item'
export default {
  name: 'IndustrialBaseSection',
  components: { StatItem }
}
</script>

<style scoped lang="scss">
.container {
  display: grid;
  //justify-content: space-between;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  color: white;
  padding-top: 1vh;
  ::v-deep .value {
    background-image: url("~@/assets/subsidies/text-bg.webp");
    background-size: 100% 100%;
    padding: 0.5vh 0;
  }
}
</style>
