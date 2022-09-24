<template>
  <div>
    <strong>vadmin后台管理系统</strong>
    <div class="header-avatar">
      <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>

      <el-dropdown>
						<span class="el-dropdown-link">
						{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      userInfo:{
        avatar: null,
        username: 'test'
      }
    }
  },
  methods:{
    getUserInfo() {

    },
    logout() {

    }
  },
  created() {
    console.log("zzzzzzzzzzzzz")
    this.getUserInfo()
  }
}

</script>

<style scoped>

.header-avatar {
  float: right;
  width: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>