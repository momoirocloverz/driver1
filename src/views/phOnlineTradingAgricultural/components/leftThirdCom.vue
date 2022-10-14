<template>
  <div>
    <div class="scrollCon">
      <div class="leftCon" key="1" v-if="active == 1">
        <vue-seamless-scroll
          :data="trendCompData"
          class="mainAgriCon seamless-warp"
          :class-option="classOption"
        >
          <el-row
            v-for="(item, index) in trendCompData"
            :key="index"
            :class="['normalScrollItemHeight']"
          >
            <el-col :span="17">
              <div class="leftBarCon">
                <div class="itemTitle">
                  <div class="mr10">NO.{{ index + 1 }}</div>
                  <div>
                    <!-- <el-popover
                      placement="top-start"
                      title=""
                      width="170"
                      popper-class="cusPo1pper"
                      trigger="hover"
                      :content="item.seller_name"
                    >
                      <span slot="reference">{{ item.seller_name }}</span>
                    </el-popover> -->
                    <div class="hiddenTitle" :title="item.seller_name">
                      {{ item.seller_name }}
                    </div>
                  </div>
                </div>
                <div class="progress">
                  <div class="progress-bar">
                    <div
                      :class="['progress-bar_inner', checkIndex(index)]"
                      :style="{ width: item.percent + '%' }"
                    ></div>
                    <img
                      :src="dynamicSrc(index)"
                      class="markImg"
                      :style="{ left: 'calc(' + item.percent + '% - 15px)' }"
                    />
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="leftTextCon">
                <div>{{ item.seller_money }}</div>
                <div>万元</div>
              </div>
            </el-col>
          </el-row>
        </vue-seamless-scroll>
      </div>
      <div class="rightCon" key="2" v-else>
        <vue-seamless-scroll
          :data="trendCompData"
          class="mainAgriCon seamless-warp"
          :class-option="classOption"
        >
          <el-row
            v-for="(item, index) in trendCompData"
            :key="index"
            :class="['normalScrollItemHeight']"
          >
            <el-col :span="17">
              <div class="leftBarCon">
                <div class="itemTitle">
                  <div class="mr10">NO.{{ index + 1 }}</div>
                  <div>
                    {{ item.goods_name }}
                  </div>
                </div>
                <div class="progress">
                  <div class="progress-bar">
                    <div
                      :class="['progress-bar_inner', checkIndex(index)]"
                      :style="{ width: item.percent + '%' }"
                    ></div>
                    <img
                      :src="dynamicSrc(index)"
                      class="markImg"
                      :style="{ left: 'calc(' + item.percent + '% - 8px)' }"
                    />
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="leftTextCon">
                <div>{{ item.sum_num }}</div>
                <div>件</div>
              </div>
            </el-col>
          </el-row>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
