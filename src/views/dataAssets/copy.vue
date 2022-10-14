<template>
  <div class="outer">
    <div class="box">
      <div class="module1">
        <h5>数据采集情况</h5>
        <div class="grid-one">
          <capacity></capacity>
          <make-up></make-up>
          <system></system>
          <dataTable></dataTable>
        </div>
      </div>

      <div class="module2">
        <div class="left">
          <h5>数据资源项主题分布（个）</h5>
          <resource1></resource1>
        </div>
        <div class="right">
          <div class="right-one">
            <h5>已统计资源项数据服务完成情况（个）</h5>
            <right-one></right-one>
          </div>
          <div class="right-two">
            <h5>已统计资源项数据服务分布（个）</h5>
            <right-two></right-two>
          </div>
          <div class="right-three">
            <h5>归集资源项情况（个）</h5>
            <right-three></right-three>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import capacity from '@/views/dataAssets/capacity'
import makeUp from '@/views/dataAssets/makeUp'
import system from '@/views/dataAssets/system'
import dataTable from '@/views/dataAssets/dataTable'
import resource1 from '@/views/dataAssets/resource1'
import rightOne from '@/views/dataAssets/rightOne'
import rightTwo from '@/views/dataAssets/rightTwo'
import rightThree from '@/views/dataAssets/rightThree'
export default {
  name: 'dataAssets',
  components: {
    capacity,
    makeUp,
    system,
    dataTable,
    resource1,
    rightOne,
    rightTwo,
    rightThree
  },
  data() {
    return {

    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    background: #f0f6f9;
  }
  .box {
    width: 4560px;
    padding: 0 48px;
    overflow: hidden;
    min-height: 100vh;
    margin: 0 auto;
  }
  .grid-one {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .module2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 100px;
  }
  h5 {
    font-size: 38px;
    color: #333;
    padding: 0;
    margin: 97px 0 36px;
  }
</style>