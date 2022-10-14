<template>
  <div class="center-viewer">
    <div class="map">
      <img src="../img/map-bg-2.png" alt="">
      <div ref="mapChart" class="map-chart"></div>
    </div>
    <div class="bottom">
      <div class="plate2">
        <Title text="近4年产量预估分析" />
        <div class="content">
          <div ref="bottom1Chart" class="bottom-chart"></div>
        </div>
      </div>
      <div class="plate3">
        <Title text="近7年气象灾害监测分析" />
        <div class="content">
          <div ref="bottom2Chart" class="bottom-chart"></div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="dialog" ref="dialog" v-show="visible">
        <div class="head">
          <div>
            <p>{{ farmInfo.name }}</p>
            <p>{{ farmInfo.intro ? farmInfo.intro.type : '--' }}</p>
          </div>
          <img src="../img/close.png" alt="" @click="visible = false">
        </div>
        <div class="item">
          <p>面积</p>
          <p>{{ farmInfo.intro ? farmInfo.intro.area : '--' }}</p>
        </div>
        <div class="item">
          <p>海拔</p>
          <p>{{ farmInfo.intro ? farmInfo.intro.altitude : '--' }}</p>
        </div>
        <div class="item">
          <p>坡度</p>
          <p>{{ farmInfo.intro ? farmInfo.intro.grade : '--' }}</p>
        </div>
        <div class="item">
          <p>农户</p>
          <p>{{ farmInfo.intro ? farmInfo.intro.farmer : '--' }}</p>
        </div>
        <div class="item">
          <p>负责人</p>
          <p>{{ farmInfo.intro ? farmInfo.intro.head : '--' }}</p>
        </div>
        <div class="item">
          <p>播种时间</p>
          <p>{{ farmInfo.intro ? farmInfo.intro.time : '--' }}</p>
        </div>
        <div class="item">
          <p>地址</p>
          <p>{{ farmInfo.intro ? farmInfo.intro.address : '--' }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Title from '../modules/Title.vue'
import * as echarts from 'echarts'
import { YEARS, MARKER_INFO } from '../consts'
import axios from 'axios'
import mapData from '@/assets/dashboard/pinghu.json'
export default {
  components: {
    Title
  },
  data() {
    return {
      bottom1Chart: null,
      bottom2Chart: null,
      mapChart: null,
      timer1: null,
      timer2: null,
      dialogTop: 0,
      dialogLeft: 0,
      visible: false,
      farmInfo: {},
      dialog: null
    }
  },
  mounted() {
    this.initMap();
    this.bottom1ChartInit();
    this.bottom2ChartInit();
  },
  methods: {
    initMap() {
      let myChart = echarts.init(this.$refs.mapChart);
      let options = {
        geo: {
          map: "PingHu",
          roam: false,
          selectedMode: false,
          zoom: 1.1,
          label: {
	            normal: {
	              show: true,
	              fontSize: 16,
	              color: "#fff"
	            }
	          },
	          itemStyle: {
	            normal: {
	             	borderColor: "#26B4FC",
                 borderWidth: 1,
	             	areaColor: "rgba(255,255,255,0)",//设置地图区域背景色
	            },
	            emphasis: {
                itemStyle: {
                  areaColor: "rgba(147,234,231,0.15)",
                  borderWidth: 2,
                  borderColor: "#26B4FC",
                },
                label: {
                  color: "#fff",
                },
              },
	          }
        },
        series: [
          {
            type: "map",
            mapType: "PingHu",
            selectedMode: false,
            zoom: 1.1,
            geoIndex: 0,
            label: {
              show: true,
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
            },
            itemStyle: {
              normal: {
                areaColor: "rgba(255,255,255,0)",
                borderWidth: 1,
                borderColor: "#26B4FC",
              },
            },
            emphasis: {
              itemStyle: {
                areaColor: "rgba(147,234,231,0.15)",
                borderWidth: 2,
                borderColor: "#26B4FC",
              },
              label: {
                color: "#fff",
              },
            },
          },
          {
            name: '企业分布', //红色标注
            type: 'custom',
            coordinateSystem: 'geo',
            clickable: true,
            data: []
          }
        ],
      };
      echarts.registerMap("PingHu", mapData);
      
      options.series[1].data = MARKER_INFO;
      if(MARKER_INFO.length > 0) {
        options.series[1].renderItem = function(params,api){
          return {
            type: 'image',
            name: 'aaa',
            style: {
              image: require('../img/marker.png'), //标注点图标
              width: 88,
              height: 94,
              x: api.coord([MARKER_INFO[params.dataIndex].value[0], MARKER_INFO[params.dataIndex].value[1]])[0],
              y: api.coord([MARKER_INFO[params.dataIndex].value[0], MARKER_INFO[params.dataIndex].value[1]])[1] - 30
            }
          }
        }
      }
      myChart.setOption(options);
      myChart.on('click', (params) => {
        console.log(params, 'params')
        if(params.seriesType == "custom") {
          this.top =
            (
              params.event.event.clientY / document.body.clientHeight -
              0.15
            ).toFixed(3) * 100;
          this.left =
            (
              params.event.event.clientX / document.body.clientWidth +
              0.01
            ).toFixed(3) * 100;
          this.$refs.dialog.style.position = 'absolute';
          this.$refs.dialog.style.top = this.top + '%';
          this.$refs.dialog.style.left = this.left + '%';
          MARKER_INFO.map(item => {
            if(item.name == params.name) {
              this.farmInfo = item
            }
          })
          this.visible = true;
        }
      })
    },
    bottom1ChartInit() {
      let myChart = echarts.init(this.$refs.bottom1Chart);
      myChart.hideLoading();
      let options = {
        color: ['#26B1F8', '#E5984E'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderWidth: 0,
          textStyle: {
              color: '#ffffff',
              fontSize: '14',
          },
          axisPointer: {
              type: 'shadow'
          },
        },
        legend: {
            data: ['预估产量', '实际产量'],
            textStyle:{
              color:"#90B6D2"
            }
        },
        grid: {
            right: '5%',
            top: '20%',
            bottom: '10%',
            left: '15%'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
                show: true,
                alignWithLabel: true,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#90B6D2'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255, 255, 255, 0.5)",
                }
            },
            data: YEARS.slice(3, 8)
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(吨)',
            alignTicks: true,
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 0.4
              }
            },
          }
        ],
        series: [
          {
            name: '预估产量',
            type: 'bar',
            data: [129690, 132845, 127656, 136698],
            barWidth: 20,
            itemStyle: {
                normal: {
                    barBorderRadius:[15,15,0,0],
                    color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                      offset: 0,
                      color: "#26B4FC"
                    },{
                      offset: 0.8,
                      color: "rgba(38, 180, 252, 0.1)"
                    }],false)
                }
            },
          },
          {
            name: '实际产量',
            type: 'bar',
            data: [127695, 129500, 125600, 133100],
            barWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: [15,15,0,0],
                color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                  offset: 0,
                  color: "#EF9E4E"
                },{
                  offset: 0.8,
                  color: "rgba(239, 158, 78, 0.1)"
                }],false)
              }
            },
          },
        ]
      }
      myChart.setOption(options);
      let len = 0
      clearInterval(this.timer1)
      this.timer1 = setInterval(() => {
        if (len === YEARS.slice(3, 8).length) {
            len = 0
        }
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: len,
        })
        len++
      }, 3800)
    },
    bottom2ChartInit() {
      let myChart = echarts.init(this.$refs.bottom2Chart);
      myChart.hideLoading();
      let options = {
        color: ['#8074FF', '#26B4FC', '#EF9E4E', ],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderWidth: 0,
          textStyle: {
              color: '#ffffff',
              fontSize: '14',
          },
          axisPointer: {
              type: 'shadow'
          },
        },
        legend: {
            data: ['预估产量', '实际产量', '减产率'],
            textStyle:{
              color: "#90B6D2"
            }
        },
        grid: {
            right: '10%',
            top: '20%',
            bottom: '10%',
            left: '15%'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
                show: true,
                alignWithLabel: true,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#90B6D2'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255, 255, 255, 0.5)",
                }
            },
            data: YEARS
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(吨)',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 0.4
              }
            },
          },
          {
            type: 'value',
            name: '(减产率.%)',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              color: '#90B6D2'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#90B6D2'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 0.4
              }
            },
          }
        ],
        series: [
          {
            name: '预估产量',
            type: 'bar',
            data: [138795, 138785, 139876, 139690, 139845, 147656, 146698],
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius:[3,3,0,0],
                    color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                      offset: 0,
                      color: "#26B4FC"
                    },{
                      offset: 0.8,
                      color: "rgba(38, 180, 252, 0.1)"
                    }],false)
                }
            },
          },
          {
            name: '实际产量',
            type: 'bar',
            data: [124696, 126573, 127881, 127695, 129500, 129500, 133100],
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [3,3,0,0],
                color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                  offset: 0,
                  color: "#EF9E4E"
                },{
                  offset: 0.8,
                  color: "rgba(239, 158, 78, 0.1)"
                }],false)
              }
            },
          },
          {
            name: '减产率',
            type: 'line',
            data: [10.16, 8.8, 8.58, 8.59, 7.4, 14.94, 9.27],
            symbol: "none", // 空心/实心
            yAxisIndex: 1,
            smooth: true,
            lineStyle: {
              shadowColor: '#000',
              shadowBlur: 5,
              shadowOffsetY: 2
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                  offset: 0,
                  color: "#8074FB"
                },{
                  offset: 0.8,
                  color: "rgba(128, 116, 251, .1)"
                }],false)
              }
            },
          },
        ]
      }
      myChart.setOption(options);
      let len = 0
      clearInterval(this.timer4)
      this.timer4 = setInterval(() => {
        if (len === YEARS.length) {
            len = 0
        }
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: len,
        })
        len++
      }, 3800)
    }
  }
}
</script>

