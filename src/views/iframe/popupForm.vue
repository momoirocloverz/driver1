<template>
  <div class="outer">
    <transition name="fade">
      <div class="main">
        <div class="head">
          <div class="left">
            <span>资源目录：{{ secendMenuBase.length }} 个</span>
          </div>
          <div class="right">
            <div class="search">
              <input type="text" placeholder="请输入资源目录名称" @keyup.enter='startFilter' v-model="keyword">
              <img :src="require('@/assets/iframes/search.png')" alt="" @click="startFilter"/>
            </div>
          </div>
        </div>
        <div class="tableBox">
          <div class="left">
            <div class="scroll">
              <div
                v-for="(item,index) in menu"
                :key="item.id || index"
                class="info"
                @click="firstActiveChange(item,index)"
              >
                <img v-if="firstActive === index" :src="require('@/assets/iframes/first_active.png')" alt="">
                <span :class="firstActive === index ? 'active':''">{{ item.subject_name || '' }}</span>
              </div>
            </div>
          </div>
          <div class="middle">
            <div class="scroll">
              <div
                v-for="(item,index) in secendMenu"
                :key="item.id || index"

                :class="secondActive === index ? 'middleAvtive':'info'"
                @click="secondActiveChange(item,index)"
                @mouseenter="mouseIndex = index"
                @mouseleave="mouseIndex = -1"
              >
                <span :class="secondActive === index ? 'active':''">{{ item.information_resource_name }}</span>
                <div class="tip" v-if="mouseIndex === index">
                  <p>{{ item.information_resource_name }}</p>
                </div>
                <div class="mark" v-if="secondActive !== index"></div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <div class="title">基本信息</div>
              <div class="box">
                <div>
                  <span>资源名称：</span>
                  <span>{{ tableInfo.data_type || '' }}</span>
                </div>
                <div>
                  <span>数据所在网络：</span>
                  <span>{{ tableInfo.data_network || '' }}</span>
                </div>
                <div>
                  <span>更新频率：</span>
                  <span>{{ tableInfo.replacement_cycle || '' }}</span>
                </div>
                <div>
                  <span>开放属性：</span>
                  <span>{{ tableInfo.open_property || '' }}</span>
                </div>
                <div>
                  <span>共享属性：</span>
                  <span>{{ tableInfo.shared_property || '' }}</span>
                </div>
              </div>
            </div>
            <div class="bottom" ref="bottomBox">
              <div class="title">数据表结构</div>
              <div class="table-info">
                <el-table
                  :data="tableData"
                  class="custom-table"
                  :stripe="true"
                  :height="height || 400"
                >
                  <el-table-column
                    prop="id"
                    label="用户ID"
                    width="120"
                  />
                  <el-table-column
                    prop="data_item"
                    label="数据项名称"
                  />
                  <el-table-column
                    prop="field_name"
                    label="字段名"
                  />
                  <el-table-column
                    prop="field_type"
                    label="字段类型"
                  />
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </transition>
  </div>
</template>

<script>
import {pinghuStatusList, pinghuStatusLowerList, pinghuStatusTableList} from '@/service/popup-form'

