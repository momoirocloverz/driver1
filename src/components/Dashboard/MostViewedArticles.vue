<template>
  <div class="container">
<!--    <div class="title">{{locationName}}三务公开浏览量TOP10</div>-->
    <new-header :title="`${locationName}浏览量`" />
    <ScrollingBoardEV :show-header="false" :source="data" :column-widths="[100, 240]" :view-size="10" />
  </div>
</template>

<script>
import ScrollingBoardEV from '@/components/Dashboard/sub-components/ScrollingBoardEV'
import { getMostViewedArticles } from '@/service/dashboard'
import {last} from 'lodash'
import NewHeader from "@/components/Dashboard/sub-components/NewHeader";

export default {
  name: 'MostViewedArticles',
  components: {NewHeader, ScrollingBoardEV },
  props: {
    location: {
      type: Array,
      default: () => [1]
    },
    locationName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: []
    }
  },
  watch: {
    location(newLocation) {
      this.getData(newLocation)
    }
  },
  mounted() {
  },
  methods: {
    getData(location) {
      getMostViewedArticles(location).then(result => {
        const newData = result.data
        this.data = [{
          header: ['发布地址', '文章标题', '浏览量'],
          data: Array.isArray(newData) ? newData.map(e => [last(e.area_name.split('/').filter(e=>e)), e.title, e.views]) : []
        }]
      })
    }
  }
}
</script>

<style scoped lang="scss">

.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 10px;
  padding-right: 10px;
  row-gap: 10px;
  .title {
    font-size: 50px;
    font-family: YouSheBiaoTiHei;
    //font-weight: bold;
    text-align: left;
    color: #54daf7;
    white-space: nowrap;
    letter-spacing: 1px;
  }
}
</style>
