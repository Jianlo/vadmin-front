<template>
  <el-row  type="flex" class="row-bg" justify="center" >
    <el-col  :lg="8" :xl="8" style="margin-top: 120px">
      <el-form label-width="80px" :model="registerForm" :rules="rules" ref="registerForm">
        <el-form-item label="用户名" prop="username" style="width: 380px;">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"  style="width: 380px;">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirm"  style="width: 380px;">
          <el-input v-model="registerForm.confirm" type="password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email"  style="width: 380px;">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')" style="width: 240px;">注册</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="text" @click="signIn">已有账号？去登录</el-button>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>

import Element from "element-ui"

export default {
  name: "Login",
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirm: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirm: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.registerForm.password === this.registerForm.confirm){
            this.$axios.post('/admin/user/register',this.registerForm).then(res => {

              console.log(res)


              const code = res.data.code

              if (code === 2000){
                Element.Message.success(!res.data.message ? '操作成功' : res.data.message)
                this.$router.push("/login")
              }
              else{
                Element.Message.error(!res.data.message ? '系统异常' : res.data.message)
              }

            })
          }
          else {
            this.registerForm.password = ''
            this.registerForm.confirm = ''
            Element.Message.error("密码与确认密码不一致")
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    signIn() {
      this.$router.push("/login")
    }
  }

}
</script>






<style scoped>

</style>