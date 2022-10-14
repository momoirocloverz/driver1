<template>
  <div class="phdmCirculateCon">
    <div class="viewer" ref="wrapper">
      <div class="topCon">
        <div class="globalGoback" @click="goBack">
          <div class="globalGobackIcon"></div>
          <div class="globalGobackText">返回</div>
        </div>
      </div>
      <div class="content">
        <div class="firstCon">
          <div class="firChild1">
            <div class="firChild1TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild1TitleBody masterTitleBack">
                市场数量、经营户总数和区域分布
              </div>
            </div>
            <div class="firChild1Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="firChild1ConLeft">
                <div class="firChild1ConLTop">
                  <img class="emptyVideo" ref="gif1" :src="gifSrc" />
                  <div class="firChild1ConLDescribe">市场数量</div>
                  <!-- <div class="firChild1ConLNumber">14</div> -->
                  <div class="firChild1ConLNumber">
                    <countTo
                      class="_value"
                      :start-val="0"
                      :end-val="firstEnd"
                      :duration="1000"
                      :decimals="0"
                    />
                  </div>
                </div>
                <div class="firChild1ConLBottom">
                  <img class="emptyVideo" :src="gifSrc" />
                  <div class="firChild1ConLDescribe">经营户总数</div>
                  <div class="firChild1ConLNumber">
                    <countTo
                      class="_value"
                      :start-val="0"
                      :end-val="secondEnd"
                      :duration="1000"
                      :decimals="0"
                    />
                  </div>
                </div>
              </div>
              <div class="firChild1ConRight">
                <div ref="marketQuantityOperating" class="firEchart"></div>
              </div>
            </div>
          </div>
          <div class="firChild2">
            <div class="firChild2TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild2TitleBody masterTitleBack">
                10月·销售数据统计
              </div>
            </div>
            <div class="firChild2Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="firChild2DivideCon">
                <div class="firChild2DivideTitle">销售数量</div>
                <div>
                  <span class="firChild2DivideNumber">
                    <countTo
                      class="_value"
                      :start-val="0"
                      :end-val="thirdEnd"
                      :duration="1000"
                      :decimals="1"/></span
                  ><span class="firChild2DivideUnit">吨</span>
                </div>
              </div>
              <div class="firChild2DivideCon">
                <div class="firChild2DivideTitle">销售种类</div>
                <div>
                  <span class="firChild2DivideNumber"
                    ><countTo
                      class="_value"
                      :start-val="0"
                      :end-val="fourthEnd"
                      :duration="1000"
                      :decimals="0"/></span
                  ><span class="firChild2DivideUnit">类</span>
                </div>
              </div>
              <div class="firChild2DivideCon">
                <div class="firChild2DivideTitle">销售额</div>
                <div>
                  <span class="firChild2DivideNumber"
                    ><countTo
                      class="_value"
                      :start-val="0"
                      :end-val="fifthEnd"
                      :duration="1000"
                      :decimals="0"/></span
                  ><span class="firChild2DivideUnit">万元</span>
                </div>
              </div>
            </div>
          </div>
          <div class="firChild3">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">
                农产品销量及销售额走势图
              </div>
            </div>
            <div class="firChild3Content withPadding">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="firChild3ChartOuter ">
                <div ref="rightTopChart" class="firChild3ChartEchart"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="secondCon">
          <div class="secChild1">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">
                在售农产品类型及数量
              </div>
            </div>
            <div class="firChild3Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="secChild1ChartOuter">
                <div ref="produceTypeNum" class="secChild1ChartEchart"></div>
              </div>
            </div>
          </div>
          <div class="secChild2">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">
                主要农产品实时价格列表
              </div>
            </div>
            <div class="secChild2Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="scrollCon">
                <el-row class="scrollHeader">
                  <el-col :span="8">农产品名称</el-col>
                  <el-col :span="6">价格</el-col>
                  <el-col :span="6">日期</el-col>
                  <el-col :span="4">较昨日</el-col>
                </el-row>
                <vue-seamless-scroll
                  :data="mainAgriData"
                  class="mainAgriCon seamless-warp"
                  :class-option="classOption"
                >
                  <el-row
                    v-for="(item, index) in mainAgriData"
                    :key="index"
                    :class="['normalScrollItemHeight']"
                  >
                    <el-col :span="8">
                      <span>{{ item.title }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.price }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.date }}</span>
                    </el-col>
                    <el-col :span="4">
                      <span>
                        <img
                          class="statusArrowImg"
                          :src="+item.compare > 0 ? redArrowImg : blueArrowImg"
                        />
                        <span
                          :class="[
                            +item.compare > 0 ? 'redArrow' : 'blueArrow',
                          ]"
                        >
                          {{ Math.abs(+item.compare) }}%</span
                        >
                      </span>
                    </el-col>
                  </el-row>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
          <div class="secChild3">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">
                当前价格与历史价格趋势比对
              </div>
            </div>
            <div class="secChild2Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="scrollCon">
                <el-row class="scrollHeader">
                  <el-col :span="8">农产品名称</el-col>
                  <el-col :span="6">本月平均价格</el-col>
                  <el-col :span="6">同比</el-col>
                  <el-col :span="4">较昨日</el-col>
                </el-row>
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
                    <el-col :span="8">
                      <span>{{ item.title }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.price }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>
                        <img
                          class="statusArrowImg"
                          :src="+item.last > 0 ? redArrowImg : blueArrowImg"
                        />
                        <span
                          :class="[+item.last > 0 ? 'redArrow' : 'blueArrow']"
                        >
                          {{ Math.abs(+item.last) }}%</span
                        >
                      </span>
                    </el-col>
                    <el-col :span="4">
                      <span>
                        <img
                          class="statusArrowImg"
                          :src="+item.compare > 0 ? redArrowImg : blueArrowImg"
                        />
                        <span
                          :class="[
                            +item.compare > 0 ? 'redArrow' : 'blueArrow',
                          ]"
                        >
                          {{ Math.abs(+item.compare) }}%</span
                        >
                      </span>
                    </el-col>
                  </el-row>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
          <div class="secChild4">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">销量突变预警</div>
            </div>
            <div class="secChild2Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="scrollCon">
                <el-row class="scrollHeader">
                  <el-col :span="8">农产品名称</el-col>
                  <el-col :span="6">异常销量(吨)</el-col>
                  <el-col :span="6">历史销量</el-col>
                  <el-col :span="4">时间</el-col>
                </el-row>
                <vue-seamless-scroll
                  :data="unusualData"
                  class="mainAgriCon seamless-warp"
                  :class-option="classOption"
                >
                  <el-row
                    v-for="(item, index) in unusualData"
                    :key="index"
                    :class="['normalScrollItemHeight']"
                  >
                    <el-col :span="8">
                      <span>{{ item.title }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.ton }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>
                        {{ item.history }}
                      </span>
                    </el-col>
                    <el-col :span="4">
                      <span>
                        {{ item.time }}
                      </span>
                    </el-col>
                  </el-row>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
        <div class="thirdCon">
          <div class="thiChild1">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">
                农产品来源分布
              </div>
            </div>
            <div class="firChild3Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="thiChild1ChartOuter">
                <div ref="source" class="thiChild1ChartEchart"></div>
              </div>
            </div>
          </div>
          <div class="thiChild2">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">
                农产品成交额Top10
              </div>
            </div>
            <div class="firChild3Content removeTwoPadding">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="thiChild2ChartOuter">
                <div ref="transactionAmount" class="thiChild2ChartEchart"></div>
              </div>
            </div>
          </div>
          <div class="thiChild3">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">
                农产品成交数量Top10<span class="firChild3SmallContent"
                  >(可滚动缩放左右拖动查看)</span
                >
              </div>
            </div>
            <div class="firChild3Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="thiChild3ChartOuter">
                <div ref="transactionNum" class="thiChild3ChartEchart"></div>
              </div>
            </div>
          </div>
          <div class="thiChild4">
            <div class="firChild3TitleCon">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <img
                class="arrow"
                src="https://img.hzanchu.com/acimg/010fa29b1633b65add0b6c43ba542456.png"
              />
              <div class="firChild3TitleBody masterTitleBack">个体销量预警</div>
            </div>
            <div class="secChild2Content">
              <img
                class="borderImg"
                src="https://img.hzanchu.com/acimg/5e824b55391782fdcc7c54effdd9a0e7.png"
              />
              <div class="scrollCon">
                <el-row class="scrollHeader">
                  <el-col :span="8">经营户名称</el-col>
                  <el-col :span="6">异常销量(吨)</el-col>
                  <el-col :span="6">历史销量</el-col>
                  <el-col :span="4">时间</el-col>
                </el-row>
                <vue-seamless-scroll
                  :data="operUnusualData"
                  class="mainAgriCon seamless-warp"
                  :class-option="classOption"
                >
                  <el-row
                    v-for="(item, index) in operUnusualData"
                    :key="index"
                    :class="['normalScrollItemHeight']"
                  >
                    <el-col :span="8">
                      <span>{{ item.title }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.ton }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.history }}</span>
                    </el-col>
                    <el-col :span="4">
                      <span>{{ item.time }}</span>
                    </el-col>
                  </el-row>
                </vue-seamless-scroll>
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
import _ from 'lodash';
import vueSeamlessScroll from 'vue-seamless-scroll';
import * as echarts from 'echarts';
export default {
  components: {
    vueSeamlessScroll,
    countTo,
  },
  data() {
    return {
      firstEnd: 0,
      redArrowImg:
        'https://img.hzanchu.com/acimg/d7f31adcb0f36e1e80129ceac14c010b.png',
      blueArrowImg:
        ' https://img.hzanchu.com/acimg/9a10c4a4cbe8e7f8da0ef7547a8e3398.png',
      videoSrc: require('@/assets/phdm/loopCircle.mp4'),
      gifSrc: require('@/assets/phdm/loopGif.gif'),
      operUnusualData: [
        {
          title: '黄建峰',
          ton: '842',
          history: '1024',
          time: '10-23',
        },
        {
          title: '顾国强',
          ton: '481',
          history: '507',
          time: '10-19',
        },
        {
          title: '陆正光',
          ton: '395',
          history: '258',
          time: '10-16',
        },
        {
          title: '韦君杭',
          ton: '405',
          history: '365',
          time: '10-10',
        },
        {
          title: '许国勤',
          ton: '214',
          history: '355',
          time: '10-07',
        },
        {
          title: '张良伟',
          ton: '206',
          history: '308',
          time: '10-04',
        },
      ],
      unusualData: [
        {
          title: '金平湖',
          ton: '658',
          history: '1345',
          time: '10-22',
        },
        {
          title: '蒲香农家',
          ton: '467',
          history: '1034',
          time: '10-19',
        },
        {
          title: '十月稻田长粒香',
          ton: '359',
          history: '736',
          time: '10-16',
        },
        {
          title: '阳春大米',
          ton: '576',
          history: '1253',
          time: '10-13',
        },
        {
          title: '南粳香',
          ton: '1010',
          history: '1980',
          time: '10-07',
        },
        {
          title: '虾香稻米',
          ton: '254',
          history: '533',
          time: '10-04',
        },
      ],
      trendCompData: [
        {
          title: '金平湖',
          price: '7.4元/kg',
          last: '7',
          compare: '3',
        },
        {
          title: '蒲香农家',
          price: '4.1元/kg',
          last: '3.50',
          compare: '-4',
        },
        {
          title: '十月稻田长粒香',
          price: '4.2元/kg',
          last: '-4',
          compare: '-3.50',
        },
        {
          title: '阳春大米',
          price: '5.2元/kg',
          last: '-2.50',
          compare: '3',
        },
        {
          title: '南粳香',
          price: '5.1元/kg',
          last: '5',
          compare: '4',
        },
        {
          title: '虾香稻米',
          price: '5.6元/kg',
          last: '3.50',
          compare: '2.50',
        },
      ],

      mainAgriData: [
        {
          title: '金平湖',
          price: '7.2元/kg',
          date: '10-01',
          compare: '5',
        },
        {
          title: '蒲香农家',
          price: '3.8元/kg',
          date: '10-01',
          compare: '4',
        },
        {
          title: '十月稻田长粒香',
          price: '4.4元/kg',
          date: '10-01',
          compare: '4',
        },
        {
          title: '阳春大米',
          price: '5.3元/kg',
          date: '10-01',
          compare: '3',
        },
        {
          title: '南粳香',
          price: '5.5元/kg',
          date: '10-01',
          compare: '-5',
        },
        {
          title: '虾香稻米',
          price: '5.8元/kg',
          date: '10-01',
          compare: '-3',
        },
      ],
      classOption: {
        step: 0.2,
        limitMoveNum: 5,
      },
      globalLeftTopChart: null,
      timer0: null,
      timer3: null,
      globalLeftBottomChart: null,
      globalLeftMiddleChart: null,
      timer1: null,
      timer4: null,
      globalBottomSecondChart: null,
      globalBottomThirdChart: null,
      globalTopRightChart: null,
      timer5: null,
      secondEnd: 0,
      thirdEnd: 0,
      fourthEnd: 0,
      fifthEnd: 0,
      timer6: null,
    };
  },
  mounted() {
    this.responseLayout();
    window.addEventListener('resize', this.responseLayout);
    this.initLeftTopChart();
    this.initLeftBottomChart();
    this.initLeftMiddleChart();
    this.initBottomSecondChart();
    this.initBottomThirdChart();
    this.initRightTopChart();
    this.initDynamicNumber();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.responseLayout);
    this.destoryChart();
  },
  methods: {
    goBack() {
      this.$router.replace('/phdm');
    },
    initDynamicNumber() {
      setTimeout(() => {
        this.firstEnd = 14;
        this.secondEnd = 386;
        this.thirdEnd = 34042.5;
        this.fourthEnd = 16;
        this.fifthEnd = 6107;
      }, 1000);
    },
    destoryChart() {
      if (this.globalLeftTopChart) {
        this.globalLeftTopChart.dispose();
      }
      clearInterval(this.timer0);
      if (this.globalLeftBottomChart) {
        this.globalLeftBottomChart.dispose();
      }
      clearInterval(this.timer3);
      if (this.globalLeftMiddleChart) {
        this.globalLeftMiddleChart.dispose();
      }
      clearInterval(this.timer1);
      if (this.globalBottomSecondChart) {
        this.globalBottomSecondChart.dispose();
      }
      clearInterval(this.timer4);
      if (this.globalBottomThirdChart) {
        this.globalBottomThirdChart.dispose();
      }
      if (this.globalTopRightChart) {
        this.globalTopRightChart.dispose();
      }
      clearInterval(this.timer5);
      clearInterval(this.timer6);
    },
    initRightTopChart() {
      let source = [
        {
          actualOutput: '3012',
          created: 1636529160000,
          estimateOutput: '140385',
          id: 1,
          predictOutput: '',
          reduceProduction: '1265.0',
          year: '10-1',
        },
        {
          actualOutput: '3148',
          created: 1636529160000,
          estimateOutput: '113576',
          id: 2,
          predictOutput: '',
          reduceProduction: '1322.2',
          year: '10-2',
        },
        {
          actualOutput: '2876',
          created: 1636529160000,
          estimateOutput: '157340',
          id: 3,
          predictOutput: '',
          reduceProduction: '1207.9',
          year: '10-3',
        },
        {
          actualOutput: '2587',
          created: 1636529160000,
          estimateOutput: '125439',
          id: 4,
          predictOutput: '',
          reduceProduction: '1086.5',
          year: '10-4',
        },
        {
          actualOutput: '3106',
          created: 1636529160000,
          estimateOutput: '158346',
          id: 5,
          predictOutput: '',
          reduceProduction: '1304.5',
          year: '10-5',
        },
        {
          actualOutput: '3246',
          created: 1636529160000,
          estimateOutput: '130747',
          id: 6,
          predictOutput: '',
          reduceProduction: '1363.3',
          year: '10-6',
        },
      ];
      let year = [];
      let historyData = [];
      let predictData = [];
      let actualOutput = [];
      let estimateOutput = [];
      source.forEach((item, index) => {
        if (item.reduceProduction && index !== 6) {
          historyData.push({
            name: item.year,
            value: item.reduceProduction,
          });
        }
        if (item.predictOutput) {
          predictData.push({
            name: item.year,
            value: item.predictOutput,
          });
        }
        year.push(item.year);
        actualOutput.push(item.actualOutput);
        estimateOutput.push(item.estimateOutput);
      });
      let myChart = echarts.init(this.$refs.rightTopChart);
      this.globalTopRightChart = myChart;
      let data1 = historyData.map(item => {
        return [item.name, item.value];
      });
      let data2 = predictData.map(item => {
        return [item.name, item.value];
      });
      data2.unshift([data1[data1.length - 1][0], 0]);
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(3,3,3,0)',
          borderWidth: 0,
          textStyle: {
            color: '#ffffff',
            fontSize: '14',
          },
          axisPointer: {
            type: 'shadow',
          },
          formatter: value => {
            let str = '';
            value.forEach(item => {
              if (item.data) {
                str += `<li style="position: relative;display:flex;height:20px;line-height:20px;">
                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${
                  item.seriesName === '销售额' ? '#DF6FF4' : '#35FDDC'
                };"></div>
                <div style="margin-left:15px;">${item.seriesName}：${
                  item.seriesName === '销售额' ? item.data[1] : item.data
                } ${item.seriesName === '销售额' ? '万元' : '吨'}</div></li>`;
              }
            });
            let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`;
            return res;
          },
        },
        grid: {
          right: '2%',
          bottom: '0',
          left: '2%',
          top: '48px',
          containLabel: true,
        },
        legend: {
          data: ['销售额', '销量'],
          type: 'plain',
          icon: 'rect',
          itemHeight: 8,
          itemWidth: 8,
          textStyle: {
            color: '#ffffff',
            fontSize: 12,
            fontFamily: 'Source Han Sans SC',
            fontWeight: 400,
          },
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, .5)',
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .5)',
            },
          },
          data: year,
        },
        yAxis: [
          {
            type: 'value',
            name: '吨',
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
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255, 255, 255, .5)',
              },
            },
          },
          {
            type: 'value',
            name: '万元',
            position: 'right',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255, 255, 255, .5)',
              },
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, .5)',
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255, 255, 255, .5)',
              },
            },
          },
        ],
        series: [
          {
            name: '销售额',
            type: 'line',
            data: data1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#DF6FF4',
                lineStyle: {
                  shadowColor: '#000',
                  shadowBlur: 5,
                  shadowOffsetY: 2,
                },
              },
            },
            lineStyle: {
              shadowColor: '#000',
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#DF6FF4',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(223,111,244,0)',
                    },
                  ],
                  false,
                ),
              },
            },
          },
          {
            name: '销量',
            type: 'bar',
            barWidth: 16,
            data: actualOutput,
            itemStyle: {
              normal: {
                barBorderRadius: [8, 8, 0, 0],
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#35FDDC',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(53, 253, 220, 0.3)',
                    },
                  ],
                  false,
                ),
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      myChart.resize();
      let len = 0;
      clearInterval(this.timer6);
      this.timer6 = setInterval(() => {
        if (len === year.length) {
          len = 0;
        }
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: len,
        });
        len++;
      }, 3000);
    },
    initBottomThirdChart() {
      let source = [
        {
          farmCount: 1250,
          farmTurnover: 23,
          farmType: '金平湖',
          id: 1,
          transactCount: 11298349,
          year: 2021,
        },
        {
          farmCount: 982.8,
          farmTurnover: 23,
          farmType: '蒲香农家',
          id: 5,
          transactCount: 544996,
          year: 2021,
        },
        {
          farmCount: 856.8,
          farmTurnover: 56,
          farmType: '十月稻田长粒香',
          id: 29,
          transactCount: 474190,
          year: 2021,
        },
        {
          farmCount: 737.2,
          farmTurnover: 56,
          farmType: '阳春大米',
          id: 20,
          transactCount: 460753,
          year: 2021,
        },
        {
          farmCount: 462.8,
          farmTurnover: 56,
          farmType: '南粳香',
          id: 3,
          transactCount: 427808,
          year: 2021,
        },
        {
          farmCount: 420.8,
          farmTurnover: 90,
          farmType: '虾香稻米',
          id: 23,
          transactCount: 330706,
          year: 2021,
        },
        {
          farmCount: 350,
          farmTurnover: 45,
          farmType: '陇间柒月富硒大米',
          id: 7,
          transactCount: 312896,
          year: 2021,
        },
        {
          farmCount: 341.2,
          farmTurnover: 56,
          farmType: '七星秋实珍珠米',
          id: 4,
          transactCount: 292828,
          year: 2021,
        },
        {
          farmCount: 288.4,
          farmTurnover: 78,
          farmType: '福临门茉莉香米',
          id: 17,
          transactCount: 273653,
          year: 2021,
        },
        {
          farmCount: 170,
          farmTurnover: 78,
          farmType: '秋水良田',
          id: 28,
          transactCount: 266497,
          year: 2021,
        },
      ];

      let farmYearCountByCountData = [];
      let xAxisData = [];

      source.forEach((item, index) => {
        farmYearCountByCountData.push(item.farmCount);
        xAxisData.push(item.farmType);
      });

      let chart = echarts.init(this.$refs.transactionNum);
      this.globalBottomThirdChart = chart;
      let chartdata1 = [];
      if (farmYearCountByCountData && farmYearCountByCountData.length > 0) {
        farmYearCountByCountData.forEach(item => {
          chartdata1.push(1);
        });
      }
      let option = {
        textStyle: {
          color: '#c0c3cd',
          fontSize: 14,
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              backgroundColor: '#031245',
            },
            restore: {},
          },
          iconStyle: {
            borderColor: '#c0c3cd',
          },
        },
        legend: {
          // top: 10,
          // itemWidth: 8,
          // itemHeight: 8,
          icon: 'circle',
          left: 'center',
          padding: 0,
          textStyle: {
            color: '#c0c3cd',
            fontSize: 14,
            padding: [2, 0, 0, 0],
          },
        },
        color: ['#26BF40', 'rgba(38, 191, 64, 0.9)'],
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        dataZoom: {
          type: 'inside',
          minValueSpan: 4,
          maxValueSpan: 4,
        },
        xAxis: {
          axisLabel: {
            interval: 0,
            formatter: value => {
              return `{${value === '糯米山药' ? 'a' : 'b'}|${value}}`;
            },
            rotate: 10,
            rich: {
              a: {
                color: '#ffffff',
                fontSize: 14,
                // fontWeight: 800,
                textBorderColor: '#ffffff',
                textBorderWidth: 1,
                textBorderDashOffset: 20,
              },
              b: {
                color: '#ffffff',
                fontSize: 10,
                // fontWeight: 400,
              },
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#384267',
              width: 1,
            },
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#335971',
            },
            show: false,
          },
          data: xAxisData,
          type: 'category',
        },
        yAxis: {
          axisLabel: {
            color: 'rgba(255,255,255,0.5)',
            fontSize: 14,
          },
          axisTick: {
            lineStyle: {
              color: '#668092',
              width: 1,
            },
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)',
              type: 'dashed',
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              // color: '#333',
              width: 1,
              // "type": "dashed"
            },
            // show: true,
          },
          //   name: '吨',
        },
        series: [
          {
            data: farmYearCountByCountData,
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(53, 253, 220, 1.0)' },
                { offset: 0.5, color: 'rgba(53, 253, 220, 0.5)' },
                { offset: 1, color: 'rgba(53, 253, 220, 0)' },
              ]),
              borderRadius: [8, 8, 0, 0],
            },
            label: {
              show: true,
              position: 'top',
              distance: 10,
              color: '#fff',
              fontSize: 16,
              fontFamily: 'YouSheBiaoTiHei-2',
              fontWeight: 400,
              //   shadowColor: '#fff',
              //   shadowBlur: 4,
              //   shadowOffsetX: 0,
              //   shadowOffsetY: 4,
            },
          },
        ],
        tooltip: {
          show: true,
          formatter: data => {
            let res = data.marker + data.name + '：' + data.value + '吨';
            return res;
          },
          backgroundColor: 'rgba(3,3,3,0.5)',
          borderWidth: 0,
          textStyle: {
            color: '#ffffff',
            fontSize: '14',
          },
        },
      };
      this.$nextTick(() => {
        chart.setOption(option);
        chart.resize();
        let len = 0;
        clearInterval(this.timer5);
        this.timer5 = setInterval(() => {
          // if (len === categoryData.length) {
          //     len = 0;
          // }
          if (len === 100) {
            len = 0;
          }
          chart.dispatchAction({ type: 'dataZoom', start: len, end: len + 20 });
          len = len + 20;
        }, 3000);
      });
    },
    initBottomSecondChart() {
      let source = [
        {
          farmCount: 3896046,
          farmTurnover: 312.5,
          farmType: '金平湖',
          id: 1,
          year: 2021,
        },
        {
          farmCount: 1635987,
          farmTurnover: 245.7,
          farmType: '蒲香农家',
          id: 5,
          year: 2021,
        },
        {
          farmCount: 879483,
          farmTurnover: 214.2,
          farmType: '十月稻田长粒香',
          id: 4,
          year: 2021,
        },
        {
          farmCount: 1423569,
          farmTurnover: 184.3,
          farmType: '阳春大米',
          id: 29,
          year: 2021,
        },
        {
          farmCount: 789993,
          farmTurnover: 115.7,
          farmType: '南粳香',
          id: 8,
          year: 2021,
        },
        {
          farmCount: 342324,
          farmTurnover: 105.2,
          farmType: '虾香稻米',
          id: 35,
          year: 2021,
        },
        {
          farmCount: 621663,
          farmTurnover: 87.5,
          farmType: '陇间柒月富硒大米',
          id: 12,
          year: 2021,
        },
        {
          farmCount: 800490,
          farmTurnover: 85.3,
          farmType: '七星秋实珍珠米',
          id: 28,
          year: 2021,
        },
        {
          farmCount: 276927,
          farmTurnover: 72.1,
          farmType: '福临门茉莉香米',
          id: 16,
          year: 2021,
        },
        {
          farmCount: 707325,
          farmTurnover: 42.5,
          farmType: '秋水良田',
          id: 24,
          year: 2021,
        },
      ];
      let yAxisData = [];
      let yAxisDataT = [];
      let markPointData = [];
      let farmYearCountByTurnoverData = [];
      source.forEach((item, index) => {
        let obj = {
          yAxis: source.length - (1 + index),
          //   xAxis: parseFloat((item.farmTurnover / 10000).toFixed(4)),
          xAxis: item.farmTurnover,
          symbolSize: 8,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#26DAF8',
              shadowBlur: 8,
              shadowColor: '#26DAF8',
            },
          },
        };
        yAxisData.unshift(item.farmType);
        yAxisDataT.unshift(
          //   parseFloat((item.farmTurnover / 10000).toFixed(4)) + '万元',
          item.farmTurnover + '万元',
        );
        farmYearCountByTurnoverData.unshift(
          //   parseFloat((item.farmTurnover / 10000).toFixed(4)),
          item.farmTurnover,
        );
        markPointData.unshift(obj);
      });
      let chart = echarts.init(this.$refs.transactionAmount);
      this.globalBottomSecondChart = chart;
      let option = {
        color: ['#26DAF8'],
        grid: {
          top: '7%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          show: false,
        },
        yAxis: [
          //   {
          //     type: 'category',
          //     data: yAxisData,
          //     axisTick: {
          //       show: false,
          //     },
          //     axisLine: {
          //       show: false,
          //     },
          //     axisLabel: {
          //       interval: 0,
          //       formatter: value => {
          //         // return `{${value === '糯米山药' ? 'a' : 'b'}|${value}}`;
          //         return `{${'b'}|${value}}`;
          //       },
          //       rich: {
          //         a: {
          //           color: '#ffffff',
          //           fontSize: 14,
          //           // fontWeight: 800,
          //           textBorderColor: '#ffffff',
          //           textBorderWidth: 1,
          //           textBorderDashOffset: 20,
          //         },
          //         b: {
          //           color: '#fff',
          //           fontSize: 12,
          //           // fontWeight: 400,
          //         },
          //       },
          //       // rotate:40,//倾斜度
          //     },
          //   },
          {
            inverse: false,
            data: yAxisData,
            axisLabel: {
              padding: [12, 0, 30, -10],
              inside: true,
              textStyle: {
                fontSize: 12,
                fontFamily: 'PingFang SC',
                fontWeight: 400,
                color: '#CCEAFF',
                align: 'left',
                // textShadowColor: '#00d6ff',
                // textShadowOffsetX: 0,
                // textShadowOffsetY: 0,
                // textShadowBlur: 5,
              },
              formatter: value => {
                return `{${'b'}|${value}}`;
              },
              rich: {
                a: {
                  //   color: 'transparent',
                  color: '#fff',
                  lineHeight: 40,
                  fontSize: 14,
                },
              },
            },
            // offset: 0,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },

          //   {
          //     //左侧柱状图的Y轴
          //     gridIndex: 0, //y轴所在的 grid 的索引
          //     splitLine: 'none',
          //     axisTick: 'none',
          //     axisLine: 'none',
          //     data: yAxisData,
          //     inverse: false,
          //     axisLabel: {
          //       show: true,
          //       verticalAlign: 'bottom',
          //       align: 'right',
          //       padding: [0, 10, 18, 0],
          //       textStyle: {
          //         color: '#fff',
          //         fontSize: '12',
          //       },
          //       formatter: function(value) {
          //         return '{x|' + value + '}';
          //         // return '{x|' + value + '}  {y|' + '%}';
          //       },
          //       rich: {
          //         y: {
          //           color: '#3dffef',
          //           fontFamily: 'Orbitron',
          //           fontSize: 14,
          //         },
          //         x: {
          //           color: '#3dffef',
          //           fontFamily: 'Orbitron',
          //           fontSize: 14,
          //         },
          //       },
          //     },
          //   },

          {
            type: 'category',
            data: yAxisDataT,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: (value, index) => {
                return (value = '#27E0FD');
              },
              fontSize: 14,
              fontWeight: 400,
              fontFamily: 'YouSheBiaoTiHei-2',
              interval: 0,
              // rotate:40,//倾斜度
            },
          },
        ],
        series: [
          {
            type: 'bar',
            markPoint: {
              // symbol: 'pin',
              data: markPointData,
            },
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(255,255,255,0.1)',
            },
            barWidth: 6,
            data: farmYearCountByTurnoverData,
          },
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: data => {
            let res =
              data[0].marker + data[0].name + '：' + data[0].value + '万元';
            return res;
          },
          backgroundColor: 'rgba(3,3,3,0.5)',
          borderWidth: 0,
          textStyle: {
            color: '#ffffff',
            fontSize: '14',
          },
        },
      };
      this.$nextTick(() => {
        chart.setOption(option);
        chart.resize();
        if (!this.timer4) {
          let len = yAxisData.length;
          this.timer4 = setInterval(() => {
            if (len === 0) {
              len = yAxisData.length;
            }
            chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: len - 1,
            }); //设置默认选中高亮部分
            len--;
          }, 3000);
        }
      });
    },
    initLeftMiddleChart() {
      let farmCountData = [];
      let xAxisData = [];

      let source = [
        {
          farmCount: 10234,
          farmType: '金平湖',
          id: 1,
          year: 2021,
        },
        {
          farmCount: 4265,
          farmType: '蒲香农家',
          id: 2,
          year: 2021,
        },
        {
          farmCount: 3783,
          farmType: '十月稻田长粒香',
          id: 3,
          year: 2021,
        },
        {
          farmCount: 3013,
          farmType: '阳春大米',
          id: 4,
          year: 2021,
        },
        {
          farmCount: 2782,
          farmType: '南粳香',
          id: 5,
          year: 2021,
        },
        {
          farmCount: 1854,
          farmType: '虾香稻米',
          id: 6,
          year: 2021,
        },
      ];

      farmCountData = source.map(ele => {
        return ele.farmCount;
      });
      xAxisData = source.map(ele => {
        return ele.farmType;
      });

      let chart = echarts.init(this.$refs.produceTypeNum);
      this.globalLeftMiddleChart = chart;
      let option = {
        grid: {
          top: '15%',
          left: '3%',
          right: '2%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          data: xAxisData,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 129, 109,.1)',
              width: 1, //这里是为了突出显示加上的
            },
          },
          axisLabel: {
            formatter: value => {
              return `{${value === '糯米山药' ? 'a' : 'b'}|${value}}`;
            },
            rotate: 10,
            rich: {
              a: {
                color: '#ffffff',
                fontSize: 14,
                // fontWeight: 800,
                textBorderColor: '#ffffff',
                textBorderWidth: 1,
                textBorderDashOffset: 20,
              },
              b: {
                color: '#ffffff',
                fontSize: 10,
                // fontWeight: 400,
              },
            },
            interval: 0,
          },
        },
        yAxis: [
          {
            type: 'value',
            // name: "万元",
            // nameLocation: "end",
            // nameTextStyle: {
            //     padding: [0, 40, 0, 0],
            //     color: "#BAB5B5"
            // },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255, 129, 109, 0.1)',
                width: 1, //这里是为了突出显示加上的
              },
            },
            axisLabel: {
              textStyle: {
                color: '#999',
                fontSize: 14,
              },
            },
            splitArea: {
              areaStyle: {
                color: 'rgba(255,255,255,.5)',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#ffffff',
                opacity: 0.5,
              },
            },
          },
        ],
        dataZoom: {
          type: 'inside',
          minValueSpan: 5,
          maxValueSpan: 5,
        },
        series: [
          {
            type: 'pictorialBar',
            barCategoryGap: '0%',
            symbol:
              'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            barWidth: 40,
            label: {
              show: true,
              position: 'top',
              distance: 0,
              color: 'rgba(255,255,255,0.7)',
              //文字颜色
              fontSize: 16,
              fontWeight: 400,
              textShadowColor: '#000',
              textShadowBlur: 40,
              textShadowOffsetX: 3,
              textShadowOffsetY: 4,
              //   fontFamily: 'YouSheBiaoTiHei-2',
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(26, 74, 208, 0)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(26, 74, 208, 1)',
                    },
                  ],
                  global: false, //  缺省为  false
                },
              },
              emphasis: {
                opacity: 1,
              },
            },
            data: farmCountData,
          },
        ],
      };
      this.$nextTick(() => {
        chart.setOption(option);
        chart.resize();
        if (!this.timer1) {
          let len = 0;
          this.timer1 = setInterval(() => {
            if (len === xAxisData.length) {
              len = 0;
            }
            chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: len,
            }); //设置默认选中高亮部分
            len++;
          }, 3000);
        }
      });
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
        if (!this.timer3) {
          let len = 0;
          this.timer3 = setInterval(() => {
            if (len === countFarmSourceData.length) {
              len = 0;
            }
            countFarmSourceData.forEach((item, index) => {
              if (index !== len) {
                chart.dispatchAction({
                  type: 'downplay',
                  seriesIndex: 0,
                  dataIndex: index,
                });
              }
            });
            chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: len,
            }); //设置默认选中高亮部分

            chart.on('mouseover', function(e) {
              if (e.dataIndex != len) {
                countFarmSourceData.forEach((item, index) => {
                  chart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: index,
                  });
                });
                chart.dispatchAction({
                  type: 'highlight',
                  seriesIndex: 0,
                  dataIndex: e.dataIndex,
                });
              }
            });
            chart.on('mouseout', function(e) {
              countFarmSourceData.forEach((item, index) => {
                chart.dispatchAction({
                  type: 'downplay',
                  seriesIndex: 0,
                  dataIndex: index,
                });
              });
              chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: len,
              });
            });
            len++;
          }, 3000);
        }
      });
    },
    initLeftTopChart() {
      let marketQuantityOperatingData = [];
      let sourceData = [
        {
          areaName: '新埭镇',
          created: 1636341366000,
          id: 2,
          marketCount: 4,
          year: 2021,
        },
        {
          areaName: '新仓镇',
          created: 1636341366000,
          id: 1,
          marketCount: 2,
          year: 2021,
        },
        {
          areaName: '独山港镇',
          created: 1636341366000,
          id: 3,
          marketCount: 2,
          year: 2021,
        },
        {
          areaName: '广陈镇',
          created: 1636341366000,
          id: 7,
          marketCount: 3,
          year: 2021,
        },
        {
          areaName: '林埭镇',
          created: 1636341366000,
          id: 6,
          marketCount: 3,
          year: 2021,
        },
      ];
      marketQuantityOperatingData = sourceData.map(ele => {
        return {
          value: ele.marketCount,
          name: ele.areaName,
        };
      });
      let chart = echarts.init(this.$refs.marketQuantityOperating);
      this.globalLeftTopChart = chart;
      let option = {
        color: ['#71D964', '#3AE2FF', '#9680FF', '#DED92D', '#ED9D1A'],
        title: {
          text: '区域分布Top5',
          bottom: '-5px',
          left: 'center',
          textStyle: {
            fontSize: 16,
            color: '#FFFFFF',
            fontFamily: 'Source Han Sans SC',
            fontWeight: 400,
          },
        },
        series: [
          {
            name: '区域分布Top5',
            type: 'pie',
            radius: ['60%', '90%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            // itemStyle: {
            //     normal: {
            //         borderWidth: 1, // 间距的宽度
            //         borderColor: "#4D4D4A" ,//背景色
            //     }
            // },
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
              show: false,
            },
            data: marketQuantityOperatingData,
          },
        ],
      };
      this.$nextTick(() => {
        chart.setOption(option);
        chart.resize();
        if (!this.timer0) {
          let len = 0;
          // clearInterval(this.timer0);
          this.timer0 = setInterval(() => {
            if (len === marketQuantityOperatingData.length) {
              len = 0;
            }
            marketQuantityOperatingData.forEach((item, index) => {
              if (index !== len) {
                chart.dispatchAction({
                  type: 'downplay',
                  seriesIndex: 0,
                  dataIndex: index,
                });
              }
            });
            chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: len,
            }); //设置默认选中高亮部分

            chart.on('mouseover', function(e) {
              if (e.dataIndex != len) {
                marketQuantityOperatingData.forEach((item, index) => {
                  chart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: index,
                  });
                });
                chart.dispatchAction({
                  type: 'highlight',
                  seriesIndex: 0,
                  dataIndex: e.dataIndex,
                });
              }
            });

            chart.on('mouseout', function(e) {
              marketQuantityOperatingData.forEach((item, index) => {
                chart.dispatchAction({
                  type: 'downplay',
                  seriesIndex: 0,
                  dataIndex: index,
                });
              });
              chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: len,
              });
            });
            len++;
          }, 3000);
        }
      });
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
._value {
  font-size: 36px;
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  color: #65dcff;
  white-space: nowrap;
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
.seamless-warp {
  text-align: center;

  &.mainAgriCon {
    height: 170px;
    font-size: 14px;
  }

  // &.condition {
  //     height: 246px;
  // }

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
  background-image: url(https://img.hzanchu.com/acimg/4f56056b318de10e8a9c9715fb94c1ff.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.topCon {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 103px;
  width: 100%;
  background-image: url(https://img.hzanchu.com/acimg/155b7b84aa47ddff54104e58334367d2.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.globalGoback {
  position: absolute;
  z-index: 2;
  top: 51px;
  left: 24px;
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  .globalGobackIcon {
    height: 20px;
    width: 20px;
    background-image: url(https://img.hzanchu.com/acimg/c7f82fca2a19a93d3b5eef3ed2c1fa33.png);
    background-size: 100% 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .globalGobackText {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    margin-left: 6px;
  }
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
.emptyVideo {
  height: 77px;
  width: 143px;
  bottom: 0;
  left: 0;
  position: absolute;
  mix-blend-mode: screen;
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
  .firChild1TitleCon {
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
  .firChild1TitleBody {
    width: 408px;
    height: 32px;
    color: #fff;
    padding-left: 6px;
    font-size: 20px;
    line-height: 32px;
    margin-left: 11px;
  }
  .firChild1Content {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    align-items: flex-start;
    align-content: center;
    border: 2px solid rgba(41, 148, 255, 0.4);
    box-sizing: border-box;
    position: relative;
    height: 235px;
    // padding-top: 13px;
    padding-left: 32px;
    padding-right: 32px;
    box-sizing: border-box;
    .firChild1ConLeft {
      margin-top: 22px;
      margin-left: 20px;
      .firChild1ConLTop {
        position: relative;
        // height: 80px;
        height: 90px;
        width: 143px;
        margin-bottom: 12px;
      }
      .firChild1ConLBottom {
        position: relative;
        // height: 80px;
        height: 90px;
        width: 143px;
      }
      .firChild1ConLDescribe {
        font-size: 16px;
        color: #cceaff;
        text-align: center;
        line-height: 19px;
        margin-bottom: 8px;
      }
      .firChild1ConLNumber {
        font-size: 24px;
        font-family: YouSheBiaoTiHei-2;
        color: #27e0fd;
        text-align: center;
        line-height: 38px;
      }
    }
    .firChild1ConRight {
      //   flex: 1;
      height: 100%;
      padding-right: 30px;
    }
  }
}
.firChild3ChartOuter {
  width: 100%;
  height: 100%;
}
.firChild3ChartEchart {
  width: 100%;
  height: 100%;
}
.thiChild3ChartOuter {
  width: 100%;
  height: 100%;
}
.thiChild3ChartEchart {
  width: 100%;
  height: 100%;
}
.thiChild2ChartOuter {
  width: 100%;
  height: 100%;
}
.thiChild2ChartEchart {
  width: 100%;
  height: 100%;
}
.secChild1ChartOuter {
  width: 100%;
  height: 100%;
}
.secChild1ChartEchart {
  width: 100%;
  height: 100%;
  div {
    width: 100% !important;
    height: 100% !important;
  }
}
.thiChild1ChartOuter {
  width: 100%;
  height: 100%;
}
.thiChild1ChartEchart {
  width: 100%;
  height: 100%;
}
.firEchart {
  height: 200px;
  width: 160px;
}
.firChild2 {
  width: 926px;
  height: 284px;
  //   background-color: #fff;
  .firChild2TitleCon {
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
  .firChild2TitleBody {
    width: 881px;
    height: 32px;
    color: #fff;
    padding-left: 6px;
    font-size: 20px;
    line-height: 32px;
    margin-left: 11px;
  }
  .firChild2Content {
    position: relative;
    width: 100%;
    height: 235px;
    border: 2px solid rgba(41, 148, 255, 0.4);
    box-sizing: border-box;
    // padding-top: 53px;
    padding-left: 40px;
    padding-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    .firChild2DivideCon {
      padding: 32px;
      box-sizing: border-box;
      width: 260px;
      height: 130px;
      background-image: url(https://img.hzanchu.com/acimg/e57608e830e0cfbe391cfeb9901a96c8.png);
      background-size: 100% 100%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      .firChild2DivideTitle {
        font-size: 20px;
        color: #cceaff;
        line-height: 19px;
        margin-bottom: 12px;
      }
      .firChild2DivideNumber {
        font-size: 36px;
        font-family: YouSheBiaoTiHei-2;
        color: #27e0fd;
        line-height: 38px;
        // letter-spacing: 50px;
      }
      .firChild2DivideUnit {
        font-size: 16px;
        color: #90b6d2;
        line-height: 38px;
      }
    }
  }
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
.firChild3SmallContent {
  font-size: 12px;
}
.firChild3Content {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  align-items: flex-start;
  align-content: center;
  border: 2px solid rgba(41, 148, 255, 0.4);
  box-sizing: border-box;
  position: relative;
  height: 235px;
  // padding-top: 13px;
  // padding-left: 32px;
  // padding-right: 32px;
  box-sizing: border-box;
}
.withPadding {
  padding: 10px !important;
}
.removeTwoPadding {
  padding-top: 10px !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
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
.content {
  position: absolute;
  left: 24px;
  top: 103px;
  right: 24px;
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

.mainTitle {
}
</style>
