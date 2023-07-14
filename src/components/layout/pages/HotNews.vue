<template>
  <div class="mdui-container">
    <div class="mdui-row">
      <wei-bo-news></wei-bo-news>
    </div>
    <div class="mdui-divider" style="margin-top: 10px;margin-bottom: 10px"></div>

    <div class="mdui-row">
      <douyin-news></douyin-news>
    </div>
    <div class="mdui-divider" style="margin-top: 10px;margin-bottom: 10px"></div>

    <div class="mdui-row">
      <bili-bili-news></bili-bili-news>
    </div>
    <div class="mdui-divider" style="margin-top: 10px;margin-bottom: 10px"></div>


    <div class="mdui-row">
      <zhihu-news></zhihu-news>
    </div>
    <div class="mdui-divider" style="margin-top: 10px;margin-bottom: 10px"></div>

    <div class="mdui-row">
      <today-news></today-news>
    </div>
    <div class="mdui-divider" style="margin-top: 10px;margin-bottom: 10px"></div>

  </div>
</template>

<script>
import TodayNews from "../news_module/news/TodayNews";
import ZhihuNews from "../news_module/news/ZhihuNews";
import Quote from "../news_module/article/quote";
import BiliBiliNews from "../news_module/news/BiliBiliNews";
import DouyinNews from "../news_module/news/DouyinNews";
import WeiBoNews from "../news_module/news/WeiBoNews";
export default {
  name: "HotNews",
  components: {WeiBoNews, DouyinNews, BiliBiliNews, Quote, ZhihuNews, TodayNews},
}
</script>

<style scoped>

</style>
