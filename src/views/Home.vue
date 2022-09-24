<template>
  <el-container>

    <!-- header-->
    <el-header>
      <Header></Header>
    </el-header>

    <!-- aside-->
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>

    <!-- main-->
    <el-main>
      <MenuTabs></MenuTabs>
      <div style="margin: 0 15px;">
        <router-view/>
      </div>
    </el-main>
  </el-container>
</template>

<script>

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import MenuTabs from "../components/MenuTabs";

export default {
  name: "Home",
  components: {MenuTabs, SideMenu, Header},
  comments:{
    Header,SideMenu,MenuTabs
  },

  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/sys/userInfo").then(res => {
        this.userInfo = res.data.data
      })
    },
    logout() {
      this.$axios.post("/logout").then(res => {
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit("resetState")

        this.$router.push("/login")
      })
    }
  },
  created() {
    this.getUserInfo()
  }

}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-header {
  background-color: #17B3A3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>