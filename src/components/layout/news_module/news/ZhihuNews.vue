<template>
  <div class="mdui-container">
    <div class="mdui-card-primary-title" @click="showTable=!showTable">
      知乎新闻
    </div>
    <div class="mdui-card" v-for="item in dataList" v-show="showTable">
      <div class="mdui-card-media">
        <img :src="item['image']"/>
        <div class="mdui-card-media-covered">
          <div class="mdui-card-primary">
            <div class="mdui-card-primary-title">{{ item['title'] }}</div>
            <div class="mdui-card-primary-subtitle">{{ item['hint'] }}</div>
            <el-link :href="item['url']" target="_blank">点击查看</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hotnews_api from "../../../../api/news_module/hotnews_api";
import global_settings from "../../../../api/global_settings";

export default {
  name: "ZhihuNews",
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
        let res = await hotnews_api.getZhihuNews()
        // console.log(res)
        if (res.status === 200 && res.data.code === 200) {
          this.dataList = JSON.parse(res.data.data)
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
