<template>
  <div class="mdui-container-fluid">
    <div class="mdui-row">
      <div class="mdui-col-xs-2"></div>
      <div class="mdui-col-xs-8">
        <div class="mdui-card">
          <div class="mdui-card-primary">
            <div class="mdui-card-primary-title">
              用户注册
            </div>
            <div class="mdui-card-primary-subtitle">
              User SignUp
            </div>
          </div>

          <div class="mdui-card-content">
            <div class="mdui-col">
              <div class="mdui-row">
                <div class="mdui-col-xs-2"></div>
                <div class="mdui-col-xs-8">
                  <div class="mdui-textfield mdui-textfield-floating-label">
                    <label class="mdui-textfield-label">邮箱账号 email</label>
                    <input class="mdui-textfield-input" v-model="form.username" type="text" required/>
                    <div class="mdui-textfield-error">邮箱账号不能为空</div>
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
                <div class="mdui-col-xs-2"></div>
                <div class="mdui-col-xs-8">
                  <div class="mdui-textfield mdui-textfield-floating-label">
                    <label class="mdui-textfield-label">重复密码 password</label>
                    <input class="mdui-textfield-input" v-model="rePassword" type="password" required/>
                    <div class="mdui-textfield-error">密码不能为空</div>
                  </div>
                </div>
                <div class="mdui-col-xs-2"></div>
              </div>

              <div class="mdui-row" style="display: flex; align-items: center">
                <div class="mdui-col-xs-2"></div>
                <div class="mdui-col-xs-4">
                  <div class="mdui-textfield mdui-textfield-floating-label">
                    <label class="mdui-textfield-label">验证码 authCode</label>
                    <input class="mdui-textfield-input" v-model="form.auth" type="text" required/>
                    <div class="mdui-textfield-error">验证码不能为空</div>
                  </div>
                </div>
                <div class="mdui-col-xs-4">
                  <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
                          @click="emailAuth"
                          :disabled="authDisable">
                    发送验证码
                  </button>
                </div>
                <div class="mdui-col-xs-2"></div>
              </div>

              <div class="mdui-row">
                <div class="mdui-col-xs-6">
                  <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent" @click="signUp">
                    注册
                  </button>
                </div>
                <div class="mdui-col-xs-6">
                    <button class="mdui-btn mdui-btn-raised mdui-ripple" @click="clear">清空</button>
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
  name: "SignUpPage",
  data () {
    return {
      form: {
        username: '',
        password: '',
        auth: ''
      },
      rePassword: '',

      authDisable: false
    }
  },
  methods: {
    /**
     * 清除表单信息
     */
    clear() {
      this.form.username = ''
      this.form.password = ''
      this.form.auth = ''
      this.rePassword = ''
    },
    /**
     * 发送邮箱验证码
     */
    emailAuth() {
      if (this.form.username.length === 0) {
        this.$message.error("邮箱不能为空!")
        return
      }
      user_api.emailAuth({email: this.form.username})
        .then(res => {
          if (res.status === 200) {
            let data = res.data
            if (data.code === 200) {
              this.$message.success(data.message)
              this.authDisable = true
              setTimeout(() => {
                this.authDisable = false
              }, 10000)
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
    },
    /**
     * 注册
     */
    signUp() {
      if (this.form.username.length === 0) {
        this.$message.error("邮箱不能为空!")
        return
      }
      if (this.form.password.length === 0) {
        this.$message.error("密码不能为空!")
        return
      }
      if (this.form.auth.length === 0) {
        this.$message.error("验证码不能为空!")
        return
      }
      if (this.form.password !== this.rePassword) {
        this.$message.error("两次密码必须相同!")
        return
      }
      user_api.signUp(this.form)
        .then(res => {
          if (res.status === 200) {
            let data = res.data
            if (data.code === 200) {
              this.$message.success(data.message)
              this.$router.push('/login')
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
    }
  }
}
</script>

<style scoped>

</style>
