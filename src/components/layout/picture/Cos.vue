<template>
  <div class="mdui-container">
    <div class="mdui-card-primary-title" @click="showTable=!showTable">
      Cos套图
    </div>
    <div class="mdui-row">
      <div class="mdui-col-xs-6">
        <button class="mdui-btn mdui-color-theme-accent mdui-ripple"
                @click="beforePage">上一页</button>
      </div>
      <div class="mdui-col-xs-6">
        <button class="mdui-btn mdui-color-theme-accent mdui-ripple"
                @click="nextPage">下一页</button>
      </div>
    </div>


    <div class="mdui-card" v-show="showTable" v-for="item in dataList">
      <div class="mdui-card-media">
        <img :src="item['cover']"/>
        <div class="mdui-card-media-covered">
          {{ item['desc'] }}
          <br/>
          {{ item['setname'] }}
        </div>
      </div>
      <div class="mdui-container" v-for="it in item['pics']">
        <img :src="it"/>
      </div>
    </div>
  </div>
</template>

<script>
import global_settings from "../../../api/global_settings";
import picture_api from "../../../api/picture_api";

export default {
  name: "Cos",
  data () {
    return {
      page: 0,
      pageSize: 20,
      respondData: {},
      dataList: [],
      showTable: global_settings.showTable
    }
  },
  methods: {
    async loadData() {
      try {
        let res = await picture_api.getCos(this.page * this.pageSize)
        // console.log(res)
        if (res.status === 200) {
          this.dataList = res.data.data
          // console.log(this.dataList.length)
          // console.log(this.dataList)
        }
      } catch (e) {
        console.log(e)
        console.log('Cos loadData error.')
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
