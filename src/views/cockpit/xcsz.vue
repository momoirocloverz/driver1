<template>
  <div id="outer" ref="shell" class="outer">
    <div ref="wrapper" class="wrapper">
      <div class="dashboard">
        <!--        <button class="toggle-full-screen" @click="toggleFullScreen">-->
        <!--          <img class="full-screen-toggle-icon" src="../../assets/fullscreen.png" alt="icon" width="24" height="24">-->
        <!--          <span>{{ fullScreenButtonText }}</span>-->
        <!--        </button>-->
        <div class="header">
          <!--          <a href="http://zrzy.phxmgl.cn/pinghu-web/index.html" class="header-link&#45;&#45;left">地域信息一张图</a>-->
          <span>乡村善治数字化</span>
          <!--          <a href="http://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjI5Nn0=" class="header-link&#45;&#45;right">数据资产</a>-->
        </div>
        <div class="left-content-section">
          <PointUsage
            class="div1"
            :data="pointUsage"
            :location="currentLocation"
            :location-name="currentLocationName"
          />
          <ArticleStats
            class="div2"
            :location="currentLocation"
            :location-name="currentLocationName"
          />
          <MostViewedArticles
            class="div3"
            :location="currentLocation"
            :location-name="currentLocationName"
          />
        </div>
        <div class="right-content-section">
          <ActivityChart
            class="div6"
            :location="currentLocation"
            :location-name="currentLocationName"
          />
          <CreditActivityChart
            class="div7"
            :registered-user-count="totalRegisteredUserCount"
          />
          <CollectiveBonuses
            class="div8"
            :location="currentLocation"
            :location-name="currentLocationName"
          />
        </div>
        <!--        <PointRewardProgram v-if="currentLocation.length === 1" class="div2" :location="currentLocation" :location-name="currentLocationName" />-->
        <!--        <ArticleStats v-else class="div2" :location="currentLocation" :location-name="currentLocationName" />-->
        <OverviewSection
          class="div4"
          :data="overviewData"
          :location-name="currentLocationName"
        />
        <LeafletMap
          :overview-data="overviewData"
          class="div5"
          :location-name="currentLocationName"
          :special-villages="this.specialVillages"
          @loc-change="currentLocation = $event"
          :showBottom="showBottom"
          @shutBottom="shutBotCon"
          :beSelectItem="beSelectItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PointUsage from '@/components/Dashboard/PointUsage';
import PointRewardProgram from '@/components/Dashboard/PointRewardProgram';
import MostViewedArticles from '@/components/Dashboard/MostViewedArticles';
import OverviewSection from '@/components/Dashboard/OverviewSection';
import ActivityChart from '@/components/Dashboard/ActivityChart';
import CreditActivityChart from '@/components/Dashboard/CreditActivityChart';
import CollectiveBonuses from '@/components/Dashboard/CollectiveBonuses';
import {
  Plus,
  Minus,
  Star,
  SingleStack,
  Gift,
  Transfer,
  Pie,
} from '@/components/Dashboard/icons';
// import Map from '@/components/Dashboard/Map'
import LeafletMap from '@/components/Dashboard/LeafletMap';
import * as api from '@/service/dashboard';
import _ from 'lodash';
import towns from '@/assets/dashboard/pinghu.json';
import villages from '@/assets/dashboard/points.json';
import ArticleStats from '@/components/Dashboard/ArticleStats';

