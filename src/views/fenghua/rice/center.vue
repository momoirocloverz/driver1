<template>
  <div class="center">
    <div class="top">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="top-item"
        :style="index == 0 ? '' : 'margin-left: 30px'"
      >
        <img src="@/assets/image/fenghua/rice/center-top.png" class="bg">
        <div class="_num">
          <div class="_title">{{ item.title }}</div>
          <div class="_main">
            <countTo
              class="_value"
              :start-val="0"
              :end-val="item.num"
              :duration="1000"
              :decimals="item.decimals ? item.decimals : 0"
            />
            <span class="_unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="province" @click="provinceShow = !provinceShow">
      <img src="@/assets/image/fenghua/rice/address-icon.png">
      <div class="area">
        {{ curArea }}
      </div>
      <img
        :src="
          provinceShow
            ? require('@/assets/image/fenghua/rice/arrow-up.png')
            : require('@/assets/image/fenghua/rice/arrow-down.png')
        "
      >
    </div>

    <div v-show="provinceShow" class="province-show">
      <div
        v-for="(item, index) in provinceList"
        :key="index"
        class="province-left"
        @click="provinceSelect(-1)"
      >
        <div class="area">
          {{ item.text }}
        </div>
        <img
          :src="
            item.select
              ? require('@/assets/image/fenghua/rice/arrow-left.png')
              : ''
          "
        >
      </div>

      <div class="province-right">
        <div
          v-for="(item1, index1) in provinceList[0].children"
          :key="index1"
          @click="provinceSelect(index1)"
        >
          {{ item1.text }}
        </div>
      </div>
    </div>

    <iframe
      id="gisIframe"
      class="map"
      frameborder="0"
      align="center"
      src="/iframe/fenghua/FHJSC.html"
      border
    />

    <div class="range" @click="rangeShow = !rangeShow">
      <img
        :src="
          rangeShow
            ? require('@/assets/image/fenghua/rice/arrow-up.png')
            : require('@/assets/image/fenghua/rice/arrow-down.png')
        "
      >
      种植分布
    </div>

    <div v-show="rangeShow" class="range-show">
      <div class="total-show" @click="rangeShow = false">
        <img src="@/assets/image/fenghua/rice/arrow-up.png">
        种植分布
      </div>

      <div v-for="(item, index) in rangeList" :key="index" class="range-list">
        <div class="sub">
          <img
            :src="
              item.show
                ? require('@/assets/image/fenghua/rice/arrow-up.png')
                : require('@/assets/image/fenghua/rice/arrow-down.png')
            "
            @click="rangeSubShow(index)"
          >
          <div
            class="block"
            :style="'background-color: ' + item.color"
            @click="rangeSubShow(index)"
          />
          <div
            class="text"
            :style="item.has ? 'color: #fff' : 'color: #34C1FF'"
            @click="rangeSubShow(index)"
          >
            {{ item.text }}
          </div>
          <img
            :src="
              item.select
                ? require('@/assets/image/fenghua/rice/range-select.png')
                : require('@/assets/image/fenghua/rice/range-unselect.png')
            "
            @click="rangeSelectAll(item.select, index)"
          >
        </div>
        <div v-show="item.show" class="sub-item">
          <div
            v-for="(item1, index1) in item.children"
            :key="index1"
            :class="item1.select ? 'sub-item-select' : 'sub-item-unselect'"
          >
            {{ item1.text }}
            <img
              :src="
                item1.select
                  ? require('@/assets/image/fenghua/rice/range-select.png')
                  : require('@/assets/image/fenghua/rice/range-unselect.png')
              "
              @click="rangeSubSelect(item1.select, index, index1)"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="search-name">
      <input v-model="userName" placeholder="请输入搜索的名字">
      <img
        src="@/assets/image/fenghua/rice/search-icon.png"
        class="icon"
        @click="search"
      >
      <!-- <div class="text" @click="search">搜索</div> -->
    </div>

    <div v-if="mapObj.name" class="dialog1">
      <div class="title">
        <div class="left">
          <img src="@/assets/image/fenghua/rice/dialog-edit.png">
          种植详情
        </div>
        <img
          class="right"
          src="@/assets/image/fenghua/rice/dialog-close.png"
          @click="closeDialog(1)"
        >
      </div>

      <div class="main">
        <div class="sub-main">
          <div class="left">作物名称</div>
          <div class="right">{{ getMapObj }}</div>
        </div>
        <div class="sub-main">
          <div class="left">品种</div>
          <div class="right">{{ mapObj.pinzhong }}</div>
        </div>
        <div class="sub-main">
          <div class="left">产量</div>
          <div class="right">{{ mapObj.chanliang }}公斤</div>
        </div>
        <div class="sub-main">
          <div class="left">种植户</div>
          <div class="right">
            {{ mapObj.name
            }}<img
              src="@/assets/image/fenghua/rice/dialog-user.png"
              @click="showUserDetail"
            >
          </div>
        </div>
        <div class="sub-main">
          <div class="left">联系电话</div>
          <div class="right">{{ mapObj.tel }}</div>
        </div>
      </div>
    </div>

    <div v-if="userObj.name" class="dialog2">
      <div class="title">
        <div class="left">
          <img src="@/assets/image/fenghua/rice/dialog-edit.png">
          种植详情
        </div>
        <img
          class="right"
          src="@/assets/image/fenghua/rice/dialog-close.png"
          @click="closeDialog(2)"
        >
      </div>

      <div class="main">
        <div class="sub-main">
          <div class="left">种植户</div>
          <div class="right">
            {{ mapObj.name }}
            <img
              src="@/assets/image/fenghua/rice/search-icon.png"
              @click="searchAll"
            >
          </div>
        </div>
        <div class="sub-main">
          <div class="left">联系电话</div>
          <div class="right">{{ mapObj.tel }}</div>
        </div>
        <div class="sub-main">
          <div class="left">耕地面积</div>
          <div class="right">{{ mapObj.mu }}亩</div>
        </div>
        <div class="sub-main">
          <div class="left">产量</div>
          <div class="right">{{ mapObj.chanliang }}公斤</div>
        </div>
      </div>

      <div v-if="userObj.list" class="rank">
        <div class="rank-item">
          <div class="w-20">#</div>
          <div class="w-20">作物</div>
          <div class="w-30">产量</div>
          <div class="w-30">耕地面积</div>
        </div>
        <template v-for="(item, index) in userObj.list">
          <div v-if="item.cl > 0 || item.mu != '0.00'" :key="index" class="rank-item">
            <div class="w-20">NO.{{ index + 1 }}</div>
            <div class="w-20">{{ item.text }}</div>
            <div class="w-30">{{ item.cl }}公斤</div>
            <div class="w-30">{{ item.mu }}亩</div>
          </div>
        </template>
      </div>
    </div>

    <!-- <LeafletMap
      class="map"
      :disable="true"
      :overview-data="overviewData"
      :location-name="currentLocationName"
      :special-villages="specialVillages"
      @loc-change="currentLocation = $event"
    /> -->
  </div>
