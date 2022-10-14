<template>
  <div class="page-container">
    <div ref="map" class="map-container" />
    <div class="legend-box">
      <div class="legend" @click="showCompanies = !showCompanies">
        <img
          class="legend-icon"
          :class="{hidden: !showCompanies}"
          src="../../assets/iframes/agri-map/company-marker.png"
          alt="标记按钮"
        >龙头企业</div>
      <div class="legend" @click="showFlora = !showFlora">
        <img
          class="legend-icon"
          :class="{hidden: !showFlora}"
          src="../../assets/iframes/agri-map/flora-marker.png"
          alt="标记按钮"
        >花卉</div>
      <div class="legend" @click="showFungi = !showFungi">
        <img
          class="legend-icon"
          :class="{hidden: !showFungi}"
          src="../../assets/iframes/agri-map/fungi-marker.png"
          alt="标记按钮"
        >食用菌</div>
    </div>
  </div>

</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  CompanyMarker,
  FloraMarker,
  FungiMarker,
  PlainBlueMarker,
  PlainMarker,
  PlainOrangeMarker
} from '@/components/Iframes/icons'

export default {
  name: 'AgriMap',
  data() {
    return {
      map: null,
      mapLayers: {},
      // layerControl: null,
      center: [30.724719628231817, 121.10023498535158],
      zoom: 11.4,
      popupContent: '',
      apikey: '',
      showFungi: true,
      showCompanies: true,
      showFlora: true,
      lastItem: null
    }
  },
  watch: {
    showCompanies(on) {
      if (on) {
        this.loadCompanyData()
      } else {
        this.mapLayers['龙头企业'].off()
        this.mapLayers['龙头企业'].remove()
      }
    },
    showFungi(on) {
      if (on) {
        this.loadFungiData()
      } else {
        this.mapLayers['食用菌'].off()
        this.mapLayers['食用菌'].remove()
      }
    },
    showFlora(on) {
      if (on) {
        this.loadFloraData()
      } else {
        this.mapLayers['花卉'].off()
        this.mapLayers['花卉'].remove()
      }
    }
  },
  mounted() {
    const tianDiTuKey = '6a4522498e001c6ec374d880898dfacd'
    const baseLayerTianDiTu = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tianDiTuKey}`, {
      maxZoom: 18,
      subdomains: [0, 1, 2, 3, 4, 5, 6, 7]
    })
    const map = L.map(this.$refs.map, {
      layers: [baseLayerTianDiTu],
      zoomControl: false,
      attributionControl: false,
      zoomDelta: 0.5,
      zoomSnap: 0.05,
      maxBounds: [[31.56097373272608, 120.69767456054689], [30.53151083364524, 121.50554199218751]]
      // renderer: customRenderer,
    })
    map.setView(this.center, this.zoom)
    this.map = map
    // this.layerControl = L.control.layers({
    //   '天地图底图': baseLayerTianDiTu
    // }, {
    // }, {
    //   position: 'topleft'
    // }).addTo(map)
    map.on('popupclose', () => {
      if (this.lastItem) {
        this.lastItem.marker.setIcon(this.lastItem.oldIcon)
        this.lastItem = null
      }
    })
    fetch(`https://zrzy.phxmgl.cn/pinghu-api/openApi/getToken?appId=pinghu2020&appSecret=5rfv$g1gd`)
      .then(r => r.json())
      .then(r => {
        this.apikey = r.data.token
        this.loadBorderData()
        this.loadFungiData()
        this.loadCompanyData()
        this.loadFloraData()
      })
  },
  methods: {
    replaceOverlayLayer(layer, name) {
      if (this.mapLayers[name]) {
        // this.layerControl.mapLayers.removeLayer(this.mapLayers[name])
        this.mapLayers[name].off()
        this.mapLayers[name].remove()
      }
      this.mapLayers[name] = layer
      // this.layerControl.addOverlay(layer, name)
    },

    async loadFungiData() {
      const params = {
        service: 'WFS',
        request: 'GetFeature',
        typeName: 'dist_edible_fungit',
        outputFormat: 'application/json'
      }
      const result = await fetch(`https://zrzy.phxmgl.cn/pinghu-api/layer/ows?${new URLSearchParams(params).toString()}`).then(r => r.json())
      const icon = L.icon({
        iconUrl: FungiMarker,
        iconSize: [40, 50]
      })
      const selectedIcon = L.icon({
        iconUrl: PlainOrangeMarker,
        iconSize: [40, 50]
      })
      const layer = new L.GeoJSON(result, {
        pointToLayer: (feature, latlng) => {
          const marker = new L.Marker(latlng, { icon })
          marker.on('click', async(e) => {
            this.lastItem = { marker, oldIcon: icon }
            marker.setIcon(selectedIcon)
            const queryResult = await fetch(`https://zrzy.phxmgl.cn/pinghu-api/agricuIndustry/getSyjunInfo/${e.sourceTarget.feature.properties.id}`, {
              headers: {
                appId: 'pinghu2020',
                AccessToken: this.apikey
              }
            }).then(r => r.json())
            const { data } = queryResult
            L.popup({ closeButton: false })
              .setLatLng(marker.getLatLng())
              .setContent(`
                <div class="l-popup" style="filter: hue-rotate(45deg) drop-shadow(2px 4px 6px black)">
                   <div class="l-popup-title"><div class="popup-title-block"></div>${data.baseFarmer}</div>
                   <div class="l-popup-row">地址: ${data.area}</div>
                   <div class="l-popup-row">负责人: ${data.leader}</div>
                   <div class="l-popup-row">联系电话: ${data.phoneNum}</div>
                   <div class="l-popup-row">类型: ${data.plantType}</div>
                   <div class="l-popup-row">品种: ${data.plantDetail}</div>
                   <div class="l-popup-row">总面积: ${data.growArea}</div>
                </div>`)
              .openOn(this.map)
          })
          return marker
        }
      })
      layer.addTo(this.map)
      this.replaceOverlayLayer(layer, '食用菌')
    },
    async loadCompanyData() {
      const params = {
        service: 'WFS',
        request: 'GetFeature',
        typeName: 'dist_leading_enterprise',
        outputFormat: 'application/json'
      }
      const result = await fetch(`https://zrzy.phxmgl.cn/pinghu-api/layer/ows?${new URLSearchParams(params).toString()}`).then(r => r.json())
      const icon = L.icon({
        iconUrl: CompanyMarker,
        iconSize: [40, 50]
      })
      const selectedIcon = L.icon({
        iconUrl: PlainBlueMarker,
        iconSize: [40, 50]
      })
      const layer = new L.GeoJSON(result, {
        pointToLayer: (feature, latlng) => {
          const marker = new L.Marker(latlng, {
            icon
          })
          marker.on('click', async(e) => {
            this.lastItem = { marker, oldIcon: icon }
            marker.setIcon(selectedIcon)
            const queryResult = await fetch(`https://zrzy.phxmgl.cn/pinghu-api/circulateMarketing/getLeadingEnterpriseInfo/${e.sourceTarget.feature.properties.id}`, {
              headers: {
                appId: 'pinghu2020',
                AccessToken: this.apikey
              }
            }).then(r => r.json())
            const { data } = queryResult
            L.popup({ closeButton: false })
              .setLatLng(marker.getLatLng())
              .setContent(`
                <div class="l-popup" style="filter: hue-rotate(217deg) drop-shadow(2px 4px 6px black)" >
                   <div class="l-popup-title"><div class="popup-title-block"></div>${data.name}</div>
                   <div class="l-popup-row">企业类型: ${data.type}</div>
                   <div class="l-popup-row">地址: ${data.address}</div>
                   <div class="l-popup-row">级别: ${data.level}</div>
                   <div class="l-popup-row">主营产品: ${data.scoap}</div>
                </div>`)
              .openOn(this.map)
          })
          return marker
        }
      })
      layer.addTo(this.map)
      this.replaceOverlayLayer(layer, '龙头企业')
    },
    async loadFloraData() {
      const params = {
        service: 'WFS',
        request: 'GetFeature',
        typeName: 'dist_flower_plant',
        outputFormat: 'application/json'
      }
      const result = await fetch(`https://zrzy.phxmgl.cn/pinghu-api/layer/ows?${new URLSearchParams(params).toString()}`).then(r => r.json())
      const icon = L.icon({
        iconUrl: FloraMarker,
        iconSize: [40, 50]
      })
      const selectedIcon = L.icon({
        iconUrl: PlainMarker,
        iconSize: [40, 50]
      })
      const layer = new L.GeoJSON(result, {
        pointToLayer: (feature, latlng) => {
          const marker = new L.Marker(latlng, {
            icon
          })
          marker.on('click', async(e) => {
            this.lastItem = { marker, oldIcon: icon }
            marker.setIcon(selectedIcon)
            const queryResult = await fetch(`https://zrzy.phxmgl.cn/pinghu-api/agricuIndustry/getFlowerInfo/${e.sourceTarget.feature.properties.id}`, {
              headers: {
                appId: 'pinghu2020',
                AccessToken: this.apikey
              }
            }).then(r => r.json())
            const { data } = queryResult
            L.popup({ closeButton: false })
              .setLatLng(marker.getLatLng())
              .setContent(`
                <div class="l-popup" style="filter: drop-shadow(2px 4px 6px black)">
                   <div class="l-popup-title"><div class="popup-title-block"></div>${data.baseFarmer}</div>
                   <div class="l-popup-row">地址: ${data.area}</div>
                   <div class="l-popup-row">负责人: ${data.leader}</div>
                   <div class="l-popup-row">联系电话: ${data.phoneNum}</div>
                   <div class="l-popup-row">类型: ${data.plantType}</div>
                   <div class="l-popup-row">品种: ${data.plantDetail}</div>
                   <div class="l-popup-row">总面积: ${data.growArea}亩</div>
                </div>`)
              .openOn(this.map)
          })
          return marker
        }
      })
      layer.addTo(this.map)
      this.replaceOverlayLayer(layer, '花卉')
    },

    async loadBorderData() {
      const params = {
        service: 'WFS',
        request: 'GetFeature',
        typeName: 'PhLayer:ph_layer_xzqjx',
        outputFormat: 'application/json'
      }
      const result = await fetch(`https://zrzy.phxmgl.cn/pinghu-api/layer/ows?${new URLSearchParams(params).toString()}`).then(r => r.json())
      const labelResult = await fetch('https://zrzy.phxmgl.cn/pinghu-api/region/queryRegionListByParentId?parentId=3104002349', {
        method: 'POST',
        headers: {
          appId: 'pinghu2020',
          AccessToken: this.apikey
        }
      }).then(r => r.json())

      const labelGroup = L.layerGroup().addTo(this.map)
      labelResult.data.forEach(row => {
        labelGroup.addLayer(L.marker([row.lat, row.lon],
          {
            icon: new L.DivIcon({
              className: 'leaflet-map-text-marker',
              html: `${row.chinaName}`
            })
          }))
      })
      L.geoJSON(result, {
        style: () => ({
          color: '#26beff',
          fillColor: 'transparent'
        })
      }).addTo(this.map)
    }
  }
}
</script>

