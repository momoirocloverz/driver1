<template>
  <div class="_left1-item">
    <div class="_target">
      <div class="_target-title">{{ title }}</div>
      <div class="_target-value">
        {{ value }}
        <span>{{ unit }}</span>
      </div>
    </div>
    <div class="_progress">
      <div class="_progress-title">{{ percent }}%</div>

      <div class="_progress-percent">
        <div class="_progress-top">
          <div v-for="(item, index) in percentList" :key="index" />
        </div>
        <div
          class="_progress-bottom"
          :style="'--percent: ' + percent + '%;width: ' + percent + '%'"
        />
      </div>
    </div>
    <div class="_result">
      <img
        :src="
          status == '正常'
            ? require('@/assets/image/fenghua/rice/left1-normal.png')
            : require('@/assets/image/fenghua/rice/left1-error.png')
        "
      >
      <div :class="status == '正常' ? 'normal' : 'error'">
        {{ status }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    percent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      percentList: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
._left1-item {
  width: 100%;
  margin-top: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  ._target {
    width: 146px;
    ._target-title {
      font-size: 16px;
      font-family: MicrosoftYaHei-, MicrosoftYaHei;
      color: #ffffff;
    }
    ._target-value {
      margin-top: 5px;
      font-size: 24px;
      font-family: HuXiaoBo-NanShen-Regular, HuXiaoBo-NanShen;
      color: #26e3ff;
      text-shadow: 0px 0px 6px rgba(16, 237, 255, 0.5019607843137255);
      span {
        font-size: 12px;
      }
    }
  }
  ._progress {
    width: 166px;
    margin-left: 20px;

    ._progress-title {
      width: 100%;
      font-size: 12px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      text-align: right;
      color: #ffffff;
    }

    ._progress-percent {
      position: relative;
      width: 160px;
      height: 16px;
      margin-top: 8px;
      ._progress-top {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 16px;
        background-color: transparent;
        display: flex;
        flex-direction: row;
        div:nth-of-type(even) {
          width: 2px;
          height: 16px;
          background-color: RGBA(15, 41, 94, 1);
        }
        div:nth-of-type(odd) {
          width: 8px;
          height: 16px;
          background-color: transparent;
        }
      }
      ._progress-bottom {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 16px;
        background: linear-gradient(
          to left,
          rgba(0, 109, 255, 1),
          rgba(52, 232, 255, 1)
        );
        animation: _progress 600ms linear 1 normal;
      }
    }
  }
  ._result {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 18px;
      height: 18px;
    }

    .normal {
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      color: #34e8ff;
    }
    .error {
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      color: #ff3c3b;
      text-shadow: 0px 0px 4px #ff5555;
    }
  }
}

@keyframes _progress {
  0% {
    width: 0%;
  }
  100% {
    width: var(--percent);
  }
}
</style>
