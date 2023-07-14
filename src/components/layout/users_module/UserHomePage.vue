<template>
  <div class="mdui-container">
    <div class="mdui-card">
      <div class="mdui-card-primary">
        <div class="mdui-card-primary-title">
          我的账户
        </div>
        <div class="mdui-card-primary-subtitle">
          My Account
        </div>
      </div>
      <div class="mdui-card-content">
        <div class="mdui-row">
          <div class="mdui-col-xs-3 mdui-text-left">
            用户名
          </div>
          <div class="mdui-col-xs-9 mdui-text-left">
            {{ this.$session.get('user').username }}
          </div>
        </div>
        <div class="mdui-row">
          <div class="mdui-col-xs-3 mdui-text-left">
            昵称
          </div>
          <div class="mdui-col-xs-9 mdui-text-left">
            {{ this.$session.get('user').nickname }}
          </div>
        </div>
        <div class="mdui-row">
          <div class="mdui-col-xs-3 mdui-text-left">
            性别
          </div>
          <div class="mdui-col-xs-9 mdui-text-left">
            {{ this.$session.get('user').sex === 0 ? '保密' :
            this.$session.get('user').sex === 1 ? '男' : '女'}}
          </div>
        </div>

        <div class="mdui-row">
          <button class="mdui-btn mdui-btn-raised mdui-ripple" @click="logout">退出登录</button>
        </div>

        <div class="mdui-divider" style="visibility: hidden; height: 30px"></div>

        <div class="mdui-card">
          <div class="mdui-card-content mdui-row">
            <div class="mdui-col">
              <div class="mdui-row" style="display: flex; align-items: center">
                <div class="mdui-col-xs-3 mdui-text-left">
                  提权申请
                </div>
                <div class="mdui-col-xs-3 mdui-text-right">
                  请选择权限
                </div>
                <div class="mdui-col-xs-3 mdui-text-left">
                  <select class="mdui-select" v-model="role">
                    <option value="Normal">普通用户</option>
                    <option value="VIP">VIP</option>
                    <option value="SVIP">SVIP</option>
                    <option value="Administrator">超级管理员</option>
                  </select>
                </div>
                <div class="mdui-col-xs-3">
                  <button class="mdui-btn mdui-btn-raised mdui-ripple" :disabled="authDisable" @click="submitAuth">获取授权码</button>
                </div>
              </div>
              <div class="mdui-row" style="display: flex; align-items: center">
                <div class="mdui-col-xs-6">
                  <div class="mdui-textfield mdui-textfield-floating-label">
                    <label class="mdui-textfield-label">授权码 authCode</label>
                    <input class="mdui-textfield-input" v-model="auth" type="text" required/>
                    <div class="mdui-textfield-error">授权码不能为空</div>
                  </div>
                </div>
                <div class="mdui-col-xs-6">
                  <button class="mdui-btn mdui-btn-raised mdui-ripple" @click="getRole">申请权限</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import user_api from "../../../api/user_api/user_api";

export default {
  name: "UserHomePage",
  data () {
    return {
      role: '',
      auth: '',
      authDisable: false
    }
  },
  methods: {
    logout() {
      user_api.logout()
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$session.set('user', null)
            this.$message.success(res.data.message)
            this.$router.push('/login')
          } else {
            this.$message.error(res.data.message)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    submitAuth () {
      if (this.role === '' || !this.role) {
        this.$message.error("请选择权限!")
        return
      }
      user_api.roleRequest({role: this.role})
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.authDisable = true
            setTimeout(() => {
              this.authDisable = false
            }, 60000)
          } else {
            this.$message.error(res.data.message)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    getRole() {
      if (this.auth === '') {
        this.$message.error("请输入授权码!")
        return
      }
      user_api.getRole({auth: this.auth})
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
