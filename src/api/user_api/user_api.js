import http from "../http";

export default {
  login(params) {
    let res = http.post('/api/v2/user/login', params);
    return res
  },
  emailAuth(params) {
    let res = http.post('/api/v2/user/emailAuth', params)
    return res
  },
  signUp(params) {
    let res = http.post('/api/v2/user/emailSignUp', params)
    return res
  },
  logout() {
    let res = http.post('/api/v2/user/logout')
    return res
  },
  roleRequest(params) {
    let res = http.post('/api/v2/user/role/getRoleRequest', params)
    return res
  },
  getRole(params) {
    let res = http.post('/api/v2/user/role/validateRoleRequest', params)
    return res
  }
}
