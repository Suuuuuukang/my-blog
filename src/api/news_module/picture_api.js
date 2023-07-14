import http from "../http";

export default {
  async getCos (page) {
    let res = http.get('/api/v1/cosPictures', {'page': page})
    return res
  }
}
