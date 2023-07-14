<template>
  <div class="mdui-container">
    <div class="mdui-card-primary-title" @click="showTable=!showTable">
      当前热点事件
    </div>
    <el-table
      v-show="showTable"
      :data="dataList"
      style="width: 100%;"
    >
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="digest"
        label="简介"
      >
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import hotnews_api from "../../../../api/news_module/hotnews_api";
import global_settings from "../../../../api/global_settings";

export default {
  name: "TodayNews",
  data () {
    return {
      dataList: [],
      showTable: global_settings.showTable
    }
  },
  methods: {
    async loadData() {
      try {
        let res = await hotnews_api.getDailyHotNews()
        // console.log(res)
        if (res.status === 200 && res.data.code === 200) {
          this.dataList = JSON.parse(res.data.data)
        }
      } catch (e) {
        console.log(e)
        console.log('TodayNews loadData error.')
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
