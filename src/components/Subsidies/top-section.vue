<template>
  <div class="container">
    <article class="box">
      <header class="header">
        <div class="search-label">年份:</div>
        <el-date-picker
          v-model="searchParams.year"
          class="custom-select year"
          :prefix-icon="'null'"
          size="small"
          type="year"
          value-format="yyyy"
          :clearable="false"
          :editable="false"
        />
        <img :src="require('@/assets/subsidies/select-arrow.svg')" class="select-arrow" />
        <div class="search-label">季节:</div>
        <el-select v-model="searchParams.season" class="custom-select season" size="small">
          <el-option label="春季" :value="1" />
          <el-option label="秋季" :value="2" />
          <el-option label="全年" :value="0" />
        </el-select>
        <img :src="require('@/assets/subsidies/select-arrow.svg')" class="select-arrow" />
        <div class="search-label">种类:</div>
        <el-select v-model="searchParams.scale_id" class="custom-select cat" size="small">
          <el-option
            v-for="option in categories"
            :key="option.id"
            :label="option.scale_name"
            :value="option.id"
          />
          <el-option label="全部补贴" :value="null" />
        </el-select>
        <img :src="require('@/assets/subsidies/select-arrow.svg')" class="select-arrow" />
      </header>
      <div class="content">
        <stat-item title="已申领面积" :value="actualData[0]" unit="万亩">
          <template #interactive-elem>
            <div class="sub-value">{{ percentages[0] }}</div>
          </template>
        </stat-item>
        <stat-item title="已申领金额" :value="actualData[1]" unit="万元" />
        <stat-item title="总面积" :value="actualData[2]" unit="万亩" />
        <stat-item title="已申领户数" :style="{cursor: 'pointer'}" :value="actualData[3]" unit="户" @click.native="isProgressModalVisible = true">
          <template #after-title>
            <img :src="require('@/assets/subsidies/right-arrow.svg')" class="item-arrow" />
          </template>
        </stat-item>
        <stat-item title="已发放金额" :value="actualData[4]" unit="万元">
          <template #interactive-elem>
            <div class="sub-value">{{ percentages[1] }}</div>
          </template>
        </stat-item>
      </div>
    </article>
    <ProgressModal
      :visible="isProgressModalVisible"
      :searchParams="searchParams"
      :isLoading="isLoadingProgressData"
      title="已申领农户统计"
      :table-data="progressData"
      @update:visible="isProgressModalVisible = $event"
    />
  </div>
</template>

<script>
import StatItem from '@/components/Subsidies/stat-item'
import {getOverviewData, getProgressData, getSubsidyCategories} from '@/service/subsidies'
import round from 'lodash/round';
import ProgressModal from './modals/progress-modal'

function formatNumber(num) {
  const rounded = round(num, 2)
  return isNaN(rounded) ? '-' : rounded.toLocaleString()
}

export default {
  name: 'TopSection',
  components: { StatItem, ProgressModal },
  data() {
    return {
      searchParams: {
        year: new Date().getFullYear().toString(),
        season: 1,
        scale_id: 3
      },
      categories: [],
      actualData: ['-', '-', '-', '-', '-'],
      percentages: ['-%', '-%'],
      progressData: [],
      isProgressModalVisible: false,
      isLoadingProgressData: false,
    }
  },
  watch: {
    searchParams: {
      handler() {
        this.getData()
      },
      deep: true
    },
    isProgressModalVisible(visible) {
      if (visible) {
        this.updateProgressData();
      }
    }
  },
  mounted() {
    this.getData()
    this.getCategories()
  },
  methods: {
    getData() {
      getOverviewData(this.searchParams).then((result) => {
        if (result.code !== 0) {
          this.actualData = ['-', '-', '-', '-', '-']
          throw new Error(result.msg)
        }
        this.actualData = [
          `${formatNumber(result.data.plot_area / 10000)}`,
          formatNumber(result.data.subsidy_amount / 10000),
          formatNumber(result.data.plot_area_all / 10000),
          formatNumber(result.data.subsidy_count),
          `${formatNumber(result.data.grant_subsidy_amount / 10000)}`
        ]
        this.percentages = [
          `(${formatNumber(100 * result.data.plot_area / result.data.plot_area_all)}%)`,
          `(${formatNumber(100 * result.data.grant_subsidy_amount / result.data.subsidy_amount)}%)`
        ]
      }).catch((e) => {
        this.$message.error(`读取失败: ${e.message}`)
      })
    },
    getCategories() {
      getSubsidyCategories().then((result) => {
        if (result.code !== 0) {
          throw new Error(result.msg)
        }
        this.categories = result.data
      }).catch((e) => {
        this.$message.error(`读取失败: ${e.message}`)
      })
    },
    updateProgressData() {
      this.isLoadingProgressData = true;
      getProgressData(this.searchParams).then(result=>{
        
        if (result.code !== 0) {
          throw new Error(result.msg)
        }
        this.progressData = result.data
      }).catch((e) => {
        this.$message.error(`读取失败: ${e.message}`)
      }).finally(()=>{
        this.isLoadingProgressData = false;
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 0 0 100%;
  color: white;
  column-gap: 0.8vw;
  margin-top: 0.5vh;
  .item-arrow {
    height: 0.9em;
    vertical-align: -12%;
  }
  .box {
    flex: 1 1 50%;
    height: 15vh;
    display: flex;
    flex-flow: column;
    background-image: url("~@/assets/subsidies/box.webp");
    background-size: 100% 100%;
    .header {
      $font-size: 2000vh / 1080;
      height: 5vh;
      line-height: 5vh;
      display: flex;
      justify-content: flex-start;
      padding-left: 4%;
      align-items: baseline;
      font-size: $font-size;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      //background-image: url("~@/assets/subsidies/text-bg.webp");
      background-size: 100% 100%;
      font-weight: 700;
      color: #f1b841;
      letter-spacing: 0;
      margin-bottom: 1.8vh;
      .search-label {
        white-space: nowrap;
        line-height: 32px;
        height: 32px;
      }
      .select-arrow {
        margin-right: 40px;
        width: 1.5em;
        margin-left: -1.5em;
        pointer-events: none;
      }
      .custom-select {
        &.year {
          width: $font-size * 4.8;
        }
        &.season {
          width: $font-size * 3.8;
        }
        &.cat {
          width: $font-size * 14.4;
        }
        ::v-deep .el-input__inner {
          padding: 0;
          background: transparent;
          border: none;
          font-size: $font-size;
          font-weight: bold;
          letter-spacing: 0;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          color: #E8B958;
        }
        ::v-deep .el-input__suffix {
          display: none;
        }
      }
    }
    .content {
      display: grid;
      grid-auto-columns: minmax(0, 1fr);
      grid-auto-flow: column;
      .sub-value {
        font-size: 1.8vh;
      }
    }
  }
}
</style>
