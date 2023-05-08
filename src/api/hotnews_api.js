import http from "./http";


export default {

  getDailyHotNews: async function () {
    let res = await http.get('https://v.api.aa1.cn/api/topbaidu/index.php')
    // console.log(res)
    return res
  },
  getZhihuNews: async function () {
    let res = await http.get('https://v.api.aa1.cn/api/zhihu-news/index.php?aa1=xiarou')
    // console.log(res)
    return res
  },
  getBiliBiliNews: async function () {
    let res = await http.get('https://v.api.aa1.cn/api/bilibili-rs/')
    // console.log(res)
    return res
  },
  getSougouBaiduNews: async function () {
    let res = await http.get('https://v.api.aa1.cn/api/sougou-baidu/index.php?aa1=xiarou')
    // console.log(res)
    return res
  },
  getDouyinNews: async function () {
    let res = await http.get('https://dsp.lenovo.com.cn/lenovo/bid?positionId=50411')
    // console.log(res)
    return res
  },
  getWeiBoNews: async function () {
    let res = await http.get('https://zj.v.api.aa1.cn/api/weibo-rs/')
    // console.log(res)
    return res
  },
}
