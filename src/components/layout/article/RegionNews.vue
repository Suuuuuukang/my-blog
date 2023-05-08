<template>
  <div class="mdui-container">
    <div class="mdui-card-primary-title" @click="showTable=!showTable">
      地区新闻
    </div>
    <div class="mdui-row">
      <div class="mdui-col-xs-3">
        <button class="mdui-btn mdui-color-theme-accent mdui-ripple"
                @click="beforePage">上一页</button>
      </div>
      <div class="mdui-col-xs-3">
        <button class="mdui-btn mdui-color-theme-accent mdui-ripple"
                @click="nextPage">下一页</button>
      </div>
      <select class="mdui-select mdui-col-xs-6" v-model="selectRegion">
        <option value="陕西省_西安市" selected>西安</option>
        <option value="山西省_太原市">太原</option>
        <option value="山东省_淄博市">淄博</option>
        <option value="山东省_青岛市">青海</option>
        <option value="四川省_成都市">成都</option>
        <option value="上海市">上海</option>
      </select>
    </div>
    <div class="mdui-card" v-show="showTable" v-for="item in dataList">
      <el-link :href="item['url']" target="_blank">
        <div class="mdui-subheader">
          {{ item['title'] }}
        </div>
      </el-link>
      <div class="mdui-card-content">
        <div class="mdui-container">
          {{ item['digest'] }}
        </div>
        <div class="mdui-container" v-show="item['hasImg']>0">
          <img :src="item['imgsrc']"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import global_settings from "../../../api/global_settings";
import article_api from "../../../api/article_api";

export default {
  name: "RegionNews",
  data () {
    return {
      page: 0,
      pageSize: 10,
      selectRegion: '陕西省_西安市',
      dataList: [],
      showTable: global_settings.showTable
    }
  },
  watch: {
    selectRegion: {
      handler (val) {
        this.selectRegion = val
        this.page = 1
        this.loadData()
      }
    }
  },
  methods: {
    async loadData() {
      try {
        let res = await article_api.getRegionNews(
          this.selectRegion ,
          this.page * this.pageSize
        )
        // console.log(res)
        if (res.status === 200) {
          this.dataList = res.data.data
          // console.log(this.dataList)
        }
      } catch (e) {
        console.log(e)
        console.log('RegionNews loadData error.')
      }
    },
    beforePage () {
      if (this.page === 1) {
        return
      }
      this.page -= 1
      this.loadData()
    },
    nextPage () {
      this.page += 1
      this.loadData()
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>
