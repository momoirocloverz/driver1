<template>
  <div class="left">
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
      locationList: new Map()
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
  methods: {}
}
</script>

<style scoped lang="scss">
.left {
  // width: 497px;
  width: 25.88%;
  height: 100%;
  margin-left: 30px;
  padding-left: 11px;
  box-sizing: border-box;
  background: url(https://img.hzanchu.com/acimg/4daf396bc3e4602e66094862b5c03178.png)
    no-repeat;
  background-size: 100%;
  background-size: cover;
  overflow: hidden;
}
</style>