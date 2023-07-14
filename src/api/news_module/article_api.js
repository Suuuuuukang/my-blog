import http from "../http";

export default {
  async getQuote () {
    let res = await http.get('api/v1/quote')
    // console.log(res)
    return res
  },
  async getDayHistory () {
    let res = await http.get('api/v1/dayHistory')
    // console.log(res)
    return res
  },
  async getRegionNews (region, page) {
    let res = await http.get('api/v1/regionNews',{
      name: region,
      page: page
      })
    // console.log(res)
    return res
  }
}
