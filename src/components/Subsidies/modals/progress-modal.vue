<template>
<div>
  <el-dialog
    :visible="visible"
    width="1160px"
    :title="title"
    custom-class="progress-modal"
    @update:visible="updateVisibility"
  >
    <el-table
      :data="tableData"
      class="custom-table"
      v-loading="isLoading"
      element-loading-text="读取中..."
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        type="index"
        label="序号"
        width="70"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="town_name"
        label="地区"
        width="100"
        align="center"
        header-align="center"
      />
      <el-table-column
        label="已发放"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <div :style="{cursor: 'pointer'}" @click="isDetailsModalVisible = true; otherParams.town_id = scope.row.town_id;otherParams.type = 1;
           modalTitle=`${scope.row.town_name}已发放统计明细`">
            <span >{{ formatNumber(scope.row.get_Issued.counts)}}户/</span>
            <span >{{ formatNumber(scope.row.get_Issued.totals)}}亩/</span><br />
            <span >{{ formatNumber(scope.row.get_Issued.total_subsidy_amount)}}元</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="待发放"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <div :style="{cursor: 'pointer'}" @click="isDetailsModalVisible = true; otherParams.town_id = scope.row.town_id;otherParams.type = 2;
           modalTitle=`${scope.row.town_name}待发放统计明细`">
            <span >{{ formatNumber(scope.row.get_To_be_issued.counts)}}户/</span>
            <span >{{ formatNumber(scope.row.get_To_be_issued.totals)}}亩/</span><br />
            <span >{{ formatNumber(scope.row.get_To_be_issued.total_subsidy_amount)}}元</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="待镇审核"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <div :style="{cursor: 'pointer'}" @click="isDetailsModalVisible = true; otherParams.town_id = scope.row.town_id;otherParams.type = 3;
           modalTitle=`${scope.row.town_name}待镇审核统计明细`">
            <span >{{ formatNumber(scope.row.get_To_be_reviewed.counts)}}户/</span>
            <span >{{ formatNumber(scope.row.get_To_be_reviewed.totals)}}亩/</span><br />
            <span >{{ formatNumber(scope.row.get_To_be_reviewed.total_subsidy_amount)}}元</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="公示中"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <div :style="{cursor: 'pointer'}" @click="isDetailsModalVisible = true; otherParams.town_id = scope.row.town_id;otherParams.type = 4;
           modalTitle=`${scope.row.town_name}公示中统计明细`">
            <span >{{ formatNumber(scope.row.get_In_public.counts)}}户/</span>
            <span >{{ formatNumber(scope.row.get_In_public.totals)}}亩/</span><br />
            <span >{{ formatNumber(scope.row.get_In_public.total_subsidy_amount)}}元</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="未公示"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <div :style="{cursor: 'pointer'}" @click="isDetailsModalVisible = true; otherParams.town_id = scope.row.town_id;otherParams.type = 6;
           modalTitle=`${scope.row.town_name}未公示统计明细`">
            <span >{{ formatNumber(scope.row.get_Unpublished.counts)}}户/</span>
            <span >{{ formatNumber(scope.row.get_Unpublished.totals)}}亩/</span><br />
            <span >{{ formatNumber(scope.row.get_Unpublished.total_subsidy_amount)}}元</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
    <DetailsModal
      :visible="isDetailsModalVisible"
      :title="modalTitle"
      :table-data="detailsData"
      :isLoading="isLoadingDetails"
      @update:visible="isDetailsModalVisible = $event"
    />
</div>
</template>

<script>
import DetailsModal from './detail-modal.vue'
import round from 'lodash/round';
import { getProgressDetails } from '@/service/subsidies';
export default {
  name: 'ProgressModal',
  components: { DetailsModal },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    isLoading: Boolean,
    title: {
      type: String,
      default: '',
    },
    tableData: {
      type: Array,
      default: ()=>[]
    },
    searchParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      detailsData: [],
      modalTitle: '申报数据统计列表详情',
      otherParams: {
        city_id: undefined,
        town_id: undefined,
        type: undefined,
        page: 1,
        page_size: 1000
      },
      isLoadingDetails: false,
      isDetailsModalVisible: false,
    }
  },
  watch: {
    isDetailsModalVisible(visible) {
      if (visible) {
        this.updateDetailData();
      }
    }
  },
  mounted() {
  },
  methods: {
    updateVisibility(e) {
      this.$emit('update:visible', e)
    },
    formatNumber(num) {
      const rounded = round(num, 2)
      return isNaN(rounded) ? '0' : rounded
    },
    updateDetailData() {
      this.isLoadingDetails = true
      getProgressDetails({...this.searchParams, ...this.otherParams}).then(result=>{
        if (result.code !== 0) {
          throw new Error(result.msg)
        }
        this.detailsData = result.data.data
      }).catch((e) => {
        this.$message.error(`读取失败: ${e.message}`)
      }).finally(()=>{
        this.isLoadingDetails = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog.progress-modal {
  min-height: 700px;
  max-height: 700px;
  background: url("~@/assets/subsidies/modal-bg.webp") no-repeat;
  background-size: 100% 100%;
  .el-dialog__header {
    text-align: center;
    height: 9vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .el-dialog__title {
      font-size: 2.4vh;
      margin-top: 1vh;
      font-weight: 700;
      color: white;
      letter-spacing: 0.2vh;
    }
    .el-dialog__headerbtn {
      right: 3vw;
      top: 50%;
      .el-dialog__close {
        color: white;
      }
    }
  }
  .el-dialog__body {
    padding: 2vh 3vw 4vh 3vw;
    display: flex;
    .custom-table {
      background: transparent;
      border: none;
      &::before {
        background-color: transparent;
      }
      tr {
        background-color: transparent;
        th {
          background-color: transparent;
          border: none;
          font-size: 2vh;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 2px;
            .cell {
                line-height: 2.4vh;
            }
        }
      }
      .el-table__body-wrapper {
        max-height: 480px;
        overflow-y: scroll;
        color: white;
        .el-table__row {
          &:hover {
            background-color: inherit;
            td {
              background-color: inherit;
            }
          }
          td {
            border: none;
            font-size: 1.8vh;
            &:first-of-type {
              .cell {
                div {
                  background: linear-gradient(to top, #10A2EA, #065791);
                  border-radius: 50%;
                  aspect-ratio: 1/1;
                  width: 35px;
                  word-break: keep-all;
                  margin: auto;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
          &:nth-child(odd) {
            background-color: #103260;
          }
        }
        &::-webkit-scrollbar {
          width: 0.4vw;
          height: 0.5vw;
        }

        &::-webkit-scrollbar-track {
          border-radius: 10em;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #004FA7;
          border-radius: 10em;
        }
      }
    }
  }
}
</style>