<style scoped lang="scss">
  .center-viewer {
    width: 926px;
    overflow: hidden;
    margin-left: 20px;
  }
  .map {
    height: 579px;
    margin-top: 98px;
    position: relative;
    img {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: map_bg 3s infinite ease-in-out;
    }
    @keyframes map_bg {
      0% {
        width: 100%;
        opacity: 1;
      }
      50% {
        width: 80%;
        opacity: 0.5;
      }
      100% {
        width: 100%;
        opacity: 1;
      }
    }
    .map-chart {
      width: 100%;
      height: 100%;
      background: url('../img/map-bg.png') no-repeat 242px 30px;
      background-size: 48% 92%;
    }
  }
  .bottom {
    margin-top: 21px;
    display: flex;
    justify-content: space-between;
    .plate2 {
      width: 453px;
    }
    .plate3 {
      width: 453px;
    }
    .content {
      height: 259px;
      box-sizing: border-box;
      border: 1px solid rgba(41, 148, 255, 0.4);
      .bottom-chart {
        width: 100%;
        height: 100%;
      }
    }
  }

  .dialog {
    width: 308px;
    height: 308px;
    background: url('../img/dialog-bg.png') no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px 10px 20px 30px;
    transition: all .3s;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      img {
        width: 22px;
        margin-right: 10px;
        cursor: pointer;
      }
      div {
        p:nth-of-type(1) {
          font-size: 20px;
          font-family: PangMenZhengDao-Regular, PangMenZhengDao;
          color: #fff;
        }
        p:nth-of-type(2) {
          width: 70px;
          height: 27px;
          background: url('../img/type-bg.png') no-repeat;
          background-size: 100%;
          color: #fff;
          font-size: 14px;
          text-align: center;
          line-height: 27px;
          margin-top: 4px;
        }
      }
    }
    .item {
      display: flex;
      align-items: flex-start;
      font-size: 14px;
      margin-top: 8px;
      line-height: 18px;
      p:nth-of-type(1) {
        width: 68px;
        color: #6CD0FF;
      }
      p:nth-of-type(2) {
        width: 176px;
        color: #fff;
        margin-left: 10px;
      }
    }
  }
</style>