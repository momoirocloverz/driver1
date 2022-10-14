<template>
  <div>
    <div class="scrollCon">
      <div class="leftCon" key="1">
        <el-row class="scrollHeader">
          <el-col :span="4">序号</el-col>
          <el-col :span="4">商品名称</el-col>
          <el-col :span="4">价格(元)</el-col>
          <el-col :span="4">平台</el-col>
          <el-col :span="8">订单时间</el-col>
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
            <el-col :span="4">
              <div class="centerCon">
                <div class="indexBg">{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :span="4">
              <!-- <div class="hidden">
                <MarqueeText> {{ item.goods_name }}</MarqueeText>               
              </div> -->
              <!-- <span class="hidden">{{ item.goods_name }}</span> -->
              <div class="hidden">
                <span v-if="item.goods_name.length < 5">{{
                  item.goods_name
                }}</span>
                <span class="animateItem" v-else>{{ item.goods_name }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <span> {{ item.total_amount }}</span>
            </el-col>
            <el-col :span="4">
              <span>{{ item.platform }} </span>
            </el-col>
            <el-col :span="8">
              <span>
                {{ item.order_time }}
              </span>
            </el-col>
          </el-row>
        </vue-seamless-scroll>
      </div>
      <!-- <div class="rightCon" key="2" v-else>
        <el-row class="scrollHeader">
          <el-col :span="4"><span class="opacityHidden">ads</span></el-col>
          <el-col :span="6">农产品</el-col>
          <el-col :span="6">价格信息(元/斤)</el-col>
          <el-col :span="8">日期</el-col>
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
            <el-col :span="4">
              <div class="centerCon">
                <div class="indexBg">{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <span>{{ item.price }}</span>
            </el-col>
            <el-col :span="6">
              <span>
                <span :class="[+item.last > 0 ? 'redArrow' : 'blueArrow']">
                  {{ Math.abs(+item.last) }}%</span
                >
              </span>
            </el-col>
            <el-col :span="8">
              <span>
                <span :class="[+item.compare > 0 ? 'redArrow' : 'blueArrow']">
                  {{ Math.abs(+item.compare) }}%</span
                >
              </span>
            </el-col>
          </el-row>
        </vue-seamless-scroll>
      </div> -->
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
import * as APIS from '@/service/dtapi';
import MarqueeText from 'vue-marquee-text-component';
export default {
  components: {
    vueSeamlessScroll,
    MarqueeText,
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
      trendCompData: [
        // {
        //   title: '金平湖',
        //   price: '7.4元/kg',
        //   last: '7',
        //   compare: '3',
        // },
      ],
      classOption: {
        singleHeight: 42,
        waitTime: 4000,
      },
      classInnerOption: {
        limitMoveNum: 2,
        direction: 2,
        step: 0.2,
      },
    };
  },
  mounted() {
    this.fetchLeft();
  },
  methods: {
    fetchLeft() {
      APIS.phTranList({})
        .then(res => {
          if (res.success) {
            this.trendCompData = res.data;
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    fetchRight() {
      APIS.phNbTranList({})
        .then(res => {
          if (res.success) {
            this.trendCompData = res.data;
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
.hidden {
  width: 80px;
  height: 42px;
  overflow: hidden;
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
.opacityHidden {
  opacity: 0;
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
.scrollCon {
  width: 100%;
  color: #fff;
  height: 200px;
}
.scrollHeader {
  text-align: center;
  height: 24px;
  font-size: 16px;
  color: #76b9fc;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.seamless-warp {
  text-align: center;

  &.mainAgriCon {
    height: 170px;
    font-size: 16px;
  }

  &.hrainAgriCon {
    width: 200px;
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
.normalScrollItemHeight {
  height: 42px;
  line-height: 42px;
  &:nth-child(odd) {
    background-color: rgba(25, 152, 248, 0.1);
  }
}
</style>
