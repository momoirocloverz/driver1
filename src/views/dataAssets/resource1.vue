<template>
  <div class="resource-box" style="box-shadow: 0px 1px 6px 5px rgba(2,38,118,0.07);">
    <div v-for="(item, index) in list" :key="index" class="item">
      <span>{{item.title}}</span>
      <div class="progress">
        <div :style="{width: item.person + '%'}"></div>
        <img v-if="item.value != 0" src="https://img.hzanchu.com/acimg/a3204b11705d42bc81f3057729988348.png" :style="{left: (item.person - 1) + '%'}">
      </div>
      <span>{{item.value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resource1',
  data() {
    return {
      list: [
        {title: '乡村治理数据', value: 72, person: 0},
        {title: '公共服务数据', value: 43, person: 0},
        {title: '流通营销数据', value: 229, person: 0},
        {title: '市场行情数据', value: 13, person: 0},
        {title: '物联网监管数据', value: 48, person: 0},
        {title: '物联网感知数据', value: 20, person: 0},
        {title: '安全管理数据', value: 214, person: 0},
        {title: '气象数据', value: 0, person: 0},
        {title: '环境数据', value: 11, person: 0},
        {title: '遥感数据', value: 0, person: 0},
        {title: '作物数据', value: 7, person: 0},
        {title: '农情数据', value: 0, person: 0},
        {title: '农业三区四情', value: 47, person: 0},
        {title: '农业产值', value: 28, person: 0},
        {title: '农业主体', value: 23, person: 0},
        {title: '农业资源', value: 59, person: 0},
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      let arr = []
      this.list.map(item => {
        arr.push(item.value)
      })
      console.log(arr, 'arr')
      console.log(Math.max(...arr), 'max')
      let max_value = Math.max(...arr)
      this.list.map(item => {
        item.person = (item.value / max_value).toFixed(2) * 100
      })
      console.log(this.list, 'listlist')
    }
  }
}
</script>

<style lang="scss" scoped>
  .resource-box {
    width: 2200px;
    padding: 30px 10px;
    background: #fff;
    overflow: hidden;
  }
  .item {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: #333;
    margin: 82px 0;
    span:nth-of-type(1) {
      display: block;
      width: 328px;
      text-align: right;
    }
    .progress {
      width: 1550px;
      height: 20px;
      border-radius: 20px;
      background: #F2F7FA;
      margin-left: 50px;
      position: relative;
      div {
        height: 100%;
        border-radius: 20px;
        position: absolute;
        left: 0;
        top: 0;
        background: #FFD987;
      }
      img {
        width: 43px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    span:nth-of-type(2) {
      margin-left: auto;
      width: 180px;
      display: block;
    } 
  }
</style>