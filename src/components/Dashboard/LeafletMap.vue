<template>
  <div
    class="container leaffletMapCon"
    :style="{ '--text-size-scale': textScale }"
  >
    <div ref="map" class="map" />
    <button v-if="showReset" class="reset-btn" round @click="reset">
      返回
    </button>
    <div v-if="!disable" class="legend-box">
      <div class="legend-item">
        <span class="color-block" />覆盖行政村：{{ villageNumber }}村
      </div>
    </div>
    <div class="bottomCon" v-if="showBottom">
      <i class="el-icon-close shutIcon" @click="shutDown"></i>
      <div class="leftPart">
        <div class="headBack">
          <div>{{ current.name1 }}</div>
        </div>
        <div class="leftListCon">
          <el-row class="scrollHeader">
            <el-col :span="5">排名</el-col>
            <el-col :span="11">村户</el-col>
            <el-col :span="8">积分</el-col>
          </el-row>
          <div class="splitLineLeft"></div>
          <div class="leftListNextCon" v-loading="load1ing">
            <el-row
              v-for="(item, index) in leftArray"
              :key="index"
              :class="[
                'normalScrollItemHeight',
                active1 == index ? 'activeBg' : '',
              ]"
              @click.native="checkActive1Action(index, item)"
            >
              <el-col :span="5">
                <div class="commonCountBg">
                  {{ index + pageSize * (currentPage - 1) + 1 }}
                </div>
              </el-col>
              <el-col :span="11">
                <div class="markCon" :title="item.owner_name">
                  {{ item.owner_name || '-' }}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="">{{ item.this_year_integral || '-' }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="pagCon" v-if="total">
            <el-pagination
              small
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="total,prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
      <div class="rightPart">
        <div class="headBack">
          <div>{{ current.name2 }}</div>
        </div>
        <div class="rightListCon">
          <el-row class="scrollHeader">
            <el-col :span="9">打分项</el-col>
            <el-col :span="4">分数</el-col>
            <el-col :span="6">备注</el-col>
            <el-col :span="5"><span class="padingRight8">图片</span></el-col>
          </el-row>
          <div class="splitLineRight"></div>
          <div class="rightListNextCon" v-loading="load1ing">
            <el-row
              v-for="(item, index) in rightArray"
              :key="index"
              :class="[
                'normalScrollItemHeight',
                active2 == index ? 'activeBg' : '',
              ]"
              @click.native="checkActive2Action(index)"
            >
              <el-col :span="9" class="markCon" :title="item.item_name">{{
                item.item_name || '-'
              }}</el-col>
              <el-col :span="4">
                <div class="">
                  {{ item.direction == 'DECREASE' ? '-' : '' }}
                  {{ item.integral }}
                </div>
              </el-col>
              <el-col :span="6">
                <div class="markCon" :title="item.remark">
                  {{ item.remark || '-' }}
                </div>
              </el-col>
              <el-col :span="5">
                <div
                  class="thumbImgCon"
                  :style="{ backgroundImage: 'url(' + item.image_url + ')' }"
                  @click="show(0, [item.image_url])"
                ></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <viewer
      :images="images"
      :options="options"
      @inited="inited"
      class="viewer"
      ref="viewer"
      v-show="false"
    >
      <img v-for="(src, index) in images" :src="src" :key="index" />
    </viewer>
  </div>
