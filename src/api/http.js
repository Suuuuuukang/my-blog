import request from "./request";

export default {
  /**
   * 封装axios的get请求
   * @param url 请求url
   * @param params 请求参数
   * @returns {Promise<unknown>} 请求结果
   */

  get: function (url, params) {
    // console.log('get url:' + this.baseUrl + url)
    return new Promise((resolve, reject) => {
      request.get(url, {
        headers: {
          // "Access-Control-Allow-Origin": "*"
        },
        params: params
      })
        .then(response => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * 目前用到的params没有进行序列化，在flask中使用的是直接传递的方式，不需要序列化
   * @param url 请求url
   * @param params 请求参数
   * @returns {Promise<unknown>} 请求结果
   */
  post: function (url, params) {
    // console.log('post url:' + this.baseUrl + url)
    return new Promise((resolve, reject) => {
      request
        .post(url, JSON.stringify(params), {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8' // ,
            // "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
