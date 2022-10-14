<template>
  <div class="stats-item">
    <div class="stats-icon" v-if="icon">
      <img class="icon-inner" :src="icon" alt="icon">
      <img class="icon-overlay" :src="IconOverlay" alt="icon">
    </div>
    <div class="stats-data">
      <div class="stats-label">
        {{ label }}
      </div>
      <div class="stats-value">
        <div class="stats-number">
          {{ processedValue }}
        </div>
        <div class="stats-unit">
          {{ processedUnit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconOverlay from '@/assets/dashboard/icon_overlay.png'

export default {
  name: 'StatsItem',
  props: {
    icon: {
      type: String,
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: '-'
    },
    unit: {
      type: String,
      default: ''
    }
  },
  computed: {
    IconOverlay() {
      return IconOverlay
    },
    processedValue() {
      return this.value ?? '-'
    },
    processedUnit() {
      return this.unit ?? ''
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.stats-item {
  display: flex;
  flex-flow: row nowrap;
  //height: 91px;
  width: max-content;
  column-gap: 15px;
  .stats-icon {
    min-width: 60px;
    min-height: 60px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-inner {
      width: 35px;
      max-height: 35px;
    }
    .icon-overlay {
      position: absolute;
      width: 60px;
      height: 60px;
      animation: spin 4s infinite linear;
    }
  }
  .stats-data {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 15px;
    .stats-label {
      width: 100%;
      font-size: 18px;
      font-family: Microsoft YaHei;
      text-align: left;
      color: #fdfdfd;
      letter-spacing: 1px;
    }
    .stats-value {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      .stats-number{
        font-size: 24px;
        font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
        font-weight: 600;
        text-align: left;
        color: #10edff;
        //text-shadow: 2px 2px 6px #1a73aa;
        //text-shadow: 0px 2px 18px rgba(19,128,255,0.84);
      }
      .stats-unit{
        font-family: Microsoft YaHei;
        color: #fdfdfd;
        letter-spacing: 1px;
        margin-left: 6px;
        font-size: 14px;
      }
    }
  }
}
</style>
