<template>
  <div class="new-header" :style="styleOverride">
    {{ title }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NewHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    noBackground: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styleOverride() {
      return {
        background: this.noBackground ? 'none' : undefined
      }
    }
  }
}
</script>

<style scoped lang="scss">
.new-header {
  font-size: 20px;
  font-family: "Microsoft Yahei", sans-serif;
  text-align: left;
  color: #fefefe;
  width: 94%;
  align-self: flex-start;
  padding: 10px 24px;
  background: url("~@/assets/dashboard/new-section-header-bg.webp");
  background-size: 100% 150%;
  display: flex;
  align-items: center;
}
</style>
