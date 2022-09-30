<template>

  <el-menu

      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

    <el-menu-item index="Index"  @click="selectMenu({name: 'Index', title: '首页'})">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </template>
    </el-menu-item>

    <!--二级菜单-->
    <el-submenu :index="menu.name" v-for="menu in menuList">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.title}}</span>
      </template>

      <el-menu-item :index="item.name" @click="selectMenu(item)" v-for="item in menu.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </template>
      </el-menu-item>

    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {

    }
  },
  computed:  {
    menuList: {
      get(){
        return [
          {
            name: 'SysManage',
            title: '系统管理',
            icon: 'el-icon-s-operation',
            path: '',
            children:[
              {
                name: 'UserManage',
                title: '用户管理',
                icon: 'el-icon-s-custom',
                path: '/sys/users',
                children: []
              },
              {
                name: 'RoleManage',
                title: '角色管理',
                icon: 'el-icon-s-check',
                path: '/sys/roles',
                children: []
              },
              {
                name: 'MenusManage',
                title: '菜单管理',
                icon: 'el-icon-menu',
                path: '/sys/menus',
                children: []
              }
            ]
          },
          {
            name: 'SysTools',
            title: '系统工具',
            icon: 'el-icon-setting',
            path: '',
            children:[
              {
                name: 'DataQuery',
                title: '数据字典',
                icon: 'el-icon-tickets',
                path: '/sys/data',
                children: []
              },

            ]
          },
        ]
      }
    }

  },
  methods: {
    selectMenu(item) {
      this.$store.commit("addTab", item)
      this.$router.push(item.path)
    }
  }

}
</script>

<style scoped>
    .el-menu-vertical-demo {
      height: 100%;
      overflow: hidden;
    }
</style>