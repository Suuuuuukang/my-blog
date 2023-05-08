<template>
  <div class="mdui-container">
    <div class="mdui-card-primary-title" @click="showTable=!showTable">
      历史上的今天
    </div>
    <div class="mdui-list" v-show="showTable">
      <div class="mdui-list-item" v-for="item in dataList">
        {{ item }}
      </div>
    </div>

  </div>
</template>

<script>
import global_settings from "../../../api/global_settings";
import article_api from "../../../api/article_api";

export default {
  name: "DayHistory",
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
        let res = await article_api.getDayHistory()
        // console.log(res)
        if (res.status === 200) {
          this.dataList = res.data.content
          // console.log(this.respondData)
        }
      } catch (e) {
        console.log(e)
        console.log('DayHistory loadData error.')
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
