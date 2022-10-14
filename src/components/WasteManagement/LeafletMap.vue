<template>
  <div
    class="waste-map-container"
    :style="{
      '--text-size-scale': textScale,
    }"
  >
    <div ref="map" class="map" />
    <button v-if="showReset" class="reset-btn" round @click="reset">返回</button>
    <div class="legend-box">
      <div class="legend"><span class="color-block" :style="{background: colors[0]}" />准确率≥85%</div>
      <div class="legend"><div class="color-block" :style="{background: colors[1]}" />准确率≥80%</div>
      <div class="legend"><div class="color-block" :style="{background: colors[2]}" />{{ `准确率<80%` }}</div>
      <div class="legend"><div class="color-block" :style="{background: colors[3]}" />无数据</div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import mapData from '@/assets/dashboard/pinghu.json'
import villages from '@/assets/dashboard/points.json'
import '@/assets/js/leaflet-plugin'
import { isEqual } from 'lodash'

const colors = ['limegreen', 'yellow', 'red', 'gray']
function getColor(accuracy, className = false) {
  if (accuracy > 85) {
    return className ? 'good' : colors[0]
  }
  if (accuracy > 80) {
    return className ? 'ok' : colors[1]
  }
  if (accuracy >= 0) {
    return className ? 'bad' : colors[2]
  }
  return className ? 'missing' : colors[3]
}