import * as APIS from '@/service/dtapi';
export default {
  components: {
    vueSeamlessScroll,
  },
  props: {
    active: {
      type: String,
      default: '1',
    },
  },
  watch: {
    active: function(nval, val) {
      this.trendCompData = [];
      if (nval == '2') {
        this.fetchRight();
      } else {
        this.fetchLeft();
      }
    },
  },
  data() {
    return {
      width: 10,
      trendCompData: [],
      classOption: {
        singleHeight: 42,
        waitTime: 4000,
      },
    };
  },
  mounted() {
    this.fetchLeft();
  },
  methods: {
    fetchLeft() {
      APIS.tbTotalMonthOrder({})
        .then(res => {
          if (res.success) {
            let pureNumber = res.data.map(ele => {
              return ele.seller_money;
            });
            let maxNumber = Math.max(...pureNumber);
            const reMax = Math.ceil(maxNumber) + 100;
            let newReorganization = res.data.map(ele => {
              return {
                ...ele,
                percent: Number.parseInt((ele.seller_money / reMax) * 100),
              };
            });
            this.trendCompData = newReorganization;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    dynamicSrc(val) {
      let num = val + 1;
      let x, y, z;
      x = (num - 1) / 3;
      y = (num - 2) / 3;
      z = (num - 3) / 3;
      let xInteger = Number.isInteger(x);
      let yInteger = Number.isInteger(y);
      let zInteger = Number.isInteger(z);

      if (num > 3) {
        if (xInteger) {
          return 'https://img.hzanchu.com/acimg/0a8cb01a22ecf6d9d68ee921303fcb02.png';
        } else if (yInteger) {
          return 'https://img.hzanchu.com/acimg/b30088f5a56f24dc5fbd50dd583fc175.png';
        } else {
          return 'https://img.hzanchu.com/acimg/b3699647c1da46eccad47ba8337ecd52.png';
        }
      } else {
        if (num == 1) {
          return 'https://img.hzanchu.com/acimg/0a8cb01a22ecf6d9d68ee921303fcb02.png';
        } else if (num == 2) {
          return 'https://img.hzanchu.com/acimg/b30088f5a56f24dc5fbd50dd583fc175.png';
        } else {
          return 'https://img.hzanchu.com/acimg/b3699647c1da46eccad47ba8337ecd52.png';
        }
      }
    },
    checkIndex(val) {
      let num = val + 1;
      let x, y, z;
      x = (num - 1) / 3;
      y = (num - 2) / 3;
      z = (num - 3) / 3;
      let xInteger = Number.isInteger(x);
      let yInteger = Number.isInteger(y);
      let zInteger = Number.isInteger(z);

      if (num > 3) {
        if (xInteger) {
          return 'firstBar';
        } else if (yInteger) {
          return 'secondBar';
        } else {
          return 'thirdBar';
        }
      } else {
        if (num == 1) {
          return 'firstBar';
        } else if (num == 2) {
          return 'secondBar';
        } else {
          return 'thirdBar';
        }
      }
    },
    fetchRight() {
      APIS.tbGoodMonthOrder({})
        .then(res => {
          if (res.success) {
            let pureNumber = res.data.map(ele => {
              return ele.sum_num;
            });
            let maxNumber = Math.max(...pureNumber);
            const reMax = Math.ceil(maxNumber) + 100;
            let newReorganization = res.data.map(ele => {
              return {
                ...ele,
                percent: Number.parseInt((ele.sum_num / reMax) * 100),
              };
            });
            this.trendCompData = newReorganization;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.hiddenTitle {
  width: 270px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.progress {
  width: 320px;
  //   margin: 100px;
  display: flex;
  flex-direction: column;
  text-align: right;
}
.progress-bar {
  height: 16px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  width: 320px;
  position: relative;
}
.markImg {
  position: absolute;
  width: 26px;
  height: 26px;
  top: -5px;
  z-index: 1;
}
.progress-bar_inner {
  position: absolute;
  z-index: 2;
  height: 8px;
  width: 50%;
  left: 0;
  top: 4px;
  background-color: #65e3ac;
  border-radius: 100px;
}
.firstBar {
  background-color: #65e3ac !important;
}
.secondBar {
  background-color: #26daf8 !important;
}
.thirdBar {
  background-color: #e0c260 !important;
}

.centerCon {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-top: 10px;
  box-sizing: border-box;
}
.scrollCon {
  width: 100%;
  color: #fff;
  height: 200px;
}
.seamless-warp {
  text-align: left;
  &.mainAgriCon {
    height: 210px;
    font-size: 16px;
  }
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
}
.normalScrollItemHeight {
  height: 42px;
  //   line-height: 42px;
  //   &:nth-child(odd) {
  //     background-color: rgba(25, 152, 248, 0.1);
  //   }
}
.leftBarCon {
  height: 42px;
}
.itemTitle {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #cceaff;
  margin-bottom: 4px;
}
.mr10 {
  margin-right: 10px;
}
.leftTextCon {
  height: 42px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-left: 10px;
  div:first-child {
    font-size: 20px;
    font-family: PangMenZhengDao;
    color: #27e0fd;
    margin-right: 5px;
  }
  div:nth-child(2) {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #90b6d2;
  }
}
.rightBarCon {
}
.rightTextCon {
}
</style>

<style lang="scss">
.cusPo1pper {
  //   background-color: #072d60 !important;
  //   color: #fff !important;
  //   border-color: transparent !important;

  //   .popper__arrow {
  //     border-bottom-color: transparent !important;
  //   }
}
</style>
