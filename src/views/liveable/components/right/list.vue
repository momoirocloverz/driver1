<template>
  <div class="_list">
    <div class="_top">
      <div class="w-25">排名</div>
      <div class="w-25">街道镇</div>
      <div class="w-25">平均分</div>
      <div class="w-25">较上年排名变化</div>
    </div>

    <div class="_line"><div /></div>

    <div
      v-if="list.length > 0 && isLoad"
      class="_item-main"
      :style="
        '--scroll: ' +
          (total - 2 > 0 ? total - 2 : 0) +
          ';--time: ' +
          (total - 2 > 0 ? total - 2 : 0)
      "
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="index == 0 ? '_item _item-select ' : '_item '"
      >
        <div class="rank">
          <img
            src="https://img.hzanchu.com/acimg/44fd795990796c7f59fdc96a669b242d.png"
          >
          <div>{{ index + 1 }}</div>
        </div>
        <div class="w-25">{{ item.street }}</div>
        <div class="w-25">{{ item.average }}</div>
        <div class="w-25">
          <span
            class="change"
            :style="'color: ' + (item.targ >= 0 ? '#5CE68C' : '#FA5D6F')"
          >{{
            item.targ == 0 ? "持平" : item.targ > 0 ? "上升" : "下降"
          }}</span>{{ item.YoY }}
        </div>
      </div>
    </div>

    <div v-else class="_item-main flex-ajc">
      <img src="https://img.hzanchu.com/acimg/7ca7c3d2f5367f2e7789bfc20ee4a8e8.png" class="_empty">
      <div class="_empty-title">暂无数据</div>
    </div>
  </div>
</template>

<script>
import * as api from '@/service/liveable'
export default {
  props: {
    quarter: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      list: [],
      total: 1,
      isLoad: false
    }
  },
  watch: {
    quarter(newQuarter) {
      this.reload(newQuarter)
    }
  },
  mounted() {},
  methods: {
    // 重新加载数据
    reload: function(quarter) {
      const year = new Date().getFullYear()
      this.isLoad = false
      api
        .livableProfessionalUniverseInspection({
          quarter,
          year: parseInt(year),
          app_id: '4473180',
          app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO'
        })
        .then((e) => {
          console.log(e)
          if (e.code === 0) {
            this.list = e.data
            this.total = e.data.length
            this.isLoad = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
._list {
  width: 100%;
  margin-top: 16px;

  .w-30 {
    width: 30%;
  }
  .w-25 {
    width: 25%;
  }
  .w-20 {
    width: 20%;
  }

  ._top {
    width: 100%;
    padding: 0 43px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    div {
      // height: 36px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 600;
      color: #5fafff;
    }
  }

  ._line {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    div {
      width: 100%;
      height: 2px;
      margin-top: 16px;
      background-color: #fff;
      opacity: 0.24;
    }
  }

  .flex-ajc{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  ._item-main {
    width: 100%;
    height: 152px;
    margin-top: 10px;
    padding: 0 30px;
    box-sizing: border-box;
    overflow: hidden;

    ._empty{
      width: 130px;
      height: 140px;
    }

    ._empty-title{
      margin-top: -20px;
      font-size: 18px;
      color: #BBD7FA;
    }
    ._item {
      width: 100%;
      height: 36px;
      margin-bottom: 2px;
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      color: #fff;

      animation: move calc(var(--time) * 4s) linear infinite normal;
      animation-fill-mode: forwards;

      .rank {
        position: relative;
        width: 25%;
        img {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 63px;
          height: 36px;
        }
        div {
          width: 54px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-size: 18px;
          color: #fff;
          text-shadow: 0px 5px 19px #259bff;
        }
      }

      .change {
        margin-right: 10px;
      }
    }

    @keyframes move {
      0% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(calc(var(--scroll) * -36px));
      }
    }

    ._item-select {
      background-color: rgba(95, 175, 249, 0.16);
    }

    ._item:hover {
      background-color: rgba(95, 175, 249, 0.16);
      //   animation-play-state: paused;
      //   -webkit-animation-play-state: paused;
    }
  }
}
</style>