</template>
<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapData from '@/assets/dashboard/pinghu.json';
import villages from '@/assets/dashboard/points.json';
import '@/assets/js/leaflet-plugin';
import { isEqual } from 'lodash';
import 'viewerjs/dist/viewer.css';
import { component as Viewer } from 'v-viewer';
import {
  livableProfessionalIntegral,
  livableProfessionalInteFamily,
} from '@/service/liveable';
export default {
  name: 'LeafletMap',
  components: {
    Viewer,
  },
  props: {
    beSelectItem: {
      type: Object,
      default: () => {},
    },
    shutBottom: {
      type: Function,
      default: () => {},
    },
    onLocationChange: {
      type: Function,
      default: () => {},
    },
    specialVillages: {
      type: Array,
      default: () => [],
    },
    locationName: {
      type: String,
      default: '',
    },
    textScale: {
      type: Number,
      default: 1,
    },
    markerScale: {
      type: Number,
      default: 1,
    },
    // { icon, size: [x, y] }, 如果存在用这个icon展示地区点而不是circleMarker
    markerIcon: {
      type: Object,
      default: () => {},
    },
    overviewData: {
      type: Array,
      default: () => [[], []],
    },
    // 2022-03-31新增、主要原因是平湖农村宜居宜业（平湖数字乡村驾驶舱）中间调用了当前地图组件，要求是不要下钻等调整
    // 所以新增了当前disable字段，用于区分是否需要下钻、是否需要展示行政村，默认为false，表示可以点击下钻和展示覆盖行政村
    // 是否禁用地图内的下钻、覆盖行政村等内容（暂时用一个参数控制）
    disable: {
      type: Boolean,
      default: false,
    },
    showBottom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      map: null,
      mapLayers: [],
      center: [30.724719628231817, 121.10023498535158],
      zoom: 11.8,
      showReset: false,
      towns: new Map(),
      specialMarkers: [],
      markerDict: new Map(),
      debugMode: false,
      leftArray: [],
      rightArray: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      active1: 0,
      active2: 0,
      current: {
        name1: '',
        name2: '家庭',
        family_id: '',
      },
      load1ing: false,
      images: [],
      options: {
        initialViewIndex: 0,
        navbar:0,
        title:0,
        toolbar:0,
      },
    };
  },
  computed: {
    villageNumber() {
      return this.overviewData?.[0]?.[0]?.[0] || '-';
    },
  },
  watch: {
    specialVillages(newValue, oldValue) {
      if (!isEqual(newValue, oldValue)) {
        if (this.markerIcon?.icon) {
          this.setSpecialVillageIcons(newValue);
        } else {
          this.mapLayers[1].resetStyle();
        }
      }
    },
    beSelectItem(nval, val) {
      if (this.beSelectItem.id) {
        this.currentPage = 1;
        this.active1 = 0;
        this.active2 = 0;
        this.current.name1 = this.beSelectItem.name;
        this.fetchLeft();
      }
    },
  },
  mounted() {
    const map = L.map(this.$refs.map, {
      zoomControl: false,
      attributionControl: false,
      zoomDelta: 0.5,
      zoomSnap: 0.1,
      zoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      maxBounds: [
        [30.86097373272608, 120.89767456054689],
        [30.53151083364524, 121.30554199218751],
      ],
    });
    map.scrollWheelZoom.disable();
    map.setView(this.center, this.zoom);
    this.map = map;
    mapData.features.forEach(feat => {
      this.towns.set(feat.properties.id, feat.properties.name);
    });
    // map.on('click', e => console.log(e.latlng))
    // L.imageOverlay('https://img.hzanchu.com/acimg/7ad60ae3a6b6429c90b1a00dc7f4a114.png', overlayBound).addTo(map)
    this.reset();
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show(index, item) {
      this.options.initialViewIndex = index;
      this.images = item;
      setTimeout(() => {
        this.$viewer.show();
      }, 300);
    },
    fetchLeft() {
      this.leftArray = [];
      this.current.name2 = '家庭';
      this.rightArray = [];
      this.total = 0;
      this.load1ing = true;
      livableProfessionalIntegral({
        village_name: this.beSelectItem.name,
        village_id: this.beSelectItem.id,
        app_id: '4473180',
        app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO',
        page: this.currentPage,
        page_size: this.pageSize,
      })
        .then(res => {
          if (res && res.code == 0) {
            this.leftArray = res.data.data;
            this.current.name2 = res.data.data[0].owner_name;
            this.current.family_id = res.data.data[0].family_id;
            this.total = res.data.total;
            this.$forceUpdate();
            this.fetchRight();
          }
        })
        .catch(err => {
          console.log('err', err);
        })
        .finally(() => {
          this.load1ing = false;
        });
    },
    fetchRight() {
      this.rightArray = [];
      livableProfessionalInteFamily({
        family_id: this.current.family_id,
        app_id: '4473180',
        app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO',
      })
        .then(res => {
          if (res && res.code == 0) {
            this.rightArray = res.data;
            this.$forceUpdate();
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },

    checkActive1Action(index, item) {
      this.active1 = index;
      this.active2 = 0;
      this.current.name2 = item.owner_name;
      this.current.family_id = item.family_id;
      this.fetchRight();
    },
    checkActive2Action(index) {
      this.active2 = index;
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      this.active1 = 0;
      this.active2 = 0;
      this.fetchLeft();
    },
    shutDown() {
      this.$emit('shutBottom');
      this.currentPage = 1;
    },
    clearSpecialMarkers() {
      if (this.specialMarkers.length > 0) {
        this.specialMarkers.forEach(marker => {
          marker.setIcon(
            L.icon({
              iconUrl: this.markerIcon.icon,
              iconSize: this.markerIcon.size.map(d => d * this.markerScale),
              className:
                !marker.feature.properties.wasteSystemName && 'missing',
            }),
          );
        });
        this.specialMarkers = [];
      }
    },
    clearLayers() {
      this.mapLayers.forEach(layer => {
        layer.off();
        layer.removeFrom(this.map);
      });
      this.clearSpecialMarkers();
      this.markerDict.clear();
    },
    reset() {
      this.clearLayers();
      const labelGroup = L.layerGroup();
      const borderLayer = L.geoJSON(mapData, {
        fill: 'url(/texture.jpg)',
        style: function(feature) {
          return {
            color: '#0DD7FF',
            weight: 2,
            fillOpacity: 0.7,
            fillColor: 'transparent',
          };
        },
        onEachFeature: (feature, layer) => {
          const center = layer.getBounds().getCenter();
          labelGroup.addLayer(
            L.marker([center.lat, center.lng], {
              icon: new L.DivIcon({
                // className: 'leaflet-map-text-marker',
                className: 'map-marker',
                html: `<div class="leaflet-map-text-marker">${feature.properties.name}</div>`,
              }),
              interactive: false,
              pane: 'popupPane',
            }),
          );
        },
      }).addTo(this.map);
      // 这里暂时控制部不点击操作
      if (!this.disable) {
        borderLayer.on('click', e => {
          this.focus(e.sourceTarget.feature.properties.id);
          // this.onLocationChange([1, e.sourceTarget.feature.properties.id])
          this.$emit('loc-change', [1, e.sourceTarget.feature.properties.id]);
        });
      }
      const markerLayer = L.geoJSON(villages, {
        pointToLayer: (feature, latlng) => {
          if (this.markerIcon?.icon) {
            const icon = L.icon({
              iconUrl: this.markerIcon.icon,
              iconSize: this.markerIcon.size.map(d => d * this.markerScale),
              className: !feature.properties.wasteSystemName && 'missing',
            });
            return L.marker(latlng, {
              icon,
              interactive: false,
            });
          } else {
            if (!this.disable) {
              return L.circleMarker(latlng, {
                radius: 5 * this.markerScale,
                interactive: false,
              });
            }
          }
        },
        style: feature => {
          return {
            color: 'transparent',
            weight: 2,
            fillOpacity: 1,
            fillColor: this.specialVillages.includes(feature.properties.village)
              ? 'gold'
              : 'lime',
          };
        },
        onEachFeature: (feature, layer) => {
          // layer.bindTooltip(
          //   `${feature.properties.village}`,
          //   {
          //     direction: 'center',
          //     className: 'leaflet-map-tooltip'
          //   }
          // )
        },
      }).addTo(this.map);
      labelGroup.addTo(this.map);
      // markerLayer.on('click', e => {
      //   // this.onLocationChange([1, ...(e.sourceTarget.feature.properties.ids)])
      //   this.$emit('loc-change', [1, e.sourceTarget.feature.properties.ids[0]])
      // })
      this.mapLayers = [borderLayer, markerLayer, labelGroup];
      const padding = [10, 10];
      this.map.fitBounds(borderLayer.getBounds(), { padding });
      // this.onLocationChange([1])
      this.$emit('loc-change', [1]);
      this.showReset = false;
      this.shutDown();
    },
    focus(townId) {
      this.clearLayers();
      const labelGroup = L.layerGroup();
      const currentTown = {
        type: 'FeatureCollection',
        features: mapData.features.filter(e => {
          return e.properties.id === townId;
        }),
      };
      const filteredVillages = {
        type: 'FeatureCollection',
        features: villages.features.filter(e => {
          return e.properties.ids[0] === townId;
        }),
      };
      const borderLayer = L.geoJSON(currentTown, {
        fill: 'url(/texture.jpg)',
        style: function(feature) {
          return {
            color: '#fff9e9a0',
            weight: 2,
            fillOpacity: 0.7,
            fillColor: 'transparent',
          };
        },
        onEachFeature: (feature, layer) => {
          // layer.bindTooltip(
          //   `${feature.properties.name}`,
          //   {
          //     direction: 'center',
          //     className: 'leaflet-map-tooltip'
          //   }
          // )
        },
      }).addTo(this.map);
      const markerLayer = L.geoJSON(filteredVillages, {
        pointToLayer: (feature, latlng) => {
          if (this.markerIcon?.icon) {
            const icon = L.icon({
              iconUrl: this.markerIcon.icon,
              iconSize: this.markerIcon.size.map(d => d * this.markerScale),
              className: !feature.properties.wasteSystemName && 'missing',
            });
            const marker = L.marker(latlng, {
              icon,
            });
            this.markerDict.set(feature.properties.village, marker);
            return marker;
          } else {
            return L.circleMarker(latlng, {
              radius: 8 * this.markerScale,
            });
          }
        },
        style: feature => {
          return {
            color: 'transparent',
            weight: 2,
            fillOpacity: 1,
            fillColor: this.specialVillages.includes(feature.properties.village)
              ? 'gold'
              : 'lime',
          };
        },
        onEachFeature: (feature, layer) => {
          labelGroup.addLayer(
            L.marker([feature.properties.lat + 0.005, feature.properties.lng], {
              icon: new L.DivIcon({
                // className: 'leaflet-map-text-marker',
                className: 'map-marker',
                html: `<div class="leaflet-map-text-marker">${feature.properties.village}</div>`,
              }),
              interactive: false,
            }),
          );
          // layer.bindTooltip(
          //   `${feature.properties.village}`,
          //   {
          //     direction: 'center',
          //     className: 'leaflet-map-tooltip'
          //   }
          // )
        },
      }).addTo(this.map);
      labelGroup.addTo(this.map);
      const hiddenMarkerLayer = L.geoJSON(filteredVillages, {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 45 * this.markerScale,
            pane: 'popupPane', // https://leafletjs.com/reference-1.7.1.html#:~:text=Touch%20zoom%20handler.-,Map%20panes,-Panes%20are%20DOM
          });
        },
        style: feature => {
          return {
            color: this.debugMode ? '#ffffff' : 'transparent',
            strokeWidth: 1,
            fillOpacity: 0,
            fillColor: 'transparent',
          };
        },
        onEachFeature: (feature, layer) => {},
      }).addTo(this.map);
      borderLayer.on('click', e => {
        this.$emit('loc-change', [1, e.sourceTarget.feature.properties.id]);
        // if (this.selectedMarker) {
        //   this.selectedMarker.setIcon(L.icon({
        //     iconUrl: this.markerIcon.icon,
        //     iconSize: this.markerIcon.size.map((d) => (d * this.markerScale))
        //   }))
        //   this.selectedMarker = null
        // }
      });
      hiddenMarkerLayer.on('click', e => {
        // this.onLocationChange([1, ...(e.sourceTarget.feature.properties.ids)])
        if (this.markerIcon?.icon) {
          const origIcon = L.icon({
            iconUrl: this.markerIcon.icon,
            iconSize: this.markerIcon.size.map(d => d * this.markerScale),
          });
          // if (this.selectedMarker) {
          //   this.selectedMarker.setIcon(origIcon)
          // }
          // this.selectedMarker = this.markerDict.get(e.sourceTarget.feature.properties.village)
          // this.selectedMarker.setIcon(L.icon({
          //   iconUrl: this.markerIcon.icon,
          //   iconSize: this.markerIcon.size.map((d) => (d * this.markerScale)),
          //   className: 'leaflet-map-selected-town-marker'
          // }))
        }

        this.$emit('loc-change', [1, ...e.sourceTarget.feature.properties.ids]);
      });
      this.mapLayers = [
        borderLayer,
        markerLayer,
        labelGroup,
        hiddenMarkerLayer,
      ];
      const padding = [10, 10];
      this.map.fitBounds(borderLayer.getBounds(), { padding });
      this.showReset = true;
    },
    setSpecialVillageIcons(villages) {
      this.clearSpecialMarkers();
      const marked = [];
      villages.forEach(v => {
        const marker = this.markerDict.get(v);
        if (marker) {
          marker.setIcon(
            L.icon({
              iconUrl: this.markerIcon.icon,
              iconSize: this.markerIcon.size.map(d => d * this.markerScale),
              className: 'leaflet-map-selected-town-marker',
            }),
          );
          marked.push(marker);
        }
      });
      this.specialMarkers = marked;
    },
  },
};
</script>
<style scoped lang="scss">
.padingRight8 {
  padding-right: 8px;
  box-sizing: border-box;
}
.markCon {
  height: 34px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.pagCon {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 20px;
}
.leftListCon {
  width: 100%;
  color: #fff;
  height: 180px;
}
.leftListNextCon {
  box-sizing: border-box;
  padding-top: 8px;
  height: 160px;
  overflow-y: auto;
}
.thumbImgCon {
  width: 26px;
  height: 26px;
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-top: 4px;
}
.commonCountBg {
  width: 63px;
  height: 36px;
  background-image: url(https://img.hzanchu.com/acimg/44fd795990796c7f59fdc96a669b242d.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  line-height: 36px;
  text-align: center;
  font-size: 18px;
  font-family: YouSheBiaoTiHei-2;
  color: #fff;
  text-shadow: 0px 2px 8px #259bff;
}
.rightListNextCon {
  box-sizing: border-box;
  padding-top: 8px;
  height: 190px;
  overflow-y: auto;
}
.normalScrollItemHeight {
  height: 36px;
  margin-bottom: 2px;
  cursor: pointer;
  text-align: center;
  line-height: 32px;
  background-color: rgba(95, 175, 249, 0.04);

  font-size: 14px;
  font-family: Microsoft YaHei;
  color: #fff;
}
.activeBg {
  background-color: rgba(95, 175, 249, 0.16) !important;
}
.rightListCon {
  width: 100%;
  color: #fff;
  height: 180px;
}
.scrollHeader {
  text-align: center;
  height: 24px;
  font-size: 14px;
  color: #5fafff;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.splitLineLeft {
  width: 306px;
  height: 1px;
  border: 1px solid #ffffff;
  opacity: 0.4;
}
.splitLineRight {
  width: 330px;
  height: 1px;
  border: 1px solid #ffffff;
  opacity: 0.4;
}
.shutIcon {
  font-size: 20px;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 13px;
  z-index: 9999999;
}
.bottomCon {
  position: absolute;
  bottom: -140px;
  left: 20px;
  width: 793px;
  height: 320px;
  z-index: 9999999;
  background-image: url(https://img.hzanchu.com/acimg/439ec9d554ec384c2ea98e894e4031ba.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.leftPart {
  width: 348px;
  height: 292px;
  background: rgba(73, 147, 248, 0.08);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 14px 20px;
}
.rightPart {
  margin-left: 20px;
  width: 374px;
  height: 292px;
  background: rgba(73, 147, 248, 0.08);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 14px 20px;
}
.headBack {
  width: 192px;
  height: 32px;
  background-image: url(https://img.hzanchu.com/acimg/bd161e000fa102ad8fc3986ca1d0009f.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-bottom: 11px;
  box-sizing: border-box;
  padding-left: 24px;
  color: #fff;
  line-height: 32px;
  font-size: 18px;
  font-weight: 500;
}
.container {
  --text-size-scale: 1;

  .reset-btn {
    z-index: 1000;
    background: none;
    color: white;
    position: absolute;
    top: 0;
    margin: 1% 1.5%;
    font-family: Microsoft YaHei;
    font-size: calc(26px * var(--text-size-scale));
    font-weight: bold;
    height: 12.5%;
    width: 10%;
    border: none;
    background-image: url('../../assets/dashboard/back-btn.webp');
    background-size: 100% 100%;
    &:active {
      transform: scale(0.9);
    }
  }
  position: relative;
  height: 100%;
  width: 100%;
  .map {
    height: 100%;
    width: 100%;
    background: transparent;
  }
  .legend-box {
    position: absolute;
    bottom: 0;
    right: 5%;
    color: white;
    font-size: 16px;
    padding: 16px;
    background: #052351;
    border: 1px solid #2a8ec3;
    .legend-item {
      display: flex;
      align-items: center;
      .color-block {
        display: inline-block;
        min-width: 16px;
        height: 16px;
        border-radius: 50%;
        background: lime;
        margin-inline: 5px;
      }
    }
  }
}
</style>
<style lang="scss">
.container {
  --text-size-scale: 1;
  $text-shadow-color: #132d44;

  .leaflet-map-tooltip {
    background: black;
    font-size: calc(24px * var(--text-size-scale));
    color: white;
    font-family: 'Microsoft Yahei', serif;
    white-space: pre;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.8);
    border-color: rgba(0, 0, 0, 0.8);
    border-radius: calc(5px * var(--text-size-scale));
  }
  .leaflet-map-text-marker {
    color: white;
    text-shadow: calc(4px * var(--text-size-scale)) 0 0 $text-shadow-color,
      calc(-4px * var(--text-size-scale)) 0 0 $text-shadow-color,
      0 calc(4px * var(--text-size-scale)) 0 $text-shadow-color,
      0 calc(-4px * var(--text-size-scale)) 0 $text-shadow-color,
      calc(2px * var(--text-size-scale)) calc(2px * var(--text-size-scale))
        $text-shadow-color,
      calc(-2px * var(--text-size-scale)) calc(-2px * var(--text-size-scale)) 0
        $text-shadow-color,
      calc(2px * var(--text-size-scale)) calc(-2px * var(--text-size-scale)) 0
        $text-shadow-color,
      calc(-2px * var(--text-size-scale)) calc(2px * var(--text-size-scale)) 0
        $text-shadow-color;
    width: max-content !important;
    font-size: calc(20px * var(--text-size-scale));
    transform: translateX(-40%);
    //font-weight: bold;
  }
  .leaflet-map-town-marker {
    color: white;
    width: max-content !important;
    font-size: calc(20px * var(--text-size-scale));
    //font-weight: bold;
  }
  .leaflet-map-selected-town-marker {
    filter: hue-rotate(250deg);
  }
  .missing {
    filter: saturate(0);
  }
}
</style>
<style lang="scss">
.leaffletMapCon {
  .el-loading-mask {
    background-color: transparent !important;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: rgba(1, 1, 1, 0);
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(178, 207, 235, 0.6);
  }
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
</style>
