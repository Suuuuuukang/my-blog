<template>
  <div class="mdui-container">
    <div class="mdui-card-primary-title" @click="showTable=!showTable">
      微博热搜
    </div>
    <div class="mdui-list" v-show="showTable">
      <div class="mdui-list-item" v-for="item in dataList">
        <el-link :href="item['url']" target="_blank">{{ item.title }}, {{item.hot}}</el-link>
      </div>
    </div>

  </div>
</template>

<script>
import global_settings from "../../../api/global_settings";
import hotnews_api from "../../../api/hotnews_api";

export default {
  name: "WeiBoNews",
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
        let res = await hotnews_api.getWeiBoNews()
        // console.log(res)
        if (res.status === 200) {
          this.dataList = res.data.data
          // console.log(this.respondData)
        }
      } catch (e) {
        console.log(e)
        console.log('WeiBoNews loadData error.')
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
