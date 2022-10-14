<template>
  <el-dialog
    :visible="visible"
    width="1160px"
    :title="title"
    custom-class="details-modal"
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
        prop="real_name"
        label="承包人"
        width="100"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="mobile"
        label="电话"
        width="130"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span >{{ mask(scope.row.mobile)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="area_name"
        label="所属地区"
        width="100"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="plot_area"
        label="补贴面积"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span >{{ formatNumber(scope.row.plot_area)}}亩</span>
        </template>
      </el-table-column>
      <el-table-column
        label="补贴金额"
        width="100"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span >{{ formatNumber(scope.row.subsidy_amount)}}元</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="crops_name"
        label="种植作物"
        width="100"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="subsidy_type"
        label="性质"
        width="100"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span >{{ type[String(scope.row.subsidy_type)]}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="town_name"
        label="年份"
        width="100"
        align="center"
        header-align="center"
      /> -->
      <el-table-column
        prop="scale_name"
        label="补贴项目"
        width="100"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="declare_time"
        label="申报时间"
        width="120"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span >{{ scope.row.declare_time.split(' ')[0]}}</span>
          <br />
          <span >{{ scope.row.declare_time.split(' ')[1]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>

import round from 'lodash/round';
export default {
  name: 'ProgressModal',
  components: { },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '',
    },
    isLoading: Boolean,
    tableData: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
    }
  },
  watch: {
  },
  computed: {
    type() {
      return {'1':'个人', '2':'企业/合作社'}
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
    mask(input) {
      return input.slice(0, 3).concat(''.padEnd(4, '*'), input.slice(-4))
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog.details-modal {
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
      .el-table__empty-text {
        font-size: 2vh;
        color: lightgray;
      }
    }
  }
}
</style>
