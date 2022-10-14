<template>
  <div class="captcha-container">
    <el-input v-model="inputValue" class="captcha-input" />
    <div v-html="image" class="captcha-image" />
  </div>
</template>

<script>
import svgCaptcha from 'svg-captcha-browser'
export default {
  name: 'Captcha',
  data() {
    return {
      image: null,
      secret: '',
      inputValue: ''
    }
  },
  mounted() {
    svgCaptcha
      .loadFont('/Comismsh.ttf')
      .then(() => {
        this.generate()
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    generate() {
      const result = svgCaptcha.create({ size: 4, noise: 0 })
      this.image = result.data
      this.secret = result.text
    },
    validate() {
      if ((this.inputValue ?? '').toLowerCase() === this.secret.toLowerCase() && this.secret.length > 0) {
        return true
      }
      this.generate()
      return false
    }
  }
}

</script>

<style scoped lang="scss">
.captcha-container {
  display: flex;
  .captcha-input {
    flex: 1 0;
    height: 120px;
  }
  .captcha-image {
    flex: 1 0;
    height: 120px;
    background: white;
  }
}
</style>
