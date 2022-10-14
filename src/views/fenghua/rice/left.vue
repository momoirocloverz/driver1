<template>
  <div :class="isHide ? 'left left-hide' : 'left left-show'">
    <div class="hide-left" @click="showHide">
      <img
        class="icon"
        :src="
          isHide
            ? require('@/assets/image/fenghua/rice/hide-left-icon.png')
            : require('@/assets/image/fenghua/rice/hide-right-icon.png')
        "
      >
      <div class="text">{{ isHide ? "展开左侧" : "收起左侧" }}</div>
    </div>
    <left-1 :location="location" />
    <left-2 :location="location" :location-name="locationName" />
    <left-3 />
  </div>
</template>

<script>
import Left1 from './components/left/left1.vue'
import Left2 from './components/left/left2.vue'
import Left3 from './components/left/left3.vue'
import _ from 'lodash'
import towns from '@/assets/dashboard/pinghu.json'
import villages from '@/assets/dashboard/points.json'
export default {
  components: { Left1, Left2, Left3 },
  props: {
    location: {
      type: Array,
      default: () => [1]
    }
  },
  data() {
    return {
      locationList: new Map(),
      isHide: false // 是否隐藏
    }
  },
  computed: {
    locationName() {
      if (Array.isArray(this.location)) {
        if (this.location.length === 1) {
          return ''
        } else {
          const prefix = this.location.length === 2 ? 't' : 'v'
          // console.log(prefix, this.locationList, this.locationList.get(`${prefix}${_.last(this.location)}`))
          return this.locationList.get(`${prefix}${_.last(this.location)}`)
        }
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.locationList.set('c1', '平湖市')
    towns.features.forEach((feat) => {
      this.locationList.set(`t${feat.properties.id}`, feat.properties.name)
    })
    villages.features.forEach((feat) => {
      this.locationList.set(
        `v${_.last(feat.properties.ids)}`,
        feat.properties.village
      )
    })
    // console.log(this.locationList)
  },
  destroyed() {},
  methods: {
    showHide: function() {
      this.isHide = !this.isHide
    }
  }
}
</script>

<style scoped lang="scss">
.left {
  position: relative;
  z-index: 3;
  width: 25.88%;
  height: 967px;
  margin-left: 11px;
  background: url("~@/assets/image/fenghua/rice/left-bg.png") no-repeat;
  background-size: 100% 100%;
  background-color: rgba(26, 60, 114, 0.5);
  // overflow: hidden;

  .hide-left {
    position: fixed;
    z-index: 10;
    left: 0px;
    top: 50px;
    width: 26px;
    height: 105px;
    background: url("~@/assets/image/fenghua/rice/hide-left-s.png") no-repeat;
    background-size: 100%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon {
      width: 16px;
      height: 16px;
    }
    .text {
      width: 0px;
      height: 0px;
      opacity: 0;
    }
  }
  .hide-left:hover {
    top: 37px;
    width: 65px;
    height: 131px;
    background: url("~@/assets/image/fenghua/rice/hide-left-l.png") no-repeat;
    background-size: 100%;
    background-size: cover;
    animation: _hide-left 200ms ease-in 1;
    .icon {
      width: 16px;
      height: 16px;
      animation: _hide-left-icon 1000ms ease-in infinite;
    }
    .text {
      width: 20px;
      height: auto;
      margin-top: 4px;
      font-size: 14px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 18px;
      writing-mode: lr-tb;
      opacity: 1;
    }
  }
  @keyframes _hide-left {
    0% {
      left: -10px;
    }
    100% {
      left: 0px;
    }
  }
  @keyframes _hide-left-icon {
    0% {
      margin-left: 0px;
    }
    25% {
      margin-left: -10px;
    }
    50% {
      margin-left: 0px;
    }
    75% {
      margin-left: 10px;
    }
    100% {
      margin-left: 0px;
    }
  }
}

.left-hide {
  margin-left: calc(-25.88% + 11px);
  animation: _left-hide 400ms linear 1;
}

.left-show {
  animation: _left-show 400ms linear 1;
}
@keyframes _left-hide {
  0% {
    margin-left: 11px;
  }
  100% {
    margin-left: calc(-25.88% + 11px);
  }
}
@keyframes _left-show {
  0% {
    margin-left: calc(-25.88% + 11px);
  }
  100% {
    margin-left: 11px;
  }
}
</style>