</template>

<script>
import countTo from 'vue-count-to'

import LeafletMap from '@/components/Dashboard/LeafletMap'
import _ from 'lodash'
import towns from '@/assets/dashboard/pinghu.json'
import villages from '@/assets/dashboard/points.json'
import { getAppCoverage } from '@/service/dashboard'
import { hxzb } from './data/data.js'
import { userWD, userZD, userXM, userYC } from './data/user.js'
import bus from '@/utils/bus.js'

export default {
  components: { LeafletMap, countTo },
  data() {
    return {
      list: [
        { title: '耕地面积', num: 0, unit: '万亩', decimals: 2 },
        { title: '粮食种植面积', num: 0, unit: '万亩', decimals: 2 },
        {
          title: '复耕指数',
          num: 0,
          unit: '%',
          decimals: 2
        },
        { title: '粮食总产量', num: 0, unit: '万公斤', decimals: 0 }
      ],

      rangeList: [
        {
          text: '油菜',
          select: true,
          has: true, // 表示是否选中过相关品种，只要选中过1个就算
          show: false,
          color: '#F59766',
          children: [
            { text: '油菜', select: true },
            { text: '油菜浙油51', select: true },
            { text: '油菜浙油64', select: true },
            { text: '油菜秦油二号', select: true }
          ]
        },
        {
          text: '早稻',
          select: true,
          has: true, // 表示是否选中过相关品种，只要选中过1个就算
          show: false,
          color: '#82F694',
          children: [
            { text: '甬仙15', select: true },
            { text: '甬仙16', select: true },
            { text: '甬籼15', select: true },
            { text: '甬籼69', select: true },
            { text: '矮优73', select: true }
          ]
        },
        {
          text: '小麦',
          select: true,
          has: true, // 表示是否选中过相关品种，只要选中过1个就算
          show: false,
          color: '#FFF399',
          children: [
            { text: '制种', select: true },
            { text: '扬麦12', select: true },
            { text: '扬麦20', select: true },
            { text: '扬麦28', select: true },
            { text: '金丰2号', select: true },
            { text: '金永2号', select: true }
          ]
        },
        {
          text: '晚稻',
          select: true,
          has: true, // 表示是否选中过相关品种，只要选中过1个就算
          show: false,
          color: '#E498FF',
          children: [
            { text: '中浙优1号', select: true },
            { text: '中浙优8号', select: true },
            { text: '制种', select: true },
            { text: '华浙优261', select: true },
            { text: '南梗9018', select: true },
            { text: '嘉丰优2号', select: true },
            { text: '宁81', select: true },
            { text: '宁84', select: true },
            { text: '宁88', select: true },
            { text: '岳林1号', select: true },
            { text: '旱稻', select: true },
            { text: '杂交制种', select: true },
            { text: '杂交稻制种', select: true },
            { text: '浙优1253', select: true },
            { text: '浙优18', select: true },
            { text: '甬优088号', select: true },
            { text: '甬优12', select: true },
            { text: '甬优15', select: true },
            { text: '甬优1538', select: true },
            { text: '甬优1540', select: true },
            { text: '甬优17', select: true },
            { text: '甬优1840号', select: true },
            { text: '甬优538', select: true },
            { text: '甬优7850', select: true },
            { text: '甬优7860', select: true },
            { text: '甬优8', select: true },
            { text: '甬优9号', select: true },
            { text: '矮优73', select: true },
            { text: '粳稻', select: true },
            { text: '香粳', select: true }
          ]
        }
      ], // 当前种植分布种类
      provinceList: [
        {
          text: '奉化区',
          select: true, // 当前select属性暂时用不到
          children: [
            { text: '锦屏街道', select: false },
            { text: '岳林街道', select: false },
            { text: '江口街道', select: false },
            { text: '西坞街道', select: false },
            { text: '萧王庙街道', select: false },
            { text: '方桥街道', select: false },
            { text: '溪口镇', select: false },
            { text: '尚田街道', select: false },
            { text: '莼湖街道', select: false },
            { text: '裘村镇', select: false },
            { text: '大堰镇', select: false },
            { text: '松岙镇', select: false }
          ]
        }
      ],
      provinceShow: false, // 是否展示当前身份
      // overviewData: [[[0]], []],
      overviewData: null,
      currentLocation: [1],
      locationList: new Map(),
      rangeShow: false, // 是否默认展示当前种植分布类型
      curArea: '奉化区',
      mapObj: {}, // 地图点击弹窗
      userObj: {}, // 用户弹窗对象
      userName: '' // 搜索当前对象的名字
    }
  },

  computed: {
    currentLocationName() {
      if (Array.isArray(this.currentLocation)) {
        if (this.currentLocation.length === 1) {
          return ''
        } else {
          const prefix = this.currentLocation.length === 2 ? 't' : 'v'
          return this.locationList.get(
            `${prefix}${_.last(this.currentLocation)}`
          )
        }
      } else {
        return ''
      }
    },
    specialVillages() {
      if (this.currentLocation.length === 3) {
        return [this.currentLocationName]
      }
      return []
    },
    getMapObj: function() {
      let title = '暂无信息'
      if (this.mapObj.type == 'WD') {
        title = '晚稻'
      } else if (this.mapObj.type == 'ZD') {
        title = '早稻'
      } else if (this.mapObj.type == 'XM') {
        title = '小麦'
      } else if (this.mapObj.type == 'YC') {
        title = '油菜'
      }
      return title
    }
  },
  watch: {
    currentLocation(n, o) {
      console.debug(
        `switching to ${JSON.stringify(n)} --- ${JSON.stringify(o)}`
      )
      console.log(this.locationList)
      this.$emit('changeTown', this.currentLocation)
      this.getVillage()
    }
  },
  mounted() {
    this.init('奉化区')
    if (window.addEventListener) {
      // 为window注册message事件并绑定监听函数
      window.addEventListener('message', this.receiveMsg, false)
    } else {
      window.attachEvent('message', this.receiveMsg)
    }
    // this.locationList.set("c1", "平湖市");
    // towns.features.forEach((feat) => {
    //   this.locationList.set(`t${feat.properties.id}`, feat.properties.name);
    // });
    // villages.features.forEach((feat) => {
    //   this.locationList.set(
    //     `v${_.last(feat.properties.ids)}`,
    //     feat.properties.village
    //   );
    // });
    // this.init();
  },
  destroyed() {},
  methods: {
    init: function(address) {
      // this.currentLocation
      for (const item of hxzb) {
        if (item.address == address) {
          this.list[0].num = parseFloat(parseFloat(item.gdmj) / 10000)
          this.list[1].num = parseFloat(parseFloat(item.lszzmj) / 10000)
          this.list[2].num = parseFloat(item.fgzs)
          if (address == '奉化区') {
            this.list[3].num = parseInt(parseFloat(item.lszcl) / 10000) // 当前单位万公斤
            this.list[3].decimals = 0
          } else {
            this.list[3].num = parseFloat(parseFloat(item.lszcl) / 10000) // 当前单位万公斤
            this.list[3].decimals = 2
          }
          break
        }
      }
    },
    // 请求当前行政村数量
    getVillage: function() {
      const date = new Date()
      const year = date.getFullYear() + ''
      getAppCoverage(this.currentLocation, year).then((res) => {
        // console.log(res)
        this.overviewData = [[[res.data[0]]], []]
      })
    },

    // 点击展示range-list sub子模块
    rangeSubShow: function(pos) {
      this.rangeList[pos].show = !this.rangeList[pos].show
    },
    // 点击选中range-list
    rangeSubSelect: function(select, pos, pos1) {
      // 如果当前是选中状态
      if (select) {
        this.rangeList[pos].children[pos1].select = false
        const list = this.rangeList[pos].children
        let isSelect = false
        for (const item of list) {
          if (item.select) {
            isSelect = true
            break
          }
        }
        if (isSelect) {
          this.rangeList[pos].has = true
        } else {
          this.rangeList[pos].has = false
        }
      } else {
        // 如果当前是非选中状态，那么直接取消选中即可
        this.rangeList[pos].children[pos1].select = true
        this.rangeList[pos].has = true
      }
      setTimeout(() => {
        this.dealRangeSelect(pos)
      }, 0)
    },

    // 点击全选种植分布
    rangeSelectAll: function(select, pos) {
      const children = this.rangeList[pos].children
      for (const item of children) {
        item.select = !select
      }
      this.rangeList[pos].select = !select
      this.rangeList[pos].has = !select
      setTimeout(() => {
        this.dealRangeSelect(pos)
      }, 0)
    },

    // 这里处理当前种植分布相关
    dealRangeSelect: function(pos) {
      const list1 = []
      const list2 = []
      const list3 = []
      const list4 = []
      for (const item of this.rangeList) {
        const children = item.children
        for (const item1 of children) {
          if (item1.select) {
            if (item.text == '晚稻') {
              list1.push(item1.text)
            }
            if (item.text == '早稻') {
              list2.push(item1.text)
            }
            if (item.text == '小麦') {
              list3.push(item1.text)
            }
            if (item.text == '油菜') {
              list4.push(item1.text)
            }
          }
        }
      }
      // console.log(pos, list2, list3, list4)
      if (pos == 3) {
        this.changeLayerByOption({
          layerName: '晚稻',
          typeArray: list1
        })
        // console.log(list1.length, this.rangeList[0].children.length)
        if (list1.length == this.rangeList[3].children.length) {
          this.rangeList[3].select = true
        } else {
          this.rangeList[3].select = false
        }
      }
      if (pos == 2) {
        this.changeLayerByOption({
          layerName: '小麦',
          typeArray: list3
        })
        if (list3.length == this.rangeList[2].children.length) {
          this.rangeList[2].select = true
        } else {
          this.rangeList[2].select = false
        }
      }
      if (pos == 1) {
        this.changeLayerByOption({
          layerName: '早稻',
          typeArray: list2
        })
        if (list2.length == this.rangeList[1].children.length) {
          this.rangeList[1].select = true
        } else {
          this.rangeList[1].select = false
        }
      }
      if (pos == 0) {
        this.changeLayerByOption({
          layerName: '油菜',
          typeArray: list4
        })
        if (list4.length == this.rangeList[0].children.length) {
          this.rangeList[0].select = true
        } else {
          this.rangeList[0].select = false
        }
      }
    },

    // 点击选择当前的地址
    provinceSelect: function(pos1) {
      const area =
        pos1 == -1 ? '奉化区' : this.provinceList[0].children[pos1].text
      this.curArea = area
      this.provinceShow = false
      this.init(area)
      this.changeAreaByName(area)
      bus.$emit('changeArea', area)
    },

    // 点击关闭当前第一个弹窗
    closeDialog: function(type) {
      if (type == 1) {
        this.mapObj = {}
        this.userObj = {}
        this.highLight()
        this.changeFeaturesByName('')
      } else if (type == 2) {
        this.userObj = {}
      }
    },

    // 点击展示当前用户详细信息
    showUserDetail: function() {
      this.userName = this.mapObj.name
      this.initUserDetail(this.mapObj.name)
    },

    // 搜索当前用户的全部地块
    searchAll: function() {
      this.changeFeaturesByName(this.mapObj.name)
      this.userObj = {}
      this.mapObj = {}
    },

    // 点击进行搜索
    search: function() {
      // console.log(this.userName)
      this.userObj = {}
      this.mapObj = {}
      this.highLight()
      this.changeFeaturesByName('')
      setTimeout(() => {
        this.changeFeaturesByName(this.userName)
      }, 150)
    },

    // 查询用户的具体亩数等
    initUserDetail: function(name) {
      if (!name) return
      const list = [
        { text: '晚稻', cl: 0, mu: 0 },
        { text: '早稻', cl: 0, mu: 0 },
        { text: '小麦', cl: 0, mu: 0 },
        { text: '油菜', cl: 0, mu: 0 }
      ]
      for (const item of userWD) {
        if (item.name == name) {
          list[0].cl += parseInt(item.chanliang)
          list[0].mu = parseFloat(item.mu)
        }
      }
      for (const item of userZD) {
        if (item.name == name) {
          list[1].cl += parseInt(item.chanliang)
          list[1].mu += parseFloat(item.mu)
        }
      }
      for (const item of userXM) {
        if (item.name == name) {
          list[2].cl += parseInt(item.chanliang)
          list[2].mu += parseFloat(item.mu).toFixed(2)
        }
      }
      for (const item of userYC) {
        if (item.name == name) {
          list[3].cl += parseInt(item.chanliang)
          list[3].mu += parseFloat(item.mu).toFixed(2)
        }
      }
      // console.log(list)
      setTimeout(() => {
        for (let index = 0; index < list.length; index++) {
          // console.log(index)
          for (let index1 = index; index1 < list.length; index1++) {
            if (parseFloat(list[index].mu) < parseFloat(list[index1].mu)) {
              const temp = list[index]
              list[index] = list[index1]
              list[index1] = temp
            }
          }
          list[index].mu = parseFloat(list[index].mu).toFixed(2)
        }
        this.userObj = this.mapObj
        this.userObj.list = list
        // console.log(list)
      }, 0)
    },

    /**
     * 根据人员名称精准修改要素样式
     * @param {String} name --> "卓和达"，无值传 ""
     */
    changeFeaturesByName: function(name) {
      const message = { key: 'changeFeaturesByName', value: { name: name }}
      this.sendMessage('gisLayerMessage', message)
    },
    /**
     * 根据配置信息修改图层
     * @option {Object} option 配置信息对象
     * @param {String} option.layerName --> 图层名称：晚稻、小麦、早稻、油菜
     * @param {Array.<String>} option.typeArray --> 类型数组：["中浙优1号","中浙优8号","制种","华浙优261","南梗9018",......]，无值传 []
     */
    changeLayerByOption: function({ layerName, typeArray }) {
      console.log(layerName, typeArray)
      const message = {
        key: 'changeLayerByOption',
        value: { option: { layerName, typeArray }}
      }
      this.sendMessage('gisLayerMessage', message)
    },
    /**
     * 取消高亮
     */
    highLight: function() {
      const message = { key: 'highLight', value: { highLight: false }}
      this.sendMessage('gisLayerMessage', message)
    },
    /**
     * 根据区划名称定位
     * @param {String} name
     */
    changeAreaByName: function(name) {
      const message = { key: 'changeAreaByName', value: { name: name }}
      this.sendMessage('gisLayerMessage', message)
    },

    // 监听函数，接收一个参数--Event事件对象
    receiveMsg: function(e) {
      const obj = e.data
      // 地图交互消息监听
      if (obj.type == 'gisMapMessage') {
        if (obj.data.key == 'initInfo' && obj.data.value) {
          // initType为true时，map初始化成功
          // console.log('initInfo交互---地图加载完成', obj.data.value.initType)
        }
      }
      // 要素消息交互
      if (obj.type == 'gisFeatureMessage') {
        if (obj.data.key == 'featureInfo' && obj.data.value) {
          // console.log(
          //   'featureInfo交互---要素消息交互',
          //   obj.data.value.featureInfo
          // )
          this.mapObj = obj.data.value.featureInfo
          this.mapObj.chanliang = parseFloat(
            obj.data.value.featureInfo.chanliang
          ).toFixed(2)
          this.mapObj.mu = parseFloat(obj.data.value.featureInfo.mu).toFixed(2)
          // console.log(this.mapObj)
        }
      }
    },

    // 发送消息
    sendMessage: function(type, data) {
      // 向子页面传递消息
      const iframe = document.getElementById('gisIframe')
      iframe.contentWindow.postMessage({ type: type, data: data }, '*')
    }
  }
}
</script>

