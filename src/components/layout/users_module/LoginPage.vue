<template>
  <div class="mdui-container-fluid">
    <div class="mdui-row">
      <div class="mdui-col-xs-2"></div>
      <div class="mdui-col-xs-8">
        <div class="mdui-card">
          <div class="mdui-card-primary">
            <div class="mdui-card-primary-title">
              用户登录
            </div>
            <div class="mdui-card-primary-subtitle">
              User Login
            </div>
          </div>

          <div class="mdui-card-content">
            <div class="mdui-col">
              <div class="mdui-row">
                <div class="mdui-col-xs-2"></div>
                <div class="mdui-col-xs-8">
                  <div class="mdui-textfield mdui-textfield-floating-label">
                    <label class="mdui-textfield-label">用户名 username</label>
                    <input class="mdui-textfield-input" v-model="form.username" type="text" required/>
                    <div class="mdui-textfield-error">用户名不能为空</div>
                  </div>
                </div>
                <div class="mdui-col-xs-2"></div>
              </div>

              <div class="mdui-row">
                <div class="mdui-col-xs-2"></div>
                <div class="mdui-col-xs-8">
                  <div class="mdui-textfield mdui-textfield-floating-label">
                    <label class="mdui-textfield-label">密码 password</label>
                    <input class="mdui-textfield-input" v-model="form.password" type="password" required/>
                    <div class="mdui-textfield-error">密码不能为空</div>
                  </div>
                </div>
                <div class="mdui-col-xs-2"></div>

              </div>

              <div class="mdui-row">
                <div class="mdui-col-xs-6">
                  <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent" @click="login">
                    登录
                  </button>
                </div>
                <div class="mdui-col-xs-6">
                  <router-link to="/signUp">
                    <button class="mdui-btn mdui-btn-raised mdui-ripple">注册</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mdui-col-xs-2"></div>
    </div>
  </div>
</template>

<script>
import user_api from "../../../api/user_api/user_api";

export default {
  name: "LoginPage",
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      // 先检查参数
      if (this.form.username.length === 0 || this.form.password.length === 0) {
        this.$message.error("请输入用户名或密码!")
        return
      }
      user_api.login(this.form)
      .then(res => {
        if (res.status === 200) {
          let data = res.data
          if (data.code === 200) {
            this.$message.success(data.message)
            this.$session.set('user', data.data)
            this.$router.push('/user')
          } else {
            this.$message.error(data.message)
          }
        } else {
          this.$message.error("网络错误!")
        }
      })
      .catch(err => {
        console.log(err)
      })
      console.log(this.$session)
      console.log(this.$session.has('user'))
      console.log(this.$session.get('user'))
    }
  }
}
</script>

<style scoped>

</style>
