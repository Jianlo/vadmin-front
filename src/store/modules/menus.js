import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {

        menuList: [
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
        ],
        permList: [],

        hasRoutes: false,

    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, perms) {
            state.permList = perms
        },
        changeRouteStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes
        },



    },
    actions: {
    },

}