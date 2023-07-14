<template>
  <div class="mdui-container">
    <div class="mdui-card-primary-title" @click="showTable=!showTable">
      B站热门榜
    </div>
    <div class="mdui-list" v-show="showTable">
      <div class="mdui-list-item" v-for="item in dataList">
        <el-link :href="item['link']" target="_blank">{{ item.title }}, {{item.heat}}</el-link>
      </div>
    </div>

  </div>
</template>

<script>
import global_settings from "../../../../api/global_settings";
import hotnews_api from "../../../../api/news_module/hotnews_api";

export default {
  name: "BiliBiliNews",
  data () {
    return {
      respondData: {},
      dataList: [],
      showTable: global_settings.showTable
    }
  },
  methods: {
    async loadData() {
      try {
        let res = await hotnews_api.getBiliBiliNews()
        // console.log(res)
        if (res.status === 200 && res.data.code === 200) {
          // console.log(res.data)
          this.respondData = res.data
          this.dataList = JSON.parse(res.data.data).slice(0, 20)
          // console.log(this.dataList)
        }
      } catch (e) {
        console.log(e)
        console.log('ZhihuNews loadData error.')
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