export default {
  name: 'PopupForm',
  data() {
    return {
      firstActive: 0,
      mouseIndex: -1,
      firstName: '',
      secondName: '',
      secondActive: 0,
      menu: [], // 一级目录
      secendMenuBase: [], // 二级目录的基础数据
      secendMenu: [],
      tableInfo: {},
      tableData: [],
      height: 400,
      keyword: '', // 搜索的关键词
    }
  },
  mounted() {
    // 获取一级详情
    pinghuStatusList().then(res => {
      if (res.code === 0) {
        this.menu = res.data;
        this.firstActive = 0
        this.firstName = res.data[0].subject_name
        res.data.length > 0 && this.getSecondMenu(res.data[0])
      }
    })
    // 获取bottom的高度
    let topH = this.$refs.bottomBox.offsetHeight;
    this.height = Number(topH) - 130
    console.log(topH)
  },
  methods: {
    startFilter() {
      const key = this.keyword;
      let temp = [];
      if (key) {
        this.secendMenuBase.map((item) => {
          if (item.information_resource_name.indexOf(key) > -1) {
            temp.push(item)
          }
        })
        this.secendMenu = temp
      } else {
        this.secendMenu = this.secendMenuBase
      }

    },
    firstActiveChange(item, index) {
      this.firstActive = index
      this.firstName = item.subject_name
      this.keyword = '';
      // 获取二级目录
      this.getSecondMenu(item)
    },
    getSecondMenu(item) {
      this.secondActive = 0
      this.secondName = ''
      this.secendMenu = [];
      this.secendMenuBase = []; // 二级目录的基础数据
      pinghuStatusLowerList({
        subject_name: item.subject_name
      }).then(res => {
        if (res.code === 0) {
          this.secondActive = 0
          this.secondName = res.data[0].information_resource_name
          this.secendMenu = res.data;
          this.secendMenuBase = res.data;
        }
      }).then(() => {
        this.getDataInfo()
      })
    },
    secondActiveChange(item, index) {
      this.secondActive = index
      this.secondName = item.information_resource_name
      this.getDataInfo()
    },
    // 获取
    getDataInfo() {
      // 获取表结构详情
      pinghuStatusTableList({
        subject_name: this.firstName,
        information_resource_name: this.secondName
      }).then(res => {
        if (res.code === 0) {
          console.log('表结构详情---------', res.data)
          this.tableInfo = res.data?.info;
          res.data?.list.map((item, index) => {
            item.id = index + 1
          })
          this.tableData = res.data?.list;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
$scale: 3;
.outer {
  height: 100vh;
  padding: 80px 90px;
  position: relative;
  background-image: url("../../assets/iframes/bg.png");
  background-size: 100% 100%;
  color: #fff;

  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .head {
      width: 100%;
      box-sizing: border-box;
      padding: 0 200px;
      height: 60px* $scale;

      .left {
        float: left;

        span {
          font-size: 22px * $scale;
          line-height: 60px* $scale;
          margin-left: 350px *$scale;
        }
      }

      .right {
        float: right;
        width: 50%;
        height: 100%;

        .search {
          width: 300px * $scale;
          float: right;
          height: 100%;
          border-radius: 90px;
          background: rgba(73, 147, 248, 0.08);
          position: relative;

          input {
            width: 240px * $scale;
            background: none;
            font-size: 22px * $scale;
            border: none;
            box-shadow: none;
            color: #fff;
            padding-left: 100px;
            height: 60px* $scale;
            line-height: 60px* $scale;
          }

          input::-webkit-input-placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          input::-moz-input-placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          input::-ms-input-placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          img {
            width: 24px * $scale;
            height: 24px * $scale;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 30px*$scale;
            margin-top: auto;
            margin-bottom: auto;
            cursor: pointer;
          }
        }
      }
    }
  }

  .tableBox {
    width: 100%;
    height: calc(100% - 180px);
    overflow: hidden;
    box-sizing: border-box;
    padding: 50px 200px 50px;
    display: flex;
    justify-content: flex-start;

    .scroll {
      width: 100%;
      height: 100%;
      padding: 60px * $scale 0;

      overflow-y: auto;

      &::-webkit-scrollbar { /*滚动条整体样式*/
        width: 0; /*高宽分别对应横竖滚动条的尺寸*/
        height: 0;
      }

      &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
      }

      &::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #EDEDED;
      }
    }

    .left {
      width: 20%;
      height: 100%;
      background: rgba(73, 147, 248, .2);
      border-radius: 16px * $scale;
      box-sizing: border-box;

      .info {
        width: 100%;
        height: 80px * $scale;

        position: relative;

        img {
          width: 200px * $scale;
          height: 160px * $scale;
          position: absolute;
          right: 0;
          top: -50px * $scale;
        }

        span {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 60px * $scale;
          text-align: center;
          z-index: 2;
          font-size: 22px * $scale;
          cursor: pointer;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .active {
          color: rgba(101, 220, 255, 1);
          text-shadow: 0 8px*$scale 16px*$scale rgba(95, 175, 255, 1);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }

    .middle {
      width: 30%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 20px * $scale;

      .tip {
        position: absolute;
        width: 100%;
        min-height: 50px * $scale;
        background: rgba(73, 147, 248, 0.42);
        border-radius: 8px*$scale;
        top: -80px  * $scale;
        left: 0;
        font-size: 22px * $scale;
        z-index: 9999;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 3px*$scale;

        &:first-of-type {
          top: 80px  * $scale;
        }

        p {
          display: inline;
          text-align: center;
          line-height: 20px * $scale;
          font-size: 14px *$scale;
        }
      }

      .scroll {
        padding: 50px * $scale 0;
      }

      .middleAvtive {
        background-image: url("../../assets/iframes/secend_bg_active.png");
        background-size: 100% 100%;
        opacity: 1 !important;
      }

      .info, .middleAvtive {
        width: 100%;
        height: 80px * $scale;
        background-image: url("../../assets/iframes/secend_bg.png");
        background-size: 100% 100%;
        position: relative;
        margin-bottom: 30px * $scale;

        .mark {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background-image: url("../../assets/iframes/secend_bg.png");
          opacity: .01;
          z-index: 9999;
        }

        span {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 80px * $scale;
          text-align: center;
          z-index: 2;
          font-size: 22px * $scale;
          cursor: pointer;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .active {
          color: rgba(101, 220, 255, 1);
          text-shadow: 0 8px*$scale 16px*$scale rgba(95, 175, 255, 1);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }

    .right {
      flex: 1;
      height: 100%;

      .top, .bottom {
        width: 100%;
        height: 32%;
        background: rgba(73, 147, 248, .08);
        border-radius: 10px * $scale;
        margin-bottom: 30px * $scale;
        box-sizing: border-box;
        padding: 30px * $scale;

        .title {
          width: 180px *$scale;
          height: 32px * $scale;
          line-height: 32px * $scale;
          background: url("../../assets/iframes/title.png");
          background-size: 100% 100%;
          font-size: 24px * $scale;
          color: #fff;
          font-weight: bold;
          padding-left: 31px * $scale;
        }

        .box {
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding: 20px*$scale 50px*$scale;
          display: flex;
          flex-wrap: wrap;
          overflow-y: auto;

          &::-webkit-scrollbar { /*滚动条整体样式*/
            width: 0; /*高宽分别对应横竖滚动条的尺寸*/
            height: 0;
          }

          &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #535353;
          }

          &::-webkit-scrollbar-track { /*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background: #EDEDED;
          }

          div {
            width: 50%;
            min-height: 60px * $scale;
            display: flex;
            justify-content: flex-start;

            span {
              font-size: 20px * $scale;
              line-height: 60px * $scale;
              display: block;
              min-width: 100px * $scale;
            }
          }
        }
      }

      .bottom {
        height: calc(68% - 100px);
        overflow: hidden;

        .table-info {
          background-color: transparent;
          padding-top: 10px * $scale;

          .custom-table {
            ::v-deep th, ::v-deep tr {
              background-color: transparent;
              color: #fff;
              font-size: 16px * $scale;
            }

            ::v-deep th {
              color: rgba(95, 175, 255, 1);
              font-size: 22px * $scale;
            }

            background-color: transparent;

            ::v-deep .el-table__row--striped td {
              background: rgba(95, 175, 255, .08);
            }

            ::v-deep td, ::v-deep th {
              border-bottom: none;

            }

            ::v-deep td div {
              font-size: 22px * $scale;
            }

            &:before {
              background-color: transparent;

            }

            ::v-deep tr.hover-row > td {
              background-color: transparent !important
            }

            ::v-deep tr:hover > td {
              background: rgba(95, 175, 255, .08);
            }

            ::v-deep .el-table__body-wrapper {
              &::-webkit-scrollbar { /*滚动条整体样式*/
                width: 0; /*高宽分别对应横竖滚动条的尺寸*/
                height: 0;
              }

              &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #535353;
              }

              &::-webkit-scrollbar-track { /*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                background: #EDEDED;
              }
            }
          }
        }
      }
    }
  }
}
</style>
