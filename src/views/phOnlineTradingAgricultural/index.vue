<template>
  <div class="phdmCirculateCon">
    <div class="viewer" ref="wrapper">
      <div class="topCon"></div>
      <div class="content">
        <div class="leftMaster">
          <div class="leftFirst">
            <div class="leftFirTitleCon">
              <div class="leftFirTitleBg">
                <div class="leftFirTitleText">总览</div>
              </div>
              <DashPoints class="cusMargin1" />
            </div>
            <div class="leftFirBodyCon">
              <div class="flexBetween mb30">
                <div class="halfWidth padLeft20">
                  <RotatePic
                    title="成交总金额"
                    :unit="'元'"
                    src="https://img.hzanchu.com/acimg/9133ba0aa82a96e6595dd7ffac422545.png"
                    :show-bg="true"
                    width="17px"
                    height="17px"
                    :num="total_gmv"
                    :decimals="2"
                  />
                </div>
                <div class="halfWidth  flexStart">
                  <div class="dashBorder marginRight20"></div>
                  <RotatePic
                    title="总销售量"
                    :unit="'件'"
                    src="https://img.hzanchu.com/acimg/b7c0c4f74bbe84543ec7f50b767aa563.png"
                    :show-bg="true"
                    width="17px"
                    height="17px"
                    :num="total_volume"
                    :decimals="0"
                  />
                </div>
              </div>
              <div class="flexBetween mb30">
                <div class="halfWidth padLeft20">
                  <RotatePic
                    title="总订单量"
                    :unit="'单'"
                    src="https://img.hzanchu.com/acimg/8026cf4aaf953cdce2de5457376902d0.png"
                    :show-bg="true"
                    width="17px"
                    height="17px"
                    :num="total_order"
                    :decimals="0"
                  />
                </div>
                <div class="halfWidth  flexStart">
                  <div class="dashBorder marginRight20"></div>
                  <RotatePic
                    title="总经营主体"
                    :unit="'家'"
                    src="https://img.hzanchu.com/acimg/2967737cbc4122d56f98176c3232615e.png"
                    :show-bg="true"
                    width="17px"
                    height="17px"
                    :num="total_entity"
                    :decimals="0"
                  />
                </div>
              </div>
              <div class="flexBetween">
                <div class="halfWidth padLeft20">
                  <RotatePic
                    title="总商品数"
                    :unit="'个'"
                    src="https://img.hzanchu.com/acimg/c3427362adb8d178d4c82433b8a6cf6a.png"
                    :show-bg="true"
                    width="17px"
                    height="17px"
                    :num="total_goods"
                    :decimals="0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="leftSecond">
            <div class="leftFirTitleCon">
              <div class="leftFirTitleBg">
                <div class="leftFirTitleText">市场信息</div>
              </div>
              <div class="leftSecondSwitchCon">
                <div
                  :class="[
                    'leftSecondFakeBg',
                    leftSecondActive == '1' ? 'leftSecondFakeBgActive' : '',
                  ]"
                  @click="leftSecondSwitchAction('1')"
                >
                  蔬菜
                </div>
                <div
                  :class="[
                    'leftSecondFakeBg',
                    'ml6',
                    leftSecondActive == '2' ? 'leftSecondFakeBgActive' : '',
                  ]"
                  @click="leftSecondSwitchAction('2')"
                >
                  水产
                </div>
              </div>
            </div>
            <div class="leftFirBodyCon">
              <LeftSecondCom :active="leftSecondActive" />
            </div>
          </div>
          <div class="leftThird">
            <div class="leftFirTitleCon">
              <div class="leftFirTitleBg">
                <div class="leftFirTitleText">
                  <span
                    :class="[
                      'cursorTitle',
                      leftActiveThird == '1' ? 'cursorActiveTitle' : '',
                    ]"
                    @click="leftActiveActionThird('1')"
                    >门店销售排行</span
                  >
                  <span> / </span>
                  <span
                    :class="[
                      'cursorTitle',
                      leftActiveThird == '2' ? 'cursorActiveTitle' : '',
                    ]"
                    @click="leftActiveActionThird('2')"
                    >本月商品销售排行</span
                  >
                </div>
              </div>
              <DashPoints class="cusMargin1" />
            </div>
            <div class="leftFirBodyCon padLeft20 padRight10">
              <leftThirdCom :active="leftActiveThird" />
            </div>
          </div>
        </div>
        <div class="centerMaster">
          <div class="centerTop">
            <div class="masterGlobalTitle">累计成交总金额</div>
            <div class="masterNumberCon">
              <countTo
                class="globalStyleValue"
                :start-val="0"
                :end-val="total_gmv"
                :duration="2000"
                :decimals="2"
              />
              <span class="globalStyleValueDecroation">元</span>
            </div>
          </div>
          <div class="centerBottom" v-if="showMap">
            <MapCon @showScreen="popModal" :pointsObj="pointsObj" />
          </div>
        </div>
        <div class="rightMaster">
          <div class="rightFirst">
            <div class="leftFirTitleCon pr20">
              <div class="leftFirWiderTitleBg">
                <div class="leftFirTitleText">
                  <span
                    :class="[
                      'cursorTitle',
                      rightActiveFirst == '1' ? 'cursorActiveTitle' : '',
                    ]"
                    @click="rightActiveActionFirst('1')"
                    >本年交易变化趋势</span
                  >
                  <span> / </span>
                  <span
                    :class="[
                      'cursorTitle',
                      rightActiveFirst == '2' ? 'cursorActiveTitle' : '',
                    ]"
                    @click="rightActiveActionFirst('2')"
                    >各平台交易额占比</span
                  >
                </div>
              </div>
              <DashPoints class="cusMargin1" />
            </div>
            <div class="rightFirBodyCon">
              <RightFirstCom :active="rightActiveFirst" />
            </div>
          </div>
          <div class="rightSecond">
            <div class="leftFirTitleCon pr20">
              <div class="leftFirTitleBg">
                <div class="leftFirTitleText">
                  <span
                    :class="[
                      'cursorTitle',
                      rightActiveSecond == '1' ? 'cursorActiveTitle' : '',
                    ]"
                    @click="rightActiveActionSecond('1')"
                    >商品产销流向</span
                  >
                  <span> / </span>
                  <span
                    :class="[
                      'cursorTitle',
                      rightActiveSecond == '2' ? 'cursorActiveTitle' : '',
                    ]"
                    @click="rightActiveActionSecond('2')"
                    >主体销售排行</span
                  >
                </div>
              </div>
              <DashPoints class="cusMargin1" />
            </div>
            <div class="rightFirBodyCon">
              <RightSecondCom :active="rightActiveSecond" />
            </div>
            <!-- <div ref="source" class="thiChild1ChartEchart"></div> -->
          </div>
          <div class="rightThird">
            <div class="leftFirTitleCon">
              <div class="leftFirTitleBg">
                <div class="leftFirTitleText">实时订单</div>
              </div>
              <div class="rightThirdSwitchCon">
                <div
                  :class="[
                    'leftSecondFakeBg',
                    rightThirdActive == '1' ? 'leftSecondFakeBgActive' : '',
                  ]"
                  @click="rightThirdSwitchAction('1')"
                >
                  本家鲜
                </div>
                <div
                  :class="[
                    'leftSecondFakeBg',
                    'ml6',
                    rightThirdActive == '2' ? 'leftSecondFakeBgActive' : '',
                  ]"
                  @click="rightThirdSwitchAction('2')"
                >
                  网上农博
                </div>
              </div>
            </div>
            <div class="leftFirBodyCon">
              <RightthirdCom :active="rightThirdActive" />
            </div>
          </div>
        </div>
      </div>
      <div class="hugeModal" v-if="showModal">
        <div class="shutModal" @click="shutModAction">关闭</div>
        <div class="modalHead">商家交易统计数据</div>
        <div class="modalBottom">
          <div class="modalTableCon">
            <div class="modalTableTitleCon">
              <div class="modalTitleSelf">
                {{ selectdItem.suppliers_name }}商家订单数据
              </div>
              <div class="modalTime">
                <span class="modalTimRange">
                  <el-date-picker
                    :cellClassName="'setcusPopperAgri'"
                    class="resetTimerCon"
                    :popper-class="'cusPicker'"
                    v-model="value1"
                    :picker-options="pickerOptions"
                    format="yyyy/MM/dd"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    @change="time1Change"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </span>
                <img
                  src="https://img.hzanchu.com/acimg/2adaa829ac31ff975805c35576ba8d19.png"
                />
              </div>
            </div>
            <div class="modalScrolCon">
              <!-- <div v-if="(modalCompData && modalCompData.length)||(!total)  "> -->
              <div v-if="total">
                <el-row class="scrollModalHeader">
                  <el-col :span="2">序号</el-col>
                  <el-col :span="10">商品名称</el-col>
                  <el-col :span="4">价格(元)</el-col>
                  <el-col :span="2">平台</el-col>
                  <el-col :span="6">订单时间</el-col>
                </el-row>
                <vue-seamless-scroll
                  v-if="modalCompData.length > 6"
                  key="1231"
                  :data="modalCompData"
                  class="mainModalAgriCon seamless-warp"
                  :class-option="classModalOption"
                >
                  <el-row
                    v-for="(item, index) in modalCompData"
                    :key="index"
                    :class="['normalmodalScrollItemHeight']"
                  >
                    <el-col :span="2">
                      <div class="centerCon">
                        <div class="indexBg">{{ index + 1 }}</div>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="hidden">
                        <!-- <span class="animateItem"> {{ item.goods_name }} </span> -->
                        <!-- <MarqueeText> {{ item.goods_name }}</MarqueeText> -->
                        <span
                          class="animateItem"
                          v-if="item.goods_name.length > 30"
                        >
                          {{ item.goods_name }}
                        </span>
                        <span v-else>
                          {{ item.goods_name }}
                        </span>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <span>{{ item.amount }}</span>
                    </el-col>
                    <el-col :span="2">
                      <span>
                        <span>
                          {{
                            selectdItem.type == 'BJX' ? '本家鲜' : '网上农博'
                          }}</span
                        >
                      </span>
                    </el-col>
                    <el-col :span="6">
                      <span>
                        <span> {{ item.created_at }}</span>
                      </span>
                    </el-col>
                  </el-row>
                </vue-seamless-scroll>
                <div class="mainModalAgriCon seamless-warp" v-else>
                  <el-row
                    v-for="(item, index) in modalCompData"
                    :key="index"
                    :class="['normalmodalScrollItemHeight']"
                  >
                    <el-col :span="2">
                      <div class="centerCon">
                        <div class="indexBg">{{ index + 1 }}</div>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <!-- <div class="hidden"> -->
                      <!-- <span> {{ item.goods_name }} </span> -->
                      <!-- <span class="animateItem"> {{ item.goods_name }} </span> -->
                      <!-- -->
                      <div class="hidden">
                        <!-- <MarqueeText> {{ item.goods_name }}</MarqueeText> -->
                        <span
                          class="animateItem"
                          v-if="item.goods_name.length > 30"
                        >
                          {{ item.goods_name }}
                        </span>
                        <span v-else>
                          {{ item.goods_name }}
                        </span>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <span>{{ item.amount }}</span>
                    </el-col>
                    <el-col :span="2">
                      <span>
                        <span>
                          {{
                            selectdItem.form == '1' ? '本家鲜' : '网上农博'
                          }}</span
                        >
                      </span>
                    </el-col>
                    <el-col :span="6">
                      <span>
                        <span> {{ item.created_at }}</span>
                      </span>
                    </el-col>
                  </el-row>
                </div>

                <div class="pagCon">
                  <el-pagination
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total,prev, pager, next, jumper"
                    :total="total"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </div>
              <div class="nothingAlert" v-else>
                <div class="describe">商家近期暂无交易数据</div>
              </div>
            </div>
          </div>
          <div class="modalChartCon">
            <div class="modalChartTitleCon">
              <div class="modalTitleSelf">
                {{ selectdItem.suppliers_name }}商家销售额
              </div>
              <div class="modalTime">
                <span class="modalTimRange">
                  <el-date-picker
                    class="resetTimerCon"
                    :popper-class="'cusPicker'"
                    v-model="value2"
                    format="yyyy/MM/dd"
                    value-format="yyyy-MM-dd"
                    @change="time2Change"
                    :picker-options="pickerOptions"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </span>
                <img
                  src="https://img.hzanchu.com/acimg/2adaa829ac31ff975805c35576ba8d19.png"
                />
              </div>
            </div>
            <div class="chartCon">
              <div v-show="rightISOK">
                <div ref="rightTopChart" class="firChild3ChartEchart"></div>
              </div>
              <div class="nothingAlert" v-show="!rightISOK">
                <div class="describe">商家近期暂无交易数据</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import countTo from 'vue-count-to';
