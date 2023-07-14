import http from "../http";


export default {

  getDailyHotNews: async function () {
    let res = await http.get('/api/v1/hotNews')
    // console.log(res)
    return res
  },
  getZhihuNews: async function () {
    let res = await http.get('/api/v1/zhihuNews')
    // console.log(res)
    return res
  },
  getBiliBiliNews: async function () {
    let res = await http.get('/api/v1/biliNews')
    // console.log(res)
    return res
  },
  getSougouBaiduNews: async function () {
    let res = await http.get('https://v.api.aa1.cn/api/sougou-baidu/index.php?aa1=xiarou')
    // console.log(res)
    return res
  },
  getDouyinNews: async function () {
    let res = await http.get('api/v1/douyinNews')
    // console.log(res)
    return res
  },
  getWeiBoNews: async function () {
    let res = await http.get('api/v1/weiboNews')
    // console.log(res)
    return res
  },
}
