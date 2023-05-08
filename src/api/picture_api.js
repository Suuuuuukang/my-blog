import http from "./http";

export default {
  async getCos (page) {
    let res = http.get('https://v.api.aa1.cn/api/api-tplist/go.php/api/picture/index?page=' + page)
    return res
  }
}
