<template>
  <el-row  type="flex" class="row-bg" justify="center" >
    <el-col  :lg="8" :xl="8" style="margin-top: 120px">
      <el-form label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px;">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"  style="width: 380px;">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code"  style="width: 380px;">
          <el-input v-model="loginForm.code"  style="width: 172px; float: left" maxlength="4"></el-input>

          <!-- 用el-image会出现验证码无法显示的bug-->
          <img :src="captchaImg" class="captchaImg" @click="getCaptcha" alt="加载失败"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" style="width: 240px;">登录</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="text" @click="signUp">没有账号？去注册</el-button>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>

import qs from "qs";
import Element from "element-ui"

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
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
          { min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur' }
        ],
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login',qs.stringify(this.loginForm),{headers:{'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {

            console.log(res)


            //登录成功后将jwt保存到vuex，并跳转到首页
            const jwt = res.headers['authentication']
            if (jwt){
              this.$store.commit('SET_TOKEN', jwt)
              Element.Message.success(!res.data.message ? '操作成功' : res.data.message)
              this.$router.push("/index")
            }
            else{
              Element.Message.error(!res.data.message ? '系统异常' : res.data.message)
              this.getCaptcha()
            }

          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    signUp() {
      this.$router.push("/register")
    },
    getCaptcha() {
      this.$axios.get('/admin/captcha/get').then(res => {

        console.log(res)

        //获取验证码的key和图片
        this.loginForm.key = res.data.data.key
        this.captchaImg = res.data.data.captchaImg

        //清空验证码输入框
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