import http from "./http";

export default {
  getCatalog() {
    return http.get("/api/v1/editor/catalog/all")
  },

  insertCatalog(data) {
    return http.post("/api/v1/editor/catalog/insert", data)
  },

  insertRoot(data) {
    return http.post("/api/v1/editor/catalog/insertRoot", data)
  },

  updateCatalog(data) {
    return http.post("/api/v1/editor/catalog/update", data)
  },

  insertArticle(data) {
    return http.post(    "/api/v1/editor/article/insert", data)
  },

  getArticle(id) {
    return http.get("/api/v1/editor/article/get", {id: id})
  },

  updateArticle(data) {
    return http.post("/api/v1/editor/article/update", data)
  }


}
