<template>
  <el-dialog
    :visible="visible"
    width="60%"
    :title="title"
    custom-class="policy-modal"
    @update:visible="updateVisibility"
  >
    <el-table
      :data="tableData"
      class="custom-table"
    >
      <el-table-column
        type="index"
        label="序号"
        width="70"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="category"
        label="政策分类"
        width="110"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="项目名称"
        width="300"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="funding"
        label="资金规模(万元)"
        width="170"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="source"
        label="资金来源"
        align="center"
        header-align="center"
      />
    </el-table>
  </el-dialog>
</template>

<script>

export default {
  name: 'PoliciesModal',
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
  mounted() {
  },
  methods: {
    updateVisibility(e) {
      this.$emit('update:visible', e)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog.policy-modal {
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
        }
      }
      .el-table__body-wrapper {
        max-height: 50vh;
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
                  width: 60%;
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
