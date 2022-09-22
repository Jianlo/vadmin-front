<template>
  <el-row  type="flex" class="row-bg" justify="center" >
    <el-col  :lg="8" :xl="8" style="margin-top: 120px">
      <el-form label-width="80px" :model="loginForm" :rules="rules">
        <el-form-item label="用户名" prop="username" style="width: 380px;">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"  style="width: 380px;">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code"  style="width: 380px;">
          <el-input v-model="loginForm.code"  style="width: 172px; float: left" maxlength="5"></el-input>
          <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" style="width: 240px;">登录</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="text">没有账号？去注册</el-button>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        code: '11111',
        key: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
        ],
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login?'+ qs.stringify(this.loginForm)).then(res => {

            console.log(res)

            const jwt = res.headers['authorization']

            this.$store.commit('SET_TOKEN', jwt)
            this.$router.push("/index")
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {

        console.log("/captcha")
        console.log(res)

        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
        this.loginForm.code = ''
      })
    }
  },
  created() {
    this.getCaptcha()
  }

}
</script>






<style scoped>


.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>