export default {
  name: 'LeafletMap',
  props: {
    onLocationChange: {
      type: Function,
      default: () => {}
    },
    specialVillages: {
      type: Array,
      default: () => []
    },
    locationName: {
      type: String,
      default: ''
    },
    textScale: {
      type: Number,
      default: 1
    },
    markerScale: {
      type: Number,
      default: 1
    },
    // { icon, size: [x, y] }, 如果存在用这个icon展示地区点而不是circleMarker
    markerIcon: {
      type: Object,
      default: () => {}
    },
    accuracyList: {
      type: Object,
      default: () => {}
    }
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
      currentRegionPath: [1],
      townAccuracyList: [],
      villageAccuracyList: [],
      debugMode: false
    }
  },
  computed: {
    mapData() {
      const data = mapData
      data.features = mapData.features.filter(feat => feat.properties.name !== '乍浦镇')
      return data
    },
    colors() {
      return colors
    }
  },
  watch: {
    specialVillages(newValue, oldValue) {
      if (!isEqual(newValue, oldValue)) {
        if (this.markerIcon?.icon) {
          this.setSpecialVillageIcons(newValue)
        } else {
          // this.mapLayers[1]?.resetStyle()
        }
      }
    },
    accuracyList(newList) {
      if (newList.path.length === 1) {
        this.townAccuracyList = newList.data
        this.mapLayers[1]?.resetStyle()
      } else if (newList.path.length === 2) {
        this.villageAccuracyList = newList.data
        this.reloadMarkerColors()
      }
    }
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
      maxBounds: [[30.86097373272608, 120.89767456054689], [30.53151083364524, 121.30554199218751]]
    })
    map.scrollWheelZoom.disable()
    map.setView(this.center, this.zoom)
    this.map = map
    mapData.features.forEach(feat => {
      this.towns.set(feat.properties.id, feat.properties.name)
    })
    this.reset()
  },
  methods: {
    reloadMarkerColors() {
      Array.from(this.markerDict.values()).forEach((marker)=>{
        if (!this.specialMarkers.includes(marker)){
          marker.setIcon(L.icon({
            iconUrl: this.markerIcon.icon,
            iconSize: this.markerIcon.size.map((d) => (d * this.markerScale)),
            className: getColor(this.villageAccuracyList.find(e => e.region_name === marker.feature.properties.wasteSystemName)?.ture_rate, true)
          }))
        }
      })
    },
    clearSpecialMarkers() {
      if (this.specialMarkers.length > 0) {
        this.specialMarkers.forEach((marker) => {
          marker.setIcon(L.icon({
            iconUrl: this.markerIcon.icon,
            iconSize: this.markerIcon.size.map((d) => (d * this.markerScale)),
            className: getColor(this.villageAccuracyList.find(e => e.region_name === marker.feature.properties.wasteSystemName)?.ture_rate, true)
          }))
        })
        this.specialMarkers = []
      }
    },
    clearLayers() {
      this.mapLayers.forEach(layer => {
        layer.off()
        layer.removeFrom(this.map)
      })
      this.clearSpecialMarkers()
      this.markerDict.clear()
    },
    reset() {
      this.clearLayers()
      this.currentRegionPath = [1]
      const labelGroup = L.layerGroup()
      const borderLayer = L.geoJSON(this.mapData, {
        fill: 'url(/texture.jpg)',
        style: function(feature) {
          return {
            color: '#fff9e9a0',
            weight: 2,
            fillOpacity: 0.7,
            fillColor: 'transparent'
          }
        },
        onEachFeature: (feature, layer) => {
          const center = layer.getBounds().getCenter()
          labelGroup.addLayer(L.marker([center.lat, center.lng - 0.004 * feature.properties.name.length],
            {
              icon: new L.DivIcon({
                className: 'leaflet-map-text-marker',
                html: `<div class="inner_label">${feature.properties.name}</div>`
              }),
              interactive: false,
              pane: 'popupPane'
            }))
          // layer.bindTooltip(
          //   `${feature.properties.name}`,
          //   {
          //     direction: 'center',
          //     className: 'leaflet-map-tooltip'
          //   }
          // )
        }
      }).addTo(this.map)
      const borderOverlayLayer = L.geoJSON(this.mapData, {
        style: (feature) => {
          return {
            color: 'transparent',
            fillOpacity: 0.4,
            fillColor: getColor(this.townAccuracyList.find(e => e.region_name === feature.properties.wasteSystemName)?.ture_rate)
          }
        }
      }).addTo(this.map)
      borderOverlayLayer.on('click', e => {
        this.focus(e.sourceTarget.feature.properties.id)
        // this.onLocationChange([1, e.sourceTarget.feature.properties.id])
        this.$emit('loc-change', [1, e.sourceTarget.feature.properties.id])
      })
      labelGroup.addTo(this.map)
      this.mapLayers = [borderLayer, borderOverlayLayer, labelGroup]
      const padding = [10, 10]
      this.map.fitBounds(borderLayer.getBounds(), { padding })
      // this.onLocationChange([1])
      this.$emit('loc-change', [1])
      this.showReset = false
    },
    focus(townId) {
      this.clearLayers()
      this.currentRegionPath = [1, townId]
      const labelGroup = L.layerGroup([], { pane: 'tooltipPane' })
      const currentTown = {
        'type': 'FeatureCollection',
        'features': this.mapData.features.filter(e => {
          return e.properties.id === townId
        })
      }
      const filteredVillages = {
        'type': 'FeatureCollection',
        'features': villages.features.filter(e => {
          return e.properties.ids[0] === townId
        })
      }
      const borderLayer = L.geoJSON(currentTown, {
        fill: 'url(/texture.jpg)',
        style: function() {
          return {
            color: '#fff9e9a0',
            weight: 2,
            fillOpacity: 0.7,
            fillColor: 'transparent'
          }
        }
      }).addTo(this.map)
      const markerLayer = L.geoJSON(filteredVillages, {
        pointToLayer: (feature, latlng) => {
          if (this.markerIcon?.icon) {
            const icon = L.icon({
              iconUrl: this.markerIcon.icon,
              iconSize: this.markerIcon.size.map((d) => (d * this.markerScale)),
              className: 'missing'
            })
            const marker = L.marker(latlng, {
              icon
            })
            this.markerDict.set(feature.properties.village, marker)
            return marker
          } else {
            return L.circleMarker(latlng, {
              radius: 15 * this.markerScale
            })
          }
        },
        onEachFeature: (feature, layer) => {
          labelGroup.addLayer(L.marker([feature.properties.lat, feature.properties.lng],
            {
              pane: 'tooltipPane',
              icon: new L.DivIcon({
                className: 'leaflet-map-text-marker',
                html: `<div class="inner_label">${feature.properties.village}</div>`
              })
            }))
        }
      }).addTo(this.map)
      labelGroup.addTo(this.map)
      const hiddenMarkerLayer = L.geoJSON(filteredVillages, {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 30 * this.markerScale,
            pane: 'popupPane' // https://leafletjs.com/reference-1.7.1.html#:~:text=Touch%20zoom%20handler.-,Map%20panes,-Panes%20are%20DOM
          })
        },
        style: (feature) => {
          return {
            color: this.debugMode ? '#ffffff' : 'transparent',
            strokeWidth: 1,
            fillOpacity: 0,
            fillColor: 'transparent'
          }
        }
      }).addTo(this.map)
      borderLayer.on('click', e => {
        this.$emit('loc-change', [1, e.sourceTarget.feature.properties.id])
        // if (this.selectedMarker) {
        //   this.selectedMarker.setIcon(L.icon({
        //     iconUrl: this.markerIcon.icon,
        //     iconSize: this.markerIcon.size.map((d) => (d * this.markerScale))
        //   }))
        //   this.selectedMarker = null
        // }
      })
      hiddenMarkerLayer.on('click', e => {
        this.currentRegionPath = [1, ...(e.sourceTarget.feature.properties.ids)]
        this.$emit('loc-change', [1, ...(e.sourceTarget.feature.properties.ids)])
      })
      this.mapLayers = [borderLayer, markerLayer, labelGroup, hiddenMarkerLayer]
      const padding = [10, 10]
      this.map.fitBounds(borderLayer.getBounds(), { padding })
      this.showReset = true
    },
    setSpecialVillageIcons(villages) {
      this.clearSpecialMarkers()
      const marked = []
      villages.forEach((v) => {
        const marker = this.markerDict.get(v)
        if (marker) {
          marker.setIcon(L.icon({
            iconUrl: this.markerIcon.icon,
            iconSize: this.markerIcon.size.map((d) => (d * this.markerScale)),
            className: 'leaflet-map-selected-town-marker'
          }))
          marked.push(marker)
        }
      })
      this.specialMarkers = marked
    }
  }
}
</script>

