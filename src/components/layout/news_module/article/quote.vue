<template>
  <div class="mdui-container">
    {{ quote }}
  </div>
</template>

<script>
import article_api from "../../../../api/news_module/article_api";

export default {
  name: "quote",
  data () {
    return {
      quote: ''
    }
  },
  methods: {
    async loadData () {
      try {
        let res = await article_api.getQuote()
        console.log(res)
        if (res.status === 200 && res.data.code === 200) {
          // console.log(res.data)
          this.quote = res.data.data
        }
      } catch (e) {
        console.log(e)
        console.log('quote loadData error.')
      }
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>
