<template>
  <div class="index_wrap">
    <iframe
      width="100%"
      style="height: 100%; margin: 0; padding: 0; border: 0"
      :src="src"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  created: function() {
    console.log(this.$route.query)
    const query = this.$route.query
    if (query.type == 1) {
      this.src = 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjY4N30='
    } else if (query.type == 2) {
      this.src = 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjYzN30='
    } else if (query.type == 3) {
      this.src = 'https://fenghua-szgzt-admini.zjsszxc.com/'
    } else if (query.type == 4) {
      this.src = 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6MjY4NH0='
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.index_wrap {
  width: 100%;
  height: 100%;
}
</style>