import * as AGRICULTURALAPIS from '@/service/agriculturalOnline';
import _ from 'lodash';
import * as APIS from '@/service/dtapi';
import vueSeamlessScroll from 'vue-seamless-scroll';
import MapCon from './components/mapCon.vue';
import DashPoints from './components/dashPoints.vue';
import LeftSecondCom from './components/leftSecondCom.vue';
import leftThirdCom from './components/leftThirdCom.vue';
import RightFirstCom from './components/rightFirstCom.vue';
import RightSecondCom from './components/rightSecondCom.vue';
import RightthirdCom from './components/rightthirdCom.vue';
import RotatePic from './components/rotatePic.vue';
import MarqueeText from 'vue-marquee-text-component';
import * as echarts from 'echarts';
export default {
  components: {
    vueSeamlessScroll,
    countTo,
    DashPoints,
    RotatePic,
    LeftSecondCom,
    leftThirdCom,
    RightFirstCom,
    RightSecondCom,
    MapCon,
    RightthirdCom,
    MarqueeText,
  },
  data() {
    return {
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.times = minDate.getTime();
          if (maxDate) {
            this.times = '';
          }
        },
        disabledDate: time => {
          if (this.times !== '') {
            const one = 30 * 24 * 3600 * 1000;
            const minTime = this.times - one;
            const maxTime = this.times + one;
            return time.getTime() < minTime || time.getTime() > maxTime;
          }
        },
      },
      total: 0,
      pageSize: 10,
      currentPage: 1,
      selectdItem: {},
      showMap: false,
      showModal: false,
      rightThirdActive: '1',
      rightActiveFirst: '1',
      rightActiveSecond: '1',
      globalValue: 2124547.65,
      leftActiveThird: '1',
      leftSecondActive: '1',
      redArrowImg:
        'https://img.hzanchu.com/acimg/d7f31adcb0f36e1e80129ceac14c010b.png',
      blueArrowImg:
        ' https://img.hzanchu.com/acimg/9a10c4a4cbe8e7f8da0ef7547a8e3398.png',
      modalCompData: [],
      trendCompData: [
        {
          title: '金平湖',
          price: '7.4元/kg',
          last: '7',
          compare: '3',
        },
      ],
      classOption: {
        step: 0.2,
        limitMoveNum: 5,
      },
      classModalOption: {
        // step: 0.2,
        // limitMoveNum: 7,
        singleHeight: 42,
        waitTime: 4000,
      },
      timer3: null,
      globalLeftBottomChart: null,
      timer1: null,
      timer4: null,
      globalTopRightChart: null,
      timer6: null,
      total_gmv: 0,
      total_volume: 0,
      total_order: 0,
      total_entity: 0,
      total_goods: 0,
      pointsObj: {},
      chartData: [],
      value1: [],
      value2: [],
      classInnerOption: {
        limitMoveNum: 2,
        direction: 2,
        step: 0.2,
      },
      rightISOK: false,
    };
  },
  mounted() {
    this.fetchMapList();
    this.responseLayout();
    this.leftFirstRequest();
    window.addEventListener('resize', this.responseLayout);
    // this.initLeftBottomChart();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.responseLayout);
    this.destoryChart();
  },
  methods: {
    handleCurrentChange(e) {
      this.currentPage = e;
      this.time1Change();
    },
    time1Change() {
      console.log(this.value1);
      this.fetchOrderList();
    },
    time2Change() {
      console.log(this.value2);
      this.fetchAmountList();
    },
    setcusPopperAgri() {
      return 'setcusPopperAgri';
    },
    fetchMapList() {
      AGRICULTURALAPIS.storeList({})
        .then(res => {
          if (res.code == 0) {
            let array1 = res.data.filter(ele => {
              return ele.from == 1;
            });
            let array2 = res.data.filter(ele => {
              return ele.from == 2;
            });
            let array1After = array1.map(ele => {
              return {
                from: ele.from,
                store_id: ele.store_id,
                suppliers_name: ele.store_name,
                longitude_84: +ele.longitude,
                latitude_84: +ele.latitude,
                town: ele.town,
                county: ele.county,
              };
            });
            let array2After = array2.map(ele => {
              return {
                from: ele.from,
                store_id: ele.store_id,
                suppliers_name: ele.store_name,
                longitude_84: +ele.longitude,
                latitude_84: +ele.latitude,
                town: ele.town,
                county: ele.county,
              };
            });
            this.BJXDATA = array1After;
            this.WSNBDATA = array2After;

            let newStage1sub1 = array1.filter(ele => {
              return ele.town == '当湖街道';
            });
            let newStage1sub2 = array1.filter(ele => {
              return ele.town == '新埭镇';
            });
            let newStage1sub3 = array1.filter(ele => {
              return ele.town == '乍浦镇';
            });
            let newStage1sub4 = array1.filter(ele => {
              return ele.town == '曹桥街道';
            });
            let newStage1sub5 = array1.filter(ele => {
              return ele.town == '新仓镇';
            });
            let newStage1sub6 = array1.filter(ele => {
              return ele.town == '独山港镇';
            });
            let newStage1sub7 = array1.filter(ele => {
              return ele.town == '广陈镇';
            });
            let newStage1sub8 = array1.filter(ele => {
              return ele.town == '钟埭街道';
            });
            let newStage1sub9 = array1.filter(ele => {
              return ele.town == '林埭镇';
            });
            let newStage2sub1 = array2.filter(ele => {
              return ele.town == '当湖街道';
            });
            let newStage2sub2 = array2.filter(ele => {
              return ele.town == '新埭镇';
            });
            let newStage2sub3 = array2.filter(ele => {
              return ele.town == '乍浦镇';
            });
            let newStage2sub4 = array2.filter(ele => {
              return ele.town == '曹桥街道';
            });
            let newStage2sub5 = array2.filter(ele => {
              return ele.town == '新仓镇';
            });
            let newStage2sub6 = array2.filter(ele => {
              return ele.town == '独山港镇';
            });
            let newStage2sub7 = array2.filter(ele => {
              return ele.town == '广陈镇';
            });
            let newStage2sub8 = array2.filter(ele => {
              return ele.town == '钟埭街道';
            });
            let newStage2sub9 = array2.filter(ele => {
              return ele.town == '林埭镇';
            });
            const bjxNum = [
              {
                town: '当湖街道',
                num: newStage1sub1.length,
              },
              {
                town: '新埭镇',
                num: newStage1sub2.length,
              },
              {
                town: '乍浦镇',
                num: newStage1sub3.length,
              },
              {
                town: '曹桥街道',
                num: newStage1sub4.length,
              },
              {
                town: '新仓镇',
                num: newStage1sub5.length,
              },
              {
                town: '独山港镇',
                num: newStage1sub6.length,
              },
              {
                town: '广陈镇',
                num: newStage1sub7.length,
              },
              {
                town: '钟埭街道',
                num: newStage1sub8.length,
              },
              {
                town: '林埭镇',
                num: newStage1sub9.length,
              },
            ];
            const wsnbNum = [
              {
                town: '当湖街道',
                num: newStage2sub1.length,
              },
              {
                town: '新埭镇',
                num: newStage2sub2.length,
              },
              {
                town: '乍浦镇',
                num: newStage2sub3.length,
              },
              {
                town: '曹桥街道',
                num: newStage2sub4.length,
              },
              {
                town: '新仓镇',
                num: newStage2sub5.length,
              },
              {
                town: '独山港镇',
                num: newStage2sub6.length,
              },
              {
                town: '广陈镇',
                num: newStage2sub7.length,
              },
              {
                town: '钟埭街道',
                num: newStage2sub8.length,
              },
              {
                town: '林埭镇',
                num: newStage2sub9.length,
              },
            ];
            this.pointsObj = {
              BJX: this.BJXDATA,
              WSNB: this.WSNBDATA,
              BJX_NUM: bjxNum,
              WSNB_NUM: wsnbNum,
            };
            setTimeout(() => {
              this.showMap = true;
            }, 100);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    fetchOrderList() {
      this.modalCompData = [];
      AGRICULTURALAPIS.orderList({
        store_id: this.selectdItem.store_id,
        from: this.selectdItem.from,
        start_date: this.value1 && this.value1.length ? this.value1[0] : '',
        end_date: this.value1 && this.value1.length ? this.value1[1] : '',
        page: this.currentPage,
        page_size: this.pageSize,
      })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.modalCompData = res.data.data;
            this.$forceUpdate();
            this.total = res.data.total;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    fetchAmountList() {
      AGRICULTURALAPIS.dateAmountList({
        store_id: this.selectdItem.store_id,
        from: this.selectdItem.from,
        start_date: this.value2 && this.value2.length ? this.value2[0] : '',
        end_date: this.value2 && this.value2.length ? this.value2[1] : '',
      })
        .then(res => {
          if (res.code == 0) {
            this.chartData = res.data;
            setTimeout(() => {
              this.initRightTopChart();
            }, 100);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    //       AGRICULTURALAPIS.orderList({
    //     store_id: shorter.store_id,
    //     from: shorter.from,
    //     start_date: '',
    //     end_date: '',
    //     page: '1',
    //     page_size: '10',
    //   })
    //     .then(res => {
    //       if (res.code == 0) {
    //         this.modalCompData = res.data;
    //       }
    //     })
    //     .catch(err => {
    //       console.log('err', err);
    //     });
    //   AGRICULTURALAPIS.dateAmountList({
    //     store_id: shorter.store_id,
    //     from: shorter.from,
    //     start_date: '',
    //     end_date: '',
    //   })
    //     .then(res => {
    //       if (res.code == 0) {
    //         this.chartData = res.data;
    //         setTimeout(() => {
    //           this.initRightTopChart();
    //         }, 100);
    //       }
    //     })
    //     .catch(err => {
    //       console.log('err', err);
    //     });

    popModal(val) {
      this.selectdItem = val;
      this.currentPage = 1;
      this.showModal = true;
      this.fetchOrderList();
      this.fetchAmountList();
    },
    initRightTopChart() {
      let source = this.chartData;
      let year = [];
      let historyData = [];
      let predictData = [];
      let actualOutput = [];
      let estimateOutput = [];
      source &&
        source.length &&
        source.forEach((item, index) => {
          historyData.push({
            name: item.date,
            value: item.amount,
          });
          predictData.push({
            name: item.date,
            // value: item.predictOutput,
          });
          year.push(item.date);
          actualOutput.push(item.actualOutput);
          estimateOutput.push(item.estimateOutput);
        });
      let ok = historyData.filter(ele => {
        return ele.value > 0;
      });
      if (ok.length) {
        this.rightISOK = true;

        let myChart = echarts.init(this.$refs.rightTopChart);
        this.globalTopRightChart = myChart;
        let data1 = historyData.map(item => {
          return [item.name, item.value];
        });
        let data = [];
        const option = {
          tooltip: {
            // trigger: 'axis',
            // position: function(pt) {
            //   return [pt[0], '10%'];
            // },
            trigger: 'axis',
            backgroundColor: 'rgba(3,3,3,0.5)',
            borderWidth: 0,
            textStyle: {
              color: '#ffffff',
              fontSize: '14',
            },
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            // type: 'time',
            // boundaryGap: false,
            type: 'category',
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, .5)',
              // rotate: 20,
              // interval: (index, value) => {
              //   return index % 8 == 0;
              // },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, .5)',
              },
            },
            data: year,
          },
          yAxis: {
            // type: 'value',
            // boundaryGap: [0, '100%'],
            type: 'value',
            name: '元',
            position: 'left',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, .5)',
            },
            boundaryGap: [0, '100%'],
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255, 255, 255, .5)',
              },
            },
          },
          //   dataZoom: [
          //     {
          //       type: 'inside',
          //       start: 0,
          //       end: 20,
          //     },
          //     {
          //       start: 0,
          //       end: 20,
          //     },
          //   ],
          grid: {
            right: '2%',
            bottom: '0',
            left: '2%',
            top: '48px',
            containLabel: true,
          },
          series: [
            {
              name: '日销售额',
              type: 'line',
              smooth: false,
              symbol: 'none',
              areaStyle: {
                normal: {
                  color: 'rgba(14,156,255,0.3)',
                },
              },
              itemStyle: {
                normal: {
                  color: '#0E9CFF',
                },
              },
              data: data1,
            },
          ],
        };

        // const option = {
        //   tooltip: {
        //     trigger: 'axis',
        //     backgroundColor: 'rgba(3,3,3,0)',
        //     borderWidth: 0,
        //     textStyle: {
        //       color: '#ffffff',
        //       fontSize: '14',
        //     },
        //     axisPointer: {
        //       type: 'shadow',
        //     },
        //     formatter: value => {
        //       let str = '';
        //       value.forEach(item => {
        //         if (item.data) {
        //           str += `<li style="position: relative;display:flex;height:20px;line-height:20px;">
        //         <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${
        //           item.seriesName === '日销售额' ? '#0E9CFF' : '#35FDDC'
        //         };"></div>
        //         <div style="margin-left:15px;">${item.seriesName}：${
        //             item.seriesName === '日销售额' ? item.data[1] : item.data
        //           } ${item.seriesName === '日销售额' ? '元' : '吨'}</div></li>`;
        //         }
        //       });
        //       let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
        //                 <span>${value[0].name}</span>
        //                 <ul style="margin-top:10px;">
        //                 ${str}
        //                 <ul>
        //             </div>`;
        //       return res;
        //     },
        //   },
        //   grid: {
        //     right: '2%',
        //     bottom: '50px',
        //     left: '2%',
        //     top: '48px',
        //     containLabel: true,
        //   },
        //   legend: {
        //     align: 'left',
        //     right: '7%',
        //     top: '2%',
        //     type: 'plain',
        //     data: [{ name: '日销售额', textStyle: { color: '#FFFFFF' } }],
        //     icon:
        //       'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
        //     itemWidth: 12,
        //     itemHeight: 2,
        //     itemStyle: {
        //       borderColor: '#0E9BFE',
        //     },
        //   },
        //   xAxis: {
        //     type: 'category',
        //     axisTick: {
        //       show: false,
        //     },
        //     axisLabel: {
        //       color: 'rgba(255, 255, 255, .5)',
        //       // rotate: 20,
        //       // interval: (index, value) => {
        //       //   return index % 8 == 0;
        //       // },
        //     },
        //     axisLine: {
        //       lineStyle: {
        //         color: 'rgba(255, 255, 255, .5)',
        //       },
        //     },
        //     data: year,
        //   },
        //   yAxis: [
        //     {
        //       // boundaryGap: ['1', '0.5'],
        //       type: 'value',
        //       name: '元',
        //       position: 'left',
        //       axisTick: {
        //         show: false,
        //       },
        //       axisLine: {
        //         show: false,
        //       },
        //       axisLabel: {
        //         color: 'rgba(255, 255, 255, .5)',
        //       },
        //       boundaryGap: [0, '100%'],
        //       splitLine: {
        //         lineStyle: {
        //           type: 'dashed',
        //           color: 'rgba(255, 255, 255, .5)',
        //         },
        //       },
        //     },
        //   ],
        //   series: [
        //     {
        //       name: '日销售额',
        //       type: 'line',
        //       showAllSymbol: true,
        //       symbol: 'circle',
        //       symbolSize: 6,
        //       data: data1,
        //       yAxisIndex: 0,
        //       itemStyle: {
        //         normal: {
        //           color: '#0E9CFF',
        //           lineStyle: {
        //             shadowColor: '#000',
        //             shadowBlur: 5,
        //             shadowOffsetY: 2,
        //           },
        //           borderColor: '#fff',
        //           // borderColor:'#0E9CFF',
        //           borderWidth: 1,
        //           shadowColor: 'rgba(0, 0, 0, .3)',
        //           shadowBlur: 0,
        //           shadowOffsetY: 2,
        //           shadowOffsetX: 2,
        //         },
        //       },
        //       // itemStyle: {
        //       //   normal: {
        //       //     color: '#0E9CFF',
        //       //     lineStyle: {
        //       //       shadowColor: '#000',
        //       //       shadowBlur: 5,
        //       //       shadowOffsetY: 2,
        //       //     },
        //       //     borderColor: '#fff',
        //       //     borderWidth: 2,
        //       //     shadowColor: 'rgba(0, 0, 0, .3)',
        //       //     shadowBlur: 0,
        //       //     shadowOffsetY: 2,
        //       //     shadowOffsetX: 2,
        //       //   },
        //       // },
        //       label: {
        //         show: true,
        //         position: 'top',
        //         rotate: 30,
        //         textStyle: {
        //           color: '#fff',
        //           fontFamily: 'PangMenZhengDao',
        //         },
        //         formatter: val => {
        //           console.log(val);
        //           return val.value[1] + '元';
        //           // if (val.dataIndex % 8 == 0) {
        //           //   return val.value[1] + '元';
        //           // } else {
        //           //   return '';
        //           // }
        //         },
        //       },
        //       lineStyle: {
        //         shadowColor: '#000',
        //         shadowBlur: 5,
        //         shadowOffsetY: 2,
        //       },
        //       areaStyle: {
        //         normal: {
        //           color: 'rgba(14,156,255,0.3)',
        //         },
        //       },
        //     },
        //   ],
        // };
        myChart.setOption(option);
        myChart.resize();
        let len = 0;
        clearInterval(this.timer6);
        // this.timer6 = setInterval(() => {
        //   if (len === year.length) {
        //     len = 0;
        //   }
        //   myChart.dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: len,
        //   });
        //   len++;
        // }, 3000);
      } else {
        this.rightISOK = false;
      }
    },
    shutModAction() {
      this.showModal = false;
      this.value1 = [];
      this.value2 = [];
      clearInterval(this.timer6);
    },
    leftFirstRequest() {
      APIS.phTotalGmv({})
        .then(res => {
          console.log(res);
          if (res.success) {
            this.total_gmv = +res.data[0].total_gmv;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
      APIS.phTotalTotalGoods1({})
        .then(res => {
          if (res.success) {
            this.total_goods = +res.data[0].total_goods;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
      APIS.phTotalBusinessEntity1({})
        .then(res => {
          if (res.success) {
            this.total_entity = +res.data[0].total_entity;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
      APIS.phTotalOrder1({})
        .then(res => {
          if (res.success) {
            this.total_order = +res.data[0].total_order;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
      APIS.phTotalVolume1({})
        .then(res => {
          if (res.success) {
            this.total_volume = +res.data[0].total_volume;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    goBack() {
      this.$router.replace('/phdm');
    },
    destoryChart() {
      if (this.globalLeftBottomChart) {
        this.globalLeftBottomChart.dispose();
      }
      clearInterval(this.timer3);
      clearInterval(this.timer1);
      clearInterval(this.timer4);
    },

    initLeftBottomChart() {
      let countFarmSourceData = [];
      let source = [
        {
          created: 1636341989000,
          id: 1,
          sourceCount: 3.033,
          sourceType: '大型农贸市场',
          year: 2021,
        },
        {
          created: 1636341991000,
          id: 2,
          sourceCount: 4.261,
          sourceType: '中型农贸市场',
          year: 2021,
        },
        {
          created: 1636341993000,
          id: 3,
          sourceCount: 2.706,
          sourceType: '小型农贸市场',
          year: 2021,
        },
      ];
      countFarmSourceData = source.map(ele => {
        return {
          value: ele.sourceCount,
          name: ele.sourceType,
        };
      });
      let chart = echarts.init(this.$refs.source);
      this.globalLeftBottomChart = chart;
      let option = {
        color: ['#71D964', '#ED9D1A', '#17C4EB', '#DED92D', '#ED9D1A'],
        // tooltip: {
        //   trigger: 'item',
        // },
        legend: {
          //   top: '5%',
          //   left: 'center',
          orient: 'vertical',
          top: 'center',
          right: 0,
          type: 'plain',
          icon: 'rect',
          itemHeight: 8,
          itemWidth: 8,
          textStyle: {
            color: '#ffffff',
            fontSize: 14,
            fontFamily: 'Source Han Sans SC',
            fontWeight: 400,
          },
          formatter: name => {
            let percent = '';
            let total = 0;
            countFarmSourceData.forEach(v => {
              total += parseFloat(v.value);
            });
            const item = countFarmSourceData.filter(
              item => item.name === name,
            )[0];
            if (!item) return;
            countFarmSourceData.forEach(v => {
              if (v.name == name) {
                //   if (data.all_reserve == 0) {
                //     percent = 0;
                //   } else {
                percent = ((v.value / 10) * 100).toFixed(2);
                //   }
              }
            });
            return `${name} ${percent}%`;
          },
        },
        series: [
          {
            name: '区域分布Top5',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['25%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
                formatter: ['{b|{b}}', '{a|{d}%}'].join('\n'),
                rich: {
                  b: {
                    fontSize: 14,
                    // fontFamily: 'YouSheBiaoTiHei-2',
                    fontWeight: 400,
                    color: '#FFFFFF',
                  },
                  a: {
                    fontSize: 24,
                    fontFamily: 'YouSheBiaoTiHei-2',
                    fontWeight: 400,
                    color: '#26E3FF',
                  },
                },
              },
            },
            labelLine: {
              show: true,
              //   lineStyle: {
              //     color: '#ffffff',
              //   },
            },
            roseType: 'radius',
            data: countFarmSourceData,
          },
        ],
      };
      this.$nextTick(() => {
        chart.setOption(option);
        chart.resize();
        // if (!this.timer3) {
        //   let len = 0;
        //   this.timer3 = setInterval(() => {
        //     if (len === countFarmSourceData.length) {
        //       len = 0;
        //     }
        //     countFarmSourceData.forEach((item, index) => {
        //       if (index !== len) {
        //         chart.dispatchAction({
        //           type: 'downplay',
        //           seriesIndex: 0,
        //           dataIndex: index,
        //         });
        //       }
        //     });
        //     chart.dispatchAction({
        //       type: 'highlight',
        //       seriesIndex: 0,
        //       dataIndex: len,
        //     }); //设置默认选中高亮部分

        //     chart.on('mouseover', function(e) {
        //       if (e.dataIndex != len) {
        //         countFarmSourceData.forEach((item, index) => {
        //           chart.dispatchAction({
        //             type: 'downplay',
        //             seriesIndex: 0,
        //             dataIndex: index,
        //           });
        //         });
        //         chart.dispatchAction({
        //           type: 'highlight',
        //           seriesIndex: 0,
        //           dataIndex: e.dataIndex,
        //         });
        //       }
        //     });
        //     chart.on('mouseout', function(e) {
        //       countFarmSourceData.forEach((item, index) => {
        //         chart.dispatchAction({
        //           type: 'downplay',
        //           seriesIndex: 0,
        //           dataIndex: index,
        //         });
        //       });
        //       chart.dispatchAction({
        //         type: 'highlight',
        //         seriesIndex: 0,
        //         dataIndex: len,
        //       });
        //     });
        //     len++;
        //   }, 3000);
        // }
      });
    },
    leftSecondSwitchAction(val) {
      this.leftSecondActive = val;
    },
    leftActiveActionThird(val) {
      this.leftActiveThird = val;
    },
    rightActiveActionFirst(val) {
      this.rightActiveFirst = val;
    },
    rightActiveActionSecond(val) {
      this.rightActiveSecond = val;
    },
    rightThirdSwitchAction(val) {
      this.rightThirdActive = val;
    },
    responseLayout: _.debounce(
      function() {
        switch (this.$route.query.mode) {
          case 'vertical':
            this.$refs.wrapper.style.transform = `scale(${window.innerHeight /
              1080})`;
            break;
          default:
            this.$refs.wrapper.style.transform = `scaleX(${window.innerWidth /
              1920}) scaleY(${window.innerHeight / 1080})`;
        }
      },
      1000,
      { leading: true, trailing: true },
    ),
  },
};
</script>
<style scoped lang="scss">
.pagCon {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 20px;
}
.nothingAlert {
  box-sizing: border-box;
  font-size: 16px;
  padding-top: 160px;
  text-align: center;
  width: 190px;
  height: 200px;
  margin: 0 auto;
  margin-top: 80px;
  background-image: url(https://img.hzanchu.com/acimg/ab22c36ffb394acc13280737238e498b.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  .describe {
    color: #bbd7fa;
  }
}

// .hidden {
//   //   width: 250px;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   -o-text-overflow: ellipsis;
// }
.hidden {
  width: 400px;
  height: 42px;
  text-align: center;
  //   display: flex;
  overflow: hidden;
}
.setWidth1 {
  width: 100px !important;
  overflow: hidden;
  height: 42px !important;
}
.overHidden {
  overflow-y: hidden;
}
@keyframes roll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
.animateItem {
  display: inline-block;
  white-space: nowrap;
  animation: 10s roll linear infinite normal;
}
.centerCon {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-top: 10px;
  box-sizing: border-box;
}
.indexBg {
  width: 22px;
  height: 22px;
  line-height: 22px;
  background-image: url(https://img.hzanchu.com/acimg/ff2b4229a7b4c30a9712f6b72cb9ffe3.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.modalScrolCon {
  width: 100%;
  color: #fff;
  height: 310px;
}
.hugeModal {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto !important;
  width: 1111px;
  height: 965px;
  z-index: 999999999;
  background-image: url(https://img.hzanchu.com/acimg/6a0527abec861ba754c2f1e8c715d87d.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.chartCon {
  //   padding-left: 10px;
  box-sizing: border-box;
}
.firChild3ChartEchart {
  width: 920px;
  height: 230px;
}
.shutModal {
  position: absolute;
  right: 33px;
  top: 30px;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
.modalHead {
  background-image: url(https://img.hzanchu.com/acimg/c7b9e61d80cf9ab2b12e2d3fb983555b.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 547px;
  height: 74px;
  margin: 0 auto;
  font-size: 32px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.modalBottom {
  padding-top: 31px;
  box-sizing: border-box;
  padding-left: 73px;
  padding-right: 73px;
}
.modalTableCon {
  height: 452px;
  background: rgba(73, 147, 248, 0.08);
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
  padding-bottom: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 20px;
}
.modalChartCon {
  height: 360px;
  background: rgba(73, 147, 248, 0.08);
  border-radius: 10px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
  box-sizing: border-box;
}
.modalTableTitleCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-bottom: 20px;
}
.modalChartTitleCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-bottom: 20px;
}
.modalTitleSelf {
  width: 590px;
  height: 46px;
  background-image: url(https://img.hzanchu.com/acimg/909784bfb105e4205083f36fd10e4074.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 600;
  line-height: 23px;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  box-sizing: border-box;
  padding-left: 41px;
}
.modalTime {
  width: 281px;
  height: 42px;
  background-image: url(https://img.hzanchu.com/acimg/c67a05ba8c671a1d731927938c44fcef.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding-left: 0;
  padding-right: 10px;
  box-sizing: border-box;
  cursor: pointer;
  .modalTimRange {
    width: 100% !important;
    color: #fff;
    font-size: 16px;
  }
  img {
    width: 24px;
    height: 13px;
  }
}
.resetTimerCon {
  width: 100% !important;
}
.globalStyleValue {
  font-size: 66px;
  font-family: PangMenZhengDao;
  color: #fff;
  white-space: nowrap;
  text-shadow: 0px 3px 6px #1075ff;
}
.globalStyleValueDecroation {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 30px;
  color: #cceaff;
}
.masterNumberCon {
  text-align: center;
}
.masterGlobalTitle {
  font-size: 38px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 38px;
  text-align: center;
  color: #cceaff;
  margin-bottom: 30px;
}
.redArrow {
  color: #ff6759;
}
.blueArrow {
  color: #71d964;
}
.statusArrowImg {
  width: 8px;
  height: 10px;
}
.normalScrollItemHeight {
  height: 35px;
  line-height: 35px;
  &:nth-child(odd) {
    background-color: rgba(25, 152, 248, 0.1);
  }
}
.normalmodalScrollItemHeight {
  height: 42px;
  line-height: 42px;
  &:nth-child(odd) {
    background-color: rgba(25, 152, 248, 0.1);
  }
}
.seamless-warp {
  text-align: center;

  &.mainAgriCon {
    height: 170px;
    font-size: 14px;
  }
  &.mainModalAgriCon {
    height: 250px;
    font-size: 16px;
  }
  &.hrainAgriCon {
    width: 400px;
    display: flex;
    justify-content: center;
    height: 42px;
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
/** 依照设计稿1920px * 1080px进行开发 */
.phdmCirculateCon {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.viewer {
  transform-origin: 0 0;
  box-sizing: border-box;
  width: 1920px;
  height: 1080px;
  background-image: url(https://img.hzanchu.com/acimg/fb361a3c28d2808a08c751d9b73c26c7.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.content {
  position: absolute;
  left: 30px;
  top: 113px;
  right: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
}
.leftMaster {
  margin-top: 11px;
  width: 497px;
  height: 935px;
  background-image: url(https://img.hzanchu.com/acimg/ee0af0851150b7197a0d5ec44cc32d0e.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.centerMaster {
  margin-top: 11px;
  width: 829px;
  .centerTop {
    width: 760px;
    height: 217px;
    background-image: url(https://img.hzanchu.com/acimg/50b079dfaa1ddea8cc0fbf30d4f8bc57.png);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0 auto;
    padding-top: 32px;
    box-sizing: border-box;
  }
  .centerBottom {
    height: 710px;
    overflow: hidden;
    width: 100%;
    // opacity: 0.3;
    // background-color: #fff;
  }
}
.rightMaster {
  width: 497px;
  height: 935px;
  background-image: url(https://img.hzanchu.com/acimg/394b560265ded3c8b0f9b72d74a80fd2.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding-top: 12px;
  box-sizing: border-box;
}
.topCon {
  position: absolute;
  z-index: 2;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  height: 70px;
  width: 80%;
  background-image: url(https://img.hzanchu.com/acimg/149873bc06ad002362280f520870d1b7.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.leftFirst {
  //   background-color: #fff;
  //   opacity: 0.6;
  height: 304px;
  padding-left: 11px;
  padding-right: 11px;
  box-sizing: border-box;
}
.leftFirTitleCon {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  position: relative;
}
.pr20 {
  padding-right: 20px;
}
.leftFirTitleBg {
  width: 364px;
  height: 60px;
  background-image: url(https://img.hzanchu.com/acimg/1e6de8a6afcfde0110b750db30a0bb61.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.leftFirWiderTitleBg {
  width: 415px;
  height: 60px;
  background-image: url(https://img.hzanchu.com/acimg/e4b5efc5ca7d638d58f7d5a0e7a59ef1.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.leftFirTitleText {
  font-size: 20px;
  padding-left: 30px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 9px;
}
.cusMargin1 {
  margin-top: 16px;
}
.leftFirBodyCon {
  padding-right: 15px;
  box-sizing: border-box;
}
.rightFirBodyCon {
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 20px;
  height: 246px;
}
.cursorTitle {
  opacity: 0.5;
  cursor: pointer;
}
.cursorActiveTitle {
  opacity: 1 !important;
}
.halfWidth {
  width: 50%;
}
.padLeft20 {
  padding-left: 20px;
  box-sizing: border-box;
}
.padRight10 {
  padding-right: 5px !important;
}
.mb30 {
  margin-bottom: 30px;
}
.dashBorder {
  width: 1px;
  height: 36px;
  border-left: 1px dashed #3677b3;
}
.marginRight20 {
  margin-right: 20px;
}
.flexStart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.flexBetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.leftSecond {
  //   background-color: #fff;
  //   opacity: 0.6;
  height: 288px;
  padding-left: 11px;
  padding-right: 11px;
  box-sizing: border-box;
}

.leftSecondSwitchCon {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  right: 0;
  top: 6px;
}
.rightThirdSwitchCon {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  right: 12px;
  top: 6px;
}
.leftSecondFakeBg {
  cursor: pointer;
  width: 81px;
  height: 29px;
  background-image: url(https://img.hzanchu.com/acimg/26d210a513706297f26b0cffd995ac9a.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 29px;
}
.leftSecondFakeBgActive {
  background-image: url(https://img.hzanchu.com/acimg/ad22cf9adf05d1e1fda92569c538eaf7.png) !important;
}
.ml6 {
  margin-left: 6px;
}

.leftThird {
  //   background-color: #fff;
  //   opacity: 0.3;
  height: 341px;
  padding-left: 11px;
  padding-right: 11px;
  box-sizing: border-box;
}
.rightFirst {
  //   background-color: #fff;
  //   opacity: 0.6;
  height: 307px;
}
.rightSecond {
  //   background-color: #fff;
  //   opacity: 0.6;
  height: 334px;
}
.rightThird {
  //   background-color: #fff;
  //   opacity: 0.6;
  height: 296px;
}

.masterTitleBack {
  width: 100%;
  font-weight: 500;
  height: 32px;
  background: linear-gradient(
    270deg,
    rgba(51, 143, 249, 0) 0%,
    rgba(51, 143, 249, 0.6) 100%,
    rgba(51, 143, 249, 0) 100%
  );
}
.arrow {
  height: 35px;
  width: 17px;
  margin-left: 8px;
}
.borderImg {
  position: absolute;
  left: -2px;
  top: -2px;
  height: 2px;
  width: 8px;
}
.firChild1 {
  width: 453px;
  //   background-color: #fff;
  height: 284px;
}
.firChild3ChartOuter {
  width: 100%;
  height: 100%;
}
.thiChild1ChartOuter {
  width: 100%;
  height: 100%;
}
.thiChild1ChartEchart {
  width: 100%;
  height: 100%;
}
.firChild2 {
  width: 926px;
  height: 284px;
  //   background-color: #fff;
}
.firChild3 {
  //   width: 23.6%;
  width: 453px;
  height: 284px;
  //   background-color: #fff;
}

.firChild3TitleCon {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  margin-bottom: 9px;
  padding-top: 9px;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-top: 2px solid rgba(41, 148, 255, 0.2);
}
.firChild3TitleBody {
  width: 408px;
  height: 32px;
  color: #fff;
  padding-left: 6px;
  font-size: 20px;
  line-height: 32px;
  margin-left: 11px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
}
.firChild3Content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  border: 2px solid rgba(41, 148, 255, 0.4);
  box-sizing: border-box;
  position: relative;
  height: 235px;
  box-sizing: border-box;
}
.withPadding {
  padding: 10px !important;
}
.secChild2Content {
  border: 2px solid rgba(41, 148, 255, 0.4);
  box-sizing: border-box;
  position: relative;
  height: 235px;
  padding-top: 16px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
}
.firstCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-bottom: 21px;
}
.secondCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-bottom: 21px;
}
.secChild1 {
  height: 285px;
  width: 453px;
  //   background-color: #fff;
}
.secChild2 {
  height: 285px;
  width: 453px;
  //   background-color: #fff;
}
.secChild3 {
  height: 285px;
  width: 453px;
  //   background-color: #fff;
}
.secChild4 {
  height: 285px;
  width: 453px;
  //   background-color: #fff;
}
.thirdCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.thiChild1 {
  height: 285px;
  width: 453px;
  //   background-color: #fff;
}
.thiChild2 {
  height: 285px;
  width: 453px;
  //   background-color: #fff;
}
.thiChild3 {
  height: 285px;
  width: 453px;
  //   background-color: #fff;
}
.thiChild4 {
  height: 285px;
  width: 453px;
  //   background-color: #fff;
}
.scrollCon {
  width: 100%;
  color: #fff;
  height: 200px;
}
.scrollHeader {
  text-align: center;
  height: 24px;
  font-size: 14px;
  color: #a1ceef;
  padding-bottom: 10px;
  box-sizing: border-box;
  //   line-height: 19px;
}

.scrollModalHeader {
  text-align: center;
  height: 38px;
  font-size: 16px;
  color: #a1ceef;
  padding-bottom: 10px;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.modalTimRange {
  .el-input__inner {
    background-color: transparent !important;
    border-color: transparent !important;
  }
  .el-range-input {
    background-color: transparent !important;
    color: #fff !important;
  }
  .el-range-separator {
    color: #fff !important;
  }
}
.phdmCirculateCon {
  .el-pagination__total {
    color: #fff !important;
  }
  .el-pagination__jump {
    color: #fff !important;
  }
  .el-pagination button:disabled {
    background-color: transparent !important;
  }
  .el-pagination__editor.el-input .el-input__inner {
    background-color: transparent !important;
    color: #fff;
  }
  .el-pager li {
    background-color: transparent !important;
  }
  .el-pagination .btn-next {
    background-color: transparent !important;
    color: #fff !important;
  }
  .el-pagination .btn-prev {
    background-color: transparent !important;
    color: #fff !important;
  }
  .el-pager li.btn-quickprev {
    color: #fff !important;
  }
  .el-pager li.btn-quicknext {
    color: #fff !important;
  }

  .number {
    &.active {
      color: #fff !important;
      background-color: #5ea0f7 !important;
    }
    color: #a6a7a9 !important;
  }
}
.cusPicker {
  .el-date-table td {
    width: 20px !important;
    height: 20px !important;
    padding: 2px 0 !important;
  }
  .el-date-range-picker__content {
    padding: 5px !important;
  }
  .el-date-table td div {
    height: 20px !important;
    padding: 0 !important;
    // width: 20px !important;
  }
  .el-date-table th {
    padding: 0 !important;
  }
  .el-date-table {
    tr {
      height: 20px !important;
    }
  }
}
</style>
