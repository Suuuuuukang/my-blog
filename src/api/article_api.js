import http from "./http";

export default {
  async getQuote () {
    let res = await http.get('https://v.api.aa1.cn/api/api-renjian/index.php?type=json')
    // console.log(res)
    return res
  },
  async getDayHistory () {
    let res = await http.get('https://zj.v.api.aa1.cn/api/bk/?num=5&type=json')
    // console.log(res)
    return res
  },
  async getRegionNews (region, page) {
    let res = await http.get(
      'https://v.api.aa1.cn/api/api-tplist/go.php/api/News/local_news?' +
      'name='+ region +
      '&page='+page
    )
    // console.log(res)
    return res
  }
}