<style scoped lang="scss">
.center {
  position: absolute;
  z-index: 1;
  top: 90px;
  left: 0;
  width: 1920px;
  height: 967px;
  overflow: hidden;

  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .top-item {
      position: relative;
      width: 181px;
      height: 116px;
      // padding-left: 10px;
      .bg {
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 0px;
        width: 181px;
        height: 116px;
      }
    }
  }

  .province {
    position: absolute;
    top: 160px;
    left: 28%;
    width: 180px;
    height: 38px;
    background-color: #143d89;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img:nth-of-type(1) {
      width: 16px;
      height: 20px;
      margin-left: 12px;
    }
    .area {
      width: 0;
      flex: 1;
      margin-right: 8px;
      margin-left: 8px;
      font-size: 20px;
      color: #34c1ff;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    img:nth-of-type(2) {
      width: 15px;
      height: 8px;
      margin-right: 12px;
    }
  }

  .province-show {
    position: absolute;
    top: 198px;
    left: 28%;
    display: flex;
    flex-direction: row;
    .province-left {
      width: 180px;
      height: 38px;
      background-color: #092c6f;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .area {
        width: 0;
        flex: 1;
        margin-left: 36px;
        margin-right: 8px;
        font-size: 16px;
        color: #34c1ff;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      img {
        width: 7px;
        height: 13px;
        margin-right: 12px;
      }
    }
    .province-right {
      width: 180px;
      background-color: #092c6f;
      opacity: 0;
      div {
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        color: #63b0ea;
        cursor: pointer;
      }
      div:hover {
        background-color: #143d89;
      }
    }
  }
  .province-show:hover {
    .province-right {
      opacity: 1;
    }
  }

  ._num {
    position: relative;
    z-index: 2;
    flex: 1;
    // margin-left: 11px;
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ._title {
      // max-width: 45px; // 暂时给一个45px宽度
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
    }

    ._main {
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      ._value {
        font-size: 30px;
        font-family: YouSheBiaoTiHei;
        color: #65dcff;
        white-space: nowrap;
      }
      ._unit {
        margin-left: 10px;
        margin-top: 6px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        color: #fff;
        white-space: nowrap;
      }
    }
  }

  .map {
    width: 94%;
    margin-top: 30px;
    margin-left: 3%;
    height: 780px;
  }

  .range {
    position: absolute;
    bottom: 91px;
    left: 28%;
    width: 138px;
    height: 38px;
    background-color: #1f4fa8;
    border-radius: 2px;
    font-size: 20px;
    color: #cbe7ff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 15px;
      height: 8px;
      margin-right: 8px;
    }
  }

  .range-show {
    position: absolute;
    bottom: 130px;
    left: 28%;
    width: 866px;
    border-radius: 2px;
    overflow: hidden;
    .total-show {
      width: 100%;
      height: 38px;
      background-color: #1f4fa8;
      font-size: 20px;
      color: #cbe7ff;
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      img {
        width: 15px;
        height: 8px;
        margin-left: 16px;
        margin-right: 9px;
        cursor: pointer;
      }
    }
    .range-list {
      width: 866px;
      .sub {
        width: 100%;
        height: 38px;
        background-color: #143d89;

        display: flex;
        flex-direction: row;
        align-items: center;
        .block {
          width: 16px;
          height: 16px;
          margin-left: 8px;
          margin-right: 8px;
          cursor: pointer;
        }
        .text {
          font-size: 20px;
          color: #ffffff;
          cursor: pointer;
        }
        img:nth-of-type(1) {
          width: 15px;
          height: 8px;
          margin-left: 38px;
          cursor: pointer;
        }
        img:nth-of-type(2) {
          width: 16px;
          height: 16px;
          margin-left: 16px;
          cursor: pointer;
        }
      }
      .sub-item {
        width: 100%;
        padding: 0 85px 13px 85px;
        box-sizing: border-box;
        background-color: #092c6f;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .sub-item-select {
          margin-top: 12px;
          margin-right: 24px;
          font-size: 16px;
          color: #ffffff;
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 16px;
            height: 16px;
            margin-left: 9px;
            cursor: pointer;
          }
        }

        .sub-item-unselect {
          margin-top: 12px;
          margin-right: 24px;
          font-size: 16px;
          color: #63b0ea;
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 16px;
            height: 16px;
            margin-left: 9px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .dialog1 {
    position: absolute;
    z-index: 3;
    top: 250px;
    left: 28%;
    width: 280px;
    background: linear-gradient(180deg, #114291 0%, #06297b 100%);
    border-top-right-radius: 30px;
    animation: _showDialog1 0.5s linear 1;
    overflow: hidden;
    .title {
      position: relative;
      width: 100%;
      height: 48px;
      background: linear-gradient(
        90deg,
        rgba(30, 81, 196, 0.8) 0%,
        rgba(52, 161, 255, 0) 100%
      );
      .left {
        width: 100%;
        height: 48px;
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 12px;
          height: 14px;
          margin-left: 16px;
          margin-right: 7px;
        }
      }
      .right {
        position: absolute;
        right: 0;
        top: 0;
        width: 48px;
        height: 48px;
        cursor: pointer;
      }
    }
    .main {
      width: 100%;
      padding: 0 0 18px 0;
      box-sizing: border-box;
      .sub-main {
        width: 100%;
        display: flex;
        flex-direction: row;
        .left {
          width: 30%;
          margin-top: 18px;
          text-align: right;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }
        .right {
          width: 0;
          flex: 1;
          margin-top: 18px;
          margin-left: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          opacity: 0.8;
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 14px;
            height: 14px;
            margin-left: 8px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .dialog2 {
    position: absolute;
    z-index: 3;
    top: 250px;
    left: calc(28% + 300px);
    width: 400px;
    background: linear-gradient(180deg, #114291 0%, #06297b 100%);
    border-top-right-radius: 30px;
    animation: _showDialog1 0.5s linear 1;
    overflow: hidden;
    .title {
      position: relative;
      width: 100%;
      height: 48px;
      background: linear-gradient(
        90deg,
        rgba(30, 81, 196, 0.8) 0%,
        rgba(52, 161, 255, 0) 100%
      );
      .left {
        width: 100%;
        height: 48px;
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 12px;
          height: 14px;
          margin-left: 16px;
          margin-right: 7px;
        }
      }
      .right {
        position: absolute;
        right: 0;
        top: 0;
        width: 48px;
        height: 48px;
        cursor: pointer;
      }
    }
    .main {
      width: 100%;
      padding: 0 0 18px 0;
      box-sizing: border-box;
      .sub-main {
        width: 100%;
        display: flex;
        flex-direction: row;
        .left {
          width: 30%;
          margin-top: 18px;
          text-align: right;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }
        .right {
          width: 0;
          flex: 1;
          margin-top: 18px;
          margin-left: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          opacity: 0.8;
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 14px;
            height: 14px;
            margin-left: 8px;
            cursor: pointer;
          }
        }
      }
    }
    .rank {
      width: 330px;
      margin-left: 40px;
      margin-bottom: 20px;
      padding: 0px 0px 15px 20px;
      box-sizing: border-box;
      background-color: rgba($color: #000000, $alpha: 0.1);
      font-size: 14px;
      font-family: HuXiaoBo-NanShen-Regular, HuXiaoBo-NanShen;
      color: #cbe7ff;
      .rank-item {
        width: 100%;
        padding-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .w-20 {
        width: 20%;
      }
      .w-30 {
        width: 30%;
      }
    }
  }

  @keyframes _showDialog1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .search-name {
    position: absolute;
    top: 160px;
    right: 28%;
    width: 180px;
    height: 38px;
    background-color: #143d89;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 9px;
      cursor: pointer;
    }
    input {
      width: 0;
      flex: 1;
      margin-left: 8px;
      margin-right: 8px;
      background: none;
      border: none;
      font-size: 14px;
      color: #5cc6ff;
    }
    input::placeholder {
      color: #1972cc;
    }
    .text {
      margin-right: 8px;
      font-size: 16px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
