<template>
  <div class="title">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
  .title {
    width: 453px;
    height: 50px;
    background: url('../img/title-bg.png') no-repeat;
    background-size: 100% 100%;
    font-family: MicrosoftYaHei-Bold-, MicrosoftYaHei-Bold;
    font-size: 20px;
    color: #fff;
    line-height: 50px;
    padding-left: 41px;
    letter-spacing: 1px;
  }
</style>