<style scoped lang="scss">
.page-container {
  width: 100%;
  height: 100%;
  .map-container {
    width: 100%;
    height: 100%;
  }
  .legend-box {
    z-index: 800;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 500px;
    background: #0009;
    margin: 40px;
    padding: 20px 40px;
    .legend {
      display: flex;
      color: white;
      align-items: center;
      font-size: 50px;
      .legend-icon {
        width: 150px;
      }
      .hidden {
        filter: saturate(0);
      }
    }
  }
}
</style>

<style lang="scss">
$scale: 1.5;

.page-container{
  .leaflet-popup-content-wrapper{
    background: transparent;
    box-shadow: none;
    .leaflet-popup-content {
      margin: 0;
      width: fit-content !important;
    }
  }
  .leaflet-popup-tip-container{
    background: transparent;
    .leaflet-popup-tip {
      background: transparent;
    }
  }
  .leaflet-map-text-marker{
    color: white;
    width: max-content !important;
    text-shadow: 4px 0 0 black, -4px 0 0 black, 0 4px 0 black, 0 -4px 0 black,
    2px 2px black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black;
    font-size: 60px;
    font-weight: bold;
  }
  .l-popup {
    display: flex;
    flex-flow: column;
    padding: 110px * $scale 140px * $scale;
    row-gap: 40px * $scale;
    width: fit-content;
    background-image: url('../../assets/iframes/agri-map/flora-popup-bg.png');
    background-size: 100% 100%;
    .l-popup-title {
      display: flex;
      width: 740px * $scale;
      font-size: 45px * $scale;
      font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
      word-break: break-all;
      font-weight: 700;
      text-align: left;
      color: #ffffff;
      letter-spacing: 2px * $scale;
      .popup-title-block {
        display: inline-block;
        width: 12px * $scale;
        background: #f88b8f;
        margin-inline-end: 15px * $scale;
      }
    }
    .l-popup-row {
      font-size: 40px * $scale;
      width: 740px * $scale;
      min-height: 80px * $scale;
      line-height: 80px * $scale;
      padding-left: 90px * $scale;
      word-break: break-all;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 500;
      text-align: left;
      color: #ffffff;
      background-image: url('../../assets/iframes/agri-map/flora-row-bg.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>