<style scoped lang="scss">
.waste-map-container {
  --text-size-scale: 1;

  .reset-btn{
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
    background-image: url("../../assets/dashboard/back-btn.webp");
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
    display: flex;
    flex-flow: column;
    z-index: 1000;
    background: none;
    color: white;
    right: 0;
    bottom: 0;
    .legend {
      display: flex;
      height: 2vh;
      font-size: 1.8vh;
      .color-block {
        width: 3vw;
        height: 100%;
        opacity: 0.7;
        margin-right: 1vw;
      }
    }
  }
}
</style>
<style lang="scss">
.waste-map-container {
  --text-size-scale: 1;
  $text-shadow-color: #132d44;

  .leaflet-map-tooltip{
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
  .leaflet-map-text-marker{
    color: white;
    text-shadow: calc(4px * var(--text-size-scale)) 0 0 $text-shadow-color, calc(-4px * var(--text-size-scale)) 0 0 $text-shadow-color, 0 calc(4px * var(--text-size-scale)) 0 $text-shadow-color, 0 calc(-4px * var(--text-size-scale)) 0 $text-shadow-color,
    calc(2px * var(--text-size-scale)) calc(2px * var(--text-size-scale)) $text-shadow-color,
    calc(-2px * var(--text-size-scale)) calc(-2px * var(--text-size-scale)) 0 $text-shadow-color,
    calc(2px * var(--text-size-scale)) calc(-2px * var(--text-size-scale)) 0 $text-shadow-color,
    calc(-2px * var(--text-size-scale)) calc(2px * var(--text-size-scale)) 0 $text-shadow-color;
    width: max-content !important;
    margin-left: 0 !important;
    margin-top: 0 !important;
    font-size: calc(26px * var(--text-size-scale));
    font-weight: bold;
    .inner_label {
      transform: translate(-50%, 50%);
    }
  }
  .leaflet-map-town-marker{
    color: white;
    width: max-content !important;
    font-size: calc(60px * var(--text-size-scale));
    font-weight: bold;
  }
  .leaflet-map-selected-town-marker {
    filter: hue-rotate(250deg);
  }
  .good {
  }
  .ok {
    filter: hue-rotate(260deg) brightness(1.3) saturate(2);
  }
  .bad {
    filter: hue-rotate(210deg) saturate(5);
  }
  .missing {
    filter: saturate(0);
  }
}

</style>