export default {
  components: {
    ArticleStats,
    LeafletMap,
    CollectiveBonuses,
    CreditActivityChart,
    ActivityChart,
    OverviewSection,
    MostViewedArticles,
    PointRewardProgram,
    PointUsage,
  },
  data() {
    return {
      pointUsage: [
        { id: 1, label: '总积分', value: '-', unit: '分' },
        { id: 2, label: '总次数', value: '-', unit: '次' },
        { id: 3, label: '加分次数', value: '-', unit: '次' },
        { id: 4, label: '减分次数', value: '-', unit: '次' },
      ],
      totalRegisteredUserCount: 0,
      overviewData: [[], []],
      currentLocation: [1],
      inFullScreenMode: false,
      locationList: new Map(),
      showBottom: false,
      beSelectItem: {},
    };
  },
  computed: {
    icons() {
      return { Plus, Minus, Star, Gift, Transfer, Pie };
    },
    fullScreenButtonText() {
      return this.inFullScreenMode ? '退出全屏模式' : '进入全屏模式';
    },
    currentLocationName() {
      if (Array.isArray(this.currentLocation)) {
        if (this.currentLocation.length === 1) {
          return '';
        } else {
          const prefix = this.currentLocation.length === 2 ? 't' : 'v';
          if (prefix == 'v') {
            this.showBottom = true;
            this.beSelectItem = {
              id: this.currentLocation[this.currentLocation.length - 1],
              name: this.locationList.get(
                `${prefix}${_.last(this.currentLocation)}`,
              ),
            };
          }
          //   console.log(
          //     prefix,
          //     this.locationList,
          //     this.locationList.get(`${prefix}${_.last(this.currentLocation)}`),
          //   );
          return this.locationList.get(
            `${prefix}${_.last(this.currentLocation)}`,
          );
        }
      } else {
        return '';
      }
    },
    specialVillages() {
      if (this.currentLocation.length === 3) {
        return [this.currentLocationName];
      }
      return [];
    },
  },
  watch: {
    currentLocation(n, o) {
      // console.debug(`switching to ${JSON.stringify(n)}`)
      this.getData();
    },
  },
  mounted() {
    this.resize();
    // document.getElementById('outer').style.height = document.body.clientWidth * (1330 / 4560).toFixed(2) + 'px';
    this.getData();
    this.locationList.set('c1', '平湖市');
    towns.features.forEach(feat => {
      this.locationList.set(`t${feat.properties.id}`, feat.properties.name);
    });
    villages.features.forEach(feat => {
      this.locationList.set(
        `v${_.last(feat.properties.ids)}`,
        feat.properties.village,
      );
    });
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    shutBotCon() {
      this.showBottom = false;
    },
    // onLocationChange(v) {
    //   console.log(v)
    // },
    async getData() {
      const year = new Date().getFullYear();
      const currentLocation = this.currentLocation;
      Promise.all([
        api.getOverviewInfo(currentLocation, year),
        api.getNumberOfRegisteredFamilies(currentLocation, year),
        api.getNumberOfVillages(currentLocation, year),
        api.getAppCoverage(currentLocation, year),
        api.getNumberOfRegisteredUsers(currentLocation, year),
        api.getBonuses(currentLocation, 2020),
        api.getLoanAmount(currentLocation, year),
      ]).then(
        ([result1, result2, result3, result4, result5, result6, result7]) => {
          const { data } = result1;
          this.overviewData = [
            [
              result4.data,
              result2.data,
              result5.data,
              result6.data,
              result7.data,
            ],
            [
              result3.data,
              data.all_household,
              data.permanent_population,
              [data.share_dividends2020, data.bonus_points2020],
              data.integral_credit_coverage,
            ],
          ];
          if (currentLocation.length === 1) {
            this.totalRegisteredUserCount = result2.data[0];
          }
        },
      );
      api.getPointData(currentLocation).then(results => {
        this.pointUsage = [
          {
            id: 1,
            label: '总积分',
            value: results[0].data[0],
            unit: results[0].data[1],
          },
          {
            id: 2,
            label: '总次数',
            value: results[1].data[0],
            unit: results[1].data[1],
          },
          {
            id: 3,
            label: '加分次数',
            value: results[2].data[0],
            unit: results[2].data[1],
          },
          {
            id: 4,
            label: '减分次数',
            value: results[3].data[0],
            unit: results[3].data[1],
          },
        ];
      });
    },
    toggleFullScreen() {
      const elem = this.$refs.shell;
      if (this.inFullScreenMode) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          this.inFullScreenMode = false;
        }
      } else {
        const requestMethod =
          elem.requestFullScreen ||
          elem.webkitRequestFullScreen ||
          elem.mozRequestFullScreen ||
          elem.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(elem);
        } else if (typeof window.ActiveXObject !== 'undefined') {
          const wscript = new ActiveXObject('WScript.Shell');
          if (wscript !== null) {
            wscript.SendKeys('{F11}');
          }
        }
        this.inFullScreenMode = true;
      }
    },
    resize: _.debounce(
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

<style lang="scss" scoped>
  .outer {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    //padding: 21px;
  }
  .wrapper {
    background: url("../../assets/subsidies/bg.webp") no-repeat;
    background-size: 100% 100%;
    transform-origin: 0 0;
    box-sizing: border-box;
    width: 1920px;
    height: 1080px;
    padding: 20px;
    .toggle-full-screen {
      position: absolute;
      right: 0;
      margin: 20px;
      color: white;
      background: transparent;
      width: max-content;
      font-size: 24px;
      font-family: Microsoft YaHei;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      full-screen-toggle-icon {
        min-width: 18px;
        min-height: 18px;
      }
    }
  }
  .dashboard {
    display: grid;
    position: relative;
    gap: 10px;
    height: 1040px;
    overflow: hidden;
    grid-template:       "header header header" 84px
                         "left-1 mid-1 right-2" 170px
                         "left-1 mid-2 right-2" 1fr
                         "left-1 mid-2 right-2" calc(620px - 25px - 110px)
                         "left-1 mid-3 right-2" calc(25px + 110px) / minmax(0, 1fr) 840px minmax(0, 1fr);
  }
  .header {
    background: url('../../assets/subsidies/header-bg.webp') no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    full-screen-toggle-icon {
      min-width: 18px;
      min-height: 18px;
    }
  }
.dashboard {
  display: grid;
  position: relative;
  gap: 10px;
  height: 1040px;
  overflow: hidden;
  grid-template:
    'header header header' 84px
    'left-1 mid-1 right-2' 170px
    'left-1 mid-2 right-2' 1fr
    'left-1 mid-2 right-2' calc(620px - 25px - 110px)
    'left-1 mid-3 right-2' calc(25px + 110px) / minmax(0, 1fr) 840px minmax(0, 1fr);
}
.header {
  background: url('../../assets/subsidies/header-bg.webp') no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  grid-area: header;
  font-family: 'HuXiaoBo-NanShenTi2.0';
  span {
    flex: 1;
    text-align: center;
    font-size: 40px;
    background: linear-gradient(0deg, #b5f5ff 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 5px;
  }
  .header-link--left {
    width: 550px;
    color: white;
    font-size: 24px;
    letter-spacing: 5px;
    text-align: right;
    padding-bottom: 6px;
  }
  .header-link--right {
    width: 550px;
    color: white;
    font-size: 24px;
    letter-spacing: 5px;
    padding-bottom: 6px;
  }
}
%content-panel {
  //background: url("~@/assets/subsidies/border-right.webp");
  //background-size: 100% 100%;
  //border-image: url("~@/assets/subsidies/border-right.webp");
  //border-image-slice: 5% 10%;
  //border-image-width: 50px;
  //border-style: solid;
  box-sizing: border-box;
  border-radius: 5px;
}
.left-content-section {
  box-sizing: border-box;
  border-image: url('~@/assets/subsidies/border-right.webp');
  border-image-slice: 5% 5% 2% 5%;
  border-image-width: 30px;
  border-style: solid;
  grid-area: left-1;
  display: flex;
  flex-flow: column;
  padding-right: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-flow: column;
  row-gap: 10px;
}
.right-content-section {
  box-sizing: border-box;
  border-image: url('~@/assets/subsidies/border-right.webp');
  border-image-slice: 5% 5% 2% 5%;
  border-image-width: 30px;
  border-style: solid;
  grid-area: right-2;
  padding-right: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-flow: column;
  row-gap: 10px;
}

.div1 {
  @extend %content-panel;
}
.div2 {
  @extend %content-panel;
}
.div3 {
  @extend %content-panel;
}
.div4 {
  grid-area: mid-1;
}
.div5 {
  grid-area: mid-2;
}
.div6 {
  @extend %content-panel;
}
.div7 {
  @extend %content-panel;
}
.div8 {
  @extend %content-panel;
}
</style>
